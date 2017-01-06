var express              = require("express"),
      app                 = express(),
      bodyParser          = require("body-parser"),
      mongoose            = require("mongoose"),
      passport          = require("passport"),
      LocalStrategy     = require("passport-local"),
      passportLocalMongoose =   require("passport-local-mongoose")

var User = require("./models/user");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDb = require("./seeds");

seedDb();

mongoose.connect("mongodb://localhost/camp-app");

app.use(bodyParser.urlencoded({extendedt:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// check user is logged in function
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

// currentUser function 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// USR ROUTES

app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });
});



app.get('/login', function(req, res) {
    res.render('login');
});
app.post('/login', passport.authenticate('local',
{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}
),function(req, res) {
    
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds')
});

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
                res.render('campgrounds/campgrounds', {camp: showCampgrounds});
            }
        })
       
});

// create new 
app.get('/campgrounds/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});



// show page
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, findCampId){
        if(err){
            console.log('could not find the camp id');
        } else {
            res.render('campgrounds/show', {camp: findCampId});
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


app.get('/campgrounds/:id/comments/new',isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', {campground: campground});
        }
    });
});


app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// // add comments
// app.get('/campgrounds/:id/comments/new', function(req, res) {
//     Campground.findById(req.params.id, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             res.render('comments/new', {campground: campground});
//         }
//     });
// });


// app.post('/campgrounds/:id/comments', function(req, res) {
//     Campground.findById(req.params.id, function(err, campground) {
//         if(err){
//             console.log(err);
//             res.redirect('/campgrounds');
//         }else{
//             Comment.create(req.body.comment, function(err, comment){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     campground.comments.push(comment);
//                     campground.save();
//                     res.redirect('/campgrounds/' + campground._id );
//                 }
//             });
//         }
//     });
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});