var home = {
    homeRoute: function (req, res, next) {
        home.showHome(res);
    },
    showHome: function (res) {
        res.render('home', { name: 'oscar' });
    }
}

module.exports = home;