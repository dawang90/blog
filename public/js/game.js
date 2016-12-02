(function($){
    var socket = io('/game');
    var roomData = {
        onlineCount: 0
    };
    var ltRoomData = {
        message: [],
        content: ''
    };
    var playersData = {
        onlineUsers: {}
    };
    socket.on('connect', function(){
        socket.emit('login', CONFIG.user, function(res){
            console.log('登录');
        });
        socket.on('update', function(res) {
            console.log('更新');
            roomData.onlineCount = res.onlineCount;
            playersData.onlineUsers = res.onlineUsers;
            console.log(res);
        });
        socket.on('message', function(res){
            console.log(res);
            ltRoomApp.addTodo(res);
        });
    });

    var roomDataApp = new Vue({
        el: '#room-data',
        data: roomData
    });

    var ltRoomApp = new Vue({
        el: '#lt',
        data: ltRoomData,
        methods: {
            send: function(){
                var app = this;
                socket.emit('message', {message: app.content}, function(res){
                    if(res.status === 200){
                        app.content = '';
                    }
                });
            },
            addTodo: function(res){
                this.message.push(res);
            }
        }
    });

    var playersApp = new Vue({
        el: '#players',
        data: playersData
    });

})(jQuery);