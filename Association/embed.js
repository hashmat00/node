var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/embed-app");

// Post schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model('Post',postSchema );


// User schema
var userschema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("user", userschema);




// // New user
// var newUser = new User({
//     email: 'info@hashmat00.com',
//     name: 'hashmat mh'
// });

// newUser.posts.push({
//     title: 'user post',
//     content: 'this is user post content'
// });


// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: 'post 1',
//     content: 'post content description'
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     } 
// });




//find all user/posts

User.findOne({name: 'hashmat mh'}, function(err, user){
    if(err){
        console.log(err);
    }else{
        user.posts.push({
            title: 'new post',
            content: 'this is hashmat post'
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        })
    }
});