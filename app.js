var  express = require('express');
var mongoose = require('mongoose');
var Tweets = require('./models/tweets');
var indexRoute = require('./routes/index');
var seedDB = require('./seeds');

var app = express()


//Connect to Database
var database = 'mongodb://localhost/motivate_my_run';
mongoose.connect(database);

seedDB();

//Set up routes
app.use("/",indexRoute)

app.listen("3000", function() {
    console.log("Twitter Scraper has started on port 3000")
})
