({
    init : function(c, e, h) {
        var rec = c.get('v.Record');

        var f1 = c.get('v.Field1');
        if (f1 !== 'undefined') c.set('v.Value1', rec[f1])

        var f2 = c.get('v.Field2');
        if (f2 !== 'undefined') c.set('v.Value2', rec[f2])

        var f3 = c.get('v.Field3');
        if (f3 !== 'undefined') c.set('v.Value3', rec[f3])

        var f4 = c.get('v.Field4');
        if (f4 !== 'undefined') c.set('v.Value4', rec[f4])

        var f5 = c.get('v.Field5');
        if (f5 !== 'undefined') c.set('v.Value5', rec[f5])

        var f6 = c.get('v.Field6');
        if (f6 !== 'undefined') c.set('v.Value6', rec[f6])
    }
})
