require('dotenv').config()
// sendSms connects with twilio and sends a message
var twilioClient = {};
twilioClient.sendSms = function(to, message) {
    var client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);
    return client.api.message
        .create({
            body: message,
            to: to,
            from: process.env.TWILIO_NUMBER,
         }).then(function(data) {
            console.log('Run message send');
         }).catch(function(err) {
            console.log('Could not send run motivation', err)
         });
};

module.exports = twilioClient
