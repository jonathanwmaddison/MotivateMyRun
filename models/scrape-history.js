var mongoose = require('mongoose');

var scrapeHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now() },
    refresh_url: String,
    count: Number,
});

module.exports = mongoose.model('ScrapeHistory', scrapeHistorySchema)
