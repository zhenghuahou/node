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

server.on('request',function(request,response){
  // 解析请求的URL
  var _url = url.parse(request.url);
  
  request.on('data', function(chunk) { 
    console.error('request---> data chunk:',chunk);
    response.write(chunk); 
  });
  request.on('end', function(chunk) { 
    console.error(' request-->end chunk:',chunk);
    response.end(); 
  });


  // console.warn('****',  'request.setEncoding:',request.setEncoding,  'response.setEncoding:',response.setEncoding);
 
  // response.setHeader('Content-Type', 'text/plain');
  response.setHeader('X-Foo', 'bar');
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=UTF-8'
  });

  // response.write(request.method + ' ' + request.url +
      // ' HTTP/' + request.httpVersion + '\r\n');
  response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}<br>`);
  
  for (var h in request.headers) {
    response.write(`${h} :  ${request.headers[h]} <br>`);
  }

  
  var w = response.write('Hello 世界@');
  var e = response.end(function(){
    console.log(' end---》',arguments);
  });
  console.warn('________________________________')
  console.info(' argument:',arguments,' _url:',_url);
  // console.info(' w:',w,' e:',e);//w:true e:true



});


console.log(' http:',http);
console.log(' server:',server);
console.log(' app:',app);
console.log(' app.on === server.on:',app.on === server.on);//true




// function handler(request,response){
//   let {url} = request; 
//   let postfix = getPostfix(url);

//   if(filter(postfix)){
//     console.info(request.headers['content-length'],request.headers['connection'],'浏览器发出的请求  request:',request,
//       ' request.statusCode:',request.statusCode,
//       ' response:',response);
//     route(request,response,postfix);

//   }
// }

// //得到最后一级目录 ，返回最后一级目录/文件名
// function getLastPath(url){
//    var arr = url.split('/');
//    return arr[arr.length - 1];
// }

// //得到资源文件后缀 返回后缀名
// function getPostfix(url){
//   var name = getLastPath(url);
//   var postfix = name.split('.')[1]
//   return  postfix ? '.' + postfix : '';
// }

// var filterArr= ['.css','.js','.jpg','.png','.gif','.ico'];

// function filter(postfix = ''){
//   if(postfix && filterArr.includes(postfix)){
//     return false
//   }
//   //过滤通过
//   return true;
// }

// function route(request,response,postfix){
//   let {url} = request; 
//   t1 = +new Date;
//   // console.info(' route-->postfix:',postfix);
//   postfix = postfix ? '': '.html'
//   fs.readFile(`${__dirname}/static/${url}${postfix}`,function(error,data){
//       let html ='';
//       response.writeHead(200, {'Content-Type': 'text/html'});
//       t2 = +new Date;
//       console.log(error,' data:',data,' t2:',t2,' t2-t1:',t2-t1)
//       html = error ? '404:-O,页面迷路了' : data;
//       response.end(html);

//   })
// }


function httpGet(){
  return  http.request({
    host: 'localhost',
    port:8000,
    method: 'POST',
    path: '/data.json'
  }, (res) => {
      tt1 = +new Date;
      console.warn(tt1,' get 自定义方法 res:',res,' res.statusCode:',res.statusCode,' res.end:',res.end);
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
                          `Status Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
                          `Expected application/json but received ${contentType}`);
      }
      if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        return;
      }

      res.setEncoding('utf8');

      let rawData = '';
      num = 0;
      res.on('data', (chunk) => {
        // console.error(' *************',arguments);
        tt2 = +new Date;
        num ++;
        rawData += chunk;
        // console.warn(tt2,' res.data 事件 chunk --->:',typeof chunk,arguments);
      });
      res.on('end', () => {
         tt3 = +new Date;
         console.warn(tt3,' res.end 事件 --->:',arguments);
        try {
          let parsedData = JSON.parse(rawData);
          console.log('parsedData:', parsedData);
        } catch (e) {
          console.log(e.message);
        }
      });
    }).on('error', (e) => {
      console.log(`Got error: ${e.message}`);
    });
}

var inst2 =  httpGet();


