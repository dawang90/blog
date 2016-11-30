(function($, cc){
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


    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["/cocos2d/HelloWorld.png"], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    var sprite = cc.Sprite.create("/cocos2d/HelloWorld.png");
                    sprite.setPosition(size.width / 2, size.height / 2);
                    sprite.setScale(0.8);
                    this.addChild(sprite, 0);

                    var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                    label.setPosition(size.width / 2, size.height / 2);
                    this.addChild(label, 1);
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");

})(jQuery, cc);