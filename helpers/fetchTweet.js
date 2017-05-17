require('dotenv').config();
const databaseConnection = require('./connectToDb')()
const Tweets = require('../models/tweets');

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
