'use strict';
play.weather={
    arenaReady:function(){
        if(_status.video) return;
        _status.weather='qing';
        _status.weatherlife=Math.ceil(Math.random()*3);
        _status.weatherchance=parseFloat(lib.config.weather_chance_playpackconfig)||0;
        var chancestr=parseInt(_status.weatherchance*100)+'%';
        for(var i in lib.translate){
            if(i.indexOf('_weather_')==0){
                lib.translate['_'+i]=lib.translate[i];
                lib.translate[i]=lib.translate[i].replace(/&weather&/,chancestr);
            }
        }
        ui.weather=ui.create.system('晴',null,true);
        lib.setPopped(ui.weather,function(){
            var uiintro=ui.create.dialog('hidden');
            var weatherinfo=get.translation('_weather_'+_status.weather+'_info');
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
    },
    skill:{
        _weatherchange:{
            trigger:{player:'phaseAfter'},
            filter:function(){
                return ui.weather?true:false;
            },
            forced:true,
            content:function(){
                if(_status.weather!='qing'&&Math.random()<0.5){
                    _status.weather='qing';
                }
                else{
                    var weathers=['qing','yu','shuang','bao','wu','xue','feng','lei'];
                    if(lib.config.mode!='chess'){
                        weathers.remove('xue');
                    }
                    _status.weather=weathers.randomGet(_status.weather);
                }
                ui.weather.innerHTML=lib.translate['_weather_'+_status.weather];
            }
        }
    },
    translate:{
        _weather_qing:'晴',
        _weather_qing_info:'没有任何事情发生',
        _weather_yu:'雨',
        _weather_yu_info:'在一名角色的回合结束阶段，若场上没有洪水，有&weather&的机率将一张洪水置于其判定区',
        _weather_shuang:'霜',
        _weather_shuang_info:'每当一名角色受到火焰伤害，有&weather&的机率令此伤害-1',
        _weather_wu:'雾',
        _weather_wu_info:'所有角色使用的杀有&weather&的机率失效',
        _weather_bao:'雹',
        _weather_bao_info:'每名角色在回合结束阶段有&weather&的机率受到一点伤害',
        _weather_xue:'雪',
        _weather_xue_info:'每名角色在回合结束阶段有&weather&的机率随机移动1格',
        _weather_feng:'风',
        _weather_feng_info:'当一名角色受到火焰伤害后，有&weather&的机率令距离其1以内的一名其他角色受到一点火焰伤害',
        _weather_lei:'雷',
        _weather_lei_info:'在一名角色的回合结束阶段，若场上没有闪电，有&weather&的机率将一张闪电置于其判定区',
    },
};
