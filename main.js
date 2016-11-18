var facebook = require('./facebook.js');

var exports = {};

exports.sendMessage = function (data) {
	facebook.sendMessage(data);
}

exports.sendImage = function (data) {
	facebook.sendImage(data);
}

exports.recieveMessage = function (data){
	//virtual
}

facebook.recieveMessage = function (data){
	exports.recieveMessage(data);
}

exports.listen = function () {
	facebook.listen()
;}

module.exports = exports;