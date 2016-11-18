const express = require('express')
const bodyParser = require('body-parser')


module.exports = function() {

    // set up the routes themselves
    app = express();

    app.set('port', (process.env.PORT || 5000))

    // Process application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // Process application/json
    app.use(bodyParser.json())

    app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
    })

    app.get('/', function (req, res) {
        res.send('Facebook API twerks')
    })

    return app;
}


