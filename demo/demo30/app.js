const koa= require('koa');
const app =new koa();


class Router{
    constructor (){
        this._routes = [];
    }
    get(url,handler){
        this._routes.push({
            url,
            method:'GET',
            handler
        });
    }
    routes(){
        return async (ctx,next) =>{
            const {method,url} = ctx;
            const matchedRouter = this._routes.find( r=> r.method === method && r.url ===url);
            if(matchedRouter && matchedRouter.handler){
                 console.warn(' routes() start',+new Date)
                 const aa = await matchedRouter.handler(ctx,next);
                 console.warn(' routes() xxxx!!',+new Date,aa,typeof aa);
                 await next();//需要
            }else{
                await next();
            }
            console.warn(' routes() end',+new Date)
        }
    }
}


const router = new Router();

 // 添加路由
 router.get('/',  (context, next) => {
    context.body = `<h1>index page</h1>`;
    console.warn(' / 添加路由')
})

router.get('/404', async (context, next) => {
    context.body = `<h1>404</h1>`;
    return  new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve('test');
        },5000)
    });
})


app.listen(4000,()=>{
    console.log('server is running at http://localhost:4000');
})

app.use(router.routes())

app.use(function(){
    console.warn(' 第二个中间件',+new Date)
})
