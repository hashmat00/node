var express              = require("express"),
     app                 = express(),
     bodyParser          = require("body-parser"),
      mongoose            = require("mongoose"),
      passport           = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose =   require("passport-local-mongoose"),
      User                  = require("./models/user")
      
      
      var commentsRoute = require("./routes/comments"),
          campgroundRoute     = require("./routes/campgrounds"),
          indexRoute    = require("./routes/index"),
          seedDB        = require("./seeds")
          
          
mongoose.connect("mongodb://localhost/camp_v7");









app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


//call seedDB function to remove all camps
// seedDB();



//PASSPORT CONFIG ///
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



//restrict user to login
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})




app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentsRoute);






app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Server has started");
});