public with sharing class ChildRecordsBatchEditorController {
    
    @AuraEnabled
    public static List<Opportunity> doInit(String ObjName, String parentId){
        return [SELECT Id, Amount, CloseDate FROM Opportunity WHERE AccountId = :parentId];
    }
}
