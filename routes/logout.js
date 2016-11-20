var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    // 清空 session 中用户信息
    ctx.session.user = null;
    ctx.flash = { 'success': '登出成功' };
    // 登出后跳转到主页
    await ctx.redirect('/');
})

module.exports = router;
