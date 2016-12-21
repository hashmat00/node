var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser")

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get('/', function(req, res){
    res.render('search');
});


app.get('/result', function(req, res){
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
             var data = JSON.parse(body);
          res.render('result', {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server has started');
});







// request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(error, response, body){
//   if(!error && response.statusCode == 200){
//       var data = JSON.parse(body);
//       console.log(data["query"]["results"]);
//   } 
// });