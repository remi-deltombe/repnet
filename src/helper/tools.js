/**
 * @class Tools Helpers suite
 * @memberOf RepNet.Helper
 */
var Tools = 
{
	/**
	 * Copy method & property in target from other argument
	 * @param {Object} child Class who inherit
	 * @param {Object} mother Class to extend
	 * @returns {Object} child 
	 */
	extend : function (child, mother)
	{
		var i, proto = this.clone( mother.prototype );
		for (i in proto) {
			child.prototype[i] = proto[i];
		}
		child.prototype.constructor = child;
		return child;
	},

	/**
	 * Duplicate an object
	 * @param {Object} object Object to duplicate
	 * @returns {Object} clone
	 */
	clone : function (object)
	{
		var i;
		var tmp = {};

		for (i in object) {
			tmp[i] = object[i];
		}

		return tmp;
	},

	/**
	 * Generate UUID
	 * @return {String} UUID generated
	 */
	generateUUID : function ()
	{
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();
	}
};

// Singleton
module.exports =  Tools;
