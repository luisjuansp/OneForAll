# OneForAll

## Added Services
 - Messenger
 - Slack
 - Telegram

## Use
* Download the folder
* `npm install`
* create new file
* `require("./main.js")`.

### Configuration file
Add the Authentication keys to the config.json.
```
{
    "facebook_token" : "EAAS6Ppy5MfcBAEEuoEdWEAmLrVWtLtUKlCtBU9q2ZAA1KJaKf8LBeQY23yGTHY4tZBQfkDtlF3JYU06M1SWYYXiuW77qgCPOZA4ms3cZC7uH3dIBK5fK4tsSJveXcChMzEFTk3CmGE6mRSZAf7II13UBXdCqZBIpGtuSpEWyHDvAZDZD",
    "facebook_verify_token" : "test_token",
    "telegram_token" : "276851697:AAGwioSHSD_zPiqE3OTOJvXp_3p8vIKM8oM",
    "slack_token" : "xoxb-106383320373-0XhpiBPWJmKrwJliA2UbQaXb",
    "slack_name" : "oneforall"
}
```

### Media Supported

* Message (Text)
* Image
* Audio
* Gif
* Video

Receive function for each media must be implemented. Send functions recieve an array of messages, in case of only one recipient an array with size on one must be sent.The message object has the following structure:
```
message = {
    service: "facebook|slack|telegram",
    data: {
        id: "applicationID",
        text|url: "message|media url",
        httpOptions: { "http optional parameters" }
    }
}
```

## Demo

```javascript
var oneForAll = require("./main.js");

oneForAll.recieveMessage = function(message){
	oneForAll.sendMessage([message]);
}

oneForAll.recieveImage = function(message){
	oneForAll.sendImage([message]);
}

oneForAll.recieveAudio = function(message){
	oneForAll.sendAudio([message]);
}

oneForAll.recieveGif = function(message){
	oneForAll.sendGif([message]);
}

oneForAll.recieveVideo = function(message){
	oneForAll.sendVideo([message]);
}
```

