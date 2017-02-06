var app=require('http').createServer(),
    io=require('socket.io').listen(app),
    fs=require('fs');



var server = require('http').createServer(function(req,res){
  console.log(' --->',arguments);
  handler(req,res)
});
var io2 = require('socket.io')(server);


console.info(' io:',io);
console.info(' io2:',io2);
console.log(' app:',app);
console.log(' server:',server);

console.warn('io.sockets.on:',io.sockets.on , io2.sockets.on)
/*
function addListener(type, listener) {
  return _addListener(this, type, listener, false);
}
*/


console.warn('io.on:',io.on, 'io2.on:',io2.on,io.on === io2.on)

/*
 function(){
    return this.sockets[fn].apply(this.sockets, arguments);
  } 

  io.on === io2.on==>true
*/

// server.listen(3000);
module.exports = 12;
