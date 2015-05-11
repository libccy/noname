'use strict';
mode.boss={
	game:{
		reserveDead:true,
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				for(var i in lib.skill){
					if(lib.skill[i].changeSeat){
						lib.skill[i]={};
						if(lib.translate[i+'_info']){
							lib.translate[i+'_info']='此模式下不可用';
						}
					}
				}
				lib.init.css('layout/mode','boss');
				var bosslist=ui.create.div('#bosslist');
				if(!lib.config.touchscreen&&lib.config.mousewheel){
					bosslist._scrollspeed=30;
					bosslist._scrollnum=10;
					bosslist.onmousewheel=ui.click.mousewheel;
				}
				var bosslistlinks={};
				var toggleBoss=function(bool){
					game.saveConfig(this.name,bool,true);
					var node=bosslistlinks[this.name];
					if(bool){
						node.style.display='';
					}
					else{
						node.style.display='none';
					}
				};
				var onpause=function(){
					ui.window.classList.add('bosspaused');
				}
				var onresume=function(){
					ui.window.classList.remove('bosspaused');
				}
				game.onpause=onpause;
				game.onpause2=onpause;
				game.onresume=onresume;
				game.onresume2=onresume;
				ui.create.div(bosslist);

				var list=[];
				for(var i in lib.character){
					var info=lib.character[i];
					if(info[4].contains('boss')){
						var cfg=i+'_bossconfig';
						if(get.config(cfg)==undefined){
							game.saveConfig(cfg,true,true);
						}
						lib.translate[cfg+'_config']=lib.translate[i];
						lib.config.current_mode.push([cfg,get.config(cfg),toggleBoss]);
						var player=ui.create.player(bosslist).init(i);
						list.push(player);
						player.node.hp.classList.add('text');
						player.node.hp.dataset.condition='';
						player.node.hp.innerHTML=info[2];
						player.setIdentity(player.name);
						player.node.identity.dataset.color=info[5];
						bosslistlinks[cfg]=player;

						if(!get.config(cfg)){
							player.style.display='none';
						}
					}
				}
				ui.create.div(bosslist);
				lib.translate.boss_pangtong='涅槃凤雏';
				ui.create.arena();
				var time=(ui.window.offsetWidth-30)/200;
				ui.window.appendChild(ui.control);
				ui.control.classList.add('bosslist');

				ui.window.appendChild(bosslist);
				var interval=setInterval(function(){
					if(list.length){
						list.shift().classList.add('bossshow');
					}
					else{
						clearInterval(interval);
					}
				},500/time);
				setTimeout(function(){
					bosslist.classList.add('scroll');
				},1000);
				setTimeout(function(){
					var control=ui.create.control('快速开始',function(){
						control.hide();
						bosslist.delete();
					});
				},500);
				game.pause();
			}
		}
	},
	character:{
		boss_zhangchunhua:['female','shu',4,[],['fullskin','boss'],'wei'],
		boss_zhenji:['female','shu',4,[],['fullskin','boss'],'wei'],
		boss_liubei:['male','shu',4,[],['fullskin','boss'],'qun'],
		boss_zhugeliang:['male','shu',4,[],['fullskin','boss'],'qun'],
		boss_huangyueying:['female','shu',4,[],['fullskin','boss'],'wei'],
		boss_pangtong:['male','shu',4,[],['fullskin','boss'],'zhu'],
		boss_zhouyu:['male','wu',4,[],['fullskin','boss'],'zhu'],
		boss_lvbu1:['male','qun',8,['mashu','wushuang','baonu'],['fullskin','boss'],'wei'],
		boss_lvbu2:['male','qun',4,['mashu','wushuang','xiuluo','shenwei','shenji'],['fullskin','hiddenboss'],'qun'],
		boss_caiwenji:['female','qun',8,[],['fullskin','boss'],'wei'],
		boss_zhangjiao:['male','qun',8,[],['fullskin','boss'],'shu'],
		boss_zuoci:['male','qun',8,[],['fullskin','boss'],'shu'],
		boss_yuji:['male','qun',8,[],['fullskin','boss'],'nei'],
		boss_diaochan:['male','qun',8,[],['fullskin','boss'],'qun'],
		boss_huatuo:['male','qun',8,[],['fullskin','boss'],'wu'],
		boss_dongzhuo:['male','qun',8,[],['fullskin','boss'],'shu'],
		boss_shuijing:['male','qun',8,[],['fullskin','boss'],'wei'],
	},
	translate:{
		boss_shuijing:'水镜先生',
		boss_huangyueying:'奇智女杰',
		boss_zhangchunhua:'冷血皇后',
		boss_satan:'堕落天使',
		boss_dongzhuo:'乱世魔王',
		boss_lvbu1:'最强神话',
		boss_lvbu2:'暴怒战神',
		boss_zhouyu:'赤壁火神',
		boss_pangtong:'涅盘凤雏',
		boss_zhugeliang:'祭风卧龙',
		boss_zhangjiao:'天公将军',
		boss_zuoci:'迷之仙人',
		boss_yuji:'琅琊道士',
		boss_liubei:'昭烈皇帝',
		boss_caiwenji:'异乡孤女',
		boss_huatuo:'药坛圣手',
		boss_luxun:'蹁跹君子',
		boss_zhenji:'洛水仙子',
		boss_diaochan:'绝代妖姬',
	}
}
