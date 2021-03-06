var router = require('koa-router')();
const checkLogin = require('../middlewares/check').checkLogin;
router.get('/', async function (ctx, next) {
    var room = {
        onlineCount: 0,
        user: {},
        data: {}
    };
    ctx.state = {
        title: '随便玩',
        modal: 'game',
        user: ctx.session.user || null,
        room: room
    };
    await ctx.render('game', {
    });
})
module.exports = router;
