var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
//db.on('error', console.error.bind(console, 'connection error:'));
var ObjectId = mongoose.Schema.ObjectId;
//用户表
var UserSchema = mongoose.Schema({
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' },
    gold: { type: 'number', default: 0 },
    createDate: { type: 'Date', default: Date.now }
});
exports.User = mongoose.model('User', UserSchema);
//用户背包表
// var UserPackSchema = mongoose.Schema({
//     owner: { type: ObjectId },
//     gold:{ type: 'number' }
// }); 
// exports.Pack = mongoose.model('Pack', UserPackSchema);
