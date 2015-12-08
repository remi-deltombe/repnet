var Tools = require('./../../helper/tools.js');
var Factory = require('./../base/factory.js');
var Reflector = require('./reflector.js');

/**
 * @class Reflectors factory class 
 * @extends RepNet.Model.Base.Factory
 * @memberof RepNet.Model.Reflector
 * @constructor
 */
var ReflectorFactory = function ReflectorFactory()
{
	Factory.call(this, Reflector);
};

// Extend Factory
Tools.extend(ReflectorFactory, Factory);

var instance = new ReflectorFactory();
module.exports =  instance;