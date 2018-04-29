// var buffer = new Buffer('www.runoob.com');
var buffer = new Buffer(256);

console.log("buffer length: " , buffer.length);
var len = buffer.write('www.runoob.com',80);

//缓冲区长度
console.log('len:',len,"buffer length: "+buffer.length);
//len: 14 buffer length: 256

console.log('buffer:'+buffer.toString('',81,85));//输出的结果每次都不一样，随机变化
//buffer:www.r
//buffer:6��4www.r
//buffer:6��4!��J���(www.r


// console.log(' toJSON',buffer.toJSON());


// var buffer1 = new Buffer('BCDEF');
// var buffer2 = new Buffer('ABCD');
// var result = buffer1.compare(buffer2);

// if(result < 0) {
//    console.log(buffer1 + " 在 " + buffer2 + "之前");
// }else if(result == 0){
//    console.log(buffer1 + " 与 " + buffer2 + "相同");
// }else {
//    console.log(buffer1 + " 在 " + buffer2 + "之后");
// }


var buffer1 = new Buffer('abc');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log(buffer2.length,"buffer2 content: " , buffer2,buffer2[0],buffer2[1],buffer2[2],buffer2[3]);
//3 'buffer2 content: ' <Buffer 61 62 63> 97 98 99 undefined
// console.log(buffer2.length,"buffer2 content: "+buffer2);

var buf = buffer2.slice(1,2);
console.log('buf:'+buf+' buffer2:'+buffer2);
//buf:b buffer2:abc


var buffer1 = new Buffer('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString(),buffer2[0],buffer2[1],buffer2[2],buffer2[3]);
//buffer2 content: ru 114 117 undefined undefined

buffer2[0]=118;//buffer1，buffer2的内容都会跟着变
console.log("buffer2 content: " + buffer2.toString()+" buffer1 content: " + buffer1.toString());
//buffer2 content: vu buffer1 content: vunoob

console.log(' buffer2 length:',buffer2.length,'  buffer1 content:',buffer1.length);
// buffer2 length: 2   buffer1 content: 6



var b1 = new Buffer('http://w1w2w.runoob.com/nodejs/nodejs-buffer.html');
var b2 = new Buffer('http://w1w2w.runoob.com/nodejs/nodejs-buffer.html');

console.log('b1===b2',b1.equals(b2));
//b1===b2 true

// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
// buffer 拷贝，源和目标可以相同。 targetStart 目标开始偏移和 sourceStart 源开始偏移默认都是 0。
// sourceEnd 源结束位置偏移默认是源的长度 buffer.length 。

// 拷贝一个缓冲区
var b3 = new Buffer(10);
console.log('b3:'+b3);
var b3len = b1.copy(b3,3,10,18);
console.log('b3---->:'+b3,b3len,b3.length);
//b3---->:2w.runo 7 10




