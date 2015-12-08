/**
 * @class DebugCtrl Manage socket connection with the server
 * @memberOf RepNet.Controller
 * @constructor
 * @param {String} url Url of socket server
 */
var DebugCtrl = function DebugCtrl()
{
	ReflectorFactory.instance().on('create', function(reflector) {
		console.log('reflector added :'+reflector.id);
	})

	NodeFactory.instance().on('create', function(node) {
		console.log('node added :'+node.id);
		node.on('linkTo', function(module, parentModule) {
			console.log('node '+node.id+':'+module.id+' link to '+parentModule.parent.id+':'+parentModule.id);
		})
		node.on('unlinkTo', function(module, parentModule) {
			console.log('node '+node.id+':'+module.id+' unlink from '+parentModule.parent.id+':'+parentModule.id);
		})
	})

	StationFactory.instance().on('create', function(station) {
		console.log('station added :'+station.id);
		station.on('linkTo', function( parentModule) {
			console.log('station '+station.id+' link to '+parentModule.parent.id+':'+parentModule.id);
		})
		station.on('unlinkTo', function(parentModule) {
			console.log('station '+station.id+' unlink from '+parentModule.parent.id+':'+parentModule.id);
		})
	})
}

DebugCtrl.prototype =
/** @lends DebugCtrl */
{
}