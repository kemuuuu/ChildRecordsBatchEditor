public with sharing class ChildRecordsBatchEditorController {
    
    @AuraEnabled
    public static List<Opportunity> doInit(String ObjName, String parentId){
        return [SELECT Id, Name, Amount, CloseDate FROM Opportunity WHERE AccountId = :parentId];
    }
}
