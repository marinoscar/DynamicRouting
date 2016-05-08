var home = {
    homeRoute: function (req, res, next) {
        res.send(cat.showHome());
    },
    showHome: function () {
        return '<h1>Welcome</h1>'
    }
}

module.exports = home;