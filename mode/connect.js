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
                if(e) e.preventDefault();
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

            ui.recentIP=ui.create.system('最近连接',null,true);
            var clickLink=function(){
                node.innerHTML=this.innerHTML;
                connect();
            };
            lib.setPopped(ui.recentIP,function(){
                if(!lib.config.recentIP.length) return;
                var uiintro=ui.create.dialog('hidden');
				uiintro.listen(function(e){
					e.stopPropagation();
				});
                var list=ui.create.div('.caption');
                for(var i=0;i<lib.config.recentIP.length;i++){
                    ui.create.div('.text.textlink',list,clickLink).innerHTML=get.trimip(lib.config.recentIP[i]);
                }
                uiintro.add(list);
                var clear=uiintro.add('<div class="text center">清除</div>');
                clear.style.paddingTop=0;
                clear.style.paddingBottom='3px';
                clear.listen(function(){
                    lib.config.recentIP.length=0;
                    game.saveConfig('recentIP',[]);
                    uiintro.delete();
                });
                return uiintro;
            },220);
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
            _status.createNodeTimeout=setTimeout(createNode,2000);
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
