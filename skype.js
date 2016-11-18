'use strict'

var restify = require('restify');
var builder = require('botbuilder');
var config = require('./config.json');
const express = require('express')
const app = express()
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
//var server = restify.createServer();
var exports = {};

app.set('port',  5001);

app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
})

app.get('/', function (req, res) {
    res.send('Skype API twerks')
})
/*
// Create chat bot
var connector = new builder.ChatConnector({
    appId: config.skype_app_id,
    appPassword: config.skype_password
});


var bot = new builder.UniversalBot(connector);
app.post('/skypehook', connector.listen());
//server.post('/api/messages', connector.listen());
//Bot on
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
  console.log(message);
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
bot.dialog('/', function (session) {
    if(session.message.text.toLowerCase().contains('hello')){
      session.send(`Hey, How are you?`);
      }else if(session.message.text.toLowerCase().contains('help')){
        session.send(`How can I help you?`);
      }else{
        session.send(`Sorry I don't understand you...`);
      }
});


*/