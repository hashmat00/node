var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


// check user is logged in function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');
    res.redirect('/login');
}



// check owner ship middleware
function campgroundOwnerShip(req, res, next){
    if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, foundCampground){
              if(err){
                   res.redirect('back');
               }else{
                  if(foundCampground.author.id.equals(req.user._id)){
                     next();
                  }else{
                      res.redirect('back')
                  }
              
                   
               }
         }) ;
    }else{
        req.flash('error', "You don't have permission to do this");
        res.redirect('back');
    }
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




router.post('/', isLoggedIn, function(req, res){
       var name = req.body.name;
       var image = req.body.image;
       var descriptions = req.body.descriptions;
       var author = {
           id: req.user._id,
           username: req.user.username
       };
       var newCamp = {name: name, image: image, descriptions: descriptions, author: author};
       
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

router.get('/:id/edit', campgroundOwnerShip, function(req, res) {

          Campground.findById(req.params.id, function(err, foundCampground){
            res.render('campgrounds/edit', {campground: foundCampground}); 
          });
});



router.put('/:id', campgroundOwnerShip, function(req, res){
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

router.delete('/:id', campgroundOwnerShip, function(req, res){
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

