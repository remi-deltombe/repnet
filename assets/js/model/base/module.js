/**
 * Init a module
 * @class  Module Modulable part base class
 * @memberOf RepNet.Model.Base
 * @extends RepNet.Event.Emitter
 * @constructor
 * @param {String|Number} id Module's index
 * @param {Modulable} parent Module's parent
 */
var Module = function Module(id, parent)
{
	/**
	 * Unique module index
	 * @type {String|Number}
	 */
	this.id = id;

	/**
	 * Module's UUID
	 * @type {String}
	 */
	this.uuid = Tools.generateUUID();

	/**
	 * Module's parent
	 * @type {Modulable}
	 */
	this.parent = parent;

	/**
	 * Linked module's module
	 * @type {Map}
	 */
	this.linkChilds = new Map();

	/**
	 * Parent's module module
	 * @type {Module}
	 */
	this.linkParent = null;

	Emitter.call(this);

};

// Extend Emitter
Tools.extend(Module, Emitter);

/**
 * Link a module to the module
 * @param  {Module} module Module to link
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Module.prototype.link = function (module, fromRecursion)
/** @lends  Module */
{
	if (!this.linkChilds.exist(module.uuid)) {
		if (!fromRecursion) {
			module.linkTo(this, true);
		}
		this.linkChilds.set(module.uuid, module);
		this.trigger('link', module);
	}
};

/**
 * Unlink a module from the module
 * @param  {Module} module module to unlink
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Module.prototype.unlink = function (module, fromRecursion)
/** @lends  Module */
{
	if (this.linkChilds.exist(module.uuid)) {
		if (!fromRecursion) {
			module.unlinkTo(true);
		}

		this.linkChilds.remove(module.uuid);
		this.trigger('unlink', module);
	}
};

/**
 * Define the module's parent module
 * @param  {Module} module Module to link
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Module.prototype.linkTo = function (module, fromRecursion)
/** @lends  Module */
{
	if (this.linkParent) {
		if (this.linkParent.uuid === module.uuid) {
			return;
		}
		this.linkParent.unlink(this, true);
	}

	if (!fromRecursion) {
		module.link(this, true);
	}

	this.linkParent = module;
	this.trigger('linkTo', module);
};

/**
 * Unlink module from parent
 * @param  {Boolean} fromRecursion Is the function call recursiveliy
 * @return {void}
 */
Module.prototype.unlinkTo = function (fromRecursion)
/** @lends  Module */
{
	var parent;

	if (!fromRecursion) {
		this.linkParent.unlink(this, true);
	}

	parent = this.linkParent;
	this.linkParent = null;
	this.trigger('unlinkTo', parent);
};

/**
 * Encode instance for json result
 * @return {Object} Instance encoded
 */
Module.prototype.toJSON = function()
/** @lends  Module */
{
	var result = {
		id : this.id,
		uuid : this.uuid,
		parent : this.parent.id, 
		childs : []
	};
	this.linkChilds.each(function(index, instance){
		result.childs.push(instance.toJSON());
	});

	return result;
};
