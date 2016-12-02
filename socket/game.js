module.exports = function(io){
    var onlineUsers = {};
    var onlineCount = 0;
    var game = io.of('/game')
    .on('connection', function(socket){
        //监听新用户加入
        socket.on('login', function(obj, cb){
            //判断是否是匿名用户
            if(!obj.id){
                //未登录用户id等于socketid
                obj.id = socket.id;
                obj.name = '匿名';
            }
            //将新加入用户的唯一标示当做socket的名称， 后面退出的时候会用到
            socket.name = obj.id;
            //检查在线列表，如果不在里面就加入
            if(!onlineUsers.hasOwnProperty(obj.id)){
                onlineUsers[obj.id] = obj.name;
                //在线人数+1
                onlineCount++;
            } 
            //登录成功之后执行cb
            cb && cb();
            //通知客户端更新信息
            game.emit('update', {
                onlineCount: onlineCount,
                onlineUsers: onlineUsers
            });
            console.log(obj.name + '加入了聊天室');
            
        });
        //监听用户退出
        socket.on('disconnect', function(){
            //将退出用户从在线列表中删除
            console.log(socket.name);
            if(onlineUsers.hasOwnProperty(socket.name)){
                //退出用户的信息
                var obj = { id: socket.name, name: onlineUsers[socket.name] };
                //删除
                delete onlineUsers[socket.name];
                //在线人数-1
                onlineCount--;
                //向所有客户端广播用户退出
                game.emit('update', {
                    onlineCount: onlineCount,
                    onlineUsers: onlineUsers
                });
                console.log(obj.name + '退出了聊天室');
            }
        });

        //监听用户发布聊天内容
        socket.on('message', function(obj, cb){
            //向所有客户端广播发布的消息
            var user = { id: socket.name, name: onlineUsers[socket.name], message: obj.message };
            console.log(obj);
            game.emit('message', user);
            cb && cb({
                message: '发送成功',
                status: 200
            });
            console.log(user.name + ':' + user.message);
        });

    });
};