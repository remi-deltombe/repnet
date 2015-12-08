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
		var i ;

		// instance method
		for (i in mother.prototype) {
			child.prototype[i] = mother.prototype[i];
		}

		// static method
		for (i in mother) {
			child[i] = mother[i];
		}

		// restore constructor
		child.prototype.constructor = child;
		return child;
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
	},

	/**
	 * Return a random value between min an max
	 * @param {Number} min Minimal value
	 * @param {Number} max Maximal value
	 * @param {Number} delta Used for exponantial distribution
	 * @return {Number} Value generated
	 */
	minmax : function (min, max, delta)
	{
		var rand;

		rand = Math.random();
		if (typeof delta != 'undefined') {
			rand = -Math.log(rand)/delta
		} 

		return min + (rand * (max-min));
	}
};
