var Tools = require('./../../helper/tools.js');
var Map = require('./../../collection/map.js');
var Emitter = require('./../../event/emitter.js');

/**
 * @class  Factory class base
 * @extends RepNet.Collection.Map
 * @extends RepNet.Event.Emitter
 * @memberof RepNet.Model.Base
 * @constructor
 * @param {*} childType Type of module who is instanciate
 */
var Factory = function Factory(childType)
{
	Map.call(this, childType);
	Emitter.call(this);
};

// Extend Factory and Emitter
Tools.extend(Factory, Map);
Tools.extend(Factory, Emitter);

/**
 * Instanciate factory's delegate class
 * @param  {String|Number} id Instance's index
 * @return {Object} instance
 */
Factory.prototype.buildIntance = function ()
/** @lends  Factory */
{
	var instance = new this.dataType;
	this.dataType.apply(instance, arguments)
	return instance;
};

/**
 * Return an existing object or build a new one
 * @param  {String|Number} id Object's id
 * @return {Object} object
 */
Factory.prototype.get = function(id)
/** @lends  Factory */
{
	var instance;
	if (!this.exist(id)) {
		instance = this.buildIntance.apply(this,arguments);
		this.set(id, instance);
		this.trigger('create', instance);
	}
	return Map.prototype.get.call(this, id);
};


/**
 * Trigger remove event and delete instance
 * @param  {Number} id Index to remove
 * @return {void}
 */
Factory.prototype.remove = function(id)
/** 
 * @lends  Factory
 * @override
 */
{
	var instance = this.get(id);
	this.trigger('remove', instance);
	delete this.get(id);
	Map.prototype.remove.call(this,id);
}

/**
 * Encode instance for json result
 * @return {Array} Instances encoded
 */
Factory.prototype.toJSON = function()
/** @lends  Factory */
{
	var result = [];

	this.each(function(index, instance){
		result.push(instance.toJSON());
	});

	return result;
};

module.exports =  Factory;