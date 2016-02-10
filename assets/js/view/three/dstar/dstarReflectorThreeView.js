/**
 * @class DStarReflectorThreeView DStar reflector sphere representation in network view
 * @memberOf RepNet.View.Three.DStar
 * @extends RepNet.View.Three.NetworkNodeThreeView
 * @constructor
 */
var DStarReflectorThreeView = function()
{	
	NetworkNodeThreeView.call(this);

	this.setColor(Config.instance().get('3D.colors.reflector'));
	this.setQuality(4);
}

// Extend NetworkNodeThreeView
Tools.extend(DStarReflectorThreeView, NetworkNodeThreeView);

/**
 * Set the orbit of the node
 * @override
 * @return {void}
 */
DStarReflectorThreeView.prototype.append = function(child, fromRecursive)
{
	NetworkNodeThreeView.prototype.append.call(this, child, fromRecursive);

	child.setDistance(Tools.minmax(2,4,3));
	child.setSpeed(Tools.minmax(.001,.002));
	child.setOrbit(Tools.minmax(-1,1), Tools.minmax(-1,1,5));
};
