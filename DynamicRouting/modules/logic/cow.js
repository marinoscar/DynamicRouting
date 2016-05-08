var cow = {
    cowRoute: function (req, res, next) {
        res.send(cow.showcow());
    },
    showCow: function () {
        return '<h1>I am a cow</h1>'
    }
}

module.exports = cow;