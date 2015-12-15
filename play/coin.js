play.coin={
	init:function(){
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			_status.coin=0;
		}
	},
	arenaReady:function(){
        if(_status.video) return;
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			ui.coin=ui.create.system('<span style="position:absolute">㉤</span><span style="margin-left:18px;font-family:xinwei;line-height:10px">'+lib.config.coin+'</span>',null,true);
		}
    },
	game:{
		changeCoin:function(num){
			if(typeof num=='number'&&ui.coin){
				game.saveConfig('coin',lib.config.coin+num);
				ui.coin.lastChild.innerHTML=lib.config.coin;
			}
		},
	},
	help:{
		'富甲天下':'<ul><li>每完成一次对局，可获得一定数量的金币'+
		'<li>战斗胜利可额外获得20金币，每杀死一个敌人可获得10金币（托管无效）'+
		'<li>使用的武将越强，获得的金币数越少'+
		'<li>每进行一次作弊，扣除20金币'+
		'<li>金币暂时还没什么用〜'
	}
}
