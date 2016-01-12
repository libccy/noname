play.character={
	// mode:['identity','guozhan','versus'],
	video:function(list){
		this.init(list);
		for(var i in this.skill){
			lib.skill[i]=this.skill[i];
		}
	},
	init:function(videolist){
		var list=[],list2=[];
		var i,j,name;
		for(i in lib.character){
			if(lib.config.forbidai.contains(i)) continue;
			if(lib.config.forbidall.contains(i)) continue;
			if(lib.config.banned.contains(i)) continue;
			if(lib.character[i][4]&&lib.character[i][4].contains('forbidai')) continue;
			if(lib.character[i][4]&&lib.character[i][4].contains('boss')) continue;
			if(!get.config('double_character')&&get.config('ban_weak')&&lib.config.forbidsingle.contains(i)) continue;
			if(get.config('double_character')&&lib.config.forbiddouble.contains(i)) continue;
			list.push(i);
		}
		list.randomSort();
		list=list.splice(0,Math.ceil(lib.card.list.length*(parseFloat(lib.config.character_num_playpackconfig)||0)));
		if(_status.video){
			if(videolist){
				list=videolist;
			}
		}
		else{
			lib.video.push({
				type:'play',
				init:list,
				name:'character'
			});
		}
		var suit=['heart','diamond','club','spade'];
		for(i=0;i<list.length;i++){
			name=list[i]+'_charactercard';
			lib.card[name]={
				enable:true,
				type:'character',
				image:'character/'+list[i],
				color:'white',
				opacity:1,
				textShadow:'black 0 0 2px',
				chongzhu:true,
				filterTarget:function(card,player,target){
					return player==target;
				},
				selectTarget:-1,
				content:function(){
					var name=card.name.slice(0,card.name.indexOf('_charactercard'));
					target.$gain2(card);
					var skills=lib.character[name][3];
					var list=[];
					var targetskills=target.get('s');
					for(var j=0;j<skills.length;j++){
						if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
							!lib.skill[skills[j]].unique&&
							!targetskills.contains(skills[j])){
							list.push(skills[j]);
						}
					}
					target.removeSkill('charactercard');
					if(list.length){
						var skill=list.randomGet();
						target.popup(skill);
						game.log(target,'获得技能','【'+get.translation(skill)+'】');
						target.addSkill(skill);
						target.skills.remove(skill);
						target.additionalSkills.charactercard=skill;
						target.checkMarks();
						target.storage.charactercard=card;
						target.addSkill('charactercard');
					}
					else{
						target.draw(2);
					}
				},
				ai:{
					order:9,
					result:{
						target:(function(name){
							return function(player,target){
								if(target.additionalSkills.charactercard) return 0;
								return lib.character[name][2]<=4?1:0;
							}
						}(list[i]))
					}
				}
			};
			lib.translate[name]=get.translation(list[i]);
			lib.translate[name+'_info']=get.skillintro(list[i],true,true);
			list2.push([suit.randomGet(),Math.ceil(Math.random()*13),name]);
		}
		lib.card.list=lib.card.list.concat(list2);
	},
	help:{
		'技能卡牌':'<ul><li>牌堆中随机加入5%的技能牌<li>出牌阶段对自己使用，'+
		'随机获得卡牌对应角色的一项技能直到使用者的下一个出牌阶段开始'+
		'<li>一个角色最多只能通过技能卡牌获得一个技能，新获得技能后将失去之前以此法获得的技能'+
		'<li>不能获得主公技、限定技、觉醒技等特殊技能，以及场上只能唯一存在的技能'+
		'<li>若卡牌对应角色没有可获得的技能，目标摸两张牌'
	},
	skill:{
		charactercard:{
			trigger:{player:'phaseUseBegin'},
			forced:true,
			popup:false,
			mark:'card',
			intro:{
				name:function(storage,player){
					if(_status.video){
						if(player.marks.charactercard&&player.marks.charactercard.name){
							var name=player.marks.charactercard.name;
							if(name){
								name=name.slice(0,name.indexOf('_charactercard'));
								return get.translation(name);
							}
						}
						return '';
					}
					else{
						return get.translation(player.additionalSkills.charactercard);
					}
				},
				content:function(storage,player){
					if(_status.video){
						if(player.marks.charactercard&&player.marks.charactercard.name){
							var name=player.marks.charactercard.name;
							if(name){
								name=name.slice(0,name.indexOf('_charactercard'));
								return get.skillintro(name,true,true);
							}
						}
						return '';
					}
					else{
						return lib.translate[player.additionalSkills.charactercard+'_info'];
					}
				},
				onunmark:function(storage,player){
					delete player.additionalSkills.charactercard;
					delete player.storage.charactercard;
				}
			},
			content:function(){
				player.removeSkill('charactercard');
			}
		}
	}
}
