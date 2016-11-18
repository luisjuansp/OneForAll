var facebook = require('./facebook.js');

var skype = require("./skype.js");

var slack = require('./slack.js');

>>>>>>> 395ac1a277e04a58e321e9100037aab8442ed742
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

exports.sendAudio = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendAudio(metadata.data);
	}
}

exports.sendGif = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendGif(metadata.data);
	}
}

exports.sendVideo = function (metadata) {
	if(metadata.service == "facebook"){
		facebook.sendVideo(metadata.data);
	}
}

exports.recieveMessage = function (_){
	//virtual
}

exports.recieveImage = function (_){
	//virtual
}

exports.recieveAudio = function (_){
	//virtual
}

exports.recieveGif = function (_){
	//virtual
}

exports.recieveVideo = function (_){
	//virtual
}

exports.recieveFile = function (_){
	//virtual
}

facebook.recieveMessage = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveMessage(metadata);
}

facebook.recieveImage = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveImage(metadata);
}

facebook.recieveAudio = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveAudio(metadata);
}

facebook.recieveGif = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveGif(metadata);
}

facebook.recieveVideo = function (data){
	var metadata = {service: "facebook", data: data};
	exports.recieveVideo(metadata);
}

exports.listen = function () {
	facebook.listen();
	//skype.listen();
;}

module.exports = exports;