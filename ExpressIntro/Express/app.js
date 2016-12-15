var express = require("express");
var app = express();




app.get("/", function(req, res){
    res.send("Hi dear ");
});

app.get("/about", function(req, res){
    console.log('someone made a request');
    res.send("Welcome to about page");
})


app.get("/r/:subredditName/comment/:id/:title", function(req, res) {
    
    var reddit = req.params.subredditName;
    
    res.send("You are in " + reddit + "page");
    console.log(req.params);
});


app.get("*", function(req, res) {
    res.send("You are in 404 page...");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});