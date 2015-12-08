var Tools = require('./../../helper/tools.js');
var Factory = require('./../base/factory.js');
var Node = require('./node.js');

/**
 * @class Nodes factory class 
 * @extends RepNet.Model.Base.Factory
 * @memberof RepNet.Model.Node
 * @constructor
 */
var NodeFactory = function NodeFactory()
{
	Factory.call(this, Node);
};

// Extend Factory
Tools.extend(NodeFactory, Factory);

var instance = new NodeFactory();
module.exports =  instance;