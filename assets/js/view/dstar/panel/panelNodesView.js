/**
 * @class Pannel with nodes list
 * @memberOf RepNet.View.DStar.Panel
 * @extends RepNet.View.Panel.PanelListView
 * @extends RepNet.View.Dstar.DStarView
 * @constructor
 * @param {DOMElement} dom Dom where to display pannel
 */
var panelNodesView = function panelNodesView(dom)
{
	PanelListView.call(this,dom);
	DStarView.call(this,dom);

	this.setTitle('Nodes');
};

// extend View & List
Tools.extend(panelNodesView, PanelListView);
Tools.extend(panelNodesView, DStarView);

/**
 * Add a node to the view
 * @param {Node} node Node to add
 * @return {void}
 */
panelNodesView.prototype.linkNode = function(node)
{
	var listElement = new PanelListElementDStarModulableView(node.parent);
	listElement.on('focus module', this.trigger.bind(this, 'focus node'));
	this.append(listElement);
};

/**
 * Remove a node from the view
 * @param {Node} node Node to remove
 * @return {void}
 */
panelNodesView.prototype.unlinkNode = function(node)
{
	if (node.parent.linked == 0) {
		this.unappendWithUUID(node.parent.uuid);
	}
};