const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Register all models
require('./models/Card');


// Create database connection
const mongoDB = 'mongodb://db:27017/data';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!!')
});




const app = express();

// Set some helper lib for express
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Setup for CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  });

// Setup routes
require('./routes/cardRoutes')(app);

// Start application
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})