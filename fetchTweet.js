require('dotenv').config();
const mongoose = require('mongoose');
const Tweets = require('./models/tweets');

//  get config variables and connect to DB
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;
const database = 'mongodb://'+dbUsername+':'+dbPassword+dbUrl;
mongoose.connect(database);

/**
 * Finds random tweet in database
 * @param {requestCallback} messageHandler - The callback that sends the random tweet to Twilio.
 */
function fetchTweet(messageHandler) {
    Tweets.count().exec(function(err, count) {
        let random = Math.floor(Math.random() * count);
        Tweets.findOne().skip(random).exec(
            function(err, result) {
                let {text, url, username} = result;
                let message = 'DAILY RUN MOTIVATION - "';
                message += text + '" ' + username + '@ ' + url;
                messageHandler('+18027341161', message);
            });
    });
}
module.exports = fetchTweet;
