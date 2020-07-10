public with sharing class createOrderRecords {
    @AuraEnabled(cacheable=false)
    public static integer createOrderRecords(List<Id> selectedMenuItems, Id currentUserId) {
        
                System.debug(selectedMenuItems);
                System.debug(currentUserId);
                order__c O = new Order__c();
                O.ownerId = currentUserId;
                string newID = string.valueOf(O.Id);
                o.Name = newID;
                // create order object first using values from currentUserID parameter.
                insert O; 

                for (Integer x = 0; x < 5; x++) {
                    for(id i : selectedMenuItems){
                    // seperate out information from parameter selectedMenuItem.
                Order_Line_Item__c oli = new Order_Line_Item__c();
                oli.Food_Order__c = O.Id;
                oli.menu_item__c = i;
                //Insert line item records
                Insert oli;
           
                    }
            
                return 200;
            
        }
        return 300;
    }
}



