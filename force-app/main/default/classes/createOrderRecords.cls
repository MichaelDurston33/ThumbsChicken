public with sharing class createOrderRecords {
    @AuraEnabled(cacheable=false)
    public static integer createOrderRecords(List<Id> selectedMenuItems, Id currentUserId) {
        try {
            System.debug(selectedMenuItems);
            System.debug(currentUserId);
            string newID = '' order__c.Id;
            order__c O = new Order__c();
            O.ownerId = currentUserId;
            o.Name = newID;
            insert O;
            return 200;
            
        } catch (DMLException e) {
            return 400;
            
        }
        


    }
}