const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const path = require("path");

var express = require("express");
var cors = require('cors')
var app = express();
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//connect views and assets
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "assets")));

//start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
 
//define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname+"/views/index.html");
});

//db connection
var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'tankdb'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('DB connected!');
});

//db select
app.get("/tanks", function (request, response){
  con.query("SELECT * FROM tanks", function (err, result, fields) {
    if (err) throw err;
    response.json(result);
  });
});

//search tank
app.post('/search', function(request, response){
  var term = request.body.input;

  con.query("SELECT * FROM tanks WHERE name = \"" + term + "\"", function (err, result, fields) {
    if (err) throw err;   
  });
});

//add a new tank
app.post('/add', function(request, response){ 

  con.query("INSERT INTO `tankdb`.`tanks` (`name`, `lenght`, `width`, `height`, `weight`)VALUES ('" 
    + request.body.name 
    + "', '" + request.body.length
    + "', '" + request.body.width
    + "', '" + request.body.height
    + "', '" + request.body.weight
    + "');"
    , function (err, result, fields) {
    if (err) throw err;
  });

});