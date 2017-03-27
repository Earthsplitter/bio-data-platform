/**
 * Created by wenming on 19/03/2017.
 */
const Koa = require('koa');


const send = require('koa-sendfile');
const staticWare = require('koa-static');
const router = require('koa-router')();
const app = new Koa();
const queryString = require('querystring');
let sql = require('./fetch-data.js')

router
  .get('/data', async (ctx, next) => {
    let request = queryString.parse(ctx.querystring);
    switch (request.type) {
      case 'overview':
        await send(ctx, './src/server/testData.json');
        break;
      case 'detailTabs':
        ctx.body = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE'];
        break;
      case 'detail' :
        switch (request.cat) {
          default:
            await send(ctx, './src/server/testData.json');
            break;
        }
        break;
    }
  })
  .use(staticWare('dist'))
  .get('/:addr*', async (ctx, next) => {
    // process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
    // ./ 在 require() 中使用是跟 __dirname 的效果相同，不会因为启动脚本的目录不一样而改变，在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。
    await send(ctx, './dist/index.html')
  });
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);
