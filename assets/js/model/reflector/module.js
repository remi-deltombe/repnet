/**
 * @class Reflector's module model
 * @extends RepNet.Model.Base.Module
 * @memberof RepNet.Model.Reflectore
 * @constructor
 * @param {String} id Module's index
 * @param {Reflector} reflector Module's reflector
 */
var ReflectorModule = function ReflectorModule(id, reflector)
{
	Module.call(this, id, reflector);
};

// Extend Module
Tools.extend(ReflectorModule, Module);
