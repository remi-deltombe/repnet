var Tools = require('./../../helper/tools.js');
var Modulable = require('./../base/modulable.js');
var NodeModule = require('./module.js');

/**
 * @class Node model
 * @extends RepNet.Model.Base.Modulable
 * @memberof RepNet.Model.Node
 * @constructor
 * @param {String} callsign Node's callsign
 */
var Node = function Node(callsign)
{
	Modulable.call(this, callsign, NodeModule);
};

// Extend Modulable
Tools.extend(Node, Modulable);

module.exports =  Node;