var querystring = require("querystring");

function start(response,postData) {
  // console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="area" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    console.info(' start end!');
}

function upload(response,postData) {
  console.log("Request handler 'upload' was called.", querystring.parse(postData));
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the area: "+querystring.parse(postData).area);
  response.end();
   console.info(' upload end!');
}



exports.start = start;
exports.upload = upload;