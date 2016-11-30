const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser')();
const router = require('koa-router')();
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const session = require('koa-session');
const flash = require('koa-flash');

const index = require('./routes/index');
const users = require('./routes/users');
const register = require('./routes/register');
const login = require('./routes/login');
const logout = require('./routes/logout');
const game = require('./routes/game');

const config = require('./config/dev');

// middlewares
app.use(convert(bodyparser));
app.keys = ['foo'];
app.use(convert(session(app)));
app.use(convert(flash()));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'jade'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/logout', logout.routes(), logout.allowedMethods());
router.use('/game', game.routes(), game.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response


app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

var server = require('http').Server(app.callback()),
    io = require('socket.io')(server);

 var socketGame = require('./socket/game')(io);

server.listen(8080);


module.exports = app;