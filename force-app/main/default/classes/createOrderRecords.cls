@AuraEnabled
public with sharing class createOrderRecords {
    public createOrderRecords() {
        try {
            order__c O = new Order__c();
            insert O;
            system.debug('the Following has occured' + '200');
            
        } catch (DMLException e) {
            system.debug('the following error has occured' + e.message());
            
        }
        


    }
}
