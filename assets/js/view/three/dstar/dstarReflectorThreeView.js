/**
 * @class DStarReflectorThreeView DStar reflector sphere representation in network view
 * @memberOf RepNet.View.Three.DStar
 * @extends RepNet.View.Three.NetworkNodeThreeView
 * @constructor
 */
var DStarReflectorThreeView = function()
{	
	NetworkNodeThreeView.call(this);

	this.unactivate();
	this.setQuality(4);

	/**
	 * Speed set with setSpeed
	 * Remember it for activate, unactivate the reflector
	 * @type {Number}
	 */
	this.speedInitial = 0;

	/**
	 * Is the reflector active?
	 * @type {Boolean}
	 */
	this.isActive = false;
}

// Extend NetworkNodeThreeView
Tools.extend(DStarReflectorThreeView, NetworkNodeThreeView);

/**
 * Set the orbit of the node
 * Set reflector as active 
 * @override
 * @return {void}
 */
DStarReflectorThreeView.prototype.append = function(child, fromRecursive)
{
	NetworkNodeThreeView.prototype.append.call(this, child, fromRecursive);
	this.activate();
	child.setDistance(Tools.minmax(2,4,3));
	child.setSpeed(Tools.minmax(.001,.002));
	child.setOrbit(Tools.minmax(-1,1), Tools.minmax(-1,1,5));
};

/**
 * Set the orbit of the node
 * Set reflector as unactive if it haven't got child
 * @override
 * @return {void}
 */
DStarReflectorThreeView.prototype.unappend = function(child, fromRecursive)
{
	NetworkNodeThreeView.prototype.unappend.call(this, child, fromRecursive);

	// set unactive if no childs
	if (this.childs.length === 0) {
		this.unactivate();
	}
};


/**
 * Set the rotation's speed of the element's sphere from the middle
 * @param {Number} speed New speed
 */
DStarReflectorThreeView.prototype.setSpeed = function(speed)
{
	if (this.isActive) {
		NetworkNodeThreeView.prototype.setSpeed.call(this, speed);
	}

	this.speedInitial = speed;
};

/**
 * Active the reflector
 * @override
 * @return {void}
 */
DStarReflectorThreeView.prototype.activate = function()
{
	this.isActive = true;
	this.setColor(Config.instance().get('3D.colors.reflector.on'));
	NetworkNodeThreeView.prototype.setSpeed.call(this, this.speedInitial);
};

/**
 * Unactive the reflector
 * @override
 * @return {void}
 */
DStarReflectorThreeView.prototype.unactivate = function()
{
	this.isActive = false;
	this.setColor(Config.instance().get('3D.colors.reflector.off'));
	NetworkNodeThreeView.prototype.setSpeed.call(this, 0);
};
