var express = require('express');
var mongoose = require('mongoose');
var Tweets = require('./models/tweets');
var indexRoute = require('./routes/index');
var twilioClient = require('./twilioClient')

var app = express()
var port = process.env.port ? process.env.port : "3000"
var ip = process.env.ip ? process.env.ip : "localhost";

//Connect to Database
var database = 'mongodb://localhost/motivate_my_run';
mongoose.connect(database);

//Set up routes
app.use("/", twilioClient('+18027341161','hello world'))

app.listen(port, ip, function() {
    console.log("Twitter Scraper has started on port"+port)
})
