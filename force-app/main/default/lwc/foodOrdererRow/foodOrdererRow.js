import { LightningElement, api } from 'lwc';

export default class FoodOrdererRow extends LightningElement {
    @api menuItemName = '';
    @api menuItemId = '';
    @api menuItemPrice = 0;

    amount = 0

    changeAmount(event) {
        switch(event.target.dataset.operator) {
            case "subtract":
                this.amount > 0 ? this.amount -= 1 : null;
                break;
            case "add":
                this.amount += 1;
                break;
        }

        const changeAmount = new CustomEvent("amountchanged", {
            detail: {
                amount: this.amount,
                price: this.menuItemPrice,
                id: this.menuItemId,
                name: this.menuItemName
            }
        });

        this.dispatchEvent(changeAmount);
        console.log(this.amount);
    }
}