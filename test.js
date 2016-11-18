var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage(message);
}

oneForAll.recieveImage = function(message){
	oneForAll.sendImage(message);
}

oneForAll.recieveAudio = function(message){
	oneForAll.sendImage(message);
}

oneForAll.recieveGif = function(message){
	oneForAll.sendGif(message);
}

oneForAll.recieveVideo = function(message){
	oneForAll.sendVideo(message);
}

oneForAll.listen();