var routes = require("./routes");
var app = routes();

var facebook = require('./facebook.js')(app);
var skype = require("./skype.js")(app);

//var slack = require('./slack.js');


var exports = {};

exports.sendMessage = function (metadata) {
	metadata.forEach((meta) => {
		if(meta.service == "facebook"){
			facebook.sendMessage(meta.data);
		}
	});
}

exports.sendImage = function (metadata) {
	metadata.forEach((meta) => {
		if(meta.service == "facebook"){
			facebook.sendImage(meta.data);
		}
	});
}

exports.sendAudio = function (metadata) {
	metadata.forEach((meta) => {
		if(meta.service == "facebook"){
			facebook.sendAudio(meta.data);
		}
	});
}

exports.sendGif = function (metadata) {
	metadata.forEach((meta) => {
		if(meta.service == "facebook"){
			facebook.sendGif(meta.data);
		}
	});
}

exports.sendVideo = function (metadata) {
	metadata.forEach((meta) => {
		if(meta.service == "facebook"){
			facebook.sendVideo(meta.data);
		}
	});
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

exports.app = app;

module.exports = exports;