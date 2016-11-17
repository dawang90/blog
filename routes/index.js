var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'dawangBolg首页',
    user: ctx.session.user
  };
  await ctx.render('index', {
  });
})
module.exports = router;
