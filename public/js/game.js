(function($){
    var roomData = {
        onlineCount: 0
    };
    var socket = io('http://127.0.0.1:8080/game');
    console.log('加载');
    socket.emit('login', CONFIG.user, function(res){
        console.log('登录');
    });
    socket.on('update', function(res) {
        console.log('更新');
        roomData.onlineCount = res.onlineCount;
        console.log(roomData);
    });
    var roomDataApp = new Vue({
        el: '#room-data',
        data: roomData
    });
})(jQuery);