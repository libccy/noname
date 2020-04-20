'use strict';
decadeParts.import(function(lib, game, ui, get, ai, _status){
	decadeUI.effect = {
		dialog:{
			create:function(titleText){
				return decadeUI.dialog.create('effect-dialog');
			},
			compare:function(source, target){
				var dialog = this.create();
				
				dialog.characters = [
					decadeUI.dialog.create('player1 character', dialog),
					decadeUI.dialog.create('player2 character', dialog)
				];
				
				decadeUI.dialog.create('back', dialog.characters[0]),
				decadeUI.dialog.create('back', dialog.characters[1]),
				
				dialog.content = decadeUI.dialog.create('content', dialog),
				dialog.buttons = decadeUI.dialog.create('buttons', dialog.content)
				
				dialog.cards = [
					decadeUI.dialog.create('player1 card', dialog.buttons),
					decadeUI.dialog.create('player2 card', dialog.buttons)
				];
				
				dialog.names = [
					decadeUI.dialog.create('player1 name', dialog.buttons),
					decadeUI.dialog.create('player2 name', dialog.buttons)
				];

				dialog.buttons.vs = decadeUI.dialog.create('vs', dialog.buttons);
				dialog.names[0].innerHTML = get.translation(source) + '发起';
				dialog.names[1].innerHTML = get.translation(target);
				
				dialog.set = function(attr, value){
					switch (attr) {
						case 'player1':
						case 'source':
							if (get.itemtype(value) != 'player' || value.isUnseen()) {
								dialog.characters[0].firstChild.style.backgroundImage = '';
								dialog.names[0].innerHTML = get.translation(value) + '发起';
								return false;
							} 
							
							var avatar = value.isUnseen(0) ? value.node.avatar2 : value.node.avatar;
							dialog.characters[0].firstChild.style.backgroundImage =  avatar.style.backgroundImage;
							dialog.names[0].innerHTML = get.translation(value) + '发起';
							break;
						
						case 'player2':
						case 'target':
							if (get.itemtype(value) != 'player' || value.isUnseen()) {
								dialog.characters[1].firstChild.style.backgroundImage = '';
								dialog.names[1].innerHTML = get.translation(value);
								return false;
							} 
							
							var avatar = value.isUnseen(0) ? value.node.avatar2 : value.node.avatar;
							dialog.characters[1].firstChild.style.backgroundImage =  avatar.style.backgroundImage;
							dialog.names[1].innerHTML = get.translation(value);
							break;
						
						case 'card1':
						case 'sourceCard':
							if (dialog.cards[0].firstChild) dialog.cards[0].removeChild(dialog.cards[0].firstChild);
							dialog.cards[0].appendChild(value);
							break;
						
						case 'card2':
						case 'targetCard':
							if (dialog.cards[1].firstChild) dialog.cards[1].removeChild(dialog.cards[1].firstChild);
							dialog.cards[1].appendChild(value);
							break;
						
						default:
							return false;
					}
					
					return true;
				},
				
				dialog.set('source', source);
				dialog.set('target', target);
				return dialog;
			},
		},
		gameStart:function(){
			game.playAudio('../extension', decadeUI.extensionName, 'audio/game_start.mp3');
			// 没素材 :(
			
			
			
		},
		line:function(dots){
			// decadeUI.delay(300);
			decadeUI.animate.add(function(source, target, e){
				var ctx = e.context;
				ctx.shadowColor = 'yellow';
				ctx.shadowBlur = 10;
				
				if (!this.head) this.head = 0;
				if (!this.tail) this.tail = -1;
				
				this.head += 0.06 * (e.deltaTime / 17);
				if (this.head >= 1) {
					this.head = 1;
					this.tail += (0.06 * (e.deltaTime / 17));
				}
				
				var tail = this.tail < 0 ? 0 : this.tail;
				var head = this.head;
				if (this.tail <= 1) {
					var x1 = e.lerp(source.x, target.x, tail);
					var y1 = e.lerp(source.y, target.y, tail);
					var x2 = e.lerp(source.x, target.x, head);
					var y2 = e.lerp(source.y, target.y, head);
					e.drawLine(x1, y1, x2, y2, 'rgb(250,220,140)', 2.5);
				} else {
					return true;
				}
			}, true, { x: dots[0], y: dots[1] }, { x: dots[2], y: dots[3] });
		},
		kill:function(source, target){
			if (get.itemtype(source) != 'player' || get.itemtype(target) != 'player') throw 'arguments';
			if (source == target) return;
			
			if (source.isUnseen() || target.isUnseen()) return;
			
			var sourceAvatar = source.isUnseen(0) ? source.node.avatar2 : source.node.avatar;
			var targetAvatar = target.isUnseen(0) ? target.node.avatar2 : target.node.avatar;
			
			var effect = decadeUI.dialog.create('effect-window');
			var killer = decadeUI.dialog.create('killer', effect);
			var victim = decadeUI.dialog.create('victim', effect);
			var lightLarge = decadeUI.dialog.create('li-big', effect);
			
			victim.back = decadeUI.dialog.create('back', victim);
			victim.rout = decadeUI.dialog.create('rout', victim);
			victim.rout2 = decadeUI.dialog.create('rout', victim);
			victim.back.part1 = decadeUI.dialog.create('part1', victim.back);
			victim.back.part2 = decadeUI.dialog.create('part2', victim.back);
			victim.rout.innerHTML = '破敌';
			victim.rout2.innerHTML = '破敌';
			victim.rout2.classList.add('shadow');
			
			killer.style.backgroundImage = sourceAvatar.style.backgroundImage;
			victim.back.part1.style.backgroundImage = targetAvatar.style.backgroundImage;
			victim.back.part2.style.backgroundImage = targetAvatar.style.backgroundImage;
			
			
			game.playAudio('../extension', decadeUI.extensionName, 'audio/kill_effect_sound.mp3');
			effect.style.backgroundColor = 'rgba(0,0,0,0.6)';
			effect.style.transition = 'all 3s';
			ui.window.appendChild(effect);
			var height = ui.window.offsetHeight;
			var x, y , scale;
			for (var i = 0; i < 10; i++) {
				x = decadeUI.getRandom(0, 100) + 'px';
				y = decadeUI.getRandom(0, height / 4) + 'px';
				x = decadeUI.getRandom(0, 1) == 1 ? x : '-' + x;
				y = decadeUI.getRandom(0, 1) == 1 ? y : '-' + y;
				scale = decadeUI.getRandom(1, 10) / 10;
				
				setTimeout(function(mx, my, mscale, meffect){
					var light = decadeUI.dialog.create('li', meffect);
					light.style.transform = 'translate(' + mx + ', ' + my + ')' + 'scale(' + mscale + ')';
				}, decadeUI.getRandom(50, 300), x, y, scale, effect);
			}
			
			decadeUI.delay(2000);
			effect.style.backgroundColor = '';
			effect.close(3000);
			effect = null;
		}
	};
});

