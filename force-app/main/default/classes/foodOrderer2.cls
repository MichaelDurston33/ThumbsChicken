public with sharing class foodOrderer2 {
    @AuraEnabled
    public List<Menu_Item__c> Menuitems = [SELECT Name, Price_to_Customer__c  FROM Menu_Item__c];
    }