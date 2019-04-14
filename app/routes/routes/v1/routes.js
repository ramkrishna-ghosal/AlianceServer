const express = require('express');
const Router = express.Router();


module.exports = (app) => {
    console.log(`Initializing AlianceApp backend server`);
    app.use('/api/admin', require('../../controllers/v1/admin'));
    app.use('/api/core', require('../../controllers/v1/core'));
    app.use('/api/students', require('../../controllers/v1/students'));
    app.use('/api/socials', require('../../controllers/v1/socials'));
}
