"use strict";
window.mode={};
window.card={};
window.character={};
window.play={};
(function(){
	var _status={
		paused:false,
		paused2:false,
		over:false,
		clicked:false,
		auto:false,
		event:{
			finished:true,
			next:[],
		},
		ai:{},
		lastdragchange:[]
	};
	var lib={
		configprefix:'noname_0.9_',
		updates:[],
		canvasUpdates:[],
		status:{
			running:false,
			canvas:false,
			time:0,
			delayed:0,
			frameId:0,
		},
		help:{
			'关于':'无名杀 1.2.3<div class="dashedline"></div><ul><li>1L 先谢神上<li>图片等素材来自网(shén)络(shā)<li>bug反馈/建议欢迎来百度无名杀吧',
			'选项帮助':'<ul><li>控制台命令：开启后可用浏览器控制台控制游戏<li>自动确认：开启后当候选目标仅有1个时点击目标无需再点击确定<li>悬停时间：弹出角色/卡牌介绍所需的等待时间<li>'+
			'触屏模式：可消除iOS等设备上300ms的点击延迟，但开启后无法使用鼠标<li>滚轮控制手牌：开启后滚轮可控制手牌的左右滚动，建议Mac等具备横向滚动功能的设备关闭此选项'+
			'<li>隐藏非全身皮肤：在新版布局中，若角色没有全身皮肤将被隐藏<li>游戏玩法：为游戏增加不同玩法，开启后可在帮助中查看介绍'+
			'<li>加强主公：反贼人数多于2时主公会额外增加一个技能（每个主公的额外技能固定，非常备主公增加天命）',
			'游戏操作':'<ul><li>长按/鼠标悬停/右键单击（需在设置中开启）显示信息<li>触屏模式中双指点击切换暂停<li>键盘快捷键<br>'+
			'<table><tr><td>a<td>切换托管<tr><td>c<td>打开设置<tr><td>w<td>切换不询问无懈<tr><td>▭<td>暂停</ul>'
		},
		setPopped:function(node,func,width,height){
			node._poppedfunc=func;
			node._poppedwidth=width;
			node._poppedheight=height;
			node.addEventListener(lib.config.touchscreen?'touchstart':'mouseenter',ui.click.hoverpopped);
		},
		placePoppedDialog:function(dialog,e){
			if(e.touches&&e.touches[0]){
				e=e.touches[0];
			}
			dialog.style.height=Math.min(ui.window.offsetHeight-20,dialog.content.scrollHeight)+'px';
			if(e.clientX<ui.window.offsetWidth/2){
				dialog.style.left=(e.clientX+10)+'px';
			}
			else{
				dialog.style.left=(e.clientX-dialog.offsetWidth-10)+'px';
			}
			var idealtop=e.clientY-dialog.offsetHeight/2;
			if(idealtop<10){
				idealtop=10;
			}
			else if(idealtop+dialog.offsetHeight+10>ui.window.offsetHeight){
				idealtop=ui.window.offsetHeight-10-dialog.offsetHeight;
			}
			dialog.style.top=idealtop+'px';
		},
		setHover:function(node,func,hoveration,width){
			node._hoverfunc=func;
			if(typeof hoveration=='number'){
				node._hoveration=hoveration;
			}
			if(typeof width=='number'){
				node._hoverwidth=width
			}
			node.addEventListener('mouseenter',ui.click.mouseenter);
			node.addEventListener('mouseleave',ui.click.mouseleave);
			node.addEventListener('mousedown',ui.click.mousedown);
			node.addEventListener('mousemove',ui.click.mousemove);
			return node;
		},
		setLongPress:function(node,func){
			node.addEventListener('touchstart',ui.click.longpressdown);
			node.addEventListener('touchend',ui.click.longpresscancel);
			// node.addEventListener('mouseleave',ui.click.longpresscancel);
			node._longpresscallback=func;
			return node;
		},
		updateCanvas:function(time){
			if(lib.canvasUpdates.length===0){
				lib.status.canvas=false;
				return false;
			}
			ui.canvas.width=ui.arena.offsetWidth;
			ui.canvas.height=ui.arena.offsetHeight;
			var ctx=ui.ctx;
			ctx.shadowBlur=5;
			ctx.shadowColor='rgba(0,0,0,0.3)';
			ctx.fillStyle='white';
			ctx.strokeStyle='white';
			ctx.lineWidth=3;
			ctx.save();
			for(var i=0;i<lib.canvasUpdates.length;i++){
				ctx.restore();
				ctx.save();
				var update=lib.canvasUpdates[i];
				if(!update.starttime){
					update.starttime=time;
				}
				if(update(time-update.starttime,ctx)===false){
					lib.canvasUpdates.splice(i--,1);
				}
			}
		},
		run:function(time){
			lib.status.time=time;
			for(var i=0;i<lib.updates.length;i++){
				if(!lib.updates[i].hasOwnProperty('_time')){
					lib.updates[i]._time=time;
				}
				if(lib.updates[i](time-lib.updates[i]._time-lib.status.delayed)===false){
					lib.updates.splice(i--,1);
				}
			}
			if(lib.updates.length){
				lib.status.frameId=requestAnimationFrame(lib.run);
			}
			else{
				lib.status.time=0;
				lib.status.delayed=0;
			}
		},
		init:{
			init:function(){
				lib.config={};
				var config2;
				var config=window.config;
				for(var i in config){
					lib.config[i]=lib.init.eval(config[i]);
				}
				try{
					config2=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
					if(!config2||typeof config2!='object') throw 'err'
				}
				catch(err){
					config2={};
					localStorage.setItem(lib.configprefix+'config',JSON.stringify({}));
				}
				if(config2.mode) lib.config.mode=config2.mode;
				if(lib.config.mode_config[lib.config.mode]==undefined) lib.config.mode_config[lib.config.mode]={};
				for(var i in lib.config.mode_config.global){
					if(lib.config.mode_config[lib.config.mode][i]==undefined){
						lib.config.mode_config[lib.config.mode][i]=lib.config.mode_config.global[i];
					}
				}
				if(lib.config.characters){
					lib.config.defaultcharacters=lib.config.characters.slice(0);
				}
				if(lib.config.cards){
					lib.config.defaultcards=lib.config.cards.slice(0);
				}
				for(var i in config2){

						if(i.indexOf('_mode_config')!=-1&&i.substr(i.indexOf('_mode_config')+13)==lib.config.mode){
							lib.config.mode_config[lib.config.mode][i.substr(0,i.indexOf('_mode_config'))]=config2[i];
						}
						else{
							lib.config[i]=config2[i];
						}


				}
				for(var i in lib.config.translate){
					lib.translate[i]=lib.config.translate[i];
				}
				lib.init.js('mode',lib.config.mode);
				lib.init.js('card',lib.config.all.cards);
				lib.init.js('character',lib.config.all.characters);
				lib.init.js('play',lib.config.plays);
				ui.css={};
				if(lib.config.layoutfixed.indexOf(lib.config.mode)!==-1){
					lib.config.layout='newlayout';
				}
				ui.css.layout=lib.init.css('layout/'+lib.config.layout,'layout');
				if(!lib.config.touchscreen){
					if(lib.config.show_scrollbar) ui.css.scrollbar=lib.init.css('layout/default','scrollbar');
				}
				if(lib.config.fold_card) ui.css.fold=lib.init.css('layout/default','fold');
				if(lib.config.threed_card) ui.css.threed=lib.init.css('layout/default','fold2');
				if(lib.config.blur_ui) ui.css.blur_ui=lib.init.css('layout/default','blur');
				ui.css.theme=lib.init.css('theme/'+lib.config.theme,'style');
			},
			css:function(path,file,before){
				var style = document.createElement("link");
			    style.rel = "stylesheet";
			    style.href = path+'/'+file+".css";
				if(before){
					document.head.insertBefore(style,before);
				}
				else{
					document.head.appendChild(style);
				}
			    return style;
			},
			js:function(path,file){
				if(typeof file=='object'){
					for(var i=0;i<file.length;i++){
						lib.init.js(path,file[i]);
					}
				}
				else{
					var script=document.createElement('script');
					script.src = path+'/'+file+".js";
					document.head.appendChild(script);
				}
			},
			parse:function(func){
				var k,func2;
				var str='(';
				str+=func.toString();
				if(str.indexOf('step 0')==-1){
					str=str.replace(/\{/,'{{if(event.step==1) {event.finish();return;}');
				}
				else{
					for(k=1;k<99;k++){
						if(str.indexOf('step '+k)==-1) break;
						str=str.replace(new RegExp("'step "+k+"'",'g'),"break;case "+k+":");
						str=str.replace(new RegExp('"step '+k+'"','g'),"break;case "+k+":");
					}
					str=str.replace(/'step 0'|"step 0"/,'if(event.step=='+k+') {event.finish();return;}switch(step){case 0:');
				}
				str+='})';
				return str;
			},
			eval:function(func){
				if(typeof func=='function'){
					return eval('('+func.toString()+')');
				}
				else if(typeof func=='object'){
					for(var i in func){
						if(func.hasOwnProperty(i)){
							func[i]=lib.init.eval(func[i]);
						}
					}
				}
				return func;
			},
			encode:function(strUni){
				var strUtf = strUni.replace(
					/[\u0080-\u07ff]/g,function(c){
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f);
				});
				strUtf = strUtf.replace(
					/[\u0800-\uffff]/g,function(c) {
					var cc = c.charCodeAt(0);
					return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f);
				});
				return btoa(strUtf);
			},
			decode:function(str){
				var strUtf=atob(str);
				var strUni = strUtf.replace(
					/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c) {
					var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
					return String.fromCharCode(cc);
				});
				strUni = strUni.replace(
					/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){
					var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
					return String.fromCharCode(cc);
				});
				return strUni;
			}
		},
		translate:{
			'default':"默认",
			heart:"♥︎",
			diamond:"♦︎",
			spade:"♠︎",
			club:"♣︎",
			heart2:"红桃",
			diamond2:"方片",
			spade2:"黑桃",
			club2:"梅花",
			red:'红色',
			black:'黑色',
			ok:"确定",
			cancel:"取消",
			restart:"重新开始",
			setting:"设置",
			start:"开始",
			random:"随机",
			_phasebegin:'回合开始',
			_out:'无效',
			agree:'同意',
			refuse:'拒绝',
			fire:"火",
			thunder:"雷",
			poison:"毒",
			wei:'魏',
			shu:'蜀',
			wu:'吴',
			qun:'群',
			male:'男',
			female:'女',
			mad:'混乱',
			mad_bg:'疯',
			draw_card:'摸牌',
			discard_card:'弃牌',
			reset_character:'重置武将牌',
			recover_hp:'回复体力',
			lose_hp:'流失体力',
			get_damage:'受伤害',
			weiColor:"#b0d0e2",
			shuColor:"#ffddb9",
			wuColor:"#b2d9a9",
			qunColor:"#f6f6f6",
			basic:'基本',
			equip:'装备',
			trick:'锦囊',
			delay:'延迟锦囊',
			character:'角色',
			revive:'复活',
			equip1:'武器',
			equip2:'防具',
			equip3:'防御马',
			equip4:'攻击马',
			equip5:'宝物',
			zero:'零',
			one:'一',
			two:'二',
			three:'三',
			four:'四',
			five:'五',
			six:'六',
			seven:'七',
			eight:'八',
			nine:'九',
			ten:'十',
		},
		element:{
			playerproto:{
				phase:function(){
					"step 0"
					player.phaseJudge();
					"step 1"
					player.phaseDraw();
					game.delay();
					"step 2"
					player.phaseUse();
					"step 3"
					player.phaseDiscard()
					game.delay();
				},
				phaseJudge:function(){
					"step 0"
					if(player.node.judges.childElementCount){
						event.card=player.node.judges.firstChild;
						player.lose(event.card);
						player.$phaseJudge(event.card);
						event.cancelled=false;
						event.trigger('phaseJudge');
					}
					else event.finish();
					"step 1"
					if(!event.cancelled) player.judge(event.card);
					"step 2"
					var name=event.card.viewAs||event.card.name;
					if(event.cancelled&&!event.direct){
						if(lib.card[name].cancel){
							var next=game.createEvent(name+'Cancelled');
							next.content=lib.card[name].cancel;
							next.card=event.card;
							next.player=player;
						}
					}
					else{
						var next=game.createEvent(name);
						next.content=lib.card[name].effect;
						next._result=result;
						next.card=event.card;
						next.player=player;
					}
					ui.clear();
					event.goto(0);
				},
				phaseDraw:function(){
					player.draw(event.num);
				},
				phaseUse:function(){
					"step 0";
					player.chooseToUse();
					"step 1"
					if(result.bool){
						event.goto(0);
					}
				},
				phaseDiscard:function(){
					"step 0"
					event.num=player.num('h')-game.checkMod(player,player.hp,'maxHandcard',player.get('s'));
					if(event.num<=0) event.finish();
					event.trigger('phaseDiscard');
					"step 1"
					player.chooseToDiscard(num,true);
					"step 2"
					event.cards=result.cards;
				},
				chooseToUse:function(){
					"step 0"
					var ok=game.check();
					if(event.isMine()){
						if(!ok||!lib.config.auto_confirm){
							game.pause();
						}
						if(typeof event.prompt=='string'){
							if(!ok) event.dialog=ui.create.dialog(event.prompt);
						}
						else if(event.prompt=='function'){
							if(!ok) event.dialog=ui.create.dialog(event.prompt(event));
						}
						else if(event.prompt==undefined){
							var str;
							if(typeof event.filterCard=='object'){
								str='请使用'+get.cnNumber(event.selectCard[0])+'张'
								if(filter.name){
									str+=get.translation(filter.name);
								}
								else{
									str+='牌';
								}
							}
							else{
								str='请选择要使用的牌';
							}
							if(!ok){
								if(event.openskilldialog){
									event.skillDialog=ui.create.dialog(event.openskilldialog);
									delete event.openskilldialog;
									event.dialog=str;
								}
								else if(typeof event.skillDialog!='string'){
									event.dialog=ui.create.dialog(str);
								}
								else{
									event.dialog=str;
								}
							}
						}
					}
					else{
						if(ok){
							ui.click.ok();
						}
						else if(ai.basic.chooseCard(event.ai1)){
							if(ai.basic.chooseTarget(event.ai2)){
								ui.click.ok();
								_status.event.aiexclude.length=0;
							}
							else{
								if(event.skill){
									var skill=event.skill;
									ui.click.cancel();
									event.aiexclude.add(skill);
								}
								else{
									get.card().aiexclude();
									game.uncheck();
								}
								event.redo();
								game.resume();
							}
						}
						else if(event.skill){
							var skill=event.skill;
							ui.click.cancel();
							event.aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
					}
					"step 1"
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(event.result.bool){
						if(event.result.card||!event.result.skill){
							player.useCard(event.result.card,event.result.cards,event.result.targets,event.result.skill);
						}
						else if(event.result.skill){
							player.useSkill(event.result.skill,event.result.cards,event.result.targets);
						}
					}
					if(event.dialog&&typeof event.dialog=='object') event.dialog.close();
				},
				chooseToRespond:function(){
					"step 0"
					if(event.responded){
						delete event.dialog;
						return;
					}
					if(event.autochoose&&event.autochoose()){
						event.result={bool:false};
					}
					else{
						game.check();
						if(event.isMine()){
							game.pause();
							if(event.dialog) event.dialog=ui.create.dialog(event.dialog);
						}
						else{
							if(ai.basic.chooseCard(event.ai)||forced){
								ui.click.ok();
							}
							else if(event.skill){
								var skill=event.skill;
								ui.click.cancel();
								event.aiexclude.add(skill);
								event.redo();
								game.resume();
							}
							else{
								ui.click.cancel();
							}
						}
					}
					"step 1"
					if(event.result.bool){
						player.respond(event.result.cards,event.result.card,event.animate,event.result.skill,event.source);
					}
					if(event.dialog&&event.dialog.close) event.dialog.close();
				},
				chooseToDiscard:function(){
					"step 0"
					if(event.autochoose()){
						event.result={
							bool:true,
							cards:player.get(event.position||'h')
						}
					}
					else{
						var range=get.select(event.selectCard);
						game.check();
						if(event.isMine()){
							game.pause();
							if(range[1]>1){
								event.promptdiscard=ui.create.control('提示',function(){
									ai.basic.chooseCard(event.ai);
									if(_status.event.custom.add.card){
										_status.event.custom.add.card();
									}
								});
							}
							if(event.prompt!=false){
								var str;
								if(typeof(event.prompt)=='string') str=event.prompt;
								else{
									str='请弃置';
									if(range[0]==range[1]) str+=get.cnNumber(range[0]);
									else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
									else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
									str+='张';
									if(event.position=='h'||event.position==undefined) str+='手';
									if(event.position=='e') str+='装备';
									str+='牌';
								}
								event.dialog=ui.create.dialog(str);
								event.dialog.add('0/'+event.selectCard[1]);
								event.custom.add.card=function(){
									_status.event.dialog.content.childNodes[1].innerHTML=
									ui.selected.cards.length+'/'+_status.event.selectCard[1];
								}
							}
							else if(get.itemtype(event.dialog)=='dialog'){
								event.dialog.style.display='';
								event.dialog.open();
							}
						}
						else{
							if(ai.basic.chooseCard(event.ai)||forced){
								ui.click.ok();
							}
							else if(event.skill){
								var skill=event.skill;
								ui.click.cancel();
								event.aiexclude.add(skill);
								event.redo();
								game.resume();
							}
							else{
								ui.click.cancel();
							}
						}
					}
					"step 1"
					if(event.promptdiscard){
						event.promptdiscard.close();
					}
					player.discard(event.result.cards);
					if(event.dialog) event.dialog.close();
				},
				chooseToCompare:function(){
					"step 0"
					if(player.num('h')==0||target.num('h')==0){
						event.result={cancelled:true,bool:false}
						event.finish();
						return;
					}
					game.log(get.translation(player)+'对'+get.translation(target)+'发起拼点');
					player.chooseCard('请选择拼点牌',true).ai=event.ai;
					"step 1"
					event.card1=result.cards[0];
					target.chooseCard('请选择拼点牌',true).ai=event.ai;
					"step 2"
					event.card2=result.cards[0];
					player.lose(event.card1);
					target.lose(event.card2);
					"step 3"
					player.$compare(event.card1,target,event.card2);
					// player.$throw(event.card1);
					// target.$throw(event.card2);
					game.log(get.translation(player)+'的拼点牌为'+get.translation(event.card1));
					game.log(get.translation(target)+'的拼点牌为'+get.translation(event.card2));
					event.result={
						player:event.card1,
						target:event.card2,
					}
					if(get.number(event.card1)>get.number(event.card2)){
						event.result.bool=true;

						setTimeout(function(){
							event.dialog=ui.create.dialog(get.translation(player.name)+'拼点成功');
							event.dialog.classList.add('center');
							player.popup('胜');
							target.popup('负');
							game.resume();
						},1500);
					}
					else{
						event.result.bool=false;
						if(get.number(event.card1)>get.number(event.card2)){
							event.result.tie=true;
							setTimeout(function(){
								event.dialog=ui.create.dialog(get.translation(player.name)+'拼点失败');
								event.dialog.classList.add('center');
								player.popup('平');
								target.popup('平');
								game.resume();
							},1500);
						}
						else{
							setTimeout(function(){
								event.dialog=ui.create.dialog(get.translation(player.name)+'拼点失败');
								event.dialog.classList.add('center');
								player.popup('负');
								target.popup('胜');
								game.resume();
							},1500);
						}
					}
					game.pause();
					"step 4"
					game.delay(2);
					"step 5"
					if(typeof event.target.ai.shown=='number'&&event.target.ai.shown<=0.85){
						event.target.ai.shown+=0.1;
					}
					if(event.clear!==false) ui.clear();
					event.dialog.close();
				},
				chooseButton:function(){
					"step 0"
					if(event.dialog==undefined) event.dialog=ui.dialog;
					if(event.isMine()){
						event.dialog.style.display='';
						event.dialog.open();
					}
					game.check();
					if(event.isMine()){
						game.pause();
					}
					else{
						if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
						else ui.click.cancel();
					}
					"step 1"
					if(event.closeDialog){
						event.dialog.close();
					}
				},
				chooseCard:function(){
					"step 0"
					game.check();
					if(event.isMine()){
						game.pause();
						if(event.prompt!=false){
							var str;
							if(typeof event.prompt=='string') str=event.prompt;
							else{
								str='请选择'
								var range=get.select(event.selectCard);
								if(range[0]==range[1]) str+=get.cnNumber(range[0]);
								else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
								else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
								str+='张';
								if(event.position=='h'||event.position==undefined) str+='手';
								if(event.position=='e') str+='装备';
								str+='牌';
							}
							event.dialog=ui.create.dialog(str);
							event.dialog.add('0/'+event.selectCard[1]);
							event.custom.add.card=function(){
								_status.event.dialog.content.childNodes[1].innerHTML=
								ui.selected.cards.length+'/'+_status.event.selectCard[1];
							}
						}
					}
					else{
						if(ai.basic.chooseCard(event.ai)||forced){
							ui.click.ok();
						}
						else if(event.skill){
							var skill=event.skill;
							ui.click.cancel();
							event.aiexclude.add(skill);
							event.redo();
							game.resume();
						}
						else{
							ui.click.cancel();
						}
					}
					"step 1"
					if(event.dialog) event.dialog.close();
				},
				chooseTarget:function(){
					"step 0"
					game.check();
					if(event.isMine()){
						game.pause();
						if(event.prompt!=false){
							var str;
							if(typeof event.prompt=='string') str=event.prompt;
							else{
								str='请选择'
								var range=get.select(event.selectTarget);
								if(range[0]==range[1]) str+=get.cnNumber(range[0]);
								else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
								else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
								str+='个目标';
							}
							event.dialog=ui.create.dialog(str);
							event.dialog.add('0/'+event.selectTarget[1]);
							event.custom.add.target=function(){
								_status.event.dialog.content.childNodes[1].innerHTML=
								ui.selected.targets.length+'/'+_status.event.selectTarget[1];
							}
						}
						else if(get.itemtype(event.dialog)=='dialog'){
							event.dialog.open();
						}
					}
					else{
						if(ai.basic.chooseTarget(event.ai)||forced){
							ui.click.ok();
						}
						else{
							ui.click.cancel();
						}
					}
					"step 1"
					if(event.result.bool){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseCardTarget:function(){
					"step 0"
					game.check();
					if(event.isMine()){
						game.pause();
						if(event.prompt!=false){
							event.dialog=ui.create.dialog(event.prompt||'请选择卡牌和目标');
						}
					}
					else{
						if(ai.basic.chooseCard(event.ai1)){
							if(ai.basic.chooseTarget(event.ai2)){
								ui.click.ok();
								_status.event.aiexclude.length=0;
							}
							else{
								get.card().aiexclude();
								game.uncheck();
								event.redo();
								game.resume();
							}
						}
						else{
							ui.click.cancel();
						}
					}
					"step 1"
					if(event.result.bool){
						for(var i=0;i<event.result.targets.length;i++){
							event.result.targets[i].animate('target');
						}
					}
					if(event.dialog) event.dialog.close();
				},
				chooseControl:function(){
					"step 0"
					if(event.controls.length==0){
						event.finish();
						return;
					}
					if(event.isMine()){
						event.controlbar=ui.create.control(event.controls);
						if(event.dialog){
							event.dialog.open();
						}
						else if(event.prompt){
							event.dialog=ui.create.dialog(event.prompt);
						}
						game.pause();
						_status.imchoosing=true;
					}
					else{
						event.result={};
						if(event.ai){
							var result=event.ai(event.parent,player);
							if(typeof result=='number') event.result.control=event.controls[result];
							else event.result.control=result;
						}
						else event.result.control=event.controls[event.choice];
					}
					"step 1"
					_status.imchoosing=false;
					if(event.dialog) event.dialog.close();
					if(event.controlbar) event.controlbar.close();
				},
				chooseBool:function(){
					"step 0"
					if(event.isMine()){
						ui.create.confirm('oc');
						if(event.prompt){
							event.dialog=ui.create.dialog(event.prompt);
						}
						_status.imchoosing=true;
						game.pause();
					}
					else{
						if(event.ai){
							event.choice=event.ai(event.parent,player);
						}
						event.result={bool:event.choice};
					}
					"step 1"
					_status.imchoosing=false;
					if(event.dialog) event.dialog.close();
				},
				choosePlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					else{
						event.dialog.add('选择'+get.translation(target)+'的一张牌');
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					if(event.isMine()){
						event.dialog.open();
					}
					game.check();
					if(event.isMine()){
						game.pause();
					}
					else{
						if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
						else ui.click.cancel();
					}
					"step 1"
					event.dialog.close();
				},
				discardPlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='弃置'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.finish();
						return;
					}
					if(event.isMine()){
						event.dialog.open();
					}
					game.check();
					if(event.isMine()){
						game.pause();
					}
					else{
						if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
						else ui.click.cancel();
					}
					"step 1"
					event.dialog.close();
					"step 2"
					if(event.result.bool&&event.result.buttons){
						var cards=[];
						for(var i=0;i<event.result.buttons.length;i++){
							cards.push(event.result.buttons[i].link);
						}
						target.discard(cards);
					}
				},
				gainPlayerCard:function(){
					"step 0"
					if(!event.dialog) event.dialog=ui.create.dialog('hidden');
					else if(!event.isMine){
						event.dialog.style.display='none';
					}
					if(event.prompt==undefined){
						var str='获得'+get.translation(target);
						var range=get.select(event.selectButton);
						if(range[0]==range[1]) str+=get.cnNumber(range[0]);
						else if(range[1]==Infinity) str+='至少'+get.cnNumber(range[0]);
						else str+=get.cnNumber(range[0])+'至'+get.cnNumber(range[1]);
						str+='张';
						if(event.position=='h'||event.position==undefined) str+='手';
						if(event.position=='e') str+='装备';
						str+='牌';
						event.prompt=str;
					}
					if(event.prompt){
						event.dialog.add(event.prompt);
					}
					for(var i=0;i<event.position.length;i++){
						if(event.position[i]=='h'&&target.num('h')){
							event.dialog.add('手牌');
							var hs=target.get('h');
							hs.randomSort();
							if(event.visible){
								event.dialog.add(hs);
							}
							else{
								event.dialog.add([hs,'blank']);
							}
						}
						else if(event.position[i]=='e'&&target.num('e')){
							event.dialog.add('装备牌');
							event.dialog.add(target.get('e'));
						}
						else if(event.position[i]=='j'&&target.num('j')){
							event.dialog.add('判定牌');
							event.dialog.add(target.get('j'));
						}
					}
					if(event.dialog.buttons.length==0){
						event.dialog.close();
						event.finish();
						return;
					}
					if(event.isMine()){
						event.dialog.open();
					}
					game.check();
					if(event.isMine()){
						game.pause();
					}
					else{
						if(ai.basic.chooseButton(event.ai)||forced) ui.click.ok();
						else ui.click.cancel();
					}
					"step 1"
					event.dialog.close();
					"step 2"
					var cards=[];
					for(var i=0;i<event.result.buttons.length;i++){
						cards.push(event.result.buttons[i].link);
					}
					target.lose(cards);
					event.cards=cards;
					var hs=[],oths=[];
					for(var i=0;i<cards.length;i++){
						if(get.position(cards[i])=='h'){
							hs.push(cards[i]);
						}
						else{
							oths.push(cards[i]);
						}
					}
					if(hs.length){
						target.$give(hs.length,player);
					}
					if(oths.length){
						target.$give(oths,player);
					}
					"step 3"
					if(player==game.me){
						game.delay(2);
					}
					else{
						game.delay();
					}
					player.gain(event.cards);
				},
				showHandcards:function(){
					"step 0"
					if(player.num('h')==0){
						event.finish();
						return;
					}
					var cards=player.get('h');
					event.dialog=ui.create.dialog(get.translation(player.name)+'的手牌',cards);
					game.log(get.translation(player)+'展示了'+get.translation(cards));
					game.delay(2);
					"step 1"
					event.dialog.close();
				},
				showCards:function(){
					"step 0"
					if(get.itemtype(cards)!='cards'){
						event.finish();
						return;
					}
					event.dialog=ui.create.dialog(get.translation(player.name)+'展示的牌',cards);
					var str=get.translation(player)+'展示了'+get.translation(cards[0]);
					for(var i=1;i<cards.length;i++){
						str+='、'+get.translation(cards[i]);
					}
					game.log(str);
					game.delay(2);
					"step 1"
					event.dialog.close();
				},
				viewHandcards:function(){
					"step 0"
					if(player==game.me&&target){
						event.dialog=ui.create.dialog(get.translation(target.name)+'的手牌',target.get('h'));
						if(event.isMine()){
							game.pause();
							_status.imchoosing=true;
							ui.create.confirm('o');
						}
						else{
							event.finish();
							setTimeout(function(){
								event.dialog.close();
							},2*lib.config.duration);
							game.delay(2);
						}
					}
					else{
						event.finish();
					}
					"step 1"
					_status.imchoosing=false;
					event.dialog.close();
				},
				useCard:function(){
					"step 0"
					player.lose(cards);
					if(event.skill){
						player.logSkill(event.skill);
						player.popup(event.card.name);
					}
					if(lib.config.background_audio){
						var sex=player.sex=='female'?'female':'male';
						if(lib.card[card.name].audio||lib.config.background_ogg){
							if(card.name=='sha'&&(card.nature=='fire'||card.nature=='thunder')){
								game.playAudio('card',sex,card.name+'_'+card.nature);
							}
							else{
								game.playAudio('card',sex,card.name);
							}
						}
						else{
							game.playAudio('card/default');
						}
					}
					if(event.animate!=false){
						if(card.name=='wuxie'&&event.parent.source){
							player.line(event.parent.source2||event.parent.source,'green');
						}
						else{
							var config={};
							if(card.nature=='fire'||
								(card.classList&&card.classList.contains('fire'))){
								config.color='fire';
							}
							else if(card.nature=='thunder'||
								(card.classList&&card.classList.contains('thunder'))){
								config.color='thunder';
							}
							if(get.info(card).multitarget&&targets.length>1&&!get.info(card).multiline){
								player.line2(targets,config);
							}
							else{
								player.line(targets,config);
							}
						}
						player.$throw(cards);
					}
					event.trigger('useCard');
					if(get.type(card)!='equip'){
						var str=get.translation(player);
						if(targets.length){
							str+='对'+(targets[0]==player?'自己':get.translation(targets[0]));
							for(var i=1;i<targets.length;i++){
								str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
							}
						}
						str+='使用了'+get.translation(card);
						if(cards.length&&(cards.length>1||cards[0]!=card)){
							str+='（'+get.translation(cards)+'）';
						}
						game.log(str);
					}
					if(event.addCount!=false){
						if(player.stat[player.stat.length-1].card[card.name]==undefined){
							player.stat[player.stat.length-1].card[card.name]=1;
						}
						else{
							player.stat[player.stat.length-1].card[card.name]++;
						}
						if(event.skill){
							if(player.stat[player.stat.length-1].skill[event.skill]==undefined){
								player.stat[player.stat.length-1].skill[event.skill]=1;
							}
							else{
								player.stat[player.stat.length-1].skill[event.skill]++;
							}
						}
					}
					"step 1"
					if(get.info(card).contentBefore){
						var next=game.createEvent(card.name+'ContentBefore');
						next.content=get.info(card).contentBefore;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
					}
					"step 2"
					if(targets[num]&&targets[num].isDead()) return;
					if(targets[num]&&targets[num].isOut()) return;
					if(targets[num]&&targets[num].removed) return;
					var info=get.info(card);
					if(targets.length==0&&!info.notarget) return;
					var next=game.createEvent(card.name);
					next.content=info.content;
					next.targets=targets;
					next.card=card;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.type='card';
					next.skill=event.skill;
					next.multitarget=info.multitarget;
					if(num==0&&next.targets.length>1){
						if(!info.multitarget){
							lib.tempSortSeat=player;
							targets.sort(lib.sort.seat);
							delete lib.tempSortSeat;
							for(var i=0;i<targets.length;i++){
								targets[i].animate('target');
							}
						}
						else{
							for(var i=0;i<targets.length;i++){
								targets[i].animate('target');
							}
						}
					}
					next.target=targets[num];
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(event.animate!=false||num>0){
						if(num==0)game.delay();
						else game.delay(0.5);
					}
					"step 3"
					if(!get.info(event.card).multitarget&&num<targets.length-1){
						event.num++;
						event.goto(2);
					}
					"step 4"
					if(get.info(card).contentAfter){
						var next=game.createEvent(card.name+'contentAfter');
						next.content=get.info(card).contentAfter;
						next.targets=targets;
						next.card=card;
						next.cards=cards;
						next.player=player;
					}
					"step 5"
					if(document.getElementsByClassName('thrown').length){
						game.delay();
					}
					else{
						event.finish();
					}
					"step 6"
					ui.clear();
				},
				useSkill:function(){
					"step 0"
					var info=get.info(event.skill);
					event._skill=event.skill;
					if(lib.config.background_speak&&!lib.skill.global.contains(event.skill)){
						if(info.audio){
							game.playAudio('skill',event.skill,Math.ceil(info.audio*Math.random()));
						}
						else if(lib.config.background_ogg){
							game.playAudio('skill',event.skill);
						}
						else{
							game.playAudio('skill','default',
							player.sex=='female'?'female':'male',Math.ceil(Math.random()*5));
						}
					}
					if(player.checkShow){
						player.checkShow(event.skill);
					}
					if(info.discard!=false&&info.lose!=false&&!info.viewAs){
						player.discard(cards).delay=false;
					}
					else{
						if(info.lose!=false){
							player.lose(cards,ui.special);
						}
						if(info.prepare){
							info.prepare(cards,player,targets);
						}
						else if(info.viewAs){
							player.$throw(cards);
						}
					}
					if((info.line||info.discard!=false)&&targets.length){
						var config={};
						if(info.line=='fire'){
							config.color='fire';
						}
						else if(info.line=='thunder'){
							config.color='thunder';
						}
						if(info.multitarget&&!info.multiline&&targets.length>1){
							player.line2(targets,config);
						}
						else{
							player.line(targets,config);
						}
					}
					var str=get.translation(player);
					if(targets&&targets.length){
						str+='对'+(targets[0]==player?'自己':get.translation(targets[0]));
						for(var i=1;i<targets.length;i++){
							str+='、'+(targets[i]==player?'自己':get.translation(targets[i]));
						}
					}
					str+='发动了'+get.translation(skill);
					if(!info.direct){
						game.log(str);
						player.popup(skill);
					}
					if(event.addCount!=false){
						if(player.stat[player.stat.length-1].skill[skill]==undefined){
							player.stat[player.stat.length-1].skill[skill]=1;
						}
						else{
							player.stat[player.stat.length-1].skill[skill]++;
						}
					}
					"step 1"
					if(!event.skill){
						console.log('error: no skill',get.translation(event.player),event.player.get('s'));
						if(event._skill){
							event.skill=event._skill;
							console.log(event._skill);
						}
						else{
							event.finish();
							return;
						}
					}
					var info=get.info(event.skill);
					if(targets[num]&&targets[num].isDead()||
						targets[num]&&targets[num].isOut()||
						targets[num]&&targets[num].removed){
						if(!info.multitarget&&num<targets.length-1){
							event.num++;
							event.redo();
						}
						return;
					}
					var next=game.createEvent(event.skill);
					next.content=info.content;
					next.targets=targets;
					next.cards=cards;
					next.player=player;
					next.num=num;
					next.multitarget=info.multitarget;
					if(num==0&&next.targets.length>1){
						if(!info.multitarget){
							lib.tempSortSeat=player;
							targets.sort(lib.sort.seat);
							delete lib.tempSortSeat;
						}
						for(var i=0;i<targets.length;i++){
							targets[i].animate('target');
						}
					}
					next.target=targets[num];
					if(next.target&&!info.multitarget){
						if(num==0&&targets.length>1){
							// var ttt=next.target;
							// setTimeout(function(){ttt.animate('target');},0.5*lib.config.duration);
						}
						else{
							next.target.animate('target');
						}
					}
					if(num==0){
						if(typeof info.delay=='number') game.delay(info.delay);
						else if(info.delay!==false&&info.delay!==0) game.delay();
					}
					else game.delay(0.5);
					if(!info.multitarget&&num<targets.length-1){
						event.num++;
						event.redo();
					}
					"step 2"
					if(document.getElementsByClassName('thrown').length){
						if(event.skill&&get.info(event.skill).delay!==0) game.delay();
					}
					else{
						event.finish();
					}
					"step 3"
					ui.clear();
				},
				draw:function(){
					if(lib.config.background_audio){
						game.playAudio('effect','draw');
					}
					if(event.log!=false){
						game.log(get.translation(player)+'摸了'+get.cnNumber(num)+'张牌');
					}
					var cards=get.cards(num);
					if(event.animate!=false){
						player.gain(cards,'draw');
					}
					else{
						player.gain(cards);
					}
					event.result=cards;
				},
				discard:function(){
					"step 0"
					if(lib.config.background_audio){
						game.playAudio('effect','discard');
					}
					var str=get.translation(player)+'弃置了';
					str+=get.translation(cards[0]);
					for(var i=1;i<cards.length;i++){
						str+='、'+get.translation(cards[i]);
					}
					game.log(str);
					player.lose(cards);
					if(event.animate!=false) player.$throw(cards,1000);
					event.trigger('discard');
					"step 1"
					if(event.delay!=false) game.delay();
				},
				respond:function(){
					if(event.skill){
						player.logSkill(event.skill);
						if(player.checkShow){
							player.checkShow(event.skill);
						}
					}
					if(event.parent.parent.parent.name=='useCard'){
						if(lib.config.background_audio){
							var sex=player.sex=='female'?'female':'male';
							if(lib.card[card.name].audio||lib.config.background_ogg){
								game.playAudio('card',sex,card.name);
							}
							else{
								game.playAudio('card/default');
							}
						}
					}
					var str=get.translation(player)+'打出了';
					str+=get.translation(card);
					if(cards.length&&(cards.length>1||cards[0].name!=card.name)){
						str+='（'+get.translation(cards)+'）';
					}
					game.log(str);
					for(var i=0;i<cards.length;i++){
						player.lose(cards[i]);
						if(event.animate!=false) player.$throw(cards[i]);
						var name='';
						if(event.skill) name=get.translation(event.skill)+'：';
						if(event.card) name+=get.translation(event.card.name);
					}
					event.trigger('respond');
					game.delay(0.5);
				},
				gain:function(){
					"step 0"
					if(cards){
						event.source=get.owner(cards[0]);
						if(event.source){
							event.source.lose(cards,ui.special);
						}
					}
					else{
						event.finish();
					}
					"step 1"
					if(event.source) game.delay();
					"step 2"
					if(player.getStat().gain==undefined){
						player.getStat().gain=cards.length;
					}
					else{
						player.getStat().gain+=cards.length;
					}
					"step 3"
					var j,sort,position;
					var frag1=document.createDocumentFragment();
					var frag2=document.createDocumentFragment();
					for(var num=0;num<cards.length;num++){
						sort=lib.config.sort_card(cards[num]);
						if(lib.config.reverse_sort) sort=-sort;
						cards[num].fix();
						cards[num].animate('start');

						if(game.singleHandcard||sort>0) frag1.appendChild(cards[num]);
						else frag2.appendChild(cards[num]);
					}
					if(event.animate=='draw'){
						player.$draw(cards.length);
						game.delay(1,500);
						setTimeout(function(){
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
						},500);
					}
					else if(event.animate=='gain'){
						player.$gain(cards);
						game.delay(1,700);
						setTimeout(function(){
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
						},700);
					}
					else if(event.animate=='gain2'||event.animate=='draw2'){
						player.$gain2(cards);
						game.delay(1,500);
						setTimeout(function(){
							player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
							player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
							player.update();
						},500);
					}
					else{
						player.node.handcards1.insertBefore(frag1,player.node.handcards1.firstChild);
						player.node.handcards2.insertBefore(frag2,player.node.handcards2.firstChild);
						player.update();
					}
				},
				lose:function(){
					"step 0"
					for(var i=0;i<cards.length;i++){
						if(cards[i].parentNode){
							if(cards[i].parentNode.classList.contains('equips')){
								cards[i].original='e';
							}
							else if(cards[i].parentNode.classList.contains('judges')){
								cards[i].original='j';
							}
							else{
								cards[i].original='h';
							}
						}
						if(event.position){
							cards[i].goto(event.position);
						}
						else{
							cards[i].delete();
						}
					}
					player.update();
					for(var i=player.node.handcards1.childNodes.length-1;i>0;i--){
						if(player.node.handcards1.childNodes[i].classList.contains('removing')==false){
							player.node.handcards1.childNodes[i].animate('last');
							break;
						}
					}
					for(var i=player.node.handcards2.childNodes.length-1;i>0;i--){
						if(player.node.handcards2.childNodes[i].classList.contains('removing')==false){
							player.node.handcards2.childNodes[i].animate('last');
							break;
						}
					}
					event.num=0;
					"step 1"
					if(num<cards.length){
						if(cards[num].original=='e'){
							var info=get.info(cards[num]);
							if(info.onLose&&(!info.filterLose||info.filterLose(cards[num],player))){
								event.goto(2);
								return;
							}
						}
						event.num++;
						event.redo();
					}
					else{
						event.finish();
					}
					"step 2"
					player.popup(cards[num].name);
					var next=game.createEvent('lose_'+cards[num].name);
					var info=get.info(cards[num]);
					next.content=info.onLose;
					next.player=player;
					next.card=cards[num];
					game.delay();
					event.num++;
					event.goto(1);
				},
				damage:function(){
					"step 0"
					if(lib.config.background_audio){
						game.playAudio('effect','damage_'+(player.sex==='female'?'female':'male'));
					}
					var str=get.translation(player)+'受到了';
					if(source) str+='来自'+(source==player?'自己':get.translation(source)+'的');
					str+=get.cnNumber(num)+'点';
					if(event.nature) str+=get.translation(event.nature)+'属性';
					str+='伤害';
					game.log(str);
					if(player.stat[player.stat.length-1].damaged==undefined){
						player.stat[player.stat.length-1].damaged=num;
					}
					else{
						player.stat[player.stat.length-1].damaged+=num;
					}
					if(source){
						if(source.stat[source.stat.length-1].damage==undefined){
							source.stat[source.stat.length-1].damage=num;
						}
						else{
							source.stat[source.stat.length-1].damage+=num;
						}
					}
					player.changeHp(-num,false);
					player.popup(-num,event.nature);
					player.$damage(source);
					event.trigger('damage');
					"step 1"
					if(player.hp<=0&&player.isAlive()){
						game.delay();
						player.dying(event);
					}
				},
				recover:function(){
					if(lib.config.background_audio){
						game.playAudio('effect','recover');
					}
					if(num>player.maxHp-player.hp) num=player.maxHp-player.hp;
					if(num>0){
						player.changeHp(num);
						game.log(get.translation(player)+'回复了'+get.cnNumber(num)+'点体力')
					}
				},
				loseHp:function(){
					"step 0"
					game.log(get.translation(player)+'失去了'+get.cnNumber(num)+'点体力')
					player.changeHp(-num);
					"step 1"
					if(player.hp<=0){
						game.delay();
						player.dying(event);
					}
				},
				doubleDraw:function(){
					"step 0"
					player.chooseBool('你的武将牌上有单独的阴阳鱼，是否摸一张牌？');
					"step 1"
					if(result.bool){
						player.draw();
					}
				},
				loseMaxHp:function(){
					"step 0"
					game.log(get.translation(player)+'失去了'+get.cnNumber(num)+'点体力上限');
					if(!event.forced&&typeof player.singleHp==='boolean'){
						if(player.singleHp){
							player.singleHp=false;
							player.maxHp-=num-1;
						}
						else{
							player.singleHp=true;
							player.maxHp-=num;
						}
					}
					else{
						player.maxHp-=num;
					}
					player.update();
					"step 1"
					if(player.maxHp<=0){
						player.die();
					}
					"step 2"
					if(!event.forced&&player.singleHp===true&&
						!player.classList.contains('unseen')&&!player.classList.contains('unseen2')){
						player.doubleDraw();
					}
				},
				gainMaxHp:function(){
					"step 0"
					game.log(get.translation(player)+'获得了'+get.cnNumber(num)+'点体力上限');
					if(typeof player.singleHp==='boolean'){
						if(player.singleHp){
							player.singleHp=false;
							player.maxHp+=num;
						}
						else{
							player.singleHp=true;
							player.maxHp+=num-1;
						}
					}
					else{
						player.maxHp+=num;
					}
					player.update();
					"step 1"
					if(player.singleHp===true&&!player.classList.contains('unseen')&&!player.classList.contains('unseen2')){
						player.doubleDraw();
					}
				},
				changeHp:function(){
					player.hp+=num;
					if(player.hp>player.maxHp) player.hp=player.maxHp;
					player.update();
					if(event.popup!==false){
						player.popup(num);
					}
					event.trigger('changeHp');
				},
				dying:function(){
					"step 0"
					_status.dying=player;
					event.trigger('dying');
					game.log(get.translation(player)+'濒死')
					"step 1"
					if(_status.dying==player) delete _status.dying;
					if(player.hp<=0) player.die(event.reason);
				},
				die:function(){
					if(source){
						game.log(get.translation(player)+'被'+get.translation(source)+'杀害');
						if(source.stat[source.stat.length-1].kill==undefined){
							source.stat[source.stat.length-1].kill=1;
						}
						else{
							source.stat[source.stat.length-1].kill++;
						}
					}
					else{
						game.log(get.translation(player)+'遇难')
					}
					event.cards=player.get('hej');
					if(event.cards.length){
						for(var i=0;i<event.cards.length;i++){
							event.cards[i].goto(ui.discardPile);
						}
						player.$throw(event.cards,1000);
						var card=event.cards;
						var str=get.translation(player)+'弃置了'+get.translation(card[0]);
						for(var i=1;i<card.length;i++){
							str+='、'+get.translation(card[i]);
						}
						game.log(str);
					}
					if(!game.reserveDead){
						for(var mark in player.marks){
							player.unmarkSkill(mark);
						}
						while(player.node.marks.childNodes.length){
							player.node.marks.firstChild.remove();
						}
					}
					for(var i in player.tempSkills){
						player.skills.remove(i);
						delete player.tempSkills[i];
					}
					player.classList.add('dead');
					player.classList.remove('turnedover');
					player.classList.remove('out');
					player.node.count.innerHTML='';
					player.previous.next=player.next;
					player.next.previous=player.previous;
					game.players.remove(player);
					game.dead.push(player);
					if(player.dieAfter) player.dieAfter(source);
					if(lib.config.background_speak){
						if(lib.character[player.name]&&
						lib.character[player.name][4].contains('die_audio')){
							game.playAudio('die',player.name);
						}
						else if(lib.config.background_ogg){
							game.playAudio('die',player.name);
						}
					}
					if(lib.config.background_audio){
						game.playAudio('effect','die_'+(player.sex==='female'?'female':'male'));
					}
					if(player==game.me&&!_status.over){
						ui.control.show();
						if(get.config('swap')&&lib.config.mode_choice.contains('swap')){
							ui.swap=ui.create.control('换人',ui.click.dieswap);
						}
						if(get.config('revive')&&lib.config.mode_choice.contains('revive')){
							ui.revive=ui.create.control('revive',ui.click.dierevive);
						}
						if(get.config('dierestart')&&lib.config.mode_choice.contains('dierestart')){
							ui.restart=ui.create.control('restart',game.reload);
						}
					}
					if(player==game.me&&ui.auto){
						ui.auto.hide();
					}
					player.$die(source);
				},
				equip:function(){
					"step 0"
					if(get.owner(card)) get.owner(card).lose(card);

					if(card.clone){
						card.clone.moveTo(player,Math.random()<0.8?'flip':'rotate').delete();
					}

					player.equiping=true;
					player.lose(player.get('e',{subtype:get.subtype(card)}),false);
					"step 1"
					card.fix();
					if(player.isMin()){
						event.finish();
						ui.discardPile.appendChild(card);
						delete player.equiping;
						return;
					}
					if(lib.config.background_audio){
						game.playAudio('effect',get.subtype(card));
					}
					var equipNum=get.equipNum(card);
					var equipped=false;
					for(var i=0;i<player.node.equips.childNodes.length;i++){
						if(get.equipNum(player.node.equips.childNodes[i])>=equipNum){
							player.node.equips.insertBefore(card,player.node.equips.childNodes[i]);
							equipped=true;
							break;
						}
					}
					if(!equipped){
						player.node.equips.appendChild(card);
					}
					player.node.equips.dataset.number=player.num('e');
					game.log(get.translation(player)+'装备了'+get.translation(card))
					"step 2"
					var info=get.info(card);
					if(info.onEquip&&(!info.filterEquip||info.filterEquip(card,player))){
						var next=game.createEvent('equip_'+card.name);
						next.content=info.onEquip;
						next.player=player;
						next.card=card;
						game.delay();
					}
					delete player.equiping;
				},
				addJudge:function(){
					"step 0"
					if(cards&&get.owner(cards[0])) get.owner(cards[0]).lose(cards);
					"step 1"
					if(lib.config.background_audio){
						game.playAudio('effect','judge');
					}
					cards[0].fix();
					var viewAs=typeof card=='string'?card:card.name;
					if(!lib.card[viewAs]||!lib.card[viewAs].effect){
						ui.discardPile.appendChild(cards[0]);
					}
					else{
						player.node.judges.insertBefore(cards[0],player.node.judges.firstChild);
						player.$gain2(cards);
						if(get.itemtype(card)!='card'){
							if(typeof card=='string') cards[0].viewAs=card;
							else cards[0].viewAs=card.name;
						}
						else{
							delete cards[0].viewAs;
						}
						if(cards[0].viewAs&&cards[0].viewAs!=cards[0].name){
							game.log(get.translation(player)+'被贴上了'+get.translation(cards[0].viewAs)+'（'+get.translation(cards)+'）');
						}
						else{
							game.log(get.translation(player)+'被贴上了'+get.translation(cards));
						}
					}
				},
				judge:function(){
					"step 0"
					player.judging=get.cards()[0];
					event.node=player.judging.copy('thrown','center',ui.arena).animate('start');
					event.dialog=ui.create.dialog(get.translation(player)+'的'+event.judgestr+'判定');
					event.dialog.classList.add('center');
					game.log(get.translation(player)+'进行'+event.judgestr+'判定，亮出的判定牌为'+get.translation(player.judging));
					game.delay(2);
					event.trigger('judge');
					"step 1"
					event.result={
						card:player.judging,
						number:get.number(player.judging),
						suit:get.suit(player.judging),
						color:get.color(player.judging),
						judge:event.judge(player.judging),
						node:event.node,
					};
					if(event.result.judge>0) event.result.bool=true;
					if(event.result.judge<0) event.result.bool=false;
					delete player.judging;
					if(event.result.judge>0){
						player.popup('洗具');
					}
					else if(event.result.judge<0){
						player.popup('杯具');
					}
					if(event.clearArena!=false) ui.clear();
					event.dialog.close();
					game.log(get.translation(player)+'的判定结果为'+get.translation(event.result.card));
					if(!get.owner(event.result.card)) event.position.appendChild(event.result.card);
				},
				turnOver:function(){
					game.log(get.translation(player)+'翻面');
					player.classList.toggle('turnedover');
				},
				link:function(){
					if(player.isLinked()){
						game.log(get.translation(player)+'解除连环');
					}
					else{
						game.log(get.translation(player)+'被连环');
					}
					player.classList.toggle('linked');
				},

			},
			player:{
				init:function(character,character2,skill){
					if(character2==false){
						skill=false;
						character2=null;
					}
					var info=lib.character[character];
					var skills=info[3];
					this.skills.length=0;
					if(!game.minskin&&lib.config.layout=='newlayout'&&info[4].contains('fullskin')){
						this.classList.remove('minskin');
						this.classList.add('fullskin');
						if(lib.fakeavatar&&lib.fakeavatar[character]){
							this.node.avatar.setBackground('character/fullskin/'+lib.fakeavatar[character]);
						}
						else{
							this.node.avatar.setBackground('character/fullskin/'+character);
						}
					}
					else{
						this.node.avatar.setBackground(character,'character');
						this.classList.remove('fullskin');
						if(info[4].contains('minskin')){
							this.classList.add('minskin');
						}
						else if(game.minskin){
							this.classList.add('minskin');
						}
					}

					this.node.avatar.show();
					this.node.count.show();
					this.name=character;
					this.sex=info[0];
					this.group=info[1];
					this.hp=info[2];
					this.maxHp=info[2];
					this.node.intro.innerHTML=lib.config.intro;
					if(lib.config.touchscreen){
						lib.setLongPress(this,ui.click.intro);
					}
					if(lib.config.right_info){
						this.oncontextmenu=ui.click.rightplayer;
					}
					if(lib.config.hover_all){
						lib.setHover(this,ui.click.hoverplayer);
					}
					var name=get.translation(character);
					this.node.name.innerHTML='';
					if(!lib.config.show_name){
						this.node.name.style.display='none';
					}
					for(var i=0;i<name.length;i++){
						this.node.name.innerHTML+=name[i]+'<br/>';
					}
					if(character2){
						var info2=lib.character[character2];

						if(lib.config.layout=='newlayout'&&lib.config.only_fullskin){
							this.classList.add('fullskin2');
							if(lib.fakeavatar&&lib.fakeavatar[character2]){
								this.node.avatar2.setBackground('character/fullskin/'+lib.fakeavatar[character2]);
							}
							else{
								this.node.avatar2.setBackground('character/fullskin/'+character2);
							}
						}
						else{
							this.node.avatar2.setBackground(character2,'character');
						}



						this.node.avatar2.show();
						this.name2=character2;
						var hp1=info[2],hp2=info2[2];
						switch(get.config('double_hp')){
							case 'pingjun':{
								this.maxHp=Math.floor((hp1+hp2)/2);
								this.singleHp=((hp1+hp2)%2===1);
								break;
							}
							case 'zuidazhi':this.maxHp=Math.max(hp1,hp2);break;
							case 'zuixiaozhi':this.maxHp=Math.min(hp1,hp2);break;
							case 'zonghe':this.maxHp=hp1+hp2;break;
							default:this.maxHp=hp1+hp2-3;
						}
						this.hp=this.maxHp;
						this.node.count.classList.add('p2');
						skills=skills.concat(info2[3]);
					}
					if(skill!=false){
						for(var i=0;i<skills.length;i++){
							this.addSkill(skills[i]);
						}
					}
					lib.group.add(this.group);
					if(this.inits){
						for(var i=0;i<lib.element.player.inits.length;i++){
							lib.element.player.inits[i](this);
						}
					}
					this.update();
					return this;
				},
				uninit:function(){
					var that=this;
					this.node.avatar.hide();
					this.node.count.hide();
					if(this.node.wuxing){
						this.node.wuxing.hide();
					}
					delete this.name;
					delete this.sex;
					delete this.group;
					delete this.hp;
					delete this.maxHp;
					this.skills.length=0;
					this.node.identity.style.backgroundColor='';
					this.node.intro.innerHTML='';
					this.node.name.innerHTML='';
					this.node.hp.innerHTML='';
					this.node.count.innerHTML='';
					if(this.name2){
						this.node.avatar2.hide();
						delete this.name2;
						this.node.count.classList.remove('p2');
					}
					for(var mark in this.marks){
						this.marks[mark].remove();
					}

					this.skipList=[];
					this.skills=[];
					this.initedSkills=[];
					this.additionalSkills={};
					this.disabledSkills={};
					this.hiddenSkills=[];
					this.forbiddenSkills=[];
					this.modeSkills=[];
					this.stat=[{card:{},skill:{}}];
					this.tempSkills={};
					this.storage={};
					this.marks={};
					this.ai={friend:[],enemy:[],neutral:[]};

					return this;
				},
				update:function(){
					if(this.hp>=this.maxHp) this.hp=this.maxHp;
					var hp=this.node.hp;
					hp.style.transition='none';
					if(lib.config.layout=='default'&&this.maxHp>14){
						hp.innerHTML=this.hp+'/'+this.maxHp;
						hp.classList.add('text');
					}
					else if(lib.config.layout=='newlayout'&&
					(this.maxHp>9||(this.maxHp>5&&this.classList.contains('minskin')))){
						hp.innerHTML=this.hp+'<br>/<br>'+this.maxHp;
						hp.classList.add('text');
						hp.classList.remove('long');
					}
					else{
						hp.innerHTML='';
						hp.classList.remove('text');
						while(this.maxHp>hp.childNodes.length){
							ui.create.div(hp);
						}
						while(this.maxHp<hp.childNodes.length){
							hp.removeChild(hp.lastChild);
						}
						for(var i=0;i<this.maxHp;i++){
							if(i<this.hp){
								hp.childNodes[i].classList.remove('lost');
							}
							else{
								hp.childNodes[i].classList.add('lost');
							}
						}
						if(this.maxHp==9){
							hp.classList.add('long');
						}
						else{
							hp.classList.remove('long');
						}
					}
					if(this.hp==0){
						hp.dataset.condition='';
					}
					else if(this.hp>Math.round(this.maxHp/2)||this.hp===this.maxHp){
						hp.dataset.condition='high';
					}
					else if(this.hp>Math.floor(this.maxHp/3)){
						hp.dataset.condition='mid';
					}
					else{
						hp.dataset.condition='low';
					}

					setTimeout(function(){
						hp.style.transition='';
					});
					var numh=this.num('h');
					if(numh>=10){
						numh=numh.toString();
						this.node.count.dataset.condition='low';
						this.node.count.innerHTML=numh[0]+'<br>'+numh[1];
					}
					else{
						if(numh>5){
							this.node.count.dataset.condition='higher';
						}
						else if(numh>2){
							this.node.count.dataset.condition='high';
						}
						else if(numh>0){
							this.node.count.dataset.condition='mid';
						}
						else{
							this.node.count.dataset.condition='none';
						}
						this.node.count.innerHTML=numh;
					}
					this.node.equips.dataset.number=this.num('e');
					if(this==game.me){
						ui.updateh();
					}
					if(this.updates){
						for(var i=0;i<lib.element.player.updates.length;i++){
							lib.element.player.updates[i](this);
						}
					}
					return this;
				},
				num:function(arg1,arg2,arg3){
					var i,j,k;
					if(get.itemtype(arg1)=='position'){
						return this.get(arg1,arg2,arg3).length;
					}
					else if(arg1=='s'){
						if(typeof arg2=='boolean'){
							return game.expandSkills(this.get('s',arg2).concat(lib.skill.global)).contains(arg3);
						}
						else{
							return game.expandSkills(this.get('s').concat(lib.skill.global)).contains(arg2);
						}
					}
				},
				line:function(target,config){
					if(get.itemtype(target)=='players'){
						for(var i=0;i<target.length;i++){
							this.line(target[i],config);
						}
					}
					else if(get.itemtype(target)=='player'){
						if(target==this) return;
						game.linexy([
							this.offsetLeft+this.offsetWidth/2,
							this.offsetTop+this.offsetHeight/2,
							target.offsetLeft+target.offsetWidth/2,
							target.offsetTop+target.offsetHeight/2
						],config,true);
					}
				},
				line2:function(targets,config){
					this.line(targets[0],config);
					targets=targets.slice(0);
					for(var i=1;i<targets.length;i++){
						(function(j){
							setTimeout(function(){
								targets[j-1].line(targets[j],config);
							},lib.config.duration*i);
						}(i));
					}
				},
				get:function(arg1,arg2,arg3,arg4){
					var i,j;
					if(arg1=='s'){
						this.checkConflict();
						var skills=this.skills.slice(0);
						for(var i in this.additionalSkills){
							if(Array.isArray(this.additionalSkills[i])){
								for(j=0;j<this.additionalSkills[i].length;j++){
									if(this.additionalSkills[i][j]){
										skills.add(this.additionalSkills[i][j]);
									}
								}
							}
							else if(this.additionalSkills[i]&&typeof this.additionalSkills[i]=='string'){
								skills.add(this.additionalSkills[i]);
							}
						}
						if(arg2) skills=skills.concat(this.hiddenSkills);
						if(arg3!==false){
							for(i=0;i<this.node.equips.childNodes.length;i++){
								if(get.info(this.node.equips.childNodes[i]).skills){
									skills=skills.concat(get.info(this.node.equips.childNodes[i]).skills);
								}
							}
						}
						for(i=0;i<this.forbiddenSkills.length;i++){
							skills.remove(this.forbiddenSkills[i]);
						}
						if(arg4!==false){
							skills=game.filterSkills(skills,this);
						}
						return skills;
					}
					else if(get.itemtype(arg1)=='position'){
						var cards=[],cards1=[];
						for(i=0;i<arg1.length;i++){
							if(arg1[i]=='h'){
								for(j=0;j<this.node.handcards1.childNodes.length;j++){
									cards.push(this.node.handcards1.childNodes[j]);
								}
								for(j=0;j<this.node.handcards2.childNodes.length;j++){
									cards.push(this.node.handcards2.childNodes[j]);
								}
							}
							else if(arg1[i]=='e'){
								for(j=0;j<this.node.equips.childNodes.length;j++){
									cards.push(this.node.equips.childNodes[j]);
								}
								if(arguments.length==2&&typeof arg2=='string'&&/1|2|3|4|5/.test(arg2)){
									for(j=0;j<cards.length;j++){
										if(get.subtype(cards[j])=='equip'+arg2) return cards[j];
									}
									return;
								}
							}
							else if(arg1[i]=='j'){
								for(j=0;j<this.node.judges.childNodes.length;j++){
									cards.push(this.node.judges.childNodes[j]);
									if(this.node.judges.childNodes[j].viewAs){
										this.node.judges.childNodes[j].tempJudge=this.node.judges.childNodes[j].name;
										this.node.judges.childNodes[j].name=this.node.judges.childNodes[j].viewAs;
										cards1.push(this.node.judges.childNodes[j]);
									}
								}
							}
						}
						for(i=0;i<cards.length;i++){
							if(cards[i].classList.contains('removing')){
								cards.splice(i,1);i--;
							}
						}
						if(arg2!=undefined){
							if(typeof arg3=='function'){
								var cards2=cards.slice(0);
								cards.sort(function(a,b){
									return arg3(b,cards2)-arg3(a,cards2);
								});
							}
							if(typeof arg2=='string'){
								for(i=0;i<cards.length;i++){
									if(cards[i].name!=arg2){
										cards.splice(i,1);i--;
									}
								}
							}
							else if(typeof arg2=='object'){
								for(i=0;i<cards.length;i++){
									for(j in arg2){
										if(j=='type'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.type(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.type(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='subtype'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.subtype(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.subtype(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='color'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.color(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.color(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='suit'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.suit(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.suit(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(j=='number'){
											if(typeof arg2[j]=='object'){
												if(arg2[j].contains(get.number(cards[i]))==false){
													cards.splice(i,1);i--;break;
												}
											}
											else if(typeof arg2[j]=='string'){
												if(get.number(cards[i])!=arg2[j]){
													cards.splice(i,1);i--;break;
												}
											}
										}
										else if(typeof arg2[j]=='object'){
											if(arg2[j].contains(cards[i][j])==false){
												cards.splice(i,1);i--;break;
											}
										}
										else if(typeof arg2[j]=='string'){
											if(cards[i][j]!=arg2[j]){
												cards.splice(i,1);i--;break;
											}
										}
									}
								}
							}
							else if(typeof arg2=='number'&&arg2>0){
								cards.splice(arg2);
							}
							else if(typeof arg2=='function'){
								for(i=0;i<cards.length;i++){
									if(!arg2(cards[i])){
										cards.splice(i,1);i--;
									}
								}
							}
						}
						for(i=0;i<cards1.length;i++){
							if(cards1[i].tempJudge){
								cards1[i].name=cards1[i].tempJudge;
								delete cards1[i].tempJudge;
							}
						}
						if(arg2===0) return cards[0];
						if(typeof arg3=='number'){
							if(arg3==0) return cards[0];
							cards.splice(arg3);
						}
						if(typeof arg4=='number'){
							if(arg4==0) return cards[0];
							cards.splice(arg4);
						}
						return cards;
					}
				},
				setIdentity:function(identity){
					if(!identity) identity=this.identity;
					this.node.identity.firstChild.innerHTML=get.translation(identity);
					this.node.identity.dataset.color=identity;
				},
				phase:function(){
					var next=game.createEvent('phase');
					next.player=this;
					next.content=lib.element.playerproto.phase;
				},
				phaseJudge:function(){
					var next=game.createEvent('phaseJudge');
					next.player=this;
					next.content=lib.element.playerproto.phaseJudge;
				},
				phaseDraw:function(){
					var next=game.createEvent('phaseDraw');
					next.player=this;
					next.num=2;
					next.content=lib.element.playerproto.phaseDraw;
				},
				phaseUse:function(){
					var next=game.createEvent('phaseUse');
					next.player=this;
					next.content=lib.element.playerproto.phaseUse;
				},
				phaseDiscard:function(){
					var next=game.createEvent('phaseDiscard');
					next.player=this;
					next.content=lib.element.playerproto.phaseDiscard;
				},
				chooseToUse:function(use){
					var next=game.createEvent('chooseToUse');
					next.player=this;
					if(arguments.length==1){
						for(var i in use){
							next[i]=use[i];
						}
					}
					else{
						for(var i=0;i<arguments.length;i++){
							if(typeof arguments[i]=='number'||get.itemtype(arguments[i])=='select'){
								next.selectTarget=arguments[i];
							}
							else if(typeof arguments[i]=='object'||typeof arguments[i]=='function'){
								if(get.itemtype(arguments[i])=='player'||next.filterCard){
									next.filterTarget=arguments[i];
								}
								else next.filterCard=arguments[i];
							}
							else if(typeof arguments[i]=='boolean'){
								next.forced=arguments[i];
							}
							else if(typeof arguments[i]=='string'){
								next.prompt=arguments[i];
							}
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined){
						next.filterCard=lib.filter.filterCard;
					}
					if(next.selectCard==undefined){
						next.selectCard=lib.filter.selectCard;
					}
					if(next.filterTarget==undefined){
						next.filterTarget=lib.filter.filterTarget;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=lib.filter.selectTarget;
					}
					if(next.ai1==undefined) next.ai1=ai.get.order;
					if(next.ai2==undefined) next.ai2=ai.get.effect;
					next.content=lib.element.playerproto.chooseToUse;
					return next;
				},
				chooseToRespond:function(){
					var next=game.createEvent('chooseToRespond');
					next.player=this;
					var filter;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
							filter=arguments[i];
						}
						else if(arguments[i]=='nosource'){
							next.nosource=true;
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.source==undefined&&!next.nosource) next.source=_status.event.player;
					if(next.ai==undefined) next.ai=ai.get.unuseful2;
					if(next.prompt!=false){
						if(typeof next.prompt=='string'){
							next.dialog=next.prompt;
						}
						else{
							var str='请打出'+get.cnNumber(next.selectCard[0])+'张'
							if(filter){
								if(filter.name){
									str+=get.translation(filter.name);
								}
								else{
									str+='牌';
								}
							}
							else{
								str+='牌';
							}
							next.dialog=str;
						}
					}
					next.content=lib.element.playerproto.chooseToRespond;
					return next;
				},
				chooseToDiscard:function(){
					var next=game.createEvent('chooseToDiscard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=ai.get.unuseful;
					next.autochoose=function(){
						if(!this.forced) return false;
						return get.select(this.selectCard)[0]>=this.player.num(this.position||'h');
					}
					next.content=lib.element.playerproto.chooseToDiscard;
					return next;
				},
				chooseToCompare:function(target,check){
					var next=game.createEvent('chooseToCompare');
					next.player=this;
					next.target=target;
					if(check) next.ai=check;
					else next.ai=function(card){
						var player=get.owner(card);
						var event=_status.event.parent;
						var to=(player==event.player?event.target:event.player);
						var addi=(ai.get.value(card)>=8&&get.type(card)!='equip')?-10:0;
						if(player==event.player){
							if(ai.get.attitude(player,to)>0&&event.small){
								return -get.number(card)-ai.get.value(card)/2+addi;
							}
							return get.number(card)-ai.get.value(card)/2+addi;
						}
						else{
							if(ai.get.attitude(player,to)>0&&!event.small){
								return -get.number(card)-ai.get.value(card)/2+addi;
							}
							return get.number(card)-ai.get.value(card)/2+addi;
						}
					}
					next.content=lib.element.playerproto.chooseToCompare;
					return next;
				},
				chooseCardButton:function(){
					var cards,prompt,forced,select;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards') cards=arguments[i];
						else if(typeof arguments[i]=='boolean') forced=arguments[i];
						else if(typeof arguments[i]=='string') prompt=arguments[i];
						else if(get.itemtype(arguments[i])=='select'||typeof arguments[i]=='number') select=arguments[i];
					}
					if(prompt==undefined) prompt='请选择卡牌';
					return this.chooseButton(ui.create.dialog(prompt,cards),forced,select,'hidden');
				},
				chooseButton:function(){
					var next=game.createEvent('chooseButton');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.closeDialog=true;
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
					}
					next.player=this;
					if(next.isMine()==false&&next.dialog) next.dialog.style.display='none';
					if(next.filterButton==undefined) next.filterButton=lib.filter.filterButton;
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(){return 1};
					next.content=lib.element.playerproto.chooseButton;
					return next;
				},
				chooseCard:function(){
					var next=game.createEvent('chooseCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectCard=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectCard=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterCard) next.ai=arguments[i];
							else next.filterCard=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterCard=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterCard==undefined) next.filterCard=lib.filter.all;
					if(next.selectCard==undefined) next.selectCard=[1,1];
					if(next.ai==undefined) next.ai=ai.get.unuseful2;
					next.content=lib.element.playerproto.chooseCard;
					return next;
				},
				chooseTarget:function(){
					var next=game.createEvent('chooseTarget');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='number'){
							next.selectTarget=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectTarget=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
							next.prompt=false;
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							if(next.filterTarget) next.ai=arguments[i];
							else next.filterTarget=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterTarget==undefined) next.filterTarget=lib.filter.all;
					if(next.selectTarget==undefined) next.selectTarget=[1,1];
					if(next.ai==undefined) next.ai=ai.get.attitude2;
					next.content=lib.element.playerproto.chooseTarget;
					return next;
				},
				chooseCardTarget:function(choose){
					var next=game.createEvent('chooseCardTarget');
					next.player=this;
					if(arguments.length==1){
						for(var i in choose){
							next[i]=choose[i];
						}
					}
					if(typeof next.filterCard=='object'){
						next.filterCard=get.filter(next.filterCard);
					}
					if(typeof next.filterTarget=='object'){
						next.filterTarget=get.filter(next.filterTarget,2);
					}
					if(next.filterCard==undefined||next.filterCard===true){
						next.filterCard=lib.filter.all;
					}
					if(next.selectCard==undefined){
						next.selectCard=1;
					}
					if(next.filterTarget==undefined||next.filterTarget===true){
						next.filterTarget=lib.filter.all;
					}
					if(next.selectTarget==undefined){
						next.selectTarget=1;
					}
					if(next.ai1==undefined) next.ai1=ai.get.unuseful2;
					if(next.ai2==undefined) next.ai2=ai.get.attitude2;
					next.content=lib.element.playerproto.chooseCardTarget;
					return next;
				},
				chooseControl:function(){
					var next=game.createEvent('chooseControl');
					next.controls=[];
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string'){
							next.controls.push(arguments[i]);
						}
						else if(get.objtype(arguments[i])=='array'){
							next.controls=next.controls.concat(arguments[i]);
						}
						else if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.choice=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='dialog'){
							next.dialog=arguments[i];
						}
					}
					next.player=this;
					if(next.choice==undefined) next.choice=0;
					next.content=lib.element.playerproto.chooseControl;
					return next;
				},
				chooseBool:function(){
					var next=game.createEvent('chooseBool');
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='boolean'){
							next.choice=arguments[i];
						}
						else  if(typeof arguments[i]=='function'){
							next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
						if(next.choice==undefined) next.choice=true;
					}
					next.player=this;
					next.content=lib.element.playerproto.chooseBool;
					return next;
				},
				choosePlayerCard:function(){
					var next=game.createEvent('choosePlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='hej';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.choosePlayerCard;
					return next;
				},
				discardPlayerCard:function(){
					var next=game.createEvent('discardPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='hej';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.discardPlayerCard;
					return next;
				},
				gainPlayerCard:function(){
					var next=game.createEvent('gainPlayerCard');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.target=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.selectButton=[arguments[i],arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='select'){
							next.selectButton=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.forced=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='position'){
							next.position=arguments[i];
						}
						else if(arguments[i]=='visible'){
							next.visible=true;
						}
						else if(typeof arguments[i]=='function'){
							if(next.ai) next.filterButton=arguments[i];
							else next.ai=arguments[i];
						}
						else if(typeof arguments[i]=='object'){
							next.filterButton=get.filter(arguments[i]);
						}
						else if(typeof arguments[i]=='string'){
							next.prompt=arguments[i];
						}
					}
					if(next.filterButton==undefined) next.filterButton=lib.filter.all;
					if(next.position==undefined) next.position='h';
					if(next.selectButton==undefined) next.selectButton=[1,1];
					if(next.ai==undefined) next.ai=function(button){
						var val=ai.get.buttonValue(button);
						if(ai.get.attitude(_status.event.player,get.owner(button.link))>0) return -val;
						return val;
					};
					next.content=lib.element.playerproto.gainPlayerCard;
					return next;
				},
				showHandcards:function(){
					var next=game.createEvent('showHandcards');
					next.player=this;
					next.content=lib.element.playerproto.showHandcards;
				},
				showCards:function(cards){
					var next=game.createEvent('showCards');
					next.player=this;
					if(get.itemtype(cards)=='card') next.cards=[cards];
					else if(get.itemtype(cards)=='cards') next.cards=cards;
					else _status.event.next.remove(next);
					next.content=lib.element.playerproto.showCards;
				},
				viewHandcards:function(target){
					var next=game.createEvent('viewHandcards');
					next.player=this;
					next.target=target;
					next.content=lib.element.playerproto.viewHandcards;
				},
				useCard:function(){
					var next=game.createEvent('useCard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.targets=[arguments[i]];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else next.cards=[];
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					if(!next.targets){
						next.targets=[];
					}
					for(var i=0;i<next.targets.length;i++){
						if(ai.get.attitude(this,next.targets[i])>=-1&&ai.get.attitude(this,next.targets[i])<0){
							if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
							this.ai.tempIgnore.add(next.targets[i]);
						}
					}
					if(typeof this.logAi=='function'){
						this.logAi(next.targets,next.card);
					}
					next.content=lib.element.playerproto.useCard;
					return next;
				},
				useSkill:function(){
					var next=game.createEvent('useSkill');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='players'){
							next.targets=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.addCount=arguments[i];
						}
					}
					if(next.cards==undefined){
						next.cards=[];
					}
					if(next.targets){
						for(var i=0;i<next.targets.length;i++){
							if(ai.get.attitude(this,next.targets[i])>=-1&&ai.get.attitude(this,next.targets[i])<0){
								if(!this.ai.tempIgnore) this.ai.tempIgnore=[];
								this.ai.tempIgnore.add(next.targets[i]);
							}
						}
						if(typeof this.logAi=='function'){
							this.logAi(next.targets,next.skill);
						}
					}
					else{
						next.targets=[];
					}
					next.content=lib.element.playerproto.useSkill;
				},
				draw:function(){
					var next=game.createEvent('draw');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
					}
					if(next.num==undefined) next.num=1;
					if(next.num==0) _status.event.next.remove(next);
					next.content=lib.element.playerproto.draw;
					return next;
				},
				discard:function(){
					var next=game.createEvent('discard');
					next.player=this;
					next.num=0;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='boolean'){
							next.animate=arguments[i];
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					next.content=lib.element.playerproto.discard;
					return next;
				},
				respond:function(){
					var next=game.createEvent('respond');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='boolean') next.animate=arguments[i];
						else if(typeof arguments[i]=='string') next.skill=arguments[i];
					}
					if(next.cards==undefined){
						if(get.itemtype(next.card)=='card'){
							next.cards=[next.card];
						}
						else{
							next.cards=[];
						}
					}
					else if(next.card==undefined){
						if(next.cards){
							next.card=next.cards[0];
						}
					}
					next.content=lib.element.playerproto.respond;
				},
				directgain:function(cards){
					for(var i=0;i<cards.length;i++){
						var sort=lib.config.sort_card(cards[i]);
						if(game.singleHandcard||sort>0){
							this.node.handcards1.appendChild(cards[i].animate('start'));
						}
						else{
							this.node.handcards2.appendChild(cards[i].animate('start'));
						}
					}
					this.update();
					return this;
				},
				gain:function(){
					var next=game.createEvent('gain');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(typeof arguments[i]=='string'){
							next.animate=arguments[i];
						}
					}
					next.content=lib.element.playerproto.gain;
					return next;
				},
				lose:function(){
					var next=game.createEvent('lose');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.cards=[arguments[i]];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
					}
					if(next.cards==undefined) _status.event.next.remove(next);
					if(next.position==undefined) next.position=ui.discardPile;
					next.content=lib.element.playerproto.lose;
					return next;
				},
				damage:function(){
					var next=game.createEvent('damage');
					next.player=this;
					var nocard,nosource;
					var event=_status.event;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(arguments[i]=='nocard'){
							nocard=true;
						}
						else if(arguments[i]=='nosource'){
							nosource=true;
						}
						else if(get.itemtype(arguments[i])=='nature'){
							next.nature=arguments[i];
						}
					}
					if(next.card==undefined&&!nocard) next.card=event.card;
					if(next.cards==undefined&&!nocard) next.cards=event.cards;
					if(next.source==undefined&&!nosource) next.source=event.player;
					if(next.num==undefined) next.num=1;
					if(next.nature=='poison') delete next._triggered;
					next.content=lib.element.playerproto.damage;
				},
				recover:function(){
					var next=game.createEvent('recover');
					next.player=this;
					var nocard,nosource;
					var event=_status.event;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='cards'){
							next.cards=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='object'&&arguments[i].name){
							next.card=arguments[i];
						}
						else if(get.itemtype(arguments[i])=='player'){
							next.source=arguments[i];
						}
						else if(typeof arguments[i]=='number'){
							next.num=arguments[i];
						}
						else if(arguments[i]=='nocard'){
							nocard=true;
						}
						else if(arguments[i]=='nosource'){
							nosource=true;
						}
					}
					if(next.card==undefined&&!nocard) next.card=event.card;
					if(next.cards==undefined&&!nocard) next.cards=event.cards;
					if(next.source==undefined&&!nosource) next.source=event.player;
					if(next.num==undefined) next.num=1;
					if(next.num<=0) _status.event.next.remove(next);
					next.content=lib.element.playerproto.recover;
				},
				doubleDraw:function(){
					var next=game.createEvent('doubleDraw');
					next.player=this;
					next.content=lib.element.playerproto.doubleDraw;
					return next;
				},
				loseHp:function(num){
					var next=game.createEvent('loseHp');
					next.num=num;
					next.player=this;
					if(next.num==undefined) next.num=1;
					next.content=lib.element.playerproto.loseHp;
				},
				loseMaxHp:function(){
					var next=game.createEvent('loseMaxHp');
					next.player=this;
					next.num=1;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]==='number'){
							next.num=arguments[i];
						}
						else if(typeof arguments[i]==='boolean'){
							next.forced=arguments[i];
						}
					}
					next.content=lib.element.playerproto.loseMaxHp;
				},
				gainMaxHp:function(num){
					var next=game.createEvent('gainMaxHp');
					next.num=num;
					next.player=this;
					if(next.num==undefined) next.num=1;
					next.content=lib.element.playerproto.gainMaxHp;
				},
				changeHp:function(num,popup){
					var next=game.createEvent('changeHp',false);
					next.num=num;
					if(popup!=undefined) next.popup=popup;
					next.player=this;
					next.content=lib.element.playerproto.changeHp;
				},
				dying:function(reason){
					var next=game.createEvent('dying',false);
					next.player=this;
					next.reason=reason;
					next.source=reason.source;
					next.content=lib.element.playerproto.dying;
				},
				die:function(reason){
					var next=game.createEvent('die');
					next.player=this;
					next.reason=reason;
					if(reason) next.source=reason.source;
					next.content=lib.element.playerproto.die;
					return next;
				},
				revive:function(hp){
					game.log(get.translation(this)+'复活');
					if(this.maxHp<1) this.maxHp=1;
					if(hp) this.hp=hp;
					this.classList.remove('dead');
					this.removeAttribute('style');
					this.update();
					var player;
					player=this.previousSeat;
					while(player.isDead()) player=player.previousSeat;
					player.next=this;
					this.previous=player;
					player=this.nextSeat;
					while(player.isDead()) player=player.nextSeat;
					player.previous=this;
					this.next=player;
					game.players.add(this);
					game.dead.remove(this);
					if(this==game.me){
						if(ui.auto) ui.auto.show();
						if(ui.revive){
							ui.revive.close();
							delete ui.revive;
						}
						if(ui.swap){
							ui.swap.close();
							delete ui.swap;
						}
						if(ui.restart){
							ui.restart.close();
							delete ui.restart;
						}
					}
				},
				isMad:function(){
					return this.skills.contains('mad');
				},
				goMad:function(){
					this.addSkill('mad');
					game.log(get.translation(this)+'进入混乱状态');
				},
				unMad:function(){
					this.removeSkill('mad');
					game.log(get.translation(this)+'解除混乱状态');
				},
				equip:function(card){
					var next=game.createEvent('equip');
					next.card=card;
					next.player=this;
					next.content=lib.element.playerproto.equip;
				},
				addJudge:function(card,cards){
					var next=game.createEvent('addJudge');
					next.card=card;
					next.cards=cards;
					if(next.cards==undefined) next.cards=[card];
					if(get.itemtype(next.cards)=='card') next.cards=[next.cards];
					next.player=this;
					next.content=lib.element.playerproto.addJudge;
				},
				judge:function(){
					var next=game.createEvent('judge');
					next.player=this;
					for(var i=0;i<arguments.length;i++){
						if(get.itemtype(arguments[i])=='card'){
							next.card=arguments[i];
						}
						else if(typeof arguments[i]=='string'){
							next.skill=arguments[i];
						}
						else if(typeof arguments[i]=='function'){
							next.judge=arguments[i];
						}
						else if(typeof arguments[i]=='boolean'){
							next.clearArena=arguments[i];
						}
						else if(get.objtype(arguments[i])=='div'){
							next.position=arguments[i];
						}
					}
					if(next.card&&next.judge==undefined){
						next.judge=get.judge(next.card);
					}
					if(next.judge==undefined) next.judge=function(){return 0};
					if(next.position==undefined) next.position=ui.discardPile;

					var str='';
					if(next.card) str=get.translation(next.card.viewAs||next.card.name);
					else if(next.skill) str=get.translation(next.skill);
					else str=get.translation(_status.event.name);
					next.judgestr=str;
					next.content=lib.element.playerproto.judge;
				},
				turnOver:function(){
					var next=game.createEvent('turnOver');
					next.player=this;
					next.content=lib.element.playerproto.turnOver;
				},
				out:function(bool){
					if(this.lockOut) return;
					if(this.isOut()){
						game.log(get.translation(this)+'进入游戏');
					}
					else{
						game.log(get.translation(this)+'离开游戏');
					}
					this.classList.toggle('out');
					if(bool) this.lockOut=bool;
				},
				link:function(){
					var next=game.createEvent('link');
					next.player=this;
					next.content=lib.element.playerproto.link;
				},
				skip:function(name){
					this.skipList.add(name);
				},
				logSkill:function(name,targets,nature){
					if(get.itemtype(targets)=='player') targets=[targets];
					if(lib.translate[name]){
						this.popup(name);
						if(typeof targets=='object'&&targets.length){
							var str=get.translation(this)+'对'+get.translation(targets[0]);
							for(var i=1;i<targets.length;i++){
								str+='、'+get.translation(targets[i]);
							}
							str+='发动了'+get.translation(name);
							game.log(str);
						}
						else{
							game.log(get.translation(this)+'发动了'+get.translation(name));
						}
					}
					if(nature!=false){
						this.line(targets,nature);
					}
					if(lib.skill[name]&&lib.skill[name].ai&&lib.skill[name].ai.expose!=undefined&&this.logAi){
						this.logAi(lib.skill[name].ai.expose);
					}
					if(this.checkShow){
						this.checkShow(name);
					}
					var info=lib.skill[name];
					if(info&&lib.config.background_speak){
						if(info.audio){
							game.playAudio('skill',name,Math.ceil(info.audio*Math.random()));
						}
						else{
							if(lib.config.background_ogg){
								game.playAudio('skill',name);
							}
							else{
								game.playAudio('skill','default',Math.ceil(Math.random()*5));
							}
						}
					}
					if(lib.config.mode=='chess'){
						this.chessFocus();
					}
				},
				unprompt:function(){
					if(this.node.prompt){
						this.node.prompt.delete();
						delete this.node.prompt;
					}
				},
				prompt:function(name2,className){
					var node;
					if(this.node.prompt){
						node=this.node.prompt;
						node.innerHTML='';
						node.className='popup';
					}
					else{
						node=ui.create.div('.popup',this.parentNode);
						this.node.prompt=node;
					}
					node.dataset.position=this.dataset.position;
					if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
						typeof name2=='number'||this.classList.contains('minskin')){
						node.innerHTML=name2;
					}
					else{
						for(var i=0;i<name2.length;i++){
							node.innerHTML+=name2[i]+'<br/>';
						}
					}
					if(className){
						node.classList.add(className);
					}
				},
				popup:function(name,className){
					var name2=get.translation(name);
					var node=ui.create.div('.popup',this.parentNode);
					node.dataset.position=this.dataset.position;
					if(this.dataset.position==0||parseInt(this.dataset.position)==parseInt(ui.arena.dataset.number)/2||
						typeof name2=='number'||this.classList.contains('minskin')){
						node.innerHTML=name2;
					}
					else{
						for(var i=0;i<name2.length;i++){
							node.innerHTML+=name2[i]+'<br/>';
						}
					}
					if(className){
						node.classList.add(className);
					}
					this.popups.push(node);
					if(this.popups.length>1){
						node.hide();
					}
					else{
						var that=this;
						setTimeout(function(){that._popup();},1000);
					}
				},
				_popup:function(){
					if(this.popups.length){
						this.popups.shift().delete();
						if(this.popups.length){
							this.popups[0].show();
							var that=this;
							setTimeout(function(){that._popup();},1000);
						}
					}
				},
				markSkill:function(name,info,card){
					if(!info){
						if(this.marks[name]){
							return this;
						}
						if(lib.skill[name]){
							info=lib.skill[name].intro;
						}
						if(!info){
							return this;
						}
					}
					if(this.marks[name]){
						this.marks[name].info=info;
					}
					else{
						if(card){
							this.marks[name]=this.mark(card,info,name);
						}
						else{
							this.marks[name]=this.mark(name,info);
						}
					}
					return this;
				},
				unmarkSkill:function(name){
					if(this.marks[name]){
						this.marks[name].delete();
						delete this.marks[name];
						var info=lib.skill[name];
						if(info&&info.intro&&info.intro.onunmark){
							info.intro.onunmark(this.storage[name],this);
						}
					}
				},
				markCharacter:function(name,info,learn,learn2){
					if(typeof name=='object'){
						name=name.name;
					}
					if(!lib.character[name]) return this;
					var node=ui.create.div('.card.mark',this.node.marks).setBackground(name,'character');
					node.name=name+'_charactermark';
					if(!info){
						info={};
					}
					if(!info.name){
						info.name=get.translation(name);
					}
					if(!info.content){
						info.content=get.skillintro(name,learn,learn2)
					}
					node.info=info;
					if(lib.config.touchscreen){
						lib.setLongPress(node,ui.click.intro);
					}
					if(lib.config.right_info){
						node.oncontextmenu=ui.click.rightplayer;
					}
					if(lib.config.hover_all){
						lib.setHover(node,ui.click.hoverplayer);
					}
					return node;
				},
				mark:function(name,info,skill){
					if(get.itemtype(name)=='cards'){
						var marks=[];
						for(var i=0;i<name.length;i++){
							marks.push(this.mark(name[i],info));
						}
						return marks;
					}
					else{
						var node;
						if(get.itemtype(name)=='card'){
							node=name.copy('mark',this.node.marks);
							node.suit=name.suit;
							node.number=name.number;
							name=name.name;
						}
						else{
							node=ui.create.div('.card.mark',this.node.marks);
							var str=lib.translate[name+'_bg'];
							if(!str||str[0]=='+'||str[0]=='-'){
								str=get.translation(name)[0];
							}
							ui.create.div('.background.skillmark',node).innerHTML=str;
							// node.style.fontFamily=lib.config.card_font;
						}
						node.name=name;
						node.skill=skill||name;
						if(typeof info=='object'){
							node.info=info;
						}
						else if(typeof info=='string'){
							node.markidentifer=info;
						}

						if(lib.config.touchscreen){
							lib.setLongPress(node,ui.click.intro);
						}
						if(lib.config.right_info){
							node.oncontextmenu=ui.click.rightplayer;
						}
						if(lib.config.hover_all){
							lib.setHover(node,ui.click.hoverplayer);
						}
						return node;
					}
				},
				unmark:function(name,info){
					if(get.itemtype(name)=='card'){
						this.unmark(name.name,info);
					}
					else if(get.itemtype(name)=='cards'){
						for(var i=0;i<name.length;i++){
							this.unmark(name[i].name,info);
						}
					}
					else{
						for(var i=0;i<this.node.marks.childNodes.length;i++){
							if(this.node.marks.childNodes[i].name==name&&
								(!info||this.node.marks.childNodes[i].markidentifer==info)){
								this.node.marks.childNodes[i].delete();
								return;
							}
						}
					}
				},
				canUse:function(card,player,distance,includecard){
					if(typeof card=='string') card={name:card};
					if(includecard&&!lib.filter.filterCard(card,this)) return false;
					if(distance==false) return lib.filter.targetEnabled(card,this,player);
					return lib.filter.filterTarget(card,this,player);
				},
				addSkill:function(skill){
					if(get.objtype(skill)=='array'){
						for(var i=0;i<skill.length;i++){
							this.addSkill(skill[i]);
						}
					}
					else{
						if(!lib.skill[skill]) return;
						if(this.skills.contains(skill)) return;
						this.skills.add(skill);
						if(lib.skill[skill].global){
							if(typeof lib.skill[skill].global=='string'){
								lib.skill.global.add(lib.skill[skill].global);
							}
							else{
								for(var j=0;j<lib.skill[skill].global.length;j++){
									lib.skill.global.add(lib.skill[skill].global[j])
								}
							}
						}
						if(lib.skill[skill].init){
							if(!this.initedSkills.contains(skill)){
								lib.skill[skill].init(this);
								this.initedSkills.push(skill);
							}
						}
						if(lib.skill[skill].init2){
							lib.skill[skill].init2(this);
						}
						if(lib.skill[skill].mark){
							if(lib.skill[skill].mark=='card'&&
							get.itemtype(this.storage[skill])=='card'){
								this.markSkill(skill,null,this.storage[skill]);
							}
							else{
								this.markSkill(skill);
							}
						}
					}
					this.checkConflict();
					return skill;
				},
				checkMarks:function(){
					var skills=this.get('s');
					for(var i in this.marks){
						if(!skills.contains(i)&&!this.marks[i].info.fixed){
							this.unmarkSkill(i);
						}
					}
					return this;
				},
				removeSkill:function(skill){
					this.unmarkSkill(skill);
					this.skills.remove(skill);
					this.checkConflict();
					return skill;
				},
				addTempSkill:function(skill,expire){
					if(this.skills.contains(skill)&&this.tempSkills[skill]==undefined) return;
					this.addSkill(skill);
					this.tempSkills[skill]=expire;
					this.checkConflict();
					return skill;
				},
				attitudeTo:function(target){
					if(typeof ai.get.attitude=='function') return ai.get.attitude(this,target);
					return 0;
				},
				clearSkills:function(){
					var list=[];
					var exclude=[];
					for(var i=0;i<arguments.length;i++) exclude.push(arguments[i]);
					for(i=0;i<this.skills.length;i++){
						if(this.modeSkills.contains(this.skills[i])==false&&
							exclude.contains(this.skills[i])==false){
							list.push(this.skills[i]);
						}
					}
					this.skills.remove(list);
					this.checkConflict();
					this.checkMarks();
					return list;
				},
				checkConflict:function(){
					if(this.name&&this.name2){
						this.forbiddenSkills.length=0;
						var forbid=[];
						for(var i=0;i<lib.config.forbid.length;i++){
							if(lib.config.forbidlist[i]){
								for(var j=0;j<lib.config.forbid[i].length;j++){
									if(this.skills.contains(lib.config.forbid[i][j])==false) break;
								}
								if(j==lib.config.forbid[i].length) forbid.push(lib.config.forbid[i]);
							}
						}
						for(var i=0;i<forbid.length;i++){
							this.forbiddenSkills.add(forbid[i][0]);
						}
					}
				},
				getStat:function(key){
					if(!key) return this.stat[this.stat.length-1];
					return this.stat[this.stat.length-1][key];
				},
				queue:function(time){
					if(time==false){
						clearTimeout(this.queueTimeout);
						this.queueCount=0;
						return;
					}
					if(time==undefined) time=500;
					var player=this;
					player.queueCount++;
					this.queueTimeout=setTimeout(function(){
						player.queueCount--;
						if(player.queueCount==0){
							player.removeAttribute('style');
							if(player==game.me) ui.me.removeAttribute('style');
						}
					},time)
				},
				isAlive:function(){
					return this.classList.contains('dead')==false;
				},
				isDead:function(){
					return this.classList.contains('dead');
				},
				isLinked:function(){
					return this.classList.contains('linked');
				},
				isTurnedOver:function(){
					return this.classList.contains('turnedover');
				},
				isOut:function(){
					return this.classList.contains('out');
				},
				isMin:function(distance){
					if(distance&&lib.config.mode!='stone') return false;
					if(this.forcemin) return true;
					return this.classList.contains('minskin')&&lib.config.mode!='chess';
				},
				isIn:function(){
					return this.classList.contains('dead')==false&&this.classList.contains('out')==false&&!this.removed;
				},
				isUnderControl:function(){
					if(this===game.me) return false;
					if(this.isMad()) return false;
					if(lib.config.mode=='versus'){
						return ui.autoreplace&&ui.autoreplace.classList.contains('on')&&
							this.side==game.me.side;
					}
					else if(lib.config.mode=='chess'||lib.config.mode=='boss'){
						return this.side==game.me.side;
					}
					return false;
				},
				hasSkillTag:function(tag,hidden){
					var skills=game.expandSkills(this.get('s',hidden));
					for(var i=0;i<skills.length;i++){
						var info=lib.skill[skills[i]];
						if(info&&info.ai){
							if(info.ai.skillTagFilter&&
								info.ai.skillTagFilter(this,tag)===false) continue;
							if(info.ai[tag]) return true;
						}
					}
					return false;
				},
				hasJudge:function(name){
					var judges=this.node.judges.childNodes;
					for(var i=0;i<judges.length;i++){
						if((judges[i].viewAs||judges[i].name)==name){
							return true;
						}
					}
					return false;
				},
				hasFriend:function(){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]!=this&&ai.get.attitude(game.players[i],this)>=0){
							return true;
						}
					}
					return false;
				},
				getJudge:function(name){
					var judges=this.node.judges.childNodes;
					for(var i=0;i<judges.length;i++){
						if((judges[i].viewAs||judges[i].name)==name){
							return judges[i];
						}
					}
					return null;
				},
				$draw:function(num){
					var cards,node;
					if(get.itemtype(num)=='cards'){
						cards=num;
						num=cards.length;
					}
					else if(get.itemtype(num)=='card'){
						cards=[num];
						num=1;
					}
					if(cards){
						cards=cards.slice(0);
						node=cards.shift().copy('drawing','thrown');
					}
					else{
						node=ui.create.div('.card.drawing.thrown');
					}
					node.fixed=true;
					node.dataset.position=this.dataset.position;
					this.parentNode.appendChild(node);
					setTimeout(function(){
						node.remove();
					},1000);
					var that=this;
					if(num&&num>1){
						setTimeout(function(){
							if(cards){
								that.$draw(cards)
							}
							else{
								that.$draw(num-1)
							}
						},200);
					}
				},
				$compare:function(card1,target,card2){
					var player=this;
					var node1=player.$throwxy(card1,
						'calc(50% - 114px)','calc(50% - 52px)'
					);
					node1.classList.add('infohidden');
					node1.style.webkitTransform='perspective(600px) rotateY(180deg) translateX(0)';
					setTimeout(function(){
						setTimeout(function(){
							node1.style.transition='all ease-in 0.3s';
							node1.style.webkitTransform='perspective(600px) rotateY(270deg) translateX(52px)';
							node1.addEventListener('webkitTransitionEnd',function(){
								node1.classList.remove('infohidden');
								node1.classList.add('cardflip');
								node1.style.webkitTransform='none';
								node1.style.transition='';
							});
						},600);


						var node2=target.$throwxy(card2,
							'calc(50% + 10px)','calc(50% - 52px)'
						);
						node2.classList.add('infohidden');
						node2.style.webkitTransform='perspective(600px) rotateY(180deg) translateX(0)';
						setTimeout(function(){
							node2.style.transition='all ease-in 0.3s';
							node2.style.webkitTransform='perspective(600px) rotateY(270deg) translateX(52px)';
							node2.addEventListener('webkitTransitionEnd',function(){
								node2.classList.remove('infohidden');
								node2.classList.add('cardflip');
								node2.style.webkitTransform='none';
								node2.style.transition='';
							});
						},700);

					},200);
				},
				$throw:function(card,time){
					if(get.itemtype(card)=='cards'){
						for(var i=0;i<card.length;i++){
							this.$throw(card[i],time);
						}
					}
					else{
						if(card==undefined||card.length==0) return;
						var node=this.$throwxy(card,
							'calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)',
							'calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)',true
						);
						if(time!=undefined){
							node.fixed=true;
							setTimeout(function(){node.delete()},time);
						}
					}
				},
				$throwxy:function(card,left,top,transform){
					var node=card.copy('thrown');
					node.dataset.position=this.dataset.position;
					node.hide();
					node.style.transitionProperty='left,top,opacity';
					if(transform){
						node.style.webkitTransform='rotate('+(Math.random()*16-8)+'deg)';
					}
					ui.arena.appendChild(node);
					ui.refresh(node);
					node.show();
					node.style.left=left;
					node.style.top=top;
					return node;
				},
				$give:function(card,player,log){
					if(get.itemtype(card)=='cards'){
						if(log!=false){
							var str=get.translation(player)+'从'+get.translation(this)+'获得了'+get.translation(card[0]);
							for(var i=1;i<card.length;i++){
								str+='、'+get.translation(card[i]);
							}
							game.log(str);
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							for(var i=0;i<card.length;i++){
								this.$give(card[i],player,false);
							}
						}
					}
					else if(typeof card=='number'&&card>=0){
						if(log!=false){
							game.log(get.translation(player)+'从'+get.translation(this)+'获得了'+get.cnNumber(card)+'张牌');
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							while(card--) this.$give('',player,false);
						}
					}
					else{
						if(log!=false){
							if(get.itemtype(card)=='card'&&log!=false){
								game.log(get.translation(player)+'从'+get.translation(this)+'获得了'+get.translation(card));
							}
							else{
								game.log(get.translation(player)+'从'+get.translation(this)+'获得了一张牌');
							}
						}
						if(this.$givemod){
							this.$givemod(card,player);
						}
						else{
							var node;
							if(get.itemtype(card)=='card'){
								node=card.copy('card','thrown',false);
							}
							else{
								node=ui.create.div('.card.thrown');
							}
							node.dataset.position=this.dataset.position;
							node.fixed=true;
							node.hide();
							node.style.transitionProperty='left,top,opacity';

							node.style.webkitTransform='rotate('+(Math.random()*16-8)+'deg)';

							ui.arena.appendChild(node);
							ui.refresh(node);
							node.show();
							node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*80+'px)';

							setTimeout(function(){
								node.removeAttribute('style');
								node.dataset.position=player.dataset.position;
								node.delete();
							},700);
						}
					}
				},
				$gain:function(card,log){
					if(get.itemtype(card)=='cards'){
						if(log!=false){
							var str=get.translation(this)+'获得了'+get.translation(card[0]);
							for(var i=1;i<card.length;i++){
								str+='、'+get.translation(card[i]);
							}
							game.log(str);
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							for(var i=0;i<card.length;i++){
								this.$gain(card[i],false);
							}
						}
					}
					else if(typeof card=='number'&&card>1){
						if(log!=false){
							game.log(get.translation(this)+'获得了'+get.cnNumber(card)+'张牌');
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							for(var i=0;i<card;i++){
								this.$gain(1,false);
							}
						}
					}
					else{
						if(get.itemtype(card)=='card'&&log!=false){
							game.log(get.translation(this)+'获得了'+get.translation(card));
						}
						if(this.$gainmod){
							this.$gainmod(card);
						}
						else{
							var node;
							if(get.itemtype(card)=='card'){
								node=card.copy('thrown',false);
							}
							else{
								node=ui.create.div('.card.thrown');
								node.moveTo=lib.element.card.moveTo;
							}
							node.fixed=true;
							node.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							node.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*100+'px)';
							node.style.webkitTransform='scale(0)';
							var player=this;
							node.hide();
							ui.arena.appendChild(node);
							ui.refresh(node);
							node.show();
							node.style.webkitTransform='';
							setTimeout(function(){
								node.moveTo(player).delete();
							},700);
						}
					}
				},
				$gain2:function(cards,log){
					if(get.itemtype(cards)=='card') cards=[cards];
					else if(get.itemtype(cards)!='cards') return;
					var list=[];
					for(var i=0;i<cards.length;i++){
						if(cards[i].clone&&cards[i].clone.parentNode==this.parentNode&&
							getComputedStyle(cards[0].clone).opacity){
							cards[i].clone.moveTo(this).delete();
						}
						else{
							list.push(cards[i]);
						}
					}
					if(list.length) this.$draw(list);
				},
				$damage:function(source){
					if(source&&source!=this){
						var left,top;
						if(source.offsetTop==this.offsetTop){
							left=20;
							top=0;
						}
						else{
							var ratio=(source.offsetLeft-this.offsetLeft)/(source.offsetTop-this.offsetTop);
							left=Math.abs(20*ratio/Math.sqrt(1+ratio*ratio));
							top=Math.abs(20/Math.sqrt(1+ratio*ratio));
						}
						if(source.offsetLeft-this.offsetLeft>0) left=-left;
						if(source.offsetTop-this.offsetTop>0) top=-top;
						if(this.isLinked()&&lib.config.layout=='newlayout'){
							this.style.webkitTransform='translate('+left+'px,'+top+'px) rotate(-90deg)';
						}
						else{
							this.style.webkitTransform='translate('+left+'px,'+top+'px)';
						}
					}
					else{
						if(this.isLinked()&&lib.config.layout=='newlayout'){
							this.style.webkitTransform='scale(0.95) rotate(-90deg)';
						}
						else{
							this.style.webkitTransform='scale(0.95)';
						}
					}
					this.queue();
				},
				$die:function(){
					var top0=ui.window.offsetHeight/2;
					var left0=ui.window.offsetWidth/2;
					var ratio=(left0-this.offsetLeft)/(top0-this.offsetTop);
					var left=Math.abs(50*ratio/Math.sqrt(1+ratio*ratio));
					var top=Math.abs(50/Math.sqrt(1+ratio*ratio));
					if(left0-this.offsetLeft>0) left=-left;
					if(top0-this.offsetTop>0) top=-top;
					this.style.webkitTransform='translate('+left+'px,'+top+'px) '+
					'rotate('+(Math.random()*20-10)+'deg) '+
					((Math.random()-0.5<0)?'rotateX(180deg)':'rotateY(180deg)');
					this.queue(false);
				},
				$phaseJudge:function(card){
					var clone=card.copy('thrown',ui.arena).animate('judgestart');
					var player=this;
					clone.style.opacity=0.6;
					clone.style.left='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*50+'px)';
					clone.style.top='calc(50% - 52px '+((Math.random()-0.5<0)?'+':'-')+' '+Math.random()*40+'px)';
					game.delay();
					game.linexy([
						clone.offsetLeft+clone.offsetWidth/2,
						clone.offsetTop+clone.offsetHeight/2,
						player.offsetLeft+player.offsetWidth/2,
						player.offsetTop+player.offsetHeight/2
					],{opacity:0.5,dashed:true});
				}
			},
			card:{
				init:function(card){
					var bg=card[2];
					if(!lib.config.hide_card_image&&lib.card[card[2]].fullskin){
						this.classList.add('fullskin');
						this.node.image.style.backgroundImage='url("image/card/'+card[2]+'.png")'
					}
					else if(lib.card[card[2]].image=='background'){
						if(card[3]) this.node.background.setBackground(bg+'_'+card[3],'card');
						else this.node.background.setBackground(bg,'card');
					}
					else if(lib.card[card[2]].image=='card'){
						if(card[3]) this.setBackground(bg+'_'+card[3],'card');
						else this.setBackground(bg,'card');
					}
					else if(typeof lib.card[card[2]].image=='string'){
						this.setBackground(lib.card[card[2]].image);
					}
					else{
						this.node.background.innerHTML=lib.translate[bg+'_bg']||get.translation(bg)[0];
						// this.node.background.style.fontFamily=lib.config.card_font;
						if(this.node.background.innerHTML.length>1) this.node.background.classList.add('tight');
						else this.node.background.classList.remove('tight');
					}
					if(lib.card[card[2]].color){
						this.style.color=lib.card[card[2]].color;
					}
					if(lib.card[card[2]].textShadow){
						this.style.textShadow=lib.card[card[2]].textShadow;
					}
					if(lib.card[card[2]].opacity){
						this.node.info.style.opacity=lib.card[card[2]].opacity;
						this.node.name.style.opacity=lib.card[card[2]].opacity;
					}
					if(lib.card[card[2]].modinfo){
						this.node.info.innerHTML=lib.card[card[2]].modinfo;
					}
					else{
						this.node.info.innerHTML=get.translation(card[0])+' '+card[1];
					}
					if(lib.card[card[2]].addinfo){
						this.node.addinfo=ui.create.div('.addinfo',this);
						this.node.addinfo.innerHTML=lib.card[card[2]].addinfo;
					}
					if(card[0]=='heart'||card[0]=='diamond'){
						this.node.info.classList.add('red');
					}
					this.node.name.innerHTML='';
					var name=get.translation(card[2]);
					if(card[2]=='sha'){
						if(card[3]=='fire'){
							name='火'+name;
							this.node.image.classList.add('fire');
						}
						else if(card[3]=='thunder'){
							name='雷'+name;
							this.node.image.classList.add('thunder');
						}
					}
					for(var i=0;i<name.length;i++){
						this.node.name.innerHTML+=name[i]+'<br/>';
					}
					if(lib.card[card[2]].subtype=='equip3'){
						this.node.name.innerHTML+='+';
					}
					else if(lib.card[card[2]].subtype=='equip4'){
						this.node.name.innerHTML+='-';
					}
					this.node.name2.innerHTML=get.translation(card[0])+card[1]+' '+name;
					this.suit=card[0];
					this.number=card[1];
					this.name=card[2];
					this.classList.add('card');
					if(card[3]){
						if(lib.nature.contains(card[3])) this.nature=card[3];
						this.classList.add(card[3]);
					}
					if(lib.card[card[2]].subtype) this.classList.add(lib.card[card[2]].subtype);
					if(this.inits){
						for(var i=0;i<lib.element.card.inits.length;i++){
							lib.element.card.inits[i](this);
						}
					}
					if(typeof lib.card[card[2]].init=='function') lib.card[card[2]].init();
					return this;
				},
				aiexclude:function(){
					_status.event.aiexclude.add(this);
				},
				moveTo:function(player,method){
					this.fixed=true;
					this.style.left='';
					this.style.top='';
					this.dataset.position=player.dataset.position;
					if(method=='flip'){
						this.style.transition='all 0.5s';
						this.style.webkitTransform='rotate'+(Math.random()<0.5?'X':'Y')+'(180deg) perspective(1000px)';
					}
					else if(method=='rotate'){
						this.style.transition='all 0.5s';
						this.style.webkitTransform='rotate(180deg)';
					}
					return this;
				},
				copy:function(){
					var node=this.cloneNode(true);
					node.classList.remove('hidden');
					node.classList.remove('start');
					node.classList.remove('thrown');
					node.classList.remove('selectable');
					node.classList.remove('selected');
					node.classList.remove('removing');
					node.node={
						name:node.querySelector('.name'),
						info:node.querySelector('.info'),
						intro:node.querySelector('.intro'),
						background:node.querySelector('.background'),
						image:node.querySelector('.image'),
					}
					var clone=true;
					var position;
					for(var i=0;i<arguments.length;i++){
						if(typeof arguments[i]=='string') node.classList.add(arguments[i]);
						else if(get.objtype(arguments[i])=='div') position=arguments[i];
						else if(typeof arguments[i]=='boolean') clone=arguments[i];
					}
					node.moveTo=lib.element.card.moveTo;
					if(clone) this.clone=node;
					if(position) position.appendChild(node);
					return node;
				}
			},
			button:{
				exclude:function(){
					if(_status.event.excludeButton==undefined){
						_status.event.excludeButton=[];
					}
					_status.event.excludeButton.add(this);
				}
			},
			event:{
				finish:function(){
					this.finished=true;
				},
				goto:function(step){
					this.step=step-1;
				},
				redo:function(){
					this.step--;
				},
				backup:function(skill){
					this._backup={
						filterButton:this.filterButton,
						selectButton:this.selectButton,
						filterTarget:this.filterTarget,
						selectTarget:this.selectTarget,
						filterCard:this.filterCard,
						selectCard:this.selectCard,
						position:this.position,
						forced:this.forced,
						aiexclude:this.aiexclude
					}
					if(skill){
						var info=get.info(skill);
						this.skill=skill;
						this.aiexclude=[];
						if(info.viewAs){
							if(info.filterButton!=undefined) this.filterButton=get.filter(info.filterButton);
							if(info.selectButton!=undefined) this.selectButton=info.selectButton;
							if(info.filterTarget!=undefined) this.filterTarget=get.filter(info.filterTarget);
							if(info.selectTarget!=undefined) this.selectTarget=info.selectTarget;
							if(info.filterCard!=undefined) this.filterCard=get.filter(info.filterCard);
							if(info.selectCard!=undefined) this.selectCard=info.selectCard;
							if(info.position!=undefined) this.position=info.position;
							if(info.forced!=undefined) this.forced=info.forced;
						}
						else{
							this.filterButton=info.filterButton?get.filter(info.filterButton):undefined;
							this.selectButton=info.selectButton;
							this.filterTarget=info.filterTarget?get.filter(info.filterTarget):undefined;
							this.selectTarget=info.selectTarget;
							this.filterCard=info.filterCard?get.filter(info.filterCard):undefined;
							this.selectCard=info.selectCard;
							this.position=info.position;
							this.forced=info.forced;
						}
					}
				},
				restore:function(){
					if(this._backup){
						this.filterButton=this._backup.filterButton;
						this.selectButton=this._backup.selectButton;
						this.filterTarget=this._backup.filterTarget;
						this.selectTarget=this._backup.selectTarget;
						this.filterCard=this._backup.filterCard;
						this.selectCard=this._backup.selectCard;
						this.position=this._backup.position;
						this.forced=this._backup.forced;
						this.aiexclude=this._backup.aiexclude;
					}
					delete this.skill;
				},
				isMine:function(){
					return (this.player&&this.player==game.me&&!_status.auto&&!this.player.isMad());
				},
				trigger:function(name){
					var event=this;
					var i,j,iwhile,next,add;
					var totalPopulation=game.players.length+game.dead.length+1;
					if(event.player&&event.player.removed) return;
					if(!event.player&&name!='gameStart') return;
					event._endTrigger=event.player||game.me;

					if(!game.players.contains(event._endTrigger)){
						event._endTrigger=game.findNext(event._endTrigger);
					}

					var player=event._endTrigger;
					var list=[],others=[];
					for(i=0;i<game.players.length;i++){
						for(j in game.players[i].tempSkills){
							var expire=game.players[i].tempSkills[j];
							if(expire==name||
								(get.objtype(expire)=='array'&&expire.contains(name))||
								(typeof expire=='function'&&expire(event,game.players[i],name))){
								delete game.players[i].tempSkills[j];
								game.players[i].removeSkill(j);
							}
							else if(typeof expire=='object'){
								if(expire.player==name&&event.player==game.players[i]||
									expire.target==name&&event.target==game.players[i]||
									expire.source==name&&event.source==game.players[i]){
									delete game.players[i].tempSkills[j];
									game.players[i].removeSkill(j);
								}
							}
						}
					}
					for(iwhile=0;iwhile<totalPopulation;iwhile++){
						var skills=player.get('s',true).concat(lib.skill.global);
						game.expandSkills(skills);
						for(i=0;i<skills.length;i++){
							var trigger=get.info(skills[i]).trigger;
							if(trigger){
								add=false;
								if(player==event.player&&trigger.player){
									if(typeof trigger.player=='string'){
										if(trigger.player==name) add=true;
									}
									else if(trigger.player.contains(name)) add=true;
								}
								if((player==event.target||
									(event.multitarget&&event.targets&&event.targets.contains(player)))&&
									trigger.target){
									if(typeof trigger.target=='string'){
										if(trigger.target==name) add=true;
									}
									else if(trigger.target.contains(name)) add=true;
								}
								if(player==event.source&&trigger.source){
									if(typeof trigger.source=='string'){
										if(trigger.source==name) add=true;
									}
									else if(trigger.source.contains(name)) add=true;
								}
								if(trigger.global){
									if(typeof trigger.global=='string'){
										if(trigger.global==name) add=true;
									}
									else if(trigger.global.contains(name)) add=true;
								}
								if(add&&player.isOut()==false) list.push([skills[i],player]);
							}
						}
						player=player.next;
						if(!player||player==event._endTrigger){
							break;
						}
					}
					if(list.length){
						list.sort(lib.sort.priority);
						for(i=0;i<list.length;i++){
							if(list[i][1].isOut()||list[i][1].isDead()||list[i][1].removed) continue;
							var next=game.createEvent('trigger',false);
							next.skill=list[i][0];
							next.player=list[i][1];
							next.triggername=name;
							next._trigger=event;
							next.content=function(){
								"step 0"
								var info=get.info(event.skill);
								if(info.filter&&!info.filter(trigger,player,event.triggername)){
									event.finish();
								}
								else{
									var hidden=player.hiddenSkills.slice(0);
									game.expandSkills(hidden);
									if(hidden.contains(event.skill)&&!get.info(event.skill).direct){
										event.trigger('triggerHidden');
									}
								}
								"step 1"
								if(event.cancelled){
									event.finish();
								}
								else{
									event.trigger('triggerBefore');
								}
								"step 2"
								if(event.cancelled){
									event.finish();
									return;
								}
								if(!event.revealed&&!get.info(event.skill).forced){
									if(get.info(event.skill).direct&&player.isUnderControl()){
										game.modeSwapPlayer(player);
										event._result={bool:true};
									}
									else if(get.info(event.skill).frequent&&!lib.config.autoskilllist.contains(event.skill)){
										event._result={bool:true};
									}
									else if(get.info(event.skill).direct&&player==game.me&&!_status.auto){
										event._result={bool:true};
									}
									else{
										var str;
										var check=get.info(event.skill).check;
										if(get.info(event.skill).prompt) str=get.info(event.skill).prompt;
										else str='是否发动【'+get.translation(event.skill)+'】？';
										if(typeof str=='function'){str=str(trigger,player)}
										player.chooseBool(str).ai=function(){
											return !check||check(trigger,player);
										};
									}
								}
								"step 3"
								if(result&&result.bool==false) return;
								var info=get.info(event.skill);
								var next=game.createEvent(event.skill);
								next.player=player;
								next._trigger=trigger;
								next.content=info.content;
								if(info.popup!=false&&!info.direct){
									if(info.popup){
										player.popup(info.popup);
										game.log(get.translation(player)+'发动了'+get.translation(event.skill));
									}
									else{
										player.logSkill(event.skill);
									}
								}
							}
						}
					}
				},
				untrigger:function(all){
					if(all){
						this.next.length=0;
						this._triggered=5;
					}
					else{
						for(var i=0;i<this.next.length;i++){
							if(this.next[i]._trigger==this) this.next.remove(this.next[i]);
						}
					}
				}
			},
			dialog:{
				add:function(item,noclick,zoom){
					if(typeof item=='string'){
						if(noclick){
							var strstr=item;
							item=ui.create.div('',this.content);
							item.innerHTML=strstr;
						}
						else{
							item=ui.create.caption(item,this.content);
						}
					}
					else if(get.objtype(item)=='div'){
						this.content.appendChild(item);
					}
					else if(get.itemtype(item)=='cards'){
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item,'card',buttons,noclick));
					}
					else if(get.itemtype(item)=='players'){
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item,'player',buttons,noclick));
					}
					else{
						var buttons=ui.create.div('.buttons',this.content);
						if(zoom) buttons.classList.add('smallzoom');
						this.buttons=this.buttons.concat(ui.create.buttons(item[0],item[1],buttons,noclick));
					}
					ui.update();
					return item;
				},
				addSmall:function(item,noclick){
					return this.add(item,noclick,true);
				},
				open:function(){
					if(this.noopen) return;
					for(var i=0;i<ui.dialogs.length;i++){
						if(ui.dialogs[i]==this){
							this.show();
							this.refocus();
							ui.dialogs.remove(this);
							ui.dialogs.unshift(this);
							ui.update();
							return this;
						}
						if(ui.dialogs[i].static) ui.dialogs[i].unfocus();
						else ui.dialogs[i].hide();
					}
					ui.dialog=this;
					ui.arena.appendChild(this);
					ui.dialogs.unshift(this);
					ui.update();
					return this;
				},
				close:function(){
					ui.dialogs.remove(this);
					this.delete();
					if(ui.dialogs.length>0){
						ui.dialog=ui.dialogs[0];
						ui.dialog.show();
						ui.dialog.refocus();
						ui.update();
					}
					return this;
				},
				setCaption:function(str){
					this.querySelector('.caption').innerHTML=str;
					return this;
				}
			},
			control:{
				add:function(item){
					var node=document.createElement('div');
					this.appendChild(node);
					node.link=item;
					node.innerHTML=get.translation(item);
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.control);
				},
				close:function(){
					ui.controls.remove(this);
					this.style.width=0;
					this.style.paddingLeft=0;
					this.style.paddingRight=0;
					this.style.marginLeft=0;
					this.style.marginRight=0;
					this.delete();
					if(ui.confirm==this) delete ui.confirm;
					if(ui.skills==this) delete ui.skills;
				},
				replace:function(){
					while(this.childNodes.length) this.firstChild.remove();
					var i,controls;
					if(get.objtype(arguments[0])=='array') controls=arguments[0];
					else controls=arguments;
					delete this.custom;
					for(i=0;i<controls.length;i++){
						if(typeof controls[i]=='function'){
							this.custom=controls[i];
						}
						else{
							this.add(controls[i]);
						}
					}
					if(this.childNodes.length){
						var width=0;
						for(i=0;i<this.childNodes.length;i++) width+=this.childNodes[i].offsetWidth;
						this.style.width=width+'px';
					}
					return this;
				}
			},
		},
		card:{
			list:[],
		},
		filter:{
			all:function(){
				return true;
			},
			buttonIncluded:function(button){
				return !(_status.event.excludeButton&&_status.event.excludeButton.contains(button));
			},
			filterButton:function(button){
				return true;
			},
			cardEnabled:function(card,player,event){
				if(player==undefined) player=_status.event.player;
				var filter=get.info(card).enable;
				if(!filter) return;
				var mod=game.checkMod(card,player,'unchanged','cardEnabled',player.get('s'));
				if(mod!='unchanged') return mod;
				if(typeof filter=='boolean') return filter;
				if(typeof filter=='function') return filter(card,player);
			},
			cardRespondable:function(card,player){
				if(_status.event.name!='chooseToRespond') return true;
				if(player==undefined) player=_status.event.player;
				var mod=game.checkMod(card,player,'unchanged','cardRespondable',player.get('s'));
				if(mod!='unchanged') return mod;
				return true;
			},
			cardUsable:function(card,player,event){
				if(player!=_status.event.player) return true;
				event=event||_status.event;
				if(event.parent.name!='phaseUse') return true;
				if(event.parent.player!=player) return true;
				var num=get.info(card).usable;
				if(typeof num=='function') num=num(card,player);
				num=game.checkMod(card,player,num,'cardUsable',player.get('s'));
				if(typeof num!='number') return true;
				else return(get.cardCount(card,player)<num);
			},
			cardAiIncluded:function(card){
				if(_status.event.isMine()) return true;
				return (_status.event.aiexclude.contains(card)==false);
			},
			filterCard:function(card,player,event){
				return (lib.filter.cardEnabled(card,player,event)&&
					lib.filter.cardUsable(card,player,event));
			},
			targetEnabled:function(card,player,target){
				if(card==undefined) return false;
				var filter=get.info(card).filterTarget;
				var mod=game.checkMod(card,player,target,'unchanged','playerEnabled',player.get('s'));
				if(mod==false) return false;
				var mod=game.checkMod(card,player,target,'unchanged','targetEnabled',target.get('s'));
				if(mod!='unchanged') return mod;
				if(typeof filter=='boolean') return filter;
				if(typeof filter=='function') return filter(card,player,target);
			},
			targetInRange:function(card,player,target){
				var mod=game.checkMod(card,player,target,'unchanged','targetInRange',player.get('s'));
				var extra=0;
				if(mod!='unchanged'){
					if(typeof mod=='boolean') return mod;
					if(typeof mod=='number') extra=mod;
				}
				var range=get.info(card).range;
				if(range==undefined) return true;
				for(var i in range){
					if(range[i]<get.distance(player,target,i)+extra) return false;
				}
				return true;
			},
			filterTarget:function(card,player,target){
				return (lib.filter.targetEnabled(card,player,target)&&
					lib.filter.targetInRange(card,player,target));
			},
			notMe:function(card,player,target){
				return (player!=target)
			},
			isMe:function(card,player,target){
				return (player==target)
			},
			selectCard:function(){
				return [1,1];
			},
			selectTarget:function(){
				var card=get.card(),player=get.player();
				if(card==undefined) return;
				var range;
				var select=get.info(card).selectTarget;
				if(select==undefined){
					if(get.info(card).filterTarget==undefined) return[0,0];
					range=[1,1];
				}
				else if(typeof select=='number') range=[select,select];
				else if(get.itemtype(select)=='select') range=select;
				else if(typeof select=='function') range=select(card,player);
				game.checkMod(card,player,range,'selectTarget',player.get('s'));
				return range;
			},
			judge:function(card,player,target){
				var judges=target.get('j');
				for(var i=0;i<judges.length;i++){
					if(judges[i].name==card.name||judges[i].viewAs==card.name) return false;
				}
				return true;
			},
			autoRespondSha:function(){
				if(this.player.num('h','sha')) return false;
				if(this.player.num('h','hufu')) return false;
				if(this.player.hasSkillTag('respondSha',true)) return false;
				return true;
			},
			autoRespondShan:function(){
				if(this.player.num('h','shan')) return false;
				if(this.player.num('h','hufu')) return false;
				if(this.player.hasSkillTag('respondShan',true)) return false;
				return true;
			},
		},
		sort:{
			random:function(){
				return (Math.random()-0.5);
			},
			seat:function(a,b){
				var player=lib.tempSortSeat||_status.event.player;
				var delta=get.distance(player,a,'absolute')-get.distance(player,b,'absolute');
				if(delta) return delta;
				delta=parseInt(a.dataset.position)-parseInt(b.dataset.position);
				if(player.side==game.me.side) return delta;
				return -delta;
			},
			position:function(a,b){
				return parseInt(a.dataset.position)-parseInt(b.dataset.position);
			},
			priority:function(a,b){
				var i1=get.info(a[0]),i2=get.info(b[0]);
				if(i1.priority==undefined) i1.priority=0;
				if(i2.priority==undefined) i2.priority=0;
				if(i1.priority==i2.priority){
					if(i1.forced==undefined&&i2.forced==undefined) return 0;
					if(i1.forced&&i2.forced) return 0;
					if(i1.forced) return 1;
					if(i2.forced) return -1;
				}
				return i2.priority-i1.priority;
			},
			number:function(a,b){
				return get.number(a)-get.number(b);
			},
			number2:function(a,b){
				return get.number(b)-get.number(a);
			},
		},
		skill:{
			global:[],
			storage:{},
			unequip:{},
			mad:{
				mark:true,
				intro:{
					content:'已进入混乱状态',
					name:'混乱'
				}
			},
			_recoverCheck:{
				trigger:{player:'recoverBefore'},
				forced:true,
				priority:20,
				popup:false,
				filter:function(event,player){
					return player.hp>=player.maxHp;
				},
				content:function(){
					trigger.untrigger();
					trigger.finish();
				},
			},
			_turnover:{
				trigger:{player:'phaseBefore'},
				forced:true,
				priority:20,
				popup:false,
				// filter:function(event,player){
				// 	return player.isTurnedOver();
				// },
				content:function(){
					if(player.isTurnedOver()){
						trigger.untrigger();
						trigger.finish();
						player.turnOver();
						player.phaseSkipped=true;
					}
					else{
						player.phaseSkipped=false;
					}
				},
			},
			_out:{
				trigger:{target:'useCardToBefore',player:['damageBefore','phaseBefore']},
				forced:true,
				popup:false,
				priority:20,
				filter:function(event,player){
					return player.isOut();
				},
				content:function(){
					trigger.untrigger();
					trigger.finish();
				},
				ai:{
					effect:{
						target:function(card,player,target){
							if(target.isOut()) return 0;
						}
					},
					threaten:function(player,target){
						if(target.isOut()) return 0;
					}
				}
			},
			_phasebegin:{
				trigger:{player:'phaseBegin'},
				forced:true,
				priority:20,
				popup:false,
				content:function(){
					player.popup('_phasebegin');
					_status.currentPhase=player;
					game.log();
					game.log(get.translation(player)+'的回合开始');
					game.phaseNumber++;
					var num;
					switch(get.config('auto_identity')){
						case '一轮':num=1;break;
						case '两轮':num=2;break;
						case '三轮':num=3;break;
						default:num=0;break;
					}
					if(num&&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
						player.popup('显示身份');
						_status.identityShown=true;
						game.showIdentity();
					}
					player.ai.tempIgnore=[];
					player.stat.push({card:{},skill:{}});
				},
			},
			_save:{
				trigger:{source:'dying',player:'dying'},
				priority:5,
				forced:true,
				popup:false,
				filter:function(event,player){
					if(event.player.hp>0) return false;
					if(event.source&&event.source!=player) return false;
					return true;
				},
				content:function(){
					"step 0"
					event.dying=_status.dying;
					"step 1"
					trigger.start=trigger.source||trigger.player;
					var str=get.translation(trigger.player.name)+'濒死，是否帮助？';
					_status.dying=event.dying;
					if(player.hasSkillTag('save')||player.num('h','tao')||
					(player==event.dying&&(player.num('h','jiu')||player.num('h','hufu')||player.num('h','tianxianjiu')))){
						player.chooseToUse({
							filterCard:function(card,player){
								var mod=game.checkMod(card,player,'unchanged','cardSavable',player.get('s'));
								if(mod!='unchanged') return mod;
								var savable=get.info(card).savable;
								if(typeof savable=='function') savable=savable(card,player,event.dying);
								return savable;
							},
							filterTarget:trigger.player,
							prompt:str,
							ai1:function(){return 1;},
							ai2:ai.get.effect,
							type:'dying',
							targetRequired:true,
							dying:event.dying
						});
					}
					else{
						event._result={bool:false}
					}
					"step 2"
					if(result.bool){
						if(trigger.player.hp<=0&&trigger.player.isAlive()&&!trigger.player.isOut()&&!trigger.player.removed) event.goto(0);
						else trigger.untrigger();
					}
					else{
						for(var i=0;i<20;i++){
							if(event.player.next!=trigger.start){
								event.player=event.player.next;
								if(!event.player.isOut()){
									event.goto(1);
									break;
								}
							}
							else{
								break;
							}
						}
					}
				}
			},
			_ismin:{
				mod:{
					cardEnabled:function(card,player){
						if(player.isMin()){
							if(get.type(card)=='equip') return false;
						}
					}
				}
			},
			_chongzhu:{
				enable:'phaseUse',
				prompt:'弃置要重铸的牌并摸一张牌',
				filter:function(event,player){
					if(player.isMin()&&lib.config.mode=='stone') return false;
					return (player.get('h',function(card){
						return get.info(card).chongzhu;
					}).length);
				},
				filterCard:function(card){
					return get.info(card).chongzhu;
				},
				prepare:function(cards,player){
					player.$throw(cards,1000);
				},
				discard:false,
				delay:0.5,
				content:function(){
					"step 0"
					player.draw();
					"step 1"
					for(var i=0;i<cards.length;i++){
						ui.discardPile.appendChild(cards[i]);
					}
				},
				ai:{
					basic:{
						order:6
					},
					result:{
						player:1,
					},
				}
			},
			_lianhuan:{
				trigger:{player:'damageAfter'},
				filter:function(event,player){
					return (event.nature&&lib.linked.contains(event.nature)&&event.player.classList.contains('linked'));
				},
				forced:true,
				popup:false,
				content:function(){
					"step 0"
					player.link();
					"step 1"
					var players=game.players.slice(0);
					lib.tempSortSeat=player;
					players.sort(lib.sort.seat);
					delete lib.tempSortSeat;
					for(var i=0;i<players.length;i++){
						if(players[i].classList.contains('linked')){
							if(trigger.source){
								players[i].damage(trigger.num,trigger.nature,trigger.source,trigger.cards,trigger.card);
							}
							else{
								players[i].damage(trigger.num,trigger.nature,'nosource',trigger.cards,trigger.card);
							}
							return;
						}
					}
				}
			},
			_lianhuan2:{
				trigger:{global:'damageAfter'},
				filter:function(event,player){
					return (event.nature&&lib.linked.contains(event.nature)&&event.player.classList.contains('linked')&&
						event.player.classList.contains('dead')&&player.classList.contains('linked'));
				},
				forced:true,
				content:function(){
					"step 0"
					trigger.player.classList.remove('linked');
					"step 1"
					if(trigger.source){
						player.damage(trigger.num,trigger.nature,trigger.source,trigger.cards,trigger.card);
					}
					else{
						player.damage(trigger.num,trigger.nature,'nosource',trigger.cards,trigger.card);
					}
				}
			},
		},
		character:{},
		perfectPair:{},
		group:['wei','shu','wu','qun'],
		nature:['fire','thunder','poison'],
		linked:['fire','thunder'],
	};
	var game={
		version:0.912,
		playAudio:function(){
			var str='';
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
					str+='/'+arguments[i];
				}
			}
			var audio=document.createElement('audio');
			audio.autoplay=true;
			audio.volume=lib.config.volumn_audio/8;
			audio.src='audio'+str+'.mp3';
			audio.addEventListener('ended',function(){
				this.remove();
			});
			audio.onerror=function(){
				this.remove();
			};
			ui.window.appendChild(audio);
		},
		playAudioOgg:function(){
			var str='';
			for(var i=0;i<arguments.length;i++){
				if(typeof arguments[i]==='string'||typeof arguments[i]=='number'){
					str+='/'+arguments[i];
				}
			}
			var audio=document.createElement('audio');
			audio.autoplay=true;
			audio.volume=lib.config.volumn_audio/8;
			audio.src='audio-ogg'+str+'.ogg';
			audio.addEventListener('ended',function(){
				this.remove();
			});
			audio.onerror=function(e){
				this.remove();
			};
			ui.window.appendChild(audio);
		},
		playBackgroundMusic:function(){
			if(lib.config.background_music=='music_off'){
				ui.backgroundMusic.src='';
			}
			else{
				var music=lib.config.background_music;
				if(music=='music_random'){
					music=lib.config.all.background_music.randomGet('music_off','music_random',_status.currentMusic);
				}
				_status.currentMusic=music;
				ui.backgroundMusic.src='audio/background/'+music+'.mp3';
			}
		},
		reload:function(){
			if(_status){
				_status.reloading=true;
			}
			window.location.reload();
		},
		update:function(func){
			lib.updates.push(func);
			if(lib.updates.length===1){
				game.run();
			}
			return func;
		},
		unupdate:function(func){
			lib.updates.remove(func);
		},
		stop:function(){
			cancelAnimationFrame(lib.status.frameId);
		},
		run:function(){
			if(lib.updates.length){
				cancelAnimationFrame(lib.status.frameId);
				lib.status.frameId=requestAnimationFrame(function(time){
					if(lib.status.time!==0){
						lib.status.delayed+=time-lib.status.time;
					}
					lib.status.frameId=requestAnimationFrame(lib.run);
				});
			}
		},
		draw:function(func){
			lib.canvasUpdates.push(func);
			if(!lib.status.canvas){
				lib.status.canvas=true;
				game.update(lib.updateCanvas);
			}
		},
		linexy:function(path){
			var from=[path[0],path[1]];
			var to=[path[2],path[3]];
			var total=typeof arguments[1]==='number'?arguments[1]:lib.config.duration*2;
			var opacity=1;
			var color=[255,255,255];
			var dashed=false;
			if(typeof arguments[1]=='object'){
				for(var i in arguments[1]){
					switch(i){
						case 'opacity':opacity=arguments[1][i];break;
						case 'color':color=arguments[1][i];break;
						case 'dashed':dashed=arguments[1][i];break;
						case 'duration':total=arguments[1][i];break;
					}
				}
			}
			else if(arguments[1]=='fire'||arguments[1]=='thunder'||arguments[1]=='green'){
				color=arguments[1];
			}
			if(color=='fire'){
				color=[255, 146, 68];
			}
			else if(color=='thunder'){
				color=[141, 216, 255];
			}
			else if(color=='green'){
				color=[141, 255, 216];
			}
			var drawfunc=function(time,ctx){
				var current;
				if(time<total/3){
					ctx.strokeStyle='rgba('+color.toString()+','+opacity*(time/(total/3))+')';
					current=[from[0]+(to[0]-from[0])*time/(total/3),
						from[1]+(to[1]-from[1])*time/(total/3)];
				}
				else if(time<=total){
					current=to;
					if(time>total/1.5){
						ctx.strokeStyle='rgba('+color.toString()+','+opacity*(1-(time-total/1.5)/(total-total/1.5))+')';
					}
					else{
						ctx.strokeStyle='rgba('+color.toString()+','+opacity+')';
					}
				}
				else{
					return false;
				}
				ctx.beginPath();
				if(dashed){
					ctx.setLineDash([8,2]);
				}
				ctx.moveTo(from[0],from[1]);
				ctx.lineTo(current[0],current[1]);
				ctx.stroke();
			};
			if(arguments[2]&&lib.config.mode=='chess'){
				game.draw2(drawfunc);
			}
			else{
				game.draw(drawfunc);
			}
		},
		createEvent:function(name,trigger){
			var next={
				name:name,
				step:0,
				finished:false,
				next:[],
				aiexclude:[],
				custom:{
					add:{},
					replace:{}
				},
				_result:{}
			}
			if(trigger!==false) next._triggered=0;
			for(var i in lib.element.event){
				next[i]=lib.element.event[i];
			}
			_status.event.next.push(next);
			return next;
		},
		over:function(result){
			var i,j,k,num,table,tr,td,dialog;
			_status.over=true;
			ui.control.show();
			ui.clear();
			if(result===true) result='战斗胜利';
			if(result===false) result='战斗失败';
			if(result==undefined) result='战斗结束';
			dialog=ui.create.dialog(result);
			if(true){
				if(game.players.length){
					table=document.createElement('table');
					tr=document.createElement('tr');
					tr.appendChild(document.createElement('td'));
					td=document.createElement('td');
					td.innerHTML='伤害';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='受伤';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='摸牌';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='出牌';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='杀敌';
					tr.appendChild(td);
					table.appendChild(tr);
					for(i=0;i<game.players.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.players[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].damage!=undefined) num+=game.players[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].damaged!=undefined) num+=game.players[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].gain!=undefined) num+=game.players[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							for(k in game.players[i].stat[j].card){
								num+=game.players[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.players[i].stat.length;j++){
							if(game.players[i].stat[j].kill!=undefined) num+=game.players[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
				if(game.dead.length){
					table=document.createElement('table');
					table.style.opacity='0.5';
					if(game.players.length==0){
						tr=document.createElement('tr');
						tr.appendChild(document.createElement('td'));
						td=document.createElement('td');
						td.innerHTML='伤害';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='受伤';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='摸牌';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='出牌';
						tr.appendChild(td);
						td=document.createElement('td');
						td.innerHTML='杀敌';
						tr.appendChild(td);
						table.appendChild(tr);
					}
					for(i=0;i<game.dead.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.dead[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].damage!=undefined) num+=game.dead[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].damaged!=undefined) num+=game.dead[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].gain!=undefined) num+=game.dead[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							for(k in game.dead[i].stat[j].card){
								num+=game.dead[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.dead[i].stat.length;j++){
							if(game.dead[i].stat[j].kill!=undefined) num+=game.dead[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
				if(game.additionaldead&&game.additionaldead.length){
					table=document.createElement('table');
					table.style.opacity='0.5';
					for(i=0;i<game.additionaldead.length;i++){
						tr=document.createElement('tr');
						td=document.createElement('td');
						td.innerHTML=get.translation(game.additionaldead[i]);
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].damage!=undefined) num+=game.additionaldead[i].stat[j].damage;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].damaged!=undefined) num+=game.additionaldead[i].stat[j].damaged;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].gain!=undefined) num+=game.additionaldead[i].stat[j].gain;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							for(k in game.additionaldead[i].stat[j].card){
								num+=game.additionaldead[i].stat[j].card[k];
							}
						}
						td.innerHTML=num;
						tr.appendChild(td);
						td=document.createElement('td');
						num=0;
						for(j=0;j<game.additionaldead[i].stat.length;j++){
							if(game.additionaldead[i].stat[j].kill!=undefined) num+=game.additionaldead[i].stat[j].kill;
						}
						td.innerHTML=num;
						tr.appendChild(td);
						table.appendChild(tr);
					}
					dialog.add(ui.create.div('.placeholder'));
					dialog.content.appendChild(table);
				}
			}
			dialog.add(ui.create.div('.placeholder'));
			dialog.add(ui.create.div('.placeholder'));
			if(!ui.restart){
				ui.restart=ui.create.control('restart',game.reload);
			}
			if(lib.storage.test){
				setTimeout(game.reload,500);
			}

			if(ui.auto) ui.auto.hide();
			if(ui.revive){
				ui.revive.close();
				delete ui.revive;
			}
			if(ui.swap){
				ui.swap.close();
				delete ui.swap;
			}
			if(game.onOver) game.onOver(result);
		},
		loop:function(){
			var event=_status.event;
			var step=event.step;
			var source=event.source;
			var player=event.player;
			var target=event.target;
			var targets=event.targets;
			var card=event.card;
			var cards=event.cards;
			var skill=event.skill;
			var forced=event.forced;
			var num=event.num;
			var trigger=event._trigger;
			var result=event._result;
			if(_status.paused||_status.paused2){
				return;
			}
			if(_status.over){
				return;
			}
			if(event.next.length>0){
				var next=event.next.shift();
				if(next.player&&next.player.skipList.contains(next.name)){
					next.player.skipList.remove(next.name);
				}
				else{
					next.parent=event;
					_status.event=next;
				}
			}
			else if(event.finished){
				if(event._triggered==1){
					if(event.type=='card') event.trigger('useCardToCancelled');
					event.trigger(event.name+'Cancelled');
					event._triggered=4;
				}
				else if(event._triggered==2){
					if(event.type=='card') event.trigger('useCardToEnd');
					event.trigger(event.name+'End');
					event._triggered=3;
				}
				else if(event._triggered==3){
					if(event.type=='card') event.trigger('useCardToAfter');
					event.trigger(event.name+'After');
					event._triggered++;
				}
				else{
					if(event.parent){
						if(event.result){
							event.parent._result=event.result;
						}
						_status.event=event.parent;
					}
					else{
						return;
					}
				}
			}
			else{
				if(event._triggered==0){
					if(event.type=='card') event.trigger('useCardToBefore');
					event.trigger(event.name+'Before');
					event._triggered++;
				}
				else if(event._triggered==1){
					if(event.type=='card') event.trigger('useCardToBegin');
					event.trigger(event.name+'Begin');
					event._triggered++;
				}
				else{
					if(player&&player.classList.contains('dead')&&event.name!='phaseLoop'){
						event.finish();
					}
					else if(player&&player.removed&&event.name!='phaseLoop'){
						event.finish();
					}
					else if(player&&player.isOut()&&event.name!='phaseLoop'){
						event.finish();
					}
					else{
						eval(lib.init.parse(event.content))();
					}
					event.step++;
				}
			}
			game.loop();
		},
		pause:function(){
			clearTimeout(_status.timeout);
			_status.paused=true;
		},
		pause2:function(){
			_status.paused2=true;
		},
		resume:function(){
			if(_status.paused){
				_status.paused=false;
				game.loop();
			}
		},
		resume2:function(){
			if(_status.paused2){
				_status.paused2=false;
				game.loop();
			}
		},
		delay:function(time,time2){
			if(_status.paused) return;
			game.pause();
			if(time==undefined) time=1;
			if(time2==undefined) time2=0;
			time=time*lib.config.duration+time2;
			_status.timeout=setTimeout(game.resume,time);
		},
		check:function(event){
			var i,j,range;
			if(event==undefined) event=_status.event;
			var custom=event.custom||{};
			var ok=true,auto=true;
			var player=event.player;
			if(!event.filterButton&&!event.filterCard&&!event.filterTarget&&!event.skill) return;
			if(event.filterButton){
				var dialog=event.dialog;
				range=get.select(event.selectButton);
				if(range[0]!=range[1]||range[0]>1) auto=false;
				for(i=0;i<dialog.buttons.length;i++){
					if(event.filterButton(dialog.buttons[i],player)&&lib.filter.buttonIncluded(dialog.buttons[i])){
						if(ui.selected.buttons.length<range[1]){
							dialog.buttons[i].classList.add('selectable');
						}
						else if(range[1]==-1){
							dialog.buttons[i].classList.add('selected');
							ui.selected.buttons.add(dialog.buttons[i]);
						}
						else{
							dialog.buttons[i].classList.remove('selectable');
						}
					}
					else{
						dialog.buttons[i].classList.remove('selectable');
						if(range[1]==-1){
							dialog.buttons[i].classList.remove('selected');
							ui.selected.buttons.remove(dialog.buttons[i]);
						}
					}
					if(dialog.buttons[i].classList.contains('selected')){
						dialog.buttons[i].classList.add('selectable');
					}
				}
				if(ui.selected.buttons.length<range[0]){
					if(!event.forced||get.selectableButtons().length)
					ok=false;
					if(event.complexSelect||event.parent.name=='chooseCharacter') ok=false;
				}
				if(custom.add.button){
					custom.add.button();
				}
			}
			if(event.filterCard){
				if(ok==false){
					game.uncheck('card');
				}
				else{
					var cards;
					if(event.position){
						cards=player.get(event.position);
					}
					else{
						cards=player.get('h');
					}
					range=get.select(event.selectCard);
					if(range[0]!=range[1]||range[0]>1) auto=false;
					for(i=0;i<cards.length;i++){
						if(event.filterCard(cards[i],player)&&
							lib.filter.cardAiIncluded(cards[i])&&
							(player.isOut()==false||event.includeOutCard)&&
							lib.filter.cardRespondable(cards[i],player)){
							if(ui.selected.cards.length<range[1]){
								cards[i].classList.add('selectable');
							}
							else if(range[1]==-1){
								cards[i].classList.add('selected');
								ui.selected.cards.add(cards[i]);
							}
							else{
								cards[i].classList.remove('selectable');
							}
						}
						else{
							cards[i].classList.remove('selectable');
							if(range[1]==-1){
								cards[i].classList.remove('selected');
								ui.selected.cards.remove(cards[i]);
							}
						}
						if(cards[i].classList.contains('selected')){
							cards[i].classList.add('selectable');
						}
					}
					if(ui.selected.cards.length<range[0]){
						if(!event.forced||get.selectableCards().length)
						ok=false;
						if(event.complexSelect) ok=false;
					}
				}
				if(custom.add.card){
					custom.add.card();
				}
			}
			if(event.filterTarget){
				if(ok==false){
					game.uncheck('target');
				}
				else{
					var card=get.card();
					range=get.select(event.selectTarget);
					if(range[0]!=range[1]||range[0]>1) auto=false;
					for(i=0;i<game.players.length;i++){
						var nochess=true;
						if(lib.config.mode=='chess'){
							if(player&&get.distance(player,game.players[i],'pure')>7){
								nochess=false;
							}
						}
						if(event.filterTarget(card,player,game.players[i])&&
							(game.players[i].isOut()==false||event.includeOutTarget)&&nochess){
							if(ui.selected.targets.length<range[1]){
								game.players[i].classList.add('selectable');
							}
							else if(range[1]==-1){
								game.players[i].classList.add('selected');
								ui.selected.targets.add(game.players[i]);
							}
							else{
								game.players[i].classList.remove('selectable');
							}
						}
						else{
							game.players[i].classList.remove('selectable');
							if(range[1]==-1){
								game.players[i].classList.remove('selected');
								ui.selected.targets.remove(game.players[i]);
							}
						}
						if(game.players[i].classList.contains('selected')){
							game.players[i].classList.add('selectable');
						}
						if(game.players[i].instance){
							if(game.players[i].classList.contains('selected')){
								game.players[i].instance.classList.add('selected');
							}
							else{
								game.players[i].instance.classList.remove('selected');
							}
							if(game.players[i].classList.contains('selectable')){
								game.players[i].instance.classList.add('selectable');
							}
							else{
								game.players[i].instance.classList.remove('selectable');
							}
						}
					}
					if(ui.selected.targets.length<range[0]){
						if(!event.forced||get.selectableTargets().length)
						ok=false;
						if(event.complexSelect) ok=false;
					}
					if(range[1]==-1&&ui.selected.targets.length==0&&event.targetRequired){
						ok=false;
					}
				}
				if(custom.add.target){
					custom.add.target();
				}
			}
			if(!event.skill&&get.noSelected()&&!_status.noconfirm){
				var skills=[],enable,info;
				var skills2=player.get('s').concat(player.hiddenSkills).concat(lib.skill.global);
				game.expandSkills(skills2);
				for(i=0;i<skills2.length;i++){
					info=get.info(skills2[i]);
					enable=false;
					if(typeof info.enable=='function') enable=info.enable(event);
					else if(typeof info.enable=='object') enable=info.enable.contains(event.name);
					else if(info.enable=='phaseUse') enable=(event.parent.name=='phaseUse');
					else if(typeof info.enable=='string') enable=(info.enable==event.name);
					if(enable){
						if(info.filter&&info.filter(event,player)==false) enable=false;
						if(info.viewAs&&event.filterCard&&!event.filterCard(info.viewAs,player)) enable=false;
						if(event.aiexclude.contains(skills2[i])) enable=false;
						if(info.usable&&get.skillCount(skills2[i])>=info.usable) enable=false;
					}
					if(enable){
						skills.add(skills2[i]);
					}
				}
				if(skills.length){
					ui.create.skills(skills);
				}
				else if(ui.skills){
					ui.skills.close();
				}
			}
			else if(ui.skills){
				ui.skills.close()
			}
			_status.multitarget=false;
			var skillinfo=get.info(_status.event.skill);
			if(_status.event.name=='chooseToUse'){
				if(skillinfo&&skillinfo.multitarget&&!skillinfo.multiline){
					_status.multitarget=true;
				}
				if((skillinfo&&skillinfo.viewAs)||!_status.event.skill){
					var cardinfo=get.info(get.card());
					if(cardinfo&&cardinfo.multitarget&&!cardinfo.multiline){
						_status.multitarget=true;
					}
				}
			}
			else if(_status.event.multitarget){
				_status.multitarget=true;
			}
			if(event.isMine()){
				if(ok&&auto&&lib.config.auto_confirm&&(!_status.mousedragging||!_status.mouseleft)&&!_status.mousedown){
					if(ui.confirm){
						if(!skillinfo||!skillinfo.preservecancel){
							ui.confirm.close();
						}
					}
					if(event.skillDialog==true) event.skillDialog=false;
					ui.click.ok();
					_status.mousedragging=null;
				}
				else{
					ui.arena.classList.add('selecting');
					_status.imchoosing=true;
					if(!_status.noconfirm){
						if(!_status.mousedown||_status.mouseleft){
							var str='';
							if(ok) str+='o';
							if(!event.forced&&get.noSelected()) str+='c';
							ui.create.confirm(str);
						}
					}
				}
			}
			return ok;
		},
		uncheck:function(){
			var i,j;
			if(false){
				if(lib.config.mode=='chess'){
					var shadows=ui.chessContainer.getElementsByClassName('playergrid temp');
					while(shadows.length){
						shadows[0].remove();
					}
				}
			}
			if(arguments.length==0){
				while(document.getElementsByClassName('selectable').length>0){
					document.getElementsByClassName('selectable')[0].classList.remove('selectable');
				}
				while(document.getElementsByClassName('selected').length>0){
					document.getElementsByClassName('selected')[0].classList.remove('selected');
				}
				if(_status.event.player){
					var cards=_status.event.player.get('hej');
					for(j=0;j<cards.length;j++){
						cards[j].classList.remove('selected');
						cards[j].classList.remove('selectable');
					}
				}
				ui.selected.buttons.length=0;
				ui.selected.cards.length=0;
				ui.selected.targets.length=0;
			}
			else{
				for(i=0;i<arguments.length;i++){
					if(arguments[i]=='target'){
						for(j=0;j<game.players.length;j++){
							game.players[j].classList.remove('selected');
							game.players[j].classList.remove('selectable');
							if(game.players[j].instance){
								game.players[j].instance.classList.remove('selected');
								game.players[j].instance.classList.remove('selectable');
							}
						}
						ui.selected.targets.length=0;
					}
					else if(arguments[i]=='card'){
						var cards=_status.event.player.get('hej');
						for(j=0;j<cards.length;j++){
							cards[j].classList.remove('selected');
							cards[j].classList.remove('selectable');
						}
						ui.selected.cards.length=0;
					}
				}
			}
			ui.arena.classList.remove('selecting');
			_status.imchoosing=false;
			_status.lastdragchange.length=0;
			_status.mousedragging=null;
			_status.mousedragorigin=null;
			ui.canvas.width=ui.arena.offsetWidth;
			ui.canvas.height=ui.arena.offsetHeight;
			for(var i=0;i<game.players.length;i++){
				game.players[i].unprompt();
			}
		},
		swapSeat:function(player1,player2,prompt,behind){
			if(behind){
				var totalPopulation=game.players.length+game.dead.length+1;
				for(var iwhile=0;iwhile<totalPopulation;iwhile++){
					if(player1.next!=player2){
						game.swapSeat(player1,player1.next,false,false);
					}
					else{
						break;
					}
				}
				if(prompt!=false){
					game.log(get.translation(player1)+'将座位移至'+get.translation(player2)+'后');
				}
			}
			else{
				var temp1,pos,i,num;
				temp1=player1.dataset.position;
				player1.dataset.position=player2.dataset.position;
				player2.dataset.position=temp1;
				game.arrangePlayers();
				if(lib.config.mode!='chess'){
					if(player1.dataset.position=='0'||player2.dataset.position=='0'){
						pos=parseInt(player1.dataset.position);
						if(pos==0) pos=parseInt(player2.dataset.position);
						num=game.players.length+game.dead.length;
						for(i=0;i<game.players.length;i++){
							temp1=parseInt(game.players[i].dataset.position)-pos;
							if(temp1<0) temp1+=num;
							game.players[i].dataset.position=temp1;
						}
						for(i=0;i<game.dead.length;i++){
							temp1=parseInt(game.dead[i].dataset.position)-pos;
							if(temp1<0) temp1+=num;
							game.dead[i].dataset.position=temp1;
						}
					}
				}
				if(prompt!=false){
					game.log(get.translation(player1)+'和'+get.translation(player2)+'交换了座位');
				}
			}
		},
		swapPlayer:function(player,player2){
			if(player2){
				if(player==game.me) game.swapPlayer(player2);
				else if(player2==game.me) game.swapPlayer(player);
			}
			else{
				if(player==game.me) return;
				var pos=parseInt(player.dataset.position);
				var num=game.players.length+game.dead.length;
				var players=game.players.concat(game.dead);
				var temp;
				for(var i=0;i<players.length;i++){
					temp=parseInt(players[i].dataset.position)-pos;
					if(temp<0) temp+=num;
					players[i].dataset.position=temp;
				}
				game.me.node.handcards1.delete();
				game.me.node.handcards2.delete();
				game.me=player;
				ui.handcards1=player.node.handcards1.animate('start').fix();
				ui.handcards2=player.node.handcards2.animate('start').fix();
				ui.me.appendChild(ui.handcards1);
				ui.me.appendChild(ui.handcards2);

				ui.updateh(true);
			}
			if(game.me.isAlive()){
				if(ui.auto) ui.auto.show();
				if(ui.revive){
					ui.revive.close();
					delete ui.revive;
				}
				if(ui.swap){
					ui.swap.close();
					delete ui.swap;
				}
				if(ui.restart){
					ui.restart.close();
					delete ui.restart;
				}
			}
		},
		swapControl:function(player){
			if(player==game.me) return;
			game.me.node.handcards1.delete();
			game.me.node.handcards2.delete();
			game.me=player;
			ui.handcards1=player.node.handcards1.animate('start').fix();
			ui.handcards2=player.node.handcards2.animate('start').fix();
			ui.me.appendChild(ui.handcards1);
			ui.me.appendChild(ui.handcards2);
			ui.updateh(true);

			if(game.me.isAlive()){
				if(ui.auto) ui.auto.show();
				if(ui.revive){
					ui.revive.close();
					delete ui.revive;
				}
				if(ui.swap){
					ui.swap.close();
					delete ui.swap;
				}
				if(ui.restart){
					ui.restart.close();
					delete ui.restart;
				}
			}
		},
		findNext:function(player){
			var players=get.players(lib.sort.position);
			var position=parseInt(player.dataset.position);
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					return players[i];
				}
			}
			return players[0];
		},
		phaseLoop:function(player){
			var next=game.createEvent('phaseLoop');
			next.player=player;
			next.content=function(){
				"step 0"
				player.phase();
				"step 1"
				if(!game.players.contains(event.player.next)){
					event.player=game.findNext(event.player.next);
				}
				else{
					event.player=event.player.next;
				}
				event.goto(0);
			}
		},
		gameDraw:function(player,num){
			var next=game.createEvent('gameDraw');
			next.player=player;
			if(num==undefined) next.num=4;
			else next.num=num;
			next.content=function(){
				"step 0"
				var end=player;
				do{
					player.directgain(get.cards(4));
					if(player.singleHp===true&&!player.classList.contains('unseen')&&!player.classList.contains('unseen2')){
						player.doubleDraw();
					}
					player=player.next;
				}
				while(player!=end);
				"step 1"
				if(get.config('change_card')){
					event.dialog=ui.create.dialog('是否使用手气卡？');
					ui.create.confirm('oc');
					event.custom.replace.confirm=function(bool){
						_status.event.bool=bool;
						game.resume();
					}
				}
				else{
					event.finish();
				}
				"step 2"
				game.pause();
				"step 3"
				if(event.bool){
					game.me.lose(game.me.get('h'))._triggered=null;
				}
				else{
					event.dialog.close();
					ui.confirm.close();
					event.finish();
				}
				"step 4"
				game.delay();
				game.me.gain(get.cards(4))._triggered=null;
				"step 5"
				event.goto(2);
			}
		},
		asyncDraw:function(players,num){
			for(var i=0;i<players.length;i++){
				var num2=1;
				if(typeof num=='number'){
					num2=num;
				}
				else if(Array.isArray(num)){
					num2=num[i];
				}
				players[i].draw(num2,false);
				players[i].$draw(num2);
			}
		},
		finishCards:function(){
			var i,j,k;
			for(i in lib.card){
				var card=lib.card[i];
				if(card.type=='equip'){
					if(card.enable==undefined) card.enable=true;
					if(card.selectTarget==undefined) card.selectTarget=-1;
					if(card.filterTarget==undefined) card.filterTarget=function(card,player,target){
						return target==player;
					};
					if(card.content==undefined) card.content=function(){
						target.equip(card);
					};
					if(card.ai==undefined) card.ai={basic:{}};
					if(card.ai.basic==undefined) card.ai.basic={};
					if(card.ai.result==undefined) card.ai.result={target:1.5};
					if(card.ai.basic.order==undefined) card.ai.basic.order=8;
					if(card.ai.basic.useful==undefined) card.ai.basic.useful=2;
					if(card.subtype=='equip3'){
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=6;
					}
					else if(card.subtype=='equip4'){
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=5;
					}
					else{
						if(card.ai.basic.equipValue==undefined) card.ai.basic.equipValue=1;
					}
					if(card.ai.basic.value==undefined)card.ai.basic.value=function(card,player){
						var value=0;
						var info=get.info(card);
						if(player.get('e',info.subtype[5])&&card!=player.get('e',info.subtype[5])){
							value=ai.get.value(player.get('e',info.subtype[5]),player);
						}
						var equipValue=info.ai.equipValue||info.ai.basic.equipValue;
						if(typeof equipValue=='function') return equipValue(card,player)-value;
						return equipValue-value;
					}
					card.ai.result.target=function(player,target){
						var card=get.card();
						if(card==undefined) return 0;
						var value1=ai.get.value(card,target);
						var value2=0;
						if(target[get.subtype(card)]&&target[get.subtype(card)]!=card)
							value2=ai.get.value(target[get.subtype(card)],target);
						if(value1>value2) return 1;
						return -1;
					};
				}
				else if(card.type=='delay'){
					if(card.enable==undefined) card.enable=true;
					if(card.filterTarget==undefined) card.filterTarget=lib.filter.judge;
					if(card.content==undefined) card.content=function(){
						target.addJudge(card,cards);
					};
				}
			}
			for(i in lib.skill){
				if(lib.skill[i].forbid&&lib.skill[i].forbid.contains(lib.config.mode)){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
					continue;
				}
				if(lib.skill[i].mode&&lib.skill[i].mode.contains(lib.config.mode)==false){
					lib.skill[i]={};
					if(lib.translate[i+'_info']){
						lib.translate[i+'_info']='此模式下不可用';
					}
					continue;
				}
				if(lib.skill[i].viewAs){
					if(lib.skill[i].ai==undefined) lib.skill[i].ai={};
					var skill=lib.skill[i].ai;
					var card=lib.card[lib.skill[i].viewAs.name].ai;
					for(j in card){
						if(skill[j]==undefined) skill[j]=card[j];
						else if(typeof skill[j]=='object'){
							for(var k in card[j]){
								if(skill[j][k]==undefined) skill[j][k]=card[j][k];
							}
						}
					}
				}
				if(lib.skill[i].inherit){
					var skill=lib.skill[lib.skill[i].inherit];
					for(j in skill){
						if(lib.skill[i][j]==undefined) lib.skill[i][j]=skill[j];
					}
					if(lib.translate[i+'_info']==undefined){
						lib.translate[i+'_info']=lib.translate[lib.skill[i].inherit+'_info'];
					}
				}
				if(i[0]=='_'){
					lib.skill.global.add(i);
				}
			}
		},
		checkMod:function(){
			var name=arguments[arguments.length-2];
			var skills=arguments[arguments.length-1].concat(lib.skill.global);
			game.expandSkills(skills);
			var arg=[],i,info;
			for(i=0;i<arguments.length-2;i++){
				arg.push(arguments[i]);
			}
			for(i=0;i<skills.length;i++){
				info=get.info(skills[i]);
				if(info.mod&&info.mod[name]){
					var result=info.mod[name].apply(this,arg);
					if(typeof arg[arg.length-1]!='object'&&result!=undefined) arg[arg.length-1]=result;
				}
			}
			return arg[arg.length-1];
		},
		prepareArena:function(num){
			ui.create.arena();
			ui.create.players(num);
			ui.create.me();
			ui.create.cards();
			game.finishCards();
		},
		log:function(str){
			if(str==undefined) str='';
			var node=ui.create.div();
			node.innerHTML=str;
			ui.sidebar.insertBefore(node,ui.sidebar.firstChild);
			if(lib.config.title) document.title=str;
		},
		save:function(key,value){
			if(_status.reloading) return;
			var config={};
			if(arguments.length>0){
				try{
					config=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
					if(typeof config!='object') throw 'err';
				}
				catch(err){
					config={};
				}
				if(value==undefined){
					delete config[key];
					delete lib.storage[key];
				}
				else{
					config[key]=value;
					lib.storage[key]=value;
				}
			}
			config.version=game.version;
			localStorage.setItem(lib.configprefix+lib.config.mode,JSON.stringify(config));
		},
		updateSave:function(){
			if(_status.reloading) return;
			localStorage.setItem(lib.configprefix+lib.config.mode,JSON.stringify(lib.storage));
		},
		saveConfig:function(key,value,local){
			if(_status.reloading) return;
			var config;
			try{
				config=JSON.parse(localStorage.getItem(lib.configprefix+'config'));
				if(!config||typeof config!='object') throw 'err'
			}
			catch(err){
				config={};
			}
			if(local){
				lib.config.mode_config[lib.config.mode][key]=value;
				key+='_mode_config_'+lib.config.mode;
			}
			else{
				lib.config[key]=value;
			}
			config[key]=value;
			localStorage.setItem(lib.configprefix+'config',JSON.stringify(config));
		},
		addPlayer:function(position,character,character2){
			if(position<0||position>game.players.length+game.dead.length||position==undefined){
				position=Math.ceil(Math.random()*(game.players.length+game.dead.length));
			}
			var players=game.players.concat(game.dead);
			ui.arena.dataset.number=players.length+1;
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					players[i].dataset.position=parseInt(players[i].dataset.position)+1;
				}
			}
			var player=ui.create.player(ui.arena).animate('start');
			if(character) player.init(character,character2);
			game.players.push(player);
			player.dataset.position=position;
			game.arrangePlayers();
			return player;
		},
		addFellow:function(position,character){
			var player=ui.create.player(ui.arena).animate('start');
			player.dataset.position=position||game.players.length+game.dead.length;
			if(character) player.init(character);
			game.players.push(player);game.arrangePlayers();
			return player;
		},
		restorePlayer:function(player){
			if(game.players.contains(player)||game.dead.contains(player)) return;
			var position=parseInt(player.dataset.position);
			if(position<0||position>game.players.length+game.dead.length||position==undefined){
				position=Math.ceil(Math.random()*(game.players.length+game.dead.length));
			}
			var players=game.players.concat(game.dead);
			ui.arena.dataset.number=players.length+1;
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>=position){
					players[i].dataset.position=parseInt(players[i].dataset.position)+1;
				}
			}
			game.players.push(player);
			delete player.removed;
			player.removeAttribute('style');
			player.animate('start');
			ui.arena.appendChild(player);
			game.arrangePlayers();
			return player;
		},
		removePlayer:function(player){
			var players=game.players.concat(game.dead);
			player.style.top=player.offsetTop+'px';
			player.style.left=player.offsetLeft+'px';
			if(player==undefined) player=game.dead[0]||game.me.next;
			var position=parseInt(player.dataset.position);
			for(var i=0;i<players.length;i++){
				if(parseInt(players[i].dataset.position)>position){
					players[i].dataset.position=parseInt(players[i].dataset.position)-1;
				}
			}
			if(player.isAlive()){
				player.next.previous=player.previous;
				player.previous.next=player.next;
			}
			player.nextSeat.previousSeat=player.previousSeat;
			player.previousSeat.nextSeat=player.nextSeat;
			player.delete();
			game.players.remove(player);
			game.dead.remove(player);
			ui.arena.dataset.number=players.length-1;
			player.removed=true;
			if(player==game.me){
				ui.me.hide();
				ui.auto.hide();
			}
			setTimeout(function(){
				player.removeAttribute('style');
			},500);
			return player;
		},
		replacePlayer:function(player,character,character2){
			player.removed=true;
			var position=parseInt(player.dataset.position);
			game.players.remove(player);
			game.dead.remove(player);
			player.delete();
			var player2=ui.create.player(ui.arena).animate('start');
			if(character) player2.init(character,character2);
			game.players.push(player2);
			player2.dataset.position=position;
			player2.nextSeat=player.nextSeat;
			player2.previousSeat=player.previousSeat;
			player2.nextSeat.previousSeat=player2;
			player2.previousSeat.nextSeat=player2;
			var player3=player2.nextSeat;
			while(player3.isDead()) player3=player3.nextSeat;
			player3.previous=player2;
			player2.next=player3;
			var player4=player2.previousSeat;
			while(player4.isDead()) player4=player4.previousSeat;
			player4.next=player2;
			player2.previous=player4;
			return player2;
		},
		arrangePlayers:function(){
			game.players.sort(lib.sort.position);
			var players=game.players.concat(game.dead);
			players.sort(lib.sort.position);
			for(var i=0;i<players.length;i++){
				if(i==0){
					players[i].previousSeat=players[players.length-1];
				}
				else{
					players[i].previousSeat=players[i-1];
				}
				if(i==players.length-1){
					players[i].nextSeat=players[0];
				}
				else{
					players[i].nextSeat=players[i+1];
				}
			}
			for(var i=0;i<game.players.length;i++){
				if(i==0){
					game.players[i].previous=game.players[game.players.length-1];
				}
				else{
					game.players[i].previous=game.players[i-1];
				}
				if(i==game.players.length-1){
					game.players[i].next=game.players[0];
				}
				else{
					game.players[i].next=game.players[i+1];
				}
			}
		},
		filterSkills:function(skills,player){
			var out=skills.slice(0);
			var filter=[];
			for(var i in player.disabledSkills){
				if(typeof player.disabledSkills[i]=='string'){
					filter.add(player.disabledSkills[i]);
				}
				else if(Array.isArray(player.disabledSkills[i])){
					for(var j=0;j<player.disabledSkills[i].length;j++){
						filter.add(player.disabledSkills[i][j]);
					}
				}
			}
			for(var i=0;i<filter.length;i++){
				if(filter[i]){
					out.remove(filter[i]);
				}
			}
			return out;
		},
		expandSkills:function(skills){
			var skills2=[];
			for(var i=0;i<skills.length;i++){
				if(get.info(skills[i]).group) skills2=skills2.concat(get.info(skills[i]).group);
			}
			for(var i=0;i<skills2.length;i++){
				skills.add(skills2[i]);
			}
			return skills;
		},
		css:function(style){
			for(var i in style){
				if(ui.style[i]) ui.style[i].innerHTML=i+JSON.stringify(style[i]).replace(/"/g,"");
				else{
					ui.style[i]=document.createElement('style');
					ui.style[i].innerHTML=i+JSON.stringify(style[i]).replace(/"/g,"");
					document.head.appendChild(ui.style[i]);
				}
			}
		},
		players:[],
		dead:[],
		imported:[],
		phaseNumber:0
	};
	var ui={
		updates:[],
		refresh:function(node){
			void window.getComputedStyle(node, null).getPropertyValue("opacity");
		},
		create:{
			div:function(str,position,position2){
				var str,position,position2,style,divposition;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string') str=arguments[i];
					else if(get.objtype(arguments[i])=='div'||
						get.objtype(arguments[i])=='table'||
						get.objtype(arguments[i])=='tr'||
						get.objtype(arguments[i])=='td'||
						get.objtype(arguments[i])=='body') position=arguments[i];
					else if(typeof arguments[i]=='number') position2=arguments[i];
					else if(get.itemtype(arguments[i])=='divposition') divposition=arguments[i];
					else if(typeof arguments[i]=='object') style=arguments[i];
				}
				if(str==undefined) str='';
				var node=document.createElement('div');
	            for(var i=0;i<str.length;i++){
	                if(str[i]=='.'){
	                    if(node.className.length!=0){
	                        node.className+=' ';
	                    }
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.className+=str[i+1];
	                        i++;
	                    }
	                }
	                else if(str[i]=='#'){
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.id+=str[i+1];
	                        i++;
	                    }
	                }
	            }
	            if(position){
	            	if(typeof position2=='number'&&position.childNodes.length>position2){
	            		position.insertBefore(node,position.childNodes[position2]);
	            	}
	            	else{
	            		position.appendChild(node);
	            	}
	            }
	            if(style) node.css(style);
	            if(divposition) node.setPosition(divposition);
	            return node;
			},
			table:function(){
				var str,row,col,position,position2,fixed,style,divposition;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string') str=arguments[i];
					else if(typeof arguments[i]=='number'){
						if(typeof row=='number'){
							if(typeof col=='number') position2=arguments[i];
							else col=arguments[i];
						}
						else row=arguments[i];
					}
					else if(get.objtype(arguments[i])=='div'||
						get.objtype(arguments[i])=='table'||
						get.objtype(arguments[i])=='tr'||
						get.objtype(arguments[i])=='td'||
						get.objtype(arguments[i])=='body') position=arguments[i];
					else if(typeof arguments[i]=='boolean') fixed=arguments[i];
					else if(get.itemtype(arguments[i])=='divposition') divposition=arguments[i];
					else if(typeof arguments[i]=='object') style=arguments[i];
				}
				if(str==undefined) str='';
				var node=document.createElement('table');
	            for(var i=0;i<str.length;i++){
	                if(str[i]=='.'){
	                    if(node.className.length!=0){
	                        node.className+=' ';
	                    }
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.className+=str[i+1];
	                        i++;
	                    }
	                }
	                else if(str[i]=='#'){
	                    while(str[i+1]!='.'&&str[i+1]!='#'&&i+1<str.length){
	                        node.id+=str[i+1];
	                        i++;
	                    }
	                }
	            }
	            var tr,td;
	            for(var i=0;i<row;i++){
	            	tr=document.createElement('tr');
	            	if(fixed) tr.style.height=(100/row)+'%';
	            	node.appendChild(tr);
	            	for(var j=0;j<col;j++){
	            		td=document.createElement('td');
	            		tr.appendChild(td);
	            	}
	            }
	            if(position){
	            	if(typeof position2=='number'&&position.childNodes.length>position2){
	            		position.insertBefore(node,position.childNodes[position2]);
	            	}
	            	else{
	            		position.appendChild(node);
	            	}
	            }
	            return node;
			},
			groupControl:function(dialog){
				return ui.create.control('wei','shu','wu','qun',function(link,node){
					if(link=='全部'){
						dialog.currentcapt='';
						dialog.currentgroup='';
						for(var i=0;i<dialog.buttons.length;i++){
							dialog.buttons[i].style.display='';
						}
					}
					else{
						if(node.classList.contains('thundertext')){
							dialog.currentgroup=null;
							dialog.currentgroupnode=null;
							node.classList.remove('thundertext');
							for(var i=0;i<dialog.buttons.length;i++){
								if(dialog.currentcapt&&dialog.buttons[i].capt!=dialog.currentcapt){
									dialog.buttons[i].style.display='none';
								}
								else{
									dialog.buttons[i].style.display='';
								}
							}
						}
						else{
							if(dialog.currentgroupnode){
								dialog.currentgroupnode.classList.remove('thundertext');
							}
							dialog.currentgroup=link;
							dialog.currentgroupnode=node;
							node.classList.add('thundertext');
							for(var i=0;i<dialog.buttons.length;i++){
								if(dialog.buttons[i].group!=link||
								(dialog.currentcapt&&dialog.buttons[i].capt!=dialog.currentcapt)){
									dialog.buttons[i].style.display='none';
								}
								else{
									dialog.buttons[i].style.display='';
								}
							}
						}
					}
				});
			},
			cardDialog:function(){
				var args=['thisiscard'];
				for(var i=0;i<arguments.length;i++){
					args.push(arguments[i]);
				}
				return ui.create.characterDialog.apply(this,args);
			},
			characterDialog:function(){
				var filter,str,noclick,thisiscard;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i]==='thisiscard'){
						thisiscard=true;
					}
					else if(typeof arguments[i]==='string'){
						str=arguments[i];
					}
					else if(typeof arguments[i]==='function'){
						filter=arguments[i];
					}
					else if(typeof arguments[i]=='boolean'){
						noclick=arguments[i];
					}
				}
				var list=[];
				var dialog;
				var node=ui.create.div('.caption');
				var namecapt=[];
				var getCapt=function(str){
					if(str.indexOf('_')==-1){
						return str[0];
					}
					return str[str.indexOf('_')+1];
				}
				if(thisiscard){
					for(var i in lib.card){
						if(!lib.translate[i+'_info']) continue;
						if(filter&&filter(i)) continue;
						list.push(['',get.translation(lib.card[i].type),i]);
						if(namecapt.indexOf(getCapt(i))==-1){
							namecapt.push(getCapt(i));
						}
					}
				}
				else{
					for(var i in lib.character){
						if(lib.character[i][4].contains('minskin')) continue;
						if(lib.character[i][4].contains('boss')) continue;
						if(lib.character[i][4].contains('hiddenboss')) continue;
						if(filter&&filter(i)) continue;
						list.push(i);
						if(namecapt.indexOf(getCapt(i))==-1){
							namecapt.push(getCapt(i));
						}
					}
				}
				namecapt.sort(function(a,b){
					return a>b?1:-1;
				});
				var clickCapt=function(e){
					if(_status.dragged) return;
					if(this.classList.contains('thundertext')){
						dialog.currentcapt=null;
						dialog.currentcaptnode=null;
						this.classList.remove('thundertext');
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.currentgroup&&dialog.buttons[i].group!=dialog.currentgroup){
								dialog.buttons[i].style.display='none';
							}
							else{
								dialog.buttons[i].style.display='';
							}
						}
					}
					else{
						if(dialog.currentcaptnode){
							dialog.currentcaptnode.classList.remove('thundertext');
						}
						dialog.currentcapt=this.link;
						dialog.currentcaptnode=this;
						this.classList.add('thundertext');
						for(var i=0;i<dialog.buttons.length;i++){
							if(dialog.buttons[i].capt!=dialog.currentcapt||
							(dialog.currentgroup&&dialog.buttons[i].group!=dialog.currentgroup)){
								dialog.buttons[i].style.display='none';
							}
							else{
								dialog.buttons[i].style.display='';
							}
						}
					}

					e.stopPropagation();
				};
				for(i=0;i<namecapt.length;i++){
					var span=document.createElement('span');
					span.innerHTML=' '+namecapt[i].toUpperCase()+' ';
					span.link=namecapt[i];
					span.addEventListener(lib.config.touchscreen?'touchend':'click',clickCapt);
					node.appendChild(span);
				}
				var groupSort;
				if(thisiscard){
					groupSort=function(name){
						if(lib.card[name[2]].type=='basic') return 0;
						if(lib.card[name[2]].type=='stone') return 0.5;
						if(lib.card[name[2]].type=='stonecharacter') return 1;
						if(lib.card[name[2]].type=='chess') return 1.5;
						if(lib.card[name[2]].type=='trick') return 2;
						if(lib.card[name[2]].type=='delay') return 3;
						if(lib.card[name[2]].type=='equip') return 4;
						if(lib.card[name[2]].type=='zhenfa') return 5;
						return 6;
					};
				}
				else{
					groupSort=function(name){
						if(lib.character[name][1]=='wei') return 0;
						if(lib.character[name][1]=='shu') return 1;
						if(lib.character[name][1]=='wu') return 2;
						if(lib.character[name][1]=='qun') return 3;
					}
				}
				list.sort(function(a,b){
					var del=groupSort(a)-groupSort(b);
					if(del!=0) return del;
					var aa=a,bb=b;
					if(a.indexOf('_')!=-1){
						a=a.slice(a.indexOf('_')+1);
					}
					if(b.indexOf('_')!=-1){
						b=b.slice(b.indexOf('_')+1);
					}
					if(a!=b){
						return a>b?1:-1;
					}
					return aa>bb?1:-1;
				});
				dialog=ui.create.dialog('hidden');
				if(str){
					dialog.add(str);
				}
				dialog.add(node);
				if(thisiscard){
					dialog.add([list,'vcard'],noclick);
				}
				else{
					dialog.add([list,'character'],noclick);
				}
				dialog.add(ui.create.div('.placeholder'));
				for(i=0;i<dialog.buttons.length;i++){
					if(thisiscard){
						dialog.buttons[i].capt=getCapt(dialog.buttons[i].link[2]);
					}
					else{
						dialog.buttons[i].group=lib.character[dialog.buttons[i].link][1];
						dialog.buttons[i].capt=getCapt(dialog.buttons[i].link);
					}
				}
				return dialog;
			},
			dialog:function(){
				var i;
				var hidden=false;
				var dialog=ui.create.div('.dialog');
				dialog.contentContainer=ui.create.div('.content-container',dialog);
				dialog.content=ui.create.div('.content',dialog.contentContainer);
				dialog.bar1=ui.create.div('.bar.top',dialog);
				dialog.bar2=ui.create.div('.bar.bottom',dialog);
				dialog.buttons=[];
				for(i in lib.element.dialog){
					dialog[i]=lib.element.dialog[i];
				}
				for(i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='boolean') dialog.static=arguments[i];
					else if(arguments[i]=='hidden') hidden=true;
					else dialog.add(arguments[i]);
				}
				if(!hidden){
					dialog.open();
				}
				if(!lib.config.touchscreen) dialog.contentContainer.onscroll=ui.update;
				dialog.contentContainer.ontouchstart=ui.click.touchStart;
				dialog.contentContainer.ontouchmove = ui.click.touchScroll;
				dialog.contentContainer.style.WebkitOverflowScrolling='touch';
				return dialog;
			},
			line2:function(){
				var node=ui.create.line.apply(this,arguments);
				node.classList.add('line2');
				return node;
			},
			line:function(){
				var two=false,func;
				var node=ui.create.div('.config');
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='string'||typeof arguments[i]=='number'){
						if(two) ui.create.div('.toggle',node).innerHTML=arguments[i];
						else {
							ui.create.div(node).innerHTML=arguments[i];
							two=true;
						}
					}
					else if(typeof arguments[i]=='function') func=arguments[i];
				}
				if(func){
					for(var i=0;i<node.childNodes.length;i++) node.childNodes[i].listen(func);
				}
				return node;
			},
			switcher:function(name,current,current2){
				var func;
				var node=ui.create.div('.config');
				ui.create.div(node).innerHTML=get.translation(name+'_config');
				var switcher=ui.create.div('.toggle',node);
				switcher.name=name;
				for(var i=0;i<arguments.length;i++){
					if(typeof arguments[i]=='function'){
						func=arguments[i];break;
					}
				}
				if(typeof current=='string'){
					switcher.link=current;
					switcher.innerHTML=get.translation(current);
					switcher.contentEditable=true;
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.editor);
				}
				else if(typeof current=='object'){
					switcher.link=current2||current[0];
					switcher.innerHTML=get.translation(switcher.link);
					switcher.choice=current;
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.switcher);
				}
				else{
					if(current){
						switcher.classList.add('on');
					}
					switcher.classList.add('onoff');
					ui.create.div(ui.create.div(switcher));
					switcher.link=current?true:false;
					switcher.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.toggle);
				}
				if(func) switcher.additionalCommand=func;
				return node;
			},
			caption:function(str,position){
				var caption=ui.create.div('.caption',position);
				caption.innerHTML=str;
				return caption;
			},
			control:function(){
				var i,controls;
				if(get.objtype(arguments[0])=='array') controls=arguments[0];
				else controls=arguments;
				var control=ui.create.div('.control');
				ui.control.insertBefore(control,ui.confirm);
				for(i in lib.element.control){
					control[i]=lib.element.control[i];
				}
				for(i=0;i<controls.length;i++){
					if(typeof controls[i]=='function'){
						control.custom=controls[i];
					}
					else{
						control.add(controls[i]);
					}
				}
				ui.controls.unshift(control);
				if(control.childNodes.length){
					var width=0;
					for(i=0;i<control.childNodes.length;i++) width+=control.childNodes[i].offsetWidth;
					ui.refresh(control);
					control.style.width=width+'px';
					control.style.opacity=1;
				}
				return control;
			},
			confirm:function(str,func){
				if(ui.confirm&&ui.confirm.str==str){
					return;
				}
				if(str=='o'){
					if(ui.confirm){
						ui.confirm.replace('ok');
					}
					else{
						ui.confirm=ui.create.control('ok');
					}
				}
				else if(str=='oc'||str=='co'){
					if(ui.confirm){
						ui.confirm.replace('ok','cancel');
					}
					else{
						ui.confirm=ui.create.control('ok','cancel');
					}
				}
				else if(str=='c'){
					if(ui.confirm){
						ui.confirm.replace('cancel');
					}
					else{
						ui.confirm=ui.create.control('cancel');
					}
				}
				else if(ui.confirm){
					ui.confirm.close();
					delete ui.confirm;
				}
				if(ui.confirm){
					ui.confirm.str=str;
					if(func) ui.confirm.custom=func;
					else delete ui.confirm.custom;
				}
			},
			skills:function(skills){
				var i,same;
				if(ui.skills){
					if(ui.skills.skills.length==skills.length&&ui.skills.style.display!='none'){
						same=true;
						for(i=0;i<skills.length;i++){
							if(ui.skills.skills.contains(skills[i])==false){
								same=false;
								break;
							}
						}
					}
					if(same) return;
					ui.skills.close();
					delete ui.skills;
				}
				if(skills==undefined||skills.length==0) return;
				ui.skills=ui.create.control(skills.concat([ui.click.skill]));
				if(!_status.event.isMine()){
					ui.skills.style.display='none';
				}
				ui.skills.skills=skills;
				return ui.skills;
			},
			arena:function(){
				var i,j;
				ui.window=ui.create.div('#window',document.body).animate('start');
				ui.window.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.window);
				ui.system=ui.create.div("#system.",ui.window);
				ui.arena=ui.create.div('#arena',ui.window);
				ui.backgroundMusic=document.createElement('audio');
				ui.backgroundMusic.volume=lib.config.volumn_background/8;
				game.playBackgroundMusic();
				ui.backgroundMusic.autoplay=true;
				ui.backgroundMusic.addEventListener('ended',game.playBackgroundMusic);
				ui.window.appendChild(ui.backgroundMusic);



				ui.sidebar=ui.create.div('#sidebar');
				ui.sidebar3=ui.create.div('#sidebar3');
				ui.canvas=document.createElement('canvas');
				ui.arena.appendChild(ui.canvas);
				ui.canvas.id='canvas';
				ui.ctx=ui.canvas.getContext('2d');
				ui.configbg=ui.create.div("#click");
				ui.configbg.listen(ui.click.config2);
				ui.configbg.oncontextmenu=ui.click.config2;
				ui.config=ui.create.div('#sidebar2.content');
				ui.config.listen(function(){
					if(_status.reloading) return;
					if(_status.choosing){
						if(!_status.choosing.expand){
							_status.choosing.parentNode.style.height='';
							_status.choosing.nextSibling.delete();
							_status.choosing.previousSibling.show();
							delete _status.choosing;
						}
					}
					_status.clicked=true;
					if(ui.arena.classList.contains('selecting')){
						game.check();
					}
				});
				ui.config.oncontextmenu=function(e){
					e.stopPropagation();
					return false;
				};

				ui.sidebar.ontouchstart=ui.click.touchStart;
				ui.config.ontouchstart=ui.click.touchStart;
				ui.sidebar.ontouchmove = ui.click.touchScroll;
				ui.config.ontouchmove = ui.click.touchScroll;
				ui.sidebar.style.WebkitOverflowScrolling='touch';
				ui.config.style.WebkitOverflowScrolling='touch';
				if(lib.config.right_sidebar){
					ui.sidebar.classList.add('right');
					ui.sidebar3.classList.add('left');
					ui.config.classList.add('right');
				}
				var folditems=[];
				var foldsubitems=[];

				var fold=function(list){
					if(foldsubitems.contains(list)){
						for(var i=0;i<list.length;i++){
							if(!list[i].link.classList.contains('hidden')){
								list[i].link.hide();
								list[i].link.parentNode.style.height='20px';
							}
						}
					}
					for(i=0;i<list.length;i++){
						if(list[i]) list[i].delete();
					}
				}
				var unfold=function(node,list){
					for(var i=0;i<folditems.length;i++){
						if(folditems[i]!=list){
							if(folditems[i]._configstr){
								game.saveConfig(folditems[i]._configstr,false);
							}
							else{
								folditems[i].fold=false;
							}
							fold(folditems[i]);
						}
					}
					for(i=list.length-1;i>=0;i--){
						if(list[i]){
							list[i].animate('start');
							node.parentNode.parentNode.insertBefore(list[i],node.parentNode.nextSibling);
						}
					}
					node.clicked=true;
					setTimeout(function(){
						node.clicked=false;
					},600);
				}


				var newgame=[];
				newgame._configstr='newgame';
				folditems.push(newgame);
				ui.config.appendChild(ui.create.line2('新游戏',function(){
					if(this.clicked) return;
					if(lib.config.newgame){
						game.saveConfig('newgame',false);
						fold(newgame);
					}
					else{
						game.saveConfig('newgame',true);
						unfold(this,newgame);
					}

				}));
				var span1='<div style="width:20px;text-align:center;padding-right:0">-</div>';
				var span2='<div style="width:20px;text-align:center;padding-right:0">·</div>';
				var clickmode=function(){
					game.saveConfig('mode',this.parentNode.link);
					game.reload();
				};
				for(var i=0;i<lib.config.all.mode.length;i++){
					var thismode=lib.config.all.mode[i];
					var line=ui.create.line((lib.config.mode==thismode?span1:span2)+lib.translate[thismode]+'模式',clickmode);
					line.link=thismode;
					newgame.push(line);
				}

				if(!lib.config.modeconfig&&!lib.config.gameconfig&&!lib.config.appearence){
					for(i=0;i<newgame.length;i++){
						ui.config.appendChild(newgame[i]);
					}
				}

				ui.config.appendChild(ui.create.div('.placeholder'));



				var modeconfig=[];
				modeconfig._configstr='modeconfig';
				folditems.push(modeconfig);
				ui.config.appendChild(ui.create.line2(get.translation(lib.config.mode)+'选项',function(){
					if(this.clicked) return;
					if(lib.config.modeconfig){
						game.saveConfig('modeconfig',false);
						fold(modeconfig);
					}
					else{
						game.saveConfig('modeconfig',true);
						unfold(this,modeconfig);
					}
				}));
				for(i=0;i<lib.config.current_mode.length;i++){
					switch(lib.config.current_mode[i]){
						case 'difficulty':
							modeconfig.push(ui.create.switcher('difficulty',['easy','normal','hard'],get.config('difficulty'),ui.click.sidebar.local));break;
						case 'initshow_draw':
							modeconfig.push(ui.create.switcher('initshow_draw',[0,1,2],get.config('initshow_draw'),ui.click.sidebar.local));break;
						case 'ai_strategy':
							modeconfig.push(ui.create.switcher('ai_strategy',
								['ai_strategy_1','ai_strategy_2','ai_strategy_3','ai_strategy_4','ai_strategy_5','ai_strategy_6'],
								get.config('ai_strategy'),ui.click.sidebar.local));break;
						case 'ai_identity':
							modeconfig.push(ui.create.switcher('ai_identity',get.config('ai_identity'),ui.click.sidebar.local));break;
						case 'auto_identity':
							modeconfig.push(ui.create.switcher('auto_identity',['一轮','两轮','三轮','关闭'],get.config('auto_identity'),ui.click.sidebar.auto_identity));break;
						case 'player_number':
							modeconfig.push(ui.create.switcher('player_number',[2,3,4,5,6,7,8],get.config('player_number'),ui.click.sidebar.player_number));break;
						case 'battle_number':
							var battle_number;
							if(lib.config.mode=='chess'){
								battle_number=[2,3,4,6,8];
							}
							else{
								battle_number=[1,2,3,5,8,16];
							}
							modeconfig.push(ui.create.switcher('battle_number',battle_number,get.config('battle_number'),ui.click.sidebar.battle_number));break;
						case 'double_character':
							modeconfig.push(ui.create.switcher('double_character',get.config('double_character'),ui.click.sidebar.local));break;
						case 'double_hp':
							modeconfig.push(ui.create.switcher('double_hp',lib.config.all.double_hp,get.config('double_hp'),ui.click.sidebar.local2));break;
						case 'free_choose':
							modeconfig.push(ui.create.switcher('free_choose',get.config('free_choose'),ui.click.sidebar.free_choose));break;
						case 'change_card':
							modeconfig.push(ui.create.switcher('change_card',get.config('change_card'),ui.click.sidebar.local));break;
						case 'change_choice':
							modeconfig.push(ui.create.switcher('change_choice',get.config('change_choice'),ui.click.sidebar.change_choice));break;
						case 'change_identity':
							modeconfig.push(ui.create.switcher('change_identity',get.config('change_identity'),ui.click.sidebar.change_identity));break;
						case 'swap':
							modeconfig.push(ui.create.switcher('swap',get.config('swap'),ui.click.sidebar.swap));break;
						case 'revive':
							modeconfig.push(ui.create.switcher('revive',get.config('revive'),ui.click.sidebar.revive));break;
						case 'dierestart':
							modeconfig.push(ui.create.switcher('dierestart',get.config('dierestart'),ui.click.sidebar.local2));break;
						case 'ban_weak':
							modeconfig.push(ui.create.switcher('ban_weak',get.config('ban_weak'),ui.click.sidebar.local2));break;
						case 'enhance_zhu':
							modeconfig.push(ui.create.switcher('enhance_zhu',get.config('enhance_zhu'),ui.click.sidebar.local2));break;
						case 'strict_sort':
							modeconfig.push(ui.create.switcher('strict_sort',get.config('strict_sort'),ui.click.sidebar.local));
							modeconfig.push(ui.create.switcher('reverse_sort',get.config('reverse_sort'),ui.click.sidebar.reverse_sort));break;
						default:{
							if(Array.isArray(lib.config.current_mode[i])){
								modeconfig.push(ui.create.switcher.apply(this,lib.config.current_mode[i]));
							}
							else if(typeof lib.config.current_mode[i]==='function'){
								modeconfig.push(lib.config.current_mode[i](game,lib,get,ui));
							}
							else{
								modeconfig.push(ui.create.div('.placeholder'));
							}
						}
					}
				}
				for(i in lib.config.current_mode){
					if(i=='difficulty'&&lib.config.current_mode[i]==true){

					}
					else if(i=='initshow_draw'&&lib.config.current_mode[i]==true){

					}

				}
				if(lib.config.modeconfig){
					for(i=0;i<modeconfig.length;i++){
						ui.config.appendChild(modeconfig[i]);
					}
				}
				var gameconfig=[];
				gameconfig._configstr='gameconfig';
				folditems.push(gameconfig);
				ui.config.appendChild(ui.create.line2('通用选项',function(){
					if(this.clicked) return;
					if(lib.config.gameconfig){
						game.saveConfig('gameconfig',false);
						fold(gameconfig);
					}
					else{
						game.saveConfig('gameconfig',true);
						unfold(this,gameconfig);
					}
				}));

				gameconfig.push(ui.create.switcher('cheat',lib.config.cheat,ui.click.sidebar.cheat));
				gameconfig.push(ui.create.switcher('auto_confirm',lib.config.auto_confirm,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('enable_drag',lib.config.enable_drag,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('duration',[500,700,1000],lib.config.duration,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('hoveration',[700,1000,1500],lib.config.hoveration,ui.click.sidebar.global));
				gameconfig.push(ui.create.div('.placeholder'));
				gameconfig.push(ui.create.switcher('right_click',['pause','config','auto'],lib.config.right_click,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('right_info',lib.config.right_info,ui.click.sidebar.global2));
				gameconfig.push(ui.create.switcher('hover_all',lib.config.hover_all,ui.click.sidebar.hover_all));
				ui.hoverhandcardconfig=ui.create.switcher('hover_handcard',lib.config.hover_handcard,ui.click.sidebar.global);
				gameconfig.push(ui.hoverhandcardconfig);
				if(!lib.config.hover_all) ui.hoverhandcardconfig.classList.add('disabled');
				gameconfig.push(ui.create.switcher('touchscreen',lib.config.touchscreen,ui.click.sidebar.touchscreen));
				gameconfig.push(ui.create.switcher('no_ios_zoom',lib.config.no_ios_zoom,ui.click.sidebar.global));
				ui.handcardmousewheel=ui.create.switcher('mousewheel',lib.config.mousewheel,ui.click.sidebar.mousewheel);
				if(lib.config.touchscreen) ui.handcardmousewheel.classList.add('disabled');
				gameconfig.push(ui.handcardmousewheel);

				gameconfig.push(ui.create.div('.placeholder'));
				gameconfig.push(ui.create.switcher('background_music',lib.config.all.background_music,lib.config.background_music,ui.click.sidebar.background_music));
				gameconfig.push(ui.create.switcher('background_audio',lib.config.background_audio,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('background_speak',lib.config.background_speak,ui.click.sidebar.global));
				gameconfig.push(ui.create.switcher('background_ogg',lib.config.background_ogg,ui.click.sidebar.global));
				gameconfig.push(ui.create.div('.placeholder'));

				if(lib.config.gameconfig){
					for(i=0;i<gameconfig.length;i++){
						ui.config.appendChild(gameconfig[i]);
					}
				}
				switch(lib.config.ui_zoom){
					case '极小':ui.window.style.zoom=0.8;break;
					case '很小':ui.window.style.zoom=0.9;break;
					case '较小':ui.window.style.zoom=0.95;break;
					case '较大':ui.window.style.zoom=1.05;break;
					case '很大':ui.window.style.zoom=1.1;break;
					default:ui.window.style.zoom=1;
				}
				if(lib.config.no_ios_zoom){
					var meta=document.createElement('meta');
					meta.name='viewport';
					meta.content="user-scalable=0";
					document.head.appendChild(meta);
				}

				var appearence=[];
				appearence._configstr='appearence';
				folditems.push(appearence);
				ui.config.appendChild(ui.create.line2('外观选项',function(){
					if(this.clicked) return;
					if(lib.config.appearence){
						game.saveConfig('appearence',false);
						fold(appearence);
					}
					else{
						game.saveConfig('appearence',true);
						unfold(this,appearence);
					}
				}));
				appearence.push(ui.create.switcher('theme',lib.config.all.theme,lib.config.theme,ui.click.sidebar.theme));
				var layoutconfig=ui.create.switcher('layout',lib.config.all.layout,lib.config.layout,ui.click.sidebar.layout);
				appearence.push(layoutconfig);
				if(lib.config.layoutfixed.contains(lib.config.mode)){
					layoutconfig.classList.add('disabled');
				}
				appearence.push(ui.create.switcher('image_background',lib.config.all.image_background,lib.config.image_background,ui.click.sidebar.image_background));
				appearence.push(ui.create.switcher('image_background_filter',lib.config.all.image_background_filter,lib.config.image_background_filter,ui.click.sidebar.image_background_filter));
				appearence.push(ui.create.switcher('ui_zoom',['极小','很小','较小','原始','较大','很大'],lib.config.ui_zoom,ui.click.sidebar.ui_zoom));

				appearence.push(ui.create.div('.placeholder'));
				appearence.push(ui.create.switcher('auto_popped',lib.config.auto_popped,ui.click.sidebar.global));
				appearence.push(ui.create.switcher('only_fullskin',lib.config.only_fullskin,ui.click.sidebar.global2));
				appearence.push(ui.create.switcher('hide_card_image',lib.config.hide_card_image,ui.click.sidebar.global2));
				appearence.push(ui.create.switcher('show_name',lib.config.show_name,ui.click.sidebar.show_name));
				appearence.push(ui.create.switcher('show_replay',lib.config.show_replay,ui.click.sidebar.show_replay));
				appearence.push(ui.create.switcher('show_playerids',lib.config.show_playerids,ui.click.sidebar.show_playerids));
				appearence.push(ui.create.switcher('show_pause',lib.config.show_pause,ui.click.sidebar.show_pause));
				appearence.push(ui.create.switcher('show_auto',lib.config.show_auto,ui.click.sidebar.show_auto));
				appearence.push(ui.create.switcher('show_volumn',lib.config.show_volumn,ui.click.sidebar.show_volumn));
				appearence.push(ui.create.switcher('show_wuxie',lib.config.show_wuxie,ui.click.sidebar.show_wuxie));
				appearence.push(ui.create.switcher('show_discardpile',lib.config.show_discardpile,ui.click.sidebar.global));
				appearence.push(ui.create.div('.placeholder'));
				appearence.push(ui.create.switcher('title',lib.config.title,ui.click.sidebar.title));

				appearence.push(ui.create.switcher('fold_card',lib.config.fold_card,ui.click.sidebar.fold_card));
				appearence.push(ui.create.switcher('threed_card',lib.config.threed_card,ui.click.sidebar.threed_card));
				appearence.push(ui.create.switcher('blur_ui',lib.config.blur_ui,ui.click.sidebar.blur_ui));
				appearence.push(ui.create.switcher('right_sidebar',lib.config.right_sidebar,ui.click.sidebar.right_sidebar));

				// appearence.push(ui.create.div('.placeholder'));
				// appearence.push(ui.create.switcher('intro',['⦿','☯','●','❖','✻','i'],lib.config.intro,ui.click.sidebar.intro));

				// appearence.push(ui.create.switcher('sort',['type_sort','suit_sort','number_sort'],lib.config.sort,ui.click.sidebar.sort));

				if(lib.config.appearence){
					for(i=0;i<appearence.length;i++){
						ui.config.appendChild(appearence[i]);
					}
				}
				ui.config.appendChild(ui.create.div('.placeholder'));
				var characterpack=[];
				folditems.push(characterpack);
				ui.config.appendChild(ui.create.line2('选择武将',function(){
					if(this.clicked) return;
					if(characterpack.fold){
						characterpack.fold=false;
						fold(characterpack);
					}
					else{
						characterpack.fold=true;
						unfold(this,characterpack);
					}

				}));
				var characters=lib.config.all.characters;
				for(i=0;i<characters.length;i++){
					var node=ui.create.switcher(characters[i]+'_character',
						lib.config.characters.contains(characters[i]),ui.click.sidebar.characters);
					node.link=characters[i]+'_character';
					characterpack[i]=node;
				}
				var reset_characterpack=ui.create.div('.config');
				reset_characterpack.innerHTML='恢复默认';
				reset_characterpack.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
					if(_status.dragged) return;
					game.saveConfig('characters',lib.config.defaultcharacters);
					for(var i=0;i<characterpack.length;i++){
						if(characterpack[i].link){
							var pnme=characterpack[i].link.slice(0,characterpack[i].link.indexOf('_character'));
							if(lib.config.defaultcharacters.contains(pnme)){
								if(!characterpack[i].lastChild.classList.contains('on')){
									characterpack[i].querySelector('.toggle').link=true;
									characterpack[i].lastChild.classList.add('on');
								}
							}
							else{
								if(characterpack[i].lastChild.classList.contains('on')){
									characterpack[i].querySelector('.toggle').link=false;
									characterpack[i].lastChild.classList.remove('on');
								}
							}
						}
					}
					ui.sidebarrestart.classList.add('thundertext');
				});
				var all_characterpack=ui.create.div('.config');
				all_characterpack.innerHTML='全部开启';
				all_characterpack.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
					if(_status.dragged) return;
					game.saveConfig('characters',lib.config.all.characters);
					for(var i=0;i<characterpack.length;i++){
						if(characterpack[i].link){
							if(!characterpack[i].lastChild.classList.contains('on')){
								characterpack[i].querySelector('.toggle').link=true;
								characterpack[i].lastChild.classList.add('on');
							}
						}
					}
					ui.sidebarrestart.classList.add('thundertext');
				});
				characterpack.push(reset_characterpack);
				characterpack.push(all_characterpack);

				var cardpack=[];
				folditems.push(cardpack);
				ui.config.appendChild(ui.create.line2('选择卡牌',function(){
					if(this.clicked) return;
					if(cardpack.fold){
						cardpack.fold=false;
						fold(cardpack);
					}
					else{
						cardpack.fold=true;
						unfold(this,cardpack);
					}

				}));
				var cards=lib.config.all.cards;
				for(i=0;i<cards.length;i++){
					var node=ui.create.switcher(cards[i]+'_card',
						lib.config.cards.contains(cards[i]),ui.click.sidebar.cards);
					node.link=cards[i]+'_card';
					cardpack[i]=node;
				}
				var reset_cardpack=ui.create.div('.config');
				reset_cardpack.innerHTML='恢复默认';
				reset_cardpack.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
					if(_status.dragged) return;
					game.saveConfig('cards',lib.config.defaultcards);
					for(var i=0;i<cardpack.length;i++){
						if(cardpack[i].link){
							var pnme=cardpack[i].link.slice(0,cardpack[i].link.indexOf('_card'));
							if(lib.config.defaultcards.contains(pnme)){
								if(!cardpack[i].lastChild.classList.contains('on')){
									cardpack[i].querySelector('.toggle').link=true;
									cardpack[i].lastChild.classList.add('on');
								}
							}
							else{
								if(cardpack[i].lastChild.classList.contains('on')){
									cardpack[i].querySelector('.toggle').link=false;
									cardpack[i].lastChild.classList.remove('on');
								}
							}
						}
					}
					ui.sidebarrestart.classList.add('thundertext');
				});
				var all_cardpack=ui.create.div('.config');
				all_cardpack.innerHTML='全部开启';
				all_cardpack.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
					if(_status.dragged) return;
					game.saveConfig('cards',lib.config.all.cards);
					for(var i=0;i<cardpack.length;i++){
						if(cardpack[i].link){
							if(!cardpack[i].lastChild.classList.contains('on')){
								cardpack[i].querySelector('.toggle').link=true;
								cardpack[i].lastChild.classList.add('on');
							}
						}
					}
					ui.sidebarrestart.classList.add('thundertext');
				});
				cardpack.push(reset_cardpack);
				cardpack.push(all_cardpack);

				var playpack=[];
				folditems.push(playpack);
				ui.config.appendChild(ui.create.line2('游戏玩法',function(){
					if(this.clicked) return;
					if(playpack.fold){
						playpack.fold=false;
						fold(playpack);
					}
					else{
						playpack.fold=true;
						unfold(this,playpack);
					}

				}));
				var plays=lib.config.all.plays;
				for(i=0;i<plays.length;i++){
					var node=ui.create.switcher(plays[i]+'_play',
						lib.config.plays.contains(plays[i]),ui.click.sidebar.plays);
					node.link=plays[i]+'_play';
					playpack[i]=node;
				}
				ui.config.appendChild(ui.create.div('.placeholder'));

				var cardlist=[];
				folditems.push(cardlist);
				ui.config.appendChild(ui.create.line2('游戏资料',function(){
					if(this.clicked) return;
					if(cardlist.fold){
						cardlist.fold=false;
						fold(cardlist);
					}
					else{
						cardlist.fold=true;
						unfold(this,cardlist);
					}

				}));
				ui.cardviewdialog=(function(){
					var dialog=ui.create.cardDialog(true);
					dialog.classList.add('fullheight');
					var stopprop=function(e){e.stopPropagation();return false;};
					var clickpop=function(){
						this.delete();
						if(dialog.popped==this) delete dialog.popped;
					}
					var clickbutt=function(e){
						if(dialog.popped){
							dialog.popped.delete();
							if(dialog.popped.node==this&&dialog.popped.parentNode){
								delete dialog.popped;
								return;
							}
						}
						var uiintro=get.nodeintro(this);
						uiintro.classList.add('popped');
						uiintro.classList.add('static');
						uiintro.addEventListener(lib.config.touchscreen?'touchend':'click',clickpop);
						ui.window.appendChild(uiintro);
						lib.placePoppedDialog(uiintro,e);

						dialog.popped=uiintro;
						dialog.popped.node=this;
					};
					for(var i=0;i<dialog.buttons.length;i++){
						dialog.buttons[i].listen(clickbutt);
					}
					dialog.listen(stopprop);
					dialog.oncontextmenu=stopprop;
					dialog.origin='card';
					dialog.style.zIndex=6;
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					return dialog;
				}());
				cardlist.push(ui.create.line('卡牌一览',function(){
					if(ui.gameviewdialog){
						if(ui.gameviewdialog.popped){
							ui.gameviewdialog.popped.delete();
							delete ui.gameviewdialog.popped;
						}
						ui.gameviewdialog.close();
						ui.arena.classList.remove('paused2');
						if(ui.gameviewdialog.origin=='card'){
							this.classList.remove('thundertext');
							delete ui.gameviewdialog;
							return;
						}
					}
					this.classList.add('thundertext');
					ui.currentgameview=this;
					this.parentNode.nextSibling.firstChild.classList.remove('thundertext');
					ui.arena.classList.add('paused2');
					ui.gameviewdialog=ui.cardviewdialog;
					ui.configbg.appendChild(ui.cardviewdialog);
				}));
				ui.characterviewdialog=(function(){
					var dialog=ui.create.characterDialog(true);
					dialog.classList.add('fullheight');
					var stopprop=function(e){e.stopPropagation();return false;};
					var clickpop=function(){
						this.delete();
						if(dialog.popped==this) delete dialog.popped;
					}
					var clickbutt=function(e){
						if(dialog.popped){
							dialog.popped.delete();
							if(dialog.popped.node==this&&dialog.popped.parentNode){
								delete dialog.popped;
								return;
							}
						}
						var uiintro=get.nodeintro(this);
						uiintro.classList.add('popped');
						uiintro.classList.add('static');
						uiintro.addEventListener(lib.config.touchscreen?'touchend':'click',clickpop);
						ui.window.appendChild(uiintro);
						lib.placePoppedDialog(uiintro,e);

						dialog.popped=uiintro;
						dialog.popped.node=this;
					};
					for(var i=0;i<dialog.buttons.length;i++){
						dialog.buttons[i].listen(clickbutt);
					}
					dialog.listen(stopprop);
					dialog.oncontextmenu=stopprop;
					dialog.origin='character';
					dialog.style.zIndex=6;
					dialog.classList.add('scroll1');
					dialog.classList.add('scroll2');
					return dialog;
				}());
				cardlist.push(ui.create.line('武将一览',function(){
					if(ui.gameviewdialog){
						if(ui.gameviewdialog.popped){
							ui.gameviewdialog.popped.delete();
							delete ui.gameviewdialog.popped;
						}
						ui.gameviewdialog.close();
						ui.arena.classList.remove('paused2');
						if(ui.gameviewdialog.origin=='character'){
							this.classList.remove('thundertext');
							delete ui.gameviewdialog;
							return;
						}
					}
					this.classList.add('thundertext');
					ui.currentgameview=this;
					this.parentNode.previousSibling.firstChild.classList.remove('thundertext');
					ui.arena.classList.add('paused2');
					ui.gameviewdialog=ui.characterviewdialog;
					ui.configbg.appendChild(ui.characterviewdialog);
				}));

				var autoskill=[];
				folditems.push(autoskill);
				ui.autoskill=autoskill;
				ui.config.appendChild(ui.create.line2('自动发动',function(){
					if(this.clicked) return;
					var sks=[];
					if(game.players){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]==game.me||game.players[i].isUnderControl()){
								sks=sks.concat(game.expandSkills(game.players[i].get('s')));
							}
						}
					}
					for(var i=0;i<autoskill.length-1;i++){
						if(!sks.contains(autoskill[i].link)){
							autoskill[i].style.display='none';
						}
						else{
							autoskill[i].style.display='';
						}
					}
					autoskillempty.classList.remove('underlined');
					if(autoskill.fold){
						autoskill.fold=false;
						fold(autoskill);
					}
					else{
						autoskill.fold=true;
						unfold(this,autoskill);
					}

				}));
				if(!lib.config.autoskilllist){
					lib.config.autoskilllist=[];
				}
				var nodex;
				for(i in lib.skill){
					if(lib.skill[i].frequent&&lib.translate[i]){
						lib.translate[i+'_forbid_config']=lib.translate[i];
						nodex=ui.create.switcher(i+'_forbid',
							!lib.config.autoskilllist.contains(i),ui.click.sidebar.autoskill);
						nodex.link=i;
						autoskill.push(nodex);
					}
				}

				var autoskillempty=ui.create.div('.config');
				autoskillempty.listen(function(){
					var sks=[];
					if(game.players){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i]==game.me||game.players[i].isUnderControl()){
								sks=sks.concat(game.expandSkills(game.players[i].get('s')));
							}
						}
					}
					if(this.classList.contains('underlined')){
						this.classList.remove('underlined');
						for(var i=0;i<autoskill.length-1;i++){
							if(!sks.contains(autoskill[i].link)){
								autoskill[i].style.display='none';
							}
							else{
								autoskill[i].style.display='';
							}
						}
					}
					else{
						this.classList.add('underlined');
						for(var i=0;i<autoskill.length-1;i++){
							autoskill[i].style.display='';
						}
					}
				});
				autoskill.push(autoskillempty);
				ui.create.div(autoskillempty).innerHTML='显示所有技能';

				var forbidskill=[];
				folditems.push(forbidskill);
				ui.config.appendChild(ui.create.line2('技能禁配',function(){
					if(this.clicked) return;
					if(forbidskill.fold){
						forbidskill.fold=false;
						fold(forbidskill);
					}
					else{
						forbidskill.fold=true;
						unfold(this,forbidskill);
					}

				}));
				var forbid=lib.config.forbid;
				if(!lib.config.forbidlist){
					var list=[];
					for(i=0;i<forbid.length;i++){
						list.push(true);
					}
					game.saveConfig('forbidlist',list);
				}
				var str,node,omit;
				for(i=0;i<forbid.length;i++){
					str='';
					omit=false;
					for(j=0;j<forbid[i].length;j++){
						if(!lib.skill[forbid[i][j]]){
							omit=true;break;
						}
						str+=get.translation(forbid[i][j])+'+';
					}
					if(omit) continue;
					lib.translate['forbid'+i+'_forbid_config']=str.slice(0,str.length-1);
					node=ui.create.switcher('forbid'+i+'_forbid',
						lib.config.forbidlist[i],ui.click.sidebar.forbid);
					node.link=i;
					forbidskill[i]=node;
				}
				// ui.config.appendChild(ui.create.div('.placeholder'));

				var skilllist=[];
				folditems.push(skilllist);
				foldsubitems.push(skilllist);
				ui.config.appendChild(ui.create.line2('游戏帮助',function(){
					if(this.clicked) return;
					if(skilllist.fold){
						skilllist.fold=false;
						fold(skilllist);
					}
					else{
						skilllist.fold=true;
						unfold(this,skilllist);
					}
				}));
				var skillinfo,skillinfo2;
				var clickskillinfo=function(){
					var node=this.parentNode.link;
					if(node.classList.contains('hidden')){
						node.show();
						setTimeout(function(){
							node.parentNode.style.height=(30+node.parentNode.lastChild.offsetHeight)+'px';
						})
					}
					else{
						node.hide();
						node.parentNode.style.height='20px';
					}
				};
				for(i in lib.help){
						skillinfo=ui.create.line(i,clickskillinfo);
						skillinfo.style.height='20px';
						skillinfo2=ui.create.div('.configinfo');
						skillinfo2.innerHTML=lib.help[i];
						skillinfo2.hide();
						skillinfo.link=skillinfo2;
						skillinfo.appendChild(skillinfo2);
						skilllist.push(skillinfo);
				}
				ui.config.appendChild(ui.create.div('.placeholder'));

				var node=ui.create.div('.config.line2',ui.config);
				ui.create.div(node).innerHTML='重置游戏';
				node.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
					if(_status.dragged) return;
					if(_status.reset){
						this.firstChild.innerHTML='重置游戏';
						_status.reset=false;
					}
					else{
						this.firstChild.innerHTML+=' ●';
						_status.reset=true;
					}
				});

				var node=ui.create.div('.config.line2',ui.config);
				ui.sidebarrestart=node;
				ui.create.div(node).innerHTML='重新开始';
				node.listen(function(){
					if(_status.reset) localStorage.clear();
					ui.arena.hide();
					ui.config.hide();
					setTimeout(game.reload,500);
				});

				if(lib.config.right_sidebar){
					ui.system2=ui.create.div('#system2',ui.system);
					ui.system1=ui.create.div('#system1',ui.system);
				}
				else{
					ui.system1=ui.create.div('#system1',ui.system);
					ui.system2=ui.create.div('#system2',ui.system);
				}
				ui.replay=ui.create.system('重来',game.reload,true);
				ui.pause=ui.create.system('历史',ui.click.pause);
				if(!lib.config.touchscreen){
					lib.setPopped(ui.pause,ui.click.pausehistory,220,400);
				}
				if(!lib.config.show_pause){
					ui.pause.style.display='none';
				}
				ui.config2=ui.create.system('选项',ui.click.config);
				if(!lib.config.touchscreen){
					lib.setPopped(ui.config2,ui.click.pauseconfig,170);
				}
				ui.wuxie=ui.create.system('不询问无懈',ui.click.wuxie,true);
				ui.auto=ui.create.system('托管',ui.click.auto);
				ui.volumn=ui.create.system('♫');
				lib.setPopped(ui.volumn,ui.click.volumn,200);
				// if(lib.config.show_pause) ui.auto.style.marginLeft='10px';
				if(!lib.config.show_volumn){
					ui.volumn.style.display='none';
				}
				if(!lib.config.show_auto){
					ui.auto.style.display='none';
				}
				if(!lib.config.show_wuxie){
					ui.wuxie.style.display='none';
				}
				if(lib.config.touchscreen&&!lib.config.confirmtouch){
					var backtomouse=ui.create.system('返回鼠标模式');
					backtomouse.addEventListener('click',function(){
						game.saveConfig('touchscreen',false);
						game.reload();
					});
					var keeptouch=ui.create.system('确认触屏');
					keeptouch.addEventListener('touchend',function(){
						game.saveConfig('confirmtouch',true);
						keeptouch.remove();
						backtomouse.remove();
					});
				}
				ui.playerids=ui.create.system('显示身份',function(){
					if(game.showIdentity){
						game.showIdentity();
						_status.identityShown=true;
					}
				},true);
				if(!lib.config.show_playerids||!game.showIdentity){
					ui.playerids.style.display='none';
				}
				if(!lib.config.show_replay){
					ui.replay.style.display='none';
				}
				ui.control=ui.create.div('#control',ui.arena);
				ui.cardPile=ui.create.div('#cardPile');
				ui.discardPile=ui.create.div('#discardPile');
				ui.special=ui.create.div('#special');
				ui.dialogs=[];
				ui.controls=[];
				ui.style={};
			},
			system:function(str,func,right){
				var node=ui.create.div(right?ui.system2:ui.system1);
				node.innerHTML=str;
				if(func){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',function(e){
						if(_status.dragged) return;
						func.call(this,e);
					});
				}
				return node;
			},
			pause:function(){
				if(_status.pausing) return;
				var node=ui.create.div("#paused",ui.window);
				_status.pausing=true;
				setTimeout(function(){
					_status.pausing=false;
				},500);
				if(lib.config.touchscreen){
					setTimeout(function(){
						node.addEventListener('touchend',ui.click.resume);
					},500);
				}
				else{
					node.addEventListener('click',ui.click.resume);
				}
				node.oncontextmenu=ui.click.resume;

				var node2=ui.create.div('#paused2',node);
				node2.innerHTML='已暂停';
				node2.listen(function(){
					_status.clicked=true;
					if(ui.sidebar.classList.contains('hidden')){
						ui.sidebar.show();
						ui.sidebar3.show();
					}
					else{
						ui.sidebar.hide();
						ui.sidebar3.hide();
					}
				});
				return node;
			},
			button:function(item,type,position,noclick){
				var node;
				switch(type){
					case 'blank':
					node=ui.create.div('.button.card',position);
					node.link=item;
					break;

					case 'card':
					node=item.cloneNode(true);
					node.classList.add('button');
					position.appendChild(node);
					node.link=item;
					if(item.style.backgroundImage){
						node.style.backgroundImage=item.style.backgroundImage;
						node.style.backgroundSize='cover';
					}
					if(item.style.color){
						node.style.color=item.style.color;
					}
					if(item.nature){
						node.classList.add(item.nature);
					}
					break;

					case 'vcard':
					node=ui.create.card(position,'noclick',noclick).init(item);
					node.classList.add('button');
					node.link=item;
					break;

					case 'character':case 'player':
					node=ui.create.div('.button.character',position);
					node.link=item;
					if(type=='character'){
						node.setBackground(item,'character');
						node.node={
							name:ui.create.div('.name',node),
							hp:ui.create.div('.hp',node),
							intro:ui.create.div('.intro',node),
							group:ui.create.div('.identity',node)
						}
						if(lib.character[item][2]>14){
							node.node.hp.innerHTML=lib.character[item][2];
							node.node.hp.classList.add('text');
						}
						else{
							for(var i =0;i<lib.character[item][2];i++){
								ui.create.div('',node.node.hp);
							}
						}
						if(!lib.config.show_name){
							node.node.name.style.display='none';
						}
						var name=get.translation(item);
						node.node.name.innerHTML='';
						for(var i=0;i<name.length;i++){
							node.node.name.innerHTML+=name[i]+'<br/>';
						}
						node.node.intro.innerHTML=lib.config.intro;
						if(!noclick){
							if(lib.config.touchscreen){
								lib.setLongPress(node,ui.click.intro);
							}
							if(lib.config.right_info){
								node.oncontextmenu=ui.click.rightplayer;
							}
							if(lib.config.hover_all){
								lib.setHover(node,ui.click.hoverplayer);
							}
						}
						node.node.group.innerHTML='<div>'+get.translation(lib.character[item][1])+'</div>';
						node.node.group.style.backgroundColor=get.translation(lib.character[item][1]+'Color');
					}
					else{
						if(item.name.indexOf('unknown')==0){
							node.setBackground(item.name1,'character');
						}
						else{
							node.setBackground(item.name,'character');
						}
					}
					break;

					case 'text':
					node=ui.create.div('.button.text',position);
					node.innerHTML=lib.get.translate(item);
					break;
				}
				if(!noclick){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
				}
				else{
					node.classList.add('noclick');
					if(node.querySelector('.intro')){
						node.querySelector('.intro').remove();
					}
				}
				for(var i in lib.element.button){
					node[i]=lib.element.button[i];
				}
				return node;
			},
			buttons:function(list,type,position,noclick,zoom){
				var buttons=[];
				for(var i=0;i<list.length;i++){
					buttons.push(ui.create.button(list[i],type,position,noclick));
				}
				return buttons;
			},
			player:function(position){
				var node=ui.create.div('.player',position);
				node.node={
					avatar:ui.create.div('.avatar',node).hide(),
					avatar2:ui.create.div('.avatar2',node).hide(),
					intro:ui.create.div('.intro',node),
					identity:ui.create.div('.identity',node),
					hp:ui.create.div('.hp',node),
					name:ui.create.div('.name',node),
					count:ui.create.div('.count',node).hide(),
					equips:ui.create.div('.equips',node),
					judges:ui.create.div('.judges',node),
					marks:ui.create.div('.marks',node),
					handcards1:ui.create.div('#handcards1'),
					handcards2:ui.create.div('#handcards2'),
				};

				node.skipList=[];
				node.skills=[];
				node.initedSkills=[];
				node.additionalSkills={};
				node.disabledSkills={};
				node.hiddenSkills=[];
				node.forbiddenSkills=[];
				node.modeSkills=[];
				node.popups=[];
				node.stat=[{card:{},skill:{}}];
				node.tempSkills={};
				node.storage={};
				node.marks={};
				node.ai={friend:[],enemy:[],neutral:[]};
				node.queueCount=0;

				if(lib.config.mousewheel&&!lib.config.touchscreen){
					node.node.handcards1.onmousewheel=ui.click.mousewheel;
					node.node.handcards2.onmousewheel=ui.click.mousewheel;
					// node.node.equips.onmousewheel=ui.click.mousewheel;
				}

				node.node.handcards1.ontouchstart = ui.click.touchStart;
				node.node.handcards2.ontouchstart = ui.click.touchStart;
				node.node.handcards1.ontouchmove = ui.click.touchScroll;
				node.node.handcards2.ontouchmove = ui.click.touchScroll;
				node.node.handcards1.style.WebkitOverflowScrolling='touch';
				node.node.handcards2.style.WebkitOverflowScrolling='touch';

				for(var i in lib.element.player){
					node[i]=lib.element.player[i];
				}
				ui.create.div(node.node.identity);
				node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.target);
				node.node.identity.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.identity);
				return node;
			},
			players:function(num){
				if(num===0){
					return;
				}
				if(num==undefined) num=lib.config.mode_config[lib.config.mode].player_number;
				if(num==undefined) num=5;
				for(var i=0;i<num;i++){
					var player=ui.create.player(ui.arena).animate('start');
					game.players.push(player);
					player.dataset.position=i;
				}
				var players=game.players;
				for(var i=0;i<players.length;i++){
					if(i>0){
						players[i].previous=players[i-1];
						players[i].previousSeat=players[i-1];
					}
					if(i<players.length-1){
						players[i].next=players[i+1];
						players[i].nextSeat=players[i+1];
					}
				}
				players[0].previous=players[players.length-1];
				players[0].previousSeat=players[players.length-1];
				players[players.length-1].next=players[0];
				players[players.length-1].nextSeat=players[0];
				ui.arena.dataset.number=num;
			},
			me:function(){
				ui.mebg=ui.create.div('#mebg',ui.arena);
				ui.me=ui.create.div('#me',ui.arena).animate('start');
				if(game.players.length){
					game.me=game.players[0];
					ui.handcards1=game.me.node.handcards1;
					ui.handcards2=game.me.node.handcards2;
					ui.me.appendChild(ui.handcards1);
					ui.me.appendChild(ui.handcards2);
					ui.updateh(true);
				}
			},
			card:function(position,info,noclick){
				var node=ui.create.div('.card',position);
				node.node={
					image:ui.create.div('.image',node),
					info:ui.create.div('.info',node),
					name:ui.create.div('.name',node),
					name2:ui.create.div('.name2',node),
					background:ui.create.div('.background',node),
					intro:ui.create.div('.intro',node),
				}
				for(var i in lib.element.card){
					node[i]=lib.element.card[i];
				}
				node.node.intro.innerHTML=lib.config.intro;
				if(!noclick){
					if(lib.config.touchscreen){
						lib.setLongPress(node,ui.click.intro);
					}
					if(lib.config.right_info){
						node.oncontextmenu=ui.click.rightplayer;
					}
					if(lib.config.hover_all){
						lib.setHover(node,ui.click.hoverplayer);
					}
				}
				node.storage={};
				if(info!='noclick'){
					node.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.card);
				}
				return node;
			},
			cards:function(random){
				if(!random){
					lib.card.list.randomSort();
				}
				for(var i=0;i<lib.card.list.length;i++){
					if(lib.card[lib.card.list[i][2]]){
						ui.create.card(ui.cardPile).init(lib.card.list[i]);
					}
				}
			},
		},
		click:{
			pausehistory:function(){
				if(!lib.config.auto_popped) return;
				if(!ui.sidebar.childNodes.length) return;
				var uiintro=ui.create.dialog('hidden');
				uiintro.style.maxHeight='400px';
				uiintro.add(ui.sidebar);
				return uiintro;
			},
			pauseconfig:function(){
				if(!lib.config.auto_popped) return;
				if(!ui.config.childNodes.length) return;
				var uiintro=ui.create.dialog('hidden');
				var rows=Math.ceil(lib.config.all.mode.length/3);
				for(var k=0;k<rows;k++){
					var node=ui.create.div('.newgame');
					for(var i=0;i<3&&i+k*3<lib.config.all.mode.length;i++){
						var thismode=lib.config.all.mode[i+k*3];
						var div=ui.create.div(thismode==lib.config.mode?'.underlinenode.on':'.underlinenode',node);
						div.innerHTML=lib.translate[thismode];
						div.link=thismode;
						div.addEventListener(lib.config.touchscreen?'touchend':'click',function(){
							game.saveConfig('mode',this.link);
							game.reload();
						});
					}
					uiintro.add(node);
				}

				var auto=null;
				var ng=null;
				var sks=[];
				var autoskill=ui.autoskill;
				if(game.players){
					for(var i=0;i<game.players.length;i++){
						if(game.players[i]==game.me||game.players[i].isUnderControl()){
							sks=sks.concat(game.expandSkills(game.players[i].get('s')));
						}
					}
				}
				for(var i=0;i<autoskill.length-1;i++){
					if(sks.contains(autoskill[i].link)){
						if(!auto){
							ng=ui.create.div('.text');
							ng.style.marginBottom=0;
							ng.innerHTML='新游戏';
							uiintro.content.insertBefore(ng,uiintro.content.firstChild);

							auto=ui.create.div('.text');
							auto.style.marginBottom=0;
							auto.innerHTML='自动发动';
							uiintro.add(auto);
						}
						autoskill[i].style.display='';
						uiintro.add(autoskill[i]);
					}
				}

				return uiintro;
			},
			volumn:function(){
				var uiintro=ui.create.dialog('hidden');
				uiintro.add('背景音乐');
				var vol1=ui.create.div('.volumn');
				uiintro.add(vol1);
				for(var i=0;i<8;i++){
					var span=document.createElement('span');
					span.link=i+1;
					span.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.volumn_background);
					if(i<lib.config.volumn_background){
						span.innerHTML='●';
					}
					else{
						span.innerHTML='○';
					}
					vol1.appendChild(span);
				}
				uiintro.add('游戏音效');

				var vol2=ui.create.div('.volumn');
				uiintro.add(vol2);
				for(var i=0;i<8;i++){
					var span=document.createElement('span');
					span.link=i+1;
					span.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.volumn_audio);
					if(i<lib.config.volumn_audio){
						span.innerHTML='●';
					}
					else{
						span.innerHTML='○';
					}
					vol2.appendChild(span);
				}
				uiintro.add(ui.create.div('.placeholder'));
				return uiintro;
			},
			volumn_background:function(e){
				if(_status.dragged) return;
				game.saveConfig('volumn_background',this.link);
				ui.backgroundMusic.volume=this.link/8;
				for(var i=0;i<8;i++){
					if(i<lib.config.volumn_background){
						this.parentNode.childNodes[i].innerHTML='●';
					}
					else{
						this.parentNode.childNodes[i].innerHTML='○';
					}
				}
				e.stopPropagation();
			},
			volumn_audio:function(e){
				if(_status.dragged) return;
				game.saveConfig('volumn_audio',this.link);
				for(var i=0;i<8;i++){
					if(i<lib.config.volumn_audio){
						this.parentNode.childNodes[i].innerHTML='●';
					}
					else{
						this.parentNode.childNodes[i].innerHTML='○';
					}
				}
				e.stopPropagation();
			},
			hoverpopped:function(){
				if(this._uiintro){
					return;
				}
				if(!this._poppedfunc){
					return;
				}
				var uiintro=this._poppedfunc();
				if(!uiintro) return;
				if(ui.currentpopped&&ui.currentpopped._uiintro){
					ui.currentpopped._uiintro.delete();
					delete ui.currentpopped._uiintro;
				}
				ui.currentpopped=this;
				uiintro.classList.add('popped');
				uiintro.classList.add('static');
				this._uiintro=uiintro;

				ui.window.appendChild(uiintro);
				var width=this._poppedwidth||330;
				uiintro.style.width=width+'px';

				var height=this._poppedheight||uiintro.content.scrollHeight;
				uiintro.style.height=Math.min(ui.window.offsetHeight-260,height)+'px';
				uiintro.style.top='50px';
				var left=this.parentNode.offsetLeft+this.offsetLeft+this.offsetWidth/2-width/2;
				if(left<10){
					left=10;
				}
				else if(left+width>ui.window.offsetWidth-10){
					left=ui.window.offsetWidth-width-10;
				}
				uiintro.style.left=left+'px';
				uiintro._poppedorigin=this;
				uiintro.addEventListener(lib.config.touchscreen?'touchend':'mouseleave',ui.click.leavehoverpopped);
			},
			leavehoverpopped:function(){
				if(_status.dragged) return;
				this.delete();
				var button=this._poppedorigin
				setTimeout(function(){
					delete button._uiintro;
				},500);
			},
			dierevive:function(){
				if(game.me.isDead()){
					game.me.revive(1);
					game.me.draw(2);
				}
				else{
					if(ui.revive){
						ui.revive.close();
						delete ui.revive;
					}
				}
			},
			dieswap:function(){
				if(game.me.isDead()){
					_status.clicked=true;
					var i,translation,intro,str;
					if(ui.intro){
						ui.intro.close();
						if(ui.intro.source=='dieswap'){
							delete ui.intro;
							ui.control.show();
							game.resume2();
							return;
						}
					}
					game.pause2();
					ui.control.hide();
					ui.intro=ui.create.dialog();
					ui.intro.source='dieswap';

					var players=[];
					for(var i=0;i<game.players.length;i++){
						if(game.players[i].isAlive()){
							players.push(game.players[i]);
						}
					}
					ui.intro.add(players,true);
					var buttons=ui.intro.querySelectorAll('.button');
					for(var i=0;i<buttons.length;i++){
						buttons[i].addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.dieswap2);
					}
				}
				else{
					if(ui.swap){
						ui.swap.close();
						delete ui.swap;
					}
				}
			},
			dieswap2:function(){
				if(_status.dragged) return;
				game.swapPlayer(this.link);
			},
			windowmousemove:function(e){
				if(e.button==2) return;
				if(!Array.isArray(e.path)) return;
				var dialogs=document.querySelectorAll('#window>.dialog.popped:not(.static)');
				for(var i=0;i<dialogs.length;i++){
					dialogs[i].delete();
				}
				var node=_status.currentmouseenter;

				if(_status.mousedragging){
					e.preventDefault();
					ui.canvas.width=ui.arena.offsetWidth;
					ui.canvas.height=ui.arena.offsetHeight;
					var ctx=ui.ctx;
					ctx.shadowBlur=5;
					ctx.shadowColor='rgba(0,0,0,0.3)';
					ctx.fillStyle='white';
					ctx.strokeStyle='white';
					ctx.lineWidth=3;
					ctx.setLineDash([8,2]);

					ctx.beginPath();

					ctx.moveTo(_status.mousedragging.x-ui.arena.offsetLeft,_status.mousedragging.y-ui.arena.offsetTop);
					if(_status.multitarget){
						for(var i=0;i<_status.lastdragchange.length;i++){
							var exy=_status.lastdragchange[i]._lastdragchange;
							ctx.lineTo(exy[0],exy[1]);
						}
					}
					if(!_status.selectionfull){
						ctx.lineTo(e.x-ui.arena.offsetLeft,e.y-ui.arena.offsetTop);
					}
					ctx.stroke();
					if(!_status.multitarget){
						for(var i=0;i<_status.lastdragchange.length;i++){
							ctx.moveTo(_status.mousedragging.x-ui.arena.offsetLeft,_status.mousedragging.y-ui.arena.offsetTop);
							var exy=_status.lastdragchange[i]._lastdragchange;
							ctx.lineTo(exy[0],exy[1]);
							ctx.stroke();
						}
					}


					for(var i=0;i<e.path.length;i++){
						if(e.path[i]==_status.mousedragorigin){
							if(_status.mouseleft){
								_status.mousedragging=null;
								_status.mousedragorigin=null;
								_status.clicked=false;
								game.uncheck();
								game.check();
								ui.canvas.width=ui.arena.offsetWidth;
								ui.canvas.height=ui.arena.offsetHeight;
								_status.clicked=true;
							}
							return;
						}
						var itemtype=get.itemtype(e.path[i]);
						if(itemtype=='card'||itemtype=='button'||itemtype=='player'){
							_status.mouseleft=true;
							var item=e.path[i];
							var ex=e.x-ui.arena.offsetLeft;
							var ey=e.y-ui.arena.offsetTop;
							var exx=ex,eyy=ey;
							if(lib.config.mode=='chess'){
								ex-=-ui.chessContainer.scrollLeft+ui.chess.offsetLeft;
								ey-=-ui.chessContainer.scrollTop+ui.chess.offsetTop;
							}
							if(itemtype!='player'||(ex>item.offsetLeft&&ex<item.offsetLeft+item.offsetWidth&&
								ey>item.offsetTop&&ey<item.offsetTop+item.offsetHeight)){
								if(item.classList.contains('selectable')&&_status.dragstatuschanged!=item){
									_status.mouseleft=true;
									_status.dragstatuschanged=item;
									_status.clicked=false;
									var notbefore=itemtype=='player'&&!item.classList.contains('selected');
									ui.click[itemtype].call(item);
									if(item.classList.contains('selected')){
										if(notbefore){
											_status.lastdragchange.push(item);
											e.path[i]._lastdragchange=[exx,eyy];
										}
									}
									else{
										_status.lastdragchange.remove(item);
									}
									_status.selectionfull=true;
									if(_status.event.filterButton&&ui.selected.buttons.length<get.select(_status.event.selectButton)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterCard&&ui.selected.cards.length<get.select(_status.event.selectCard)[1]){
										_status.selectionfull=false;
									}
									else if(_status.event.filterTarget&&ui.selected.targets.length<get.select(_status.event.selectTarget)[1]){
										_status.selectionfull=false;
									}
								}
							}
							return;
						}
					}
					_status.mouseleft=true;
					_status.dragstatuschanged=null;
				}
				else{
					if(e.path.contains(node)&&!node._mouseentercreated){
						ui.click.mouseentercancel();
						var hoveration;
						if(typeof node._hoveration=='number'){
							hoveration=node._hoveration;
						}
						else{
							hoveration=lib.config.hoveration;
							if(node.classList.contains('button')||
								(node.parentNode&&node.parentNode.parentNode)==ui.me){
								hoveration+=500;
							}
						}
						_status._mouseentertimeout=setTimeout(function(){
							if(_status.currentmouseenter!=node||node._mouseentercreated||
								_status.mousedragging||_status.mousedown||!node.offsetWidth||!node.offsetHeight){
								return;
							}
							if(node._hoverfunc){
								var dialog=node._hoverfunc.call(node,e);
								dialog.classList.add('popped');
								ui.window.appendChild(dialog);
								lib.placePoppedDialog(dialog,e);
								if(node._hoverwidth){
									dialog.style.width=node._hoverwidth+'px';
									dialog._hovercustomed=true;
								}
								node._mouseenterdialog=dialog;
								node._mouseentercreated=true;
							}
						},hoveration);
					}
					if(_status.draggingdialog){
						var ddialog=_status.draggingdialog;
						if(ddialog._dragorigin&&ddialog._dragtransform){
							var translate=ddialog._dragtransform.slice(0);
							translate[0]+=e.x-ddialog._dragorigin.x;
							translate[1]+=e.y-ddialog._dragorigin.y;
							ddialog.style.webkitTransform='translate('+translate[0]+'px,'+translate[1]+'px)'
						}
					}
				}
			},
			windowmousedown:function(e){
				if(e.button==2) return;
				_status.mousedown=true;
				var dialogs=ui.window.querySelectorAll('#window>.dialog.popped:not(.static)');
				for(var i=0;i<dialogs.length;i++){
					dialogs[i].delete();
				}

				for(var i=0;i<e.path.length;i++){
					var itemtype=get.itemtype(e.path[i]);
					if(itemtype=='button') break;
					if(itemtype=='dialog'&&!e.path[i].classList.contains('popped')){
						var ddialog=e.path[i];
						_status.draggingdialog=ddialog;
						ddialog._dragorigin=e;
						if(!ddialog._dragtransform){
							ddialog._dragtransform=[0,0];
						}
						return;
					}
				}

				var evt=_status.event;
				if(!lib.config.enable_drag) return;
				if(!ui.arena.classList.contains('selecting')) return;
				if(!evt.isMine()) return;
				if(!Array.isArray(e.path)) return;
				for(var i=0;i<e.path.length;i++){
					var itemtype=get.itemtype(e.path[i]);
					if(itemtype=='card'||itemtype=='button'||itemtype=='player'){
						if(e.path[i].classList.contains('selectable')&&
							!e.path[i].classList.contains('selected')&&
							!e.path[i].classList.contains('noclick')){
							_status.clicked=false;
							ui.click[itemtype].call(e.path[i]);
							if(e.path[i].classList.contains('selected')){
								_status.mousedragging=e;
								_status.mousedragorigin=e.path[i];
								_status.mouseleft=false;
								_status.selectionfull=false;
								_status.multitarget=false;
							}
						}
						return;
					}
				}
			},
			windowmouseup:function(e){
				if(_status.draggingdialog){
					var ddialog=_status.draggingdialog;
					if(ddialog._dragorigin&&ddialog._dragtransform){
						var translate=ddialog._dragtransform;
						translate[0]+=e.x-ddialog._dragorigin.x;
						translate[1]+=e.y-ddialog._dragorigin.y;
						ddialog.style.webkitTransform='translate('+translate[0]+'px,'+translate[1]+'px)';
						delete ddialog._dragorigin;
					}
					delete _status.draggingdialog;
				}
				if(e.button==2){
					if(_status.mousedragging){
						_status.mousedragging=null;
						_status.mouseleft=false;
						_status.mousedragorigin=null;
						_status.dragstatuschanged=false;
						ui.canvas.width=ui.arena.offsetWidth;
						ui.canvas.height=ui.arena.offsetHeight;
						game.uncheck();
						game.check();
						_status.noright=true;
					}
				}
				else{
					var tmpflag=false;
					_status.mousedown=false;
					if(_status.mousedragging&&_status.mouseleft){
						if(game.check()){
							if(ui.confirm){
								ui.confirm.close();
							}
							ui.click.ok();
						}
						else{
							game.uncheck();
							game.check();
						}
					}
					else if(_status.mousedragging&&_status.mousedragorigin){
						tmpflag=_status.mousedragorigin;
					}
					_status.lastdragchange.length=0;
					_status.mousedragging=null;
					_status.mouseleft=false;
					_status.mousedragorigin=null;
					_status.dragstatuschanged=false;
					ui.canvas.width=ui.arena.offsetWidth;
					ui.canvas.height=ui.arena.offsetHeight;
					if(tmpflag){
						ui.click[get.itemtype(tmpflag)].call(tmpflag);
						game.check();
					}
				}
			},
			mousemove:function(){
				if(!lib.config.hover_handcard&&this.parentNode&&this.parentNode.parentNode==ui.me){
					return;
				}
				if(!_status.currentmouseenter){
					_status.currentmouseenter=this;
				}
			},
			mouseenter:function(){
				if(!lib.config.hover_handcard&&this.parentNode&&this.parentNode.parentNode==ui.me){
					return;
				}
				_status.currentmouseenter=this;
			},
			mouseleave:function(){
				ui.click.mouseentercancel();
				if(_status.currentmouseenter==this){
					_status.currentmouseenter=null;
				}
				this._mouseentercreated=false;
			},
			mousedown:function(){
				ui.click.mouseentercancel();
				if(_status.currentmouseenter==this){
					_status.currentmouseenter=null;
				}
				this._mouseentercreated=true;
			},
			mouseentercancel:function(){
				if(_status._mouseentertimeout){
					clearTimeout(_status._mouseentertimeout);
					delete _status._mouseentertimeout
				}
			},
			hoverplayer:function(e){
				return get.nodeintro(this,true);
			},
			longpressdown:function(e){
				if(_status.longpressed) return;
				if(this._longpresstimeout){
					clearTimeout(this._longpresstimeout);
				}
				var func=this._longpresscallback;
				var node=this;
				this._longpresstimeout=setTimeout(function(){
					delete node._longpresstimeout;
					if(_status.mousedragging&&_status.mouseleft) return;
					if(!_status.longpressed){
						_status.longpressed=true;
						setTimeout(function(){
							_status.longpressed=false;
						},500);
						func.call(node,e);
					}
				},500);
			},
			longpresscancel:function(){
				if(this._longpresstimeout){
					clearTimeout(this._longpresstimeout);
					delete this._longpresstimeout;
				}
			},
			window:function(){
				var clicked=_status.clicked;
				if(_status.dragged) return;
				if(_status.reloading) return;
				if(_status.clicked){
					_status.clicked=false;
				}
				else{
					if(_status.editing){
						if(_status.editing.innerHTML.length){
							_status.editing.link=_status.editing.innerHTML;
						}
						_status.editing.innerHTML=get.translation(_status.editing.link);
						delete _status.editing;
					}
					else if(_status.choosing){
						if(!_status.choosing.expand){
							_status.choosing.parentNode.style.height='';
							_status.choosing.nextSibling.delete();
							_status.choosing.previousSibling.show();
							delete _status.choosing;
						}
					}
					else if(ui.intro){
						ui.intro.close();
						delete ui.intro;
						ui.control.show();
						game.resume2();
					}
					else if(_status.event.isMine()){
						if(_status.event.custom.replace.window){
							_status.event.custom.replace.window();
						}
						else{
							if(_status.event.skill&&_status.event.name=='chooseToUse'){
								ui.click.cancel();
							}
							else{
								game.uncheck();
								game.check();
							}
						}
					}
				}
				if(_status.tempunpop){
					_status.tempunpop=false;
				}
				else{
					if(ui.currentpopped){
						if(ui.currentpopped._uiintro){
							ui.currentpopped._uiintro.delete();
							delete ui.currentpopped._uiintro;
						}
						delete ui.currentpopped;
					}
				}
				if(_status.event.custom.add.window){
					_status.event.custom.add.window(clicked);
				}
			},
			toggle:function(){
				if(_status.dragged) return;
				if(this.parentNode.classList.contains('disabled')) return;
				_status.tempunpop=true;
				if(this.link){
					this.link=false;
					this.classList.remove('on');
					if(this.additionalCommand) this.additionalCommand(false,this.parentNode);
				}
				else{
					this.link=true;
					this.classList.add('on');
					if(this.additionalCommand) this.additionalCommand(true,this.parentNode);
				}
			},
			editor:function(){
				if(_status.dragged) return;
				if(_status.editing) return;
				_status.clicked=true;
				this.innerHTML='';
				_status.editing=this;
				if(this.additionalCommand) this.additionalCommand(this);
			},
			switcher:function(){
				if(_status.dragged) return;
				if(this.parentNode.classList.contains('disabled')) return;
				if(_status.choosing) return;
				_status.clicked=true;
				_status.tempunpop=true;
				this.previousSibling.hide();
				var node=ui.create.div('.switcher',this.parentNode).animate('start');
				for(var i=0;i<this.choice.length;i++){
					var choice=ui.create.div(node);
					choice.innerHTML=get.translation(this.choice[i]);
					choice.link=this.choice[i];
					choice.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.choice);
				}
				this.parentNode.style.height=(node.offsetHeight)+'px';
				_status.choosing=this;
				if(!_status.choosing.expand){
					_status.choosing.expand=true;
					setTimeout(function(){
						_status.choosing.expand=false;
					},500);
				}
			},
			choice:function(){
				if(_status.dragged) return;
				if(!_status.choosing) return;
				_status.choosing.link=this.link;
				_status.choosing.innerHTML=get.translation(this.link);
				this.parentNode.parentNode.style.height='';
				this.parentNode.delete();
				_status.choosing.previousSibling.show();
				delete _status.choosing;
				if(this.parentNode.parentNode.querySelector('.toggle').additionalCommand){
					this.parentNode.parentNode.querySelector('.toggle').additionalCommand(this.link,this.parentNode.parentNode);
				}
			},
			button:function(){
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(this.classList.contains('noclick')) return;
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.button){
					custom.replace.button(this);
					return;
				}
				if(this.classList.contains('selectable')==false) return;
				if(this.classList.contains('selected')){
					ui.selected.buttons.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
					}
				}
				else{
					ui.selected.buttons.add(this);
				}
				this.classList.toggle('selected');
				if(custom.add.button){
					custom.add.button();
				}
				game.check();
			},
			card:function(){
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(ui.intro) return;
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.card){
					custom.replace.card(this);
					return;
				}
				if(this.classList.contains('selectable')==false) return;
				if(this.classList.contains('selected')){
					ui.selected.cards.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
					}
				}
				else{
					ui.selected.cards.add(this);
				}
				this.classList.toggle('selected');
				if(false){
					if(lib.config.mode=='chess'&&!_status.event.skill&&this.classList.contains('selected')&&
					_status.event.isMine()&&_status.event.name=='chooseToUse'){
						var player=_status.event.player;
						var range=get.info(this).range;
						if(range){
							if(typeof range.attack==='number'){
								player.createRangeShadow(get.attackRange(player)+range.attack-1);
							}
							else if(typeof range.global==='number'){
								player.createRangeShadow(get.globalFrom(player)+range.global);
							}
						}
					}
				}
				if(custom.add.card){
					custom.add.card();
				}
				game.check();
			},
			player:function(){
				return ui.click.target.apply(this,arguments);
			},
			target:function(e){
				if(_status.dragged) return;
				if(_status.clicked) return;
				if(ui.intro) return;
				_status.clicked=true;
				var custom=_status.event.custom;
				if(custom.replace.target){
					custom.replace.target(this,e);
					return;
				}
				if(this.classList.contains('selectable')==false) return;
				this.unprompt();
				if(this.classList.contains('selected')){
					ui.selected.targets.remove(this);
					if(_status.multitarget){
						game.uncheck();
						game.check();
					}
					else{
						this.classList.remove('selected');
					}
				}
				else{
					ui.selected.targets.add(this);
					if(_status.event.name=='chooseToUse'){
						var targetprompt=null;
						if(_status.event.targetprompt){
							targetprompt=_status.event.targetprompt;
						}
						else if(_status.event.skill&&!get.info(_status.event.skill).viewAs){
							targetprompt=get.info(_status.event.skill).targetprompt;
						}
						else{
							var currentcard=get.card();
							if(currentcard){
								targetprompt=get.info(currentcard).targetprompt;
							}
						}
						if(targetprompt){
							if(Array.isArray(targetprompt)){
								targetprompt=targetprompt[Math.min(targetprompt.length-1,ui.selected.targets.indexOf(this))];
							}
							else if(typeof targetprompt=='function'){
								targetprompt=targetprompt(this);
							}
							if(targetprompt&&typeof targetprompt=='string'){
								this.prompt(targetprompt);
							}
						}
					}
					this.classList.add('selected');
				}
				if(custom.add.target){
					custom.add.target();
				}
				game.check();
			},
			control:function(){
				if(_status.dragged) return;
				if(ui.control.classList.contains('hidden')) return;
				var node=this.parentNode;
				if(node){
					if(node._doubleclick){
						return;
					}
					else{
						node._doubleclick=true;
						setTimeout(function(){
							node._doubleclick=false;
						},500);
					}
				}
				if(this.parentNode.classList.contains('hidden')) return;
				if(ui.intro){
					ui.intro.close();
					delete ui.intro;
				}
				_status.clicked=true;
				if(this.parentNode.custom){
					this.parentNode.custom(this.link,this);
					return;
				}
				if(this.link=='ok'){
					ui.click.ok(this);
				}
				else if(this.link=='cancel'){
					ui.click.cancel(this);
				}
				else{
					_status.event.result={
						buttons:ui.selected.buttons.slice(0),
						cards:ui.selected.cards.slice(0),
						targets:ui.selected.targets.slice(0),
						control:this.link,
						links:get.links(ui.selected.buttons)
					};
					if(this.parentNode.close!=false){
						game.uncheck();
						this.parentNode.close();
					}
					game.resume();
				}
			},
			skill:function(skill){
				var info=get.info(skill);
				var event=_status.event;
				event.backup(skill);
				if(typeof event.skillDialog=='object'){
					event.skillDialog.close();
				}
				if(event.isMine()){
					event.skillDialog=true;
				}
				game.uncheck();
				game.check();
				if(event.skillDialog){
					var str=get.translation(skill);
					if(info.prompt){
						if(typeof info.prompt=='function'){
							str+='：'+info.prompt(event);
						}
						else{
							str+='：'+info.prompt;
						}
						event.skillDialog=ui.create.dialog(str);
					}
					else if(lib.translate[skill+'_info']){
						event.skillDialog=ui.create.dialog(str,'<div><div style="width:100%">'+lib.translate[skill+'_info']+'</div></div>');
					}
				}
			},
			ok:function(node){
				var event=_status.event;
				if(event.custom.replace.confirm){
					event.custom.replace.confirm(true);return;
				}
				event.result={
					buttons:ui.selected.buttons.slice(0),
					cards:ui.selected.cards.slice(0),
					targets:ui.selected.targets.slice(0),
					confirm:'ok',
					bool:true,
					links:get.links(ui.selected.buttons)
				};
				if(node){
					node.parentNode.close();
				}
				if(event.skill){
					event.result.skill=event.skill;
					event.result.card=get.info(event.skill).viewAs;
					if(event.result.cards.length==1&&event.result.card){
						event.result.card.suit=event.result.cards[0].suit;
					}
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					event.restore();
				}
				if(ui.skills) ui.skills.close();
				game.uncheck();
				if(event.custom.add.confirm){
					event.custom.add.confirm(true);
				}
				game.resume();
			},
			cancel:function(node){
				var event=_status.event;
				if(event.custom.replace.confirm){
					event.custom.replace.confirm(false);return;
				}
				if(event.skill){
					if(event.skillDialog&&get.objtype(event.skillDialog)=='div'){
						event.skillDialog.close();
					}
					if(typeof event.dialog=='string'&&event.isMine()){
						event.dialog=ui.create.dialog(event.dialog);
					}
					event.restore();
					game.uncheck();
					game.check();
					return;
				}
				event.result={
					confirm:'cancel',
					bool:false
				};
				if(node){
					node.parentNode.close();
				}
				if(ui.skills) ui.skills.close();
				game.uncheck();
				if(event.custom.add.confirm){
					event.custom.add.confirm(true);
				}
				game.resume();
			},
			oldintro:function(e){
				if(_status.dragged) return;
				_status.clicked=true;
				if(this.classList.contains('player')&&!this.name){
					return;
				}
				var i,translation,intro,str;
				ui.click.intro2.call(this);
				game.pause2();
				ui.control.hide();
				ui.intro=get.nodeintro(this).open();
				ui.intro.source=this;
			},
			intro:function(e){
				if(_status.dragged) return;
				_status.clicked=true;
				if(this.classList.contains('player')&&!this.name){
					return;
				}
				var uiintro=get.nodeintro(this);
				uiintro.classList.add('popped');
				uiintro.classList.add('static');
				ui.window.appendChild(uiintro);
				var layer=ui.create.div('.poplayer',ui.arena);
				var clicklayer=function(e){
					uiintro.delete();
					this.remove();
					game.resume2();
					e.stopPropagation();
					return false;
				}
				layer.addEventListener(lib.config.touchscreen?'touchend':'click',clicklayer);
				layer.oncontextmenu=clicklayer;
				lib.placePoppedDialog(uiintro,e);
				uiintro.style.zIndex=21;

				var clickintro=function(){
					layer.remove();
					this.delete();
					game.resume2();
				};
				uiintro.addEventListener('mouseleave',clickintro);
				uiintro.addEventListener('click',clickintro);

				game.pause2();
				return uiintro;
			},
			intro2:function(){
				if(ui.intro){
					ui.intro.close();
					if(ui.intro.source==this){
						delete ui.intro;
						ui.control.show();
						game.resume2();
						return;
					}
				}
			},
			auto:function(){
				if(ui.auto.classList.contains('hidden')) return;
				if(!_status.auto){
					_status.auto=true;
					// ui.auto.innerHTML='手动';
					ui.auto.classList.add('glow');
					if(ui.confirm) ui.confirm.close();
					ui.control.hide();
					if(_status.event.switchToAuto){
						_status.event.switchToAuto();
					}
					else{
						if(_status.paused&&_status.imchoosing){
							game.uncheck();
							_status.event.redo();
						}
					}
					game.resume();
				}
				else{
					ui.control.show();
					_status.auto=false;
					ui.auto.classList.remove('glow');
					// ui.auto.innerHTML='托管';
				}
			},
			wuxie:function(){
				if(this.classList.contains('hidden')) return;
				this.classList.toggle('glow');
				if(this.classList.contains('glow')&&
				(_status.event.parent.name=='_wuxie1'||_status.event.parent.name=='_wuxie2')&&
				_status.event.isMine()&&ui.confirm){
					ui.click.cancel(ui.confirm.lastChild);
				}
			},
			pause:function(){
				if(_status.paused2) return;
				ui.system.hide();
				game.pause2();
				var node=ui.create.pause().animate('start');
				ui.sidebar3.innerHTML='';
				if(lib.config.show_discardpile){
					for(var i=0;i<ui.discardPile.childNodes.length;i++){
						var div=ui.create.div(ui.sidebar3);
						div.innerHTML=get.translation(ui.discardPile.childNodes[i]);
						ui.sidebar3.insertBefore(div,ui.sidebar3.firstChild);
					}
				}
				node.appendChild(ui.sidebar);
				node.appendChild(ui.sidebar3);
				ui.arena.classList.add('paused');
				if(game.onpause){
					game.onpause();
				}
			},
			resume:function(e){
				if(_status.pausing) return;
				if(_status.dragged) return;
				if(_status.clicked) return;
				this.delete();
				ui.system.show();
				ui.arena.classList.remove('paused');
				game.resume2();
				e.stopPropagation();
				if(game.onresume){
					game.onresume();
				}
				return false;
			},
			config:function(){
				if(_status.paused2) _status.config2=false;
				else _status.config2=true;

				_status.clicked=true;
				game.pause2();
				ui.system.hide();
				if(lib.config.right_sidebar) ui.arena.classList.add('left');
				else ui.arena.classList.add('right');
				ui.window.appendChild(ui.configbg);
				setTimeout(function(){
					ui.config.animate('start');
					ui.window.appendChild(ui.config);
				},100);
				if(game.onpause2){
					game.onpause2();
				}
			},
			config2:function(e){
				_status.clicked=true;
				ui.system.show();
				ui.arena.classList.remove('right');
				ui.arena.classList.remove('left');
				ui.arena.classList.remove('paused2');
				// ui.arena.classList.remove('paused');
				this.remove();
				if(ui.gameviewdialog){
					if(ui.gameviewdialog.popped){
						ui.gameviewdialog.popped.delete();
						delete ui.gameviewdialog.popped;
					}
					ui.gameviewdialog.close();
					delete ui.gameviewdialog;
					ui.currentgameview.classList.remove('thundertext');
				}
				ui.config.delete();
				if(_status.config2){
					game.resume2();
				}
				// e.stopPropagation();
				if(game.onresume2){
					game.onresume2();
				}
				return false;
			},
			swap:function(){
				if(_status.dragged) return;
				if(this.classList.contains('dead')) return;
				if(_status.over) return;
				if(ui.auto) ui.auto.show();
				game.swapPlayer(this);
			},
			mousewheel:function(evt){
				var node=this;
				var num=this._scrollnum||6;
				var speed=this._scrollspeed||16;
				clearInterval(node.interval);
				if(evt.detail > 0 || evt.wheelDelta < 0){
					node.interval=setInterval(function(){
						if(num--&&Math.abs(node.scrollLeft+node.clientWidth-node.scrollWidth)>0){
							node.scrollLeft +=speed;
						}
						else{
							clearInterval(node.interval);
						}
					},16);
				}
				else{
					node.interval=setInterval(function(){
						if(num--&&node.scrollLeft>0){
							node.scrollLeft -=speed;
						}
						else{
							clearInterval(node.interval);
						}
					},16);
				}
			},
			touchStart:function(e){
				this.startX=e.touches[0].clientX;
				this.startY=e.touches[0].clientY;
				_status.dragged=false;
			},
			touchScroll:function(e) {
				if(!_status.dragged){
					if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
						Math.abs(e.touches[0].clientY - this.startY) > 10) {
						_status.dragged=true;
					}
				}
				if(this.scrollWidth<=this.offsetWidth&&
					this.scrollHeight<=this.offsetHeight){
					e.preventDefault();
				}
				else{
					e.stopPropagation();
				}
			},
			sidebar:{
				local:function(item){
					game.saveConfig(this.name,item,true);
				},
				local2:function(item){
					game.saveConfig(this.name,item,true);
					ui.sidebarrestart.classList.add('thundertext');
				},
				global:function(item){
					game.saveConfig(this.name,item);
				},
				global2:function(item){
					game.saveConfig(this.name,item);
					ui.sidebarrestart.classList.add('thundertext');
				},
				background_music:function(item){
					game.saveConfig(this.name,item);
					game.playBackgroundMusic();
				},
				cheat:function(bool){
					if(lib.config.cheat&&bool==false){
						lib.cheat=window.cheat;
						delete window.cheat;
						delete window.game;
						delete window.ui;
						delete window.get;
						delete window.ai;
						delete window.lib;
						delete window._status;
					}
					else if(!lib.config.cheat&&bool){
						window.cheat=lib.cheat;
						window.cheat.i();
					}
					game.saveConfig('cheat',bool);
				},
				free_choose:function(bool){
					game.saveConfig('free_choose',bool,true);
					if(!_status.event.parent.showConfig&&!_status.event.showConfig) return;
					if(!ui.cheat2&&get.config('free_choose')) ui.create.cheat2();
					else if(ui.cheat2&&!get.config('free_choose')){
						ui.cheat2.close();
						delete ui.cheat2;
						if(ui.cheat2x){
							ui.cheat2x.close();
							delete ui.cheat2;
						}
					}
				},
				change_identity:function(bool){
					game.saveConfig('change_identity',bool,true);
					if(!_status.event.parent.showConfig&&!_status.event.showConfig) return;
					var dialog;
					if(ui.cheat2&&ui.cheat2.backup) dialog=ui.cheat2.backup;
					else dialog=_status.event.dialog;
					if(!dialog.querySelector('table')&&get.config('change_identity')) _status.event.parent.addSetting(dialog);
					else _status.event.parent.removeSetting(dialog);
					ui.update();
				},
				battle_number:function(num){
					game.saveConfig('battle_number',num,true);
					if(!_status.event.parent.showConfig&&!_status.event.showConfig) return;
					if(_status.event.parent.changeDialog){
						_status.event.parent.changeDialog();
					}
				},
				change_choice:function(bool){
					game.saveConfig('change_choice',bool,true);
					if(!_status.event.parent.showConfig&&!_status.event.showConfig) return;
					if(!ui.cheat&&get.config('change_choice')) ui.create.cheat();
					else if(ui.cheat&&!get.config('change_choice')){
						ui.cheat.close();
						delete ui.cheat;
					}
				},
				player_number:function(num){
					game.saveConfig('player_number',num,true);
					game.reload();
				},
				auto_identity:function(bool){
					game.saveConfig('auto_identity',bool,true);
					var num;
					switch(bool){
						case '一轮':num=1;break;
						case '两轮':num=2;break;
						case '三轮':num=3;break;
						default:num=0;break;
					}
					if(num&!_status.identityShown&&game.phaseNumber>game.players.length*num&&game.showIdentity){
						_status.identityShown=true;
						game.showIdentity();
					}
				},
				swap:function(bool){
					game.saveConfig('swap',bool,true);
					if(get.config('swap')){
						if(!ui.swap&&game.me.isDead()){
							ui.swap=ui.create.control('换人',ui.click.dieswap);
						}
					}
					else if(ui.swap){
						ui.swap.close();
						delete ui.swap;
					}
				},
				revive:function(bool){
					game.saveConfig('revive',bool,true);
					if(get.config('revive')){
						if(!ui.revive&&game.me.isDead()){
							ui.revive=ui.create.control('revive',ui.click.dierevive);
						}
					}
					else if(ui.revive){
						ui.revive.close();
						delete ui.revive;
					}
				},
				hover_all:function(bool){
					game.saveConfig('hover_all',bool);
					if(!lib.config.hover_all) ui.hoverhandcardconfig.classList.add('disabled');
					else ui.hoverhandcardconfig.classList.remove('disabled');
					ui.sidebarrestart.classList.add('thundertext');
				},
				theme:function(theme){
					game.saveConfig('theme',theme);
					ui.arena.hide();
					setTimeout(function(){
						var theme=ui.css.theme;
						ui.css.theme=lib.init.css('theme/'+lib.config.theme,'style');
						theme.remove();
						setTimeout(function(){ui.arena.show();},100);
					},500);
				},
				layout:function(layout){
					game.saveConfig('layout',layout);
					if(lib.config.mode!='chess'){
						ui.arena.hide();
						setTimeout(function(){
							var layout=ui.css.layout;
							ui.css.layout=lib.init.css('layout/'+lib.config.layout,'layout',layout);

							setTimeout(function(){layout.remove();ui.arena.show();},100);
						},500);
					}
				},
				image_background:function(background){
					var animate=lib.config.image_background=='default';
					game.saveConfig('image_background',background);
					ui.background.delete();
					ui.background=ui.create.div('.background');

					switch (lib.config.image_background_filter){
						case 'blur':ui.background.style.webkitFilter='blur(8px)';
							ui.background.style.webkitTransform='scale(1.05)';break;
						case 'gray':ui.background.style.webkitFilter='grayscale(1)';break;
						case 'sepia':ui.background.style.webkitFilter='sepia(0.5)';break;
						case 'invert':ui.background.style.webkitFilter='invert(1)';break;
						case 'saturate':ui.background.style.webkitFilter='saturate(5)';break;
						case 'contrast':ui.background.style.webkitFilter='contrast(1.4)';break;
						case 'hue':ui.background.style.webkitFilter='hue-rotate(180deg)';break;
						case 'brightness':ui.background.style.webkitFilter='brightness(5)';break;
						default:ui.background.style.webkitFilter='';
						ui.background.style.webkitTransform='';
					}

					document.body.insertBefore(ui.background,document.body.firstChild);
					if(animate) ui.background.animate('start');
					if(lib.config.image_background=='default'){
						ui.background.style.backgroundImage="none";
					}
					else{
						ui.background.style.backgroundImage="url('image/background/"+lib.config.image_background+".jpg')";
					}
					ui.background.style.backgroundSize='cover';
				},
				image_background_filter:function(filter){
					game.saveConfig('image_background_filter',filter);
					ui.click.sidebar.image_background(lib.config.image_background);
				},
				ui_zoom:function(zoom){
					game.saveConfig('ui_zoom',zoom);
					switch(zoom){
						case '极小':ui.window.style.zoom=0.8;break;
						case '很小':ui.window.style.zoom=0.9;break;
						case '较小':ui.window.style.zoom=0.95;break;
						case '较大':ui.window.style.zoom=1.05;break;
						case '很大':ui.window.style.zoom=1.1;break;
						default:ui.window.style.zoom=1;
					}
				},
				show_name:function(bool){
					game.saveConfig('show_name',bool);
					var players=get.players(false,true);
					if(lib.config.show_name){
						for(var i=0;i<players.length;i++){
							game.players[i].node.name.style.display='';
						}
					}
					else{
						for(var i=0;i<players.length;i++){
							game.players[i].node.name.style.display='none';
						}
					}
				},
				show_replay:function(bool){
					game.saveConfig('show_replay',bool);
					if(lib.config.show_replay){
						ui.replay.style.display='';
					}
					else{
						ui.replay.style.display='none';
					}
				},
				show_playerids:function(bool){
					game.saveConfig('show_playerids',bool);
					if(lib.config.show_playerids){
						ui.playerids.style.display='';
					}
					else{
						ui.playerids.style.display='none';
					}
				},
				show_auto:function(bool){
					game.saveConfig('show_auto',bool);
					if(lib.config.show_auto){
						ui.auto.style.display='';
					}
					else{
						ui.auto.style.display='none';
					}
				},
				show_volumn:function(bool){
					game.saveConfig('show_volumn',bool);
					if(lib.config.show_volumn){
						ui.volumn.style.display='';
					}
					else{
						ui.volumn.style.display='none';
					}
				},
				show_wuxie:function(bool){
					game.saveConfig('show_wuxie',bool);
					if(lib.config.show_wuxie){
						ui.wuxie.style.display='';
					}
					else{
						ui.wuxie.style.display='none';
					}
				},
				show_pause:function(bool){
					game.saveConfig('show_pause',bool);
					if(lib.config.show_pause){
						ui.pause.style.display='';
						ui.auto.style.marginLeft='10px';
					}
					else{
						ui.pause.style.display='none';
						ui.auto.style.marginLeft='';
					}
				},
				show_scrollbar:function(bool){
					game.saveConfig('show_scrollbar',bool);
					if(lib.config.touchscreen) return;
					if(bool){
						ui.css.scrollbar=lib.init.css('layout/default','scrollbar');
					}
					else{
						ui.css.scrollbar.remove();
					}
				},
				mousewheel:function(bool){
					game.saveConfig('mousewheel',bool);
					if(lib.config.touchscreen) return;
					if(lib.config.mousewheel){
						game.me.node.handcards1.onmousewheel=ui.click.mousewheel;
						game.me.node.handcards2.onmousewheel=ui.click.mousewheel;
					}
					else{
						game.me.node.handcards1.onmousewheel=null;
						game.me.node.handcards2.onmousewheel=null;
					}
				},
				touchscreen:function (bool){
					game.saveConfig('touchscreen',bool);
					if(bool){
						game.saveConfig('confirmtouch',false);
						ui.handcardmousewheel.classList.add('disabled');
					}
					else{
						ui.handcardmousewheel.classList.remove('disabled');
					}
					ui.sidebarrestart.classList.add('thundertext');
				},
				fold_card:function(bool){
					game.saveConfig('fold_card',bool);
					if(bool){
						ui.css.fold=lib.init.css('layout/default','fold');
					}
					else if(ui.css.fold){
						ui.css.fold.remove();
					}
				},
				threed_card:function(bool){
					game.saveConfig('threed_card',bool);
					if(bool){
						ui.css.threed=lib.init.css('layout/default','fold2');
					}
					else if(ui.css.threed){
						ui.css.threed.remove();
					}
				},
				blur_ui:function(bool){
					game.saveConfig('blur_ui',bool);
					if(bool){
						ui.css.blur_ui=lib.init.css('layout/default','blur');
					}
					else if(ui.css.blur_ui){
						ui.css.blur_ui.remove();
					}
				},
				right_sidebar:function(bool){
					game.saveConfig('right_sidebar',bool);
					if(bool){
						ui.config.classList.add('right');
						ui.sidebar.classList.add('right');
						ui.sidebar3.classList.add('left');
						ui.arena.classList.add('left');
						ui.arena.classList.remove('right');
						ui.system.appendChild(ui.system1);
					}
					else{
						ui.config.classList.remove('right');
						ui.sidebar.classList.remove('right');
						ui.sidebar3.classList.remove('left');
						ui.arena.classList.add('right');
						ui.arena.classList.remove('left');
						ui.system.appendChild(ui.system2);
					}
				},
				title:function(bool){
					game.saveConfig('title',bool);
					if(!lib.config.title) document.title='无名杀';
				},
				characters:function(bool,node){
					var name=node.link.slice(0,node.link.length-10);
					if(bool){
						lib.config.characters.add(name);
					}
					else{
						lib.config.characters.remove(name);
					}
					game.saveConfig('characters',lib.config.characters);
					ui.sidebarrestart.classList.add('thundertext');
				},
				cards:function(bool,node){
					var name=node.link.slice(0,node.link.length-5);
					if(bool){
						lib.config.cards.add(name);
					}
					else{
						lib.config.cards.remove(name);
					}
					game.saveConfig('cards',lib.config.cards);
					ui.sidebarrestart.classList.add('thundertext');
				},
				plays:function(bool,node){
					var name=node.link.slice(0,node.link.length-5);
					if(bool){
						lib.config.plays.add(name);
					}
					else{
						lib.config.plays.remove(name);
					}
					game.saveConfig('plays',lib.config.plays);
					ui.sidebarrestart.classList.add('thundertext');
				},
				forbid:function(bool,node){
					var list=lib.config.forbidlist;
					list[node.link]=bool;
					game.saveConfig('forbidlist',list);
					ui.sidebarrestart.classList.add('thundertext');
				},
				autoskill:function(bool,node){
					var list=lib.config.autoskilllist;
					if(bool){
						list.remove(node.link);
					}
					else{
						list.add(node.link);
					}
					game.saveConfig('autoskilllist',list);
				},
				sort:function(func){
					game.saveConfig('sort',func);
					lib.config.sort_card=get.sortCard(lib.config.sort);
					var i,cards=game.me.get('h');
					for(i=0;i<cards.length;i++) cards[i].remove();
					cards.sort(function(a,b){
						if(get.config('reverse_sort')) return lib.config.sort_card(a)-lib.config.sort_card(b);
						return lib.config.sort_card(b)-lib.config.sort_card(a);
					});
					if(!game.singleHandcard){
						for(i=0;i<cards.length;i++){
							if(lib.config.sort_card(cards[i])>0){
								game.me.node.handcards1.appendChild(cards[i]);
							}
							else{
								game.me.node.handcards2.appendChild(cards[i]);
							}
						}
					}
				},
				reverse_sort:function(bool){
					game.saveConfig('reverse_sort',bool,true);
					var cards1=[];
					var cards2=[];
					var i;
					for(i=0;i<game.me.node.handcards1.childNodes.length;i++){
						cards1.unshift(game.me.node.handcards1.childNodes[i]);
					}
					for(i=0;i<game.me.node.handcards2.childNodes.length;i++){
						cards2.unshift(game.me.node.handcards2.childNodes[i]);
					}
					if(!game.singleHandcard){
						var cards=game.me.num('h');
						for(var i=0;i<cards.length;i++) cards[i].remove();
						for(i=0;i<cards1.length;i++){
							game.me.node.handcards2.appendChild(cards1[i]);
						}
						for(i=0;i<cards2.length;i++){
							game.me.node.handcards1.appendChild(cards2[i]);
						}
					}
				}
			},
			rightplayer:function(e){
				if(_status.clickedplayer){
					return false;
				}
				ui.click.intro.call(this,e);
				_status.clickedplayer=true;
				_status.clicked=false;
				ui.click.longpresscancel.call(this);
				return false;
			},
			right:function(){
				if(_status.noright){
					_status.noright=false;
					return false;
				}
				if(_status.clickedplayer){
					_status.clickedplayer=false;
					return;
				}
				switch(lib.config.right_click){
					case 'pause':ui.click.pause();break;
					case 'auto':ui.click.auto();break;
					case 'config':ui.click.config();break;
				}
				return false;
			}
		},
		selected:{
			buttons:[],cards:[],targets:[]
		},
		clear:function(){
			var thrown=document.getElementsByClassName('thrown');
			var nodes=[];
			var i;
			for(i=0;i<thrown.length;i++){
				nodes.push(thrown[i]);
			}
			for(i=0;i<nodes.length;i++){
				if(!nodes[i].fixed) nodes[i].delete();
			}
		},
		updatex:function(){
			ui.update.apply(this,arguments);
			ui.updateh(true);
		},
		updateh:function(compute){
			if(!game.me) return;
			if(compute){
				game.me.node.handcards1._handcardsWidth=game.me.node.handcards1.offsetWidth;
				game.me.node.handcards2._handcardsWidth=game.me.node.handcards2.offsetWidth;
			}
			ui.updatehx(game.me.node.handcards1);
			ui.updatehx(game.me.node.handcards2);
		},
		updatehxx:function(node){
			node.dataset.fold=Math.min(6,node.childElementCount-
				node.getElementsByClassName('removing').length)-3;
		},
		updatehx:function(node){
			var num=node.childElementCount-node.getElementsByClassName('removing').length;
			var width=node._handcardsWidth;
			if(num*78+40>=width){
				node.dataset.fold=3;
			}
			else if(num*93+25>=width){
				node.dataset.fold=2;
			}
			else if(num*112+6>=width){
				node.dataset.fold=1;
			}
			else{
				node.dataset.fold=0;
			}
		},
		update:function(){
			for(var i=0;i<ui.updates.length;i++){
				ui.updates[i]();
			}
			if(ui.dialog){
				if(lib.config.mode=='chess'){
					if(ui.dialog.content.offsetHeight<240&&(!ui.dialog.buttons||!ui.dialog.buttons.length)){
						ui.dialog.style.height=ui.dialog.content.offsetHeight+'px';
						ui.dialog.classList.add('slim');
					}
					else{
						ui.dialog.style.height='';
						ui.dialog.classList.remove('slim');
					}
				}
				if(ui.dialog.content.offsetHeight<=240||
					ui.dialog.contentContainer.offsetHeight>=ui.dialog.content.offsetHeight){
					ui.dialog.classList.remove('scroll1');
					ui.dialog.classList.remove('scroll2');
					return;
				}
				if(lib.config.touchscreen||lib.config.layout=='newlayout'){
					ui.dialog.classList.add('scroll1');
					ui.dialog.classList.add('scroll2');
				}
				if(ui.dialog.contentContainer.scrollTop>0){
					ui.dialog.classList.add('scroll1');
				}
				else{
					ui.dialog.classList.remove('scroll1');
				}
				if(ui.dialog.contentContainer.scrollTop+ui.dialog.contentContainer.offsetHeight>=
				ui.dialog.contentContainer.scrollHeight-1){
					ui.dialog.classList.remove('scroll2');
				}
				else{
					ui.dialog.classList.add('scroll2');
				}
			}
		},
		recycle:function(node,key){
			if(!ui._recycle) ui._recycle={};
			if(typeof node=='string'){
				return ui._recycle[node]
			}
			ui._recycle[key]=node;
		},
	};
	var get={
		config:function(item){
			if(!lib.config.mode_config[lib.config.mode]) return;
			return lib.config.mode_config[lib.config.mode][item];
		},
		skillLocked:function(skill){
			var info=lib.skill[skill];
			if(info.locked==false) return false;
			if(info.trigger&&info.forced) return true;
			if(info.mod) return true;
			if(info.locked) return true;
			return false;
		},
		itemtype:function(obj){
			var i,j;
			if(typeof obj=='string'){
				if(obj.length<=3){
					for(i=0;i<obj.length;i++){
						if(/h|e|j/.test(obj[i])==false) return;
					}
					return 'position';
				}
				if(lib.nature.contains(obj)) return 'nature';
			}
			if(get.objtype(obj)=='array'&&obj.length){

				var isPlayers=true;
				for(i=0;i<obj.length;i++){
					if(get.itemtype(obj[i])!='player') {isPlayers=false;break;}
				}
				if(isPlayers) return 'players';

				var isCards=true;
				for(i=0;i<obj.length;i++){
					if(get.itemtype(obj[i])!='card') {isCards=false;break;}
				}
				if(isCards) return 'cards';

				if(obj.length==2){
					if(typeof obj[0]=='number'&&typeof obj[1]=='number'){
						if(obj[0]<=obj[1]) return 'select';
					}
				}

				if(obj.length==4){
					var isPosition=true;
					for(i=0;i<obj.length;i++){
						if(typeof obj[i]!='number') {isPosition=false;break;}
					}
					if(isPosition) return 'divposition';
				}
			}
			if(get.objtype(obj)=='div'){
				if(obj.classList.contains('button')) return 'button';
				if(obj.classList.contains('card')) return 'card';
				if(obj.classList.contains('player')) return 'player';
				if(obj.classList.contains('dialog')) return 'dialog';
			}
		},
		equipNum:function(card){
			if(get.type(card)=='equip'){
				return parseInt(get.subtype(card)[5]);
			}
			return 0;
		},
		objtype:function(obj){
			if(Object.prototype.toString.call(obj) === '[object Array]') return 'array';
			if(Object.prototype.toString.call(obj) === '[object HTMLDivElement]') return 'div';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableElement]') return 'table';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableRowElement]') return 'tr';
			if(Object.prototype.toString.call(obj) === '[object HTMLTableCellElement]') return 'td';
			if(Object.prototype.toString.call(obj) === '[object HTMLBodyElement]') return 'td';
		},
		type:function(obj,method){
			if(typeof obj=='string') obj={name:'string'};
			if(typeof obj!='object') return;
			if(!lib.card[obj.name]) return;
			if(method=='trick'&&lib.card[obj.name].type=='delay') return 'trick';
			return lib.card[obj.name].type;
		},
		subtype:function(obj){
			if(!lib.card[obj.name]) return;
			return lib.card[obj.name].subtype;
		},
		suit:function(card){
			if(get.itemtype(card)=='cards'){
				var suit=get.suit(card[0])
				for(var i=1;i<card.length;i++){
					if(get.suit(card[i])!=suit) return 'none';
				}
				return suit;
			}
			else{
				if(get.owner(card)){
					return game.checkMod(card,card.suit,'suit',get.owner(card).get('s'));
				}
				return card.suit;
			}
		},
		color:function(card){
			if(get.itemtype(card)=='cards'){
				var color=get.color(card[0])
				for(var i=1;i<card.length;i++){
					if(get.color(card[i])!=color) return 'none';
				}
				return color;
			}
			else{
				if(get.suit(card)=='spade'||get.suit(card)=='club') return 'black';
				if(get.suit(card)=='heart'||get.suit(card)=='diamond') return 'red';
				return 'none';
			}
		},
		number:function(card){
			return card.number;
		},
		nature:function(card){
			return card.nature;
		},
		cards:function(num){
			var list=[];
			var card=false;
			if(typeof num!='number') num=1;
			if(num==0) {card=true;num=1;}
			while(num--){
				if(ui.cardPile.hasChildNodes()==false){
					if(_status.maxShuffle!=undefined){
						if(_status.maxShuffle==0){
							game.over('平局');
							return;
						}
						_status.maxShuffle--;
					}
					var cards=[],i;
					for(i=0;i<ui.discardPile.childNodes.length;i++){
						cards.push(ui.discardPile.childNodes[i]);
					}
					cards.randomSort();
					for(var i=0;i<cards.length;i++){
						ui.cardPile.appendChild(cards[i]);
					}
				}
				if(ui.cardPile.hasChildNodes()==false){
					game.over('平局');
					return;
				}
				list.push(ui.cardPile.removeChild(ui.cardPile.firstChild));
			}
			if(card) return list[0];
			return list;
		},
		judge:function(card){
			if(card.viewAs) return lib.card[card.viewAs].judge;
			return get.info(card).judge;
		},
		distance:function(from,to,method){
			if(from==to) return 0;
			if(!game.players.contains(from)&&!game.dead.contains(from)) return Infinity;
			if(!game.players.contains(to)&&!game.dead.contains(to)) return Infinity;
			var player=from,m,n=1,i;
			var fxy,txy;
			if(lib.config.mode=='chess'){
				fxy=from.getXY();
				txy=to.getXY();
				n=Math.abs(fxy[0]-txy[0])+Math.abs(fxy[1]-txy[1]);
				if(method=='raw'||method=='pure'||method=='absolute') return n;
			}
			else if(to.isMin(true)||from.isMin(true)){
				if(method=='raw'||method=='pure'||method=='absolute') return 1;
			}
			else{
				var length=game.players.length;
				var totalPopulation=game.players.length+game.dead.length+1;
				for(var iwhile=0;iwhile<totalPopulation;iwhile++){
					if(player.nextSeat!=to){
						player=player.nextSeat;
						if(player.isAlive()&&!player.isOut()&&!player.isMin(true)) n++;
					}
					else{
						break;
					}
				}
				for(i=0;i<game.players.length;i++){
					if(game.players[i].isOut()||game.players[i].isMin(true)) length--;
				}
				if(method=='absolute') return n;
				if(from.isDead()) length++;
				if(to.isDead()) length++;
				n=Math.min(n,length-n);
				if(method=='raw'||method=='pure') return n;
			}

			n=game.checkMod(from,to,n,'globalFrom',from.get('s'));
			n=game.checkMod(from,to,n,'globalTo',to.get('s'));
			m=n;
			m=game.checkMod(from,to,m,'attackFrom',from.get('s'));
			m=game.checkMod(from,to,m,'attackTo',to.get('s'));
			var equips1=from.get('e'),equips2=to.get('e');
			for(i=0;i<equips1.length;i++){
				var info=get.info(equips1[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					m+=info.globalFrom;
					n+=info.globalFrom;
				}
				if(info.attackFrom){
					m+=info.attackFrom;
				}
			}
			for(i=0;i<equips2.length;i++){
				var info=get.info(equips2[i]).distance;
				if(!info) continue;
				if(info.globalTo){
					m+=info.globalTo;
					n+=info.globalTo;
				}
				if(info.attaclTo){
					m+=info.attaclTo;
				}
			}
			if(method=='attack') return m;
			return n;
		},
		attackRange:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalFrom',player.get('s'));
			range=game.checkMod(player,player,range,'attackFrom',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					range+=info.globalFrom;
				}
				if(info.attackFrom){
					range+=info.attackFrom;
				}
			}
			return (1-range);
		},
		globalFrom:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalFrom',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalFrom){
					range+=info.globalFrom;
				}
			}
			return (-range);
		},
		globalTo:function(player){
			var range=0;
			range=game.checkMod(player,player,range,'globalTo',player.get('s'));
			var equips=player.get('e');
			for(var i=0;i<equips.length;i++){
				var info=get.info(equips[i]).distance;
				if(!info) continue;
				if(info.globalTo){
					range+=info.globalTo;
				}
			}
			return (range);
		},
		info:function(item){
			if(typeof item=='string'){
				return lib.skill[item];
			}
			if(typeof item=='object'){
				return lib.card[item.name];
			}
		},
		select:function(select){
			if(typeof select=='number') return [select,select];
			if(get.itemtype(select)=='select') return select;
			if(typeof select=='function') return get.select(select());
			return [1,1]
		},
		card:function(){
			if(_status.event.skill){
				var card=get.info(_status.event.skill).viewAs;
				if(card) return card;
			}
			return ui.selected.cards[0];
		},
		player:function(){
			return _status.event.player;
		},
		players:function(sort,dead){
			var players=game.players.slice(0);
			if(sort!=false){
				if(typeof sort=='function'){
					players.sort(sort);
				}
				else{
					if(get.itemtype(sort)!='player') lib.tempSortSeat=_status.event.player;
					else lib.tempSortSeat=sort;
					players.sort(lib.sort.seat);
					delete lib.tempSortSeat;
					lib.temp={};
				}
			}
			if(dead) players=players.concat(game.dead);
			return players;
		},
		position:function(card){
			if(get.itemtype(card)=='player') return parseInt(card.dataset.position);
			if(card.timeout&&card.destiny){
				if(card.destiny.classList.contains('equips')) return 'e';
				if(card.destiny.classList.contains('judges')) return 'j';
				if(card.destiny.id=='handcards1'||
					card.destiny.id=='handcards2') return 'h';
				if(card.destiny.id=='discardPile') return 'd';
				if(card.destiny.id=='special') return 's';
				return;
			}
			if(!card.parentNode) return;
			if(card.parentNode.classList.contains('equips')) return 'e';
			if(card.parentNode.classList.contains('judges')) return 'j';
			if(card.parentNode.id=='handcards1'||
				card.parentNode.id=='handcards2') return 'h';
			if(card.parentNode.id=='discardPile') return 'd';
			if(card.parentNode.id=='special') return 's';
		},
		translation:function(str,arg){
			if(str&&typeof str=='object'&&str.name){
				var str2;
				if(arg=='viewAs'&&str.viewAs){
					str2=get.translation(str.viewAs);
				}
				else{
					str2=get.translation(str.name);
				}
				if(str2=='杀'){
					if(str.nature=='fire'){
						str2='火'+str2;
					}
					else if(str.nature=='thunder'){
						str2='雷'+str2;
					}
				}
				if(get.itemtype(str)=='card'&&str.suit&&str.number){
					str2+='【'+get.translation(get.suit(str))+get.number(str)+'】'
				}
				return str2;
			}
			if(get.itemtype(str)=='cards'||get.itemtype(str)=='players'){
				var str2=get.translation(str[0],arg);
				for(var i=1;i<str.length;i++){
					str2+='、'+get.translation(str[i],arg);
				}
				return str2;
			}
			return lib.translate[str]||str;
		},
		cnNumber:function(num,two){
			if(num==Infinity) return '∞';
			if(typeof num!='number') return num;
			if(num<0||num>99) return num;
			if(num<=10){
				switch(num){
					case 0:return '〇';
					case 1:return '一';
					case 2:return two?'二':'两';
					case 3:return '三';
					case 4:return '四';
					case 5:return '五';
					case 6:return '六';
					case 7:return '七';
					case 8:return '八';
					case 9:return '九';
					case 10:return '十';
				}
			}
			if(num<20){
				return '十'+get.cnNumber(num-10,true);
			}
			var x=Math.floor(num/10);
			return get.cnNumber(x,true)+'十'+(num>10*x?get.cnNumber(num-10*x,true):'');
		},
		selectableButtons:function(sort){
			if(!_status.event.player) return[];
			var buttons=_status.event.dialog.buttons;
			var selectable=[];
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].classList.contains('selectable')&&
					buttons[i].classList.contains('selected')==false){
					selectable.push(buttons[i]);
				}
			}
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		selectableCards:function(sort){
			if(!_status.event.player) return[];
			var cards=_status.event.player.get('hej');
			var selectable=[];
			for(var i=0;i<cards.length;i++){
				if(cards[i].classList.contains('selectable')&&
					cards[i].classList.contains('selected')==false){
					selectable.push(cards[i]);
				}
			}
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		skills:function(){
			if(!ui.skills) return [];
			return ui.skills.skills.slice(0);
		},
		selectableTargets:function(sort){
			var selectable=[];
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].classList.contains('selectable')&&
					game.players[i].classList.contains('selected')==false){
					selectable.push(game.players[i]);
				}
			}
			selectable.randomSort();
			if(sort){
				selectable.sort(sort);
			}
			return selectable;
		},
		filter:function(filter,i){
			if(typeof filter=='function') return filter;
			if(i==undefined) i=0;
			return function(){
				if(filter==arguments[i]) return true;
				for(var j in filter){
					if(filter.hasOwnProperty(j)){
						if(get.itemtype(arguments[i])=='card'){
							if(j=='type'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.type(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.type(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='subtype'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.subtype(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.subtype(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='color'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.color(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.color(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='suit'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.suit(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.suit(arguments[i])!=filter[j]) return false;
								}
							}
							else if(j=='number'){
								if(typeof filter[j]=='object'){
									if(filter[j].contains(get.number(arguments[i]))==false) return false;
								}
								else if(typeof filter[j]=='string'){
									if(get.number(arguments[i])!=filter[j]) return false;
								}
							}
							else if(typeof filter[j]=='object'){
								if(filter[j].contains(arguments[i][j])==false) return false;
							}
							else if(typeof filter[j]=='string'){
								if(arguments[i][j]!=filter[j]) return false;
							}
						}
						else{
							if(arguments[i][j]!=filter[j]) return false;
						}
					}
				}
				return true;
			}
		},
		cardCount:function(card,player){
			var num;
			if(card==true){
				num=0;
				var stat=player.getStat('card');
				for(var i in stat){
					if(typeof stat[i]=='number') num+=stat[i];
				}
				return num;
			}
			if(player==undefined) player=_status.event.player;
			if(typeof card=='object'){
				card=card.name;
			}
			num=player.getStat('card')[card];
			if(num==undefined) return 0;
			return num;
		},
		skillCount:function(skill,player){
			if(player==undefined) player=_status.event.player;
			var num=player.getStat('skill')[skill];
			if(num==undefined) return 0;
			return num;
		},
		owner:function(card){
			for(var i=0;i<game.players.length;i++){
				if(game.players[i].get('hej').contains(card)||game.players[i].judging==card)
					return game.players[i];
			}
		},
		noSelected:function(){
			return (ui.selected.buttons.length+ui.selected.cards.length+ui.selected.targets.length==0)
		},
		population:function(identity){
			if(identity==undefined) return game.players.length+game.dead.length;
			var i;
			var num=0;
			for(i=0;i<game.players.length;i++){
				if(game.players[i].identity==identity) num++;
			}
			return num;
		},
		totalPopulation:function(identity){
			if(identity==undefined) return game.players.length+game.dead.length;
			var i,players=game.players.concat(game.dead);
			var num=0;
			for(i=0;i<players.length;i++){
				if(players[i].identity==identity) num++;
			}
			return num;
		},
		tag:function(item,tag,item2){
			if(get.info(item)&&get.info(item).ai&&get.info(item).ai.tag){
				var result=get.info(item).ai.tag[tag];
			}
			if(typeof result=='function') return result(item,item2);
			return result;
		},
		sortCard:function(sort){
			var func;
			if(sort=='type_sort'){
				func=function(card){
					if(get.type(card)=='basic') return 2;
					if(get.type(card)=='stone') return -0.5;
					if(get.type(card)=='stonecharacter') return 1;
					if(get.type(card)=='chess') return 1.5;
					if(get.type(card)=='trick') return -1;
					if(get.type(card)=='delay') return -2;
					if(get.type(card)=='equip') return -3;
					return -4;
				}
			}
			else if(sort=='suit_sort'){
				func=function(card){
					if(get.suit(card)=='heart') return 2;
					if(get.suit(card)=='diamond') return 1;
					if(get.suit(card)=='spade') return -1;
					if(get.suit(card)=='club') return -2;
				}
			}
			else if(sort=='number_sort'){
				func=function(card){
					return get.number(card)-7+0.5;
				}
			}
			return func;
		},
		difficulty:function(){
			switch(get.config('difficulty')){
				case 'easy':return 1;
				case 'normal':return 2;
				case 'hard':return 3;
				default: return 1;
			}
		},
		cardPile:function(name){
			for(var i=0;i<ui.cardPile.childNodes.length;i++){
				if(ui.cardPile.childNodes[i].name==name){
					return ui.cardPile.childNodes[i];
				}
			}
			for(var i=0;i<ui.discardPile.childNodes.length;i++){
				if(ui.discardPile.childNodes[i].name==name){
					return ui.discardPile.childNodes[i];
				}
			}
		},
		aiStrategy:function(){
			switch(get.config('ai_strategy')){
				case 'ai_strategy_1':return 1;
				case 'ai_strategy_2':return 2;
				case 'ai_strategy_3':return 3;
				case 'ai_strategy_4':return 4;
				case 'ai_strategy_5':return 5;
				case 'ai_strategy_6':return 6;
				default: return 1;
			}
		},
		skillintro:function(name,learn,learn2){
			var str='';
			var skills=lib.character[name][3];
			var opacity;
			for(var i=0;i<skills.length;i++){
				if(lib.translate[skills[i]]&&lib.translate[skills[i]+'_info']&&lib.skill[skills[i]]){
					if(learn&&lib.skill[skills[i]].unique&&(learn2||!lib.skill[skills[i]].gainable)){
						opacity='opacity:0.5';
					}
					else{
						opacity='';
					}
					str+='<div class="skill" style="'+opacity+
					'">【'+get.translation(skills[i]).slice(0,2)+'】</div><div style="'+opacity+'">'+
					lib.translate[skills[i]+'_info']+'</div><div style="display:block;height:10px"></div>';
				}
			}
			return str;
		},
		intro:function(name){
			var info=lib.character[name];
			var str='性别：'+get.translation(info[0])+'<br/>';
			str+='势力：'+get.translation(info[1])+'<br/>';
			str+='体力：'+get.translation(info[2])+'<br/>';
			str+='技能：';
			if(info[3].length){
				str+=get.translation(info[3][0]);
				for(var i=1;i<info[3].length;i++){
					str+='、'+get.translation(info[3][i]);
				}
			}
			return str;
		},
		storageintro:function(type,content,player,dialog){
			switch(type){
				case 'mark':{
					if(content>0){
						return '共有'+content+'个标记';
					}
					return false;
				}
				case 'turn':{
					if(content>0){
						return '还剩'+content+'个回合';
					}
					return false;
				}
				case 'time':{
					if(content>0){
						return '还剩'+content+'次';
					}
					return false;
				}
				case 'limited':{
					if(content){
						return '已发动';
					}
					return '未发动';
				}
				case 'cardCount':{
					if(typeof content=='object'&&typeof content.length=='number'){
						return '共有'+get.cnNumber(content.length)+'张牌';
					}
					return false;
				}
				case 'card':case 'cards':{
					if(get.itemtype(content)=='card'){
						content=[content];
					}
					if(dialog&&get.itemtype(content)=='cards'){
						if(content.length>6&&!dialog._hovercustomed){
							dialog.addSmall(content);
						}
						else{
							dialog.add(content);
						}
					}
					else{
						if(content&&content.length){
							return get.translation(content);
						}
					}
					return false;
				}
				case 'player':case 'players':{
					if(get.itemtype(content)=='player'){
						content=[content];
					}
					if(dialog&&get.itemtype(content)=='players'){
						if(content.length>6&&!dialog._hovercustomed){
							dialog.addSmall(content);
						}
						else{
							dialog.add(content);
						}
						return false;
					}
					else{
						if(content&&content.length){
							return get.translation(content);
						}
						return false;
					}
				}
				default:{
					if(typeof type=='string'){
						return type.replace(/#/g,content);
					}
					else if(typeof type=='function'){
						return type(content,player);
					}
					return false;
				}
			}
		},
		nodeintro:function(node,simple){
			var uiintro=ui.create.dialog('hidden');
			if(node.classList.contains('player')&&!node.name){
				return uiintro;
			}
			var i,translation,intro,str;
			if(node.classList.contains('player')){
				var capt=get.translation(node.name);
				if(lib.character[node.name]){
					capt+='&nbsp;&nbsp;'+lib.translate[lib.character[node.name][1]];
				}
				uiintro.add(capt);
				var skills=node.skills;
				var skills2=game.filterSkills(node.skills,node);
				for(i=0;i<skills.length;i++){
					if(lib.translate[skills[i]+'_info']){
						translation=get.translation(skills[i]).slice(0,2);
						if(!skills2.contains(skills[i])){
							uiintro.add('<div style="opacity:0.5"><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
						}
						else{
							uiintro.add('<div><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
						}
					}
				}
				var forbidden=node.forbiddenSkills;
				for(i=0;i<forbidden.length;i++){
					if(lib.translate[forbidden[i]+'_info']){
						translation=get.translation(forbidden[i]).slice(0,2);
						uiintro.add('<div><div class="skill">【'+translation+'】</div><div>'+'已禁用'+'</div></div>');
					}
				}
				if(!simple){
					var storage=node.storage;
					for(i in storage){
						if(get.info(i)&&get.info(i).intro){
							intro=get.info(i).intro;
							if(node.get('s').concat(lib.skill.global).contains(i)==false&&!intro.show) continue;
							var name=intro.name?intro.name:get.translation(i);
							if(typeof name=='function'){
								name=name(storage[i],node);
							}
							translation='<div><div class="skill">『'+name[0]+name[1]+'』</div><div>';
							var stint=get.storageintro(intro.content,storage[i],node);
							if(stint){
								translation+=stint+'</div></div>';
								uiintro.add(translation);
							}
						}
					}
					uiintro.add(ui.create.div('.placeholder'));
					var table,tr,td;
					table=document.createElement('table');
					tr=document.createElement('tr');
					table.appendChild(tr);
					td=document.createElement('td');
					td.innerHTML='攻击范围';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='进攻距离';
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML='防御距离';
					tr.appendChild(td);

					tr=document.createElement('tr');
					table.appendChild(tr);
					td=document.createElement('td');
					td.innerHTML=get.attackRange(node);
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML=get.globalFrom(node);
					tr.appendChild(td);
					td=document.createElement('td');
					td.innerHTML=get.globalTo(node);
					tr.appendChild(td);

					uiintro.content.appendChild(table);
				}

				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('mark')&&node.info&&
				node.parentNode&&node.parentNode.parentNode&&node.parentNode.parentNode.classList.contains('player')){
				var info=node.info;
				var player=node.parentNode.parentNode;
				if(info.name){
					if(typeof info.name=='function'){
						var named=info.name(player.storage[node.skill],player);
						if(named){
							uiintro.add(named);
						}
					}
					else{
						uiintro.add(info.name);
					}
				}
				else if(info.name!==false){
					uiintro.add(get.translation(node.skill));
				}
				if(typeof info.mark=='function'){
					var stint=info.mark(uiintro,player.storage[node.skill],player);
					if(stint){
						if(stint.length<=10){
							uiintro.add('<div class="text center">'+stint+'</div>');
						}
						else{
							uiintro.add('<div class="text">'+stint+'</div>');
						}
					}
				}
				else{
					var stint=get.storageintro(info.content,player.storage[node.skill],player,uiintro);
					if(stint){
						if(stint.length<=10){
							uiintro.add('<div class="text center">'+stint+'</div>');
						}
						else{
							uiintro.add('<div class="text">'+stint+'</div>');
						}
					}
				}
				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('card')){
				var name=node.name;
				if(get.position(node)=='j'&&node.viewAs&&node.viewAs!=name){
					uiintro.add(get.translation(node.viewAs)+'（'+get.translation(node)+'）');
					name=node.viewAs;
				}
				else{
					uiintro.add(get.translation(node));
				}
				if(lib.translate[name+'_info']){
					uiintro.add('<div class="text">'+lib.translate[name+'_info']+'</div>');
				}
				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			else if(node.classList.contains('character')){
				var character=node.link;
				uiintro.add(get.translation(character));
				var skills=lib.character[character][3];
				for(i=0;i<skills.length;i++){
					if(lib.translate[skills[i]+'_info']){
						translation=get.translation(skills[i])[0]+get.translation(skills[i])[1];
						uiintro.add('<div><div class="skill">【'+translation+'】</div><div>'+lib.translate[skills[i]+'_info']+'</div></div>');
					}
				}
				uiintro.add(ui.create.div('.placeholder.slim'));
			}
			return uiintro;
		},
		groups:function(){
			return ['wei','shu','wu','qun'];
		},
		types:function(){
			var types=[];
			for(var i in lib.card){
				if(lib.card[i].mode&&lib.card[i].mode.contains(lib.config.mode)==false) continue;
				if(lib.card[i].forbid&&lib.card[i].forbid.contains(lib.config.mode)) continue;
				if(lib.card[i].type){
					if(lib.card[i].type=='delay') types.add('trick');
					else types.add(lib.card[i].type);
				}
			}
			return types;
		},
		links:function(buttons){
			var links=[];
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].link!=undefined) links.push(buttons[i].link);
			}
			return links;
		}
	};
	var ai={
		basic:{
			chooseButton:function(check){
				var event=_status.event;
				var i,j,range,buttons,buttons2;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectButton);
					if(range[1]==-1){
						j=0;
						for(i=0;i<ui.selected.buttons.length;i++){
							j+=check(ui.selected.buttons[i]);
						}
						return (j>0);
					}
					lib.temp={};
					buttons=get.selectableButtons();
					buttons2=buttons.slice(0);
					buttons.sort(function(a,b){
						return check(b,buttons2)-check(a,buttons2);
					});
					if(buttons.length==0){
						return ok;
					}
					if(check(buttons[0])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					buttons[0].classList.add('selected');
					ui.selected.buttons.add(buttons[0]);
					game.check();
					if(ui.selected.buttons.length>=range[0]){
						ok=true;
					}
					if(ui.selected.buttons.length==range[1]){
						return true;
					}
				}
			},
			chooseCard:function(check){
				var event=_status.event;
				if(event.filterCard==undefined) return (check()>0);
				var i,j,range,cards,cards2,skills,check,effect;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectCard);
					if(ui.selected.cards.length>=range[0]){
						ok=true;
					}
					if(range[1]==-1){
						if(ui.selected.cards.length==0) return true;
						j=0;
						for(i=0;i<ui.selected.cards.length;i++){
							effect=check(ui.selected.cards[i]);
							if(effect<0) j-=Math.sqrt(-effect);
							else j+=Math.sqrt(effect);
						}
						return (j>0);
					}
					lib.temp={};
					cards=get.selectableCards().concat(get.skills());
					cards2=cards.slice(0);
					cards.sort(function(a,b){
						return (check(b,cards2)-check(a,cards2));
					});
					if(cards.length==0){
						return ok;
					}
					if(check(cards[0])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					if(typeof cards[0]=='string'){
						ui.click.skill(cards[0]);
						var info=get.info(event.skill);
						if(info.filterCard){
							check=info.check||ai.get.unuseful2;
							return (ai.basic.chooseCard(check));
						}
						else{
							return true;
						}
					}
					else{
						cards[0].classList.add('selected');
						ui.selected.cards.add(cards[0]);
						game.check();
						if(ui.selected.cards.length>=range[0]){
							ok=true;
						}
						if(ui.selected.cards.length==range[1]){
							return true;
						}
					}
				}
			},
			chooseTarget:function(check){
				var event=_status.event;
				if(event.filterTarget==undefined) return (check()>0);
				var i,j,range,targets,targets2,effect;
				var ok=false,forced=event.forced;
				var iwhile=100;
				while(iwhile--){
					range=get.select(event.selectTarget);
					if(range[1]==-1){
						j=0;
						for(i=0;i<ui.selected.targets.length;i++){
							effect=check(ui.selected.targets[i]);
							if(effect<0) j-=Math.sqrt(-effect);
							else j+=Math.sqrt(effect);
						}
						return (j>0);
					}
					else if(range[1]==0){
						return check()>0
					}
					lib.temp={};
					targets=get.selectableTargets();
					targets2=targets.slice(0);
					targets.sort(function(a,b){
						return check(b)-check(a);
					});
					if(targets.length==0){
						return ok;
					}
					if(check(targets[0])<=0){
						if(!forced||ok){
							return ok;
						}
					}
					targets[0].classList.add('selected');
					ui.selected.targets.add(targets[0]);
					game.check();
					if(ui.selected.targets.length>=range[0]){
						ok=true;
					}
					if(ui.selected.targets.length==range[1]){
						return true;
					}
				}
			}
		},
		get:{
			useful:function(card){
				if(get.position(card)=='j') return -1;
				if(get.position(card)=='e') return ai.get.equipValue(card);
				if(lib.temp[card.name]==undefined) lib.temp[card.name]=[card];
				else lib.temp[card.name].add(card);
				var i=lib.temp[card.name].find(card);
				var aii=get.info(card).ai;
				var useful;
				if(aii&&aii.useful) useful=aii.useful;
				else if(aii&&aii.basic) useful=aii.basic.useful;
				if(useful==undefined) return -1;
				if(typeof useful=='function'){
					return useful(card,i);
				}
				if(typeof useful=='number') return useful;
				if(i<useful.length){
					return useful[i];
				}
				return useful[useful.length-1];
			},
			unuseful:function(card){
				return -ai.get.useful(card);
			},
			unuseful2:function(card){
				return 10-ai.get.useful(card);
			},
			value:function(card,player,method){
				var aii=get.info(card).ai;
				var value;
				if(aii&&aii.value) value=aii.value;
				else if(aii&&aii.basic) value=aii.basic.value;
				if(value==undefined) return 0;
				if(player==undefined||get.itemtype(player)!='player') player=_status.event.player;
				if(typeof value=='function') return value(card,player);
				if(typeof value=='number') return value;
				if(get.objtype(value)=='array'){
					if(method=='raw') return value[0];
					var num=0,i;
					var cards=player.get('h');
					for(i=0;i<cards.length;i++){
						if(cards[i].name==card.name&&
							cards[i]!=card&&
							cards[i].classList.contains('selected')==false) num++;
					}
					if(num<value.length) return value[num];
					return value[value.length-1];
				}
				return 0;
			},
			equipValue:function(card,player){
				if(player==undefined||get.itemtype(player)!='player') player=get.owner(card);
				if(player==undefined||get.itemtype(player)!='player') player=_status.event.player;
				var info=get.info(card);
				if(!info.ai) return 0;
				var value=info.ai.equipValue;
				if(value==undefined){
					if(info.ai.basic&&info.ai.basic.equipValue!=undefined){
						value=info.ai.basic.equipValue;
					}
					else return 0;
				}
				if(typeof value=='number') return value;
				if(typeof value=='function') return value(card,player);
				return 0;
			},
			disvalue:function(card,player){
				return -ai.get.value(card,player);
			},
			skillthreaten:function(skill,player,target){
				if(!lib.skill[skill]) return 1;
				if(!lib.skill[skill].ai) return 1;
				var threaten=lib.skill[skill].ai.threaten;
				if(typeof threaten=='number') return threaten;
				if(typeof threaten=='function'){
					player=player||_status.event.player;
					target=target||player;
					return threaten(player,target);
				}
				return 1;
			},
			order:function(item){
				var aii=get.info(item).ai;
				var order;
				if(aii&&aii.order) order=aii.order;
				else if(aii&&aii.basic) order=aii.basic.order;
				if(order==undefined) return -1;
				if(typeof(order)=='function'){
					return order(item,_status.event.player);
				}
				return order;
			},
			result:function(item){
				var result;
				if(get.info(item).ai) result=get.info(item).ai.result;
				if(result==undefined) return {};
				if(typeof(result)=='function') return result(item);
				return result;
			},
			effect:function(target,card,player,player2){
				var event=_status.event;
				if(player==undefined) player=_status.event.player;
				if(typeof card!='string'&&(typeof card!='object'||!card.name)){
					if(event.skill&&get.info(event.skill).viewAs==undefined) card=_status.event.skill;
					else card=get.card();
				}
				var result=ai.get.result(card);
				var result1=result.player,result2=result.target;
				if(typeof result1=='function') result1=result1(player,target,card);
				if(typeof result2=='function') result2=result2(player,target,card);
				if(typeof result1!='number') result1=0;
				if(typeof result2!='number') result2=0;
				var temp1,temp2,temp3,temp01=0,temp02=0,threaten=1;
				var skills1=player.get('s').concat(lib.skill.global);
				game.expandSkills(skills1);
				var zerotarget=false,zeroplayer=false;
				for(var i=0;i<skills1.length;i++){
					temp1=get.info(skills1[i]).ai;
					if(temp1&&typeof temp1.effect=='object'&&typeof temp1.effect.player=='function'){
						temp1=temp1.effect.player(card,player,target,result1);
					}
					else temp1=undefined;
					if(typeof temp1=='object'){
						if(temp1.length==2||temp1.length==4){
							result1*=temp1[0];
							temp01+=temp1[1];
						}
						if(temp1.length==4){
							result2*=temp1[2];
							temp02+=temp1[3];
						}
					}
					else if(typeof temp1=='number'){
						result1*=temp1;
					}
					else if(temp1=='zeroplayer'){
						zeroplayer=true;
					}
					else if(temp1=='zerotarget'){
						zerotarget=true;
					}
				}
				if(target){
					var skills2=target.get('s').concat(lib.skill.global);
					game.expandSkills(skills2);
					for(var i=0;i<skills2.length;i++){
						temp2=get.info(skills2[i]).ai;
						if(temp2&&temp2.threaten) temp3=temp2.threaten;
						else temp3=undefined;
						if(temp2&&typeof temp2.effect=='function'){
							temp2=temp2.effect(card,player,target,result2);
						}
						else if(temp2&&typeof temp2.effect=='object'&&typeof temp2.effect.target=='function'){
							temp2=temp2.effect.target(card,player,target,result2);
						}
						else temp2=undefined;
						if(typeof temp2=='object'){
							if(temp2.length==2||temp2.length==4){
								result2*=temp2[0];
								temp02+=temp2[1];
							}
							if(temp2.length==4){
								result1*=temp2[2];
								temp01+=temp2[3];
							}
						}
						else if(typeof temp2=='number'){
							result2*=temp2;
						}
						else if(temp2=='zeroplayer'){
							zeroplayer=true;
						}
						else if(temp2=='zerotarget'){
							zerotarget=true;
						}
						if(typeof temp3=='function'&&temp3(player,target)!=undefined){
							threaten*=temp3(player,target);
						}
						else if(typeof temp3=='object'){
							if(typeof temp3.target=='number'){
								threaten*=temp3;
							}
							else if(typeof temp3.target=='function'&&temp3(player,target)!=undefined){
								threaten*=temp3(player,target);
							}
						}
						else if(typeof temp3=='number'){
							threaten*=temp3;
						}
					}
					result2+=temp02;
					result1+=temp01;
					if(ai.get.attitude(player,target)<0){
						result2*=threaten;
					}
					else{
						result2*=Math.sqrt(threaten);
					}
					if(target.hp<=1) result2*=2;
					if(target.hp==2) result2*=1.1;
					if(target.num('h')==0){
						result2*=1.1;
						if(get.tag(card,'respondSha')||get.tag(card,'respondShan')) result2*=1.4;
					}
					if(target.num('h')==1) result2*=1.05;
					if(target.num('h')==2) result2*=1.02;
					if(target.num('h')>3) result2*=0.9;
					if(target.hp==4) result2*=0.9;
					if(target.hp==5) result2*=0.8;
					if(target.hp>5) result2*=0.6;
				}
				else{
					result2+=temp02;
					result1+=temp01;
				}
				if(zeroplayer) result1=0;
				if(zerotarget) result2=0;
				if(player2){
					return (result1*ai.get.attitude(player2,player)+(target?result2*ai.get.attitude(player2,target):0));
				}
				return (result1*ai.get.attitude(player,player)+(target?result2*ai.get.attitude(player,target):0));
			},
			damageEffect:function(target,player,viewer,nature){
				if(!player){
					player=target;
				}
				if(!viewer){
					viewer=target;
				}
				var name='damage';
				if(nature=='fire'){
					name='firedamage';
				}
				else if(nature=='thunder'){
					name='thunderdamage';
				}
				return ai.get.effect(target,{name:name},player,viewer);
			},
			recoverEffect:function(target,player,viewer){
				if(target.hp==target.maxHp) return 0;
				if(!player){
					player=target;
				}
				if(!viewer){
					viewer=target;
				}
				return ai.get.effect(target,{name:'recover'},player,viewer);
			},
			buttonValue:function(button){
				var card=button.link;
				var player=get.owner(card);
				if(!player) player=_status.event.player;
				if(player.get('j').contains(card)){
					var efff=ai.get.effect(player,card,player,player);
					if(efff>0) return 0.5;
					if(efff==0) return 0;
					return -1.5;
				}
				if(player.get('e').contains(card)){
					return ai.get.equipValue(card)/3;
				}
				var nh=player.num('h');
				switch(nh){
					case 1:return 2;
					case 2:return 1.6;
					case 3:return 1;
					case 4:return 0.8;
					case 5:return 0.6;
					default:return 0.4;
				}
			},
			attitude2:function(to){
				return ai.get.attitude(_status.event.player,to);
			},
			players:function(range,sort){
				var players=[];
				if(range.max==undefined) range.max=Infinity;
				if(range.min==undefined) range.min=-Infinity;
				if(range.player==undefined) range.player=_status.event.player;
				for(var i=0;i<game.players.length;i++){
					if(ai.get.attitude(range.player,game.players[i])<=range.max&&
						ai.get.attitude(range.player,game.players[i])>=range.min){
						players.push(game.players[i]);
					}
				}
				if(sort) players.sort(sort);
				return players;
			}
		},
	};
	lib.init.init();
		HTMLDivElement.prototype.animate=function(name){
			this.classList.add(name);
			var that=this;
			setTimeout(function(){
				that.classList.remove(name);
			},1000);
			return this;
		};
		HTMLDivElement.prototype.hide=function(){
			this.classList.add('hidden');
			return this;
		};
		HTMLDivElement.prototype.unfocus=function(){
			this.classList.add('transparent');
			return this;
		};
		HTMLDivElement.prototype.refocus=function(){
			this.classList.remove('transparent');
			return this;
		};
		HTMLDivElement.prototype.show=function(){
			this.classList.remove('hidden');
			return this;
		};
		HTMLDivElement.prototype.delete=function(time){
			if(time==undefined) time=500;
			this.classList.add('removing');
			var that=this;
			this.timeout=setTimeout(function(){
				that.remove();
				that.classList.remove('removing');
			},time);
			return this;
		};
		HTMLDivElement.prototype.goto=function(position,time){
			if(time==undefined) time=500;
			this.classList.add('removing');
			var that=this;
			this.timeout=setTimeout(function(){
				position.appendChild(that);
				that.classList.remove('removing');
				delete that.destiny;
			},time);
			this.destiny=position;
			return this;
		};
		HTMLDivElement.prototype.fix=function(){
			clearTimeout(this.timeout);
			delete this.destiny;
			this.classList.remove('removing');
			return this;
		};
		HTMLDivElement.prototype.setBackground=function(name,type){
			var src;
			if(type){
				src='image/'+type+'/default/'+name+'.jpg';
			}
			else{
				src='image/'+name+'.jpg';
			}
			this.style.backgroundImage="url('"+src+"')";
			this.style.backgroundSize="cover";
			return this;
		};
		HTMLDivElement.prototype.listen=function(func){
			this.addEventListener(lib.config.touchscreen?'touchend':'click',function(e){
				if(_status.dragged) return;
				func.call(this,e);
			})
			return this;
		};
		HTMLDivElement.prototype.setPosition=function(){
			var position;
			if(arguments.length==4){
				position=[];
				for(var i=0;i<arguments.length;i++) position.push(arguments[i]);
			}
			else if(arguments.length==1&&get.objtype(arguments[0])=='array'&&arguments[0].length==4){
				position=arguments[0];
			}
			else{
				return this;
			}
			var top='calc('+position[0]+'% ';
			if(position[1]>0) top+='+ '+position[1]+'px)';
			else top+='- '+Math.abs(position[1])+'px)';
			var left='calc('+position[2]+'% ';
			if(position[3]>0) left+='+ '+position[3]+'px)';
			else left+='- '+Math.abs(position[3])+'px)';
			this.style.top=top;
			this.style.left=left;
			return this;
		};
		HTMLDivElement.prototype.css=function(style){
			for(var i in style){
				if(i=='innerHTML'){
					this.innerHTML=style[i];
				}
				else{
					this.style[i]=style[i];
				}
			}
			return this;
		};
		HTMLDivElement.prototype.transform=function(transform){
			var str='';
			for(var i in transform){
				switch(i){
					case 'scale':str+='scale('+transform[i]+') ';break;
					case 'rotate':str+='rotate('+transform[i]+'deg) ';break;
				}
			}
			if(typeof transform=='object'){
				if(transform.left&&transform.top){
					str+='translate('+parseInt(transform.left)+'px,'+parseInt(transform.top)+'px) ';
				}
				else if(transform.left){
					str+='translate('+parseInt(transform.left)+'px) ';
				}
				else if(transform.top){
					str+='translate(0,'+parseInt(transform.top)+'px) ';
				}
			}
			this.style.webkitTransform=str;
			return this;
		};
		HTMLTableElement.prototype.get=function(row,col){
			if(row<this.childNodes.length){
				return this.childNodes[row].childNodes[col];
			}
		};
		Array.prototype.find=function(item){
			return this.indexOf(item);
		};
		Array.prototype.contains=function(item){
			return this.indexOf(item)!=-1;
		};
		Array.prototype.add=function(){
			for(var i=0;i<arguments.length;i++){
				if(this.contains(arguments[i])){
					return false;
				}
				this.push(arguments[i]);
			}
			return this;
		};
		Array.prototype.remove=function(item){
			if(get.objtype(item)=='array'){
				for(var i=0;i<item.length;i++) this.remove(item[i]);
				return;
			}
			var pos=this.find(item);
			if(pos==-1){
				return false;
			}
			this.splice(pos,1);
			return this;
		};
		Array.prototype.randomGet=function(){
			var arr=this.slice(0);
			for(var i=0;i<arguments.length;i++) arr.remove(arguments[i]);
			return arr[Math.floor(Math.random()*arr.length)];
		};
		Array.prototype.randomRemove=function(){
			var num=Math.floor(Math.random()*this.length);
			return this.splice(num,1)[0];
		};
		Array.prototype.randomSort=function(){
			var list=[];
			while(this.length){
				list.push(this.randomRemove());
			}
			for(var i=0;i<list.length;i++){
				this.push(list[i]);
			}
			return this;
		};
		Array.prototype.randomGets=function(num){
			var arr=this.slice(0);
			var list=[];
			for(var i=0;i<num;i++){
				list.push(arr.splice(Math.floor(Math.random()*arr.length),1)[0]);
			}
			return list;
		};
		window.cheat={
			i:function(){
				window.game=game;
				window.ui=ui;
				window.get=get;
				window.ai=ai;
				window.lib=lib;
				window._status=_status;
			},
			h:function(num){
				for(var i=0;i<game.players[num].num('h');i++){
					console.log(game.players[num].num('h')[i].name)
				}
			},
			g:function(name,target){
				target=target||game.me;
				for(var i=0;i<ui.cardPile.childNodes.length;i++){
					if(ui.cardPile.childNodes[i].name==name){
						var card=ui.cardPile.childNodes[i];
						target.node.handcards1.appendChild(card);
						game.check();
						target.update();
						return;
					}
				}
				for(var i=0;i<ui.discardPile.childNodes.length;i++){
					if(ui.discardPile.childNodes[i].name==name){
						var card=ui.discardPile.childNodes[i];
						target.node.handcards1.appendChild(card);
						game.check();
						target.update();
						return;
					}
				}
			},
			ge:function(){
				cheat.g('zhuge');
				cheat.g('qilin');
				cheat.g('bagua');
				cheat.g('dilu');
				cheat.g('chitu');
				cheat.g('muniu');
			},
			gj:function(){
				cheat.g('shandian');
				cheat.g('huoshan');
				cheat.g('hongshui');
				cheat.g('lebu');
				cheat.g('bingliang');
				cheat.g('guiyoujie');
			},
			d:function(num,target){
				if(num==undefined) num=1;
				var cards=get.cards(num);
				for(var i=0;i<num;i++){
					var card=cards[i];
					game.me.node.handcards1.appendChild(card);
					game.check();
					game.me.update();
				}
			},
			s:function(skill){
				game.me.addSkill(skill);
				game.check();
			},
			t:function(num){
				if(num==undefined){
					for(var i=0;i<game.players.length;i++) cheat.t(i);
					return;
				}
				var player=game.players[num];
				var cards=player.get('hej');
				for(var i=0;i<cards.length;i++){
					ui.discardPile.appendChild(cards[i]);
				}
				player.update();
			},
			k:function(i){
				if(i==undefined) i=1;
				game.players[i].hp=1;
				cheat.t(i);
				cheat.g('juedou');
			},
			z:function(name){
				game.zhu.init(name);
				game.zhu.maxHp++;
				game.zhu.hp++;
				game.zhu.update();
			},
			cp:function(){
				cheat.z('caopi');
			},
			cc:function(){
				cheat.z('recaocao');
			},
			ls:function(){
				cheat.z('liushan');
			},
			zj:function(){
				cheat.z('spzhangjiao');
			}
		}
		window.countGroups=function(){
			var a=0,b=0,c=0,d=0;
			var sa=0,sb=0,sc=0,sd=0;
			for(var i in lib.character){
				switch(lib.character[i][1]){
					case 'wei':a++;if(lib.config.forbidsingle.contains(i)) sa++;break;
					case 'shu':b++;if(lib.config.forbidsingle.contains(i)) sb++;break;
					case 'wu':c++;if(lib.config.forbidsingle.contains(i)) sc++;break;
					case 'qun':d++;if(lib.config.forbidsingle.contains(i)) sd++;break;
				}
			}
			console.log('魏：'+(a-sa)+'/'+a);
			console.log('蜀：'+(b-sb)+'/'+b);
			console.log('吴：'+(c-sc)+'/'+c);
			console.log('群：'+(d-sd)+'/'+d);
			return ((a+b+c+d)-(sa+sb+sc+sd))+'/'+(a+b+c+d);
		}
		window.countSkills=function(){
			for(var i in lib.skill){
			if(lib.translate[i+'_info']){
			console.log(lib.translate[i],lib.translate[i+'_info'])
			}
			}
		}
		window.countCards=function(){
			var a=0,b=0,c=0,d=0;
			var aa=0,bb=0,cc=0,dd=0;
			var sa=0,sb=0,sc=0,sd=0;
			var sha=0,shan=0,tao=0,jiu=0,wuxie=0,heisha=0,hongsha=0;
			var num={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0};
			for(var i in lib.card){
				if(typeof lib.card[i]=='object'){
					switch(lib.card[i].type){
						case 'basic':a++;break;
						case 'trick':b++;break;
						case 'equip':c++;break;
						default:d++;break;
					}
				}
			}
			for(var i=0;i<lib.card.list.length;i++){
				if(typeof lib.card[lib.card.list[i][2]]=='object'){
					switch(lib.card[lib.card.list[i][2]].type){
						case 'basic':aa++;break;
						case 'trick':case 'delay':bb++;break;
						case 'equip':cc++;break;
						default:dd++;break;
					}
					switch(lib.card.list[i][0]){
						case 'heart':sa++;break;
						case 'diamond':sb++;break;
						case 'club':sc++;break;
						case 'spade':sd++;break;
					}
					if(lib.card.list[i][2]=='sha'){
						sha++;
						if(lib.card.list[i][0]=='club'||lib.card.list[i][0]=='spade'){
							heisha++;
						}
						else{
							hongsha++;
						}
					}
					if(lib.card.list[i][2]=='shan'){
						shan++;
					}
					if(lib.card.list[i][2]=='tao'){
						tao++;
					}
					if(lib.card.list[i][2]=='jiu'){
						jiu++;
					}
					if(lib.card.list[i][2]=='wuxie'){
						wuxie++;
					}
					num[lib.card.list[i][1]]++;
				}
			}
			var str='基本牌'+aa+'； '+'锦囊牌'+bb+'； '+'装备牌'+cc+'； '+'其它牌'+dd
			console.log(str);
			str='红桃牌'+sa+'； '+'方片牌'+sb+'； '+'梅花牌'+sc+'； '+'黑桃牌'+sd
			console.log(str);
			str='杀'+sha+'； '+'黑杀'+heisha+'； '+'红杀'+hongsha+'； '+'闪'+shan+'； '+'桃'+tao+'； '+'酒'+jiu+'； '+'无懈'+wuxie
			console.log(str);
			str='';
			for(var i=1;i<=13;i++){
				str+=num[i]+' ';
			}
			console.log(str);
			return aa+bb+cc+dd;
		}
		window.onkeydown=function(e){
			if(e.keyCode==32){
				var node=ui.window.querySelector('#paused');
				if(node){
					node.click();
				}
				else{
					ui.click.pause();
				}
			}
			else if(e.keyCode==65){
				if(ui.auto) ui.auto.click();
			}
			else if(e.keyCode==87){
				if(ui.wuxie&&ui.wuxie.style.display!='none'){
					ui.wuxie.classList.toggle('glow')
				}
			}
			else if(e.keyCode==67){
				var node=ui.window.querySelector('#click');
				if(node){
					node.click();
				}
				else{
					ui.click.config();
				}
			}
			else if(e.keyCode==116||((e.ctrlKey||e.metaKey)&&e.keyCode==82)){
				_status.reloading=true;
				game.reload();
			}
		};
		window.onload=function(){
			document.body.onresize=ui.updatex;
			if(lib.config.touchscreen){
				document.body.addEventListener('touchstart',function(e){
					this.startX=e.touches[0].clientX;
					this.startY=e.touches[0].clientY;
					_status.dragged=false;
				});
				document.body.addEventListener('touchmove',function(e){
					if(_status.dragged) return;
					if (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
						Math.abs(e.touches[0].clientY - this.startY) > 10) {
						_status.dragged=true;
					}
				});
			}
			ui.background=document.querySelector('.background.static');
			ui.background.classList.remove('static');
			ui.dynamicBackground=document.querySelector('.background.dynamic');
			var i,j,k;
			for(i in mode[lib.config.mode].element){
				if(!lib.element[i]) lib.element[i]=[];
				for(j in mode[lib.config.mode].element[i]){
					if(j=='init'){
						if(!lib.element[i].inits) lib.element[i].inits=[];
						lib.element[i].inits.push(lib.init.eval(mode[lib.config.mode].element[i][j]));
					}
					else{
						lib.element[i][j]=lib.init.eval(mode[lib.config.mode].element[i][j]);
					}
				}
			}
			for(i in mode[lib.config.mode].ai){
				if(typeof mode[lib.config.mode].ai[i]=='object'){
					if(ai[i]==undefined) ai[i]={};
					for(j in mode[lib.config.mode].ai[i]){
						ai[i][j]=lib.init.eval(mode[lib.config.mode].ai[i][j]);
					}
				}
				else{
					ai[i]=lib.init.eval(mode[lib.config.mode].ai[i]);
				}
			}
			for(i in mode[lib.config.mode].ui){
				if(typeof mode[lib.config.mode].ui[i]=='object'){
					if(ui[i]==undefined) ui[i]={};
					for(j in mode[lib.config.mode].ui[i]){
						ui[i][j]=lib.init.eval(mode[lib.config.mode].ui[i][j]);
					}
				}
				else{
					ui[i]=lib.init.eval(mode[lib.config.mode].ui[i]);
				}
			}
			for(i in mode[lib.config.mode].game){
				game[i]=lib.init.eval(mode[lib.config.mode].game[i]);
			}
			for(i in mode[lib.config.mode].get){
				get[i]=lib.init.eval(mode[lib.config.mode].get[i]);
			}
			lib.config.current_mode=mode[lib.config.mode].config||[];
			lib.config.mode_choice=mode[lib.config.mode].config;
			for(i in mode[lib.config.mode]){
				if(i=='element') continue;
				if(i=='game') continue;
				if(i=='ai') continue;
				if(i=='ui') continue;
				if(i=='get') continue;
				if(i=='config') continue;
				if(lib[i]==undefined) lib[i]=(get.objtype(mode[lib.config.mode][i])=='array')?[]:{};
				for(j in mode[lib.config.mode][i]){
					lib[i][j]=lib.init.eval(mode[lib.config.mode][i][j]);
				}
			}
			for(i in character){
				if(character[i].forbid&&character[i].forbid.contains(lib.config.mode)) continue;
				if(character[i].mode&&character[i].mode.contains(lib.config.mode)==false) continue;
				for(j in character[i]){
					if(j=='mode'||j=='forbid') continue;
					if(j=='character'&&!lib.config.characters.contains(i)) continue;
					for(k in character[i][j]){
						if(j=='character'){
							if(!character[i][j][k][4]){
								character[i][j][k][4]=[];
							}
							if(lib.config.only_fullskin&&lib.config.layout=='newlayout'&&lib.config.mode!='chess'){
								if(!character[i][j][k][4].contains('fullskin')&&!character[i][j][k][4].contains('minskin')){
									continue;
								}
							}
						}
						if(lib[j][k]==undefined){
							lib[j][k]=lib.init.eval(character[i][j][k]);
							// if(j=='skill'||j=='character'){
							// 	lib[j][k].packname=i;
							// }
						}
						else{
							alert('dublicate '+j+' in character '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+character[i][j][k]);
						}
					}
				}
			}
			for(i in card){
				if(card[i].forbid&&card[i].forbid.contains(lib.config.mode)) continue;
				if(card[i].mode&&card[i].mode.contains(lib.config.mode)==false) continue;
				for(j in card[i]){
					if(j=='mode'||j=='forbid') continue;
					if(j=='list'){
						if(lib.config.cards.contains(i)){
							if(typeof card[i][j]=='function'){
								lib.card.list=lib.card.list.concat(lib.init.eval(card[i][j])());
							}
							else{
								lib.card.list=lib.card.list.concat(card[i][j]);
							}
						}
					}
					else{
						for(k in card[i][j]){
							if(lib[j][k]==undefined) lib[j][k]=lib.init.eval(card[i][j][k]);
							else alert('dublicate '+j+' in card '+i+':\n'+k+'\n'+lib[j][k]+'\n'+card[i][j][k])
						}
					}
				}
			}
			for(i in play){
				if(play[i].forbid&&play[i].forbid.contains(lib.config.mode)) continue;
				if(play[i].mode&&play[i].mode.contains(lib.config.mode)==false) continue;
				for(j in play[i].element){
					if(!lib.element[j]) lib.element[j]=[];
					for(k in play[i].element[j]){
						if(k=='init'){
							if(!lib.element[j].inits) lib.element[j].inits=[];
							lib.element[j].inits.push(lib.init.eval(play[i].element[j][k]));
						}
						else{
							lib.element[j][k]=lib.init.eval(play[i].element[j][k]);
						}
					}
				}
				for(j in play[i].ui){
					if(typeof play[i].ui[j]=='object'){
						if(ui[j]==undefined) ui[j]={};
						for(k in play[i].ui[j]){
							ui[j][k]=lib.init.eval(play[i].ui[j][k]);
						}
					}
					else{
						ui[j]=lib.init.eval(play[i].ui[j]);
					}
				}
				for(j in play[i].game){
					game[j]=lib.init.eval(play[i].game[j]);
				}
				for(j in play[i].get){
					get[j]=lib.init.eval(play[i].get[j]);
				}
				if(play[i].config){
					lib.config.current_mode=lib.config.current_mode.concat(play[i].config);
				}
				for(j in play[i]){
					if(j=='mode'||j=='forbid'||j=='init'||j=='element'||j=='game'||j=='get'||j=='config'||j=='ui') continue;
					for(k in play[i][j]){
						if(lib[j][k]!=undefined){
							console.log('dublicate '+j+' in play '+i+':\n'+k+'\n'+': '+lib[j][k]+'\n'+play[i][j][k]);
						}
						lib[j][k]=lib.init.eval(play[i][j][k]);
					}
				}
				if(typeof play[i].init=='function') (lib.init.eval(play[i].init))();
			}
			for(i=0;i<lib.card.list.length;i++){
				if(!lib.card[lib.card.list[i][2]]){
					lib.card.list.splice(i,1);i--;
				}
				else if(lib.card[lib.card.list[i][2]].mode&&
					lib.card[lib.card.list[i][2]].mode.contains(lib.config.mode)==false){
					lib.card.list.splice(i,1);i--;
				}
			}
			try{
				lib.storage=JSON.parse(localStorage.getItem(lib.configprefix+lib.config.mode));
				if(typeof lib.storage!='object') throw('err');
				if(lib.storage==null) throw('err');
			}
			catch(err){
				lib.storage={};
				localStorage.setItem(lib.configprefix+lib.config.mode,"{}");
			}
			if(lib.config.cheat) cheat.i();
			else{
				lib.cheat=window.cheat;
				delete window.cheat;
			}
			lib.config.sort_card=get.sortCard(lib.config.sort);
			delete window.config;
			delete window.mode;
			delete window.card;
			delete window.character;
			delete window.play;
			game.start();
			game.loop();
		};
		document.onmousemove=ui.click.windowmousemove;
		document.onmousedown=ui.click.windowmousedown;
		document.onmouseup=ui.click.windowmouseup;
		document.oncontextmenu=ui.click.right;
		document.ontouchend=function(e){
			if(e.touches.length==1&&!_status.dragged){
				ui.click.pause();
			}
		}
		document.ontouchmove = function(e) {
			e.preventDefault();
		};
}());
