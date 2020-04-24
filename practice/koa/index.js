

var koa = require('koa');
var app = new koa();
app.use(async (ctx,next)=>{
    ctx.body='hello ...!'
})
app.listen(3001,function(){
    console.warn(' listen on 3001')
})
