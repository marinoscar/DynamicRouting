var _ = require('underscore');
var auth = require('./modules/security/authorization.js');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var loader = {
    init: function (config){
        this.doStaticInit(config);
        this.setupSecurity(config);
        this.routes(config);
        this.doInvalidRoutes(config);
    },
    doStaticInit: function (config){
        var app = config.app;
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', config.viewEngine);
        
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(require('stylus').middleware(path.join(__dirname, 'public')));
        app.use(express.static(path.join(__dirname, 'public')));
    },
    setupSecurity: function (config){
        var app = config.app;
        app.all(config.apiRoute, middleware.doSecurity);
    },
    doInvalidRoutes: function (config){
        var app = config.app;
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    },
    routes: function (config) {
        var app = config.app;
        _.foreach(config.routes, function (e, i, l) { 
            app.use(e.path, config.provider[e.method]);
        });
    }
}

var middleware = {
    doSecurity: function (req, res, next){
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

module.exports.loader = loader;
