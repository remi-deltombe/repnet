/**
 * @class Config Configuration Store
 * @memberOf RepNet.Helper
 * @constructor
 */
var Config = function Config()
{
	this.store = {};
};

Config.prototype = 
/** @lends Config */
{
	/**
	 * Return a config value
	 * @param  {String} name Configuration name
	 * @param  {*} defaultValue Default return if configuration doesn't exist
	 * @return {*} Configuration value
	 */
	get : function (name, defaultValue)
	{
		var parts = name.split('.');
		var key = parts.shift();
		if (typeof this.store[key] == 'undefined') {
			return defaultValue;
		} else if(this.store[key] instanceof Config) {
			if (parts.length) {
				return this.store[key].get(parts.join('.'));
			}
			return this.toArray();
		}
		return this.store[key];
	},

	/**
	 * Set a configuration
	 * @param {String} name Configuration's name to set
	 * @param {*} value Configuration's value
	 * @return {void}
	 */
	set : function (name, value)
	{
		var i;
		var parts = name.split('.');
		var key = parts.shift();

		if (parts.length > 0) {
			i = new Config();
			i.set(parts.join('.'),value);
			value = i;
		}

		this.store[key] = value;
	},

	/**
	 * Return configuration as anonymous object
	 * @return {Object} Config as anonymous object
	 */
	toArray : function ()
	{
		var i;
		var result = {};

		for (i in this.store) {
			if (this.store[i] instanceof Config) {
				result[i] = this.store[i].toArray();
			} else {
				result[i] = this.store[i];
			}
		}

		return result;
	}
};

var instance = new Config;
module.exports = instance;
