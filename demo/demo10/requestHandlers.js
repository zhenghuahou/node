// function start() {
//   console.log("Request handler 'start' was called.");

//   function sleep(milliSeconds) {
//     var startTime = new Date().getTime();
//     console.info(' startTime:',startTime);
//     while (new Date().getTime() < startTime + milliSeconds){
//         console.warn('date:',new Date().getTime())    
//     };
//   }

//   sleep(10000);
//   return "Hello Start";
// }


var exec = require("child_process").exec;

function start(response) {
  //console 输出顺序 00-->01-->02
  console.log('00 new Date:',+new Date);
  
  //exec的操作是异步的
  exec("find /",{ timeout: 10000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
    console.log('02 new Date:',+new Date,arguments);
  });
  console.log("01 Request handler 'start' was called.");
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;