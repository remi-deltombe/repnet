/**
 * @class Node's module model
 * @extends RepNet.Model.Base.Module
 * @memberof RepNet.Model.Nodee
 * @constructor
 * @param {String} id Module's index
 * @param {Node} node Module's node
 */
var NodeModule = function NodeModule(id, node)
{
	Module.call(this, id, node);
};

// Extend Module
Tools.extend(NodeModule, Module);
