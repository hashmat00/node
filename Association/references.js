var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/references-app");

// Post schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model('Post',postSchema );


// User schema
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Post"
        }
        ]
});
var User = mongoose.model("User", userSchema);


// Post.create({
//     title: 'how to cook the best burger PT-3',
//     content: 'kabob akbob kabob ---------'
// }, function(err, post){
//     User.findOne({name: 'hashmat mhh'}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         }else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 }else{ 
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });





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