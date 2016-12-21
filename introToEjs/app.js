var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", 'ejs');


app.get('/', function(req, res){
    res.send('welcome to homepage');
});

app.get('/about/:thing', function(req, res){
    var mything = req.params.thing;
    
    res.render('home', {thing: mything});
});


app.get('/post', function(req, res) {
    
    var posts = [
        {title: 'post number 1', author: 'hashmat'},
        {title: 'post number 2', author: 'yusuf'},
        {title: 'post number 3', author: 'haroon'}
        ];
        
        
        res.render('post', {posts: posts});
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});