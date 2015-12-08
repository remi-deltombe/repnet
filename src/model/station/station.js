var Tools = require('./../../helper/tools.js');
var Module = require('./../base/module.js');
var Emitter = require('./../../event/emitter.js');

/**
 * @class Station model
 * @memberof RepNet.Model.Station
 * @extends RepNet.Event.Emitter
 * @constructor
 * @param {String} callsign Station's callsign
 */
var Station = function Station(callsign)
{
	/**
	 * Station callsign
	 * @type {String}
	 */
	this.id = callsign;

	/**
	 * Station's UUID
	 * @type {String}
	 */
	this.uuid = Tools.generateUUID();

	/**
	 * Parent's module station
	 * @type {Module}
	 */
	this.linkParent = null;

	Emitter.call(this);
};

// Extend Emitter
Tools.extend(Station, Emitter);

/**
 * Define the module's parent module
 * @lends  Station 
 * @param  {Module} module Module to link
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Station.prototype.linkTo = Module.prototype.linkTo;

/**
 * Unlink module from parent
 * @lends  Station 
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Station.prototype.unlinkTo = Module.prototype.unlinkTo;

/**
 * Encode instance for json result
 * @lends Module
 * @return {Object} Instance encoded
 */
Station.prototype.toJSON = function()
/** @lends  Station */
{
	var result = {
		id : this.id,
		uuid : this.uuid
	};

	return result;
};

/**
 * Set the station as talker or untalker
 * @param {Boolean} value Is the station talk?
 * @return {void}
 */
Station.prototype.talk = function(value)
/** @lends  Station */
{
	this.talking = value ? true : false;
	this.trigger(this.talking ? 'talk' : 'untalk');
}

module.exports =  Station;