/**
 * @class Nodes factory class 
 * @extends RepNet.Model.Base.SingletonFactory
 * @memberof RepNet.Model.Node
 * @constructor
 */
var NodeFactory = function NodeFactory()
{
	SingletonFactory.call(this, Node);
};

// Extend SingletonFactory
Tools.extend(NodeFactory, SingletonFactory);
