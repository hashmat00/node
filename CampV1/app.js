var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extendedt:true}));
app.set('view engine', 'ejs');

 var campgrounds = [
       {name: 'Salmon', image: 'https://images.unsplash.com/16/unsplash_5249ec183ab2c_1.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&s=c8adf40ea03469df686fcb3568d27f3c'},
       {name: 'Forest', image: 'https://www.brokersdf.com/wp-content/uploads/2015/06/unsplash-beton-spiral-400x400.jpg'},
       {name: 'Jannah', image: 'http://nonprofitstorytellingconference.com/wp-content/uploads/2016/01/unsplash.jpg'}
       ];

app.get('/', function(req, res){
    res.render('landing');
});


app.get('/campgrounds', function(req, res){
  
       res.render('campgrounds', {camp: campgrounds});
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.post('/campgrounds', function(req, res){
       var name = req.body.name;
       var image = req.body.image;
       var newCamp = {name: name, image: image};
       campgrounds.push(newCamp);
       res.redirect('/campgrounds');
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});