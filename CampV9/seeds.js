var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var Data = [
    {
        name: 'Post 1',
        image: 'http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg',
        descriptions: 'this is content description'
    },
    {
        name: 'Post 2',
        image: 'http://cmc620.com/tours/wp-content/uploads/2016/07/Dubai-Photos-Images-Dubai-UAE-Pictures-800x600.jpg',
        descriptions: 'this is content description'
    },
    {
        name: 'Post 3',
        image: 'http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg',
        descriptions: 'this is content description'
    },
    {
        name: 'Post 4',
        image: 'http://cmc620.com/tours/wp-content/uploads/2016/07/Dubai-Photos-Images-Dubai-UAE-Pictures-800x600.jpg',
        descriptions: 'this is content description'
    }
    
    ]


function seedDb(){
       Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('campground has been removed');
        }
            // Data.forEach(function(seed){
            //     Campground.create(seed, function(err, data){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log('campground added');
            //                 Comment.create({
            //                     text: 'this is a new comment',
            //                     author: 'hash'
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     }else{
            //                       data.comments.push(comment);
            //                       data.save(); 
            //                       console.log('created new comment');
            //                     }
            //                  })
            //         }
            //     })
            // });
                
        
    });
 
}


module.exports = seedDb;
