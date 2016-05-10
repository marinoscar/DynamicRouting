var express = require('express');
var loader = require('./modules/loader/loader.js');

var app = express();

var config = {
    app: app,
    viewEngine: 'hbs',
    apiRoute: '/api',
    appDir: __dirname,
    routes: [
        {
            route: '/', 
            provider: require('./modules/logic/home.js'),
            methods: [
                { path: '/', http: 'get', module: 'homeRoute', }
            ]
        },
        {
            route: '/api/dog', provider: require('./modules/logic/dog.js'),
            methods: [
                { path: '/', http: 'get', module: 'dogRoute' }
            ]
        },
        {
            route: '/api/cow', provider: require('./modules/logic/cow.js'),
            methods: [
                { path: '/', http: 'get', module: 'cowRoute'}
            ]
        },
        {
            route: '/api/cat', provider: require('./modules/logic/cat.js'),
            methods: [
                { path: '/', http: 'get', module: 'catRoute' }
            ]
        },
    ]
}

loader.init(config);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
