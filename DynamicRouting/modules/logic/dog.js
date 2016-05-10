var dog = {
    dogRoute: function (req, res, next) {
        res.send(dog.showDog());
    },
    showDog: function () {
        return 'Woof'
    }
}

module.exports = dog;