var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = new http.Server();
server.listen(8000);

server.on('request',function(request,response){
  console.warn(' request:',request);
  console.info(' response:',response);
  // 解析请求的URL
  var _url = url.parse(request.url);
  var filename = _url.pathname.substring(1);
  var postfix = getPostfix(_url);
  var type = getType(postfix);

  _url.postfix = postfix;
  console.warn('  postfix:',postfix,' type:',type);
  response.setHeader('Content-type2', 'application/json');
  response.setHeader('X-Powered-By', 'bacon');

  response.writeHead(200, {
    'Content-Type': type,
    'X-Foo':'bala'
  });
  
  route(response,_url);
});


const filterArr= ['ico'];

function getType(postfix=''){
    var type;
    switch(postfix){
      case 'js':       type = 'application/javascript; charset=UTF-8'; break;
      case 'css':      type = 'text/css; charset=UTF-8'; break;
      case 'txt' :     type = 'text/plain; charset=UTF-8'; break;
      case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
      case 'html':
      case 'htm':  
      default:     type = 'text/html; charset=UTF-8'; break;
    }
    return type;
}

function getPostfix(url){
  let {pathname} = url;
  let index = pathname.lastIndexOf('.');
  return  index == -1 ? '': pathname.slice(index+ 1);
}

function filter(postfix = ''){
  if(postfix && filterArr.includes(postfix)){
    return false
  }
  //过滤通过
  return true;
}


function route(response,url){
  let{postfix,pathname} = url;
  if(pathname.slice(-1) === '/'){
    pathname +='index'; 
  }
  pathname =  pathname.slice(1);
  console.info(' url:',url,'pathname:',pathname);
  if(filter(postfix)){
    postfix = postfix ? '': '.html';
    // console.error(`${__dirname}/static/${pathname}${postfix}`)
    fs.readFile(`${__dirname}/static/${pathname}${postfix}`,'utf8',function(err,content){
      // console.error('err:',err,'content:',content,' time:',+new Date);
      content = err ? err.message: content;
      response.end(content); 
    })
  }
}


