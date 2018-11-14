({
    labelInit: function(c) {
        var action = c.get('c.getLabel')
        action.setParams({
            'sObjectName': c.get('v.ChildName')
        })
        action.setCallback(this, function(res) {
            if (res.getState() === 'SUCCESS') c.set('v.ChildLabel', res.getReturnValue())
            else alert('LABEL INIT ERROR')
        })
        $A.enqueueAction(action)
    },

    iconInit: function (c) {
        var action = c.get('c.getIconName');
        action.setParams({
            'sObjectName': c.get('v.ChildName')
        })
        action.setCallback(this, function(res) {
            if (res.getState() === 'SUCCESS') c.set('v.IconName', res.getReturnValue())
            else alert('ICON INIT ERROR')
        })
        $A.enqueueAction(action);
    },

    tableInit: function (c, columns) {
        var action = c.get('c.doInit')
        action.setParams({
            'objName': c.get('v.ChildName'),
            'columns': columns,
        })
        action.setCallback(this, function (res) {
            var status = res.getState();
            if (status === 'SUCCESS') {
                var info = [];
                var ret = res.getReturnValue();
                if (ret) {
                    ret.forEach(function (r) {
                        info.push(JSON.parse(r));
                    })
                    c.set('v.Columns', info);
                }
            } else alert('TAB INIT ERROR')
        })
        $A.enqueueAction(action)
    },

    fetchRecords: function(c, columns) {
        var objName = c.get('v.ChildName');
        var relName = c.get('v.RelationName');
        if ( !objName || !relName ) return;
        var action = c.get('c.fetchRecords');
        action.setParams({
            'objName': objName,
            'parentId': c.get('v.recordId'),
            'relationName': relName,
            'columns': columns
        });
        action.setCallback(this, function(res){
            if (res.getState() === 'SUCCESS') c.set('v.ChildRecords', res.getReturnValue())
            else alert('FETCH RECORDS ERROR')
        });
        $A.enqueueAction(action);
    },

    saveDatatable: function(c,e,h) {
        var editedRecords =  c.find("datatable").get("v.draftValues");
        console.log(editedRecords);
        var totalRecordEdited = editedRecords.length;
        var action = c.get("c.saveChildRecords");
        action.setParams({
            'editedRecords' : editedRecords
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue() === true){
                    h.showToast({
                        "title": "Record Update",
                        "type": "success",
                        "message": totalRecordEdited+" Records Updated"
                    });
                    // h.fetchRecords(c);
                    $A.get("e.force:refreshView").fire();
                } else{
                    h.showToast({
                        "title": "Error!!",
                        "type": "error",
                        "message": "Error in update"
                    });
                }
            }
        });
        $A.enqueueAction(action);
    },

    showToast : function(params){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams(params);
            toastEvent.fire();
        } else{
            alert(params.message);
        }
    },
})
