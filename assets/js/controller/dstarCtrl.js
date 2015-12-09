/**
 * @class DStarCtrl Manage dstar app components
 * @memberOf RepNet.Controller
 * @constructor
 */
var DStarCtrl = function DStarCtrl()
{
	var dom,that = this;

	// ---
	// View

	this.views = new Map();

	// 3D
	dom = document.getElementById('galaxy');
	this.views.set('3D', new DStar3DView(dom));

	// menu
	dom = document.getElementById('menu-left-top');
	this.menu = new MenuView(dom);
	this.menu.add(new MenuItemView(dom, 'search', 'Search'));
	this.menu.add(new MenuItemView(dom, 'reflector', 'Reflectors'));
	this.menu.add(new MenuItemView(dom, 'node', 'Nodes'));
	this.menu.add(new MenuItemView(dom, 'station', 'Stations'));

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
		node.on('link', that.onNodeLink.bind(that));
		node.on('unlink', that.onNodeUnlink.bind(that));
		node.on('linkTo', that.onNodeLinkTo.bind(that));
		node.on('unlinkTo', that.onNodeUnlinkTo.bind(that));
	});

	// Station
	StationFactory.instance().on('create', function(station){
		station.on('talk', that.onTalk.bind(that, station));
		station.on('untalk', that.onUntalk.bind(that, station));
	});

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
	}
}