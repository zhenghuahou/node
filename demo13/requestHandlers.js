var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");
var util = require("util");
console.dir(formidable);
// console.log('formidable:',formidable,formidable === formidable.IncomingForm);

function start(response) {
  // console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" value="上传文件" multiple="multiple">'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

// function upload(response,postData) {
//   console.info("Request handler 'upload' was called.", querystring.parse(postData));
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("You've sent the text: "+querystring.parse(postData).text);
//   response.end();
// }


function upload(res,req,postData) {
  console.info("upload------------->Request handler 'upload' was called.",          querystring.parse(postData));
  console.info("upload------------->Request handler 'upload' was called. arguments:",arguments);
    var form = new formidable.IncomingForm();
    console.error("about to parse");
    form.on('field',function(field,value){
      console.warn(' field--->filed:',field,' value:',value,' ag:',arguments);
    }).on('file',function(field,value){
      console.warn(' file------------>filed:',field,' value:',value,' ag:',arguments);
    }).on('end',function(){
      console.warn(' end--->',arguments);
    });
    form.parse(req, function(err, fields, files) {
      // var t = util.inspect(fields);
      // var t = util.inspect({fields: fields, files: files})
      // console.log(t);
      console.warn(' ******',arguments,' fields:',fields, ' files:',files);
      // fs.rename(fields.upload[0], '/tmp/test.png', (err) => {
      //   if (err) throw err;
      //   console.log('renamed complete');
      // });
      // res.writeHead(200, {'content-type': 'text/html'});
      res.write("received image:<br/><img src='/show' />");
      res.end();
      // res.end(util.inspect({fields: fields, files: files}));
  });
}


function show(response){
  fs.readFile('/tmp/test.png','binary',function(error,file){
    console.log(' show--->',arguments);
    
      if(error){
        response.writeHead(500,{"Content-Type":"text/plain"});
        response.write(error+"\n");
        response.end();
      }else{
        //  response.writeHead(200, {"Content-Type": "image/png"});
         response.write(file, "binary");
         response.end();
      }
  })

}

exports.start = start;
exports.upload = upload;
exports.show = show;