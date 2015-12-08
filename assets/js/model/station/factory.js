/**
 * @class Stations factory class 
 * @extends RepNet.Model.Base.SingletonFactory
 * @memberof RepNet.Model.Station
 * @constructor
 */
var StationFactory = function StationFactory()
{
	SingletonFactory.call(this, Station);
};

// Extend SingletonFactory
Tools.extend(StationFactory, SingletonFactory);
