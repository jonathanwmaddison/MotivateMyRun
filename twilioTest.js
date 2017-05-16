require('dotenv').config();
var accountSid = process.env.TWILIO_ID;
var authToken = process.env.TWILIO_TOKEN;
var twilioNumber = process.env.TWILIO_NUMBER;

var twilio = require('twilio');
var client = new twilio(accountSid, authToken)

client.messages.create({
    body: 'Hello BUG :) <3',
    to: '+18027341161',  // Text this number
    from: twilioNumber // From a valid Twilio number
})
.then((message) => console.log(message.sid));
