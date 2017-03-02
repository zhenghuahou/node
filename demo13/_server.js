
var http = require("http");
var querystring = require("querystring");
var url = require("url");
var formidable = require('formidable');
var util = require('util');
console.log(' util:', util);


http.createServer(function (req, res) {
  console.warn(' req:', req);
  if (req.url == '/upload' && req.method.toLocaleLowerCase() == 'post') {
    var form = new formidable();

    // console.warn(' formidable.IncomingForm--->',formidable.IncomingForm ===formidable) //true
    // console.warn('formidable:',formidable);

    form.parse(req, function (err, fields, files) {
      console.warn(' *******', arguments);
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      res.end(util.inspect({ fields: fields, files: files }));
    });

    return;
  };
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="text" name="hauzi"><br>' +
    '<input type="file" name="upload" multiple="multiple"><br>' +
    '<input type="submit" value="Upload">' +
    '</form>'
  );
}).listen(8888);

console.log("Server has started.");

// exports.start = start;
