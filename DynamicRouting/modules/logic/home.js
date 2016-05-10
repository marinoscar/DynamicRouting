var home = {
    homeRoute: function (req, res, next) {
        res.send(this.showHome(res));
    },
    showHome: function (res) {
        res.render('home', { name: 'oscar' });
    }
}

module.exports = home;