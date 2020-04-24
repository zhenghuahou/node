const EventEmitter = require('events');
var url=require('url');

class MyEmitter extends EventEmitter {}
class MyEmitter2 extends EventEmitter {}

const myEmitter = new MyEmitter();
const myEmitter2 = new MyEmitter2();
myEmitter.on('to-mime', (a,b) => {
  console.log('an event occurred!','a:',a,'b:',b,+new Date);
});
console.log(' time1:',+new Date)
myEmitter.emit('to-mime',23);
