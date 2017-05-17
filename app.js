var express = require('express');
var app = express()
var twilioClient = require('./twilioClient');
var fetchTweet = require('./fetchTweet');

var port = process.env.port ? process.env.port : "3000"
var ip = process.env.ip ? process.env.ip : "localhost";


//Set up routes
app.use("/", function() {
    fetchTweet(twilioClient.sendSms)    
})

app.listen(port, ip, function() {
    console.log("Twilio client has started on port "+port)
})
