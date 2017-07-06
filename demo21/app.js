const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();

// var router = new Router();
// console.dir(Router);

// console.info(' router------>');
// console.dir(router);

// router.get(
//   '/users/:id',
//   function (ctx, next) {
//     return User.findOne(ctx.params.id).then(function(user) {
//       ctx.user = user;
//       next();
//     });
//   },
//   function (ctx) {
//     console.log(ctx.user);
//     // => { id: 17, name: "Alex" }
//   }
// );

// // response
// app.use(ctx => {
//     console.warn(' ctx:',ctx);
//   ctx.body = 'Hello Koa';
// });

// app.listen(3000);


var http = require('http');
var querystring = require('querystring');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  console.error(' req:',req,' res:',res);
  req.on('data', function (chunk) {
    console.warn(' chunk:',chunk);
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    console.info(' body::::::',body);
    body = querystring.parse(body);
    console.info(' body:',body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3001);