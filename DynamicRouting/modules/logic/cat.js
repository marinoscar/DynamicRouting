var cat = {
    catRoute: function (req, res, next){
        res.send(cat.showCat());
    },
    showCat: function (){
        return 'Miau'
    }
}

module.exports = cat;