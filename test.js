var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage(message);
	

	
}
oneForAll.recieveImage = function(message){
	
	
	oneForAll.sendImage(message);
	
}

oneForAll.listen();