// gameconfig.push(ui.create.switcher('cheat',lib.config.cheat,ui.click.sidebar.cheat));
// gameconfig.push(ui.create.switcher('auto_confirm',lib.config.auto_confirm,ui.click.sidebar.global));
// gameconfig.push(ui.create.switcher('enable_drag',lib.config.enable_drag,ui.click.sidebar.global));
// ui.wuxie_self=ui.create.switcher('wuxie_self',lib.config.wuxie_self,ui.click.sidebar.global);
// gameconfig.push(ui.wuxie_self);
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
// gameconfig.push(ui.create.switcher('no_ios_zoom',lib.config.no_ios_zoom,ui.click.sidebar.global));
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
if(true||lib.config.no_ios_zoom){
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
appearence.push(ui.create.switcher('bottom_line',lib.config.bottom_line,ui.click.sidebar.bottom_line));
appearence.push(ui.create.switcher('line_dash',lib.config.line_dash,ui.click.sidebar.global2));
appearence.push(ui.create.switcher('show_name',lib.config.show_name,ui.click.sidebar.show_name));
appearence.push(ui.create.switcher('show_replay',lib.config.show_replay,ui.click.sidebar.show_replay));
appearence.push(ui.create.switcher('show_playerids',lib.config.show_playerids,ui.click.sidebar.show_playerids));
appearence.push(ui.create.switcher('show_pause',lib.config.show_pause,ui.click.sidebar.show_pause));
appearence.push(ui.create.switcher('show_auto',lib.config.show_auto,ui.click.sidebar.show_auto));
appearence.push(ui.create.switcher('show_volumn',lib.config.show_volumn,ui.click.sidebar.show_volumn));
appearence.push(ui.create.switcher('show_wuxie',lib.config.show_wuxie,ui.click.sidebar.show_wuxie));
appearence.push(ui.create.switcher('show_wuxie_self',lib.config.show_wuxie_self,ui.click.sidebar.global));
appearence.push(ui.create.switcher('show_discardpile',lib.config.show_discardpile,ui.click.sidebar.global));
appearence.push(ui.create.div('.placeholder'));
appearence.push(ui.create.switcher('title',lib.config.title,ui.click.sidebar.title));

appearence.push(ui.create.switcher('fold_card',lib.config.fold_card,ui.click.sidebar.fold_card));
appearence.push(ui.create.switcher('threed_card',lib.config.threed_card,ui.click.sidebar.threed_card));
appearence.push(ui.create.switcher('blur_ui',lib.config.blur_ui,ui.click.sidebar.blur_ui));
appearence.push(ui.create.switcher('right_sidebar',lib.config.right_sidebar,ui.click.sidebar.right_sidebar));
appearence.push(ui.create.switcher('animation',lib.config.animation,ui.click.sidebar.global));
appearence.push(ui.create.switcher('config_menu',lib.config.config_menu,ui.click.sidebar.global));

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

folditems.push(autoskill);
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
