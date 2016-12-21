var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", 'ejs');

var friends = ['hashmat', 'jimmy', 'john'];


app.get('/', function(req, res){
    
    res.render('home');
});


app.post('/addfriend', function(req, res){
    var newFriend = req.body.friends;
    friends.push(newFriend);
    res.redirect('friends');
});


app.get('/friends', function(req, res){
    
    res.render('friend', {friends: friends});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});