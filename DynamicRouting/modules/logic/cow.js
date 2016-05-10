var cow = {
    cowRoute: function (req, res, next) {
        res.send(cow.showCow());
    },
    showCow: function () {
        return 'Muu'
    }
}

module.exports = cow;