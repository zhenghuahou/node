var http = require("http");
var querystring = require("querystring");
var url = require("url");


function start(route,handle) {
  http.createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request received.",request.url,url.parse(request.url));

    var postData='';
    request.setEncoding("utf8");
    
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.",arguments);
    });

    request.addListener("end", function(data) {
       console.log("Received POST end chunk '"+
      data + "'.",arguments);
      route(handle, pathname, response, postData);
    });
    console.log('=================================','postData:',postData)
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

// module.exports === exports //true