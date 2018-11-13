public with sharing class ChildRecordsBatchEditorController {

    @AuraEnabled
	public static List<string> doInit(String objName,List<String> columns){
		List<String> fields = new List<String>();
        Map<String, Schema.SObjectField> fldM = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
		for (String c : columns) {
            System.debug(c);
			SFField f = new SFField();
			String l = fldM.get(c).getDescribe().getLabel();
			String t = String.valueOf(fldM.get(c).getDescribe().getType());
			f.label = l;
			f.type = t=='STRING'? 'text' : t.toLowerCase();
			f.fieldName = c;

			JSONGenerator g = JSON.createGenerator(false);
			g.writeObject(f);
			fields.add(g.getAsString());
		}
		return fields;
	}
    
    @AuraEnabled
    public static List<Opportunity> fetchRecords(String ObjName, String parentId){
        return [SELECT id, name, amount, closedate FROM Opportunity WHERE AccountId = :parentId];
    }

    class SFField {
		String label;
		String fieldName;
		String type;
        Boolean editable = true;
	}
}
