var Map = require('./../collection/map.js');
var List = require('./../collection/list.js');

/**
 * @class Emitter Save events callback and trigger them
 * @memberOf RepNet.Event
 * @constructor
 */
var Emitter = function Emitter()
{
	/**
	 * Event registred
	 * @type {Map<List>}
	 */
	this.events = new Map(List);
};

Emitter.prototype = 
/** @lends Emitter */
{
	/**
	 * Associate a callback to an event
	 * @param  {String} eventName event to register
	 * @param  {Function} callback Function to call when event is trigger
	 * @return {void}
	 */
	on : function (eventName, callback)
	{
		if (!this.events.exist(eventName)) {
			this.events.set(eventName, new List());
		}
		this.events.get(eventName).add(callback);
	},

	/**
	 * Trigger an event
	 * --
	 * all parameters after(except eventName) be passe to the callbacks
	 * --
	 * if a callback return false, cut the callback calling queue 
	 * --
	 * @param  {String} eventName Event to trigger
	 * @return {Boolean} is queue complete without false return
	 */
	trigger : function (eventName)
	{
		var args;
		if (this.events.exist(eventName)) {
			args = Array.prototype.slice.call(arguments, 1);
			return this.events.get(eventName).each(function(index, callback){
				callback.apply(callback, args);
			});
		}
		return true;
	}
};

module.exports = Emitter;