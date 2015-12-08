var reflectorFactory = require('./../src/model/reflector/factory.js');

module.exports = function(path){
	setInterval(function(){
		var i,data = require(path);
		for (i in data) {
			reflectorFactory.get(data[i].reflector).populate(data[i]);
		}
		delete require.cache[require.resolve(path)]
	},2000);
}