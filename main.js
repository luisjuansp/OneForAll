var facebook = require('./facebook.js');

var exports = {};

exports.sendMessage = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendMessage(metadata.data);
	}
}

exports.sendImage = function (data) {
	facebook.sendImage(data);
}

exports.recieveMessage = function (data){
	//virtual
}

facebook.recieveMessage = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveMessage(data);
}

exports.listen = function () {
	facebook.listen()
;}

module.exports = exports;