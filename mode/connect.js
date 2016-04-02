'use strict';
mode.connect={
    start:function(){
        'step 0'
        if(lib.config.reconnect_info){
            var info=lib.config.reconnect_info;
            game.onlineID=info[1];
            game.connect(info[0]);
            game.saveConfig('reconnect_info');
            game.pause();
        }
        'step 1'
        delete game.onlineID;
        for(var i in lib.element.event){
            event.parent[i]=lib.element.event[i];
        }
        event.parent.custom={
            add:{},
            replace:{}
        };
        game.connect('localhost');
    }
};
