import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import Id from '@salesforce/user/Id';
import Menuitems from '@salesforce/apex/foodOrderer2.Menuitems';
import createOrderRecords from '@salesforce/apex/createOrderRecords.createOrderRecords';

export default class FoodOrderer extends LightningElement {
    
    userId = Id
    order;
    error;
    data;
    priceToPay = 0;

    //List of IDs used to create junction objects in the controller.
    @track orderIds = [];
    
    @wire(Menuitems)
    wiredMenuItems({ error, data }) {
        if (data) {
            var tempOrder = {};
            data.forEach((menuItem) => {
                tempOrder[menuItem.Id] = 
                {
                    Name: menuItem.Name,
                    Id: menuItem.Id,
                    Price: menuItem.Price_to_Customer__c,
                    Amount: 0
                }
            });
            this.data = data;
            this.order = tempOrder;
        } else if (error) {
            console.log(error);
            this.error = error;
        }
    }

    //Gives an array of results for the HTML file to loop through.
    get results() {
        if (this.data) {
            return this.data;
        }
    }

    //Changes the amount of a menu item on the order object.
    handleAmountChange(event) {
        this.order[event.detail.id].Amount = event.detail.amount;
        this.recalculate();
    }

    //Uses the amount and price on the order object to calculate a final price.
    recalculate() {
        var tempTotal = 0;
        var tempListIds = [];
        Object.keys(this.order).forEach((elem) => {
            var quantity = this.order[elem].Amount;
            var cost = this.order[elem].Price;
            tempTotal += quantity * cost; 
            
            //Adds IDs to array proprotionate to the amount ordered.
            for (var i = 0; i < quantity; i++) {
                tempListIds.push(this.order[elem].Id);
            }
        });
        this.orderIds = tempListIds;
        console.log(JSON.stringify(this.orderIds));
        this.priceToPay = tempTotal;
    }

    validateEligableSubmit() {
        var eligable = false;
        Object.keys(this.order).forEach((elem) => {
            var quantity = this.order[elem].Amount;
            quantity > 0 ? eligable = true : null;
        });
        return eligable;
    }

    handleSubmit() {
        if (this.validateEligableSubmit()) {
            createOrderRecords({selectedMenuItems: this.orderIds, currentUserId: this.userId}).then(result => {
                if (result === 200) {
                    const event = new ShowToastEvent({
                        title: 'Order Submitted!',
                        message: 'Your order has been submitted.',
                        variant: 'success'
                    });
                    this.dispatchEvent(event);
                }
            })
            .catch(error => {
                console.log(error);
                const event = new ShowToastEvent({
                    title: 'Problem Submitting!',
                    message: 'Error while submitting, please try again.',
                    variant: 'error'
                });
                this.dispatchEvent(event);
            })
        } else {
            const event = new ShowToastEvent({
                title: 'Invalid Order!',
                message: 'An order needs to have at least one item.',
                variant: 'error'
            });
            this.dispatchEvent(event);
        }
    }
}