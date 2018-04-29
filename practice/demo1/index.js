const assert = require('assert');
const util = require('util');
const EventEmitter = require('events');

function MyStream() {
  EventEmitter.call(this);
}

window.assert = assert;
util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    console.error(' arg:',arguments,arguments.length);
  this.emit('data23', data+'原来这样啊'+arguments[1]);
};
console.dir(MyStream)
console.dir(EventEmitter)

const stream = new MyStream();


console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on('data23', (data) => {
  console.log(+new Date,`Received data: "${data}"`);
});
stream.write(`It works!${+new Date}`,23); // Received data: "It works!"
