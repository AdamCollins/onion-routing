const send = require('net-respond').send;
class Client {
	ip = null;
	port = null;
	
	constructor(ip, port, nodeDir){
		this.ip = ip;
		this.port = port;
		this.nodeDir = nodeDir;
	}

	//TODO store node record somewhere.
	loadNodesOnline() {
		['localhost:1337', 'localhost:1338', 'localhost:1339']
	}

	createMessage(request, destination){
		return{
			to: destination,
			from: '',
			data: request
		}
	}

	makeRequest(msg, to) {
		let pack = createPath(msg);
		send(pack, pack.to, (res) => {
			print('done!');
			print('recieved', res);
		});
	}

	getRandomNodes(n) {
		//randomly select n nodes
		return this.loadNodesOnline();
	}

	getClientAddress(){
		return this.port;
	}

	createPath(msg, destination) {
		let nodePath = this.getRandomNodes(n).push(destination);
		let path = {};
		let child = msg.data;

		//Debug
		let pathString = "";
		for (let i = nodePath.length - 1; i > 0; i--) {
			path = {};
			path['to'] = nodePath[i];
			path['from'] = nodePath[i - 1];
			path['data'] = child;
			child = path;

			pathString += "->" + nodePath[i];
		}
		//debug
		print(pathString);
		return path;
	}

}

module.exports = Client;
