'use strict'

const request = require('request')
var config = require('./config.json');
var exports = {};

const token = config.facebook_token; 


module.exports = function(app) {
    // Index route
    app.get('/', function (req, res) {
        res.send('Facebook API twerks')
    })

    // for Facebook verification
    app.get('/webhook/', function (req, res) {
        if (req.query['hub.verify_token'] === config.facebook_verify_token ) {
            res.send(req.query['hub.challenge'])
        } else {
            res.send('Error, wrong token')
        }
    })


    app.post('/webhook', function (req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
        var pageID = pageEntry.id;
        var timeOfEvent = pageEntry.time;

        // Iterate over each messaging event
        pageEntry.messaging.forEach(function(messagingEvent) {
            if (messagingEvent.message) {
                //exports.recieveMessage({id: sender, text: text});
                receivedMessage(messagingEvent);
            } else {
            console.log("Webhook received unknown messagingEvent: ", messagingEvent);
            }
        });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know you've 
        // successfully received the callback. Otherwise, the request will time out.
        res.sendStatus(200);
    }
    });


    function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;


    var messageId = message.mid;
    var appId = message.app_id;
    var metadata = message.metadata;

    // You may get a text or attachment but not both
    var messageText = message.text;
    var messageAttachments = message.attachments;

    

    if (messageText) {

        // If we receive a text message, check to see if it matches any special
        // keywords and send back the corresponding example. Otherwise, just echo
        // the text we received.

        exports.recieveMessage({id: senderID, text: messageText});
        
    } else if (messageAttachments) {
        
        messageAttachments.forEach(function(attachment) {
            var data = {id : senderID, url : attachment.payload.url};
            switch (attachment.type) {
                case "image":
                    exports.recieveImage(data);
                break;
                case "video":
                    exports.recieveVideo(data);
                break;
                case "audio":
                    exports.recieveAudio(data);
                break;
                default:
                    exports.recieveMessage(data)
                break;
            }

        });
    }
    }

    function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        if (messageId) {
            console.log("Successfully sent message with id %s to recipient %s", 
            messageId, recipientId);
        } else {
        console.log("Successfully called Send API for recipient %s", 
            recipientId);
        }
        } else {
        console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
    });  
    }


    app.post("/send", function(req, res){

        var facebookIds = req.body.facebookIds;

        for (var i = 0; i < facebookIds.length; i++ ) {

            var image = req.body.image;
            if (image) {

                refreshGrid(facebookIds[i], image, function(result) {

                    console.log(result);
                });
            }
            sendTextMessage(facebookIds[i], req.body.text);
        }

        var slackIds = req.body.slackIds;

        for (var i = 0; i < slackIds.length; i++ ) {

            var image = req.body.image;
            if (image) {

                slackRefreshGrid(image, slackIds[i]);
            }
            bot.postMessage(slackIds[i], req.body.text);
        }

        //bot.postMessage("D25K85JSX", req);
        res.send(req.body);    // echo the result back
        
    });


    app.get("/send", function(req, res){    

        
        res.send('GET')
        var sender = "10157758880380472";
        sendTextMessage(sender,sender);
        
        //bot.postMessage("D25K85JSX", req);
        
    });


    exports.listen = function () {
        // Spin up the server
        app.listen(app.get('port'), function() {
            console.log('running on port', app.get('port'))
        })
    };

    exports.recieveMessage = function (data) {
        //virtual
    }

    exports.sendMessage = function (data) {
        let messageData = {
                recipient: {id:data.id},
                message: { text:data.text },
            };
        callSendAPI(messageData);
    }

    exports.sendImage = function(data) {
        let messageData = {
                message: {
                        attachment: {
                        type: "image",
                        payload: {
                            url	: data.url,
                        }
                    }
                },
                recipient: {id:data.id}            
            };
        callSendAPI(messageData);
    }


    exports.sendAudio = function(data) {
        
        let messageData = {
                message: {
                        attachment: {
                        type: "audio",
                        payload: {
                            url	: data.url,
                        }
                    }
                },
                recipient: {id:data.id}            
            };
        callSendAPI(messageData);
    }

    exports.sendGif = function(data) {
        let messageData = {
                message: {
                        attachment: {
                        type: "image",
                        payload: {
                            url	: data.url,
                        }
                    }
                },
                recipient: {id:data.id}            
            };
        callSendAPI(messageData);
    }

    exports.sendVideo = function(data) {
        let messageData = {
                message: {
                        attachment: {
                        type: "video",
                        payload: {
                            url	: data.url,
                        }
                    }
                },
                recipient: {id:data.id}            
            };
        callSendAPI(messageData);
    }

    return exports;
    //module.exports = exports;
}