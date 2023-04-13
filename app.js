const express = require("express");
const bodyParser = require("body-parser")
const request = require('request')
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
  
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
  
  
app.post("/", function(req, res) {
	
  
  console.log(req.body);
  var plain_text = req.body.plain_text;
  var data_arr = [];
  data_arr.push(plain_text);
  
  var headers = {
        'Content-Type': 'application/json'
    }
    var options = {
        url: 'http://130.211.213.132/predict',
        method: 'POST',
        headers: headers,
        json: {
            'instances': data_arr
        }
    }
	
	console.log(options)
	
	  request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		// Print out the response body
		console.log(body.predictions)
		const string_text = `<div style="width: 50%; height: 50%; position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;margin: auto;
		padding: 10px 30px;font-family: sans-serif;"><h2>` + body.predictions + `</h2><br/><h5><a href="/"> Back to Search</a></h5></div>`;
		res.send(string_text)
	  } else {
		res.send(body)
		console.log(body)
	  }
	})
  
  
});
  
app.listen(3000, function(){
  console.log("server is running on port 3000");
})