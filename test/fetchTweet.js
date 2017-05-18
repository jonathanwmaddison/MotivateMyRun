const fetchTweet = require('../helpers/fetchTweet');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe('fetchTweet', function() {
    it('fetches a tweet', () => {
        return fetchTweet(function(number,tweet) {
                assert(number === '+18027341161', 'should send to correct number');
            })
     });
     it('fetches tweet and adds title', () => {

        return fetchTweet(function(number,tweet) {
            asssert(tweet.slice(0, 20)==='DAILY RUN MOTIVATION', 'should add title to message')
        });
     });
});
