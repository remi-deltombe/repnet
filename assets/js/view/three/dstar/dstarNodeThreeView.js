/**
 * @class DStarNodeThreeView DStar node sphere representation in network view
 * @memberOf RepNet.View.Three.DStar
 * @extends RepNet.View.Three.NetworkNodeThreeView
 * @constructor
 */
var DStarNodeThreeView = function()
{	
	NetworkNodeThreeView.call(this);

	this.setColor(Config.instance().get('3D.colors.node'));
	this.setScale(.2);
	this.setQuality(3);
}

// Extend NetworkNodeThreeView
Tools.extend(DStarNodeThreeView, NetworkNodeThreeView);

/**
 * Set the orbit of the node
 * @override
 * @return {void}
 */
DStarNodeThreeView.prototype.append = function(child, fromRecursive)
{
	NetworkNodeThreeView.prototype.append.call(this, child, fromRecursive);

	child.setDistance(Tools.minmax(.5,.7));
	child.setSpeed(Tools.minmax(.02,.03));
	child.setOrbit(Tools.minmax(-1,1), Tools.minmax(-1,1));
};
