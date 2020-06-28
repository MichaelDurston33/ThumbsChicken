public with sharing class foodOrderer2 {
    @AuraEnabled(cacheable=true)
    public static List<Menu_Item__c> Menuitems() {
        return [SELECT Name, Price_to_Customer__c  FROM Menu_Item__c];
    } 
}