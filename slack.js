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
    var messageData = {
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
    
    var messageData = {
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
    var messageData = {
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
    var messageData = {
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

bot.on('start', function() {
	bot.postMessageToUser('lowes', 'meow!', function (data) {
		botId = data.message.bot_id;
	});
	// var os = require('os');
	// var ifaces = os.networkInterfaces();

	// Object.keys(ifaces).forEach(function (ifname) {
	//   	var alias = 0;

	//   	ifaces[ifname].forEach(function (iface) {
	//     	if ('IPv4' !== iface.family || iface.internal !== false) {
	// 	      	// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	// 	      	return;
	//     	}

	// 	    if (alias >= 1) {
	// 	      	// this single interface has multiple ipv4 addresses
	// 	      	console.log(ifname + ':' + alias, iface.address);
	// 	    } else {
	// 	      	// this interface has only one ipv4 adress
	// 	      	console.log(ifname, iface.address);
	// 	    }
	// 	    ++alias;
	//   	});
	// });
});


var download = function(uri, filename, callback){
	var options = {
  		url: uri,
  		headers: {
    		'Authorization': 'Bearer ' + config.slack_token
  		}
	};
 
	request(options, function(err, res, body){
		if(err){
			console.log(err);
		}else { 
			console.log('content-type:', res.headers['content-type']);
			console.log('content-length:', res.headers['content-length']);
			request(options).pipe(fs.createWriteStream(filename)).on('close', callback);
		}
	});
};

bot.on('message', function(data){
	if((data.bot_id == null || data.bot_id != botId) && data.type == "message"){
		if (data.subtype == "file_share"){
			var params = {
	            "attachments": [
	                {
		            	"fallback": "Required plain-text summary of the attachment.",
		                "image_url": data.file.url_private
	                }
	            ]
	        };

			download(data.file.url_private, data.file.id + "." + data.file.filetype, function(){
			  console.log('done');
			});

			if(data.file.filetype){

			}

	        bot.postMessage(data.channel, data.file.id + "." + data.file.filetype, params);
		} else{
			exports.recieveMessage({id: data.channel, text: data.text});
		}
	}
});