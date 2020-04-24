// // var jquery=require('jquery');

// // setTimeout(function(){

// //   console.warn(' jQuery:',jquery)
// //   var docx2html=require('docx2html')

// //   console.warn(' docx2html:',docx2html);
// //   docx2html("/Users/houzhenghua/qingting/qtradion.mini/a.docx").then(function(html){
// //     console.warn('a:',a);
// //     html.toString()
// //   })

// // })
// // import docx4js from "docx4js"
// var docx4js=require('docx4js')
// // console.warn(' docx4js:',docx4js,' load:',docx4js.default.load);
// docx4js.default.load("/Users/houzhenghua/qingting/qtradion.mini/a.docx").then(docx=>{
//   // console.warn(' docx:',docx)
//   let element=docx.render()
// 				console.dir(element)
//   // docx.render(function createElement(type,props,children){
//   //   console.warn(' type:',type,' props：',props,' children:',children)
//   //   return {type,props,children}
//   // })

// });

var path = require('path');
var word2html = require('word2html');
//Word document's absolute path
console.warn(' word2html:',word2html,' __dirname:',__dirname);
var absPath = path.join(__dirname,'absolute.docx');
word2html(absPath)
