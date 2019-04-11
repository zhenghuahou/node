//https://www.cnblogs.com/lienhua34/p/6057662.html
//模拟'{ [Error: socket hang up] code: 'ECONNRESET' } '报错
const express = require('express');
const util = require('util');
const app = express();

app.get("/", function(req, res, next) {
    util.log("Received a request.");

    setTimeout(function() {
        res.setHeader('transfer-encoding', 'chunked');
        res.status(201);
        util.log("[server.js] timeout")
        res.write("hello world");
        res.end();
    }, 3 * 60 * 1000)
});
var server = app.listen(3001, function() {
    util.log("server listening at port 3001......");
});

//https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_server_settimeout_msecs_callback
//解决措施：调用服务器端的server.setTimeout()方法将服务器端的超时设置得大一点或者直接将超时机制关闭（将超时时间设置为0即可关闭）。
// server.setTimeout(0)