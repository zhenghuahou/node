//JavaScript 内存泄漏实践
var strigify = JSON.stringify
console.log('01',strigify(process.memoryUsage(),null,' '));

var arr = new Array(5*1024*1024);
var ws = new WeakSet();
ws.add(arr)
console.info(' ws:',ws);
console.log('02 向ws添加ws对象后:',strigify(process.memoryUsage(),null,' '));

arr = null;
console.log('03 arr设置为null之后',strigify(process.memoryUsage(),null,' '));
setTimeout(()=>{
    console.log('03【2】 arr设置为null之后+setTimeout(0)',strigify(process.memoryUsage(),null,' '));
},0)

//手动执行执行垃圾回收
global.gc();
setTimeout(()=>{
    console.log('04 执行global.gc()之后',strigify(process.memoryUsage(),null,' '));
},0);

