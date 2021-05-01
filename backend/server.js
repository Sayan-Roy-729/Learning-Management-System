const path = require('path');
const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import mongodb connection
const mongodbConnection = require('./config/db');

const app = express();

// Config environmental variables
env.config();

// Handle CORS errors
app.use(cors());

// Activate body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use('/api/v1/courses', require('./router/courses.router'));
app.use('/api/v1/', require('./router/payment.router'));

// Handle error via middleware
app.use((error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error.message });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    mongodbConnection();
    console.log(`Server started on port ${PORT}`);
});
