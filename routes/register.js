var router = require('koa-router')();

router.get('/', async function (ctx, next) {
    ctx.state = {
        title: '用户注册'
    };

    await ctx.render('register', {
    });
})
module.exports = router;
