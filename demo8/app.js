var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer();
var url = require('url');
var querystring = require('querystring');

app.listen('3000');




var server = new http.Server();
server.listen(8000);


server.method ='POST';

function getPostfix(url){
  let {pathname} = url;
  
  return pathname &&  pathname.slice(pathname.lastIndexOf('.') + 1);;
}

function getType(postfix=''){
  // var filename = url.pathname.substring(1);
    var type;
    // switch(filename.substring(filename.lastIndexOf('.') + 1))  {
    switch(postfix){
      
      case 'js':       type = 'application/javascript; charset=UTF-8'; break;
      case 'css':      type = 'text/css; charset=UTF-8'; break;
      case 'txt' :     type = 'text/plain; charset=UTF-8'; break;
      case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
      case 'html':
      case 'htm':  
      default:     type = 'text/html; charset=UTF-8'; 
      // default:         type = 'application/octet-stream'; break;
    }
    return type;
}

server.on('request',function(request,response){
  // 解析请求的URL
  var _url = url.parse(request.url);
  
  request.on('data', function(chunk) { 
    console.error('request---> data chunk:',chunk);
    response.write(chunk); 
  });
  request.on('end', function(chunk) { 
    console.error('1 request-->end chunk:',chunk);
    // response.end(); 
  });

  var postfix = getPostfix(_url);
  var type = getType(postfix);

  // console.warn('****',  'request.setEncoding:',request.setEncoding,  'response.setEncoding:',response.setEncoding);
  // response.setHeader('Content-Type', 'text/plain');
  //setHeader
  response.setHeader('X-Foo', 'bar');
  response.writeHead(200, {
    // 'Content-Type': 'text/html; charset=UTF-8'
    'Content-Type': type
  });

  // response.write(request.method + ' ' + request.url +
      // ' HTTP/' + request.httpVersion + '\r\n');
  response.write(`postfix:${postfix}--type:${type}<br>`);
  response.write(`${JSON.stringify(_url)} ${request.method} ${request.url} HTTP/${request.httpVersion}<br>`);
  response.write('headers:<br>')
  for (var h in request.headers) {
    response.write(`${h} :  ${request.headers[h]} <br>`);
  }

  
  var w = response.write('Hello 世界<br>');
  // var e = response.end(function(){
  //   console.log(' end---》',arguments);
  // });

  var filename = _url.pathname.substring(1);

  fs.readFile(filename, function (err, content) {
    console.log('2 err:',err,' content:',content,' filename:',filename)
      if (err) {
        // response.writeHead(404, {
        //   'Content-Type': 'text/plain; charset=UTF-8'});
        response.write('err.message:'+err.message);
        response.end();
      } else {
        response.writeHead(200, {'Content-Type': type});
        response.write(content);
        response.end();
      }
    });

  console.warn('0________________________________')
  // console.info(' argument:',arguments,' _url:',_url);
  // console.info(' w:',w,' e:',e);//w:true e:true

});


// console.log(' http:',http);
// console.log(' server:',server);
// console.log(' app:',app);
// console.log(' app.on === server.on:',app.on === server.on);//true

