var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer(handler3);
// var app = http.createServer();
var querystring = require('querystring');

app.listen('3000');

app.timeout = 10000;

console.log(' http:',http);
// console.log(' app:',app);

function getTestPersonaLoginCredentials(callback) {
  return http.get({
    host: 'localhost',
    port:3000,
    path: '/data.json'
  }, function(response) {
    // console.info('@@@@ arguments:',arguments);
    var body = ''; 
    // response.setEncoding('utf8');
    response.on('data', function(d) {
      body += d;
      // console.error(typeof body,body,'getTestPersonaLoginCredentials--->data事件:',d,' typeofof d:',typeof d,' arguments:',arguments);
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);

      // console.warn(' getTestPersonaLoginCredentials--->end事件 :',parsed,typeof parsed ,'arg:',arguments)
      callback(parsed);
    });
  });
}

var inst1 = getTestPersonaLoginCredentials(function(){
        // console.log(' getTestPersonaLoginCredentials 回调:',arguments[0])
      });

function httpGet(){
  return  http.get('http://nodejs.org/dist/index.json', (res) => {
      tt1 = +new Date;
      // console.warn(tt1,res.headers['content-length'],res.headers['content-type']
// ,' get 自定义方法 res:',res,' res.statusCode:',res.statusCode,' res.end:',res.end);
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
        //  console.warn(tt3,' res.end 事件 --->:',arguments);
        try {
          let parsedData = JSON.parse(rawData);
          // console.log('parsedData:', parsedData);
        } catch (e) {
          // console.log(e.message);
        }
      });
    }).on('error', (e) => {
      // console.log(`Got error: ${e.message}`);
    });
}

// var inst2 =  httpGet();

function httpRequest(){
  var postData = querystring.stringify({
    'msg' : 'Hello World!你'
  });

  // console.error(' Buffer:',Buffer, Buffer.byteLength(postData), ' len:',postData.length);

  var options = {
    hostname: 'www.google.com',
    port: 80,
    // path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  http.request(options, (res) => {
    //res is an instance of http.IncomingMessage
      console.log(' res:',res);
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
  });

  req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`,'e:',e,'  《  req:',req);
  });

  // write data to request body
  req.write(postData);
  req.end();
}
// var inst3 =  httpRequest();

// console.log(' inst3:',inst3,'inst2:',inst2)


function handler3(request,response){
  let {url} = request; 
  let postfix = getPostfix(url);
  console.log(' request:',request)
  console.warn(' response:',response);
  global.req = request;
  global.response = response;
  
  if(filter(postfix)){
    // console.info(request.headers['content-length'],request.headers['connection'],'浏览器发出的请求  request:',request,
      // ' request.statusCode:',request.statusCode,
      // ' response:',response);
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

var filterArr = ['.css','.js','.jpg','.png','.gif','.ico'];

function filter(postfix = ''){
  console.info(' postfix:',postfix,' filterArr:',filterArr)
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
      // console.log(error,' data:',data,' t2:',t2,' t2-t1:',t2-t1)
      html = error ? '404:-O,页面迷路了' : data;
      response.end(html);

  })
}


