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

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs');


console.log(' __dirname:',__dirname,path.join(__dirname, '../views'));
console.log(`__dirname+'../views':,__dirname+'../views'`);
app.use(express.static(path.join(__dirname, '../views')));

var filterReg = /^\..+$/;
function getIndex(req,res){
    console.time('readdirSync');
    var dir = fs.readdirSync('./');
    console.log(' dir:',dir);
    console.timeEnd('readdirSync');
    renderList(dir,res);
}

function renderList(dir = [],res){
    var {sep} = path;
    var reqPath = res.req.path;
    if(reqPath.slice(-1) === sep){
        reqPath = reqPath.slice(0,-1);
    }
    let projects = dir.map(name =>{
        let temp = name.toLowerCase();
        if(filterArr.includes(temp) || temp.match(filterReg)){
            return null;
        }
        return {name,link:`${reqPath}/${name}`};
    }).filter(item=>{
        return item;
    });
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
            let contentType = mime[ext] || "text/plain";
            // res.cookie('cart12', -1);//设置cookie
            res.writeHead(200, {"Content-Type": `${contentType}; charset=utf-8`});
            res.end(file);
        }
    });
}
function getFile(req,res){
    var pathname;
    var reqPath= req.path; 
    var srcname = req.params[0];
    var ext = path.extname(srcname);
    pathname = path.resolve(`${srcname}${ ext ?'':defaultSuffix}`);//绝对路径
    //当路径中不包含扩展名的时候
    if(!ext){
         console.time('readdir');
        //先找文件目录，如果文件目录不存在，则找后缀为.html的html文件
        fs.readdir(srcname,function(err,dir){
             console.timeEnd('readdir');
            if(err){
                readFile(pathname,res);
                return;
            }
            renderList(dir,res);
        });
        return;
    }
    //当路径中存在扩展名的时候,直接返回改文件内容
    readFile(pathname,res);
}


console.log(' ./build/mine.js:',path.resolve('./build/test.json'),path.resolve('./mine.js'));
// var content = fs.readFileSync('./build/test.json',{encoding:"utf8"});
var content = fs.readFileSync('./build/test.json');
var jsD = JSON.parse(content);
console.log(' content:::',content,typeof content,' css:',content.css);
console.log(' jsD:::----->11112233445566',jsD,typeof jsD,' css:',jsD.css);


const s = process.stderr;
console.log(' s:',s,s._handle.writeQueueSize);
 s.write('\u001b[?25h');

app.get('/?', getIndex);
app.get('/(*)?', getFile);

if (!module.parent) {
  app.listen(3001);
  console.log('Express started on port 3001');
}


//The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
// console.log('\n',path.join('test.html'),' \n',path.resolve('test.html'),' \n',path.resolve(),' \n',
// path.dirname('./test.html'));
// test.html
// /Users/admin/github/node/test.html
// /Users/admin/github/node
//  .
