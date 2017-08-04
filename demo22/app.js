var fs = require('fs')
var path = require('path');
var express = require('express');
var mime = require('./mime');
var app = express();
const defaultSuffix = '.html'
const filterArr = [ 
        'views',
        "readme.md",
        "re.md",
        "config.json",
        "package.json",
        "package-lock.json",
        "node_modules",
        "gulpfile.js"];
//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
// console.log('\n',path.join('test.html'),' \n',path.resolve('test.html'),' \n',path.resolve(),' \n',
// path.dirname('./test.html'));
// test.html
// /Users/admin/github/node/test.html
// /Users/admin/github/node
//  .

console.log(' -----',path.resolve('./views'))
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs');

var filterReg = /^\..+$/;
function getIndex(req,res){
    var dir = fs.readdirSync('./');
    //__dirname:当前js所在目录
    // var projects = dir.filter(item =>{
    //     let temp = item.toLowerCase();
    //     if(filterArr.includes(temp)){
    //         return false;
    //     }
    //     return !temp.match(filterReg);
    // });
    // var aa = res.render
    // console.log('  arg:',arguments,path.resolve('./views/b.ejs'),res.render,app.render,' res.send:',res.send);
    // res.render(path.resolve('./views/b.ejs'), {projects},function(err,str){
    //     str +=`<b class='conftact-info'>联系方式:2430370966@qq.com</b>`;
    //     res.send(str);
    //     // res.end(str)//ok
    // });
    console.error(' dir:',dir);
    renderList(dir,res);
}


function renderList(dir = [],res){
    var {sep} = path;
    var reqPath = res.req.path;
    if(reqPath.slice(-1) === sep){
        console.log(" !!!!!!",reqPath)
        reqPath = reqPath.slice(0,-1);
         console.log(" 222!!!!!!",reqPath)
    }
    window.projects = dir.map(name =>{
        let temp = name.toLowerCase();
        if(filterArr.includes(temp) || temp.match(filterReg)){
            return null;
        }
        console.log(' temp',temp,' name:',name);
        return {name,link:`${reqPath}/${name}`};
    }).filter(item=>{
        return item;
    });
    console.log(59,res,' reqPath:',reqPath)    
    // res.render(path.resolve('./views/b.ejs'), {projects},function(err,str){
    res.render('layout', {projects},function(err,str){
        str +=`<b class='conftact-info'>联系方式:2430370966@qq.com</b>`;
        res.send(str);
        // res.end(str)//ok
    });
}

function readFile(pathname =' ',res){
     fs.readFile(pathname,function(err, file) {
        if (err) {
            let str = '';
            str = err.code ==='ENOENT' ? `${err.path} not found` : err.message
            res.end(str);
        } else {
            let ext = path.extname(pathname).slice(1);
            console.log(' ext:',ext,' mime[ext]:',mime[ext],' mime',mime)
            let contentType = mime[ext] || "text/plain";
            // res.cookie('cart12', -1);//设置cookie
            res.writeHead(200, {"Content-Type": `${contentType}; charset=utf-8`});
            res.end(file);
        }
    });
}
function getFile(req,res){
    var reqPath= req.path; 
    var pathname = req.params[0];
    var ext = path.extname(pathname);
    console.log(' req:',req,' res:',res);
    if(!ext){
        fs.readdir(pathname,function(err,dir){
            renderList(dir,res);
            console.log(+new Date,' arg:',arguments,' ext:',ext);
        });
        console.log(' time:',+new Date)
    }
    pathname = path.resolve(`${pathname}${ ext ?'':defaultSuffix}`);//绝对路径
    ext = ext || defaultSuffix;
    console.log(' pathname:',pathname,' ext:',ext);
    readFile(pathname,res);
    // fs.readFile(pathname,function(err, file) {
    //     if (err) {
    //         let str = '';
    //         str = err.code ==='ENOENT' ? `${err.path} not found` : err.message
    //         res.end(str);
    //     } else {
    //         ext = ext.slice(1);
    //         console.log(' ext:',ext,' mime[ext]:',mime[ext],' mime',mime)
    //         var contentType = mime[ext] || "text/plain";
    //         // res.cookie('cart12', -1);//设置cookie
    //         res.writeHead(200, {"Content-Type": `${contentType}; charset=utf-8`});
    //         res.end(file);
    //     }
    // });
}

app.get('/?', getIndex);
app.get('/(*)?', getFile);

if (!module.parent) {
  app.listen(3001);
  console.log('Express started on port 3000');
}