var express = require('express');
var app = express()
var twilioClient = require('./twilioClient');
var fetchTweet = require('./fetchTweet');

var port = process.env.PORT ? process.env.PORT : "3000"
var ip = process.env.IP ? process.env.IP : "localhost";


//Set up routes
app.get("/", function() {
    fetchTweet(twilioClient.sendSms)    
})

app.listen(port, ip, function() {
    console.log("Twilio client has started on port "+port)
})
