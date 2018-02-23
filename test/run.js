// run.js
var fs = require('fs');
var babel = require('babel-core');
var moriscript = require('./index');
// console.warn(' moriscript:',moriscript);

// read the filename from the command line arguments
var fileName = process.argv[2];

console.warn(' fileName:',fileName);
// read the code from this file
fs.readFile(fileName, function(err, data) {
  if(err) throw err;
  // console.warn(' data:',data);

  // convert from a buffer to a string
  var src = data.toString();
  // console.warn(' src:',src);

  // use our plugin to transform the source
  var out = babel.transform(src, {
    plugins: [moriscript]
  });

  // print the generated code to screen
  console.log(out.code);
});