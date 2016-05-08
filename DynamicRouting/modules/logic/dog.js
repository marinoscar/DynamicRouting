var dog = {
    catRoute: function (req, res, next) {
        res.send(dog.showDog());
    },
    showDog: function () {
        return '<h1>I am a dog</h1>'
    }
}

module.exports = cat;