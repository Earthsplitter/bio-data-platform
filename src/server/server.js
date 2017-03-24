/**
 * Created by wenming on 19/03/2017.
 */
const Koa = require('koa');


const send = require('koa-sendfile');
const staticWare = require('koa-static');
const router = require('koa-router')();
const app = new Koa();
const queryString = require('querystring');

router
  .get('/data', async (ctx, next) => {
    let request = queryString.parse(ctx.querystring)
    switch (request.type) {
      case 'overview':
        ctx.body = JSON.stringify({
          headers: [
            {
              name: 'Sample',
              sortable: true,
              leadTo: true
            },
            {
              name: 'Chromosome',
              sortable: true
            }, 'Start', 'End', 'Num_Probes', 'CN', 'Name',
            {
              name: 'Segment_Mean',
              sortable: true
            }
          ],
          tableData: [
            ['R001R', 1, 762097, 48825470, 4601, 'NA', 'CA', 0.106721110874087],
            ['R002R', 2, 48850915, 121310748, 3450, 'NA', 'CA', 0.17297640033504],
            ['R003R', 3, 142540165, 150772262, 328, 'NA', 'CA', ''],
            ['R001R', 4, 48850915, 121310748, 3450, 'NA', 'CA', ''], ['R001R', 1, 48850915, 121310748, 3450, 'NA', 'CA', ''], ['R001R', 6, 48850915, 121310748, 3450, 'NA', 'CA', '']
          ]
        })
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

app.listen(3000);
