'use strict';
mode.connect={
    start:function(){
        'step 0'
        if(lib.config.reconnect_info){
            var info=lib.config.reconnect_info;
            game.onlineID=info[1];
            game.connect(info[0],game.resume);
            game.saveConfig('reconnect_info');
            game.pause();
        }
        'step 1'
        delete game.onlineID;
        if(lib.config.reconnect_more){
            var n=5;
            var connect=function(){
                game.connect(lib.config.reconnect_more,function(success){
                    if(success){
                        game.saveConfig('reconnect_more');
                    }
                    else if(n--){
                        event.timeout=setTimeout(connect,1000);
                    }
                    else{
                        game.saveConfig('reconnect_more');
                    }
                });
            };
            event.timeout=setTimeout(connect,500);
        }
        'step 2'
        for(var i in lib.element.event){
            event.parent[i]=lib.element.event[i];
        }
        event.parent.custom={
            add:{},
            replace:{}
        };
        var node=ui.create.div('.shadowed');
        node.style.width='400px';
        node.style.height='30px';
        node.style.lineHeight='30px';
        node.style.fontFamily='xinwei';
        node.style.fontSize='30px';
        node.style.padding='10px';
        node.style.left='calc(50% - 200px)';
        node.style.top='calc(50% - 20px)';
        node.style.whiteSpace='nowrap';
        node.innerHTML=lib.config.last_ip||'';
        node.contentEditable=true;
        node.style.webkitUserSelect='text';
        node.style.textAlign='center';
        node.addEventListener('keydown',function(e){
            if(e.keyCode==13){
                clearTimeout(event.timeout);
                e.preventDefault();
                game.saveConfig('last_ip',node.innerHTML);
                game.connect(node.innerHTML);
            }
        });
        ui.window.appendChild(node);
        ui.ipnode=node;

        var text=ui.create.div();
        text.style.width='400px';
        text.style.height='30px';
        text.style.lineHeight='30px';
        text.style.fontFamily='xinwei';
        text.style.fontSize='30px';
        text.style.padding='10px';
        text.style.left='calc(50% - 200px)';
        text.style.top='calc(50% - 80px)';
        text.innerHTML='输入联机地址';
        text.style.textAlign='center';
        ui.window.appendChild(text);
        ui.iptext=text;
        // game.connect('localhost');
    }
};
