const path = require('path');
const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');

const mongodbConnection = require('./config/db');

const app = express();

// Config environmental variables
env.config();

// Activate body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/v1/courses', require('./router/courses.router'));



  

const PORT = process.env.LOCAL_PORT || 8080;
app.listen(PORT, () => {
  mongodbConnection();
  console.log(`Server started on port ${PORT}`);
});
