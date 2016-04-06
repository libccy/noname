'use strict';
mode.connect={
    start:function(){
        var createNode=function(){
            if(event.created) return;
            event.created=true;
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

            var connect=function(e){
                clearTimeout(event.timeout);
                e.preventDefault();
                game.saveConfig('last_ip',node.innerHTML);
                game.connect(node.innerHTML);
            };
            node.addEventListener('keydown',function(e){
                if(e.keyCode==13){
                    connect(e);
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

            var button=ui.create.div('.menubutton.highlight.large','连接',connect);
            button.style.width='70px';
            button.style.left='calc(50% - 35px)';
            button.style.top='calc(50% + 60px)';
            ui.window.appendChild(button);
            ui.ipbutton=button;
        }
        if(lib.config.reconnect_info){
            var info=lib.config.reconnect_info;
            game.onlineID=info[1];
            var n=5;
            var connect=function(){
                game.connect(info[0],function(success){
                    if(!success&&n--){
                        createNode();
                        event.timeout=setTimeout(connect,1000);
                    }
                });
            };
            event.timeout=setTimeout(connect,500);
            setTimeout(createNode,2000);
        }
        else{
            createNode();
        }
        _status.connectDenied=createNode;
        for(var i in lib.element.event){
            event.parent[i]=lib.element.event[i];
        }
        event.parent.custom={
            add:{},
            replace:{}
        };
    }
};
