require('dotenv').config();
const mongoose = require('mongoose');
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = process.env.DB_URL;
const database = 'mongodb://'+dbUsername+':'+dbPassword+dbUrl;
/**
 *Connects to Database and return mongoose so connection can be closed
 */
function connectToDb() {
    mongoose.connect(database); 
    return mongoose;
};
module.exports = connectToDb;
