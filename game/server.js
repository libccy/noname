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
                    this.owner.send('connection');
                    this.sendl('enterroom');
                }
                messages.updaterooms();
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
            messages.updaterooms();
        },
        updaterooms:function(){
            var roomlist=util.getroomlist();
            for(var i in clients){
                if(!clients[i].room){
                    clients[i].sendl('updaterooms',roomlist);
                }
            }
        }
    };
    var util={
        sendl:function(){
            this.send(JSON.stringify(Array.from(arguments)));
        },
        getid:function(){
            return (Math.floor(1000000000+9000000000*Math.random())).toString();
        },
        getroomlist:function(){
            var roomlist=[];
            for(var i=0;i<3;i++){
                if(rooms[i].owner&&rooms[i].config){
                    roomlist[i]=[rooms[i].owner.nickname,rooms[i].owner.avatar,rooms[i].config];
                }
                else{
                    roomlist[i]=null;
                }
            }
            return roomlist;
        }
    };
    wss.on('connection',function(ws){
        ws.sendl=util.sendl;
        ws.wsid=util.getid();
        clients[ws.wsid]=ws;
        ws.sendl('roomlist',util.getroomlist());
        ws.on('message',function(message){
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
        });
        ws.on('close',function(){
            if(this.owner){

            }
            else{
                var room=this.room;
                if(room&&room.owner==this){
                    room.owner=null;
                    room.config=null;
                    for(var i in clients){
                        if(clients[i].room==room&&clients[i]!=this){
                            clients[i].close();
                        }
                    }
                }
                delete clients[this.wsid];
            }
            messages.updaterooms();
        });
    });
}());
