'use strict';
mode.boss={
	game:{
		start:function(){
			var next=game.createEvent('game',false);
			next.content=function(){
				"step 0"
				ui.create.arena();
				var dialog=ui.create.dialog('还没完工~');
				dialog.style.height='52px';
				dialog.style.background=' rgba(0,0,0,0.2)';
				dialog.style.boxShadow=' rgba(0, 0, 0, 0.3) 0 0 0 1px';
				dialog.style.borderRadius='8px';
				dialog.style.top='calc(50% - 52px)';
				game.pause();
				"step 1"
				console.log(1);
			}
		}
	}
}
