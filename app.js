var express = require('express');
var app = express()
var twilioClient = require('./twilioClient');
var fetchTweet = require('./fetchTweet');

var port = process.env.PORT ? process.env.PORT : "3000"


//Set up routes
app.get("/", function(res, req) {
    res.send('twilio message being sent')
    fetchTweet(twilioClient.sendSms)    
})

app.listen(port, function() {
    console.log("Twilio client has started on port "+port)
})
