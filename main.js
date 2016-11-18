var facebook = require('./facebook.js');

var exports = {};

exports.sendMessage = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendMessage(metadata.data);
	}
}

exports.sendImage = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendImage(metadata.data);
	}
}

exports.recieveMessage = function (_){
	//virtual
}

facebook.recieveMessage = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveMessage(metadata);
}

exports.listen = function () {
	facebook.listen()
;}

module.exports = exports;