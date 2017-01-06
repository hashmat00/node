var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// check user is logged in function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}






// show all campg on homepage
router.get('/', function(req, res){
        Campground.find({}, function(err, showCampgrounds){
            if(err){
                console.log('something went wrong');
            } else {
                res.render('campgrounds/campgrounds', {camp: showCampgrounds});
            }
        })
       
});

// create new 
router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});



// show page
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, findCampId){
        if(err){
            console.log('could not find the camp id');
        } else {
            res.render('campgrounds/show', {camp: findCampId});
        }
    });
});


router.post('/', function(req, res){
       var name = req.body.name;
       var image = req.body.image;
       var desc = req.body.description;
       var newCamp = {name: name, image: image, description: desc};
       
       Campground.create(newCamp, function(err, addCamp){
           if(err){
               console.log('could not be able to ADD camp to DB');
           } else {
              res.redirect('/campgrounds'); 
           }
       });
       
       
});



module.exports = router;

