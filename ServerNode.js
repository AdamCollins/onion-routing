const serve = require('net-respond').serve;
const send = require('net-respond').send;
class ServerNode {
	constructor(ip, port) {
		this.ip = ip;
		this.port = port;
	}

	listen() {
		joinRegistry();
		print(`Node ${this.ip}:${this.port} is listening on port ${this.port}!`);
		serve(this.port, (req) => {
			let pack = req.data.value;
			print(`Node ${this.ip}:${this.port} recieved:`,pack);
			if (pack.data.constructor == Object) {
				send(pack.data, pack.data.to, (res) => { //if there is another node continue on.
					req.respond(res.value); //send back data
				});
			} else {
				req.respond('thanks for the data!'); //if reached target distination gather data and send back. 
			}
		});
		leaveRegistry();
	}

	//TODO
	joinRegistry(){
		this.nodesOnline[this.port] = this;
	};
	//TODO
	leaveRegistry(){
		delete this.nodesOnline[this.port];
	};

	toString(){
		return this.ip+":"+this.port;
	}

}

module.exports = ServerNode;