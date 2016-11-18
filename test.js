var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage(message);
}

oneForAll.recieveImage = function(message){
	oneForAll.sendImage(message);
}

oneForAll.recieveAudio = function(message){
	oneForAll.sendAudio(message);
}

oneForAll.recieveGif = function(message){
	oneForAll.sendGif(message);
}

oneForAll.recieveVideo = function(message){
	oneForAll.sendVideo(message);
}

oneForAll.app.post('/oneForAll', function (req, res) {
	switch(req.action){
		case "message":
			oneForAll.sendMessage(req.metadata);
		break;
		case "image":
			oneForAll.sendImage(req.metadata);
		default:
		break;
	}
});
