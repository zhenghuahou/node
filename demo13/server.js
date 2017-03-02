var http = require("http");
var querystring = require("querystring");
var url = require("url");


function start(route, handle) {
  http.createServer(function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.info(' *****', pathname);
    // console.warn("Request received.",request.url,url.parse(request.url),
    // ' pathname:',pathname);

    // var postData='';
    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.warn("Received POST data chunk '",
    //   postDataChunk , "  arguments:",arguments);
    // });

    // request.addListener("end", function() {
    //    console.warn("Received POST end chunk  arguments:",arguments);
    //   route(handle, pathname, response, request,postData);
    // });
    // route(handle, pathname, response, request,postData);
    route(handle, pathname, response, request);
  }).listen(8888);

  console.log("Server has started.");
}

// console.warn('server.js--> this:',this ,this === exports);

exports.start = start;
