var express = require('express');
var mongoose = require('mongoose');
var Tweets = require('./models/tweets');
var indexRoute = require('./routes/index');

var app = express()
var port = process.env.port ? process.env.port : "3000"
var ip = process.env.ip ? process.env.ip : "localhost";

//Connect to Database
var database = 'mongodb://localhost/motivate_my_run';
mongoose.connect(database);

app.use(twilioNotifications.sendMessage);

//Set up routes
app.use("/",indexRoute)

app.listen(port, ip, function() {
    console.log("Twitter Scraper has started on port"+port)
})
