var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/");


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
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});




router.post('/', middleware.isLoggedIn, function(req, res){
       var name = req.body.name;
       var price = req.body.price;
       var image = req.body.image;
       var descriptions = req.body.descriptions;
       var author = {
           id: req.user._id,
           username: req.user.username
       };
       var newCamp = {name: name, price: price, image: image, descriptions: descriptions, author: author};
       
       Campground.create(newCamp, function(err, addCamp){
           if(err){
               console.log('could not be able to ADD camp to DB');
           } else {
              res.redirect('/campgrounds'); 
           }
       });
       
       
});



// show page
router.get('/:id', function(req, res) {
    // res.send("This is the View page of camp");
    
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/show', {camp: foundCamp});
        }
    });
});




// edit campground

router.get('/:id/edit', middleware.campgroundOwnerShip, function(req, res) {

          Campground.findById(req.params.id, function(err, foundCampground){
            res.render('campgrounds/edit', {campground: foundCampground}); 
          });
});



router.put('/:id', middleware.campgroundOwnerShip, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
       if(err){
           req.flash('error', err.message);
           res.redirect('/campgrounds');
       }else{
           req.flash('success', 'You have successfully edit the campground');
           res.redirect('/campgrounds/' + req.params.id );
       }
   });    
});





// Delete Campground

router.delete('/:id', middleware.campgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, removeCampgorund){
        if(err){
            res.redirect('/campgrounds/' + req.params.id);
        }else{
            req.flash('success', 'You have successfully deleted the campground');
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;

