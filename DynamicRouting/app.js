var express = require('express');
var loader = require('./modules/loader/loader.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = {
 viewEngine: 'jade',
    routes: [
        { path: '/', method: 'showHome', provider: require('../modules/logic/home.js') },
        { path: '/do/dog', method: 'showDog', provider: require('../modules/logic/dog.js') },
        { path: '/do/cow', method: 'showCow', provider: require('../modules/logic/cow.js') },
        { path: '/do/cat', method: 'showCat', provider: require('../modules/logic/cat.js') },
    ]
}

//load the routes dynamically
loader.routes({
    routes: [
        { path: '/', method: 'showHome', provider: require('../modules/logic/home.js') },
        { path: '/do/dog', method: 'showDog', provider: require('../modules/logic/dog.js') },
        { path: '/do/cow', method: 'showCow', provider: require('../modules/logic/cow.js') },
        { path: '/do/cat', method: 'showCat', provider: require('../modules/logic/cat.js') },
    ]
}, app);



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
