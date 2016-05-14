'use strict';
play.weather={
    arenaReady:function(){
        if(_status.video||_status.connectMode) return;
        _status.weatherchance=parseFloat(lib.config.weather_chance_playpackconfig)||0;

        ui.weather=ui.create.system('',null,true);
        lib.setPopped(ui.weather,function(){
            var uiintro=ui.create.dialog('hidden');
            var weatherinfo=get.translation('_weather_'+_status.weather+'_info');
            var chancestr=parseInt(_status.weatherchance*100)+'%';
            weatherinfo=weatherinfo.replace(/&weather&/,chancestr);
            uiintro.add(get.translation('_weather_'+_status.weather));
            if(weatherinfo.length<=0){
                uiintro.add('<div class="text center">'+weatherinfo+'</div>');
            }
            else{
                uiintro.add('<div class="text center">'+weatherinfo+'</div>');
            }
            uiintro.add(ui.create.div('.placeholder.slim'));
            return uiintro;
        },220);

        game.changeWeather();
    },
    skill:{
        _weatherchange:{
            trigger:{player:'phaseAfter'},
            filter:function(){
                return ui.weather?true:false;
            },
            priority:-1,
            forced:true,
            content:function(){
                _status.weatherlife--;
                if(_status.weatherlife<=0){
                    game.changeWeather();
                }
            }
        },
        _weather_yu:{
            trigger:{player:'phaseAfter'},
            forced:true,
            filter:function(event,player){
                if(_status.weather!='yu') return false;
                if(Math.random()>_status.weatherchance) return false;
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].num('j','hongshui')) return false;
                }
                return true;
            },
            content:function(){
                player.addJudge(game.createCard('hongshui','black'));
                player.popup('雨');
                game.log('暴雨引发了洪水');
            }
        },
        _weather_lei:{
            trigger:{player:'phaseAfter'},
            forced:true,
            filter:function(event,player){
                if(_status.weather!='lei') return false;
                if(Math.random()>_status.weatherchance) return false;
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i].num('j','shandian')) return false;
                }
                return true;
            },
            content:function(){
                player.addJudge(game.createCard('shandian'));
                player.popup('雷');
                game.log('打雷了');
            }
        },
        _weather_shuang:{
            trigger:{player:'damageBegin'},
            forced:true,
            filter:function(event,player){
                if(_status.weather!='shuang') return false;
                if(Math.random()>_status.weatherchance) return false;
                if(event.nature!='fire') return false;
                return true;
            },
            content:function(){
                trigger.num--;
                player.popup('霜');
                game.log('由于温度过低火焰伤害减弱');
            }
        },
        _weather_wu:{
            trigger:{target:'useCardToBefore'},
            forced:true,
            filter:function(event,player){
                if(_status.weather!='wu') return false;
                if(Math.random()>_status.weatherchance) return false;
                if(event.card.name!='sha') return false;
                return true;
            },
            content:function(){
                trigger.untrigger();
                trigger.finish();
                player.popup('雾');
                game.log('大雾使',player,'躲避了杀');
            }
        },
        _weather_bao:{
            trigger:{player:'phaseEnd'},
            forced:true,
            popup:false,
            filter:function(){
                if(_status.weather!='bao') return false;
                if(Math.random()>_status.weatherchance) return false;
                return true;
            },
            content:function(){
                player.damage('nosource');
                player.popup('雹');
                game.log(player,'被冰雹砸中');
            }
        },
        _weather_feng:{
            trigger:{player:'damageEnd'},
            forced:true,
            filter:function(event,player){
                if(_status.weather!='feng') return false;
                if(event.nature!='fire') return false;
                if(Math.random()>_status.weatherchance) return false;
                return true;
            },
            popup:false,
            content:function(){
                'step 0'
                var list=[];
                for(var i=0;i<game.players.length;i++){
                    if(game.players[i]!=player&&get.distance(player,game.players[i])<=1){
                        list.push(game.players[i]);
                    }
                }
                if(list.length){
                    var target=list.randomGet();
                    event.target=target;
                    game.delay();
                }
                else{
                    event.finish();
                }
                'step 1'
                if(event.target){
                    var target=event.target;
                    game.delay();
                    target.damage('fire',trigger.source||'nosource');
                    target.popup('风');
                    game.log('大风使',target,'受到波及');
                }
            }
        },
        _weather_xue:{
            trigger:{player:'phaseAfter'},
            forced:true,
            popup:false,
            filter:function(){
                if(_status.weather!='xue') return false;
                if(Math.random()>_status.weatherchance) return false;
                if(lib.config.mode!='chess') return false;
                return true;
            },
            content:function(){
                var list=[];
                if(player.movable(-1,0)) list.push('moveLeft');
                if(player.movable(1,0)) list.push('moveRight');
                if(player.movable(0,-1)) list.push('moveUp');
                if(player.movable(0,1)) list.push('moveDown');
                if(list.length){
                    player.popup('雪');
                    game.log('由于地滑，',player,'发生移动');
                    player[list.randomGet()]();
                }
            }
        }
    },
    game:{
        changeWeather:function(){
            var life;
            if(_status.weather=='qing'||Math.random()<parseFloat(lib.config.weather_noqing_playpackconfig)){
                var weathers=['yu','shuang','bao','wu','xue','feng','lei'];
                if(lib.config.mode!='chess'){
                    weathers.remove('xue');
                }
                _status.weather=weathers.randomGet();
                life=JSON.parse(lib.config.weather_duration_playpackconfig);
            }
            else{
                _status.weather='qing';
                life=JSON.parse(lib.config.weather_qingduration_playpackconfig);
            }
            _status.weatherlife=life[0]+Math.floor(Math.random()*life[1]);
            ui.weather.innerHTML=lib.translate['_weather_'+_status.weather];
        }
    },
    weatherAnimation:{

    },
    translate:{
        _weather_qing:'晴',
        _weather_qing_info:'没有任何事情发生',
        _weather_yu:'雨',
        _weather_yu_info:'在一名角色的回合结束后，若场上没有洪水，有&weather&的机率将一张洪水置于其判定区',
        _weather_shuang:'霜',
        _weather_shuang_info:'每当一名角色受到火焰伤害，有&weather&的机率令此伤害-1',
        _weather_wu:'雾',
        _weather_wu_info:'所有角色使用的杀有&weather&的机率失效',
        _weather_bao:'雹',
        _weather_bao_info:'每名角色在回合结束后有&weather&的机率受到一点伤害',
        _weather_xue:'雪',
        _weather_xue_info:'每名角色在回合结束后有&weather&的机率随机移动1格',
        _weather_feng:'风',
        _weather_feng_info:'当一名角色受到火焰伤害后，有&weather&的机率令距离其1以内的一名随机角色受到一点火焰伤害',
        _weather_lei:'雷',
        _weather_lei_info:'在一名角色的回合结束后，若场上没有闪电，有&weather&的机率将一张闪电置于其判定区',
    },
    help:{
        '天气变化':'<ul><li>晴<br>没有任何事情发生<li>雨<br>在一名角色的回合结束后，若场上没有洪水，有一定机率将一张洪水置于其判定区'+
        '<li>霜<br>每当一名角色受到火焰伤害，有一定机率令此伤害-1'+
        '<li>雾<br>所有角色使用的杀有一定机率失效'+
        '<li>雹<br>每名角色在回合结束后有一定机率受到一点伤害'+
        '<li>雪<br>（战棋模式）每名角色在回合结束后有一定机率随机移动1格'+
        '<li>风<br>当一名角色受到火焰伤害后，有一定机率令距离其1以内的一名随机角色受到一点火焰伤害'+
        '<li>雷<br>在一名角色的回合结束后，若场上没有闪电，有一定机率将一张闪电置于其判定区'
    }
};
