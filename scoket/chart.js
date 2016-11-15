var router = require('koa-router')();

router.get('/socket/chart', async function (ctx, next) {
    ctx.state = {
        title: 'koa2 title'
    };

    await ctx.render('index', {
    });
})
module.exports = router;