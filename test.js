var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(data){
	oneForAll.sendMessage(data);
}

oneForAll.listen();