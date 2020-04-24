var http = require('http')
var fs = require('fs')

var stats = fs.statSync('test');

console.warn(' stats:',stats) //只在初始化的时候执行依次
var server = http.createServer(function (req, res) {
    //每次请求进来都执行
    var stream = fs.createReadStream(__dirname + '/test.txt')
    console.warn(' ~~ stream:',+new Date,req.url);
    stream.pipe (res)
})
server.listen(8889)
//  const aa = fs.readFile('index.html',(err,data) => {
//     // response.statusCode = 200
//     console.warn(' data:',data,+new Date);//buffer
//     console.warn(' data.toString:',data.toString(),+new Date);//string
// });
// console.warn(' aa:',aa,+new Date)
//Transfer-Encoding: chunked
