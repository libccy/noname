play.strategy={
	mode:['identity','guozhan','infinity'],
	game:{
		checkResult:function(){
			if(get.population('zhong')==0||(get.population('fan')+get.population('nei')==0)){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].spy=='zhong'){
						game.players[i].identity='zhong';
						game.players[i].setIdentity();
						game.players[i].draw(2);
						delete game.players[i].spy;
						delete game.players[i].storage._zhaoxiang
					}
				}
			}
			if(get.population('fan')==0||game.zhu.isDead()){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].spy=='fan'){
						game.players[i].identity='fan';
						game.players[i].setIdentity();
						game.players[i].draw(2);
						delete game.players[i].spy;
						delete game.players[i].storage._zhaoxiang
					}
				}
			}
			if(get.population('fan')+get.population('zhong')==0&&game.zhu.isAlive()){
				for(var i=0;i<game.players.length;i++){
					if(game.players[i].spy=='nei'){
						game.players[i].identity='nei';
						game.players[i].setIdentity();
						game.players[i].draw(2);
						delete game.players[i].spy;
						delete game.players[i].storage._zhaoxiang
					}
				}
			}
			if(game.zhu.isAlive()&&get.population('fan')+get.population('nei')>0) return;
			if(lib.storage.test){
				if(game.zhu.isAlive()){
					console.log('主忠胜利');
				}
				else if(game.players[0].identity=='nei'&&game.players.length==1){
					console.log('内奸胜利');
				}
				else{
					console.log('反贼胜利');
				}
			}
			for(var i=0;i<game.players.length;i++){
				game.players[i].setIdentity(game.players[i].identity);
			}
			if(game.me.identity=='zhu'||game.me.identity=='zhong'){
				if(game.zhu.classList.contains('dead')){
					game.over(false);
				}
				else{
					game.over(true);
				}
			}
			else if(game.me.identity=='nei'){
				if(get.population('fan')+get.population('zhu')+get.population('zhong')==0){
					game.over(true);
				}
				else{
					game.over(false);
				}
			}
			else{
				if(get.population('fan')+get.population('zhong')>0&&game.zhu.classList.contains('dead')){
					game.over(true);
				}
				else{
					game.over(false);
				}
			}
		},
	},
	skill:{
		_zhaoxiang:{
			mode:['identity','infinity'],
			enable:'chooseToUse',
			filter:function(event,player){
				if(player.num('h')==0) return false;
				if(player.spy) return false;
				if(event.dying==player) return false;
				if(event.type!='dying') return false;
				if(event.dying.storage._zhaoxiang) return false;
				if(event.dying.storage.zhaoxiang2==player&&event.dying.skills.contains('zhaoxiang2')) return false;
				if(lib.config.mode=='infinity'){
					if(player==game.me){
						if(get.population('zhong')<Math.max(2,4-get.difficulty())&&event.dying.identity=='fan') return true;
					}
					return false;
				}
				if(player.identity=='nei'||event.dying.identity=='zhu') return false;
				if(player.identityShown&&event.dying.identityShown){
					if(player.identity=='zhu'){
						if(event.dying.identity=='zhong') return false;
					}
					else if(player.identity==event.dying.identity) return false;
					return true;
				}
				return false;
			},
			filterCard:true,
			check:function(card){
				return ai.get.value(card);
			},
			discard:false,
			prepare:function(cards,player){
				player.$throw(cards);
			},
			content:function(){
				"step 0"
				game.log(get.translation(player)+'的出价为'+get.translation(cards));
				if(lib.config.mode=='identity'){
					event.parent.parent.dying.chooseControl('zhaoxiang_touxiang','zhaoxiang_zhaxiang','refuse',function(){
						if(Math.random()<ai.get.value(cards[0])/15) return 0;
						else if(Math.random()<0.4) return 1;
						return 2;
					});
				}
				else{
					event.parent.parent.dying.chooseControl('zhaoxiang_touxiang','refuse',function(){
						if(Math.random()<ai.get.value(cards[0])/15) return 0;
						return 1;
					});
				}
				"step 1"
				game.delay(2);
				"step 2"
				if(result.control=='zhaoxiang_touxiang'||result.control=='zhaoxiang_zhaxiang'){
					event.parent.parent.dying.popup('agree');
					game.log(get.translation(event.parent.parent.dying)+'投降');
					event.parent.parent.dying.storage._zhaoxiang=event.parent.parent.dying.identity;
					event.parent.parent.dying.gain(cards);
					event.parent.parent.dying.$gain2(cards);
					if(player.identity=='zhu'){
						event.parent.parent.dying.identity='zhong';
					}
					else{
						event.parent.parent.dying.identity=player.identity;
					}
					event.parent.parent.dying.setIdentity();
					event.parent.parent.dying.recover(1-event.parent.parent.dying.hp);
					if(event.parent.parent.dying.identity=='zhong'){
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identityShown&&game.players[i].identity=='fan') game.players[i].draw();
						}
					}
					else{
						for(var i=0;i<game.players.length;i++){
							if(game.players[i].identityShown&&game.players[i].identity=='zhong'||
								game.players[i].identity=='zhu') game.players[i].draw();
						}
					}
					if(result.control=='zhaoxiang_zhaxiang'){
						event.parent.parent.dying.addSkill('strategy_zhaxiang');
						event.parent.parent.dying.spy=event.parent.parent.dying.storage._zhaoxiang;
						event.parent.parent.dying.ai.shown=0.1;
					}
				}
				else{
					event.parent.parent.dying.popup('refuse');
					game.log(get.translation(event.parent.parent.dying)+'拒绝投降');
					event.parent.parent.dying.addSkill('zhaoxiang2');
					event.parent.parent.dying.storage.zhaoxiang2=player;
					event.parent.parent.dying.draw();
					player.$gain2(cards);
					player.gain(cards);
				}
				"step 3"
				game.checkResult();
			},
			intro:{
				content:function(storage){
					return '已被招降，原来身份为'+get.translation(storage+'2');
				},
				show:true
			},
			ai:{
				result:{
					player:function(){
						return Math.random()-0.4;
					}
				}
			}
		},
		zhaoxiang2:{
			trigger:{global:'phaseAfter'},
			forced:true,
			popup:false,
			content:function(){
				player.removeSkill('zhaoxiang2');
				delete player.storage.zhaoxiang2;
			}
		},
		_xianshen:{
			mode:['identity'],
			enable:'phaseUse',
			filter:function(event,player){
				return !player.identityShown;
			},
			content:function(){
				player.identityShown=true;
				player.setIdentity();
				if(player.identity=='nei') player.draw(3);
				else player.draw();
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						if(player.ai.shown==0.95) return 1;
						if(player.ai.shown>=0.4&&player.num('h')<player.hp) return 1;
						return 0;
					},
				}
			}
		},
		_panbian:{
			mode:['identity'],
			enable:'phaseUse',
			filter:function(event,player){
				return typeof player.storage._zhaoxiang=='string'&&player.skills.contains('strategy_zhaxiang')==false;
			},
			filterCard:true,
			selectCard:2,
			check:function(card){
				return 6-ai.get.value(card);
			},
			content:function(){
				player.identity=player.storage._zhaoxiang;
				player.setIdentity();
				delete player.storage._zhaoxiang;
			},
			ai:{
				order:10,
				result:{
					player:function(player){
						if(player.identity=='zhong') return -ai.get.situation();
						return ai.get.situation();
					},
				}
			}
		},
		strategy_zhaxiang:{
			trigger:{player:['useCardBefore','useSkillBefore']},
			forced:true,
			popup:false,
			filter:function(event,player){
				if(!player.spy) return false;
				if(event.targets&&event.targets.length==1&&event.targets[0]!=player){
					return Math.random()<1/3;
				}
				return false;
			},
			content:function(){
				trigger.untrigger();
				trigger.finish();
				player.discard(player.get('he'));
				player.identity=player.spy;
				player.setIdentity();
				delete player.spy;
				player.popup('strategy_zhaxiang');
				game.log(get.translation(player)+'暴露了真实身份');
				delete player.storage._zhaoxiang;
			}
		}
	},
	translate:{
		_zhaoxiang:'招降',
		_xianshen:'现身',
		_panbian:'叛变',
		zhaoxiang_touxiang:'投降',
		zhaoxiang_zhaxiang:'诈降',
		strategy_zhaxiang:'暴露',
	}
}