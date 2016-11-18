var oneForAll = require("./main.js");
var request = require('request');


oneForAll.recieveMessage = function(message){
	request.post({url:'http://159.203.78.76/api/receivetext', json : {message: message}}, function optionalCallback(err, httpResponse, body) {
	});
	oneForAll.sendMessage([message]);
}

oneForAll.recieveImage = function(message){
	request.post({url:'http://159.203.78.76/api/receiveimage', json : {message: message}}, function optionalCallback(err, httpResponse, body) {
	});
	oneForAll.sendImage([message]);
	require('./vision.js')(req.url, function (text) {
		message.text = text;
		oneForAll.sendMessage([message]);
		//send({text: text});
	});
}

oneForAll.recieveAudio = function(message){
	oneForAll.sendAudio([message]);
}

oneForAll.recieveGif = function(message){
	oneForAll.sendGif([message]);
}

oneForAll.recieveVideo = function(message){
	oneForAll.sendVideo([message]);
}

oneForAll.app.post('/oneForAll', function (req, res) {
	// console.log(req);
	req = req.body;
	switch(req.action){
		case "message":
			oneForAll.sendMessage(req.metadata);
			res.sendStatus(200);
		break;
		case "image":
			oneForAll.sendImage(req.metadata);
			res.sendStatus(200);
			break;
		case "detection":
			require('./vision.js')(req.url, function (text) {
				res.send({text: text});
			});
			break;
		default:
		break;
	}
});
