const serve = require('net-respond').serve;
const send = require('net-respond').send;
const print = console.log;

let hosts = [1337, 1338, 1339]

let msg = {
    to: 'https://gooogle.com',
    from:'',
    data:"GET index.html"
}

print(createPath(msg));



function createPath(msg){
    let nodePath = ['localhost:1337', 'localhost:1338', 'localhost:1339', 'localhost:1340', 'google.com']; //where chosenNodes is a random sub list of hosts.
    let path = {};
    let child = msg.data;
    for (let i = nodePath.length - 2; i > 0; i--){
        path = {};
        path['to'] = nodePath[i];
        path['from'] = nodePath[i-1];
        path['data'] = child;
        child = path;
    }
    return path;
}
let pack = createPath(msg)
send(pack, pack.to,(res)=>{
    print('done!');
})
serve(1337,(req)=>{
    let pack = req.data;
    send()
});
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