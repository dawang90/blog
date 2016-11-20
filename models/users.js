var User = require('../lib/mongo').User;

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return new User(user);
    },
    // 通过用户获取用户信息
    getUserByName: function getUserByName(name, callback){
        return User.find({name: name}, callback);
    }
};