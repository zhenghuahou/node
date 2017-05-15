/*
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，
还有stdout（标准输出）。
Node.js，Stream 有四种流类型：
Readable - 可读操作。
Writable - 可写操作。
Duplex - 可读可写操作.
Transform - 操作被写入数据，然后读出结果。
所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
data - 当有数据可读时触发。
end - 没有更多的数据可读时触发。
error - 在接收和写入过程中发生错误时触发。
finish - 所有数据已被写入到底层系统时触发。


*/

// var fs = require('fs');

// var readFile = function (fileName) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(fileName, function(error, data) {
//       if (error) reject(error);
//       resolve(data);
//     });
//   });
// };

// var gen = function* (){
//   var f1 = yield readFile('/etc/fstab');
//   var f2 = yield readFile('/etc/shells');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };



var fs = require('fs');
var readFile = fs.readFile;
// console.log(' readFile:',readFile);

// var asyncReadFile = async function (){
//   var f1 = await readFile('input.txt');
//   var f2 = await readFile('input2.txt');
//   console.log(f1.toString());
//   console.log(f2.toString());
// };
global.f1 ='';
global.writable = fs.createWriteStream('input2.txt');
// global.writable = fs.createReadStream('input.txt', {start: 0, end: 99});
// var asyncReadFile =  function (){
//     f1 =  readFile('input.txt');
// };
console.log(' writable::::',writable,writable.toString())
// asyncReadFile();


global.file = fs.createReadStream('input.txt');
global.data ='';
file.on('data', function(chunk) {
    console.warn(' --->',chunk,' arguments:',arguments,typeof arguments[0],{}.toString.call(arguments[0]),chunk.length,chunk.contents)
   data += chunk;
});


const writable2 = fs.createWriteStream('file.txt');
console.dir('writable2:',writable2)
writable2.write('node 流 实践,');
writable2.write('<<<<<<<node 流 实践,');
// All the data from readable goes into 'file.txt'
file.pipe(writable2);
// file.pipe();



