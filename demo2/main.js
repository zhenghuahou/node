
/*

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
*/

var ets = require('events');

console.log('ets:',ets);
//ets.EventEmitter ===ets //--> true
console.log('ets.EventEmitter:',ets.EventEmitter,ets.EventEmitter.listenerCount);

// 创建 eventEmitter 对象
var eventEmitter = new ets.EventEmitter();
console.log('eventEmitter:',eventEmitter);
// console.log('eventEmitter.on:',eventEmitter.on);
// console.log('eventEmitter.emit',eventEmitter.emit);

var dataReceivedHandler = function(){
   console.log(' data_received 事件回调处理函数 && 数据接收成功。',arguments);

}

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', dataReceivedHandler);
eventEmitter.on('data_received', function(){
	console.log(' data_received 事件回调处理函数 && 对于每个事件，EventEmitter 支持 若干个事件监听器 arguments:',arguments)
});


// 绑定 onconnection 事件处理程序
eventEmitter.on('onconnection',function(d1,d2){
    console.log('onconnection回调函数----> 触发 data_received 事件 :',arguments);
    // 触发 data_received 事件 
    // eventEmitter.emit('data_received',d1,d2);
})


// 监听器
var listener2 = function listener2() {
   console.log('onconnection回调函数---->arguments:',arguments);
}


eventEmitter.on('onconnection',listener2);


eventEmitter.on('removeListener',function(){
	console.log('removeListener-------------------------------',arguments);
})


// eventEmitter.emit('error'); 

//listeners(event) 
//返回指定事件的监听器数组。
var arr = eventEmitter.listeners('onconnection');
console.log(' arr----->:',arr,arr.length);
eventEmitter.emit('onconnection',['test'],2,3,4);


var eventListeners = ets.EventEmitter.listenerCount(eventEmitter,'onconnection');
console.log(eventListeners + " 个监听器监听连接事件。")

// 移除监绑定的 listener2 函数
eventEmitter.removeListener('onconnection',listener2);


// 触发 onconnection 事件 
eventEmitter.emit('onconnection','ag');


 eventListeners = ets.EventEmitter.listenerCount(eventEmitter,'onconnection');
console.log(eventListeners + " 个监听器监听连接事件。!!!")
//返回指定事件的监听器数组。
var arr2 = eventEmitter.listeners('onconnection');
console.log('arr2----->:',arr2,arr2.length);

// setTimeout(function(){
// 	eventEmitter.emit('onconnection',['aa']);
// },2000)


console.log('程序执行完毕');