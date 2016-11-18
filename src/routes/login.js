var router = require('koa-router')();
const sha1 = require('sha1');
var UserModal = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, async function (ctx, next) {
    if(ctx.session.user){
        return ctx.redirect('/');
    }
    ctx.state = {
        title: '用户登录'
    };

    await ctx.render('login', {
    });
})

router.post('/', async function (ctx, next) {
    ctx.body = ctx.request.body;
    var name = ctx.body.name;
    var password = ctx.body.password;
    await UserModal.getUserByName(name, function(err, result){
        if(err) return console.error('error:',err);
        var user = result[0];
        if(!user){
            ctx.flash = { error: '用户不存在' };
            return ctx.redirect('back');
        }
        // 检查密码是否匹配
        if(sha1(password) !== user.password){
            ctx.flash = { error: '用户名或密码错误' };
            return ctx.redirect('back');
        }
        ctx.flash = { success: '登录成功' };
        // 用户信息写入 session
        delete user.password;
        ctx.session.user = user;
        //跳转到主页
        ctx.redirect('/');
    });
})

module.exports = router;
