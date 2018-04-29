var path = require('path');
//The path.posix property provides access to POSIX specific implementations of the path methods.
console.warn(' path:',path);
console.warn(' path.posix:',path.posix);
console.warn('path === path.posix',path === path.posix) //true
console.warn(' __dirname:',__dirname);//Users/houzhenghua/github/node/demo16