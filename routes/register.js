const path = require('path');
const sha1 = require('sha1');
const router = require('koa-router')();
const UserModel = require('../models/users');

router.get('/', async function (ctx, next) {
    ctx.state = {
        title: '用户注册'
    };
    console.log(ctx.flash);
    var alert = {
        danger:ctx.flash.error,
        success:ctx.flash.success
    };

    await ctx.render('register', {
        alert:alert
    });
})

router.post('/', async function (ctx, next){
    ctx.body = ctx.request.body;
    var name = ctx.body.name;
    var gender = ctx.body.gender;
    var bio = ctx.body.bio;
    var avatar = ctx.body.avatar;
    var password = ctx.body.password;
    var repassword = ctx.body.repassword;
    console.log('request', ctx.request.body);
    // 校验参数
    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是 m、f 或 x');
        }
        if (!(bio.length >= 1 && bio.length <= 30)) {
            throw new Error('个人简介请限制在 1-30 个字符');
        }
        if (!avatar) {
            throw new Error('缺少头像');
        }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        ctx.flash = {'error': e.message};
        return ctx.redirect('/register');
    }

    // 明文密码加密
    password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };
    // 用户信息写入数据库
    UserModel.create(user)
        .then(function (result) {
            // 此 user 是插入 mongodb 后的值，包含 _id
            user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            ctx.body.session.user = user;
            // 写入 flash
            ctx.flash = {'success': '注册成功'};
            console.log(1111111);
            // 跳转到首页
            return ctx.redirect('/');
        })
        .catch(function (e) {
            // 用户名被占用则跳回注册页，而不是错误页
            if (e.message.match('E11000 duplicate key')) {
                ctx.flash = {'error': '用户名已被占用'};
                return ctx.redirect('/register');
            }
            next(e);
        });
    return ctx.redirect('/');
})

module.exports = router;
