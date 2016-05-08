var cat = {
    catRoute: function (req, res, next){
        res.send(cat.showCat());
    },
    showCat: function (){
        return '<h1>I am a cat</h1>'
    }
}

module.exports = cat;