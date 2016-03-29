'use strict';
{
    let WebSocketServer=require('ws').Server;
    let wss=new WebSocketServer({port:8080});
    wss.on('connection',function(ws){
        ws.on('message',function(messagestr){
            let message;
            try{
                message=JSON.parse(messagestr);
                if(!Array.isArray(message)||
                    typeof server.message[message[0]]!=='function'){
                    throw('err');
                }
            }
            catch(e){
                console.log('invalid message: '+messagestr);
                return;
            }
            server.message[message.shift()].apply(ws.player,message);
    	});
        ws.on('close',function(){
            if(server.status.gaming){
                ws.player.closed=true;
            }
            else{
                server.players.delete(ws.player.id);
            }
        });
    });
}
