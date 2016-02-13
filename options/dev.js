var reflectorFactory = require('./../src/model/reflector/factory.js');

module.exports = function(path){

	reflectorFactory.on('create',function(reflector){
		setTimeout(function(){
			reflector.trigger('connected')
		},100);
	})

	setInterval(function(){
		var i,n,data = require(path), existing=[], toDelete=[];
		for (i in data) {

			existing.push(data[i].reflector);
			reflectorFactory.get(data[i].reflector).populate(data[i]);

		}

		reflectorFactory.each(function(index, reflector){
			if (existing.indexOf(reflector.id)===-1) {
				toDelete.push(reflector.id);
			}
		});

		for (i in toDelete) {
			console.log('remove: '+toDelete[i]);
			reflectorFactory.remove(toDelete[i]);
		}

		delete require.cache[require.resolve(path)];
	},2000);
}