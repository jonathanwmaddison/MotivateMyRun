require('dotenv').config();
const OAuth2 = require('OAuth').OAuth2;
const token = process.env.TWITTER_TOKEN;
const secret = process.env.TWITTER_SECRET;

const oauth2 = new OAuth2(token, secret, 'https://api.twitter.com/', null, 'oauth2/token', null);

oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
    }, function (e, response_token) {
        console.log(response_token);
    }    
);

