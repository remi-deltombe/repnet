var Tools = require('./../../helper/tools.js');
var Module = require('./../base/module.js');

/**
 * @class Node's module model
 * @extends RepNet.Model.Base.Module
 * @memberof RepNet.Model.Node
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

module.exports =  NodeModule;