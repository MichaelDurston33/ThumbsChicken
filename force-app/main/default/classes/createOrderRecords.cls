public with sharing class createOrderRecords {
    @AuraEnabled(cacheable=true)
    public static integer createOrderRecords() {
        try {
            order__c O = new Order__c();
            insert O;
            return 200;
            
        } catch (DMLException e) {
            return 400;
            
        }
        


    }
}
