var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");
var path = require('path');
var util = require("util");
var url = require("url");
var mime = require("./mime").types;
var config = require("./config");
var zlib = require("zlib")
// console.warn(' zlib:', zlib);
var isSelectFile = false; //是否选择了文件

function parseCookie(request) {
    var Cookies = {};
    request.headers.cookie && request.headers.cookie.split(';').forEach(function (Cookie) {
        var parts = Cookie.split('=');
        Cookies[parts[0].trim()] = (parts[1] || '').trim();
    });
    console.warn('Cookies:', Cookies, ' request.headers.cookie:', request.headers.cookie, typeof request.headers.cookie);
}

function static(response, request, ext) {
    ext = ext.slice(1);
    let {Expires} = config;
    let {maxAge} = Expires;

    // parseCookie(request);
    
    //设置缓存信息
    if (ext.match(Expires.fileMatch)) {
        let expires = new Date();
        expires.setTime(+expires + maxAge * 1000);
        response.setHeader('Set-Cookie', ['test=11', 'language=js']);
        response.setHeader('Expires', expires.toUTCString());
        response.setHeader('Cache-control', "max-age=" + maxAge);
        // console.error(+new Date,request,response,'request.write:',request.write,'response.write:',response.write);
    }

    let realpath = `${__dirname}/static/${request.url}`;
    fs.readFile(realpath, 'utf-8', function (err, data) {
        // console.warn('start里面的readFile函数 err-->data:',arguments);
        if (err) throw err;
        console.error(' setTimeout------------------>')
        // setTimeout(function(){ //css会阻塞html渲染，即使html已经返回了，但是css没有返回，html还是不会渲染（前提是没有缓存过css）
        console.warn(' setTimeout------------------> start')
            fs.stat(realpath, (err, stats) => {
                if (err) throw err;

                let raw = fs.createReadStream(realpath);
                let contentType = mime[ext] || mime.default;
                let lastModified = stats.mtime.toUTCString();
                let {headers} = request;
                let ifModifiedSince = headers["if-modified-since"];
                let {'accept-encoding': acceptEncoding = ''} = headers;
                let matched = ext.match(config.Compress.match);

                console.warn(+new Date, ' lastModified----->', lastModified, 'stat', stats);

                response.setHeader("Last-Modified", lastModified);
                response.setHeader("Content-Type", contentType);

                if (ifModifiedSince && lastModified == ifModifiedSince) {
                    response.writeHead(304, 'Not Modified');
                    response.end();
                    return;
                }

                //对已经压缩的文件一样有显著的效果，在传输时候，文件大小能节省不少
                if (matched && acceptEncoding.match(/\bgzip\b/)) {
                    response.writeHead(200, "Ok", {
                        'Content-Encoding': 'gzip'
                    });
                    raw.pipe(zlib.createGzip()).pipe(response);
                } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                    response.writeHead(200, "Ok", {
                        'Content-Encoding': 'deflate'
                    });
                    raw.pipe(zlib.createDeflate()).pipe(response);
                } else {
                    response.writeHead(200, "Ok");
                    raw.pipe(response);
                }

                // raw.pipe(response,{end:false});
                // raw.on('end', function() {
                //     console.error(' data------->',data);
                //     response.end(data); //171
                // });

                // response.write(data);
                // response.end();
            });

        // },10000);

        console.info(+new Date, '--------------------> response:', response.getHeader("Set-Cookie"));
    });
}

function start(response) {
    fs.readFile(`${__dirname}/static/index.html`, function (err, data) {
        console.warn('start里面的readFile函数 err-->data:', arguments);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
        response.end();
    })
}

function upload(res, req, postData) {
    console.info("upload函数------------->Request handler 'upload' was called. arguments:", arguments);
    var form = new formidable.IncomingForm();
    var files = [];  // 上传的文件
    var fields = []; //区域字段

    // console.error("about to parse",form,form.uploadDir);
    form.on('field', function (field, value) {
        console.warn(+new Date, ' field事件------------->field字段:', field, ' value:', value);
        fields.push([field, value]);
    }).on('file', function (field, file) {
        console.warn(+new Date, ' file事件------------>field字段:', field, ' file:', file);
        files.push([field, file]);
    }).on('end', function () {
        console.warn(+new Date, ' end事件-------->', arguments, ' fields:', fields, ' files:', files);
        renameFileSync(files);
        // renameFile(files);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(createBody(files));
    });

    form.parse(req, function (err, fields, file) {
        console.warn(+new Date, ' form.parse回调函数-------->', arguments, ' fields:', fields, ' file:', file);
    });
}

function renameFileSync(files = []) {
    console.warn(+new Date, '001 renameFile函数 files_---->', files);
    files.forEach(function (file) {
        let key = file[0];
        let name = file[1].name;
        console.log('renameFile函数 key -->', key, ' name:', name, ' file:', file);
        if (!name) {
            console.error(' 你还没有选择上传文件' + name);
            isSelectFile = false;
            return;
        }
        isSelectFile = true;
        // 同步方式读取
        try {
            fs.renameSync(file[1].path, `/tmp/${file[1].name}`);
        } catch (err) {
            throw 'err:' + err;
        }
    });
    console.warn(+new Date, '002 renameFile函数 files_---->', files);
}

let types = ['.jpg', '.png', '.gif'];
function isPic(file = '') {
    let type = file.slice(file.lastIndexOf('.'));
    return types.includes(type);
}

function createBody(files) {
    let body = "";
    //没有选择任何文件
    if (!isSelectFile) {
        return body = '<b>你还未选择任何文件</b>';
    }
    files.forEach(function (file) {
        let _file = file[1].name;
        if (!isPic(_file)) {
            body += `<p>上传的文件为:<b>${_file}</b>,文件大小为:<b style='color:red'>${file[1].size}</b>字节(byte)</p>`;
        } else {
            body += `<p>上传了名称为${_file}的图片:<img style="border:2px dashed #000" src="/show?file=${_file}"/></p>`;
        }
    });
    return body;
}

// function renameFile(files = []){
//     console.warn('  renameFile函数 files_---->',files);
//     files.forEach(function(file){
//         let key = file[0];
//         let name = file[1].name;
//         console.log('renameFile函数 key -->',key,' name:',name);
//         fs.renameSync(file[1].path,`/tmp/${file[1].name}`,function(err){
//             if(err){
//                 throw '我是测试：'+err;
//             }
//             console.log(+new Date,`${file[1].name} renamed complete!`);
//         });
//     });
// }

function show(response, request) {
    let {query} = url.parse(request.url);
    let {file} = querystring.parse(query);
    console.log(+new Date, '001  show 函数---> file:', file);
    if (!isPic(file)) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(`<b>没有选择后缀是${types.join('/')}的图片</b>`);
        return;
    }

    //异步读取整个文件的内容
    fs.readFile(`/tmp/${file}`, function (error, file) {
        console.log(+new Date, ' readFile  回调函数-------->', arguments);
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end(error + "\n");
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.end(file);
        }
    });
    console.log(+new Date, '002   show 函数 end ');
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.static = static;