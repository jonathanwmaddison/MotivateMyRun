#! /app/.heroku/node/bin/node
require('dotenv').config();
const mongoose = require('mongoose');
const Tweets = require('../models/tweets');
const ScrapeHistory = require('../models/scrape-history');
const https = require('https');
const mongooseConnection = require('../connectToDb')();

//  authorize app to use twitter API
const accessToken = process.env.ACCESS_TOKEN;

/**
 * Scrapes twitter for new posts with key hashtags(fromwhereirun & runstreak)
 */
function getTweets() {
    //  find update url from previous scrape
    ScrapeHistory.findOne({}, {}, {sort: {'date': -1}}, function(err, post) {
       let updateUrl;
        if(err) {
            console.log('Error checking scrape history');
        } else {
            if(post) {
                updateUrl = post.refresh_url;
                console.log('last scrape was ' + post.date);
            } else {
                updateUrl = '?q=%23fromwhereirun+OR+%23runstreak';
            }
        }
        let options = {
            hostname: 'api.twitter.com',
            path: '/1.1/search/tweets.json' + updateUrl,
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        };
        //  make call and combine chunked responses
        https.get(options, function(result) {
            let buffer = '';
            result.setEncoding('utf8');
            result.on('data', function(data) {
                buffer+= data;
            });
            result.on('end', function() {
                let tweets = JSON.parse(buffer);
                recordScrapeHistory(tweets.search_metadata);
                if(tweets.statuses.length > 0) {
                    addTweetsToDB(tweets);
                } else {
                    console.log('No new tweets found');
                    mongooseConnection.disconnect();
                }
            });
        });
    });
}

/**
 *  Adds new tweets to the database
 * @param {Object[]} tweets - The tweets that match the twitter api query.
 */
function addTweetsToDB(tweets) {
    let length = tweets.statuses.length;
    let count = 0;
    tweets.statuses.forEach(function(seed) {
        let url = 'https:\/\/twitter.com/'+seed.user.screen_name+'/status/'+seed.id_str;
        let tweet = {
            date: seed.created_at,
            text: seed.text,
            tweetId: seed.id_str,
            url: url,
            username: seed.user.screen_name,
        };
        Tweets.create(tweet, function(err, tweet) {
            if(err) {
                console.log(err);
            } else {
                console.log('added a twitter comment');
                count++;
                //  disconnect once all tweets have been added
                if(count == length) {
                    mongooseConnection.disconnect();
                }
            }
        });
    });
}

/**
 * Adds twitter scrape history to database
 * @param {Object[]} metadata - Data from the most recent scrape.
 */
function recordScrapeHistory(metadata) {
    ScrapeHistory.create(metadata, function(err, history) {
        if(err) {
            console.log(err);
        } else {
            console.log('added history to db');
        }
    });
}
//  Run Tweet Scraper
getTweets();
