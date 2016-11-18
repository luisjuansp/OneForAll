var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');

// replace the value below with the Telegram token you receive from @BotFather
var token = config.telegram_token;
// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });
var exports = {};

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  console.log(msg);


  if ( msg.text ){
        var data = {id : chatId, text : msg.text};
        //bot.sendMessage(chatId, msg.text);
        exports.recieveMessage(data);
  }
  else if ( msg.photo) {
        var photo = msg.photo[0].file_id;
        var data = {id : chatId, photo : photo };
        //bot.sendPhoto(chatId, photo );
        exports.recieveMessage(data);
  }
  else if (msg.video) {
        var video = msg.video.file_id;
        var data = {id : chatId, video : video };
        //bot.sendVideo(chatId, video);
        exports.recieveVideo(data);
  }
  else if (msg.audio ){
        var audio = msg.audio.file_id;
        var data = {id : chatId, audio : audio };
        //bot.sendAudio(chatId, audio);
        exports.recieveAudio(data);
  }
  else {
       bot.sendMessage(chatId, "Default msg");
  }
});

exports.sendMessage = function(data) {
    console.log(data);
    bot.sendMessage(data.id, data.text);
}

exports.sendImage = function(data) {
    console.log(data);
    bot.sendImage(data.id, data.image);
}

exports.sendVideo = function(data) {
    bot.sendVideo(data.id, data.video);
}

exports.sendGif = function(data) {
    bot.sendGif(data.id, data.image);
}

exports.sendAudio = function(data) {
    bot.sendAudio(data.id, data.audio);
}

module.exports = exports;