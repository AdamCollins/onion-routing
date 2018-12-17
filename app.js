const serve = require('net-respond').serve;
const send = require('net-respond').send;
const print = console.log;
let port = parseInt(process.argv[2]);
let hosts = [1337, 1338, 1339]

let msg = {
    to: 'https://gooogle.com',
    from:'',
    data:"GET index.html"
}

// print(createPath(msg));



function createPath(msg){
    let nodePath = ['localhost:1337', 'localhost:1338', 'localhost:1339','google.com']; //where chosenNodes is a random sub list of hosts.
    let path = {};
    let child = msg.data;
    for (let i = nodePath.length - 2; i > 0; i--){
        path = {};
        path['to'] = nodePath[i];
        path['from'] = nodePath[i-1];
        path['data'] = child;
        child = path;
    }
    print(path);
    return path;
}
if(port == 1337)
makeRequest();
function makeRequest(){
    let pack = createPath(msg);
    send(pack, pack.to,(res)=>{
        print('done!');
        print('recieved', res);
    });
}
print('listening on port', port);
serve(port,(req)=>{
    let pack = req.data.value;
    print(pack);
    if(pack.data.constructor == Object){
        send(pack.data, pack.data.to,(res)=>{   //if there is another node continue on.
            req.respond(res.value);                   //send back data
        }); 
    }else{
        req.respond('thanks for the data!');    //if reached target distination gather data and send back. 
    }
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