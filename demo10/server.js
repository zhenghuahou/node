var http = require("http");
var querystring = require("querystring");
var url = require("url");


function start(route,handle) {
  http.createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request received.",request.url,url.parse(request.url));

    //路由
    // response.writeHead(200, { "Content-Type": "text/plain" });
    route(handle, pathname,response)
    // response.write(content);
    // response.end();
  }).listen(8888);

  console.log("Server has started.");
}

// var str = 'name:Sophie;shape:fox;condition:new';
// var obj =  querystring.parse(str, ';', ':');
// console.log('querystring:', obj);
// {
//   name: 'Sophie',
//   shape: 'fox',
//   condition: 'new',
// }
// console.info(' querystring:',querystring.stringify(obj));
//querystring:name=Sophie&shape=fox&condition=new

exports.start = start;

console.log("1:this:", this);
// module.exports === exports //true