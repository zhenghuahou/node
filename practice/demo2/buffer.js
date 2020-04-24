var fs = require('fs');
const buf = Buffer.alloc(10,0x62, 0x75, 0x66, 0x66, 0x65, 0x72);
const buf2 = Buffer.allocUnsafe(20);
const buf3 = Buffer.alloc(20);
const buf4 = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);//十六进制0x开头
const buf5 = Buffer.concat([buf4]);//十六进制0x开头
buf4.fill('abef')
console.warn(' buf:',buf,' string:',buf.toString())
console.warn(' buf2:::',buf2,' string:',buf2.toString())
console.warn(' buf3:::',buf3,' string:',buf3.toString())
console.warn(' buf4:::',buf4,' string:',buf4.toString())
console.warn(' buf5:::',buf5,' string:',buf5.toString(),buf5 === buf4)
