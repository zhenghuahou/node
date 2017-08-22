 //设置环境变量
 //https://gxnotes.com/article/75643.html
 //http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html
 // NODE_ENV=test xxaa=23  DEBUG=12 debug=true  node demo23/app.js
 /*
 process.env.NODE_ENV:::: test
 process.env.xxaa:: 23
 process.env.debug:: true
 process.env.DEBUG:: 12
 */
 console.log(' process.env::::',process.env);
 console.log(' process.env.NODE_ENV::::',process.env.NODE_ENV);
 console.log(' process.env.xxaa::',process.env.xxaa);
 console.log(' process.env.debug::',process.env.debug);
 console.log(' process.env.DEBUG::',process.env.DEBUG);