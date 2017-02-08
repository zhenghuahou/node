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
      default:     type = 'text/html; charset=UTF-8'; break;
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
    console.error('4 request-->end chunk:',chunk,'time:',+new Date);
    // response.end();  //加了这行，就关闭了数据传输，5处的content就写入不了
  });

  var postfix = getPostfix(_url);
  var type = getType(postfix);
  
  //response.setHeader(name, value)
  //response.writeHead(statusCode[, statusMessage][, headers])
  //writeHead比setHeader具有更高的优先级
  // response.setHeader('Content-Type', 'text/plain');
  response.writeHead(200, {
    'Content-Type': type,
    'X-Foo':'bala'
  });
  var t1 = +new Date;

  console.info('0:',t1,' postfix:',postfix,' type:',type);

  response.write(`new Date:${+new Date}--type:${type}<br>`);
  response.write(`${JSON.stringify(_url)} ${request.method} ${request.url} HTTP/${request.httpVersion}<br>`);
  response.write('headers:<br>')
  for (var h in request.headers) {
    response.write(`${h} :  ${request.headers[h]} <br>`);
  }
  
  //加了这行，就关闭了数据传输，5处的content就写入不了
  // response.end(function(){
  //   console.log('3 response.end 回调函数:','arguments:',arguments,'time:',+new Date);
  // });

  console.warn('1:',+new Date,' response:',response);

  var filename = _url.pathname.substring(1);

  fs.readFile(filename, function (err, content) {
      var contentType = response.getHeader('content-type');
      console.error('5 err:',err,' time:',+new Date);
      content = err ? err.message: content;
      response.end(content); //5
    });

  console.warn('2__________________位置最后的console________________！！')
});


// console.log(' http:',http);
// console.log(' server:',server);
// console.log(' app:',app);
// console.log(' app.on === server.on:',app.on === server.on);//true

