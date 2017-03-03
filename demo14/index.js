var Writable = require('stream').Writable;
var Readable = require('stream').Readable;
var fs = require('fs');
var ws = new Writable({ decodeStrings: false });
var rs = new Readable({ decodeStrings: false });
var ws2 = fs.createWriteStream('message3.txt');
var rs2 = fs.createReadStream('message3.txt');

// console.log('ws:',ws);
// console.log('ws2:',ws2);

// console.log('rs:',rs);
// console.log('rs2:',rs2);

// console.log('Readable:',Readable);
//ws2.__proto__ .__proto__=== ws.__proto_==>true
//rs2.__proto__ .__proto__=== rs.__proto_==>true
// console.log('ws2:',ws2,ws2.__proto__ .__proto__=== ws.__proto__,rs2.__proto__ .__proto__=== rs.__proto__);
ws._write = function (chunk, enc, callback) {
    console.log(chunk,enc,callback);
    ws2.write('我是华子\n');
    ws2.write('chunk\n:'+chunk);
    callback();
};
process.stdin.pipe(ws);

// var fs = require('fs');
// var ws = fs.createWriteStream('message.txt');
// ws.write('hello --------->');
// setTimeout(function () {
//     ws.end('world \n');
// }, 1000);

