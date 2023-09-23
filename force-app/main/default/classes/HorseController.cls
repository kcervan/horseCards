public with sharing class HorseController {
    @AuraEnabled(cacheable=true)
    public static List<Horse__c> getHorses() {
        return [SELECT Key_Photo__c, Name, Partnership__c, Partnership__r.Name, PartnershipFormula__c,  Status__c, Sex__c, Location__c FROM Horse__c];
    }
}