/**
 * Init the map
 * @class Map collection implementation
 * @memberof RepNet.Collection
 * @constructor
 * @param {*} dataType Type of data who can be contain in map
 */
var Map = function Map(dataType)
{
	/**
	 * Map data
	 * @type {Object}
	 */
	this.datas = {};

	/**
	 * Number of data in map
	 * @type {Number}
	 */
	this.length = 0;

	/**
	 * Type of data who can be contain
	 * @type {Object}
	 */
	this.dataType = dataType || null;
};

Map.prototype =
/** @lends Map */
{
	/**
	 * Test if an index used by the map
	 * @param  {Number} id Index to test
	 * @return {Boolean} Test'result
	 */
	exist : function (id)
	{
		return this.datas[id] !== undefined;
	},

	/**
	 * Set the data in the map
	 * @param {Number} id Index to set
	 * @param {*} data Data used to set
	 * @return {void}
	 */
	set : function (id, data)
	{
		if (data === undefined) {
			throw 'data is not define';
		}

		if (!this.exist(id)) {
			this.length++;
		}

		if ((this.dataType === null) || (data instanceof this.dataType)) {
			this.datas[id] = data;
		} else {
			throw Error('data is not a valid instance');
		}
	},

	/**
	 * Return data from the map
	 * @param {Number} id Index to get
	 * @return {*} Data at the index
	 */
	get : function (id)
	{
		if (!this.exist(id)) {
			throw Error('data at index '+id+' doesn\'t exist');
		}
		return this.datas[id];
	},

	/**
	 * Remove data from the map
	 * @param  {Number} id Index to remove
	 * @return {void}
	 */
	remove : function (id)
	{
		if (!this.exist(id)) {
			throw Error('data at index '+id+' doesn\'t exist');
		}
		this.datas[id] = undefined;
		delete this.datas[id];
		this.length--;
	},

	/**
	 * Call in "each" function with every data
	 * @callback List~onEach
	 * @param {Number} id Data's index in the map
	 * @param {*} data Data at the current index
	 * @return {Boolean} should List continue "each" loop
	 */
	/**
	 * Apply callback on each map data 
	 * Callback is call in the data context
	 * @param  {List~onEach} callback callback applied
	 * @return {Boolean} Was the calling queue cut?
	 */
	each : function (callback)
	{
		var i;
		for( i in this.datas ){
			if (callback(i, this.datas[i]) === false) {
				return false;
			}
		}
		return true;
	}
};
