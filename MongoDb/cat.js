var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat-app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


var Cat = mongoose.model("Cat", catSchema);

// var jimmy = new Cat({
//     name: "jimmy",
//     age: 20,
//     temperament: "Gucci"
// });

// jimmy.save(function(err, cat){
//     if(err){
//         console.log('something went wrong');
//     } else {
//         console.log("we jsut addeda  new cat to DB");
//         console.log(cat);
//     }
// });




// Cat.create({
//     name: "jean",
//     age: 22,
//     temperament: "Ralph"
// }, function(err, cat){
//     if(err){
//             console.log('something went wrong');
//     } else {
//         console.log(cat);
//     }
// });




Cat.find({}, function(err, cats){
    if(err){
        console.log('something went wrong');
    } else {
        console.log(cats);
    }
})