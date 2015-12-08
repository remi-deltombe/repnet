var Tools = require('./../../helper/tools.js');
var Modulable = require('./../base/modulable.js');
var ReflectorModule = require('./module.js');

var nodes = require('./../node/factory.js');
var stations = require('./../station/factory.js');

var dgram = require('dgram');

/**
 * @class Reflector model
 * @extends RepNet.Model.Base.Modulable
 * @memberof RepNet.Model.Reflector
 * @constructor
 * @param {String} callsign Reflector's callsign
 */
var Reflector = function Reflector(callsign)
{
	Modulable.call(this, callsign, ReflectorModule);

	/**
	 * Reflector's device ip
	 * @type {String}
	 */
	this.ip = null;

	/**
	 * Reflector's device port
	 * @type {Number}
	 */
	this.port = null;

	/**
	 * UDP Socket used to connect on real device
	 * @type {Object}
	 */
	this.socket = null;
};

// Extend Modulable
Tools.extend(Reflector, Modulable);

/**
 * Populate reflector with data
 * -
 * Data must be formated like :
 * "reflector" : reflector callsign,
 * "modules" : [ moduleName,... ],
 * "nodes" : [
 * 		{
 * 			"callsign": station callsign,
 * 			"module": node module name,
 * 			"linkedto": reflector module name,
 * 			"time": date (ex :"Tuesday Tue Nov 24 18:57:16 2015")
 * 		},...
 * ],
 * "stations" : [
 * 		{
 * 			"callsign": station callsign,
 * 			"node": used node callsign,
 * 			"module": node module name,
 * 			"time": date ( ex : "Tuesday Tue Nov 24 18:57:16 2015")
 * 		},...
 * ]
 * @param  {Object} data Formated data used to populate
 * @return {void}
 */
Reflector.prototype.populate = function (data)
/** @lends Reflector */
{
	var i, _, __, module;

	// ---
	// reflector's data
	this.id = data.reflector || this.id;
	this.id = this.id.trim();

	// reflector's modules
	_ = data.modules || [];
	for (i=0; i<_.length; i++) {
		this.module(_[i]);
	} 

	// ---
	// station's linked
	if (typeof data.stations != 'undefined') {
		_ = data.stations || [];
		__ = []; // store linked callsign

		// push referenced
		for (i=0; i<_.length; i++) {
			if (__.indexOf(_[i].callsign) == -1) {
				stations.get(_[i].callsign).linkTo(nodes.get(_[i].node).module(_[i].module));
				__.push(_[i].callsign);
			}
		}

		// unlink station not referenced
		this.moduleFactory.each(function(index, module){ // reflector's module
			module.linkChilds.each(function(index, nodeModule){ // nodes
				nodeModule.linkChilds.each(function(index, nodeChild){ // node's stations
					if (__.indexOf(nodeChild.id) === -1) {
						nodeChild.unlinkTo();
					}
				});
			});
		});
	}

	// ---
	// reflector's nodes
	if (typeof data.nodes != 'undefined') {
		_ = data.nodes || [];
		__ = []; // store linked callsign

		// push referenced
		for (i=0; i<_.length; i++) {
			nodes.get(_[i].callsign).module(_[i].module).linkTo(this.module(_[i].linkedto));
			__.push(_[i].callsign);
		}

		// unlink node not referenced
		this.moduleFactory.each(function(index, module){
			module.linkChilds.each(function(index, child){
				if (__.indexOf(child.parent.id) === -1) {
					child.unlinkTo();
				}
			});
		});
	}

	// ---
	// station talking
	if (typeof data.onair != 'undefined') {
		stations.get(data.onair).talk(true);
	}

	if (typeof data.offair != 'undefined') {
		stations.get(data.offair).talk(false);
	}
	
};

/**
 * Connect model to physical device with UDP socket
 * @param  {String} ip Reflector's ipv4
 * @return {void} 
 */
Reflector.prototype.connect = function (ip, port)
/** @lends Reflector */
{
	var that, buffer;

	that = this;
	buffer = new Buffer('hello');

	// init socket
	this.ip = ip;
	this.port = port || 10001;
	this.socket = dgram.createSocket('udp4');

	// send hello message
	this.socket.send(buffer, 0, buffer.length, this.port, this.ip, function(error, data) {
		if (error) {
			throw error;
		}
		console.log('Try to connect to : '+ip+':'+port);
	});

	// message reception
	this.socket.on('message', function(data){
		var json;

		try {
			json = JSON.parse(data.toString());
			that.populate(json);
		} catch (error) {
			console.log('BAD JSON : ' + data.toString());
			return ;
		}
	});
};

/**
 * Disconnect from reflector device
 * @return {void}
 */
Reflector.prototype.disconnect = function ()
/** @lends Reflector */
{
	var buffer;
	if (this.socket) {
		buffer = new Buffer('bye');
		this.socket.send(buffer, 0, buffer.length, this.port, this.ip);
	}
};

module.exports =  Reflector;