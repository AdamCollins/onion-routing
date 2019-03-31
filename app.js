let vorpal = require('vorpal')();
let ServerNode = require('./ServerNode');
let Client = require('./Client');
const print = console.log;
let port = parseInt(process.argv[2]);
let hosts = {};


//show nodes
vorpal
    .command('show nodes', 'Outputs list of node addresses online')
    .action(function (args, callback) {
        this.log(hosts);
        callback();
    });

//add node
vorpal
    .command('add node <port>', 'Outputs list of node addresses online')
    .action(function (args, callback) {
        if(!hosts[args.port]){
            let node = new ServerNode('localhost', args.port);
            hosts[args.port] = node;
            node.listen();
        }else{
            this.log('Thatsu addressu desu alreadyu inu use (︶︹︺)');
        }
        callback();
});

vorpal
    .command('request <item> <from>', 'Outputs list of node addresses online')
    .action(function (args, callback) {
        new Client()
        callback();
    });

vorpal
    .delimiter('-$')
    .show();

/** 1337 -> 1338 -> 1339 -> google -> 1339 ->1338 -> 1337
 * to:1338
 * from: 1337,
 * data:{
 *      to :1339
 *      from: 1338,
 *      data:{
 *               to:'google',
 *               from: 1339,
 *               data:"GET index.html"
 *       }
 *     } 
 */