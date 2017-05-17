require('dotenv').config();
/**
 * Sends sms message to phone number through twilio api
 * @param {string} to - The phone number of the recipient of the message
 * @param {string} message - The message being sent
 */

function sendSms(to, message) {
    const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_TOKEN);
    return client.api.messages
        .create({
            body: message,
            to: to,
            from: process.env.TWILIO_NUMBER,
         }).then(function(data) {
            console.log('Run message send');
         }).catch(function(err) {
            console.log('Could not send run motivation', err);
         });
};

module.exports = sendSms;
