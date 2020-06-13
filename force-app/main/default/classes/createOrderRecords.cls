@AuraEnabled
public with sharing class createOrderRecords {
    public createOrderRecords() {
        try {
            order__c O = new Order__c();
            insert O;
            system.debug('200');
            
        } catch (DMLException e) {
            system.debug('400');
            
        }
        


    }
}
