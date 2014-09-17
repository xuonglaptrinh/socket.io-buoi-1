"use strict";

var express = require('express'),
	app = express(),
	server;

app.set('PORT', 8080);
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res){
	res.render('index');
});


server = app.listen(app.get('PORT'), function (){
	console.log('Server started at port ' + app.get('PORT'));
})

require('./socket_handler')(server);