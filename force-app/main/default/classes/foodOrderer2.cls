public with sharing class foodOrderer2 {
    public static List<Menu_Item__c> Menuitems = [SELECT Name, Price__c  FROM Menu_Item__c];
    }