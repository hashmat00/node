var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');
    res.redirect('/login');
};


// check Campground user is logged in function
middlewareObj.campgroundOwnerShip = function(req, res, next){
    if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, foundCampground){
              if(err){
                   res.redirect('back');
               }else{
                  if(foundCampground.author.id.equals(req.user._id)){
                     next();
                  }else{
                      res.redirect('back');
                  }
              
                   
               }
         }) ;
    }else{
        req.flash('error', "You don't have permission to do this");
        res.redirect('back');
    }
};




// Comment ownership
middlewareObj.commentOwnerShip = function(req, res, next){
    if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err){
                   res.redirect('back');
               }else{
                  if(foundComment.author.id.equals(req.user._id)){
                     next();
                  }else{
                      res.redirect('back')
                  }
              
                   
               }
         }) ;
    }else{
        
        res.redirect('back');
    }
}





module.exports = middlewareObj;