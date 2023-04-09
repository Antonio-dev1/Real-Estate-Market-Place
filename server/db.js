const mongoose = require('mongoose')
require('dotenv').config();
const dbURI = process.env.Mongo_DB_URL;
console.log(dbURI)

mongoose.set('strictQuery', true)
module.exports = () => {
    return mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true});
}

