var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer(handler);
var url = require('url');
var querystring = require('querystring');

app.listen('3000');

app.timeout = 10000;


// const myURL = new URL('https://example.org:8888');
// console.log('myURL.port:',myURL.port,myURL);
// myURL.port: 8888 

// myURL.port = 1234;
// myURL.hash = 1234;
// console.log('myURL.port:',myURL.href);
//myURL.port: https://example.org:1234/#1234




var server = new http.Server();
server.listen(8000);



server.on('request',function(request,response){
  // 解析请求的URL
  var _url = url.parse(request.url);
  
  response.setHeader('Content-Type', 'text/html');
  response.setHeader('X-Foo', 'bar');
  // response.sendDate = false;

  response.writeHead(200, {
    // 'Content-Type': 'text/plain; charset=UTF-8'
  });
  var w = response.write('Hello 世界@');
  var e = response.end(function(){
    console.log(' end---》',arguments);
  });
  console.info(' argument:',arguments,require('url'),' url:',url,' _url:',_url);
  // console.info(' w:',w,' e:',e);//w:true e:true

});


console.log(' http:',http);
console.log(' server:',server);
console.log(' app:',app);
// console.log(' app.on === server.on:',app.on === server.on);//true




function handler(request,response){
  let {url} = request; 
  let postfix = getPostfix(url);

  if(filter(postfix)){
    console.info(request.headers['content-length'],request.headers['connection'],'浏览器发出的请求  request:',request,
      ' request.statusCode:',request.statusCode,
      ' response:',response);
    route(request,response,postfix);

  }
}

//得到最后一级目录 ，返回最后一级目录/文件名
function getLastPath(url){
   var arr = url.split('/');
   return arr[arr.length - 1];
}

//得到资源文件后缀 返回后缀名
function getPostfix(url){
  var name = getLastPath(url);
  var postfix = name.split('.')[1]
  return  postfix ? '.' + postfix : '';
}

var filterArr= ['.css','.js','.jpg','.png','.gif','.ico'];

function filter(postfix = ''){
  if(postfix && filterArr.includes(postfix)){
    return false
  }
  //过滤通过
  return true;
}

function route(request,response,postfix){
  let {url} = request; 
  t1 = +new Date;
  // console.info(' route-->postfix:',postfix);
  postfix = postfix ? '': '.html'
  fs.readFile(`${__dirname}/static/${url}${postfix}`,function(error,data){
      let html ='';
      response.writeHead(200, {'Content-Type': 'text/html'});
      t2 = +new Date;
      console.log(error,' data:',data,' t2:',t2,' t2-t1:',t2-t1)
      html = error ? '404:-O,页面迷路了' : data;
      response.end(html);

  })
}


