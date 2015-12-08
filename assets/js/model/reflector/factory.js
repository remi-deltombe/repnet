/**
 * @class Reflectors factory class 
 * @extends RepNet.Model.Base.SingletonFactory
 * @memberof RepNet.Model.Reflector
 * @constructor
 */
var ReflectorFactory = function ReflectorFactory()
{
	SingletonFactory.call(this, Reflector);
};

// Extend SingletonFactory
Tools.extend(ReflectorFactory, SingletonFactory);
