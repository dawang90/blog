var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://127.0.0.1:27017/test');

exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});

exports.User.index({ name: 1 }, { unique: true }).exec();