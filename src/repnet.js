
// Namespaces definition

/**
 * RepNet
 * @namespace RepNet
 */

/**
 * Data store
 * @namespace Collection
 * @memberOf RepNet
 */

/**
 * Controller layout
 * @namespace Controller
 * @memberOf RepNet
 */

/**
 * Event layout
 * @namespace Event
 * @memberOf RepNet
 */

/**
 * Programming utils
 * @namespace Helper
 * @memberOf RepNet
 */

/**
 * Data abstration layout
 * @namespace Model
 * @memberOf RepNet
 */

/**
 * Model's basic class template
 * @namespace Base
 * @memberOf RepNet.Model
 */

/**
 * Node Dstar
 * @namespace Node
 * @memberOf RepNet.Model
 */

/**
 * Reflector Dstar
 * @namespace Reflector
 * @memberOf RepNet.Model
 */

/**
 * Station Dstar
 * @namespace Station
 * @memberOf RepNet.Model
 */

// ------------------------

var reflectorFactory = require('./../src/model/reflector/factory.js');

/**
 * Init RepNet server with specified port
 * @class  Repnet server, serve static file
 * @memberof RepNet
 * @constructor
 * @param {Number} port port to listen
 */
var RepNet = function RepNet(port)
{
	var express;

	port = port || 8080;
	express = require('express');
	this.app = express();
	
	// Controllers init
	this.http = require('./controller/http.js')(this.app, port);
	this.socket = require('./controller/socket.js')(this.http.server, port);

	// register process close event 
	// - close reflectors's connection
	process.stdin.resume();

	var exitHandler = function(opts, error)
	{
		if (error) {
			throw error;
		}
		reflectorFactory.each(function(index, reflector){
			reflector.disconnect();
		});
		setTimeout(function(){
			process.exit();
		},100);
	};

	process.on('exit', exitHandler.bind(null, {}));
	process.on('SIGINT', exitHandler.bind(null, {}));
	process.on('uncaughtException', exitHandler.bind(null, {}));
};

RepNet.prototype =
/** @lends RepNet */
{
	/**
	 * Connect reflectors
	 * -
	 * Reflector's data should be formated like :
	 * {
	 * 		"reflector" : "XLX999",
	 * 	 	"ip" : "192.168.178.212",
	 * 	  	"port" : 10001 
	 * }
	 * -
	 * @param {Array} reflectors Array of reflector's data
	 * @return {void} 
	 */
	addReflectors : function(reflectors)
	{
		var i;
		for (i=0; i<reflectors.length; i++) {
			reflectorFactory.get(reflectors[i].reflector).connect(reflectors[i].ip, reflectors[i].port);
		}
	}
};


module.exports = function(port){
	return new RepNet(port);
}
