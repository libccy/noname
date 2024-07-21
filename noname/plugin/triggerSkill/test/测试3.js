(async function(){

/*
test1
全局触发器 afterAdd afterRemove
*/
/*
const {handle}=await game.addGlobalTriggerSkill({
    name:"_test1",
    marktext:"灵",
    translate:"灵力",
    intro:{
        content:"mark",
    },
    hook:{
        afterAdd:function(skill){
            console.log("skill:",skill);
            for(const player of game.players){
                player.setMark(skill,player.hp,false);
                player.markSkill(skill);                
            }
        },
        afterRemove:function(skill){
            for(const player of game.players){
                player.setMark(skill,0,false);
                player.unmarkSkill(skill);           
            }            
        },
    },
});

window._CS={};
window._CS.handle=handle;
*/

//test2
//handle.remove();

/*
test3
triggerTimes
*/
/*
const {name}=game.createTriggerSkill({
    name:"test3",
    triggerTimes:1,
    trigger:{
        player:"useCardAfter",
    },
    async content(event,trigger,player){
        await player.draw(2);
        //player.damage();
    },
});

game.me.addTriggerSkill(name);
})();
*/

/*
test4
expire
*/
/*
const {name}=game.createTriggerSkill({
    name:"test4",
    expire:{
        player:"phaseAfter",
    },
    trigger:{
        player:"useCardAfter",
    },
    async content(event,trigger,player){
        await player.draw(2);
    },
});

game.me.addTriggerSkill(name);

*/
/*
test5
变量传递
在其他角色的弃牌阶段结束后，你可对其造成一点伤害并封印其技能直到其下一位次的角色使用卡牌之后或回合结束之后
*/


lib.skill.test5={
    trigger:{
        global:"phaseDiscardAfter",
    },
    direct:true,
    async content(event,trigger,player){
        if(trigger.player===player) return;
                         
        const {result}=await player.chooseBool("是否封印其技能直到下一位次的角色的回合结束并对其造成一点伤害？");
        if(result.bool){
            //trigger.player.damage(1,player);
            trigger.player.draw();
                
            trigger.player.addSkill("fengyin");
                        
            const next=trigger.player.next;
            const {name}=game.createTriggerSkill({
                expire:{
                    player:"phaseAfter",
                },
                trigger:{
                    player:"useCardAfter",
                },                
                triggerTimes:1,
                async content(){},
                hook:{
                    afterRemove(){
                        trigger.player.removeSkill("fengyin");
                    },
                },
            });
            await next.addTriggerSkill(name);            
        }
    },
};

game.me.addSkill("test5");

})();