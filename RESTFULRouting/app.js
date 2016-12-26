var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");


mongoose.connect("mongodb://localhost/restful-app");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));




var BlogSchema = new mongoose.Schema({
    title: String,
    image : String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", BlogSchema);


// Blog.create({
//     title: 'hashmat',
//     image: 'http://www.w3schools.com/css/img_fjords.jpg',
//     body: 'this is the description',
    
// });


app.get('/', function(req, res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log('something went wrong');
        }else{
            res.render('index', {blogs: blog});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server has started');
});