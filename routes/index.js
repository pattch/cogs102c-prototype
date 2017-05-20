// Display the main page
var trash_data = require('./trashdata.json');

exports.view = function(req, res){
	res.render('index', trash_data);
};