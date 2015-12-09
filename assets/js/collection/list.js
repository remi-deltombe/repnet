/**
 * Init the list
 * @class List collection implementation
 * @memberof RepNet.Collection
 * @constructor
 * @param {*} dataType Type of data who can be contain in list
 */
var List = function List(dataType)
{
	/**
	 * List data
	 * @type {Object}
	 */
	this.datas = [];

	/**
	 * Number of data in list
	 * @type {Number}
	 */
	this.length = 0;

	/**
	 * Type of data who can be contain
	 * @type {Object}
	 */
	this.dataType = dataType || null;
};

List.prototype =
/** @lends List */
{
	/**
	 * Add data at the end of the list
	 * @param {*} data Data to add
	 * @return {Number} Data's index in the list
	 */
	add : function(data)
	{
		if ((this.dataType === null) || (data instanceof this.dataType)) {
			this.datas.push(data);
			return this.datas.length - 1;
		} else {
			throw Error('data is not a valid instance');
		}
	},

	/**
	 * Test if an index used by the list
	 * @param  {Number} id Index to test
	 * @return {Boolean} Test'result
	 */
	exist : function (id)
	{
		return typeof this.datas[id] != 'undefined';
	},

	/**
	 * Set the data in the list
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
			throw 'data at index '+id+' doesn\'t exist';
		}

		if ((this.dataType === null) || (data instanceof this.dataType)) {
			this.datas[id] = data;
		} else {
			throw Error('data is not a valid instance');
		}
	},

	/**
	 * Return data from the list
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
	 * Remove data from the list
	 * @param  {Number} id Index to remove
	 * @return {void}
	 */
	remove : function (id)
	{
		if (!this.exist(id)) {
			throw Error('data at index '+id+' doesn\'t exist');
		}
		this.datas.splice(id,1);
	},

	/**
	 * Call in "each" function with every data
	 * @callback List~onEach
	 * @param {Number} id Data's index in the list
	 * @param {*} data Data at the current index
	 * @return {Boolean} should List continue "each" loop
	 */
	/**
	 * Apply callback on each list data 
	 * Callback is call in the data context
	 * @param  {List~onEach} callback callback applied
	 * @return {Boolean} was the calling queue cut 
	 */
	each : function (callback)
	{
		var i;
		for( i=0; i<this.datas.length; i++){
			if (callback(i, this.datas[i]) === false) {
				return false;
			}
		}
		return true;
	}
};
