const express = require('express');
const app = express();
const path = require('path');
const sendSms = require('./helpers/sendSms');
const fetchTweet = require('./helpers/fetchTweet');
const port = process.env.PORT ? process.env.PORT : '3000';

//  Set up Express Route
app.get('/', function(req, res) {
    console.log('test')
    res.send('Random message pulled from db and sent through Twilio');
    fetchTweet(sendSms);
});
app.get('/documentation', function(req, res) {
    res.sendFile(path.join(__dirname+'/documentation/global.html'));
});
//  Run Server
app.listen(port, function() {
    console.log('Twilio client has started on port '+port);
});
