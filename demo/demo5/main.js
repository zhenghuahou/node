//express_demo.js 文件
var express = require('express');
var cookieParser = require('cookie-parser')
var app = express();

// app.get('/', function (req, res) {
// 	console.log(' req---------->:',req);
// 	console.log('res hui fu:++++++++++.........>>>',res);
//    res.send('Hello !!');
// })
console.log( ' cookieParser---->',cookieParser);
app.use(cookieParser())

app.get('/', function (req, res) {
   console.log("主页 POST 请求");
	// console.log(' req.headers:',req.headers)
	// console.log(' res.headers:',res.headers)//undefined

   res.send('Hello ');
})



// app.get('/index.htm', function (req, res) {
// 	// console.log(' req.sendFile-->',req.sendFile);//undefined
// 	// console.log(' res.sendFile-->',res.sendFile);//fn
//    res.sendFile( __dirname + "/" + "form.html",function(){
//    	console.log(' sendFile------>arguments++++++++',arguments)
//    } );
// });



app.get('/process_get', function (req, res) {
   // 输出 JSON 格式
   console.log('req.query:',req.query, 'res.query:',res.query);

	 var query = req.query;
	 var obj={};
	 Object.keys(query).map(function(item){
	    console.log(' arg:',arguments)
	    obj[item] = query[item];
	});
   res.end('get方式  提交的数据：'+JSON.stringify(obj));
});



var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
console.log(' urlencodedParser------>',urlencodedParser);

app.post('/process_get',urlencodedParser,function (req, res) {
   // 输出 JSON 格式
   console.log('POST 提交 req.query:',req.query, 'res.query:',res.query);
   console.log(' req.body:',req.body,' req.cookies:',req.cookies);

	 // var query = req.query;
	 var query = req.body;
	 var obj={};
	 Object.keys(query).map(function(item){
	    console.log(' arg:',arguments)
	    obj[item] = query[item];
	});
   res.end('POST方式  提交的数据：'+JSON.stringify(obj));
});




//  /del_user 页面响应
// app.get('/del_user', function (req, res) {
   // console.log("/del_user 响应 DELETE 请求");
   // console.log(' req---------->:',req);
   //res-->ServerResponse
	// console.log('res hui fu:+++++++s+++.........>>>',res.send);
	 // 输出 JSON 格式
	//  console.log('req.query:',req.query, 'res.query:',res.query);

	//  var query = req.query;
	//  var obj={};
	//  Object.keys(query).map(function(item){
	//     console.log(' arg:',arguments)
	//     obj[item] = query[item];
	// });


   // response = {
   //     first_name:req.query.first_name,
   //     last_name:req.query.last_name
   //     last_name:req.query.last_name
   // };
   // console.log('obj:',obj);
   // res.send('删除页面:'+JSON.stringify(obj));
// })

//  /list_user 页面 GET 请求
// app.get('/list_user', function (req, res) {
//    console.log("/list_user GET 请求");
//    res.send('用户列表页面');
// })

// // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
// app.get('/ab*cd', function(req, res) {   
//    console.log("/ab*cd GET 请求");
//    res.send('正则匹配');
// })



console.log(' __dirname--->',__dirname);
var server = app.listen(8081, function () {
	// console.log(' server:',server);
	// console.log('server.address():',server.address());
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})