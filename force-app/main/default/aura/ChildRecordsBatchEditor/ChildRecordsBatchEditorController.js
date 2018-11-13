({
    init : function(c, e, h) {
        var columns = [];

        var f1 = c.get('v.Field1');
        if (f1) columns.push(f1)

        var f2 = c.get('v.Field2');
        if (f2) columns.push(f2)

        var f3 = c.get('v.Field3');
        if (f3) columns.push(f3)

        var f4 = c.get('v.Field4');
        if (f4) columns.push(f4)

        var f5 = c.get('v.Field5');
        if (f5) columns.push(f5)
        
        var f6 = c.get('v.Field6');
        if (f6) columns.push(f6)

        h.initHelper(c, columns);
        h.fetchRecords(c);
    },

    onSave: function(c, e, h) {
        console.log('save')
    }
})
