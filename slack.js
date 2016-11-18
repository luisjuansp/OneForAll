var SlackBot = require('slackbots');
var config = require('./config.json');

var bot = new SlackBot({
    token: 'xoxb-106383320373-Y6DKxUMZbx6EEl9bCUEvYi4S', 
    name: 'oneforall'
});


bot.on('start', function() {
	bot.postMessageToChannel('general', 'meow!');
	//bot.postMessageToUser('user_name', 'meow!');
	bot.postMessageToUser('lowes', 'meow!');
	//bot.postMessageToGroup('private_group', 'meow!');
});

bot.on('message', function(data){
	if(data.type == "message")){
		postMessageToChannel(data.channel, data);
	}
});