var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(data){
	exports.sendMessage(data);
}

oneForAll.listen();