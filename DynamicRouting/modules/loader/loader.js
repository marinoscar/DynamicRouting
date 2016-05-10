var _ = require('underscore');
var path = require('path');
var express = require('express');
var auth = require('../security/authorization.js');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var loader = {
    init: function (config) {
        this.doStaticInit(config);
        this.setupSecurity(config);
        this.routes(config);
        this.doInvalidRoutes(config);
    },
    doStaticInit: function (config) {
        var app = config.app;
        app.set('views', path.join(config.appDir, 'views'));
        app.set('view engine', config.viewEngine);
        
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(require('stylus').middleware(path.join(config.appDir, 'public')));
        app.use(express.static(path.join(config.appDir, 'public')));
    },
    setupSecurity: function (config) {
        var app = config.app;
        var router = express.Router();
        app.use(config.apiRoute, router);
        router.all('*', middleware.doSecurity);
    },
    doInvalidRoutes: function (config) {
        var app = config.app;
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    },
    routes: function (config) {
        var app = config.app;
        _.each(config.routes, function (r, i, l) {
            var router = express.Router();
            app.use(r.route, router)
            _.each(r.methods, function (m, i, l) {
                router[m.http](m.path, r.provider[m.module]);
            });
        });
    }
}

var middleware = {
    doSecurity: function (req, res, next) {
        var isValid = auth.authorize({
            clientId: req.get('clientId'), signature: req.get('signature'), date: req.get('data')
        });
        if (!isValid) {
            var err = new Error('Provided invalid credentials');
            err.status = 403;
            next(err);
        }
        else {
            next();
        }
    }
}

module.exports = loader;
