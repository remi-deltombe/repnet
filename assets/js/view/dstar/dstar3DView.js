/**
 * @class DStar3DView Represent DStar network as a galaxy
 * @memberOf RepNet.View.DStar
 * @extends RepNet.View.DStarView
 * @param {DOMElement} dom Dom where to display view
 * @constructor
 */
var DStar3DView = function DStar3DView(dom)
{
	View.call(this, dom);

	var mouse;

	this.renderer = new DStarNetworkThreeView(dom);
	this.reflectors = new Map();
	this.nodes = new Map();
	this.stations = new Map();

	// init renderer
	this.renderer.setPosition(false,false,-10);
	this.renderer.update();

	// init base config
	Config.instance().set('3D.colors.reflector.on', 0xFFA500);
	Config.instance().set('3D.colors.reflector.off', 0x333333);
	Config.instance().set('3D.colors.node', 0x086CA2);
	Config.instance().set('3D.colors.station', 0x999999);
	Config.instance().set('3D.colors.talk', 0xFF3333);

	// init mouse event
	mouse = new Mouse();
	mouse.on('mouseDown', function(){
		this.initialRotation = {
			x: this.renderer.getRotation().x,
			y: this.renderer.getRotation().y
		}
	}.bind(this));

	// 3D rotation follow mouse
	mouse.on('mouseMoveDown', function(){
		var rotation = this.renderer.getRotation();
		var dx, dy;
		dx = mouse.positionOnDown.x-mouse.position.x;
		dy = mouse.positionOnDown.y-mouse.position.y;
		rotation.x = this.initialRotation.x + (dy)/500,
		rotation.y = this.initialRotation.y + (dx)/500
	}.bind(this));

	// scroll zoom into 3d view
	mouse.on('scroll', function(distance){
		var position = this.renderer.getPosition();
		position.z += distance > 0 ? 1 : -1 ;
	}.bind(this));
};

// extend Emitter
Tools.extend(DStar3DView, DStarView);

/**
 * Build a reflector if not exist and return it
 * @param {String} reflector Reflector's uuid
 * @return {DStarReflectorThreeView} reflector
 */
DStar3DView.prototype.getReflector = function(reflectorUUID)
/** @lends  DStar3DView */
{
	var view;
	if (!this.reflectors.exist(reflectorUUID)) {
		view = new DStarReflectorThreeView();
		this.reflectors.set(reflectorUUID, view);
	}
	return this.reflectors.get(reflectorUUID);
};

/**
 * Build a node if not exist and return it
 * @param {String} node Node's uuid
 * @return {DStarNodeThreeView} node
 */
DStar3DView.prototype.getNode = function(nodeUUID)
/** @lends  DStar3DView */
{
	var view;

	if (!this.nodes.exist(nodeUUID)) {
		view = new DStarNodeThreeView();
		this.nodes.set(nodeUUID, view);
	}
	return this.nodes.get(nodeUUID);
};

/**
 * Build a station if not exist and return it
 * @param {String} node Station's uuid
 * @return {DStarStationThreeView} station
 */
DStar3DView.prototype.getStation = function(stationUUID)
/** @lends  DStar3DView */
{
	var view;

	if (!this.stations.exist(stationUUID)) {
		view = new DStarStationThreeView();
		this.stations.set(stationUUID, view);
	}
	return this.stations.get(stationUUID);
};

/**
 * Add a reflector to the view
 * @param {Reflector} reflector Reflector to add
 * @return {void}
 */
DStar3DView.prototype.addReflector = function(reflector)
/** @lends  DStar3DView */
{
	reflector.moduleFactory.each(function(item, module){
		var ref = this.getReflector(module.uuid);
		ref.setLabel(reflector.id+' ['+module.id+']');
		ref.appendTo(this.renderer);
		ref.show();
	}.bind(this));
};

/**
 * Add a node to the view
 * @param {Node} node Node to add
 * @return {void}
 */
DStar3DView.prototype.addNode = function(node)
/** @lends  DStar3DView */
{
	node.moduleFactory.each(function(item, module){
		var n = this.getNode(module.uuid);
		n.setLabel(node.id+' ['+module.id+']');
	}.bind(this));
}

/**
 * Remove a reflector to the view
 * @param {Station} station Station to add
 * @return {void}
 */
DStar3DView.prototype.addStation = function(station)
/** @lends  DStar3DView */
{
	this.getStation(station.uuid);
}


/**
 * Link a node to a reflector
 * @param {nodeModule} nodeModule Node's module to link
 * @return {void}
 */
DStar3DView.prototype.linkNode = function(nodeModule)
/** @lends  DStar3DView */
{
	var reflector, node;

	reflector = this.getReflector(nodeModule.linkParent.uuid);
	node = this.getNode(nodeModule.uuid);
	node.setLabel(nodeModule.parent.id+' ['+nodeModule.id+']');
	reflector.append(node);
	node.show();
};

/**
 * Unink a node from a reflector
 * Remove a node from the view
 * @param {nodeModule} nodeModule Node's module to unlink
 * @return {void}
 */
DStar3DView.prototype.unlinkNode = function(nodeModule)
/** @lends  DStar3DView */
{
	this.getNode(nodeModule.uuid).hide();
};

/**
 * Link a station to a node
 * @param {station} station Station to link
 * @return {void}
 */
DStar3DView.prototype.linkStation = function(station)
/** @lends  DStar3DView */
{
	var node,sta;
	node = this.getNode(station.linkParent.uuid);
	sta = this.getStation(station.uuid);
	sta.setLabel(station.id);
	node.append(sta);
	sta.show();

	if (station.talking) {
		node = this.getNode(station.linkParent.uuid);
		node.setColor(Config.instance().get('3D.colors.talk'));
	}
};
/**
 * Unlink a station from a node
 * @param {station} station Station to link
 * @return {void}
 */
DStar3DView.prototype.unlinkStation = function(station, nodeModule)
/** @lends  DStar3DView */
{
	this.getStation(station.uuid).hide();

	if (station.talking) {
		node = this.getNode(nodeModule.uuid);
		node.setColor(Config.instance().get('3D.colors.node'));
	}
};

/**
 * Set a station as talker
 * @return {void}
 */
DStar3DView.prototype.talk = function(station)
/** @lends  DStar3DView */
{
	var _node, _station, _reflector;
	_station = this.getStation(station.uuid);
	_node = this.getNode(station.linkParent.uuid);
	_reflector = this.getReflector(station.linkParent.linkParent.uuid);
	_reflector.setColor(Config.instance().get('3D.colors.talk'));
	_node.setColor(Config.instance().get('3D.colors.talk'));
	_station.setColor(Config.instance().get('3D.colors.talk'));
};

/**
 * Set a station as untalker
 * @return {void}
 */
DStar3DView.prototype.untalk = function(station)
/** @lends  DStar3DView */
{
	var _node, _station, _reflector;
	_station = this.getStation(station.uuid);
	_node = this.getNode(station.linkParent.uuid);
	_reflector = this.getReflector(station.linkParent.linkParent.uuid);
	_reflector.setColor(Config.instance().get('3D.colors.reflector.on'));
	_node.setColor(Config.instance().get('3D.colors.node'));
	_station.setColor(Config.instance().get('3D.colors.station'));
};

