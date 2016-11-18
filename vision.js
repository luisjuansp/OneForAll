var request = require('request').defaults({ encoding: null });

var url = 'https://www.zachleat.com/web/wp-content/uploads/2011/01/Screen-shot-2011-01-11-at-7.37.54-PM.png';

module.exports = function (url, callback) {
	request.get(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        data = new Buffer(body).toString('base64');
	        var apiurl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCv7dkI4y9r8kgvk_r4e1rwOOzVAV1iIG8";
	        request({
			    url: apiurl, //URL to hit
			    method: 'POST',
			    //Lets post the following key/values as form
			    json: {
					"requests": [{
						"features": [{
							"type": "TEXT_DETECTION"
						}],
						"image": {
							"content": data
						}
					}]
				}
			}, function(error, response, body){
			    if(error) {
			    	console.log(error);
			    } else {
			        console.log(response.statusCode, body.responses[0].textAnnotations[0].description);
					callback(body.responses[0].textAnnotations[0].description);
				}
			});
	        // console.log(data);
	    }
	});
}