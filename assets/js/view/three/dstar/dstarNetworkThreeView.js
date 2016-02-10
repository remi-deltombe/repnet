/**
 * @class DStarNetworkThreeView DStar network view container
 * @memberOf RepNet.View.Three.DStar
 * @extends RepNet.View.Three.NetworkThreeView
 * @param {DOMElement} dom DOM view's container
 * @constructor
 */
var DStarNetworkThreeView = function(dom)
{	
	NetworkThreeView.call(this,dom);
}

// Extend NetworkThreeView
Tools.extend(DStarNetworkThreeView, NetworkThreeView);

/**
 * Set the orbit of the node
 * @override 
 * @return {void}
 */
DStarNetworkThreeView.prototype.append = function(child, fromRecursive)
{
	NetworkNodeThreeView.prototype.append.call(this, child, fromRecursive);

	child.setPosition((this.childs.length-1) * 5);
	child.setSpeed(Tools.minmax(.002,.003));
};
