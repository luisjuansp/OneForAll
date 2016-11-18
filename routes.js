const express = require('express')
const bodyParser = require('body-parser')

module.exports = function (app) {
    // set up the routes themselves
    app = express();
    
    app.set('port', (process.env.PORT || 5000))

    // Process application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // Process application/json
    app.use(bodyParser.json())
    
};