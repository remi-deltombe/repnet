/**
 * @class Pannel with nodes list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.PanelView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelNodesView = function panelNodesView(dom)
{
	PanelView.call(this,dom);
	DStarView.call(this,dom);

	this.title.innerHTML = 'Nodes';
};

// extend View & List
Tools.extend(panelNodesView, PanelView);
Tools.extend(panelNodesView, DStarView);

/**
 * Add a node to the view
 * @param {Node} node Node to add
 * @return {void}
 */
panelNodesView.prototype.addNode = function(node)
{
	this.content.innerHTML += 'NODE ADD ['+node.id+']<br>';
};

/**
 * Remove a node from the view
 * @param {Node} node Node to remove
 * @return {void}
 */
panelNodesView.prototype.removeNode = function(node)
{
	this.content.innerHTML += 'NODE REMOVE ['+node.id+']<br>';
};