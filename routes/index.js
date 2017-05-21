// Display the main page
var trash_data = require('./trashdata.json');
var scores_data = require('./scores.json');
var fs = require('fs');

exports.view = function(req, res){
	res.render('index', trash_data);
};

exports.submit = function(req,res) {
	var responses = req.body.responses;
	scores_data.scores.push(responses);
	var scores_json = JSON.stringify(scores_data);
	fs.writeFile('./scores.json',scores_json);
	console.log("Response submitted:");
	console.log(JSON.stringify(responses));
	res.send(200);
}

exports.scores = function(req,res) {
	res.json(scores_data);
}
