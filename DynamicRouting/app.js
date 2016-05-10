var express = require('express');
var loader = require('./modules/loader/loader.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = {
    app: app,
    viewEngine: 'hbs',
    apiRoute: '/api',
    routes: [
        {
            path: '/', provider: require('./modules/logic/home.js'),
            methods: [
                { http: 'get', module: 'homeRoute', }
            ]
        },
        {
            path: '/api/dog', provider: require('./modules/logic/dog.js'),
            methods: [
                { http: 'get', module: 'dogRoute' }
            ]
        },
        {
            path: '/api/cow', provider: require('./modules/logic/cow.js'),
            methods: [
                {http: 'get', module: 'cowRoute'}
            ]
        },
        {
            path: '/api/cat', provider: require('./modules/logic/cat.js'),
            methods: [
                { http: 'get', module: 'catRoute' }
            ]
        },
    ]
}

loader.init(config);



// error handlers

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
