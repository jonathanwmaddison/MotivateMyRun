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
                if (err) {
                    console.log(err)
                } else {
                    let {text, url, username} = result;
                    let message = 'Here\'s your run motivation from Twitter user @';
                    message += username + ': "' + text + '". Permalink: ' + url;
                    messageHandler('', message).catch(function(error) {
                        console.log(error);
                    });
                }
            });
    });
}
module.exports = fetchTweet;
