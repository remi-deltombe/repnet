/**
 * @class SocketCtrl Manage socket connection with the server
 * @memberOf RepNet.Controller
 * @constructor
 * @param {String} url Url of socket server
 */
var SocketCtrl = function SocketCtrl(url)
{
	this.socket = io(url);

	// Socket events binding
    this.socket.on('init', this.onInit.bind(this));
    this.socket.on('reflector add', this.onReflectorAdd.bind(this));
    this.socket.on('reflector remove', this.onReflectorRemove.bind(this));
    this.socket.on('reflector link', this.onReflectorLink.bind(this));
    this.socket.on('reflector unlink', this.onReflectorUnlink.bind(this));
    this.socket.on('node link', this.onNodeLink.bind(this));
    this.socket.on('node unlink', this.onNodeUnlink.bind(this));
    this.socket.on('talk', this.onTalk.bind(this));
    this.socket.on('untalk', this.onUntalk.bind(this));
}

SocketCtrl.prototype =
/** @lends SocketCtrl */
{
	/**
	 * Populate reflector factory or restart app if already done
	 * --
	 * Data struct : cf reflector.populate doc
	 * --
	 * @param  {Array} data Reflector's data
	 * @return {void}
	 */
	onInit : function(data)
	{
	    var i;
	    for (i=0; i<data.length ; i++) {
	    	ReflectorFactory.instance()
	    		.get(data[i].id)
	    		.populate(data[i]);
	    }
	},

	/**
	 * Add reflector and populate it with data
	 * --
	 * Data struct : cf reflector.populate doc
	 * --
	 * @param  {Object} data Data used to populate reflector
	 * @return {void}
	 */
	onReflectorAdd : function(data)
	{
    	ReflectorFactory.instance()
    		.get(data.id)
    		.populate(data);
	},

	/**
	 * Remove a reflector
	 * --
	 * Data struct :
	 * {
	 * 		"reflectorId": reflector's callsign
	 * }
	 * --
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onReflectorRemove : function(data)
	{
    	ReflectorFactory.instance().remove(data.id);
	},

	/**
	 * Connect a node to a reflector
	 * --
	 * Data struct :
	 * {
	 * 		"reflectorId": reflector's callsign,
	 * 		"reflectorModule": reflector's module's name,
	 *	 	"nodeId": node's callsign,
	 *	 	"nodeModule": node's module's name
	 * }
	 * --
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onReflectorLink : function(data)
	{
		ReflectorFactory.instance()
			.get(data.reflectorId)
			.module(data.reflectorModule)
			.link(NodeFactory.instance()
				.get(data.nodeId)
				.module(data.nodeModule)
			);
	},

	/**
	 * Disconnect a node from a reflector
	 * --
	 * Data struct :
	 * {
	 * 		"reflectorId": reflector's callsign,
	 * 		"reflectorModule": reflector's module's name,
	 *	 	"nodeId": node's callsign,
	 *	 	"nodeModule": node's module's name
	 * }
	 * --
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onReflectorUnlink : function(data)
	{
		ReflectorFactory.instance()
			.get(data.reflectorId)
			.module(data.reflectorModule)
			.unlink(NodeFactory.instance()
				.get(data.nodeId)
				.module(data.nodeModule)
			);
	},

	/**
	 * Connect a station to a node
	 * --
	 * Data struct :
	 * {
	 *	 	"nodeId": node's callsign,
	 *	 	"nodeModule": node's module's name,
	 *	 	"stationId": station's callsign
	 * }
	 * --
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onNodeLink : function(data)
	{
		NodeFactory.instance()
			.get(data.nodeId)
			.module(data.nodeModule)
			.link(StationFactory.instance()
				.get(data.stationId)
			);
	},

	/**
	 * Disconnect a station from a node
	 * --
	 * Data struct :
	 * {
	 *	 	"nodeId": node's callsign,
	 *	 	"nodeModule": node's module's name
	 *	 	"stationId": station's callsign
	 * }
	 * --
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onNodeUnlink : function(data)
	{
		NodeFactory.instance()
			.get(data.nodeId)
			.module(data.nodeModule)
			.unlink(StationFactory.instance()
				.get(data.stationId)
			);
	},

	/**
	 * Set a station as talker
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onTalk : function(data)
	{
		StationFactory.instance()
			.get(data.stationId)
			.talk(true);
	},

	/**
	 * Set a station as untalker
	 * @param  {Object} data Data used to process
	 * @return {void}
	 */
	onUntalk : function(data)
	{
		StationFactory.instance()
			.get(data.stationId)
			.talk(false);
	}
}