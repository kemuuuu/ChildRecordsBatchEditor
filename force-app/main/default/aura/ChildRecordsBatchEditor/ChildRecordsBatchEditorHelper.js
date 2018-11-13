({
    initHelper: function (c, columns) {
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
                    console.log(c.get('v.Columns'))
                }
            } else alert('error')
        })
        $A.enqueueAction(action)
    },

    fetchRecords: function(c) {
        var action = c.get('c.fetchRecords');
        action.setParams({
            'ObjName': c.get('v.ChildName'),
            'parentId': c.get('v.recordId')
        });
        action.setCallback(this, function(res){
            if (res.getState() === 'SUCCESS') c.set('v.ChildRecords', res.getReturnValue())
            console.log(c.get('v.ChildRecords'))
        });
        $A.enqueueAction(action);
    }
})
