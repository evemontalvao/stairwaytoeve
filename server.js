var 
http = require('http'),
express = require('express'),
path = require('path');
fs = require('fs'),
app = express(),
servePosts = require('./scripts/servePosts'),

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


http.createServer(app).listen(2107);

console.log("Server listening on port 2107");

