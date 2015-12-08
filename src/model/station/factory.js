var Tools = require('./../../helper/tools.js');
var Factory = require('./../base/factory.js');
var Station = require('./station.js');

/**
 * @class Stations factory class 
 * @extends RepNet.Model.Base.Factory
 * @memberof RepNet.Model.Station
 * @constructor
 */
var StationFactory = function StationFactory()
{
	Factory.call(this, Station);
};

// Extend Factory
Tools.extend(StationFactory, Factory);

var instance = new StationFactory();
module.exports =  instance;