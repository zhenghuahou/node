const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();

var router = new Router();
console.dir(Router);

console.dir(router);

/*
 createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.onerror = context.onerror.bind(context);
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }
*/

router.get(
  '/users/:id',
  function (ctx, next) {
    // console.warn('---->', ctx.res === ctx.request.res ,ctx.response.res === ctx.res)//----> true true
    // console.info('ctx ===ctx.request.ctx:',ctx === ctx.request.ctx);//true
    console.info('[1]:',ctx.app === ctx.request.app ,ctx.app === ctx.response.app);//[1]: true true
    // return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = 'user';
      next();
    // });
  },
  function (ctx,next) {
    console.log('[2]:',ctx.user);
    ctx.body ='<p>123</p>';
    next();
    // => { id: 17, name: "Alex" }
  }
);

// response
// app.use(ctx => {
//     console.warn(' ctx:',ctx);
//     //ctx.request:Object
//     console.warn(' ------>',ctx.request,ctx.request.header,ctx.request.headers,ctx.request.acceptsEncodings);
//     //ctx.req:IncomingMessage
//     console.info(' *******------->',ctx.req.header,ctx.req.headers);
//     //1:true 2:true
//     console.error('1:',ctx.request.header===ctx.request.headers,' 2:',ctx.request.header ===ctx.req.headers)
//   ctx.body = 'Hello Koa';
// });

app.use(router.routes());

    window.router = router;

router
  .param('id', function (id,ctx, next) {
    // ctx.user = users[id];
    // if (!ctx.user) return ctx.status = 400;
    console.warn(' ******',arguments);
    return ctx.body = 'Hello param 华子!id@@@@';
     // return next();
  });

// router.get('huazi', '/users/:id', function (ctx, next) {
//         console.warn('[30] /users-------->',ctx,this);
//     })
  router.get('/users', function (ctx, next) {
    console.warn('[3] /users-------->',ctx);
    ctx.body = 'Hello World!get';
  })
  // .get('/users/:id', function (ctx, next) {
  //   console.warn(' [4]/users/:id-------->',ctx);
  //   ctx.body = `Hello World! id:<b>${ctx.params.id}<b>`;
  // })
  // .post('/users', function (ctx, next) {
  //   ctx.body = 'Hello World! post';
  // })
  // .put('/users/:id', function (ctx, next) {
  //   ctx.body = 'Hello World! put';
  // })
  // .del('/users/:id', function (ctx, next) {
  //   ctx.body = 'Hello World! del';
  // })
  // .all('/users/:id', function (ctx, next) {
  //   console.warn(' ctx(all):',ctx);
  //   ctx.body = 'Hello World! all';
  // });


app.listen(3000);
