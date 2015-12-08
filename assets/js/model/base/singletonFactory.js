/**
 * @class  Factory class base
 * @extends RepNet.Collection.Map
 * @extends RepNet.Event.Emitter
 * @memberof RepNet.Model.Base
 * @constructor
 * @param {*} childType Type of module who is instanciate
 */
var SingletonFactory = function SingletonFactory(childType)
{
	// singleton extendable
	if (typeof window[this.constructor.name]._instance == 'undefined') {
		Factory.call(this, childType);
		window[this.constructor.name]._instance = this;
	}
	return window[this.constructor.name]._instance;
};

// Extend Factory and Emitter
Tools.extend(SingletonFactory, Factory);

/**
 * Get instance of factory
 * @return {Factory} instance
 */
SingletonFactory.instance = function ()
/** @lends  SingletonFactory */
{
	var c = window[this.prototype.constructor.name];
	var i = c._instance || new c();
	return i;
};