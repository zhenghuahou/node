var fs = require('fs');
var path = require('path');
var http = require('http');
var app = http.createServer(handler3);

console.log(' http:',http);
console.log(' app:',app);
console.log(' fs:',fs);

app.listen('3001','127.0.0.1');

// var _app = require('./_app.js');
console.log(path.dirname(__dirname));//Users/houzhenghua/github/node
console.log(path.dirname(__filename));//Users/houzhenghua/github/node/demo6

/*
The process.cwd() method 
returns the current working directory of the Node.js process.
*/

// var fa = require('./data.txt');
// console.log(' fa:',path.dirname(__filename),path.dirname(__filename) + '/data.txt');
//进入node目录下面，运行 node demo6/app.js
console.log(__dirname); //Users/houzhenghua/github/node/demo6
console.log(__filename);//Users/houzhenghua/github/node/demo6/app.js
console.log(process.cwd()); //Users/houzhenghua/github/node
console.log(path.resolve('./'));//Users/houzhenghua/github/node
console.log(path.resolve('/'));// 


/*
进入demo6文件夹下面，运行 node app.js
console.log(__dirname); //Users/houzhenghua/github/node/demo6
console.log(__filename);//Users/houzhenghua/github/node/demo6/app.js
console.log(process.cwd()); //Users/houzhenghua/github/node/demo6
console.log(path.resolve('./'));//Users/houzhenghua/github/node/demo6
console.log(path.resolve('/'));// 
*/


//简单输出  test1
// function handler1(request,response){
//   console.log(' arg:',arguments,request.url);
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.write('<p>word</p>');
//   response.write('<a href="http://www.baidu.com">word</a><br>');
//   response.end('hello!');
// }


// console.log(' -->',fs.readFileSync('./demo6/data.txt',{encoding:"utf-8"})); //ok
// console.log(' -->',fs.readFileSync('demo6/data.txt',{encoding:"utf8"}));//ok
// console.log(' -->',fs.readFileSync('demo6/data.txt',"utf8"));//ok
// console.log(' -->',fs.readFileSync('demo6/data.txt',"utf-8"));//ok


// 输出文件内容 test2
// function handler2(request,response){
//     fs.readFile(path.dirname(__filename) + '/readme.md','utf8',function(error,data){
//     // fs.readFile读取文件的路径是相对于启动脚本所在目录的路径
//     // 所以启动目录不一样，fs.readFile读取文件最终解析成的路径也不一样
//     // 为了保险起见,fs.readFile读取文件url使用绝对路径
//     // fs.readFile(`${__dirname}/data.txt`,'utf8',function(error,data){
//       // console.log(' arguments:',arguments,request.url);
//       // console.info(' data:',data,data.length);
//       response.writeHead(200, {'Content-Type': 'text/plain'});
//       response.end(data);
//     })
// }

function handler3(request,response){
  route(request,response);
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
  // console.warn(' name:',name,' postfix:',postfix);
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


function route(request,response){
  let {url} = request; 
  let postfix = getPostfix(url);

  // if(!url.endsWith('.ico')){
  if(filter(postfix)){
    t1 = +new Date;
    postfix = postfix ? '': '.html'

    fs.readFile(`${__dirname}/static/${url}${postfix}`,function(error,data){
        let html ='';
        response.writeHead(200, {'Content-Type': 'text/html'});
        t2 = +new Date
        console.log(error,' data:',data,' t2-t1:',t2-t1)
        html = error ? '404:-O,页面迷路了' : data;
        response.end(html);
    })
  }
}

// function route(request,response){
//   let {url} = request; 
//   if(url == '/index'){
//       response.end('index page');
//   }else if(url =='/about'){
//      response.end('about page');
//   }else if(url =='/detail'){
//      response.end('detail page');
//    }else{
//     response.end('e404 page');
//    }
// }




