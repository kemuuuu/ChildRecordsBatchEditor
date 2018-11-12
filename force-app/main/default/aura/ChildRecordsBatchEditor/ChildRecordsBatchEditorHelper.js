({
    initHelper : function(c) {
        var action = c.get('c.doInit')
        action.setParams({
            'parentId': c.get('v.recordId'),
        })
        action.setCallback(this, function(res){
            var status = res.getState();
            if (status === 'SUCCESS') c.set('v.ChildRecords', res.getReturnValue())
            else alert('error')
        })
        $A.enqueueAction(action)
    }
})
