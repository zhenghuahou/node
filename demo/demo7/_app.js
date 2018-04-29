var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer(handler3);
var querystring = require('querystring');

app.listen('3001','127.0.0.1');

// console.info(' querystring:',querystring);


function test(request,response){
  var postData = '';
   t0 = + new Date;

  request.addListener('data', function (postDataChunk) {
     console.error(' request监听data事件 ');
    postData += postDataChunk;
  });

  request.addListener('end', function () {
    t3 = +new Date;
    console.error(' request监听end事件 !!!!!');
    console.info('t0,t1,t2,t3',window.t0,
      window.t1,
      window.t2,
      window.t3,
      window.t3 - window.t2);
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("You've sent the text: " + querystring.parse(postData).text);
    response.end();

  });
}

function handler3(request,response){
  let {url} = request; 
  let postfix = getPostfix(url);
  console.info(request.headers['content-length'],' request:',request,' response:',response);
  if(filter(postfix)){
    route(request,response,postfix);
    test(request,response);
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
  console.info(' route-->postfix:',postfix);
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


