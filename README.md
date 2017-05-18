# Motivate My Run

Motivate My Run is a prototype sms messaging service that sends randomly selected texts to a given cell phone number

## Installation instructions

run npm install for the required packages.

### Environmental Variables

Setup a .env file in your root with the following key values (you'll need to setup twitter, a database, and Twilio account). This was built using an mLabs hosted mongoDB database.

Database

DB_PASSWORD 
DB_USERNAME
DB_URL 

TWITTER_TOKEN -> Twitter api Token 

From your Twilio account

TWILIO_ID  
TWILIO_TOKEN 
TWILIO_NUMBER 
TWILIO_TEST_TOKEN 
TWILIO_TEST_ID

Other

RECEIVING_NUMBER -> Cell phone To Be Texted

## Running the server 

The server can be run locally using the script npm start.
It will run on localhost:3000.
To generate a text message send a get request to localhost:3000
You can also run on a service like heroku (make sure to set your .env)

### Setting up the Scraper 

The twitter scraping script is located in the bin folder of the project's root.

If you deploy this on Heroku, it is easy to schedule this script to run once every hour using Heroku scheduler. Simply run scraper.js in Heroku Scheduler

## Documentation

[See automatically generated documentation from jsdocs](https://jonathanwmaddison.github.io/MotivateMyRun/documentation/global.html)

## Testing

npm run-script lint will analyze all javascript files in the project based on Google linting standards.

npm test runs a few mocha/chai tests.
