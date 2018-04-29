var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route,handle);

// import { makeRe } from 'minimatch'
var minimatch = require("minimatch")
var makeRe = require("minimatch").makeRe

var tt = minimatch("/aa/bar.foo", "/**") // true!
// var tt = minimatch("src/index/assets/aa.png", "src/**") // true!


var  h =  makeRe(`${process.cwd()}/src/**`);
console.log(' tt:',tt);
console.info(' h:',h);



const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

var  h =  makeRe(`${process.cwd()}/src/**`);
console.log(' h:',h);

//['images/*.{jpg,png}']

imagemin(['dist/**/*.{jpg,png}'], 'build/images', {
    plugins: [
        imageminMozjpeg(),
        imageminPngquant({quality: '55-60'})
    ]
}).then(files => {
    console.log('files：',files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
});
