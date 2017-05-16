require('dotenv').config()
var mongoose = require("mongoose");
var Tweets = require("./models/tweets");
var ScrapeHistory = require("./models/scrape-history");
var OAuth2 = require('OAuth').OAuth2;
var https = require('https')

//Connect to DB
var dbUsername = process.env.DB_USERNAME;
var dbPassword = process.env.DB_PASSWORD;

var database = 'mongodb://'+dbUsername+':'+dbPassword+'@ds143071.mlab.com:43071/motivate_my_run'

// for local testing  use mongodb://localhost/motivate_my_run';

mongoose.connect(database);

//authorize app to use twitter API
var token = process.env.TWITTER_TOKEN
var secret = process.env.TWITTER_SECRET
var access_token;

//needs to be updated
if(!process.env.ACCESS_TOKEN) {
    var oauth2 = new OAuth2(token, secret, 'https://api.twitter.com/', null, 'oauth2/token', null);
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
        }, function (e, response_token) {
            access_token = response_token;
    })
} else {
    access_token = process.env.ACCESS_TOKEN
}

getTweets()

function getTweets() {
    var options;
    //find update url from previous scrape
    ScrapeHistory.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
       var lastScrape;
        if(err) { 
            console.log('Did not retrieve latest post'); 
        } else {
            if(post) {
                lastScrape = post.refresh_url;
                console.log('last scrape was' + post.date)
            } else {
                lastScrape = '?q=%23Runspiration'
            }
        }
        var options = {
            hostname: 'api.twitter.com',
            path: '/1.1/search/tweets.json' + lastScrape,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }
        // make call and combine chunked responses
        https.get(options, function (result) {
            var buffer = ''
            result.setEncoding('utf8');
            result.on('data', function(data){
                buffer+= data;
            });
            result.on('end', function () {
                console.log(buffer)
                var tweets = JSON.parse(buffer);
                addTweetsToDB(tweets)
                recordScrapeHistory(tweets.search_metadata)
            })
        });
    });
}


function addTweetsToDB(tweets) {
    Tweets.remove({}, function(err) {
        if(err){
            console.log(err);
        } else {
            console.log("removed tweets!");
            tweets.statuses.forEach(function(seed){
                console.log(seed)
                var url = 'https:\/\/twitter.com/'+seed.user.screen_name+'/status/'+seed.id_str;
                var tweet = {
                    date: seed.created_at,
                    text: seed.text,
                    tweetId: seed.id_str,
                    url: url,
                    username: seed.user.screen_name
                }
  
                Tweets.create(tweet, function(err, tweet) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a twitter comment");
                    }
                });
            });
        }
    });   
}

function recordScrapeHistory(metadata) {
    ScrapeHistory.create(metadata, function(err, history) {
        if(err) {
            console.log(err)
        } else {
            console.log(history, 'added history to db')
        }
    });
}
//disconnect from DB when node service ends
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = addTweetsToDB;
