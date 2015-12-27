'use strict';
play.coin={
	init:function(){
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			_status.coin=0;
		}
	},
	arenaReady:function(){
        if(_status.video) return;
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			var str;
			if(lib.config.coin_display_playpackconfig=='text'){
				str='<span>'+lib.config.coin+'</span><span>金</span>'
			}
			else{
				str='<span style="position:absolute">㉤</span><span style="margin-left:18px;font-family:xinwei;line-height:10px">'+lib.config.coin+'</span>';
			}
			ui.coin=ui.create.system(str,null,true);
			// lib.setPopped(ui.coin,function(){
			// 	var uiintro=ui.create.dialog('hidden');
			// 	uiintro.add('商店');
			// 	uiintro.listen(function(e){
			// 		e.stopPropagation();
			// 	});
			// 	uiintro.add('<div class="text center">本局比赛能否获得胜利？</div>');
			// 	uiintro.classList.add('noleave');
			// 	return uiintro;
			// },220,400);
		}
    },
	game:{
		changeCoin:function(num){
			if(typeof num=='number'&&ui.coin){
				game.saveConfig('coin',lib.config.coin+num);
				var str;
				if(lib.config.coin_display_playpackconfig=='text'){
					str='<span>'+lib.config.coin+'</span><span>金</span>'
				}
				else{
					str='<span style="position:absolute">㉤</span><span style="margin-left:18px;font-family:xinwei;line-height:10px">'+lib.config.coin+'</span>';
				}
				ui.coin.innerHTML=str;
			}
		},
	},
	help:{
		'富甲天下':'<ul><li>每完成一次对局，可获得一定数量的金币'+
		'<li>战斗胜利可额外获得20金币，每杀死一个敌人可获得10金币（托管无效）'+
		'<li>使用的武将越强，获得的金币数越少'+
		'<li>执行以下操作时，将扣除金币：<ul><li>作弊：20金币<li>换将卡：10金币<li>'+
		'自由选将：50金币<li>手气卡：10金币<li>换人：20金币</ul>'+
		'<li>金币暂时还没什么用〜'
	}
}
