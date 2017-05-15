var mongoose = require('mongoose');

var scrapHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    tweetsScrapped: Number,
});

module.exports = mongoose.model('Tweets', tweetSchema)
