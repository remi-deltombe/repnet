/**
 * @class DStarView DStarCtrl base view 
 * @memberOf RepNet.View.DStar
 * @extends RepNet.View.View
 * @interface
 * @constructor
 * @param {DOMElement} dom Dom where to display view
 */
var DStarView = function DStarView(dom)
{
	View.call(this,dom);
};

// extend View
Tools.extend(DStarView, View);

DStarView.prototype = 
/** @lends  DStarView */
{
	/**
	 * Add a reflector to the view
	 * @param {Reflector} reflector Reflector to add
	 * @return {void}
	 */
	addReflector : function(reflector)
	{
	}, 

	/**
	 * Remove a reflector from the view
	 * @param {Reflector} reflector Reflector to remove
	 * @return {void}
	 */
	removeReflector : function(reflector)
	{
	}, 

	/**
	 * Add a node to the view
	 * @param {Node} node Node to add
	 * @return {void}
	 */
	addNode : function(node)
	{
	}, 

	/**
	 * Remove a node from the view
	 * @param {Node} node Node to remove
	 * @return {void}
	 */
	removeNode : function(node)
	{
	},

	/**
	 * Link a node to a reflector
	 * @param {nodeModule} nodeModule Node's module to link
	 * @return {void}
	 */
	linkNode : function(nodeModule)
	{
	}, 

	/**
	 * Unink a node from a reflector
	 * Remove a node from the view
	 * @param {nodeModule} nodeModule Node's module to unlink
	 * @param {ReflectorModule} ReflectorModule Reflector's module to unlink
	 * @return {void}
	 */
	unlinkNode : function(nodeModule, reflectorModule)
	{
	}, 

	/**
	 * Remove a reflector to the view
	 * @param {Station} station Station to add
	 * @return {void}
	 */
	addStation : function(station)
	{
	}, 

	/**
	 * Remove a reflector to the view
	 * @param {Station} station Station to remove
	 * @return {void}
	 */
	removeStation : function(station)
	{
	},

	/**
	 * Link a station to a node
	 * @param {station} station Station to link
	 * @return {void}
	 */
	linkStation : function(station)
	{
	}, 

	/**
	 * Unink a station from a node
	 * Remove a station from the view
	 * @param {station} station Station to unlink
	 * @param {nodeModule} nodeModule Node's module to unlink
	 * @return {void}
	 */
	unlinkStation : function(station, nodeModule)
	{
	}, 

	/**
	 * Set a station as talker
	 * @return {void}
	 */
	talk : function(station)
	{
	},

	/**
	 * Set a station as untalker
	 * @return {void}
	 */
	untalk : function(station)
	{
	}
};
