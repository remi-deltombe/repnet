var Tools = require('./../../helper/tools.js');
var Factory = require('./factory.js');
var Module = require('./module.js');
var Emitter = require('./../../event/emitter.js');

/**
 * @class  Modulable Modulable class base
 * @memberOf RepNet.Model.Base
 * @extends RepNet.Event.Emitter
 * @constructor
 * @param {String|Number} id Instance'id
 */
var Modulable = function Modulable(id, moduleClass)
{
	var that = this;

	/**
	 * Unique index of the object
	 * @type {String|Number}
	 */
	this.id = id;

	/**
	 * Module factory
	 * @type {Factory}
	 */
	this.moduleFactory = new Factory(moduleClass);


	// module event trigger itself event
	this.moduleFactory.on('create', function(module) {
		module.on('link', function(child){
			that.trigger('link', module, child);
		})
		module.on('unlink', function(child){
			that.trigger('unlink', module, child);
		})
		module.on('linkTo', function(parent){
			that.trigger('linkTo', module, parent);
		})
		module.on('unlinkTo', function(parent){
			that.trigger('unlinkTo', module, parent);
		})
	});	

	Emitter.call(this);
};


// Extend Emitter
Tools.extend(Modulable, Emitter);

/**
 * Build or return an existing module
 * @return {Module} object module
 */
Modulable.prototype.module = function (id)
/** @lends  Modulable */
{
	return this.moduleFactory.get(id, this);
};

/**
 * Encode instance for json result
 * @return {Object} Instance encoded
 */
Modulable.prototype.toJSON = function()
/** @lends  Modulable */
{
	var result = {
		id : this.id,
		modules : []
	};

	this.moduleFactory.each(function(index, instance){
		result.modules.push(instance.toJSON());
	});

	return result;
};

module.exports = Modulable;