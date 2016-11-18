'use strict'

var restify = require('restify');
var builder = require('botbuilder');
var config = require('./config.json');

//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
//var server = restify.createServer();
var exports = {};

module.exports = function(app) {


    app.get('/', function (req, res) {
        res.send('Skype API twerks')
    })
    // Create chat bot
    var connector = new builder.ChatConnector({
        appId: config.skype_app_id,
        appPassword: config.skype_password
    });


    var bot = new builder.UniversalBot(connector);
    app.post('/skypehook', connector.listen());
    
    bot.on('contactRelationUpdate', function (message) {
        if (message.action === 'add') {
            var name = message.user ? message.user.name : null;
            var reply = new builder.Message()
                    .address(message.address)
                    .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
            bot.send(reply);
        } else {
            // delete their data
        }
    });
    bot.on('typing', function (message) {
    // User is typing
    //console.log(message);
    });
    bot.on('deleteUserData', function (message) {
        // User asked to delete their data
    });
    //=========================================================
    // Bots Dialogs
    //=========================================================
    String.prototype.contains = function(content){
    return this.indexOf(content) !== -1;
    }
    bot.dialog('/createSubscription', function (session, args) {
        // Serialize users address to a string.
        var address = JSON.stringify(session.message.address);

        session.send(address);
        // Save subscription with address to storage.
        session.sendTyping();
        createSubscription(args.userId, address, function (err) {
            // Notify the user of success or failure and end the dialog.
            var reply = err ? 'unable to create subscription.' : 'subscription created';
            session.endDialog(reply);
        }); 
    });
    bot.dialog('/', function (session) {
        console.log("Test");
        session.send(JSON.stringify(session));
        session.send("3");
        session.send(session.message);
        if(session.message.text.toLowerCase().contains('hello')){
        session.send(`Hey, How are you?`);
        }else if(session.message.text.toLowerCase().contains('help')){
            session.send(`How can I help you?`);
        }else{
            session.send(`Sorry I don't understand you...`);
        }

        
    });

/*

    
    bot.dialog('/', [
        function (session) {
            session.beginDialog('/ensureProfile', session.userData.profile);
        },
        function (session, results) {
            session.userData.profile = results.response;
            session.send('Hello %(name)s! I love %(company)s!', session.userData.profile);
        }
    ]);
    bot.dialog('/ensureProfile', [
        function (session, args, next) {
            session.dialogData.profile = args || {};
            if (!session.dialogData.profile.name) {
                builder.Prompts.text(session, "What's your name?");
            } else {
                next();
            }
        },
        function (session, results, next) {
            if (results.response) {
                session.dialogData.profile.name = results.response;
            }
            if (!session.dialogData.profile.company) {
                builder.Prompts.text(session, "What company do you work for?");
            } else {
                next();
            }
        },
        function (session, results) {
            if (results.response) {
                session.dialogData.profile.company = results.response;
            }
            session.endDialogWithResult({ response: session.dialogData.profile });
        }
    ]);*/
    


//module.exports = exports;
 return exports;
}