var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDb = require("./seeds");


seedDb();

mongoose.connect("mongodb://localhost/camp-app");

app.use(bodyParser.urlencoded({extendedt:true}));
app.set('view engine', 'ejs');




// Campground.create(
//  {
//      name: 'Jannah',
//      image: 'http://nonprofitstorytellingconference.com/wp-content/uploads/2016/01/unsplash.jpg',
//      description: "this is the campground descriptions"
//   }, function(err, campground){
//       if(err){
//           console.log('something went wrong');
//       }else {
//           console.log('A camp added to DB');
//           console.log(campground);
//       }
//   });


//  var campgrounds = [
//       {name: 'Salmon', image: 'https://images.unsplash.com/16/unsplash_5249ec183ab2c_1.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=c8adf40ea03469df686fcb3568d27f3c'},
//       {name: 'Forest', image: 'https://www.brokersdf.com/wp-content/uploads/2015/06/unsplash-beton-spiral-400x400.jpg'},
//       {name: 'Jannah', image: 'http://nonprofitstorytellingconference.com/wp-content/uploads/2016/01/unsplash.jpg'}
//       ];

app.get('/', function(req, res){
    res.render('landing');
});


// show all campg on homepage
app.get('/campgrounds', function(req, res){
        Campground.find({}, function(err, showCampgrounds){
            if(err){
                console.log('something went wrong');
            } else {
                res.render('campgrounds', {camp: showCampgrounds});
            }
        })
       
});

// create new 
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});



// show page
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, findCampId){
        if(err){
            console.log('could not find the camp id');
        } else {
            res.render('show', {camp: findCampId});
        }
    })
});


app.post('/campgrounds', function(req, res){
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





app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});