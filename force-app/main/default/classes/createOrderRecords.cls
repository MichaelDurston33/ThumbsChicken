@AuraEnabled
public with sharing class createOrderRecords {
    public createOrderRecords() {
        try {
            order__c O = new Order__c();
            insert O;
            
        } catch (DMLException e) {
            system.debug('the following error has occured' + e.message());
            
        }
        


    }
}
