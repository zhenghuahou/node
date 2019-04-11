const compose = require('koa-compose');
const koa= require('koa');
const app =new koa();
async function middleware1(ctx,next){
    console.log('one start',next);
    debugger;
    // await next();
    console.log('one end');
}


async function middleware2(ctx,next){
    console.log('two start',next);
    debugger;
    await next();
    console.log('two end');
}

const all = compose([middleware1,middleware2]);

app.use(all);


app.listen(3000,()=>{
    console.log('server is running at http://localhost:3000');
})
