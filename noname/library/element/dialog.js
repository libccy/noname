import { AI as ai } from '../../ai/index.js';
import { Get as get } from '../../get/index.js';
import { Game as game } from '../../game/index.js';
import { Library as lib } from "../index.js";
import { status as _status } from '../../status/index.js';
import { UI as ui } from '../../ui/index.js';

export class Dialog extends HTMLDivElement {
	// @ts-ignore
	constructor() {
		let hidden = false;
		let noTouchScroll = false;
		let forceButton = false;
		let noForceButton = false;
		/** @type {this} */
		// @ts-ignore
		const dialog = ui.create.div('.dialog');
		Object.setPrototypeOf(dialog, Dialog.prototype);
		dialog.contentContainer = ui.create.div('.content-container', dialog);
		dialog.content = ui.create.div('.content', dialog.contentContainer);
		dialog.bar1 = ui.create.div('.bar.top', dialog);
		dialog.bar2 = ui.create.div('.bar.bottom', dialog);
		dialog.buttons = [];
		Array.from(arguments).forEach(argument => {
			if (typeof argument == 'boolean') dialog.static = argument;
			else if (argument == 'hidden') hidden = true;
			else if (argument == 'notouchscroll') noTouchScroll = true;
			else if (argument == 'forcebutton') forceButton = true;
			else if (argument == 'noforcebutton') noForceButton = true;
			else dialog.add(argument);
		});
		if (!hidden) dialog.open();
		if (!lib.config.touchscreen) dialog.contentContainer.onscroll = ui.update;
		if (!noTouchScroll) {
			dialog.contentContainer.ontouchstart = ui.click.dialogtouchStart;
			dialog.contentContainer.ontouchmove = ui.click.touchScroll;
			dialog.contentContainer.style.webkitOverflowScrolling = 'touch';
			dialog.ontouchstart = ui.click.dragtouchdialog;
		}
		if (noForceButton) dialog.noforcebutton = true;
		else if (forceButton) {
			dialog.forcebutton = true;
			dialog.classList.add('forcebutton');
		}
		return dialog;
	}
	add(item, noclick, zoom) {
		if (typeof item == 'string') {
			if (item.startsWith('###')) {
				var items = item.slice(3).split('###');
				this.add(items[0], noclick, zoom);
				this.addText(items[1], items[1].length <= 20, zoom);
			}
			else if (noclick) {
				var strstr = item;
				item = ui.create.div('', this.content);
				item.innerHTML = strstr;
			}
			else {
				item = ui.create.caption(item, this.content);
			}
		}
		else if (['div', 'fragment'].includes(get.objtype(item))) {
			this.content.appendChild(item);
		}
		else if (get.itemtype(item) == 'cards') {
			var buttons = ui.create.div('.buttons', this.content);
			if (zoom) buttons.classList.add('smallzoom');
			this.buttons = this.buttons.concat(ui.create.buttons(item, 'card', buttons, noclick));
		}
		else if (get.itemtype(item) == 'players') {
			var buttons = ui.create.div('.buttons', this.content);
			if (zoom) buttons.classList.add('smallzoom');
			this.buttons = this.buttons.concat(ui.create.buttons(item, 'player', buttons, noclick));
		}
		else if (item[1] == 'textbutton') {
			ui.create.textbuttons(item[0], this, noclick);
		}
		else {
			var buttons = ui.create.div('.buttons', this.content);
			if (zoom) buttons.classList.add('smallzoom');
			this.buttons = this.buttons.concat(ui.create.buttons(item[0], item[1], buttons, noclick));
		}
		if (this.buttons.length) {
			if (this.forcebutton !== false) this.forcebutton = true;
			if (this.buttons.length > 3 || (zoom && this.buttons.length > 5)) {
				this.classList.remove('forcebutton-auto');
			}
			else if (!this.noforcebutton) {
				this.classList.add('forcebutton-auto');
			}
		}
		ui.update();
		return item;
	}
	addText(str, center) {
		if (str && str.startsWith('<div')) this.add(str);
		else if (center !== false) {
			this.add('<div class="text center">' + str + '</div>');
		}
		else {
			this.add('<div class="text">' + str + '</div>');
		}
		return this;
	}
	addSmall(item, noclick) {
		return this.add(item, noclick, true);
	}
	addAuto(content) {
		if (content && content.length > 4 && !this._hovercustomed) {
			this.addSmall(content);
		}
		else {
			this.add(content);
		}
	}
	open() {
		if (this.noopen) return;
		for (var i = 0; i < ui.dialogs.length; i++) {
			if (ui.dialogs[i] == this) {
				this.show();
				this.refocus();
				ui.dialogs.remove(this);
				ui.dialogs.unshift(this);
				ui.update();
				return this;
			}
			if (ui.dialogs[i].static) ui.dialogs[i].unfocus();
			else ui.dialogs[i].hide();
		}
		ui.dialog = this;
		var translate;
		if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
			translate = lib.config.dialog_transform;
			this._dragtransform = translate;
			this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(0.8)';
		}
		else {
			this.style.transform = 'scale(0.8)';
		}
		this.style.transitionProperty = 'opacity,transform';
		this.style.opacity = 0;
		ui.arena.appendChild(this);
		ui.dialogs.unshift(this);
		ui.update();
		ui.refresh(this);
		if (lib.config.remember_dialog && lib.config.dialog_transform && !this.classList.contains('fixed')) {
			this.style.transform = 'translate(' + translate[0] + 'px,' + translate[1] + 'px) scale(1)';
		}
		else {
			this.style.transform = 'scale(1)';
		}
		this.style.opacity = 1;
		var that = this;
		setTimeout(function () {
			that.style.transitionProperty = '';
		}, 500);
		return this;
	}
	close() {
		ui.dialogs.remove(this);
		this.delete();
		if (ui.dialogs.length > 0) {
			ui.dialog = ui.dialogs[0];
			ui.dialog.show();
			ui.dialog.refocus();
			ui.update();
		}
		// if(ui.arenalog){
		// 	ui.arenalog.classList.remove('withdialog');
		// }
		return this;
	}
	setCaption(str) {
		this.querySelector('.caption').innerHTML = str;
		return this;
	}
}