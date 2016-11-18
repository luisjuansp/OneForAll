var SlackBot = require('slackbots');
var config = require('./config.json');

var bot = new SlackBot({
    token: config.slack_token, 
    name: config.slack_name
});


bot.on('start', function() {
	//bot.postMessageToChannel('general', 'meow!');
	//bot.postMessageToUser('user_name', 'meow!');
	bot.postMessageToUser('lowes', 'meow!');
	//bot.postMessageToGroup('private_group', 'meow!');
});

bot.on('message', function(data){
	if(data.type == "message"){
		postMessageToChannel(data.channel, data);
	}
});