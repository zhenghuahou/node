//JavaScript 内存泄漏实践
var strigify = JSON.stringify
console.log('001',strigify(process.memoryUsage(),null,' '));

var arr = new Array(5*1024*1024);
var ws = new WeakSet();
ws.add(arr)
console.info(' ws:',ws);
console.log('002 向ws添加ws对象后:',strigify(process.memoryUsage(),null,' '));

//解除对象arr的引用  
// arr = null;//注释掉这行内存没有减少多少，即使手动执行执行垃圾回收
console.log('003 arr设置为null之后',strigify(process.memoryUsage(),null,' '));
setTimeout(()=>{
    console.log('003【2】 arr设置为null之后+setTimeout(0)',strigify(process.memoryUsage(),null,' '));
},0)

//手动执行执行垃圾回收
global.gc();
console.log('004 执行global.gc()之后',strigify(process.memoryUsage(),null,' '));

