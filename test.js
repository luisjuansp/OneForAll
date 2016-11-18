var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage(message);
	

	
}
oneForAll.recieveImage = function(message){
	
	
	oneForAll.sendImage({
		service: message.service,
		data: {
			id : message.data.id,
			url : message.data.url  
		}
	});
	
}

oneForAll.listen();