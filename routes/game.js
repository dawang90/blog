var router = require('koa-router')();
const checkLogin = require('../middlewares/check').checkLogin;
router.get('/', async function (ctx, next) {
    var room = {
        online: 0,
        user: {},
        data: {}
    }
    ctx.state = {
        title: '随便玩',
        user: ctx.session.user,
        room: room
    };
    await ctx.render('game', {
    });
})
module.exports = router;
