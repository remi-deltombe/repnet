var reflectorFactory = require('./../src/model/reflector/factory.js');
var nodeFactory = require('./../src/model/node/factory.js');
var stationFactory = require('./../src/model/station/factory.js');

reflectorFactory.on('create', function(reflector) {
	console.log('reflector added :'+reflector.id);
})

nodeFactory.on('create', function(node) {
	console.log('node added :'+node.id);
	node.on('linkTo', function(module, parentModule) {
		console.log('node '+node.id+':'+module.id+' link to '+parentModule.parent.id+':'+parentModule.id);
	})
	node.on('unlinkTo', function(module, parentModule) {
		console.log('node '+node.id+':'+module.id+' unlink from '+parentModule.parent.id+':'+parentModule.id);
	})
})

stationFactory.on('create', function(station) {
	console.log('station added :'+station.id);
	station.on('linkTo', function( parentModule) {
		console.log('station '+station.id+' link to '+parentModule.parent.id+':'+parentModule.id);
	})
	station.on('unlinkTo', function(parentModule) {
		console.log('station '+station.id+' unlink from '+parentModule.parent.id+':'+parentModule.id);
	})
	station.on('talk', function() {
		console.log('station '+station.id+' start talking');
	})
	station.on('untalk', function() {
		console.log('station '+station.id+' stop talking');
	})
})