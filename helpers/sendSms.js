require('dotenv').config();
/**
 * Sends sms message to phone number through twilio api
 * @param {string} to - The phone number of the recipient of the message
 * @param {string} message - The message being sent
 * @param {object} config - Optional configuration for testing
 * @return {Promise}
 */
function sendSms(to, message, config) {
    let token, number, id;
    if (typeof config === 'object') {
        token = config.token;
        number = config.number;
        id = config.id
    } else {
       token = process.env.TWILIO_TOKEN;
       number = process.env.TWILIO_NUMBER;
       id = process.env.TWILIO_ID
    }
    const client = require('twilio')(id, token);
    return client.api.messages
        .create({
            body: message,
            to: to,
            from: number,
         })
};

module.exports = sendSms;
