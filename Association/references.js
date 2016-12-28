var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/references-app");

var Post = require("./model/post");
var User = require("./model/user");



Post.create({
    title: 'how to cook the best burger PT-4',
    content: 'palow palow palow---------'
}, function(err, post){
    User.findOne({name: 'hashmat mhh'}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                }else{ 
                    console.log(data);
                }
            });
        }
    });
});





// User.create({
//     email: 'hashmat@gmail.com',
//     name: 'hashmat mhh'
// });


//Find user

User.findOne({email: 'hashmat@gmail.com'}).populate('posts').exec(function(err, user){
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
})
//find all user posts