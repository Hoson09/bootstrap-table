const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db1.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// 在此添加自定义的路由
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);

// 给post的请求返回创建时间的属性
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

router.render = (req, res) => {
  res.jsonp({
    msg: 'ok',
    code: 1,
    data: res.locals.data
  });
};

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});