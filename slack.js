var SlackBot = require('slackbots');
var fs = require('fs');
var request = require('request');
var config = require('./config.json');

var botId = "";

var bot = new SlackBot({
    token: config.slack_token, 
    name: config.slack_name
});

var exports = {};

exports.recieveMessage = function (_){
	//virtual
}

exports.recieveImage = function (_){
	//virtual
}

exports.recieveAudio = function (_){
	//virtual
}

exports.recieveGif = function (_){
	//virtual
}

exports.recieveVideo = function (_){
	//virtual
}

exports.recieveFile = function (_){
	//virtual
}

exports.sendImage = function(data) {
    var params = {
        "attachments": [
            {
            	"fallback": "Required plain-text summary of the attachment.",
                "image_url": data.url
            }
        ]
    };

    bot.postMessage(data.id, data.url, params);
}

exports.sendMessage = function(data) {
    bot.postMessage(data.id, data.text);
}

exports.sendAudio = function(data) {
	data.text = "audio: " + data.url;
    exports.sendMessage(data);
}

exports.sendGif = function(data) {
    exports.sendMessage(data);
    data.text = "gif: " + data.url;
}

exports.sendVideo = function(data) {
    exports.sendMessage(data);
    data.text = "video: " + data.url;
}

exports.sendFile = function (data) {
	exports.sendMessage(data);
	data.text = "file: " + data.url;
}

bot.on('start', function() {
	bot.postMessageToUser('lowes', 'Booting!', function (data) {
		botId = data.message.bot_id;
	});
});

bot.on('message', function(data){
	if((data.bot_id == null || data.bot_id != botId) && data.type == "message"){
		if (data.subtype == "file_share"){

			var message = {
				id : data.channel,
  				url: data.file.url_private,
		  		httpOptions: {
		  			headers: {
			    		'Authorization': 'Bearer ' + config.slack_token
			  		}
			  	}
			};

			if(data.file.mimetype.startsWith("image/gif")){
				exports.recieveGif(message);
			} else if(data.file.mimetype.startsWith("video")){
				exports.recieveVideo(message);
			} else if(data.file.mimetype.startsWith("image")){
				exports.recieveImage(message);
			} else if(data.file.mimetype.startsWith("audio")){
				exports.recieveAudio(message);
			} else {
				exports.recieveFile(message);
			}
		} else{
			exports.recieveMessage({id: data.channel, text: data.text});
		}
	}
});

module.exports = exports;