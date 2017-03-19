/**
 * Created by wenming on 19/03/2017.
 */
const Koa = require('koa');

const send = require('koa-sendfile');
const staticWare = require('koa-static');
const router = require('koa-router')();
const app = new Koa();

router
  .use(staticWare('dist'))
  .get('/:addr*', async (ctx, next) => {
    await send(ctx, 'dist/index.html')
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);
