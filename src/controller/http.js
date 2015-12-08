var express = require('express');

/**
 * @class HTTP Http controller
 * @memberOf RepNet.Controller
 * @constructor
 * @param {Express} app Express app
 * @param {Number} port Port to listen
 */
var HTTP = function HTTP(app, port)
{
	this.app = app;

	// app configuration
	this.app.set('view engine', 'jade');
	
	// static files
	this.app.use('/assets', express.static('assets'));

	// index
	this.app.get('/', function(req, res){
		res.render('index');
	});
	
	// listen http
	this.server = require('http').Server(this.app);
	this.server.listen(port, function(){
	  console.log('listening on *:'+port);
	});
};

module.exports = function(app, port)
{
	return new HTTP(app, port);
};