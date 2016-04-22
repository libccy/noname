(function(){
    var WebSocketServer=require('ws').Server;
    var wss=new WebSocketServer({port:8080});

    var rooms=[{},{},{},{},{},{}];
    var clients={};
    var messages={
        enter:function(index,nickname,avatar,config,mode){
            this.nickname=nickname;
            this.avatar=avatar;
            var room=rooms[index];
            if(!room){
                index=0;
                room=rooms[0];
            }
            this.room=room;
            if(room.owner){
                if(room.servermode&&!room.owner._onconfig&&config&&mode){
                    room.owner.sendl('createroom',index,config,mode);
                    room.owner._onconfig=this;
                    room.owner.nickname=nickname;
                    room.owner.avatar=avatar;
                }
                else if(!room.config){
                    this.sendl('enterroomfailed');
                }
                else{
                    this.owner=room.owner;
                    this.owner.sendl('onconnection',this.wsid);
                }
                util.updaterooms();
            }
            else{
                room.owner=this;
                this.sendl('createroom',index);
            }
        },
        changeAvatar:function(nickname,avatar){
            this.nickname=nickname;
            this.avatar=avatar;
            util.updaterooms();
        },
        server:function(cfg){
            if(cfg){
                this.servermode=true;
                var room=rooms[cfg[0]];
                if(!room||room.owner){
                    this.sendl('reloadroom',true);
                }
                else{
                    room.owner=this;
                    this.room=room;
                    this.nickname=cfg[1];
                    this.avatar=cfg[2];
                    this.sendl('createroom',cfg[0],{},'auto')
                }
            }
            else{
                for(var i=0;i<rooms.length;i++){
                    if(!rooms[i].owner){
                        rooms[i].owner=this;
                        rooms[i].servermode=true;
                        this.room=rooms[i];
                        this.servermode=true;
                        break;
                    }
                }
                util.updaterooms();
            }
        },
        config:function(config){
            var room=this.room;
            if(room&&room.owner==this){
                if(room.servermode){
                    room.servermode=false;
                    if(this._onconfig){
                        if(clients[this._onconfig.wsid]){
                            this._onconfig.owner=this;
                            this.sendl('onconnection',this._onconfig.wsid);
                        }
                        delete this._onconfig;
                    }
                }
                room.config=config;
            }
            util.updaterooms();
        },
        send:function(id,message){
            if(clients[id]&&clients[id].owner==this){
                try{
                    clients[id].send(message);
                }
                catch(e){
                    clients[id].close();
                }
            }
        },
        close:function(id){
            if(clients[id]&&clients[id].owner==this){
                clients[id].close();
            }
        },
    };
    var util={
        sendl:function(){
            var args=[];
            for(var i=0;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            try{
                this.send(JSON.stringify(args));
            }
            catch(e){
                this.close();
            }
        },
        getid:function(){
            return (Math.floor(1000000000+9000000000*Math.random())).toString();
        },
        getroomlist:function(){
            var roomlist=[];
            for(var i=0;i<rooms.length;i++){
                rooms[i]._num=0;
            }
            for(var i in clients){
                if(clients[i].room&&!clients[i].servermode){
                    clients[i].room._num++;
                }
            }
            for(var i=0;i<rooms.length;i++){
                if(rooms[i].servermode){
                    roomlist[i]='server';
                }
                else if(rooms[i].owner&&rooms[i].config){
                    if(rooms[i]._num==0){
                        rooms[i].owner.sendl('reloadroom');
                    }
                    roomlist[i]=[rooms[i].owner.nickname,rooms[i].owner.avatar,
                    rooms[i].config,rooms[i]._num];
                }
                else{
                    roomlist[i]=null;
                }
                delete rooms[i]._num;
            }
            return roomlist;
        },
        updaterooms:function(){
            var roomlist=util.getroomlist();
            for(var i in clients){
                if(!clients[i].room){
                    clients[i].sendl('updaterooms',roomlist);
                }
            }
        },
    };
    wss.on('connection',function(ws){
        ws.sendl=util.sendl;
        ws.wsid=util.getid();
        clients[ws.wsid]=ws;
        ws.sendl('roomlist',util.getroomlist());
        ws.heartbeat=setInterval(function(){
            if(ws.beat){
                ws.close();
                clearInterval(ws.heartbeat);
            }
            else{
                ws.beat=true;
                try{
                    ws.send('heartbeat');
                }
                catch(e){
                    ws.close();
                }
            }
        },60000);
        ws.on('message',function(message){
            if(!clients[this.wsid]) return;
            if(message=='heartbeat'){
                this.beat=false;
            }
            else if(this.owner){
                this.owner.sendl('onmessage',this.wsid,message);
            }
            else{
                var arr;
                try{
                    arr=JSON.parse(message);
                    if(!Array.isArray(arr)){
                        throw('err');
                    }
                }
                catch(e){
                    this.sendl('denied','banned');
                    return;
                }
                if(arr.shift()=='server'){
                    var type=arr.shift();
                    if(messages[type]){
                        messages[type].apply(this,arr);
                    }
                }
            }
        });
        ws.on('close',function(){
            if(!clients[this.wsid]) return;
            if(this.owner){
                this.owner.sendl('onclose',this.wsid);
            }
            else{
                var room=this.room;
                if(room&&room.owner==this){
                    room.owner=null;
                    room.config=null;
                    room.servermode=false;
                    for(var i in clients){
                        if(clients[i].room==room&&clients[i]!=this){
                            clients[i].close();
                            delete clients[i];
                        }
                    }
                }
            }
            delete clients[this.wsid];
            util.updaterooms();
        });
    });
}());
