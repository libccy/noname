(function(){
    var WebSocketServer=require('ws').Server;
    var wss=new WebSocketServer({port:8080});

    var rooms=[{},{},{}];
    var clients={};
    var messages={
        enter:function(index,nickname,avatar){
            this.nickname=nickname;
            this.avatar=avatar;
            var room=rooms[index];
            if(!room){
                index=0;
                room=rooms[0];
            }
            this.room=room;
            if(room.owner){
                if(!room.config){
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
                this.sendl('createroom');
            }
        },
        config:function(config){
            var room=this.room;
            if(room&&room.owner==this){
                room.config=config;
            }
            util.updaterooms();
        },
        send:function(id,message){
            if(clients[id]&&clients[id].owner==this){
                clients[id].send(message);
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
            if(this.closed) return;
            var args=[];
            for(var i=0;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            this.send(JSON.stringify(args));
        },
        getid:function(){
            return (Math.floor(1000000000+9000000000*Math.random())).toString();
        },
        getroomlist:function(){
            var roomlist=[];
            for(var i=0;i<3;i++){
                rooms[i]._num=0;
            }
            for(var i in clients){
                if(clients[i].room){
                    clients[i].room._num++;
                }
            }
            for(var i=0;i<3;i++){
                if(rooms[i].owner&&rooms[i].config){
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
            if(ws.closed){
                clearInterval(ws.heartbeat);
            }
            else if(ws.beat){
                ws.close();
                clearInterval(ws.heartbeat);
            }
            else{
                ws.beat=true;
                ws.send('heartbeat');
            }
        },60000);
        ws.on('message',function(message){
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
            this.closed=true;
            if(this.owner){
                this.owner.sendl('onclose',this.wsid);
            }
            else{
                var room=this.room;
                if(room&&room.owner==this){
                    room.owner=null;
                    room.config=null;
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
