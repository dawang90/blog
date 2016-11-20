module.exports = {
  checkLogin: async function (ctx, next) {
    if (!ctx.session.user) {
      ctx.flash = { 'error': '未登录' }; 
      return ctx.redirect('/signin');
    }
    await next();
  },

  checkNotLogin: async function (ctx, next) {
    if (ctx.session.user) {
      ctx.flash = { 'error': '已登录' }; 
      return ctx.redirect('back');//返回之前的页面
    }
    await next();
  }
};
