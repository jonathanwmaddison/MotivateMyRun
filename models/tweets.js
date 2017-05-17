const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    username: String,
    text: String,
    images: Array,
    url: String,
    date: Date,
    tweetId: String,
    sent: {type: Boolean, default: false},
});

module.exports = mongoose.model('Tweets', tweetSchema);
