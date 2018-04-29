var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");
var util = require("util");
// console.dir(formidable);

function start(response) {
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="m-title"><br>'+
    '<input type="file" name="v-upload" value="上传文件" multiple="multiple"><br><br>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(res,req,postData) {
    console.info("upload函数------------->Request handler 'upload' was called. arguments:",arguments);
    var form = new formidable();
    var files = [];  // 上传的文件
    var fields = []; //区域字段
    console.error("about to parse",form,form.uploadDir);
    form.on('field',function(field,value){
        console.warn(+new Date,' field事件------------->field字段:',field,' value:',value,' ag:',arguments);
        fields.push([field, value]);
    }).on('file',function(field,file){
        console.warn(+new Date,' file事件------------>field字段:',field,' file:',file,' ag:', arguments);
        files.push([field, file]);
    }).on('end',function(){
        console.warn(+new Date,' end--->',arguments,' fields:',fields,' files:',files);
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received fields:\n'+util.inspect(fields));
        res.write('\n\n\n\n');
        res.end('received files:\n'+util.inspect(files));
    });

    form.parse(req);
}



exports.start = start;
exports.upload = upload;