/**
 * @class DStarCtrl Manage dstar app components
 * @memberOf RepNet.Controller
 * @constructor
 */
var DStarCtrl = function DStarCtrl()
{
	var dom, menuItem, that = this;

	// ---
	// View

	this.views = new Map();

	// 3D
	dom = document.getElementById('galaxy');
	this.views.set('3D', new DStar3DView(dom));

	// menu
	dom = document.getElementById('menu-left-top');
	this.menu = new MenuView(dom);

	//this.menu.add(new MenuItemView(dom, 'search', 'Search'));

	// panels
	// reflectors
	menuItem = new MenuItemView(dom, 'reflector', 'Reflectors');
	this.views.set('panel-reflectors', new panelReflectorsView(document.getElementById('panel-reflectors')));
	this.menu.add(menuItem);
	menuItem.on('activate', this.views.get('panel-reflectors').activate.bind(this.views.get('panel-reflectors')));
	menuItem.on('unactivate', this.views.get('panel-reflectors').unactivate.bind(this.views.get('panel-reflectors')));
	
	// nodes
	menuItem = new MenuItemView(dom, 'node', 'Node');
	this.views.set('panel-nodes', new panelNodesView(document.getElementById('panel-nodes')));
	this.menu.add(menuItem);
	menuItem.on('activate', this.views.get('panel-nodes').activate.bind(this.views.get('panel-nodes')));
	menuItem.on('unactivate', this.views.get('panel-nodes').unactivate.bind(this.views.get('panel-nodes')));

	// stations
	menuItem = new MenuItemView(dom, 'station', 'Stations');
	this.views.set('panel-stations', new panelStationsView(document.getElementById('panel-stations')));
	this.menu.add(menuItem);
	menuItem.on('activate', this.views.get('panel-stations').activate.bind(this.views.get('panel-stations')));
	menuItem.on('unactivate', this.views.get('panel-stations').unactivate.bind(this.views.get('panel-stations')));
	
	

	// ---
	// Events

	// register models events
	// Reflector
	ReflectorFactory.instance().on('create', function(reflector){
		reflector.on('populate',that.onReflectorAdd.bind(that));
	});
	ReflectorFactory.instance().on('remove', this.onReflectorRemove.bind(this));

	// Node
	NodeFactory.instance().on('create', function(node){
		that.onNodeAdd(node);
		node.on('link', that.onNodeLink.bind(that));
		node.on('unlink', that.onNodeUnlink.bind(that));
		node.on('linkTo', that.onNodeLinkTo.bind(that));
		node.on('unlinkTo', that.onNodeUnlinkTo.bind(that));
	});

	// Station
	StationFactory.instance().on('create', function(station){
		that.onStationAdd(station);
		station.on('talk', that.onTalk.bind(that, station));
		station.on('untalk', that.onUntalk.bind(that, station));
	});

	// register views events
	this.views.each(function(index, view){
		view.on('focus reflector', this.onFocusReflector.bind(this));
		view.on('focus node', this.onFocusNode.bind(this));
		view.on('focus station', this.onFocusStation.bind(this));
	}.bind(this));
}

DStarCtrl.prototype =
/** @lends DStarCtrl */
{
	/**
	 * Add reflector and populate it with data
	 * @return {void}
	 */
	onReflectorAdd : function(reflector)
	{
		this.views.each(function(index, view){
			view.addReflector(reflector);
		});
	},

	/**
	 * Remove a reflector
	 * @return {void}
	 */
	onReflectorRemove : function(reflector)
	{
		this.views.each(function(index, view){
			view.removeReflector(reflector);
		});
	},

	/**
	 * Add node and populate it with data
	 * @return {void}
	 */
	onNodeAdd : function(node)
	{
		this.views.each(function(index, view){
			view.addNode(node);
		});
	},

	/**
	 * Remove a node
	 * @return {void}
	 */
	onNodeRemove : function(node)
	{
		this.views.each(function(index, view){
			view.removeNode(node);
		});
	},

	/**
	 * Add station and populate it with data
	 * @return {void}
	 */
	onStationAdd : function(station)
	{
		this.views.each(function(index, view){
			view.addStation(station);
		});
	},

	/**
	 * Remove a station
	 * @return {void}
	 */
	onStationRemove : function(station)
	{
		this.views.each(function(index, view){
			view.removeStation(station);
		});
	},

	/**
	 * Connect a node to a reflector
	 * @return {void}
	 */
	onNodeLinkTo : function(nodeModule)
	{
		this.views.each(function(index, view){
			view.linkNode(nodeModule);
		});
	},

	/**
	 * Disconnect a node from a reflector
	 * @return {void}
	 */
	onNodeUnlinkTo : function(nodeModule)
	{
		this.views.each(function(index, view){
			view.unlinkNode(nodeModule);
		});
	},

	/**
	 * Connect a station to a node
	 * @return {void}
	 */
	onNodeLink : function(nodeModule, station)
	{
		this.views.each(function(index, view){
			view.linkStation(station);
		});
	},

	/**
	 * Disconnect a station from a node
	 * @return {void}
	 */
	onNodeUnlink : function(nodeModule, station)
	{
		this.views.each(function(index, view){
			view.unlinkStation(station, nodeModule);
		});
	},

	/**
	 * Set a station as talker
	 * @return {void}
	 */
	onTalk : function(station)
	{
		this.views.each(function(index, view){
			view.talk(station);
		});
	},

	/**
	 * Set a station as untalker
	 * @return {void}
	 */
	onUntalk : function(station)
	{
		this.views.each(function(index, view){
			view.untalk(station);
		});
	},

	/**
	 * Set the focus on a reflector
	 * @return {void}
	 */
	onFocusReflector : function(reflectorModule)
	{
		this.views.each(function(index, view){
			view.focusReflector(reflectorModule);
		});
	},

	/**
	 * Set the focus on a node
	 * @return {void}
	 */
	onFocusNode : function(nodeModule)
	{
		this.views.each(function(index, view){
			view.focusNode(nodeModule);
		});
	},

	/**
	 * Set the focus on a station
	 * @return {void}
	 */
	onFocusStation : function(station)
	{
		this.views.each(function(index, view){
			view.focusStation(station);
		});
	}
}