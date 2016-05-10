$(function () { 
    ui.init();
});

var api = {
    doCall: function (route, cb) {
        $.ajax({
            url: route,
            dataType: 'text',
            beforeSend: api.setHeaders,
            success: function (data, status, jqXHR){
                cb(null, data);
            },
            error: function (jqXHR, textStatus, errorThrown){
                cb({ object: jqXHR, status: textStatus, error: errorThrown});
            }
        });
    },
    setHeaders: function (xhr) {
        xhr.setRequestHeader('clientId', 'oscar-marin');
        xhr.setRequestHeader('signature', 'sample-signature');
        xhr.setRequestHeader('ey-date', (new Date).getTime());
    }
};

var ui = {
    init: function () {
        $('#cat-lnk').on('click', function () { ui.call('cat'); });
        $('#cow-lnk').on('click', function () { ui.call('cow'); });
        $('#dog-lnk').on('click', function () { ui.call('dog'); });
    },
    call: function (animal){
        api.doCall('/api/' + animal, function (err, data) {
            $('#' + animal +'-txt').html(data);     
        });
    }
};