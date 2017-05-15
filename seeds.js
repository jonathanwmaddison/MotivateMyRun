var mongoose = require("mongoose");
var Tweets = require("./models/tweets");
var ScrapHistory = require("./models/scrap-history");
var OAuth2 = require('OAuth').OAuth2;
var https = require('https')

//Connect to DB
var database = 'mongodb://localhost/motivate_my_run';
mongoose.connect(database);

//authorize app to use twitter API
var token = process.env.TWITTER_TOKEN
var secret = process.env.TWITTER_SECRET
var access_token;
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

//Set up twitter API call

var options = {
    hostname: 'api.twitter.com',
    path: '/1.1/search/tweets.json?q=%23Runspiration',
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
        var tweets = JSON.parse(buffer);
        console.log(tweets)
        addTweetsToDB(tweets)
    })
});



function addTweetsToDB(tweets) {
    console.log('test runnnn')
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
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = seedDB;
