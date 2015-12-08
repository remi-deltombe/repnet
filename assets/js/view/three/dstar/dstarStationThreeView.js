/**
 * @class DStarStationThreeView DStar station sphere representation in network view
 * @memberOf RepNet.View.Three.DStar
 * @extends RepNet.View.Three.NetworkNodeThreeView
 * @constructor
 */
var DStarStationThreeView = function()
{	
	NetworkNodeThreeView.call(this);

	this.setColor(Config.instance().get('3D.colors.station'));
	this.setScale(.05);
	this.setQuality(2);
}

// Extend NetworkNodeThreeView
Tools.extend(DStarStationThreeView, NetworkNodeThreeView);
