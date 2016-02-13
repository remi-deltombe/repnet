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
	 * Modulable's UUID
	 * @type {String}
	 */
	this.uuid = Tools.generateUUID();

	/**
	 * Module factory
	 * @type {Factory}
	 */
	this.moduleFactory = new Factory(moduleClass);

	/**
	 * Total of module linked
	 * @type {Number}
	 */
	this.linked = 0;


	// module event trigger itself event
	this.moduleFactory.on('create', function(module) {
		module.on('link', function(child){
			that.linked++;
			that.trigger('link', module, child);
		})
		module.on('unlink', function(child){
			that.linked--
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
 * Module factory getter
 * @return {ModuleFactory} 
 */
Modulable.prototype.modules = function (id)
/** @lends  Modulable */
{
	return this.moduleFactory;
};

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
