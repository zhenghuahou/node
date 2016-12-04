
/*

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
*/

var ets = require('events');

console.log('ets',ets);

// 创建 eventEmitter 对象
var eventEmitter = new ets.EventEmitter();
console.log('eventEmitter:',eventEmitter,eventEmitter.on);
console.log('eventEmitter.on:',eventEmitter.on);
console.log('eventEmitter.emit',eventEmitter.emit);

var dataReceivedHandler = function(){
   console.log(' data_received 事件回调处理函数 && 数据接收成功。',arguments);

}

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', dataReceivedHandler);


// 绑定 onconnection 事件处理程序
eventEmitter.on('onconnection',function(d1,d2){
    console.log(' node事件回调函数--> 触发 data_received 事件 :',arguments);
    // 触发 data_received 事件 
    eventEmitter.emit('data_received',d1,d2);
})

// 触发 onconnection 事件 
eventEmitter.emit('onconnection',['test'],2,3,4);


console.log('程序执行完毕');