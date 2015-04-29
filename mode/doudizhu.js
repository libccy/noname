mode.doudizhu={
	game:{
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				lib.card.list=lib.list;
				lib.config.sort_card=function(card){
					return get.color(card)=='red';
				}
				game.prepareArena(3);
				game.delay();
				"step 1"
				game.gameDraw(game.me,17);
				game.decideZhu();
				"step 2"
				game.gameDraw(game.zhu);
				game.phaseLoop(game.zhu);
			}
		},
		checkResult:function(){
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
		decideZhu:function(){
			var next=game.createEvent('decideZhu',false);
			next.player=game.players.randomGet();
			next.content=function(){
				"step 0"
				player.chooseControl('jiaodizhu','bujiao');
				event.player=player.next;
				"step 1"
				player.previous.mark(result.control);
				if(result.control=='jiaodizhu') _status.jiao=true;
				if(_status.jiao){
					player.chooseControl('qiangdizhu','buqiang');
				}
				else{
					player.chooseControl('jiaodizhu','bujiao');
				}
				event.player=player.next;
				"step 2"
				player.previous.mark(result.control);
				if(result.control=='jiaodizhu') _status.jiao=true;
				if(_status.jiao){
					player.chooseControl('qiangdizhu','buqiang');
				}
				else{
					player.chooseControl('jiaodizhu','bujiao');
				}
				"step 3"
				player.mark(result.control);
			}
		},
	},
	translate:{
		poker_big:' ',
		poker_little:' ',
		poker_heart:' ',
		poker_diamond:' ',
		poker_club:' ',
		poker_spade:' ',
		jiaodizhu:'叫地主',
		bujiao:'不叫',
		qiangdizhu:'抢地主',
		buqiang:'不抢',
	},
	element:{
		player:{
			dieSpeak:function(){
				switch(this.identity){
					case 'zhu': this.popup('吾降矣',2000);break;
					case 'zhong': this.popup('呃啊',2000);break;
					case 'nei': this.popup('啊，被看穿了',2000);break;
					case 'fan': this.popup('饶命啊',2000);break;
				}
			},
			dieAfter:function(source){
				this.dieSpeak();
				if(get.config('show_identity')) this.setIdentity(this.identity);
				if(this==game.zhu||game.players.length==1) game.checkResult();
				else if(get.population('fan')+get.population('nei')==0) game.checkResult();
				else if(this.identity=='fan'&&source) source.draw(3);
				else if(this.identity=='zhong'&&source&&source.identity=='zhu'){
					source.discard(source.handcards.concat(source.equips));
				}
			}
		}
	},
	ai:{
		get:{
			attitude:function(from,to){
				if(_status.currentPhase==from&&from.storage.tempIgnore&&from.storage.tempIgnore.contains(to)) return 0;
				var situation=ai.get.situation();
				switch(from.identity){
					case 'zhu':
						switch(to.identity){
							case 'zhu': return 10;
							case 'zhong': return 6;
							case 'nei':
								if(game.players.length==2) return -10;
								return get.population('fan');
							case 'fan': return -4;
						}
					case 'zhong':
						switch(to.identity){
							case 'zhu': return 10;
							case 'zhong': return get.population('fan')>0?4:-1;
							case 'nei': return Math.min(3,-ai.get.situation());
							case 'fan': return -8;
						}
					case 'nei':
						switch(to.identity){
							case 'zhu':
								if(game.players.length==2) return -10;
								if(to.hp<=0) return 10;
								return get.population('fan')+Math.max(0,3-game.zhu.hp);
							case 'zhong': 
							if(get.population('fan')==0) return -5;
							if((game.zhu&&game.zhu.hp<=3)||ai.get.situation()<0) return 0;
							return -1;
							case 'nei':
							if(from==to) return 10;
							return -1;
							case 'fan': 
							if((game.zhu&&game.zhu.hp<=2)||ai.get.situation()<-1) return -4;
							if((game.zhu&&game.zhu.hp<=3)||ai.get.situation()<0) return -2;
							if((game.zhu&&game.zhu.hp>4)||ai.get.situation()>0) return 1;
							return 0;
						}
					case 'fan':
						switch(to.identity){
							case 'zhu': return -10;
							case 'zhong': return -4;
							case 'nei': return ai.get.situation();
							case 'fan': return 5;
						}
				}
			},
			situation:function(absolute){
				var i,j,player;
				var zhuzhong=0,total=0,zhu,fan=0;
				for(i=0;i<game.players.length;i++){
					player=game.players[i];
					j=player.handcards.length+player.equips.length*1.5+player.hp*2;
					if(player.identity=='zhu'){
						zhuzhong+=j*1.2+5;
						total+=j*1.2+5;
						zhu=j;
					}
					else if(player.identity=='zhong'){
						zhuzhong+=j*0.8+3;
						total+=j*0.8+3;
					}
					else if(player.identity=='fan'){
						zhuzhong-=j+4;
						total+=j+4;
						fan+=j+4;
					}
				}
				if(absolute) return zhuzhong;
				var result=parseInt(10*Math.abs(zhuzhong/total));
				if(zhuzhong<0) result=-result;
				// console.log(zhu,fan)
				if(zhu<12&&fan>30) result--;
				if(zhu<6&&fan>15) result--;
				if(zhu<4) result--;
				return result;
			},
			population:function(identity){
				return get.population(identity);
			}
		}
	},
	character:{
		dizhu:['male',0,'shu',[]],
		nongmin:['male',0,'qun',[]],
	},
	card:{
		poker_big:{},
		poker_little:{},
		poker_heart:{},
		poker_diamond:{},
		poker_club:{},
		poker_spade:{},
	},
	list:[
		['heart',1,'poker_heart'],
		['diamond',1,'poker_diamond'],
		['club',1,'poker_club'],
		['spade',1,'poker_spade'],
		['heart',2,'poker_heart'],
		['diamond',2,'poker_diamond'],
		['club',2,'poker_club'],
		['spade',2,'poker_spade'],
		['heart',3,'poker_heart'],
		['diamond',3,'poker_diamond'],
		['club',3,'poker_club'],
		['spade',3,'poker_spade'],
		['heart',4,'poker_heart'],
		['diamond',4,'poker_diamond'],
		['club',4,'poker_club'],
		['spade',4,'poker_spade'],
		['heart',5,'poker_heart'],
		['diamond',5,'poker_diamond'],
		['club',5,'poker_club'],
		['spade',5,'poker_spade'],
		['heart',6,'poker_heart'],
		['diamond',6,'poker_diamond'],
		['club',6,'poker_club'],
		['spade',6,'poker_spade'],
		['heart',7,'poker_heart'],
		['diamond',7,'poker_diamond'],
		['club',7,'poker_club'],
		['spade',7,'poker_spade'],
		['heart',8,'poker_heart'],
		['diamond',8,'poker_diamond'],
		['club',8,'poker_club'],
		['spade',8,'poker_spade'],
		['heart',9,'poker_heart'],
		['diamond',9,'poker_diamond'],
		['club',9,'poker_club'],
		['spade',9,'poker_spade'],
		['heart',10,'poker_heart'],
		['diamond',10,'poker_diamond'],
		['club',10,'poker_club'],
		['spade',10,'poker_spade'],
		['heart',11,'poker_heart'],
		['diamond',11,'poker_diamond'],
		['club',11,'poker_club'],
		['spade',11,'poker_spade'],
		['heart',12,'poker_heart'],
		['diamond',12,'poker_diamond'],
		['club',12,'poker_club'],
		['spade',12,'poker_spade'],
		['heart',13,'poker_heart'],
		['diamond',13,'poker_diamond'],
		['club',13,'poker_club'],
		['spade',13,'poker_spade'],
		['',14,'poker_little'],
		['',15,'poker_big'],
	]
}
