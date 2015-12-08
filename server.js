var i,repnet,ref,dev,port;

function displayHelp()
{
	var t;

	t='';
	t+= '----\n';
	t+= 'RepNet Server\n';
	t+= '\n';
	t+= 'Options :\n';
	t+= '\t-l : Repnet\'ll log events in shell\n';
	t+= '\t-p [PORT] : Specify port to listen\n';
	t+= '\t-d [FILE TO LISTEN] : Dev mode, listen a file for populate reflectors\'s data.\n';
	t+= '\t                      File\'ll be reload each 2 seconds\n';
	t+= '\t                      and reflectors\'s data refresh with its content\n';
	t+= '\t                      File should be a valid JSON.\n';
	t+= '\t                      Example : examples/dev.json\n';
	t+= '\t-r [FILE TO LOAD] : Init reflectors and start their UDP Socket\n',
	t+= '\t                    with data specified in file\n';
	t+= '\t                    File should be a valid JSON.\n';
	t+= '\t                    Example : examples/reflectors.json\n';
	console.error(t);
	process.exit();
}

// parse arguments
for (i=2; i<process.argv.length; i++) {
	switch (process.argv[i])
	{
		// display help
		case '-h': 
			displayHelp();
			break;

		// port setting
		case '-p':
			i++;
			port = parseInt(process.argv[i]);
			break;

		// dev mode [FILE TO LISTEN]
		case '-d':
		    i++;
			dev = process.argv[i];
			break;

		// reflectors list [FILE TO LOAD]
		case '-r':
		    i++;
			ref = process.argv[i];
			break;

		// display event log in shell
		case '-l':
			require('./options/log.js');
			break;
	}
}

repnet = require('./src/repnet.js')(port);

if (dev) {
	if (dev[0] != '/') {
		dev = './../'+dev;
	}
	require('./options/dev.js')(dev);
}

if (ref) {
	if (ref[0] != '/') {
		ref = './'+ref;
	}
	repnet.addReflectors(require(ref));
}
