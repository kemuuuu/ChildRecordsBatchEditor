public with sharing class ChildRecordsBatchEditorController {

	@AuraEnabled
	public static string getLabel(String sObjectName){
		return Schema.getGlobalDescribe().get(sObjectName).getDescribe().getLabel();
	}

	@AuraEnabled
	public static String getIconName(String sObjectName){
		String u;
		List<Schema.DescribeTabSetResult> tabSetDesc = Schema.describeTabs();
		List<Schema.DescribeTabResult> tabDesc = new List<Schema.DescribeTabResult>();
		List<Schema.DescribeIconResult> iconDesc = new List<Schema.DescribeIconResult>();

		for(Schema.DescribeTabSetResult tsr : tabSetDesc) { 
			tabDesc.addAll(tsr.getTabs()); 
		}

		for(Schema.DescribeTabResult tr : tabDesc) {
			if( sObjectName == tr.getSobjectName() ) {
				if( tr.isCustom() == true ) {
					iconDesc.addAll(tr.getIcons());
				} else {
					u = 'standard:' + sObjectName.toLowerCase();
				}
			}
		}
		
		for (Schema.DescribeIconResult ir : iconDesc) {
			if (ir.getContentType() == 'image/svg+xml'){
				u = 'custom:' + ir.getUrl().substringBetween('custom/','.svg').substringBefore('_');
				break;
			}
		}
		return u;
	}

    @AuraEnabled
	public static List<string> doInit(String objName,List<String> columns){
		List<String> fields = new List<String>();
        Map<String, Schema.SObjectField> fldM = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
		for (String c : columns) {
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
		System.debug(fields);
		return fields;
	}

	public class SFField {
		String label;
		String fieldName;
		String type;
		Boolean editable = true;
	}
    
    @AuraEnabled
    public static List<Opportunity> fetchRecords(String objName, String parentId, String relationName, List<String> columns){
		String q = 'SELECT ' + String.join(columns, ',') + ' FROM ' + objName + ' WHERE ' + relationName + ' = ' + '\'' + parentId + '\'';
		System.debug(q);
		return Database.query(q);
    }

	@AuraEnabled
	public static Boolean saveChildRecords(List<SObject> editedRecords){
		try {
			update editedRecords;
			return true;
		}catch (Exception e) {
			return false;
		}
	}
}
