const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(11111);
  await next();
  console.log(22222);
});

app.use(async (ctx, next) => {
  console.log(33333);
  await next();
  console.log(44444);
});

app.use(async (ctx, next) => {
  console.log(55555);
  await next();
  console.log(66666);
});
app.listen(3001);
console.log('app started at port 3000...');
