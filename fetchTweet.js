require('dotenv').config()
var mongoose = require('mongoose');
var Tweets = require('./models/tweets');

var dbUsername = process.env.DB_USERNAME;
var dbPassword = process.env.DB_PASSWORD;
var database = 'mongodb://'+dbUsername+':'+dbPassword+'@ds143071.mlab.com:43071/motivate_my_run'

mongoose.connect(database);
function fetchTweet(callback) {
    Tweets.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count)
        Tweets.findOne().skip(random).exec(
            function (err, result) {
                callback('+18027341161',result.text) 
            })
    })
}
module.exports = fetchTweet;
