module.exports = function(io){
    var onlineUsers = {};
    var onlineCount = 0;
    var game = io.of('/game')
    .on('connection', function(socket){
        //监听新用户加入
        socket.on('login', function(obj, cb){
            //将新加入用户的唯一标示当做socket的名称， 后面退出的时候会用到
            socket.id = obj.id;
            //检查在线列表，如果不在里面就加入
            if(!onlineUsers.hasOwnProperty(obj.id)){
                onlineUsers[obj.id] = obj.name;
                //在线人数+1
                onlineCount++;
            } 
            //登录成功之后执行cb
            cb && cb();
            //通知客户端更新信息
            socket.broadcast.emit('update', {
                onlineCount: onlineCount
            });
            console.log(obj.name + '加入了聊天室');
            
        });
        
    })
    //监听用户退出
    .on('disconnect', function(socket){
        //将退出用户从在线列表中删除
        if(onlineUsers.hasOwnProperty(socket.id)){
            //退出用户的信息
            var obj = { id: socket.id, name: onlineUsers[socket.id] };
            //删除
            delete onlineUsers[socket.id];
            //在线人数-1
            onlineCount--;
            //向所有客户端广播用户退出
            socket.emit('update', {
                onlineCount: onlineCount
            });
            console.log(obj.name + '退出了聊天室');
        }
    });
}