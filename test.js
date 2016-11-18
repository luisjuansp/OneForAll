var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage(message);
	
	oneForAll.sendImage({
		service: message.service,
		data: {
			id : message.data.id,
			image : "https://scontent.xx.fbcdn.net/v/t34.0-12/15129935_10155401879574428_1448012768_n.png?oh=fd144d7e8d888ce5233a8a25cfeacc09&oe=58318C0E"
		}
	});
	
}

oneForAll.listen();