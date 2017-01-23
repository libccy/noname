character.old={
    character:{
        zhangjiao:['male','qun',3,['leiji','guidao','huangtian'],['zhu']],
		masu:['male','shu',3,['xinzhan','huilei']],
		xushu:['male','shu',3,['wuyan','jujian']],
		fazheng:['male','shu',3,['enyuan','xuanhuo']],
		liru:['male','qun',3,['juece','mieji','fencheng']],
        yujin:['male','wei',4,['jieyue']],
		lusu:['male','wu',3,['haoshi','dimeng']],
		yuanshao:['male','qun',4,['luanji','xueyi'],['zhu']],
		old_zhonghui:['male','wei',3,['zzhenggong','zquanji','zbaijiang']],
        old_xusheng:['male','wu',4,['pojun']],
        old_zhuran:['male','wu',4,['olddanshou']],
        old_lingtong:['male','wu',4,['oldxuanfeng']],
        old_madai:['male','shu',4,['mashu','oldqianxi']],
        old_caoxiu:['male','wei',4,['taoxi']],
    },
    skill:{
        oldqianxi:{
            trigger:{source:'damageBefore'},
            check:function(event,player){
                var att=ai.get.attitude(player,event.player);
                if(event.player.hp==event.player.maxHp) return att<0;
                if(event.player.hp==event.player.maxHp-1&&
                    (event.player.maxHp<=3||event.player.hasSkillTag('maixie'))) return att<0;
                return att>0;
            },
            filter:function(event,player){
                return event.card&&event.card.name=='sha'&&get.distance(player,event.player)<=1;
            },
            logTarget:'player',
            content:function(){
                'step 0'
                player.judge(function(card){
                    return get.suit(card)!='heart'?1:-1;
                });
                'step 1'
                if(result.bool){
                    trigger.untrigger();
                    trigger.finish();
                    trigger.player.loseMaxHp(true);
                }
            }
        },
        oldxuanfeng:{
			audio:'xuanfeng',
			trigger:{player:'loseEnd'},
			direct:true,
			filter:function(event,player){
                for(var i=0;i<event.cards.length;i++){
                    if(event.cards[i].original=='e') return true;
                }
				return false;
			},
			content:function(){
				"step 0"
				player.chooseTarget(get.prompt('xuanfeng'),function(card,player,target){
                    if(target==player) return false;
                    return get.distance(player,target)<=1||player.canUse('sha',target,false);
				}).set('ai',function(target){
                    if(get.distance(player,target)<=1){
                        return ai.get.damageEffect(target,player,player)*2;
                    }
                    else{
                        return ai.get.effect(target,{name:'sha'},player,player);
                    }
				});
				"step 1"
				if(result.bool){
					player.logSkill('xuanfeng',result.targets);
                    var target=result.targets[0];
                    var distance=get.distance(player,target);
                    if(distance<=1&&player.canUse('sha',target,false)){
                        player.chooseControl('出杀','造成伤害').ai=function(){
                            return '造成伤害';
                        }
                        event.target=target;
                    }
                    else if(distance<=1){
                        target.damage();
                        event.finish();
                    }
                    else{
                        player.useCard({name:'sha'},target,false).animate=false;
                        game.delay();
                        event.finish();
                    }
				}
				else{
					event.finish();
				}
				"step 2"
                var target=event.target;
				if(result.control=='出杀'){
                    player.useCard({name:'sha'},target,false).animate=false;
                    game.delay();
                }
                else{
                    target.damage();
                }
			},
			ai:{
				effect:{
					target:function(card,player,target,current){
						if(get.type(card)=='equip') return [1,3];
					}
				},
				noe:true
			}
		},
    },
    translate:{
        old_xusheng:'旧徐盛',
        old_lingtong:'旧凌统',
        old_zhuran:'旧朱然',
        old_madai:'旧马岱',
        old_caoxiu:'旧曹休',

        oldqianxi:'潜袭',
        oldqianxi_info:'当你使用【杀】对距离为1的目标角色造成伤害时，你可以进行一次判定，若判定结果不为红桃，你防止此伤害，令其减1点体力上限',
        oldxuanfeng:'旋风',
        oldxuanfeng_info:'每当你失去一次装备区里的牌时，你可以执行下列两项中的一项：1.视为对任意一名其他角色使用一张【杀】（此【杀】不计入每回合的使用限制）；2.对与你距离1以内的一名其他角色造成一点伤害',
    }
}
