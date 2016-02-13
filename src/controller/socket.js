var reflectorFactory = require('./../model/reflector/factory.js');
var nodeFactory = require('./../model/node/factory.js');
var stationFactory = require('./../model/station/factory.js');

/**
 * @class Socket Socket controller
 * @memberOf RepNet.Controller
 * @constructor
 * @param {Object} http http server
 */
var Socket = function Socket(http)
{
	var that = this;

	this.io = require('socket.io')(http);
	this.socket = this.io.on('connection', function(socket){
		socket.emit('init', reflectorFactory.toJSON());
	});

	reflectorFactory.on('create', function(reflector) {
		reflector.on('connected',function(){
			that.socket.emit('reflector add', reflector.toJSON());
		});
	});

	reflectorFactory.on('remove', function(reflector) {
		that.socket.emit('reflector remove', {'id': reflector.id});
	});

	nodeFactory.on('create', function(node) {
		node.on('linkTo', function(nodeModule, reflectorModule){

			that.socket.emit('reflector link', {
				'reflectorId':reflectorModule.parent.id,
				'reflectorModule':reflectorModule.id,
				'nodeId':nodeModule.parent.id,
				'nodeModule':nodeModule.id
			});

			nodeModule.parent.on('link', function(nodeModule,station){
				that.socket.emit('node link', {
					'nodeId':nodeModule.parent.id,
					'nodeModule':nodeModule.id,
					'stationId':station.id
				});
			});

			nodeModule.parent.on('unlink', function(nodeModule, station){
				that.socket.emit('node unlink', {
					'nodeId':nodeModule.parent.id,
					'nodeModule':nodeModule.id,
					'stationId':station.id
				});
			});
		});

		node.on('unlinkTo', function(nodeModule, reflectorModule){
			that.socket.emit('reflector unlink', {
				'reflectorId':reflectorModule.parent.id,
				'reflectorModule':reflectorModule.id,
				'nodeId':nodeModule.parent.id,
				'nodeModule':nodeModule.id
			});
		});
	});


	stationFactory.on('create', function(station) {
		station.on('talk', function(){
			that.socket.emit('talk', {
				'stationId':station.id
			});
		});
		station.on('untalk', function(){
			that.socket.emit('untalk', {
				'stationId':station.id
			});
		});
	});
};



module.exports = function(app, port)
{
	return new Socket(app, port);
};

