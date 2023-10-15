"use strict";
module("lib.config", ["lib"], (lib, game, ui, get, ai, _status) => {
    const _lib = {
        quickVoice: [
            '我从未见过如此厚颜无耻之人！',
            '这波不亏',
            '请收下我的膝盖',
            '你咋不上天呢',
            '放开我的队友，冲我来',
            '你随便杀，闪不了算我输',
            '见证奇迹的时刻到了',
            '能不能快一点啊，兵贵神速啊',
            '主公，别开枪，自己人',
            '小内再不跳，后面还怎么玩儿啊',
            '你们忍心，就这么让我酱油了？',
            '我，我惹你们了吗',
            '姑娘，你真是条汉子',
            '三十六计，走为上，容我去去便回',
            '人心散了，队伍不好带啊',
            '昏君，昏君啊！',
            '风吹鸡蛋壳，牌去人安乐',
            '小内啊，您老悠着点儿',
            '不好意思，刚才卡了',
            '你可以打得再烂一点吗',
            '哥们，给力点儿行嘛',
            '哥哥，交个朋友吧',
            '妹子，交个朋友吧',
        ]
    };

    const configMenu = {
        general: {
            name: '通用',
            config: {
                mount_combine: {
                    name: '合并坐骑栏',
                    init: false,
                    intro: '<li>将进攻坐骑栏和防御坐骑栏合并为同一个位置（重启后生效）。',
                    restart: true,
                },
                low_performance: {
                    name: '流畅模式',
                    init: false,
                    intro: '减少部分游戏特效，提高游戏速度',
                    onclick: function (bool) {
                        game.saveConfig('low_performance', bool);
                        if (bool) {
                            ui.window.classList.add('low_performance');
                        }
                        else {
                            ui.window.classList.remove('low_performance');
                        }
                    }
                },
                compatiblemode: {
                    name: '兼容模式',
                    init: false,
                    intro: '开启兼容模式可防止扩展使游戏卡死并提高对旧扩展的兼容性，但对游戏速度有一定影响，若无不稳定或不兼容的扩展建议关闭',
                    onclick: function (bool) {
                        game.saveConfig('compatiblemode', bool);
                        if (bool) {
                            ui.window.classList.add('compatiblemode');
                        }
                        else {
                            ui.window.classList.remove('compatiblemode');
                        }
                    }
                },
                confirm_exit: {
                    name: '确认退出',
                    init: false,
                    unfrequent: true,
                    intro: '离开游戏前弹出确认对话框',
                },
                keep_awake: {
                    name: '屏幕常亮',
                    init: false,
                    unfrequent: true,
                    intro: '防止屏幕自动关闭<br>注：旧版本通过NoSleep.js实现的屏幕常亮可能会影响外置音频的音量',
                    onclick: function (bool) {
                        game.saveConfig('keep_awake', bool);
                        if (bool) {
                            if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.keepAwake();
                            else if (window.noSleep) {
                                document.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function enableNoSleepX() {
                                    document.removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', enableNoSleepX, false);
                                    window.noSleep.enable();
                                }, false);
                            }
                        }
                        else {
                            if (window.plugins && window.plugins.insomnia) window.plugins.insomnia.allowSleepAgain();
                            else if (window.noSleep) window.noSleep.disable();
                        }
                    }
                },
                auto_confirm: {
                    name: '自动确认',
                    init: true,
                    unfrequent: true,
                    intro: '当候选目标只有1个时，点击目标后无需再点击确认',
                },
                skip_shan: {
                    name: '无闪自动取消',
                    init: false,
                    unfrequent: true,
                    intro: '当自己需要使用或打出【闪】时，若自己没有【闪】，则跳过该步骤',
                },
                unauto_choose: {
                    name: '拆顺手牌选择',
                    init: false,
                    unfrequent: true,
                    intro: '拆牌或者顺牌时，就算只能选择对方的手牌依然手动选择',
                },
                wuxie_self: {
                    name: '不无懈自己',
                    init: true,
                    unfrequent: true,
                    intro: '自己使用的单目标普通锦囊即将生效时，不询问无懈',
                },
                tao_enemy: {
                    name: '不对敌方出桃',
                    init: false,
                    intro: '双方阵营明确的模式中（如对决），敌方角色濒死时不询问出桃',
                    unfrequent: true,
                },
                enable_drag: {
                    name: '启用拖拽',
                    init: true,
                    intro: '按住卡牌后可将卡牌拖至目标',
                    unfrequent: true,
                },
                enable_dragline: {
                    name: '拖拽指示线',
                    init: true,
                    unfrequent: true,
                    intro: '拖拽时显示虚线，可能降低游戏速度',
                },
                enable_touchdragline: {
                    name: '拖拽指示线',
                    init: false,
                    unfrequent: true,
                    intro: '拖拽时显示虚线，可能降低游戏速度',
                },
                // enable_pressure:{
                // 	name:'启用压感',
                // 	init:false,
                // 	intro:'开启后可通过按压执行操作',
                // 	unfrequent:true,
                // },
                // pressure_taptic:{
                // 	name:'触觉反馈',
                // 	init:false,
                // 	intro:'开启后按压操作执行时将产生震动',
                // 	unfrequent:true,
                // },
                // pressure_click:{
                // 	name:'按压操作',
                // 	init:'pause',
                // 	intro:'在空白区域按压时的操作',
                // 	unfrequent:true,
                // 	item:{
                // 		pause:'暂停',
                // 		config:'选项',
                // 		auto:'托管',
                // 	}
                // },
                touchscreen: {
                    name: '触屏模式',
                    init: false,
                    restart: true,
                    unfrequent: true,
                    intro: '开启后可使触屏设备反应更快，但无法使用鼠标操作',
                    onclick: function (bool) {
                        if (get.is.nomenu('touchscreen', bool)) return false;
                        game.saveConfig('touchscreen', bool);
                    }
                },
                swipe: {
                    name: '滑动手势',
                    init: true,
                    unfrequent: true,
                    intro: '在非滚动区域向四个方向滑动可执行对应操作',
                },
                swipe_down: {
                    name: '下划操作',
                    init: 'menu',
                    unfrequent: true,
                    intro: '向下滑动时执行的操作',
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_down', item)) return false;
                        game.saveConfig('swipe_down', item);
                    }
                },
                swipe_up: {
                    name: '上划操作',
                    intro: '向上滑动时执行的操作',
                    init: 'auto',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_up', item)) return false;
                        game.saveConfig('swipe_up', item);
                    }
                },
                swipe_left: {
                    name: '左划操作',
                    intro: '向左滑动时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_left', item)) return false;
                        game.saveConfig('swipe_left', item);
                    }
                },
                swipe_right: {
                    name: '右划操作',
                    intro: '向右滑动时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管',
                        chat: '显示聊天',
                        off: '关闭',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('swipe_right', item)) return false;
                        game.saveConfig('swipe_right', item);
                    }
                },
                round_menu_func: {
                    name: '触屏按钮操作',
                    intro: '点击屏幕中圆形按钮时执行的操作',
                    init: 'system',
                    unfrequent: true,
                    item: {
                        system: '显示按钮',
                        menu: '打开菜单',
                        pause: '切换暂停',
                        auto: '切换托管'
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('round_menu_func', item)) return false;
                        game.saveConfig('round_menu_func', item);
                    },
                },
                show_splash: {
                    name: '显示开始界面',
                    intro: '游戏开始前进入模式选择画面',
                    init: 'init',
                    item: {
                        off: '关闭',
                        init: '首次启动',
                        always: '保持开启',
                    }
                },
                game_speed: {
                    name: '游戏速度',
                    init: 'mid',
                    item: {
                        vslow: '慢',
                        slow: '较慢',
                        mid: '中',
                        fast: '较快',
                        vfast: '快',
                        vvfast: '很快',
                    },
                    intro: '设置不同游戏操作间的时间间隔'
                },
                sync_speed: {
                    name: '限制结算速度',
                    intro: '在动画结算完成前不执行下一步操作，开启后游戏操作的间隔更长但画面更浏畅，在游戏较卡时建议开启',
                    init: true
                },
                enable_vibrate: {
                    name: '开启震动',
                    intro: '回合开始时使手机震动',
                    init: false
                },
                right_click: {
                    name: '右键操作',
                    init: 'pause',
                    intro: '在空白区域点击右键时的操作',
                    unfrequent: true,
                    item: {
                        pause: '暂停',
                        shortcut: '工具',
                        config: '选项',
                        auto: '托管',
                    },
                    onclick: function (item) {
                        if (get.is.nomenu('right_click', item)) return false;
                        game.saveConfig('right_click', item);
                    }
                },
                longpress_info: {
                    name: '长按显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '长按后弹出菜单',
                },
                right_info: {
                    name: '右键显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '右键点击后弹出菜单',
                },
                hover_all: {
                    name: '悬停显示信息',
                    init: true,
                    unfrequent: true,
                    restart: true,
                    intro: '悬停后弹出菜单',
                },
                hover_handcard: {
                    name: '悬停手牌显示信息',
                    init: true,
                    unfrequent: true,
                    intro: '悬停手牌后弹出菜单',
                },
                hoveration: {
                    name: '悬停菜单弹出时间',
                    unfrequent: true,
                    intro: '鼠标移至目标到弹出菜单的时间间隔',
                    init: '1000',
                    item: {
                        '500': '0.5秒',
                        '700': '0.7秒',
                        '1000': '1秒',
                        '1500': '1.5秒',
                        '2500': '2.5秒',
                    }
                },
                doubleclick_intro: {
                    name: '双击显示武将资料',
                    init: true,
                    unfrequent: true,
                    intro: '双击武将头像后显示其资料卡',
                },
                video: {
                    name: '保存录像',
                    init: '20',
                    intro: '游戏结束后保存录像在最大条数，超过后将从最早的录像开始删除（已收藏的录像不计入条数）',
                    item: {
                        '0': '关闭',
                        '5': '五局',
                        '10': '十局',
                        '20': '二十局',
                        '50': '五十局',
                        '10000': '无限',
                    },
                    unfrequent: true,
                },
                max_loadtime: {
                    name: '最长载入时间',
                    intro: '设置游戏从启动到完成载入所需的最长时间，超过此时间未完成载入会报错，若设备较慢或安装了较多扩展可适当延长此时间',
                    init: '5000',
                    unfrequent: true,
                    item: {
                        5000: '5秒',
                        10000: '10秒',
                        20000: '20秒',
                        60000: '60秒'
                    },
                    onclick: function (item) {
                        game.saveConfig('max_loadtime', item);
                        if (item == '5000') {
                            localStorage.removeItem(lib.configprefix + 'loadtime');
                        }
                        else {
                            localStorage.setItem(lib.configprefix + 'loadtime', item);
                        }
                    }
                },
                mousewheel: {
                    name: '滚轮控制手牌',
                    init: true,
                    unfrequent: true,
                    intro: '开启后滚轮可使手牌横向滚动，在mac等可横向滚动的设备上建议关闭',
                    onclick: function (bool) {
                        game.saveConfig('mousewheel', bool);
                        if (lib.config.touchscreen) return;
                        if (lib.config.mousewheel) {
                            ui.handcards1Container.onmousewheel = ui.click.mousewheel;
                            ui.handcards2Container.onmousewheel = ui.click.mousewheel;
                        }
                        else {
                            ui.handcards1Container.onmousewheel = null;
                            ui.handcards2Container.onmousewheel = null;
                        }
                    }
                },
                auto_check_update: {
                    name: '自动检查游戏更新',
                    intro: '进入游戏时检查更新',
                    init: false,
                    unfrequent: true
                },
                lucky_star: {
                    name: '幸运星模式',
                    intro: '在涉及随机数等的技能中，必定得到效果最好的结果。（联机模式无效）',
                    init: false,
                    unfrequent: true
                },
                dev: {
                    name: '开发者模式',
                    intro: '开启后可使用浏览器控制台控制游戏，同时可更新到开发版',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('dev', bool);
                        if (_status.connectMode) return;
                        if (bool) {
                            lib.cheat.i();
                        }
                        else {
                            delete window.cheat;
                            delete window.game;
                            delete window.ui;
                            delete window.get;
                            delete window.ai;
                            delete window.lib;
                            delete window._status;
                        }
                    },
                    unfrequent: true,
                },
                fuck_sojson: {
                    name: '检测加密扩展',
                    init: false,
                },
                errstop: {
                    name: '出错时停止游戏',
                    init: false,
                    unfrequent: true
                },
                update_link: {
                    name: '更新地址',
                    init: 'coding',
                    unfrequent: true,
                    item: {
                        coding: 'FastGit',
                        github: 'GitHub',
                    },
                    onclick: function (item) {
                        game.saveConfig('update_link', item);
                        lib.updateURL = lib.updateURLS[item] || lib.updateURLS.coding;
                    },
                },
                extension_source: {
                    name: '获取扩展地址',
                    init: 'GitHub Proxy',
                    unfrequent: true,
                    item: {},
                    intro: () => `获取在线扩展时的地址。当前地址：${document.createElement('br').outerHTML}${lib.config.extension_sources[lib.config.extension_source]}`
                },
                extension_create: {
                    name: '添加获取扩展地址',
                    clear: true,
                    unfrequent: true,
                    onclick: function () {
                        game.prompt('请输入地址名称', function (str) {
                            if (str) {
                                var map = lib.config.extension_sources;
                                game.prompt('请输入' + str + '的地址', function (str2) {
                                    if (str2) {
                                        delete map[str];
                                        map[str] = str2;
                                        game.saveConfig('extension_sources', map);
                                        game.saveConfig('extension_source', str);
                                        var nodexx = ui.extension_source;
                                        nodexx.updateInner();
                                        var nodeyy = nodexx._link.menu;
                                        var nodezz = nodexx._link.config;
                                        for (var i = 0; i < nodeyy.childElementCount; i++) {
                                            if (nodeyy.childNodes[i]._link == str) {
                                                nodeyy.childNodes[i].remove();
                                                break;
                                            }
                                        }
                                        var textMenu = ui.create.div('', str, nodeyy, function () {
                                            var node = this.parentNode._link;
                                            var config = node._link.config;
                                            node._link.current = this.link;
                                            var tmpName = node.lastChild.innerHTML;
                                            node.lastChild.innerHTML = config.item[this._link];
                                            if (config.onclick) {
                                                if (config.onclick.call(node, this._link, this) === false) {
                                                    node.lastChild.innerHTML = tmpName;
                                                }
                                            }
                                            if (config.update) {
                                                config.update();
                                            }
                                        });
                                        textMenu._link = str;
                                        nodezz.item[name] = str;
                                        alert('已添加扩展地址：' + str);
                                    }
                                })
                            }
                        });
                    },
                },
                extension_delete: {
                    name: '删除当前扩展地址',
                    clear: true,
                    unfrequent: true,
                    onclick: function () {
                        var bool = false, map = lib.config.extension_sources;
                        for (var i in map) {
                            if (i != lib.config.extension_source) {
                                bool = true;
                                break;
                            }
                        }
                        if (!bool) {
                            alert('不能删除最后一个扩展地址！');
                            return;
                        }
                        var name = lib.config.extension_source;
                        game.saveConfig('extension_source', i);
                        delete map[name];
                        game.saveConfig('extension_sources', map);
                        var nodexx = ui.extension_source;
                        nodexx.updateInner();
                        var nodeyy = nodexx._link.menu;
                        var nodezz = nodexx._link.config;
                        for (var i = 0; i < nodeyy.childElementCount; i++) {
                            if (nodeyy.childNodes[i]._link == name) {
                                nodeyy.childNodes[i].remove();
                                break;
                            }
                        }
                        delete nodezz.item[name];
                        alert('已删除扩展地址：' + name);
                    },
                },
                update: function (config, map) {
                    if ('ontouchstart' in document) {
                        map.touchscreen.show();
                    }
                    else {
                        map.touchscreen.hide();
                    }
                    if (lib.device || lib.node) {
                        map.auto_check_update.show();
                    }
                    else {
                        map.auto_check_update.hide();
                    }
                    if (lib.device) {
                        map.enable_vibrate.show();
                        map.keep_awake.show();
                    }
                    else {
                        map.enable_vibrate.hide();
                        map.keep_awake.hide();
                    }
                    // if(config.enable_pressure){
                    // 	map.pressure_click.show();
                    // 	if(lib.device){
                    // 		map.pressure_taptic.show();
                    // 	}
                    // 	else{
                    // 		map.pressure_taptic.hide();
                    // 	}
                    // }
                    // else{
                    // 	map.pressure_click.hide();
                    // 	map.pressure_taptic.hide();
                    // }
                    if (lib.config.touchscreen) {
                        map.mousewheel.hide();
                        map.hover_all.hide();
                        map.hover_handcard.hide();
                        map.hoveration.hide();
                        map.right_info.hide();
                        map.right_click.hide();
                        map.longpress_info.show();
                        map.swipe.show();
                        if (lib.config.swipe) {
                            map.swipe_up.show();
                            map.swipe_down.show();
                            map.swipe_left.show();
                            map.swipe_right.show();
                        }
                        else {
                            map.swipe_up.hide();
                            map.swipe_down.hide();
                            map.swipe_left.hide();
                            map.swipe_right.hide();
                        }
                    }
                    else {
                        map.mousewheel.show();
                        map.hover_all.show();
                        map.right_info.show();
                        map.right_click.show();
                        map.longpress_info.hide();
                        if (!config.hover_all) {
                            map.hover_handcard.hide();
                            map.hoveration.hide();
                        }
                        else {
                            map.hover_handcard.show();
                            map.hoveration.show();
                        }
                        map.swipe.hide();
                        map.swipe_up.hide();
                        map.swipe_down.hide();
                        map.swipe_left.hide();
                        map.swipe_right.hide();
                    }
                    if (lib.config.enable_drag) {
                        if (lib.config.touchscreen) {
                            map.enable_dragline.hide();
                            map.enable_touchdragline.show();
                        }
                        else {
                            map.enable_dragline.show();
                            map.enable_touchdragline.hide();
                        }
                    }
                    else {
                        map.enable_dragline.hide();
                        map.enable_touchdragline.hide();
                    }
                    if (!get.is.phoneLayout()) {
                        map.round_menu_func.hide();
                    }
                    else {
                        map.round_menu_func.show();
                    }
                    if (!lib.node && lib.device != 'ios') {
                        map.confirm_exit.show();
                    }
                    else {
                        map.confirm_exit.hide();
                    }
                    if (config.dev) {
                        map.errstop.show();
                    }
                    else {
                        map.errstop.hide();
                    }
                }
            }
        },
        appearence: {
            name: '外观',
            config: {
                theme: {
                    name: '主题',
                    init: 'woodden',
                    item: {},
                    visualMenu: function (node, link) {
                        if (!node.menu) {
                            node.className = 'button character themebutton ' + link;
                            node.menu = ui.create.div(node, '', '<div></div><div></div><div></div><div></div>');
                        }
                    },
                    onclick: function (theme) {
                        game.saveConfig('theme', theme);
                        ui.arena.hide();
                        lib.init.background();
                        if (lib.config.autostyle) {
                            if (theme == 'simple') {
                                lib.configMenu.appearence.config.player_border.onclick('slim');
                            }
                            else {
                                lib.configMenu.appearence.config.player_border.onclick('normal');
                            }
                        }
                        setTimeout(function () {
                            var theme = ui.css.theme;
                            ui.css.theme = lib.init.css(lib.assetURL + 'theme/' + lib.config.theme, 'style');
                            theme.remove();
                            setTimeout(function () { ui.arena.show(); }, 100);
                        }, 500);
                    }
                },
                layout: {
                    name: '布局',
                    init: 'mobile',
                    item: {
                        //default:'旧版',
                        newlayout: '对称',
                        mobile: '默认',
                        long: '宽屏',
                        long2: '手杀',
                        nova: '新版'
                    },
                    visualMenu: function (node, link) {
                        node.className = 'button character themebutton ' + lib.config.theme;
                        if (!node.created) {
                            node.created = true;
                            node.style.overflow = 'hidden';
                            node.firstChild.style.display = 'none';
                            // node.firstChild.classList.add('shadowed');
                            // node.firstChild.style.width='16px';
                            // node.firstChild.style.height='auto';
                            // node.firstChild.style.padding='2px';
                            // node.firstChild.style.textAlign='center';
                            var me = ui.create.div(node);
                            me.style.top = 'auto';
                            if (link == 'default' || link == 'newlayout') {
                                me.style.width = 'calc(100% - 6px)';
                                me.style.left = '3px';
                                me.style.bottom = '3px';
                                me.style.height = '25px';
                                if (link == 'newlayout') {
                                    me.style.height = '23px';
                                    me.style.bottom = '4px';
                                }
                            }
                            else if (link == 'long2' || link == 'nova') {
                                me.style.display = 'none';
                            }
                            else {
                                me.style.width = '120%';
                                me.style.left = '-10%';
                                me.style.bottom = '0';
                                me.style.height = '22px';
                            }
                            me.style.borderRadius = '2px';
                            var list = ['re_caocao', 're_liubei', 'sp_zhangjiao', 'sunquan'];
                            for (var i = 0; i < 4; i++) {
                                var player = ui.create.div('.fakeplayer', node);
                                ui.create.div('.avatar', player).setBackground(list.randomRemove(), 'character');
                                player.style.borderRadius = '2px';
                                if (i != 3) {
                                    player.style.top = 'auto';
                                }
                                if (link == 'default') {
                                    player.style.height = '19px';
                                    player.style.width = '38px';
                                    player.classList.add('oldlayout')
                                }
                                else if (link == 'mobile' || link == 'newlayout') {
                                    player.style.width = '24px';
                                    player.style.height = '29px';
                                }
                                else if (link == 'nova') {
                                    player.style.width = '20px';
                                    player.style.height = '24px';
                                }
                                else {
                                    player.style.width = '20px';
                                    player.style.height = '34px';
                                }
                                if (i == 1) {
                                    player.style.left = '3px';
                                }
                                if (i == 2) {
                                    player.style.left = 'auto';
                                    player.style.right = '3px';
                                }
                                if (i == 3) {
                                    player.style.top = '3px';
                                }
                                if (link == 'default') {
                                    if (i == 0) {
                                        player.style.bottom = '6px';
                                    }
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 18px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '36px';
                                    }
                                }
                                else if (link == 'newlayout') {
                                    if (i == 0) {
                                        player.style.bottom = '1px';
                                    }
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 12px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '32px';
                                    }
                                }
                                else if (link == 'mobile') {
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 12px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '30px';
                                    }
                                }
                                else if (link == 'long') {
                                    if (i == 0 || i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '45px';
                                    }
                                }
                                else if (link == 'long2') {
                                    if (i == 0) {
                                        player.style.bottom = '2px';
                                        player.style.left = '3px';
                                    }
                                    if (i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.bottom = '45px';
                                    }
                                }
                                else if (link == 'nova') {
                                    if (i == 0) {
                                        player.style.bottom = '2px';
                                        player.style.left = '3px';
                                    }
                                    if (i == 3) {
                                        player.style.left = 'calc(50% - 10px)';
                                    }
                                    if (i == 1 || i == 2) {
                                        player.style.left = '3px';
                                        player.style.bottom = (i * 30) + 'px';
                                    }
                                }

                                if (i == 0 && (link == 'mobile' || link == 'long')) {
                                    player.classList.add('me');
                                    player.style.borderRadius = '0px';
                                    player.style.width = '25px';
                                    player.style.height = '25px';
                                    player.style.bottom = '-3px';
                                    player.style.left = '-3px';
                                }
                            }
                        }
                    },
                    onclick: function (layout) {
                        if (lib.layoutfixed.contains(lib.config.mode)) {
                            game.saveConfig('layout', layout);
                        }
                        else {
                            lib.init.layout(layout);
                        }
                    }
                },
                splash_style: {
                    name: '启动页',
                    item: {
                        style1: '样式一',
                        style2: '样式二',
                    },
                    visualMenu: (node, link) => {
                        node.className = 'button character';
                        node.style.width = '200px';
                        node.style.height = `${node.offsetWidth * 1080 / 2400}px`;
                        node.style.display = 'flex';
                        node.style.flexDirection = 'column';
                        node.style.alignItems = 'center';
                        node.style.backgroundSize = '100% 100%';
                        node.setBackgroundImage(`image/splash/${link}.jpg`);
                    }
                },
                // fewplayer:{
                //     name:'启用人数',
                // 	intro:'设置启用新版布局的最小人数（不足时切换至默认布局）',
                //     init:'3',
                //     // unfrequent:true,
                //     item:{
                //      			'2':'两人',
                //      			'3':'三人',
                //      			'4':'四人',
                //      			'5':'五人',
                //      			'6':'六人',
                //      			'7':'七人',
                //      			'8':'八人',
                //     },
                //     onclick:function(item){
                //      			game.saveConfig('fewplayer',item);
                //      			if(ui.arena) ui.arena.setNumber(ui.arena.dataset.number);
                //     }
                // },
                player_height: {
                    name: '角色高度',
                    init: 'long',
                    // unfrequent:true,
                    item: {
                        short: '矮',
                        default: '中',
                        long: '高',
                    },
                    onclick: function (item) {
                        game.saveConfig('player_height', item);
                        ui.arena.dataset.player_height = item;
                    }
                },
                player_height_nova: {
                    name: '角色高度',
                    init: 'short',
                    item: {
                        // auto:'自动',
                        short: '矮',
                        default: '中',
                        long: '高',
                    },
                    onclick: function (item) {
                        game.saveConfig('player_height_nova', item);
                        // if(item=='auto'){
                        // 	if(parseInt(ui.arena.dataset.number)>=7){
                        // 		ui.arena.dataset.player_height_nova='short';
                        // 	}
                        // 	else{
                        // 		ui.arena.dataset.player_height_nova='default';
                        // 	}
                        // }
                        // else{
                        ui.arena.dataset.player_height_nova = item;
                        // }
                    }
                },
                // background_color_music:{
                // 	name:'背景色',
                // 	init:'black',
                // 	item:{
                // 		blue:'蓝色',
                // 		black:'黑色',
                // 	},
                // 	onclick:function(color){
                // 		game.saveConfig('background_color_music',color);
                // 		document.body.dataset.background_color_music=color;
                // 	}
                // },
                // background_color_wood:{
                // 	name:'背景色',
                // 	init:'blue',
                // 	item:{
                // 		blue:'蓝色',
                // 		black:'黑色',
                // 	},
                // 	onclick:function(color){
                // 		game.saveConfig('background_color_wood',color);
                // 		document.body.dataset.background_color_wood=color;
                // 	}
                // },
                // theme_color_music:{
                // 	name:'主题色',
                // 	init:'black',
                // 	item:{
                // 		blue:'蓝色',
                // 		black:'黑色',
                // 	},
                // 	onclick:function(color){
                // 		game.saveConfig('theme_color_music',color);
                // 		document.body.dataset.theme_color_music=color;
                // 	}
                // },
                ui_zoom: {
                    name: '界面缩放',
                    unfrequent: true,
                    init: 'normal',
                    item: {
                        esmall: '80%',
                        vsmall: '90%',
                        small: '95%',
                        normal: '100%',
                        big: '105%',
                        vbig: '110%',
                        ebig: '120%',
                        eebig: '150%',
                        eeebig: '180%',
                        eeeebig: '200%',
                    },
                    onclick: function (zoom) {
                        game.saveConfig('ui_zoom', zoom);
                        switch (zoom) {
                            case 'esmall': zoom = 0.8; break;
                            case 'vsmall': zoom = 0.9; break;
                            case 'small': zoom = 0.93; break;
                            case 'big': zoom = 1.05; break;
                            case 'vbig': zoom = 1.1; break;
                            case 'ebig': zoom = 1.2; break;
                            case 'eebig': zoom = 1.5; break;
                            case 'eeebig': zoom = 1.8; break;
                            case 'eeeebig': zoom = 2; break;
                            default: zoom = 1;
                        }
                        game.documentZoom = game.deviceZoom * zoom;
                        ui.updatez();
                        if (Array.isArray(lib.onresize)) {
                            lib.onresize.forEach(fun => {
                                if (typeof fun == 'function') fun();
                            });
                        }
                    }
                },
                image_background: {
                    name: '游戏背景',
                    init: 'default',
                    item: {},
                    visualBar: function (node, item, create) {
                        if (node.created) {
                            node.lastChild.classList.remove('active');
                            return;
                        }
                        node.created = true;
                        ui.create.filediv('.menubutton', '添加背景', node, function (file) {
                            if (file) {
                                var name = file.name;
                                if (name.includes('.')) {
                                    name = name.slice(0, name.indexOf('.'));
                                }
                                var link = (game.writeFile ? 'cdv_' : 'custom_') + name;
                                if (item[link]) {
                                    for (var i = 1; i < 1000; i++) {
                                        if (!item[link + '_' + i]) {
                                            link = link + '_' + i; break;
                                        }
                                    }
                                }
                                item[link] = name;
                                var callback = function () {
                                    create(link, node.parentNode.defaultNode);
                                    node.parentNode.updateBr();
                                    lib.config.customBackgroundPack.add(link);
                                    game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
                                };
                                if (game.writeFile) {
                                    game.writeFile(file, 'image/background', link + '.jpg', callback);
                                }
                                else {
                                    game.putDB('image', link, file, callback);
                                }
                                if (node.lastChild.classList.contains('active')) {
                                    editbg.call(node.lastChild);
                                }
                            }
                        }).inputNode.accept = 'image/*';
                        var editbg = function () {
                            this.classList.toggle('active');
                            var page = this.parentNode.parentNode;
                            for (var i = 0; i < page.childElementCount; i++) {
                                if (page.childNodes[i].classList.contains('button')) {
                                    var link = page.childNodes[i]._link;
                                    if (link && link != 'default') {
                                        var str;
                                        if (this.classList.contains('active')) {
                                            if (link.startsWith('custom_') || link.startsWith('cdv_')) {
                                                str = '删除';
                                            }
                                            else {
                                                str = '隐藏';
                                            }
                                        }
                                        else {
                                            str = item[link];
                                        }
                                        page.childNodes[i].firstChild.innerHTML = get.verticalStr(str);
                                    }
                                }
                            }
                        };
                        ui.create.div('.menubutton', '编辑背景', node, editbg);
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundImage = '';
                        node.style.backgroundSize = '';
                        if (node.firstChild) {
                            node.firstChild.innerHTML = get.verticalStr(name);
                        }
                        if (link == 'default' || link.startsWith('custom_')) {
                            node.style.backgroundImage = 'none';
                            node.classList.add('dashedmenubutton');
                            if (link.startsWith('custom_')) {
                                game.getDB('image', link, function (fileToLoad) {
                                    if (!fileToLoad) return;
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        var data = fileLoadedEvent.target.result;
                                        node.style.backgroundImage = 'url(' + data + ')';
                                        node.style.backgroundSize = 'cover';
                                        node.classList.remove('dashedmenubutton');
                                    };
                                    fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                });
                            }
                            else {
                                node.parentNode.defaultNode = node;
                            }
                        }
                        else {
                            node.setBackgroundImage('image/background/' + link + '.jpg');
                            node.style.backgroundSize = 'cover';
                        }
                    },
                    onclick: function (background, node) {
                        if (node && node.firstChild) {
                            var menu = node.parentNode;
                            if (node.firstChild.innerHTML == get.verticalStr('隐藏')) {
                                menu.parentNode.noclose = true;
                                node.remove();
                                menu.updateBr();
                                if (!lib.config.prompt_hidebg) {
                                    alert('隐藏的背景可通过选项-其它-重置隐藏内容恢复');
                                    game.saveConfig('prompt_hidebg', true);
                                }
                                lib.config.hiddenBackgroundPack.add(background);
                                game.saveConfig('hiddenBackgroundPack', lib.config.hiddenBackgroundPack);
                                delete lib.configMenu.appearence.config.image_background.item[background];
                                if (lib.config.image_background == background) {
                                    background = 'default';
                                    this.lastChild.innerHTML = '默认';
                                }
                                else {
                                    this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
                                    return;
                                }
                            }
                            else if (node.firstChild.innerHTML == get.verticalStr('删除')) {
                                menu.parentNode.noclose = true;
                                if (confirm('是否删除此背景？（此操作不可撤销）')) {
                                    node.remove();
                                    menu.updateBr();
                                    lib.config.customBackgroundPack.remove(background);
                                    game.saveConfig('customBackgroundPack', lib.config.customBackgroundPack);
                                    if (background.startsWith('cdv_')) {
                                        game.removeFile('image/background/' + background + '.jpg');
                                    }
                                    else {
                                        game.deleteDB('image', background);
                                    }
                                    delete lib.configMenu.appearence.config.image_background.item[background];
                                    if (lib.config.image_background == background) {
                                        background = 'default';
                                        this.lastChild.innerHTML = '默认';
                                    }
                                    else {
                                        this.lastChild.innerHTML = lib.configMenu.appearence.config.image_background.item[lib.config.image_background];
                                        return;
                                    }
                                }
                            }
                        }
                        game.saveConfig('image_background', background);
                        lib.init.background();
                        game.updateBackground();
                    },
                },
                image_background_random: {
                    name: '随机背景',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('image_background_random', bool);
                        lib.init.background();
                    }
                },
                image_background_blur: {
                    name: '背景模糊',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('image_background_blur', bool);
                        if (lib.config.image_background_blur) {
                            ui.background.style.filter = 'blur(8px)';
                            ui.background.style.webkitFilter = 'blur(8px)';
                            ui.background.style.transform = 'scale(1.05)';
                        }
                        else {
                            ui.background.style.filter = '';
                            ui.background.style.webkitFilter = '';
                            ui.background.style.transform = '';
                        }
                    },
                },
                phonelayout: {
                    name: '触屏布局',
                    init: false,
                    onclick: function (bool) {
                        if (get.is.nomenu('phonelayout', bool)) return false;
                        game.saveConfig('phonelayout', bool);
                        if (get.is.phoneLayout()) {
                            ui.css.phone.href = lib.assetURL + 'layout/default/phone.css';
                            ui.arena.classList.add('phone');
                        }
                        else {
                            ui.css.phone.href = '';
                            ui.arena.classList.remove('phone');
                        }
                    }
                },
                change_skin: {
                    name: '开启换肤',
                    init: true,
                    intro: '在武将的右键菜单中换肤，皮肤可在选项-文件-图片文件-皮肤图片中添加'
                },
                change_skin_auto: {
                    name: '自动换肤',
                    init: 'off',
                    item: {
                        'off': '关闭',
                        '30000': '半分钟',
                        '60000': '一分钟',
                        '120000': '两分钟',
                        '300000': '五分钟',
                    },
                    intro: '游戏每进行一段时间自动为一个随机角色更换皮肤',
                    onclick: function (item) {
                        game.saveConfig('change_skin_auto', item);
                        clearTimeout(_status.skintimeout);
                        if (item != 'off') {
                            _status.skintimeout = setTimeout(ui.click.autoskin, parseInt(item));
                        }
                    }
                },
                card_style: {
                    name: '卡牌样式',
                    init: 'default',
                    intro: '设置正面朝上的卡牌的样式',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '原版',
                        ol: '手杀',
                        // new:'新版',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'card_style', file, function () {
                                    game.getDB('image', 'card_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button card fullskin';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'card_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.card_style == 'custom') {
                                    lib.configMenu.appearence.config.card_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button card fullskin';
                        node.style.backgroundSize = '100% 100%';
                        switch (link) {
                            case 'default': case 'custom': {
                                if (lib.config.theme == 'simple') {
                                    node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))';
                                    node.className = 'button character';
                                }
                                else {
                                    node.style.backgroundImage = 'none';
                                    node.className = 'button character dashedmenubutton';
                                }
                                break;
                            }
                            case 'new': node.setBackgroundImage('theme/style/card/image/new.png'); break;
                            case 'ol': node.setBackgroundImage('theme/style/card/image/ol.png'); break;
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
                            case 'music': node.setBackgroundImage('theme/music/wood3.png'); break;
                            case 'simple': node.setBackgroundImage('theme/simple/card.png'); break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'card_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button card fullskin';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('card_style', layout);
                        var style = ui.css.card_style;
                        ui.css.card_style = lib.init.css(lib.assetURL + 'theme/style/card', lib.config.card_style);
                        style.remove();
                        if (ui.css.card_stylesheet) {
                            ui.css.card_stylesheet.remove();
                            delete ui.css.card_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'card_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.card_stylesheet) {
                                        ui.css.card_stylesheet.remove();
                                    }
                                    ui.css.card_stylesheet = lib.init.sheet('.card:not(*:empty){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                cardback_style: {
                    name: '卡背样式',
                    intro: '设置背面朝上的卡牌的样式',
                    init: 'default',
                    item: {
                        // wood:'木纹',
                        // music:'音乐',
                        official: '原版',
                        // new:'新版',
                        feicheng: '废城',
                        liusha: '流沙',
                        ol: '手杀',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'cardback_style', file, function () {
                                    game.getDB('image', 'cardback_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        ui.create.filediv('.menubutton.deletebutton.addbutton', '添加翻转图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'cardback_style2', file, function () {
                                    node.classList.add('hideadd');
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'cardback_style');
                                game.deleteDB('image', 'cardback_style2');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                node.classList.remove('hideadd');
                                if (lib.config.cardback_style == 'custom') {
                                    lib.configMenu.appearence.config.cardback_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.style.backgroundSize = '100% 100%';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.className = 'button character dashedmenubutton';
                                break;
                            }
                            case 'new': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/new.png'); break;
                            case 'feicheng': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/feicheng.png'); break;
                            case 'official': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/official.png'); break;
                            case 'liusha': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/liusha.png'); break;
                            case 'ol': node.className = 'button character'; node.setBackgroundImage('theme/style/cardback/image/ol.png'); break;
                            case 'wood': node.className = 'button card fullskin'; node.setBackgroundImage('theme/woodden/wood.jpg'); node.style.backgroundSize = 'initial'; break;
                            case 'music': node.className = 'button card fullskin'; node.setBackgroundImage('theme/music/wood3.png'); break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'cardback_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    game.getDB('image', 'cardback_style2', function (file) {
                                        if (file) {
                                            node.parentNode.lastChild.classList.add('hideadd');
                                        }
                                    });
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('cardback_style', layout);
                        var style = ui.css.cardback_style;
                        ui.css.cardback_style = lib.init.css(lib.assetURL + 'theme/style/cardback', lib.config.cardback_style);
                        style.remove();
                        if (ui.css.cardback_stylesheet) {
                            ui.css.cardback_stylesheet.remove();
                            delete ui.css.cardback_stylesheet;
                        }
                        if (ui.css.cardback_stylesheet2) {
                            ui.css.cardback_stylesheet2.remove();
                            delete ui.css.cardback_stylesheet2;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'cardback_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.cardback_stylesheet) {
                                        ui.css.cardback_stylesheet.remove();
                                    }
                                    ui.css.cardback_stylesheet = lib.init.sheet('.card:empty,.card.infohidden{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                    game.getDB('image', 'cardback_style2', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            if (ui.css.cardback_stylesheet2) {
                                                ui.css.cardback_stylesheet2.remove();
                                            }
                                            ui.css.cardback_stylesheet2 = lib.init.sheet('.card.infohidden:not(.infoflip){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                hp_style: {
                    name: '体力条样式',
                    init: 'ol',
                    item: {
                        default: '默认',
                        // official:'勾玉',
                        emotion: '表情',
                        glass: '勾玉',
                        round: '国战',
                        ol: '手杀',
                        xinglass: '双鱼',
                        xinround: 'OL',
                        custom: '自定',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton.addbutton', '添加图片', node, function (file) {
                            if (file && node.currentDB) {
                                game.putDB('image', 'hp_style' + node.currentDB, file, function () {
                                    game.getDB('image', 'hp_style' + node.currentDB, function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.childNodes[node.currentDB - 1].style.backgroundImage = 'url(' + data + ')';
                                            button.classList.add('shown');
                                            node.classList.add('showdelete');
                                            node.currentDB++;
                                            if (node.currentDB > 4) {
                                                node.classList.add('hideadd');
                                                button.classList.remove('transparent');
                                                delete node.currentDB;
                                            }
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'hp_style1');
                                game.deleteDB('image', 'hp_style2');
                                game.deleteDB('image', 'hp_style3');
                                game.deleteDB('image', 'hp_style4');
                                for (var i = 0; i < button.childElementCount; i++) {
                                    button.childNodes[i].style.backgroundImage = 'none';
                                }
                                node.classList.remove('showdelete');
                                node.classList.remove('hideadd');
                                if (lib.config.hp_style == 'custom') {
                                    lib.configMenu.appearence.config.hp_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                                button.classList.remove('shown');
                                node.currentDB = 1;
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button hpbutton dashedmenubutton';
                        node.innerHTML = '';
                        for (var i = 1; i <= 4; i++) {
                            var div = ui.create.div(node);
                            if (link == 'default') {
                                ui.create.div(div);
                            }
                            else if (link != 'custom') {
                                div.setBackgroundImage('theme/style/hp/image/' + link + i + '.png');
                            }
                            if (i == 4) {
                                div.style.webkitFilter = 'grayscale(1)';
                            }
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            var getDB = function (num) {
                                node.parentNode.lastChild.currentDB = num;
                                game.getDB('image', 'hp_style' + num, function (fileToLoad) {
                                    if (!fileToLoad) return;
                                    var fileReader = new FileReader();
                                    fileReader.onload = function (fileLoadedEvent) {
                                        var data = fileLoadedEvent.target.result;
                                        node.childNodes[num - 1].style.backgroundImage = 'url(' + data + ')';
                                        node.classList.add('shown');
                                        node.parentNode.lastChild.classList.add('showdelete');
                                        if (num < 4) {
                                            getDB(num + 1);
                                        }
                                        else {
                                            node.parentNode.lastChild.classList.add('hideadd');
                                            node.classList.remove('transparent');
                                            delete node.parentNode.firstChild.currentDB;
                                        }
                                    };
                                    fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                });
                            }
                            getDB(1);
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('hp_style', layout);
                        var style = ui.css.hp_style;
                        ui.css.hp_style = lib.init.css(lib.assetURL + 'theme/style/hp', lib.config.hp_style);
                        style.remove();
                        if (ui.css.hp_stylesheet1) {
                            ui.css.hp_stylesheet1.remove();
                            delete ui.css.hp_stylesheet1;
                        }
                        if (ui.css.hp_stylesheet2) {
                            ui.css.hp_stylesheet2.remove();
                            delete ui.css.hp_stylesheet2;
                        }
                        if (ui.css.hp_stylesheet3) {
                            ui.css.hp_stylesheet3.remove();
                            delete ui.css.hp_stylesheet3;
                        }
                        if (ui.css.hp_stylesheet4) {
                            ui.css.hp_stylesheet4.remove();
                            delete ui.css.hp_stylesheet4;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'hp_style1', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet1) {
                                        ui.css.hp_stylesheet1.remove();
                                    }
                                    ui.css.hp_stylesheet1 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="high"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style2', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet2) {
                                        ui.css.hp_stylesheet2.remove();
                                    }
                                    ui.css.hp_stylesheet2 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="mid"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style3', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet3) {
                                        ui.css.hp_stylesheet3.remove();
                                    }
                                    ui.css.hp_stylesheet3 = lib.init.sheet('.hp:not(.text):not(.actcount)[data-condition="low"]>div:not(.lost){background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                            game.getDB('image', 'hp_style4', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.hp_stylesheet4) {
                                        ui.css.hp_stylesheet4.remove();
                                    }
                                    ui.css.hp_stylesheet4 = lib.init.sheet('.hp:not(.text):not(.actcount)>.lost{background-image:url(' + fileLoadedEvent.target.result + ')}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    unfrequent: true,
                },
                player_style: {
                    name: '角色背景',
                    init: 'default',
                    intro: '设置角色的背景图片',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'player_style', file, function () {
                                    game.getDB('image', 'player_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            button.style.backgroundSize = '100% 100%';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'player_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.player_style == 'custom') {
                                    lib.configMenu.appearence.config.player_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = '';
                        node.style.height = '108px';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.className = 'button character dashedmenubutton';
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'player_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    node.style.backgroundSize = '100% 100%';
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('player_style', layout);
                        if (ui.css.player_stylesheet) {
                            ui.css.player_stylesheet.remove();
                            delete ui.css.player_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'player_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.player_stylesheet) {
                                        ui.css.player_stylesheet.remove();
                                    }
                                    ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:url("' + fileLoadedEvent.target.result + '");background-size:100% 100%;}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646)'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                            }
                            ui.css.player_stylesheet = lib.init.sheet('#window .player{background-image:' + str + '}');
                        }
                    },
                    unfrequent: true,
                },
                border_style: {
                    name: '角色边框',
                    init: 'default',
                    intro: '设置角色边框的样式，当设为自动时，样式将随着一局游戏中伤害或击杀的数量自动改变',
                    item: {
                        gold: '金框',
                        silver: '银框',
                        bronze: '铜框',
                        dragon_gold: '金龙',
                        dragon_silver: '银龙',
                        dragon_bronze: '玉龙',
                        custom: '自定',
                        auto: '自动',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'border_style', file, function () {
                                    game.getDB('image', 'border_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character';
                                            button.style.backgroundSize = '100% 100%';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'border_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.border_style == 'custom') {
                                    lib.configMenu.appearence.config.border_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = '';
                        node.style.height = '108px';
                        node.dataset.decoration = '';
                        if (link == 'default' || link == 'custom' || link == 'auto') {
                            node.style.backgroundImage = 'none';
                            node.className = 'button character dashedmenubutton';
                        }
                        else {
                            if (link.startsWith('dragon_')) {
                                link = link.slice(7);
                                node.dataset.decoration = link;
                            }
                            node.setBackgroundImage('theme/style/player/' + link + '1.png');
                            node.style.backgroundSize = '100% 100%';
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'border_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                    node.style.backgroundSize = '100% 100%';
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('border_style', layout);
                        if (ui.css.border_stylesheet) {
                            ui.css.border_stylesheet.remove();
                            delete ui.css.border_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'border_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.border_stylesheet) {
                                        ui.css.border_stylesheet.remove();
                                    }
                                    ui.css.border_stylesheet = lib.init.sheet();
                                    ui.css.border_stylesheet.id = "ui.css.border";
                                    ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg{display:block;background-image:url("' + fileLoadedEvent.target.result + '")}', 0);
                                    ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default' && layout != 'auto') {
                            ui.css.border_stylesheet = lib.init.sheet();
                            if (layout.startsWith('dragon_')) {
                                layout = layout.slice(7);
                                ui.arena.dataset.framedecoration = layout;
                            }
                            else {
                                ui.arena.dataset.framedecoration = '';
                            }
                            ui.css.border_stylesheet.sheet.insertRule('#window .player>.framebg,#window #arena.long.mobile:not(.fewplayer) .player[data-position="0"]>.framebg{display:block;background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '1.png")}', 0);
                            ui.css.border_stylesheet.sheet.insertRule('#window #arena.long:not(.fewplayer) .player>.framebg, #arena.oldlayout .player>.framebg{background-image:url("' + lib.assetURL + 'theme/style/player/' + layout + '3.png")}', 0);
                            ui.css.border_stylesheet.sheet.insertRule('.player>.count{z-index: 3 !important;border-radius: 2px !important;text-align: center !important;}', 0);
                        }
                    },
                    unfrequent: true,
                },
                autoborder_count: {
                    name: '边框升级方式',
                    intro: '<strong>击杀</strong> 每击杀一人，边框提升两级<br><strong>伤害</strong> 每造成两点伤害，边框提升一级<br><strong>混合</strong> 击杀量决定边框颜色，伤害量决定边框装饰',
                    init: 'kill',
                    item: {
                        kill: '击杀',
                        damage: '伤害',
                        mix: '混合',
                    },
                    unfrequent: true,
                },
                autoborder_start: {
                    name: '基础边框颜色',
                    init: 'bronze',
                    item: {
                        bronze: '铜',
                        silver: '银',
                        gold: '金'
                    },
                    unfrequent: true
                },
                player_border: {
                    name: '边框宽度',
                    init: 'normal',
                    intro: '设置角色的边框宽度',
                    unfrequent: true,
                    item: {
                        slim: '细',
                        narrow: '窄',
                        normal: '中',
                        wide: '宽'
                    },
                    onclick: function (item) {
                        game.saveConfig('player_border', item);
                        if (item != 'wide' || game.layout == 'long' || game.layout == 'long2') {
                            ui.arena.classList.add('slim_player');
                        }
                        else {
                            ui.arena.classList.remove('slim_player');
                        }
                        if (item == 'slim') {
                            ui.arena.classList.add('uslim_player');
                        }
                        else {
                            ui.arena.classList.remove('uslim_player');
                        }
                        if (item == 'narrow') {
                            ui.arena.classList.add('mslim_player');
                        }
                        else {
                            ui.arena.classList.remove('mslim_player');
                        }
                        if (item == 'normal' && lib.config.mode != 'brawl' && (game.layout == 'long' || game.layout == 'long2')) {
                            ui.arena.classList.add('lslim_player');
                        }
                        else {
                            ui.arena.classList.remove('lslim_player');
                        }
                        ui.window.dataset.player_border = item;
                    }
                },
                menu_style: {
                    name: '菜单背景',
                    init: 'default',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'menu_style', file, function () {
                                    game.getDB('image', 'menu_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.style.backgroundSize = 'cover';
                                            button.className = 'button character';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'menu_style');
                                button.style.backgroundImage = 'none';
                                button.style.backgroundSize = 'auto';
                                button.className = 'button character dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.menu_style == 'custom') {
                                    lib.configMenu.appearence.config.menu_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character';
                        node.style.backgroundSize = 'auto';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.classList.add('dashedmenubutton');
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood2.png'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'menu_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.style.backgroundSize = 'cover';
                                    node.className = 'button character';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('menu_style', layout);
                        if (ui.css.menu_stylesheet) {
                            ui.css.menu_stylesheet.remove();
                            delete ui.css.menu_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'menu_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.menu_stylesheet) {
                                        ui.css.menu_stylesheet.remove();
                                    }
                                    ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:url("' + fileLoadedEvent.target.result + '");background-size:cover}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood2.png")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
                            }
                            ui.css.menu_stylesheet = lib.init.sheet('html #window>.dialog.popped,html .menu,html .menubg{background-image:' + str + '}');
                        }
                    },
                    unfrequent: true,
                },
                control_style: {
                    name: '按钮背景',
                    init: 'default',
                    item: {
                        wood: '木纹',
                        music: '音乐',
                        simple: '简约',
                        custom: '自定',
                        default: '默认',
                    },
                    visualBar: function (node, item, create, switcher) {
                        if (node.created) {
                            return;
                        }
                        var button;
                        for (var i = 0; i < node.parentNode.childElementCount; i++) {
                            if (node.parentNode.childNodes[i]._link == 'custom') {
                                button = node.parentNode.childNodes[i];
                            }
                        }
                        if (!button) {
                            return;
                        }
                        node.created = true;
                        var deletepic;
                        ui.create.filediv('.menubutton', '添加图片', node, function (file) {
                            if (file) {
                                game.putDB('image', 'control_style', file, function () {
                                    game.getDB('image', 'control_style', function (fileToLoad) {
                                        if (!fileToLoad) return;
                                        var fileReader = new FileReader();
                                        fileReader.onload = function (fileLoadedEvent) {
                                            var data = fileLoadedEvent.target.result;
                                            button.style.backgroundImage = 'url(' + data + ')';
                                            button.className = 'button character controlbutton';
                                            node.classList.add('showdelete');
                                        };
                                        fileReader.readAsDataURL(fileToLoad, "UTF-8");
                                    });
                                });
                            }
                        }).inputNode.accept = 'image/*';
                        deletepic = ui.create.div('.menubutton.deletebutton', '删除图片', node, function () {
                            if (confirm('确定删除自定义图片？（此操作不可撤销）')) {
                                game.deleteDB('image', 'control_style');
                                button.style.backgroundImage = 'none';
                                button.className = 'button character controlbutton dashedmenubutton';
                                node.classList.remove('showdelete');
                                if (lib.config.control_style == 'custom') {
                                    lib.configMenu.appearence.config.control_style.onclick('default');
                                    switcher.lastChild.innerHTML = '默认';
                                }
                                button.classList.add('transparent');
                            }
                        });
                    },
                    visualMenu: function (node, link, name, config) {
                        node.className = 'button character controlbutton';
                        node.style.backgroundSize = '';
                        switch (link) {
                            case 'default': case 'custom': {
                                node.style.backgroundImage = 'none';
                                node.classList.add('dashedmenubutton');
                                break;
                            }
                            case 'wood': node.setBackgroundImage('theme/woodden/wood.jpg'); break;
                            case 'music': node.style.backgroundImage = 'linear-gradient(#4b4b4b, #464646)'; break;
                            case 'simple': node.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))'; break;
                        }
                        if (link == 'custom') {
                            node.classList.add('transparent');
                            game.getDB('image', 'control_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    var data = fileLoadedEvent.target.result;
                                    node.style.backgroundImage = 'url(' + data + ')';
                                    node.className = 'button character controlbutton';
                                    node.parentNode.lastChild.classList.add('showdelete');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                    },
                    onclick: function (layout) {
                        game.saveConfig('control_style', layout);
                        if (ui.css.control_stylesheet) {
                            ui.css.control_stylesheet.remove();
                            delete ui.css.control_stylesheet;
                        }
                        if (layout == 'custom') {
                            game.getDB('image', 'control_style', function (fileToLoad) {
                                if (!fileToLoad) return;
                                var fileReader = new FileReader();
                                fileReader.onload = function (fileLoadedEvent) {
                                    if (ui.css.control_stylesheet) {
                                        ui.css.control_stylesheet.remove();
                                    }
                                    ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:url("' + fileLoadedEvent.target.result + '")}');
                                };
                                fileReader.readAsDataURL(fileToLoad, "UTF-8");
                            });
                        }
                        else if (layout != 'default') {
                            var str = '';
                            switch (layout) {
                                case 'wood': str = 'url("' + lib.assetURL + 'theme/woodden/wood.jpg")'; break;
                                case 'music': str = 'linear-gradient(#4b4b4b, #464646);color:white;text-shadow:black 0 0 2px'; break;
                                case 'simple': str = 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));color:white;text-shadow:black 0 0 2px'; break;
                            }
                            if (layout == 'wood') {
                                ui.css.control_stylesheet = lib.init.sheet('#window .control,#window .menubutton,#window #system>div>div,#window #system>div>.pressdown2{background-image:' + str + '}');
                            }
                            else {
                                ui.css.control_stylesheet = lib.init.sheet('#window .control,.menubutton:not(.active):not(.highlight):not(.red):not(.blue),#window #system>div>div{background-image:' + str + '}');
                            }
                        }
                    },
                    unfrequent: true,
                },
                custom_button: {
                    name: '自定义按钮高度',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        if (bool !== 'skip') {
                            game.saveConfig('custom_button', bool);
                        }
                        if (ui.css.buttonsheet) {
                            ui.css.buttonsheet.remove();
                        }
                        if (lib.config.custom_button) {
                            var cbnum1 = 6 + (parseInt(lib.config.custom_button_system_top) || 0);
                            var cbnum2 = 6 + (parseInt(lib.config.custom_button_system_bottom) || 0);
                            var cbnum3 = 3 + (parseInt(lib.config.custom_button_control_top) || 0);
                            var cbnum4 = 3 + (parseInt(lib.config.custom_button_control_bottom) || 0);
                            var cbnum5 = 2;
                            var cbnum6 = 2;
                            if (cbnum3 < 0) {
                                cbnum5 += cbnum3;
                                cbnum3 = 0;
                            }
                            if (cbnum4 < 0) {
                                cbnum6 += cbnum4;
                                cbnum4 = 0;
                            }
                            ui.css.buttonsheet = lib.init.sheet(
                                '#system>div>div, .caption>div>.tdnode{padding-top:' + cbnum1 + 'px !important;padding-bottom:' + cbnum2 + 'px !important}',
                                '#control>.control>div{padding-top:' + cbnum3 + 'px;padding-bottom:' + cbnum4 + 'px}',
                                '#control>.control{padding-top:' + cbnum5 + 'px;padding-bottom:' + cbnum6 + 'px}'
                            );
                        }
                    }
                },
                custom_button_system_top: {
                    name: '菜单上部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_system_top', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_system_bottom: {
                    name: '菜单下部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_system_bottom', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_control_top: {
                    name: '技能上部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_control_top', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                custom_button_control_bottom: {
                    name: '技能下部高度',
                    init: '0x',
                    item: {
                        '-5x': '-5px',
                        '-4x': '-4px',
                        '-3x': '-3px',
                        '-2x': '-2px',
                        '-1x': '-1px',
                        '0x': '默认',
                        '1x': '1px',
                        '2x': '2px',
                        '3x': '3px',
                        '4x': '4px',
                        '5x': '5px',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('custom_button_control_bottom', item);
                        lib.configMenu.appearence.config.custom_button.onclick('skip');
                    }
                },
                radius_size: {
                    name: '圆角大小',
                    init: 'default',
                    item: {
                        off: '关闭',
                        reduce: '减小',
                        default: '默认',
                        increase: '增大',
                    },
                    unfrequent: true,
                    onclick: function (item) {
                        game.saveConfig('radius_size', item);
                        ui.window.dataset.radius_size = item;
                    }
                },
                glow_phase: {
                    name: '当前回合角色高亮',
                    unfrequent: true,
                    init: 'yellow',
                    intro: '设置当前回合角色的边框颜色',
                    item: {
                        none: '无',
                        yellow: '黄色',
                        green: '绿色',
                        purple: '紫色',
                    },
                    onclick: function (bool) {
                        game.saveConfig('glow_phase', bool);
                        lib.init.cssstyles();
                    }
                },
                fold_card: {
                    name: '折叠手牌',
                    init: true,
                    unfrequent: true,
                },
                fold_mode: {
                    name: '折叠模式菜单',
                    intro: '关闭后模式菜单中“更多”内的项目将直接展开',
                    init: true,
                    unfrequent: true,
                },
                seperate_control: {
                    name: '分离选项条',
                    init: true,
                    unfrequent: true,
                    intro: '开启后玩家在进行选择时不同的选项将分开，而不是连在一起',
                },
                blur_ui: {
                    name: '模糊效果',
                    intro: '在暂停或打开菜单时开启模糊效果',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('blur_ui', bool);
                        if (bool) {
                            ui.window.classList.add('blur_ui');
                        }
                        else {
                            ui.window.classList.remove('blur_ui');
                        }
                    }
                },
                glass_ui: {
                    name: '玻璃主题',
                    intro: '为游戏主题打开玻璃效果（手机暂不支持）',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('glass_ui', bool);
                        if (bool) {
                            ui.window.classList.add('glass_ui');
                        }
                        else {
                            ui.window.classList.remove('glass_ui');
                        }
                    }
                },
                damage_shake: {
                    name: '伤害抖动',
                    intro: '角色受到伤害时的抖动效果',
                    init: true,
                    unfrequent: true,
                },
                button_press: {
                    name: '按钮效果',
                    intro: '选项条被按下时将有按下效果',
                    init: true,
                    unfrequent: true,
                },
                jiu_effect: {
                    name: '喝酒效果',
                    init: true,
                    unfrequent: true,
                },
                animation: {
                    name: '游戏特效',
                    intro: '开启后出现属性伤害、回复体力等情况时会显示动画',
                    init: false,
                    unfrequent: true,
                },
                skill_animation_type: {
                    name: '技能特效',
                    intro: '开启后觉醒技、限定技将显示全屏文字',
                    init: 'default',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        old: '旧版',
                        off: '关闭'
                    }
                },
                die_move: {
                    name: '阵亡效果',
                    intro: '阵亡后武将的显示效果',
                    init: 'flip',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        move: '移动',
                        flip: '翻面',
                    }
                },
                target_shake: {
                    name: '目标效果',
                    intro: '一名玩家成为卡牌或技能的目标时的显示效果',
                    init: 'off',
                    item: {
                        off: '关闭',
                        zoom: '缩放',
                        shake: '抖动',
                    },
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('target_shake', bool);
                        ui.arena.dataset.target_shake = bool;
                    }
                },
                turned_style: {
                    name: '翻面文字',
                    intro: '角色被翻面时显示“翻面”',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('turned_style', bool);
                        if (bool) {
                            ui.arena.classList.remove('hide_turned');
                        }
                        else {
                            ui.arena.classList.add('hide_turned');
                        }
                    }
                },
                link_style2: {
                    name: '横置样式',
                    intro: '设置角色被横置时的样式',
                    init: 'chain',
                    unfrequent: true,
                    item: {
                        chain: '铁索',
                        rotate: '横置',
                        mark: '标记'
                    },
                    onclick: function (style) {
                        var list = [];
                        for (var i = 0; i < game.players.length; i++) {
                            if (game.players[i].isLinked()) {
                                list.push(game.players[i]);
                            }
                        }
                        game.saveConfig('link_style2', style);
                        for (var i = 0; i < list.length; i++) {
                            if (get.is.linked2(list[i])) {
                                list[i].classList.add('linked2');
                                list[i].classList.remove('linked');
                            }
                            else {
                                list[i].classList.add('linked');
                                list[i].classList.remove('linked2');
                            }
                        }
                        if (style == 'chain') {
                            ui.arena.classList.remove('nolink');
                        }
                        else {
                            ui.arena.classList.add('nolink');
                        }
                        ui.updatem();
                    }
                },
                cardshape: {
                    name: '手牌显示',
                    intro: '将手牌设置为正方形或长方形',
                    init: 'default',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        oblong: '长方',
                    },
                    onclick: function (item) {
                        var linked = false;
                        if (game.me && game.me.isLinked()) {
                            linked = true;
                        }
                        game.saveConfig('cardshape', item);
                        if (item == 'oblong' && (game.layout == 'long' || game.layout == 'mobile' || game.layout == 'long2' || game.layout == 'nova')) {
                            ui.arena.classList.add('oblongcard');
                            ui.window.classList.add('oblongcard');
                        }
                        else {
                            ui.arena.classList.remove('oblongcard');
                            ui.window.classList.remove('oblongcard');
                        }
                        if (linked) {
                            if (get.is.linked2(game.me)) {
                                game.me.classList.remove('linked');
                                game.me.classList.add('linked2');
                            }
                            else {
                                game.me.classList.add('linked');
                                game.me.classList.remove('linked2');
                            }
                        }
                    }
                },
                cardtempname: {
                    name: '视为卡牌名称显示',
                    intro: '显示强制视为类卡牌（如武魂），包括拆顺对话框内的判定牌（国色）转换等名称的显示方式',
                    init: 'image',
                    unfrequent: true,
                    item: {
                        default: '纵向',
                        horizon: '横向',
                        image: '图片',
                        off: '禁用',
                    },
                    onclick: function (item) {
                        game.saveConfig('cardtempname', item);
                        if (!game.me || !game.me.getCards) return;
                        var hs = game.me.getCards('h');
                        for (var i = 0; i < hs.length; i++) {
                            if (hs[i]._tempName) {
                                switch (item) {
                                    case 'default':
                                    case 'horizon':
                                    case 'image':
                                        ui.create.cardTempName(hs[i]);
                                        break;
                                    default:
                                        hs[i]._tempName.delete();
                                        delete hs[i]._tempName;
                                }
                            }
                        }
                    }
                },
                /*textequip:{
                    name:'装备显示',
                    init:'image',
                    unfrequent:true,
                    item:{
                        image:'图片',
                        text:'文字',
                    },
                    onclick:function(item){
                        game.saveConfig('textequip',item);
                        if(item=='text'&&(game.layout=='long'||game.layout=='mobile')){
                            ui.arena.classList.add('textequip');
                        }
                        else{
                            ui.arena.classList.remove('textequip');
                        }
                    }
                },*/
                buttoncharacter_style: {
                    name: '选将样式',
                    init: 'default',
                    item: {
                        default: '默认',
                        simple: '精简',
                        old: '旧版'
                    },
                    unfrequent: true,
                },
                buttoncharacter_prefix: {
                    name: '武将前缀',
                    init: 'default',
                    item: {
                        default: '默认',
                        simple: '不显示颜色',
                        off: '不显示前缀'
                    },
                    unfrequent: true,
                },
                cursor_style: {
                    name: '鼠标指针',
                    init: 'auto',
                    intro: '设置为固定后鼠标指针将不随移动到的区域而变化',
                    unfrequent: true,
                    item: {
                        auto: '自动',
                        pointer: '固定'
                    },
                    onclick: function (item) {
                        game.saveConfig('cursor_style', item);
                        if (item == 'pointer') {
                            ui.window.classList.add('nopointer');
                        }
                        else {
                            ui.window.classList.remove('nopointer');
                        }
                    }
                },
                name_font: {
                    name: '人名字体',
                    init: 'xingkai',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('name_font', font);
                        lib.init.cssstyles();
                    }
                },
                identity_font: {
                    name: '身份字体',
                    init: 'huangcao',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('identity_font', font);
                        lib.init.cssstyles();
                    }
                },
                cardtext_font: {
                    name: '卡牌字体',
                    init: 'default',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('cardtext_font', font);
                        lib.init.cssstyles();
                    }
                },
                global_font: {
                    name: '界面字体',
                    init: 'default',
                    unfrequent: true,
                    item: {},
                    textMenu: function (node, link) {
                        if (link != 'default') {
                            node.style.fontFamily = link;
                        }
                        else {
                            node.style.fontFamily = "'STHeiti','SimHei','Microsoft JhengHei','Microsoft YaHei','WenQuanYi Micro Hei','Suits',Helvetica,Arial,sans-serif";
                        }
                        node.style.fontSize = '20px';
                    },
                    onclick: function (font) {
                        game.saveConfig('global_font', font);
                        lib.init.cssstyles();
                    }
                },
                suits_font: {
                    name: '替换花色字体',
                    init: true,
                    unfrequent: true,
                    intro: '使用全角字符的花色替代系统自带的花色（重启游戏后生效）',
                    onclick: function (bool) {
                        game.saveConfig('suits_font', bool);
                    }
                },
                update: function (config, map) {
                    if (lib.config.custom_button) {
                        map.custom_button_system_top.show();
                        map.custom_button_system_bottom.show();
                        map.custom_button_control_top.show();
                        map.custom_button_control_bottom.show();
                    }
                    else {
                        map.custom_button_system_top.hide();
                        map.custom_button_system_bottom.hide();
                        map.custom_button_control_top.hide();
                        map.custom_button_control_bottom.hide();
                    }
                    if (lib.config.change_skin) {
                        map.change_skin_auto.show();
                    }
                    else {
                        map.change_skin_auto.hide();
                    }
                    if (lib.config.image_background_random) {
                        map.image_background_blur.show();
                        map.image_background.hide();
                        // map.import_background.hide();
                    }
                    else {
                        map.image_background.show();
                        if (lib.config.image_background == 'default') {
                            map.image_background_blur.hide();
                        }
                        else {
                            map.image_background_blur.show();
                        }
                        // if(lib.config.image_background=='custom'&&lib.db){
                        // 	map.import_background.show();
                        // }
                        // else{
                        // 	map.import_background.hide();
                        // }
                    }
                    if (lib.config.layout == 'long' || lib.config.layout == 'mobile') {
                        //map.textequip.show();
                        map.cardshape.show();
                        map.phonelayout.show();
                    }
                    else {
                        //map.textequip.hide();
                        if (lib.config.layout == 'long2' || lib.config.layout == 'nova') {
                            map.phonelayout.show();
                            map.cardshape.show();
                        }
                        else {
                            map.phonelayout.hide();
                            map.cardshape.hide();
                        }
                    }
                    if (lib.config.layout == 'long') {
                        // map.fewplayer.show();
                        map.player_height.show();
                    }
                    else {
                        // map.fewplayer.hide();
                        if (lib.config.layout == 'long2') {
                            map.player_height.show();
                        }
                        else {
                            map.player_height.hide();
                        }
                    }
                    if (lib.config.layout == 'nova') {
                        map.player_height_nova.show();
                    }
                    else {
                        map.player_height_nova.hide();
                    }
                    if (lib.config.touchscreen) {
                        map.cursor_style.hide();
                    }
                    else {
                        map.cursor_style.show();
                    }
                    if (lib.config.border_style == 'auto') {
                        map.autoborder_count.show();
                        map.autoborder_start.show();
                    }
                    else {
                        map.autoborder_count.hide();
                        map.autoborder_start.hide();
                    }
                },
            }
        },
        view: {
            name: '显示',
            config: {
                update: function (config, map) {
                    if (lib.config.mode == 'versus' || lib.config.mode == 'chess' || lib.config.mode == 'tafang' || lib.config.mode == 'boss') {
                        map.show_handcardbutton.show();
                    }
                    else {
                        map.show_handcardbutton.hide();
                    }
                    if (lib.config.touchscreen) {
                        map.pop_logv.hide();
                    }
                    else {
                        map.pop_logv.show();
                    }
                    if (lib.device) {
                        if (lib.device == 'android') {
                            map.show_statusbar_android.show();
                            map.show_statusbar_ios.hide();
                        }
                        else if (lib.device == 'ios') {
                            map.show_statusbar_ios.show();
                            map.show_statusbar_android.hide();
                        }
                        if (!game.download) {
                            setTimeout(function () {
                                if (!window.StatusBar) {
                                    map.show_statusbar.hide();
                                }
                            }, 5000);
                        }
                    }
                    else {
                        map.show_statusbar_ios.hide();
                        map.show_statusbar_android.hide();
                    }
                    if (get.is.phoneLayout()) {
                        map.remember_round_button.show();
                        map.popequip.show();
                        map.filternode_button.show();
                        map.show_pause.hide();
                        map.show_auto.hide();
                        map.show_replay.hide();
                        map.show_round_menu.show();
                    }
                    else {
                        map.show_pause.show();
                        map.show_auto.show();
                        map.show_replay.show();
                        map.show_round_menu.hide();
                        map.remember_round_button.hide();
                        map.popequip.hide();
                        map.filternode_button.hide();
                    }
                    if (lib.config.show_card_prompt) {
                        map.hide_card_prompt_basic.show();
                        map.hide_card_prompt_equip.show();
                    }
                    else {
                        map.hide_card_prompt_basic.hide();
                        map.hide_card_prompt_equip.hide();
                    }
                    if (lib.config.show_log != 'off') {
                        map.clear_log.show();
                    }
                    else {
                        map.clear_log.hide();
                    }
                    if (get.is.phoneLayout()) {
                        map.show_time2.show();
                        map.show_time.hide();
                        if (lib.config.show_time2) {
                            map.watchface.show();
                        }
                        else {
                            map.watchface.hide();
                        }
                    }
                    else {
                        map.show_time2.hide();
                        map.show_time.show();
                        map.watchface.hide();
                    }
                    if (lib.config.show_extensionmaker) {
                        map.show_extensionshare.show();
                    }
                    else {
                        map.show_extensionshare.hide();
                    }
                },
                show_history: {
                    name: '出牌记录栏',
                    init: 'off',
                    intro: '在屏幕左侧或右侧显示出牌记录',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        left: '靠左',
                        right: '靠右',
                    },
                    onclick: function (bool) {
                        if (lib.config.show_history == 'right') ui.window.animate('rightbar2');
                        game.saveConfig('show_history', bool);
                        if (_status.video || !_status.prepareArena) return;
                        if (bool == 'left') {
                            ui.window.classList.add('leftbar');
                            ui.window.classList.remove('rightbar');
                        }
                        else if (bool == 'right') {
                            ui.window.classList.remove('leftbar');
                            ui.window.classList.add('rightbar');
                        }
                        else {
                            ui.window.classList.remove('leftbar');
                            ui.window.classList.remove('rightbar');
                        }
                    }
                },
                pop_logv: {
                    name: '自动弹出记录',
                    init: false,
                    unfrequent: true
                },
                show_log: {
                    name: '历史记录栏',
                    init: 'off',
                    intro: '在屏幕中部显示出牌文字记录',
                    unfrequent: true,
                    item: {
                        off: '关闭',
                        left: '靠左',
                        center: '居中',
                        right: '靠右',
                    },
                    onclick: function (bool) {
                        game.saveConfig('show_log', bool);
                        if (lib.config.show_log != 'off') {
                            ui.arenalog.style.display = '';
                            ui.arenalog.dataset.position = bool;
                        }
                        else {
                            ui.arenalog.style.display = 'none';
                            ui.arenalog.innerHTML = '';
                        }
                    }
                },
                clear_log: {
                    name: '自动清除历史记录',
                    init: false,
                    unfrequent: true,
                    intro: '开启后将定时清除历史记录栏的条目（而不是等记录栏满后再清除）'
                },
                log_highlight: {
                    name: '历史记录高亮',
                    init: true,
                    unfrequent: true,
                    intro: '开启后历史记录不同类别的信息将以不同颜色显示',
                },
                show_time: {
                    name: '显示时间',
                    intro: '在屏幕顶部显示当前时间',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_time', bool);
                        if (bool) {
                            ui.time.style.display = '';
                        }
                        else {
                            ui.time.style.display = 'none';
                        }
                    }
                },
                show_time2: {
                    name: '显示时间',
                    intro: '在触屏按钮处显示当前时间',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_time2', bool);
                        if (bool) {
                            ui.roundmenu.classList.add('clock');
                        }
                        else {
                            ui.roundmenu.classList.remove('clock');
                        }
                    }
                },
                watchface: {
                    name: '表盘样式',
                    init: 'none',
                    unfrequent: true,
                    item: {
                        none: '默认',
                        simple: '简约',
                    },
                    onclick: function (item) {
                        game.saveConfig('watchface', item);
                        ui.roundmenu.dataset.watchface = item;
                    }
                },
                show_time3: {
                    name: '显示游戏时间',
                    init: false,
                    unfrequent: true
                },
                show_statusbar_android: {
                    name: '显示状态栏',
                    init: false,
                    unfrequent: true,
                    content: function (bool) {
                        game.saveConfig('show_statusbar', bool);
                        if (window.StatusBar && lib.device == 'android') {
                            if (bool) {
                                window.StatusBar.overlaysWebView(false);
                                window.StatusBar.backgroundColorByName('black');
                                window.StatusBar.show();
                            }
                            else {
                                window.StatusBar.hide();
                            }
                        }
                    }
                },
                show_statusbar_ios: {
                    name: '显示状态栏',
                    init: 'off',
                    unfrequent: true,
                    item: {
                        default: '默认',
                        overlay: '嵌入',
                        auto: '自动',
                        off: '关闭'
                    },
                    onclick: function (bool) {
                        game.saveConfig('show_statusbar_ios', bool);
                        if (window.StatusBar && lib.device == 'ios') {
                            if (bool != 'off' && bool != 'auto') {
                                if (lib.config.show_statusbar_ios == 'default') {
                                    window.StatusBar.overlaysWebView(false);
                                    document.body.classList.remove('statusbar');
                                }
                                else {
                                    window.StatusBar.overlaysWebView(true);
                                    document.body.classList.add('statusbar');
                                }
                                window.StatusBar.backgroundColorByName('black');
                                window.StatusBar.show();
                            }
                            else {
                                document.body.classList.remove('statusbar');
                                window.StatusBar.hide();
                            }
                        }
                    }
                },
                show_card_prompt: {
                    name: '显示出牌信息',
                    intro: '出牌时在使用者上显示卡牌名称',
                    init: true,
                    unfrequent: true,
                },
                hide_card_prompt_basic: {
                    name: '隐藏基本牌信息',
                    intro: '不显示基本牌名称',
                    init: false,
                    unfrequent: true,
                },
                hide_card_prompt_equip: {
                    name: '隐藏装备牌信息',
                    intro: '不显示装备牌名称',
                    init: false,
                    unfrequent: true,
                },
                show_phase_prompt: {
                    name: '显示阶段信息',
                    intro: '在当前回合不同阶段开始时显示阶段名称',
                    init: true,
                    unfrequent: true,
                },
                show_phaseuse_prompt: {
                    name: '出牌阶段提示',
                    intro: '在你出牌时显示提示文字',
                    init: true,
                    unfrequent: true,
                },
                auto_popped_config: {
                    name: '自动弹出选项',
                    intro: '鼠标移至选项按钮时弹出模式选择菜单',
                    init: true,
                    unfrequent: true,
                },
                auto_popped_history: {
                    name: '自动弹出历史',
                    intro: '鼠标移至暂停按钮时弹出历史记录菜单',
                    init: false,
                    unfrequent: true,
                },
                show_round_menu: {
                    name: '显示触屏按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        if (get.is.nomenu('show_round_menu', bool)) return false;
                        game.saveConfig('show_round_menu', bool);
                        if (bool && ui.roundmenu) {
                            ui.roundmenu.style.display = '';
                        }
                        else {
                            ui.roundmenu.style.display = 'none';
                            alert('关闭触屏按钮后可通过手势打开菜单（默认为下划）')
                        }
                    }
                },
                remember_round_button: {
                    name: '记住按钮位置',
                    intro: '重新开始后触屏按钮将保存的上一局的位置',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('remember_round_button', bool);
                        if (!bool) {
                            ui.click.resetround();
                        }
                    }
                },
                remember_dialog: {
                    name: '记住对话框位置',
                    intro: '移动对话框后新的对话框也将在移动后的位置显示',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('remember_dialog', bool);
                        if (!bool) {
                            if (ui.dialog) {
                                var dialog = ui.dialog;
                                dialog.style.transform = '';
                                dialog._dragtransform = [0, 0];
                                dialog.style.transition = 'all 0.3s';
                                dialog._dragtouches;
                                dialog._dragorigin;
                                dialog._dragorigintransform;
                                setTimeout(function () {
                                    dialog.style.transition = '';
                                }, 500);
                            }
                            game.saveConfig('dialog_transform', [0, 0]);
                        }
                    }
                },
                transparent_dialog: {
                    name: '堆叠对话框虚化',
                    init: false,
                    intro: '当具有static属性的对话框堆叠（如五谷丰登对话框中提示无懈可击）时，将后方的对话框变为半透明',
                    onclick: function (bool) {
                        game.saveConfig('transparent_dialog', bool);
                        if (bool) {
                            for (var i = 0; i < ui.dialogs.length; i++) {
                                if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
                                    ui.dialogs[i].unfocus();
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < ui.dialogs.length; i++) {
                                if (ui.dialogs[i] != ui.dialog && ui.dialogs[i].static) {
                                    ui.dialogs[i].refocus();
                                }
                            }
                        }
                    }
                },
                show_rarity: {
                    name: '显示武将评级',
                    init: false,
                    intro: '仅供娱乐，重启后生效',
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_rarity', bool);
                    }
                },
                mark_identity_style: {
                    name: '标记身份操作',
                    intro: '设置单击身份按钮时的操作',
                    unfrequent: true,
                    init: 'menu',
                    item: {
                        menu: '菜单',
                        click: '单击',
                    },
                },
                character_dialog_tool: {
                    name: '自由选将显示',
                    intro: '点击自由选将时默认显示的条目',
                    init: '最近',
                    item: {
                        '收藏': '收藏',
                        '最近': '最近',
                        'all': '全部'
                    },
                    unfrequent: true,
                },
                recent_character_number: {
                    name: '最近使用武将',
                    intro: '自由选将对话框中最近使用武将的数量',
                    init: '12',
                    item: {
                        '6': '6',
                        '12': '12',
                        '20': '24',
                        '30': '36',
                    },
                    unfrequent: true
                },
                popequip: {
                    name: '触屏装备选择',
                    intro: '设置触屏布局中选择装备的方式',
                    init: true,
                    unfrequent: true,
                },
                filternode_button: {
                    name: '触屏筛选按钮',
                    intro: '设置自由选将对话框中筛选按钮的样式',
                    init: true,
                    unfrequent: true,
                },
                show_charactercard: {
                    name: '显示武将资料',
                    intro: '在武将界面单击时弹出武将资料卡',
                    init: true,
                    unfrequent: true
                },
                show_favourite: {
                    name: '显示添加收藏',
                    intro: '在角色的右键菜单中显示添加收藏',
                    init: false,
                    unfrequent: true
                },
                show_favmode: {
                    name: '显示模式收藏',
                    intro: '快捷菜单中显示收藏模式',
                    init: true,
                    unfrequent: true
                },
                show_favourite_menu: {
                    name: '显示收藏菜单',
                    intro: '在选项-武将中显示收藏一栏',
                    init: true,
                    unfrequent: true
                },
                show_ban_menu: {
                    name: '显示禁将菜单',
                    intro: '在选项-武将中显示禁将一栏',
                    init: true,
                    unfrequent: true
                },
                right_range: {
                    name: '显示距离信息',
                    intro: '在角色的右键菜单中显示距离等信息',
                    init: true,
                    unfrequent: true
                },
                hide_card_image: {
                    name: '隐藏卡牌背景',
                    intro: '所有卡牌将使用文字作为背景',
                    init: false,
                    unfrequent: true,
                    restart: true,
                },
                show_name: {
                    name: '显示角色名称',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_name', bool);
                        if (bool) {
                            ui.arena.classList.remove('hide_name');
                        }
                        else {
                            ui.arena.classList.add('hide_name');
                        }
                    }
                },
                show_sex: {
                    name: '显示角色性别',
                    intro: '在角色的右键菜单中显示角色性别',
                    init: true,
                    unfrequent: true
                },
                show_group: {
                    name: '显示角色势力',
                    intro: '在角色的右键菜单中显示角色势力',
                    init: true,
                    unfrequent: true
                },
                show_replay: {
                    name: '显示重来按钮',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_replay', bool);
                        if (lib.config.show_replay) {
                            ui.replay.style.display = '';
                        }
                        else {
                            ui.replay.style.display = 'none';
                        }
                    }
                },
                show_playerids: {
                    name: '显示身份按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_playerids', bool);
                        if (lib.config.show_playerids) {
                            ui.playerids.style.display = '';
                        }
                        else {
                            ui.playerids.style.display = 'none';
                        }
                    }
                },
                show_sortcard: {
                    name: '显示整理手牌按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_sortcard', bool);
                        if (lib.config.show_sortcard) {
                            ui.sortCard.style.display = '';
                        }
                        else {
                            ui.sortCard.style.display = 'none';
                        }
                    }
                },
                show_pause: {
                    name: '显示暂停按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_pause', bool);
                        if (lib.config.show_pause) {
                            ui.pause.style.display = '';
                        }
                        else {
                            ui.pause.style.display = 'none';
                        }
                    }
                },
                show_auto: {
                    name: '显示托管按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_auto', bool);
                        if (lib.config.show_auto) {
                            ui.auto.style.display = '';
                        }
                        else {
                            ui.auto.style.display = 'none';
                        }
                    }
                },
                show_volumn: {
                    name: '显示音量按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_volumn', bool);
                        if (lib.config.show_volumn) {
                            ui.volumn.style.display = '';
                        }
                        else {
                            ui.volumn.style.display = 'none';
                        }
                    }
                },
                show_cardpile: {
                    name: '显示牌堆按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_cardpile', bool);
                        if (bool) {
                            ui.cardPileButton.style.display = '';
                        }
                        else {
                            ui.cardPileButton.style.display = 'none';
                        }
                    }
                },
                show_cardpile_number: {
                    name: '显示剩余牌数',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_cardpile_number', bool);
                        if (bool) {
                            ui.cardPileNumber.style.display = '';
                        }
                        else {
                            ui.cardPileNumber.style.display = 'none';
                        }
                    }
                },
                show_handcardbutton: {
                    name: '显示手牌按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_handcardbutton', bool);
                    }
                },
                show_giveup: {
                    name: '显示投降按钮',
                    init: true,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_giveup', bool);
                    }
                },
                show_wuxie: {
                    name: '显示无懈按钮',
                    intro: '在右上角显示不询问无懈',
                    init: false,
                    unfrequent: true,
                    onclick: function (bool) {
                        game.saveConfig('show_wuxie', bool);
                        if (lib.config.show_wuxie) {
                            ui.wuxie.style.display = '';
                        }
                        else {
                            ui.wuxie.style.display = 'none';
                        }
                    }
                },
                wuxie_right: {
                    name: '无懈按钮靠左',
                    init: true,
                    unfrequent: true,
                },
                show_discardpile: {
                    name: '暂停时显示弃牌堆',
                    init: false,
                    unfrequent: true,
                },
                show_extensionmaker: {
                    name: '显示制作扩展',
                    init: true,
                    unfrequent: true,
                },
                show_extensionshare: {
                    name: '显示分享扩展',
                    init: true,
                    unfrequent: true,
                },
                show_characternamepinyin: {
                    name: '显示武将名注解',
                    intro: '在武将资料卡显示武将名及其注解、性别、势力、体力等信息',
                    init: 'showPinyin',
                    unfrequent: true,
                    item: {
                        doNotShow: '不显示',
                        showPinyin: '拼音(样式一)',
                        showCodeIdentifier: '代码ID(样式一)',
                        showPinyin2: '拼音(样式二)',
                        showCodeIdentifier2: '代码ID(样式二)',
                    },
                    visualMenu: (node, link, name) => {
                        node.classList.add('button', 'character');
                        const style = node.style;
                        style.alignItems = 'center';
                        style.animation = 'background-position-left-center-right-center-left-center 15s ease infinite';
                        style.background = 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)';
                        style.backgroundSize = '400% 400%';
                        style.display = 'flex';
                        style.height = '60px';
                        style.justifyContent = 'center';
                        style.width = '180px';
                        const firstChild = node.firstChild;
                        firstChild.removeAttribute('class');
                        firstChild.style.position = 'initial';
                        if (link == 'doNotShow') return;
                        const ruby = document.createElement('ruby');
                        ruby.textContent = name;
                        const rt = document.createElement('rt');
                        rt.style.fontSize = 'smaller';
                        if (link == 'showPinyin2' || link == 'showCodeIdentifier2') {
                            rt.textContent = link == 'showCodeIdentifier2' ? '[' + link + ']' : '[' + get.pinyin(name) + ']';
                            ruby.appendChild(rt);
                        } else {
                            const leftParenthesisRP = document.createElement('rp');
                            leftParenthesisRP.textContent = '（';
                            ruby.appendChild(leftParenthesisRP);
                            rt.textContent = link == 'showCodeIdentifier' ? link : get.pinyin(name).join(' ');
                            ruby.appendChild(rt);
                            const rightParenthesisRP = document.createElement('rp');
                            rightParenthesisRP.textContent = '）';
                            ruby.appendChild(rightParenthesisRP);
                        }
                        firstChild.innerHTML = ruby.outerHTML;
                    }
                },
                show_skillnamepinyin: {
                    name: '显示技能名注解',
                    intro: '在武将资料卡显示技能名注解',
                    get init() {
                        return lib.configMenu.view.config.show_characternamepinyin.init;
                    },
                    get unfrequent() {
                        return lib.configMenu.view.config.show_characternamepinyin.unfrequent;
                    },
                    get item() {
                        return lib.configMenu.view.config.show_characternamepinyin.item;
                    },
                    get visualMenu() {
                        return lib.configMenu.view.config.show_characternamepinyin.visualMenu;
                    }
                }
            }
        },
        audio: {
            name: '音效',
            config: {
                update: function (config, map) {
                    if (lib.config.background_music == 'music_custom' && (lib.device || lib.node)) {
                        map.import_music.show();
                    }
                    else {
                        map.import_music.hide();
                    }
                    map.clear_background_music[get.is.object(lib.config.customBackgroundMusic) ? 'show' : 'hide']();
                    ui.background_music_setting = map.background_music;
                    map.background_music._link.config.updatex.call(map.background_music, []);
                },
                background_music: {
                    updatex: function () {
                        this.lastChild.innerHTML = this._link.config.item[lib.config.background_music];
                        var menu = this._link.menu;
                        for (var i = 0; i < menu.childElementCount; i++) {
                            if (!['music_off', 'music_custom', 'music_random'].concat(lib.config.all.background_music).contains(menu.childNodes[i]._link)) menu.childNodes[i].delete();
                        }
                    },
                    name: '背景音乐',
                    init: true,
                    item: {
                        music_default: '默认',
                    },
                    onclick: function (item) {
                        game.saveConfig('background_music', item);
                        game.playBackgroundMusic();
                    }
                },
                import_music: {
                    name: '<div style="white-space:nowrap;width:calc(100% - 5px)">' +
                        '<input type="file" style="width:calc(100% - 40px)" accept="audio/*">' +
                        '<button style="width:40px">确定</button></div>',
                    clear: true,
                },
                background_audio: {
                    name: '游戏音效',
                    init: true,
                },
                background_speak: {
                    name: '人物配音',
                    init: true,
                },
                equip_audio: {
                    name: '装备配音',
                    init: false,
                },
                repeat_audio: {
                    name: '播放重复语音',
                    init: false,
                },
                volumn_audio: {
                    name: '音效音量',
                    init: 8,
                    item: {
                        '0': '〇',
                        '1': '一',
                        '2': '二',
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '7': '七',
                        '8': '八',
                    },
                    onclick: function (volume) {
                        game.saveConfig('volumn_audio', parseInt(volume));
                    }
                },
                volumn_background: {
                    name: '音乐音量',
                    init: 8,
                    item: {
                        '0': '〇',
                        '1': '一',
                        '2': '二',
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '7': '七',
                        '8': '八',
                    },
                    onclick: function (volume) {
                        game.saveConfig('volumn_background', parseInt(volume));
                        ui.backgroundMusic.volume = volume / 8;
                    }
                },
                clear_background_music: {
                    name: '清除自定义背景音乐',
                    clear: true,
                    onclick: function () {
                        if (confirm('是否清除已导入的所有自定义背景音乐？（该操作不可撤销！）')) {
                            for (var i in lib.config.customBackgroundMusic) {
                                lib.config.all.background_music.remove(i);
                                if (i.startsWith('cdv_')) {
                                    game.removeFile('audio/background/' + i + '.mp3');
                                }
                                else {
                                    game.deleteDB('audio', i);
                                }
                            }
                            lib.config.customBackgroundMusic = null;
                            game.saveConfig('customBackgroundMusic', null);
                            game.saveConfig('background_music', 'music_off');
                            if (!_status._aozhan) game.playBackgroundMusic();
                        }
                    },
                },
            }
        },
        skill: {
            name: '技能',
            config: {
                update: function (config, map) {
                    for (var i in map) {
                        if (map[i]._link.config.type == 'autoskill') {
                            if (!lib.config.autoskilllist.contains(i)) {
                                map[i].classList.add('on');
                            }
                            else {
                                map[i].classList.remove('on');
                            }
                        }
                        else if (map[i]._link.config.type == 'banskill') {
                            if (!lib.config.forbidlist.contains(i)) {
                                map[i].classList.add('on');
                            }
                            else {
                                map[i].classList.remove('on');
                            }
                        }
                    }
                }
            }
        },
        others: {
            name: '其它',
            config: {
                // reset_database:{
                // 	name:'重置游戏',
                // 	onclick:function(){
                // 		var node=this;
                // 		if(node._clearing){
                // 			if(indexedDB) indexedDB.deleteDatabase(lib.configprefix+'data');
                // 			game.reload();
                // 			return;
                // 		}
                // 		node._clearing=true;
                // 		node.innerHTML='单击以确认 (3)';
                // 		setTimeout(function(){
                // 			node.innerHTML='单击以确认 (2)';
                // 			setTimeout(function(){
                // 				node.innerHTML='单击以确认 (1)';
                // 				setTimeout(function(){
                // 					node.innerHTML='重置游戏录像';
                // 					delete node._clearing;
                // 				},1000);
                // 			},1000);
                // 		},1000);
                // 	},
                // 	clear:true
                // },
                reset_game: {
                    name: '重置游戏设置',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            var noname_inited = localStorage.getItem('noname_inited');
                            var onlineKey = localStorage.getItem(lib.configprefix + 'key');
                            localStorage.clear();
                            if (noname_inited) {
                                localStorage.setItem('noname_inited', noname_inited);
                            }
                            if (onlineKey) {
                                localStorage.setItem(lib.configprefix + 'key', onlineKey);
                            }
                            game.deleteDB('config');
                            game.deleteDB('data');
                            game.reload();
                            return;
                        }
                        node._clearing = true;
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        setTimeout(function () {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            setTimeout(function () {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                setTimeout(function () {
                                    node.firstChild.innerHTML = '重置游戏设置';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true
                },
                reset_hiddenpack: {
                    name: '重置隐藏内容',
                    onclick: function () {
                        if (this.firstChild.innerHTML != '已重置') {
                            this.firstChild.innerHTML = '已重置'
                            game.saveConfig('hiddenModePack', []);
                            game.saveConfig('hiddenCharacterPack', []);
                            game.saveConfig('hiddenCardPack', []);
                            game.saveConfig('hiddenPlayPack', []);
                            game.saveConfig('hiddenBackgroundPack', []);
                            var that = this;
                            setTimeout(function () {
                                that.firstChild.innerHTML = '重置隐藏内容';
                                setTimeout(function () {
                                    if (confirm('是否重新启动使改变生效？')) {
                                        game.reload();
                                    }
                                });
                            }, 500);
                        }
                    },
                    clear: true
                },
                reset_tutorial: {
                    name: '重置新手向导',
                    onclick: function () {
                        if (this.firstChild.innerHTML != '已重置') {
                            this.firstChild.innerHTML = '已重置'
                            game.saveConfig('new_tutorial', false);
                            game.saveConfig('prompt_hidebg');
                            game.saveConfig('prompt_hidepack');
                            var that = this;
                            setTimeout(function () {
                                that.firstChild.innerHTML = '重置新手向导';
                            }, 500);
                        }
                    },
                    clear: true
                },
                import_data: {
                    name: '导入游戏设置',
                    onclick: function () {
                        ui.import_data_button.classList.toggle('hidden');
                    },
                    clear: true
                },
                import_data_button: {
                    name: '<div style="white-space:nowrap;width:calc(100% - 10px)">' +
                        '<input type="file" accept="*/*" style="width:calc(100% - 40px)">' +
                        '<button style="width:40px">确定</button></div>',
                    clear: true,
                },
                export_data: {
                    name: '导出游戏设置',
                    onclick: function () {
                        var data;
                        var export_data = function (data) {
                            game.export(lib.init.encode(JSON.stringify(data)), '无名杀 - 数据 - ' + (new Date()).toLocaleString());
                        }
                        if (!lib.db) {
                            data = {};
                            for (var i in localStorage) {
                                if (i.startsWith(lib.configprefix)) {
                                    data[i] = localStorage[i];
                                }
                            }
                            export_data(data);
                        }
                        else {
                            game.getDB('config', null, function (data1) {
                                game.getDB('data', null, function (data2) {
                                    export_data({
                                        config: data1,
                                        data: data2
                                    });
                                });
                            });
                        }

                    },
                    clear: true
                },
                redownload_game: {
                    name: '重新下载游戏',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            localStorage.removeItem('noname_inited');
                            game.reload();
                            return;
                        }
                        node._clearing = true;
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        setTimeout(function () {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            setTimeout(function () {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                setTimeout(function () {
                                    node.firstChild.innerHTML = '重新下载游戏';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true
                },
                update: function (config, map) {
                    if (lib.device || lib.node) {
                        map.redownload_game.show();
                    }
                    else {
                        map.redownload_game.hide();
                    }
                }
                // trim_game:{
                // 	name:'隐藏非官方扩展包',
                // 	onclick:function(){
                // 		if(this.innerHTML!='已隐藏'){
                // 			this.innerHTML='已隐藏';
                //      						 var pack=lib.config.all.cards.slice(0);
                //      						 if(Array.isArray(lib.config.hiddenCardPack)){
                //      									  for(var i=0;i<lib.config.hiddenCardPack.length;i++){
                //      															pack.add(lib.config.hiddenCardPack[i]);
                //      									  }
                //      						 }
                //      						 for(var i=0;i<pack.length;i++){
                //      									  if(lib.config.all.sgscards.contains(pack[i])){
                //      															pack.splice(i--,1);
                //      									  }
                //      						 }
                // 			game.saveConfig('hiddenCardPack',pack);
                //
                //      						 var pack=lib.config.all.characters.slice(0);
                //      						 if(Array.isArray(lib.config.hiddenCharacterPack)){
                //      									  for(var i=0;i<lib.config.hiddenCharacterPack.length;i++){
                //      															pack.add(lib.config.hiddenCharacterPack[i]);
                //      									  }
                //      						 }
                //      						 for(var i=0;i<pack.length;i++){
                //      									  if(lib.config.all.sgscharacters.contains(pack[i])){
                //      															pack.splice(i--,1);
                //      									  }
                //      						 }
                // 			game.saveConfig('hiddenCharacterPack',pack);
                //
                //      						 var pack=lib.config.all.mode.slice(0);
                //      						 if(Array.isArray(lib.config.hiddenModePack)){
                //      									  for(var i=0;i<lib.config.hiddenModePack.length;i++){
                //      															pack.add(lib.config.hiddenModePack[i]);
                //      									  }
                //      						 }
                //      						 for(var i=0;i<pack.length;i++){
                //      									  if(lib.config.all.sgsmodes.contains(pack[i])){
                //      															pack.splice(i--,1);
                //      									  }
                //      						 }
                // 			game.saveConfig('hiddenModePack',pack);
                //
                // 			var that=this;
                // 			setTimeout(function(){
                // 				that.innerHTML='隐藏非官方扩展包';
                // 			},500);
                // 		}
                // 	},
                // 	clear:true
                // }
            }
        }
    };

    const extensionMenu = {
        cardpile: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
            },
            intro: {
                name: '将杀闪等牌在牌堆中的比例维持在与军争牌堆相同，防止开启扩展包后被过多地稀释',
                clear: true,
                nopointer: true,
            },
            sha: {
                name: '杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            huosha: {
                name: '火杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            leisha: {
                name: '雷杀',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            shan: {
                name: '闪',
                init: '1',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            tao: {
                name: '桃',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            jiu: {
                name: '酒',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            wuxie: {
                name: '无懈可击',
                init: '0.5',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            nanman: {
                name: '南蛮入侵',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            wanjian: {
                name: '万箭齐发',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            guohe: {
                name: '过河拆桥',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            shunshou: {
                name: '顺手牵羊',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            tiesuo: {
                name: '铁索连环',
                init: '0',
                item: {
                    '1': '补充全部',
                    '0.5': '补充一半',
                    '0': '不补充'
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('cardpile');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('cardpile');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
        boss: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
                onswitch: function (bool) {
                    if (bool) {
                        var storage = { boss: {}, versus: {}, translate: {} };
                        var loadversus = function () {
                            game.loadModeAsync('versus', function (mode) {
                                for (var i in mode.translate) {
                                    storage.translate[i] = mode.translate[i];
                                }
                                for (var i in mode.jiangeboss) {
                                    if (mode.jiangeboss[i][4].contains('bossallowed')) {
                                        storage.versus[i] = mode.jiangeboss[i];
                                    }
                                }
                                localStorage.setItem('boss_storage_playpackconfig', JSON.stringify(storage));
                            });
                        };
                        game.loadModeAsync('boss', function (mode) {
                            for (var i in mode.translate) {
                                storage.translate[i] = mode.translate[i];
                            }
                            for (var i in mode.characterPack.mode_boss) {
                                if (mode.characterPack.mode_boss[i][4].contains('bossallowed')) {
                                    storage.boss[i] = mode.characterPack.mode_boss[i];
                                }
                            }
                            loadversus();
                        });
                    }
                    else {
                        localStorage.removeItem('boss_storage_playpackconfig');
                    }
                }
            },
            intro: {
                name: '将剑阁和挑战模式的武将添加到其它模式',
                clear: true,
                nopointer: true,
            },
            enableai: {
                name: '随机选将可用',
                init: false
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('boss');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('boss');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
        wuxing: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
            },
            intro: {
                name: '每名角色和部分卡牌在游戏开始时随机获得一个属性',
                clear: true,
                nopointer: true,
            },
            num: {
                name: '带属性卡牌',
                init: '0.3',
                item: {
                    '0.1': '10%',
                    '0.2': '20%',
                    '0.3': '30%',
                    '0.5': '50%',
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('wuxing');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('wuxing');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
        coin: {
            enable: {
                name: '开启',
                init: false,
                restart: true,
                onclick: function (bool) {
                    if (bool) {
                        lib.config.plays.add('coin');
                    }
                    else {
                        lib.config.plays.remove('coin');
                    }
                    game.saveConfig('plays', lib.config.plays);
                }
            },
            intro: {
                name: '每完成一次对局，可获得一定数量的金币；金币可用于购买游戏特效',
                clear: true,
                nopointer: true,
            },
            display: {
                name: '金币显示',
                init: 'text',
                item: {
                    symbol: '符号',
                    text: '文字'
                },
                onclick: function (item) {
                    game.saveConfig('coin_display_playpackconfig', item);
                    if (game.changeCoin) game.changeCoin(0);
                }
            },
            canvas: {
                name: '特效置顶',
                init: false,
                onclick: function (bool) {
                    game.saveConfig('coin_canvas_playpackconfig', bool);
                    if (bool) {
                        ui.window.classList.add('canvas_top');
                    }
                    else {
                        ui.window.classList.remove('canvas_top');
                    }
                }
            },
            hide: {
                name: '隐藏此扩展',
                clear: true,
                onclick: function () {
                    if (this.firstChild.innerHTML == '隐藏此扩展') {
                        this.firstChild.innerHTML = '此扩展将在重启后隐藏';
                        lib.config.hiddenPlayPack.add('coin');
                        if (!lib.config.prompt_hidepack) {
                            alert('隐藏的扩展包可通过选项-其它-重置隐藏内容恢复');
                            game.saveConfig('prompt_hidepack', true);
                        }
                    }
                    else {
                        this.firstChild.innerHTML = '隐藏此扩展';
                        lib.config.hiddenPlayPack.remove('coin');
                    }
                    game.saveConfig('hiddenPlayPack', lib.config.hiddenPlayPack);
                }
            },
        },
    };

    const lineColors = [
        ['fire', [255, 146, 68]],
        ['yellow', [255, 255, 122]],
        ['blue', [150, 202, 255]],
        ['green', [141, 255, 216]],
        ['ice', [59, 98, 115]],
        ['thunder', [141, 216, 255]],
        ['kami', [90, 118, 99]],
        ['white', [255, 255, 255]],
        ['poison', [104, 221, 127]],
        ['brown', [195, 161, 223]],
        ['legend', [233, 131, 255]]
    ];

    const mode = {
        identity: {
            name: '身份',
            connect: {
                update: function (config, map) {
                    if (config.connect_identity_mode == 'zhong') {
                        map.connect_player_number.hide();
                        map.connect_limit_zhu.hide();
                        map.connect_enhance_zhu.hide();
                        map.connect_double_nei.hide();
                        map.connect_zhong_card.show();
                        map.connect_special_identity.hide();
                        map.connect_double_character.show();
                    }
                    else if (config.connect_identity_mode == 'purple') {
                        map.connect_player_number.hide();
                        map.connect_limit_zhu.hide();
                        map.connect_enhance_zhu.hide();
                        map.connect_double_nei.hide();
                        map.connect_zhong_card.hide();
                        map.connect_special_identity.hide();
                        map.connect_double_character.hide();
                    }
                    else {
                        map.connect_double_character.show();
                        map.connect_player_number.show();
                        map.connect_limit_zhu.show();
                        map.connect_enhance_zhu.show();
                        if (config.connect_player_number != '2') {
                            map.connect_double_nei.show();
                        }
                        else {
                            map.connect_double_nei.hide();
                        }
                        map.connect_zhong_card.hide();

                        if (config.connect_player_number == '8') {
                            map.connect_special_identity.show();
                        }
                        else {
                            map.connect_special_identity.hide();
                        }
                    }
                },
                connect_identity_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '标准',
                        zhong: '明忠',
                        purple: '3v3v2',
                    },
                    restart: true,
                    frequent: true,
                    intro: '明忠模式和3v3v2模式详见帮助'
                },
                connect_player_number: {
                    name: '游戏人数',
                    init: '8',
                    item: {
                        '2': '两人',
                        '3': '三人',
                        '4': '四人',
                        '5': '五人',
                        '6': '六人',
                        '7': '七人',
                        '8': '八人'
                    },
                    frequent: true,
                    restart: true,
                },
                connect_limit_zhu: {
                    name: '常备主候选武将数',
                    init: 'group',
                    restart: true,
                    item: {
                        off: '不限制',
                        group: '按势力筛选',
                        '4': '四',
                        '6': '六',
                        '8': '八',
                    },
                },
                connect_zhong_card: {
                    name: '明忠卡牌替换',
                    init: true,
                    frequent: true,
                    restart: true
                },
                connect_double_nei: {
                    name: '双内奸',
                    init: false,
                    restart: true,
                    // frequent:true,
                    intro: '开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
                },
                connect_double_character: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                connect_change_card: {
                    name: '启用手气卡',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                connect_special_identity: {
                    name: '特殊身份',
                    init: false,
                    restart: true,
                    frequent: true,
                    intro: '开启后游戏中将增加军师、大将、贼首三个身份'
                },
                // connect_ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // connect_ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
                connect_enhance_zhu: {
                    name: '加强主公',
                    init: false,
                    restart: true,
                    intro: '为主公增加一个额外技能'
                },
            },
            config: {
                update: function (config, map) {
                    if (config.identity_mode == 'zhong') {
                        map.player_number.hide();
                        map.enhance_zhu.hide();
                        map.double_nei.hide();
                        map.auto_identity.hide();
                        map.choice_zhu.hide();
                        map.limit_zhu.hide();
                        map.choice_zhong.hide();
                        map.choice_nei.hide();
                        map.choice_fan.hide();
                        map.ban_identity.hide();
                        map.ban_identity2.hide();
                        map.ban_identity3.hide();
                        map.zhong_card.show();
                        map.special_identity.hide();
                        map.choose_group.show();
                        map.change_choice.show();
                        map.auto_mark_identity.show();
                        map.double_character.show();
                        map.free_choose.show();
                        map.change_identity.show();
                        if (config.double_character) {
                            map.double_hp.show();
                        }
                        else {
                            map.double_hp.hide();
                        }
                        map.continue_game.show();
                    }
                    else if (config.identity_mode == 'purple') {
                        map.player_number.hide();
                        map.enhance_zhu.hide();
                        map.double_nei.hide();
                        map.auto_identity.hide();
                        map.choice_zhu.hide();
                        map.limit_zhu.hide();
                        map.choice_zhong.hide();
                        map.choice_nei.hide();
                        map.choice_fan.hide();
                        map.ban_identity.hide();
                        map.ban_identity2.hide();
                        map.ban_identity3.hide();
                        map.zhong_card.hide();
                        map.special_identity.hide();
                        map.double_character.hide();
                        map.double_hp.hide();
                        map.choose_group.hide();
                        map.auto_mark_identity.hide();
                        map.change_choice.hide();
                        map.free_choose.hide();
                        map.change_identity.hide();
                        map.continue_game.hide();
                    }
                    else {
                        map.continue_game.show();
                        map.player_number.show();
                        map.enhance_zhu.show();
                        map.auto_identity.show();
                        if (config.player_number != '2') {
                            map.double_nei.show();
                        }
                        else {
                            map.double_nei.hide();
                        }
                        map.choice_zhu.show();
                        map.limit_zhu.show();
                        map.choice_zhong.show();
                        map.choice_nei.show();
                        map.choice_fan.show();
                        map.ban_identity.show();
                        if (config.ban_identity == 'off') {
                            map.ban_identity2.hide();
                        }
                        else {
                            map.ban_identity2.show();
                        }
                        if (config.ban_identity == 'off' || config.ban_identity2 == 'off') {
                            map.ban_identity3.hide();
                        }
                        else {
                            map.ban_identity3.show();
                        }
                        map.zhong_card.hide();
                        map.choose_group.show();
                        map.auto_mark_identity.show();
                        map.change_choice.show();
                        map.free_choose.show();
                        map.change_identity.show();
                        if (config.player_number == '8') {
                            map.special_identity.show();
                        }
                        else {
                            map.special_identity.hide();
                        }
                        map.double_character.show();
                        if (config.double_character) {
                            map.double_hp.show();
                        }
                        else {
                            map.double_hp.hide();
                        }
                    }
                },
                identity_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '标准',
                        zhong: '明忠',
                        purple: '3v3v2',
                    },
                    restart: true,
                    frequent: true,
                    intro: '明忠模式详见帮助'
                },
                player_number: {
                    name: '游戏人数',
                    init: '8',
                    item: {
                        '2': '两人',
                        '3': '三人',
                        '4': '四人',
                        '5': '五人',
                        '6': '六人',
                        '7': '七人',
                        '8': '八人'
                    },
                    frequent: true,
                    restart: true,
                },
                double_nei: {
                    name: '双内奸',
                    init: false,
                    restart: true,
                    frequent: true,
                    intro: '开启后游戏中将有两个内奸（内奸胜利条件仍为主内1v1时击杀主公）'
                },
                choose_group: {
                    name: '神武将选择势力',
                    init: true,
                    restart: true,
                    frequent: true,
                    intro: '若开启此选项，选择神武将的玩家需在亮出自己的武将牌之前为自己选择一个势力。'
                },
                nei_fullscreenpop: {
                    name: '主内单挑特效',
                    intro: '在进入主内单挑时，弹出全屏文字特效',
                    init: true,
                    unfrequent: true,
                },
                double_character: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                special_identity: {
                    name: '特殊身份',
                    init: false,
                    restart: true,
                    frequent: true,
                    intro: '开启后游戏中将增加军师、大将、贼首三个身份'
                },
                zhong_card: {
                    name: '明忠卡牌替换',
                    init: true,
                    frequent: true,
                    restart: true
                },
                double_hp: {
                    name: '双将体力上限',
                    init: 'pingjun',
                    item: {
                        hejiansan: '和减三',
                        pingjun: '平均值',
                        zuidazhi: '最大值',
                        zuixiaozhi: '最小值',
                        zonghe: '相加',
                    },
                    restart: true,
                },
                auto_identity: {
                    name: '自动显示身份',
                    item: {
                        off: '关闭',
                        one: '一轮',
                        two: '两轮',
                        three: '三轮',
                        always: '始终'
                    },
                    init: 'off',
                    onclick: function (bool) {
                        game.saveConfig('auto_identity', bool, this._link.config.mode);
                        if (get.config('identity_mode') == 'zhong') return;
                        var num;
                        switch (bool) {
                            case '一轮': num = 1; break;
                            case '两轮': num = 2; break;
                            case '三轮': num = 3; break;
                            default: num = 0; break;
                        }
                        if (num & !_status.identityShown && game.phaseNumber > game.players.length * num && game.showIdentity) {
                            _status.identityShown = true;
                            game.showIdentity(false);
                        }
                    },
                    intro: '游戏进行若干轮将自动显示所有角色的身份',
                },
                auto_mark_identity: {
                    name: '自动标记身份',
                    init: true,
                    intro: '根据角色的出牌行为自动标记可能的身份',
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
                enhance_zhu: {
                    name: '加强主公',
                    init: false,
                    restart: true,
                    intro: '为主公增加一个额外技能'
                },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    }
                },
                change_identity: {
                    name: '自由选择身份和座位',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_identity', bool, this._link.config.mode);
                        if (get.mode() != 'identity' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        var dialog;
                        if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
                        else dialog = _status.event.dialog;
                        if (!_status.brawl || !_status.brawl.noAddSetting) {
                            if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                            else _status.event.getParent().removeSetting(dialog);
                        }
                        ui.update();
                    }
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (get.mode() != 'identity' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    }
                },
                change_card: {
                    name: '开启手气卡',
                    init: 'disabled',
                    item: {
                        disabled: '禁用',
                        once: '一次',
                        twice: '两次',
                        unlimited: '无限',
                    },
                },
                continue_game: {
                    name: '显示再战',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('continue_game', bool, this._link.config.mode);
                        if (get.config('continue_game') && get.mode() == 'identity') {
                            if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                                ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                            }
                        }
                        else if (ui.continue_game) {
                            ui.continue_game.close();
                            delete ui.continue_game;
                        }
                    },
                    intro: '游戏结束后可选择用相同的武将再进行一局游戏'
                },
                dierestart: {
                    name: '死亡后显示重来',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('dierestart', bool, this._link.config.mode);
                        if (get.config('dierestart') && get.mode() == 'identity') {
                            if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                                ui.restart = ui.create.control('restart', game.reload);
                            }
                        }
                        else if (ui.restart) {
                            ui.restart.close();
                            delete ui.restart;
                        }
                    }
                },
                revive: {
                    name: '死亡后显示复活',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('revive', bool, this._link.config.mode);
                        if (get.config('revive') && get.mode() == 'identity') {
                            if (!ui.revive && game.me.isDead()) {
                                ui.revive = ui.create.control('revive', ui.click.dierevive);
                            }
                        }
                        else if (ui.revive) {
                            ui.revive.close();
                            delete ui.revive;
                        }
                    }
                },
                ban_identity: {
                    name: '屏蔽身份',
                    init: 'off',
                    item: {
                        off: '关闭',
                        zhu: '主公',
                        zhong: '忠臣',
                        nei: '内奸',
                        fan: '反贼',
                    },
                },
                ban_identity2: {
                    name: '屏蔽身份2',
                    init: 'off',
                    item: {
                        off: '关闭',
                        zhu: '主公',
                        zhong: '忠臣',
                        nei: '内奸',
                        fan: '反贼',
                    },
                },
                ban_identity3: {
                    name: '屏蔽身份3',
                    init: 'off',
                    item: {
                        off: '关闭',
                        zhu: '主公',
                        zhong: '忠臣',
                        nei: '内奸',
                        fan: '反贼',
                    },
                },
                ai_strategy: {
                    name: '内奸策略',
                    init: 'ai_strategy_1',
                    item: {
                        ai_strategy_1: '均衡',
                        ai_strategy_2: '偏反',
                        ai_strategy_3: '偏忠',
                        ai_strategy_4: '酱油',
                        ai_strategy_5: '天使',
                        ai_strategy_6: '仇主',
                    },
                    intro: '设置内奸对主忠反的态度'
                },
                difficulty: {
                    name: 'AI对人类态度',
                    init: 'normal',
                    item: {
                        easy: '友好',
                        normal: '一般',
                        hard: '仇视',
                    },
                },
                choice_zhu: {
                    name: '主公候选武将数',
                    init: '3',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
                limit_zhu: {
                    name: '常备主候选武将数',
                    init: 'group',
                    restart: true,
                    item: {
                        off: '不限制',
                        group: '按势力筛选',
                        '4': '四',
                        '6': '六',
                        '8': '八',
                    },
                },
                choice_zhong: {
                    name: '忠臣候选武将数',
                    init: '4',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
                choice_nei: {
                    name: '内奸候选武将数',
                    init: '5',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
                choice_fan: {
                    name: '反贼候选武将数',
                    init: '3',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
            }
        },
        guozhan: {
            name: '国战',
            connect: {
                connect_guozhan_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '势备',
                        yingbian: '应变',
                        old: '怀旧',
                    },
                    frequent: true,
                    restart: true,
                    intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。',
                },
                connect_player_number: {
                    name: '游戏人数',
                    init: '8',
                    item: {
                        '3': '三人',
                        '4': '四人',
                        '5': '五人',
                        '6': '六人',
                        '7': '七人',
                        '8': '八人'
                    },
                    frequent: true,
                    restart: true,
                },
                connect_initshow_draw: {
                    name: '首亮奖励',
                    item: {
                        'off': '关闭',
                        'draw': '摸牌',
                        'mark': '标记',
                    },
                    init: 'mark',
                    frequent: true,
                    intro: '第一个明置武将牌的角色可获得首亮奖励'
                },
                connect_aozhan: {
                    name: '鏖战模式',
                    init: true,
                    intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
                    frequent: true,
                    restart: true,
                },
                connect_viewnext: {
                    name: '观看下家副将',
                    init: false,
                    intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
                },
                connect_zhulian: {
                    name: '珠联璧合',
                    init: true,
                    // frequent:true,
                    intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
                },
                connect_junzhu: {
                    name: '替换君主',
                    init: true,
                    // frequent:true,
                    restart: true,
                    intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
                },
                connect_change_card: {
                    name: '启用手气卡',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                // connect_ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:false,
                // 	restart:true,
                // },
                // connect_ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
            },
            config: {
                update: function (config, map) {
                    if (config.onlyguozhan) {
                        map.junzhu.show();
                    }
                    else {
                        map.junzhu.hide();
                    }
                    ui.aozhan_bgm = map.aozhan_bgm;
                    map.aozhan_bgm._link.config.updatex.call(map.aozhan_bgm, []);
                },
                guozhan_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '势备',
                        yingbian: '应变',
                        old: '怀旧',
                        free: '自由',
                    },
                    frequent: true,
                    restart: true,
                    intro: '<li>势备：默认模式，使用线下《君临天下·势备篇》的牌堆进行游戏。<br><li>应变：使用OL的应变国战牌堆进行游戏。<br><li>怀旧：使用传统国战的牌堆进行游戏。<br><li>自由：使用玩家的自定义牌堆进行游戏。',
                },
                player_number: {
                    name: '游戏人数',
                    init: '8',
                    item: {
                        '3': '三人',
                        '4': '四人',
                        '5': '五人',
                        '6': '六人',
                        '7': '七人',
                        '8': '八人'
                    },
                    frequent: true,
                    restart: true,
                },
                initshow_draw: {
                    name: '首亮奖励',
                    item: {
                        'off': '关闭',
                        'draw': '摸牌',
                        'mark': '标记',
                    },
                    init: 'mark',
                    frequent: true,
                    intro: '第一个明置身份牌的角色可获得摸牌奖励'
                },
                aozhan: {
                    name: '鏖战模式',
                    init: true,
                    frequent: true,
                    restart: true,
                    intro: '若开启此选项，则将在游戏中引入“鏖战模式”的规则：<br>当游戏中仅剩四名或更少角色时（七人以下游戏时改为三名或更少），若此时全场没有超过一名势力相同的角色，则从一个新的回合开始，游戏进入鏖战模式直至游戏结束。<br>◇在鏖战模式下，【桃】只能当做【杀】或【闪】使用或打出，不能用来回复体力。<br>注：进入鏖战模式后，即使之后有两名或者更多势力相同的角色出现，仍然不会取消鏖战模式。',
                },
                viewnext: {
                    name: '观看下家副将',
                    init: false,
                    intro: '若开启此选项，所有的玩家将在挑选武将后，分发起始手牌之前，分别观看自己下家的副将。',
                },
                aozhan_bgm: {
                    updatex: function () {
                        this.lastChild.innerHTML = this._link.config.item[lib.config.mode_config.guozhan.aozhan_bgm];
                        if (!Array.isArray(_status.aozhanBGMToRemove)) return;
                        const menu = this._link.menu;
                        for (let i = 0; i < menu.childElementCount; i++) {
                            const link = menu.childNodes[i]._link;
                            if (['disabled', 'random'].includes(link) || !_status.aozhanBGMToRemove.includes(link)) continue;
                            _status.aozhanBGMToRemove.remove(link);
                            menu.childNodes[i].delete();
                        }
                    },
                    name: '鏖战背景音乐',
                    item: {
                        disabled: '不启用',
                        online: 'Online',
                        rewrite: 'Rewrite',
                        chaoming: '潮鸣',
                        random: '随机播放',
                    },
                    init: 'rewrite',
                    onclick: function (item) {
                        game.saveConfig('aozhan_bgm', item, this._link.config.mode);
                        if (_status._aozhan == true) game.playBackgroundMusic();
                    },
                },
                zhulian: {
                    name: '珠联璧合',
                    init: true,
                    // frequent:true,
                    intro: '主将和副将都明置后，若为特定组合，可获得【珠联璧合】标记'
                },
                changeViceType: {
                    name: '副将变更方式',
                    init: 'default',
                    item: {
                        default: '发现式',
                        online: '随机式',
                    },
                    frequent: true,
                    restart: true,
                },
                onlyguozhan: {
                    name: '使用国战武将',
                    init: true,
                    frequent: true,
                    restart: true,
                    intro: '开启武将技能将替换为国战版本并禁用非国战武将'
                },
                guozhanSkin: {
                    name: '使用国战皮肤',
                    init: true,
                    frequent: true,
                    restart: true,
                    intro: '开启此选项后，将会把有国战专属皮肤的武将替换为国战皮肤'
                },
                junzhu: {
                    name: '替换君主',
                    init: true,
                    // frequent:true,
                    restart: true,
                    intro: '若开启此选项，玩家的第一个回合开始时，若其主武将牌有对应的君主武将牌，则其可以将此武将牌替换为对应的君主武将牌，然后重新调整体力上限。若玩家的体力上限因此增大，则玩家回复等量的体力。'
                },
                double_hp: {
                    name: '双将体力上限',
                    init: 'pingjun',
                    item: {
                        hejiansan: '和减三',
                        pingjun: '平均值',
                        zuidazhi: '最大值',
                        zuixiaozhi: '最小值',
                        zonghe: '相加',
                    },
                    restart: true,
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    }
                },
                onlyguozhanexpand: {
                    name: '默认展开自由选将',
                    init: false,
                    restart: true,
                    intro: '开启后自由选将对话框将默认显示全部武将'
                },
                change_identity: {
                    name: '自由选择座位',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_identity', bool, this._link.config.mode);
                        if (get.mode() != 'guozhan' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        var dialog;
                        if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
                        else dialog = _status.event.dialog;
                        if (!_status.brawl || !_status.brawl.noAddSetting) {
                            if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                            else _status.event.getParent().removeSetting(dialog);
                        }
                        ui.update();
                    }
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (get.mode() != 'guozhan' || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    }
                },
                change_card: {
                    name: '开启手气卡',
                    init: 'disabled',
                    item: {
                        disabled: '禁用',
                        once: '一次',
                        twice: '两次',
                        unlimited: '无限',
                    }
                },
                continue_game: {
                    name: '显示再战',
                    init: true,
                    intro: '游戏结束后可选择用相同的武将再进行一局游戏',
                    onclick: function (bool) {
                        game.saveConfig('continue_game', bool, this._link.config.mode);
                        if (get.config('continue_game') && get.mode() == 'guozhan') {
                            if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                                ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                            }
                        }
                        else if (ui.continue_game) {
                            ui.continue_game.close();
                            delete ui.continue_game;
                        }
                    }
                },
                dierestart: {
                    name: '死亡后显示重来',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('dierestart', bool, this._link.config.mode);
                        if (get.config('dierestart') && get.mode() == 'guozhan') {
                            if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                                ui.restart = ui.create.control('restart', game.reload);
                            }
                        }
                        else if (ui.restart) {
                            ui.restart.close();
                            delete ui.restart;
                        }
                    }
                },
                revive: {
                    name: '死亡后显示复活',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('revive', bool, this._link.config.mode);
                        if (get.config('revive') && get.mode() == 'guozhan') {
                            if (!ui.revive && game.me.isDead()) {
                                ui.revive = ui.create.control('revive', ui.click.dierevive);
                            }
                        }
                        else if (ui.revive) {
                            ui.revive.close();
                            delete ui.revive;
                        }
                    }
                },
                difficulty: {
                    name: 'AI对人类态度',
                    init: 'normal',
                    item: {
                        easy: '友好',
                        normal: '一般',
                        hard: '仇视',
                    }
                },
                choice_num: {
                    name: '候选武将数',
                    init: '7',
                    restart: true,
                    item: {
                        '5': '五',
                        '6': '六',
                        '7': '七',
                        '8': '八',
                        '9': '九',
                        '10': '十',
                    }
                },
            }
        },
        versus: {
            name: '对决',
            connect: {
                update: function (config, map) {
                    if (config.connect_versus_mode == '1v1') {
                        map.connect_choice_num.show();
                        map.connect_replace_number.show();
                    }
                    else {
                        map.connect_choice_num.hide();
                        map.connect_replace_number.hide();
                    }
                    if (config.connect_versus_mode == '2v2' || config.connect_versus_mode == '3v3') {
                        map.connect_replace_handcard.show();
                    }
                    else {
                        map.connect_replace_handcard.hide();
                    }
                },
                connect_versus_mode: {
                    name: '游戏模式',
                    init: '1v1',
                    item: {
                        '1v1': '1v1',
                        '2v2': '2v2',
                        '3v3': '3v3',
                        '4v4': '4v4',
                        'guandu': '官渡',
                    },
                    frequent: true
                },
                connect_replace_handcard: {
                    name: '四号位保护',
                    init: true,
                    frequent: true,
                    intro: '最后行动的角色起始手牌数+1'
                },
                connect_choice_num: {
                    name: '侯选武将数',
                    init: '20',
                    frequent: true,
                    item: {
                        '12': '12人',
                        '16': '16人',
                        '20': '20人',
                        '24': '24人',
                        '40': '40人',
                    }
                },
                connect_replace_number: {
                    name: '替补人数',
                    init: '2',
                    frequent: true,
                    item: {
                        '0': '无',
                        '1': '1人',
                        '2': '2人',
                        '3': '3人',
                        '4': '4人',
                        '5': '5人',
                    }
                },
                // connect_ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // connect_ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
            },
            config: {
                update: function (config, map) {
                    if (config.versus_mode == 'four') {
                        map.change_choice.hide();
                        map.ladder.show();
                        if (config.ladder) {
                            map.ladder_monthly.show();
                            map.ladder_reset.show();
                        }
                        else {
                            map.ladder_monthly.hide();
                            map.ladder_reset.hide();
                        }
                        map.enable_all.show();
                        map.enable_all_cards_four.show();
                        map.four_assign.show();
                        map.four_phaseswap.show();
                        map.expand_dialog.show();
                        map.fouralign.show();
                        map.edit_character_four.show();
                        map.reset_character_four.show();
                    }
                    else {
                        map.change_choice.show();
                        map.ladder.hide();
                        map.ladder_monthly.hide();
                        map.ladder_reset.hide();
                        map.enable_all.hide();
                        map.enable_all_cards_four.hide();
                        map.four_assign.hide();
                        map.four_phaseswap.hide();
                        map.expand_dialog.hide();
                        map.fouralign.hide();
                        map.edit_character_four.hide();
                        map.reset_character_four.hide();
                    }
                    if (config.versus_mode == 'three') {
                        map.edit_character_three.show();
                        map.reset_character_three.show();
                    }
                    else {
                        map.edit_character_three.hide();
                        map.reset_character_three.hide();
                    }
                    if (config.versus_mode == 'three' || config.versus_mode == 'one') {
                        map.enable_all_three.show();
                        map.enable_all_cards.show();
                    }
                    else {
                        map.enable_all_three.hide();
                        map.enable_all_cards.hide();
                    }
                    if (config.versus_mode == 'jiange' || config.versus_mode == 'two' || config.versus_mode == 'endless' ||
                        config.versus_mode == 'three' || config.versus_mode == 'one' || config.versus_mode == 'siguo') {
                        map.free_choose.show();
                    }
                    else {
                        map.free_choose.hide();
                    }
                    if (config.versus_mode == 'jiange') {
                        map.double_character_jiange.show();
                    }
                    else {
                        map.double_character_jiange.hide();
                    }
                    if (config.versus_mode == 'two') {
                        map.replace_handcard_two.show();
                        map.replace_character_two.show();
                        map.two_assign.show();
                        map.two_phaseswap.show();
                    }
                    else {
                        map.replace_handcard_two.hide();
                        map.replace_character_two.hide();
                        map.two_assign.hide();
                        map.two_phaseswap.hide();
                    }
                    if (config.versus_mode == 'two' || config.versus_mode == 'siguo' || config.versus_mode == 'four') {
                        if (config.versus_mode == 'four' && (config.four_assign || config.four_phaseswap)) {
                            map.change_identity.hide();
                        }
                        else {
                            map.change_identity.show();
                        }
                    }
                    else {
                        map.change_identity.hide();
                    }
                    if (config.versus_mode == 'siguo') {
                        map.siguo_character.show();
                    }
                    else {
                        map.siguo_character.hide();
                    }
                },
                versus_mode: {
                    name: '游戏模式',
                    init: 'four',
                    item: {
                        four: '对抗',
                        three: '统率',
                        two: '欢乐',
                        guandu: '官渡',
                        jiange: '剑阁',
                        siguo: '四国',
                        standard: '自由'
                        // endless:'无尽',
                        // triple:'血战',
                        // one:'<span style="display:inline-block;width:100%;text-align:center">1v1</span>',
                    },
                    restart: true,
                    frequent: true,
                },
                ladder: {
                    name: '天梯模式',
                    init: true,
                    frequent: true,
                    restart: true
                },
                ladder_monthly: {
                    name: '每月重置天梯',
                    init: true,
                    frequent: true,
                },
                enable_all: {
                    name: '启用全部武将',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                enable_all_cards_four: {
                    name: '启用全部卡牌',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                enable_all_three: {
                    name: '启用全部武将',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                enable_all_cards: {
                    name: '启用全部卡牌',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                four_assign: {
                    name: '代替队友选将',
                    init: false,
                    restart: true,
                },
                four_phaseswap: {
                    name: '代替队友行动',
                    init: false,
                    restart: true,
                },
                two_assign: {
                    name: '代替队友选将',
                    init: false,
                    restart: true,
                },
                two_phaseswap: {
                    name: '代替队友行动',
                    init: false,
                    restart: true,
                },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    frequent: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (!ui.create.cheat2) return;
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    }
                },
                fouralign: {
                    name: '自由选择阵型',
                    init: false
                },
                change_identity: {
                    name: '自由选择座位',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_identity', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (_status.mode == 'four') {
                            if (get.config('four_assign') || get.config('four_phaseswap')) return;
                            if (bool) {
                                if (_status.event.parent.addSetting) {
                                    _status.event.parent.addSetting();
                                }
                            }
                            else {
                                var seats = _status.event.parent.seatsbutton;
                                if (seats) {
                                    while (seats.length) {
                                        seats.shift().remove();
                                    }
                                    delete _status.event.parent.seatsbutton;
                                }
                            }
                        }
                        else {
                            var dialog;
                            if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
                            else dialog = _status.event.dialog;
                            if (!_status.brawl || !_status.brawl.noAddSetting) {
                                if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                                else _status.event.getParent().removeSetting(dialog);
                            }
                            ui.update();
                        }
                    }
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    },
                    frequent: true,
                },
                double_character_jiange: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                },
                replace_handcard_two: {
                    name: '四号位保护',
                    init: true,
                    frequent: true,
                    intro: '最后行动的角色起始手牌+1'
                },
                replace_character_two: {
                    name: '替补模式',
                    init: false,
                    frequent: true,
                    intro: '每个额外选择一名武将，死亡后用该武将代替重新上场，替补武将用完时失败'
                },
                expand_dialog: {
                    name: '默认展开选将框',
                    intro: '选将框打开时直接显示全部武将（可能使游戏在开始时卡顿）',
                    init: false,
                },
                siguo_character: {
                    name: '专属武将出场率',
                    init: 'increase',
                    item: {
                        increase: '大概率',
                        normal: '默认概率',
                        off: '不出现',
                    },
                    frequent: true
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true
                // },
                ladder_reset: {
                    name: '重置天梯数据',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            game.save('ladder', {
                                current: 900,
                                top: 900,
                                month: (new Date()).getMonth()
                            });
                            ui.ladder.innerHTML = '卫士五';
                            clearTimeout(node._clearing);
                            node.firstChild.innerHTML = '重置天梯数据';
                            delete node._clearing;
                            return;
                        }
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        node._clearing = setTimeout(function () {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            node._clearing = setTimeout(function () {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                node._clearing = setTimeout(function () {
                                    node.firstChild.innerHTML = '重置天梯数据';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true,
                },
                edit_character_three: {
                    name: '编辑统率将池',
                    clear: true,
                    onclick: function () {
                        if (get.mode() != 'versus') {
                            alert('请进入对决模式，然后再编辑将池');
                            return;
                        }
                        var container = ui.create.div('.popup-container.editor');
                        var node = container;
                        var map = get.config('character_three') || lib.choiceThree;
                        var str = 'character=[\n    ';
                        for (var i = 0; i < map.length; i++) {
                            str += '"' + map[i] + '",';
                            if (i + 1 < map.length && (i + 1) % 5 == 0) str += '\n    ';
                        }
                        str += '\n];';
                        node.code = str;
                        ui.window.classList.add('shortcutpaused');
                        ui.window.classList.add('systempaused');
                        var saveInput = function () {
                            var code;
                            if (container.editor) {
                                code = container.editor.getValue();
                            }
                            else if (container.textarea) {
                                code = container.textarea.value;
                            }
                            try {
                                var character = null;
                                eval(code);
                                if (!Array.isArray(character)) {
                                    throw ('err');
                                }
                            }
                            catch (e) {
                                var tip = lib.getErrorTip(e) || '';
                                alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
                                window.focus();
                                if (container.editor) {
                                    container.editor.focus();
                                }
                                else if (container.textarea) {
                                    container.textarea.focus();
                                }
                                return;
                            }
                            game.saveConfig('character_three', character, 'versus');
                            ui.window.classList.remove('shortcutpaused');
                            ui.window.classList.remove('systempaused');
                            container.delete();
                            container.code = code;
                            delete window.saveNonameInput;
                        };
                        window.saveNonameInput = saveInput;
                        var editor = ui.create.editor(container, saveInput);
                        if (node.aced) {
                            ui.window.appendChild(node);
                            node.editor.setValue(node.code, 1);
                        }
                        else if (lib.device == 'ios') {
                            ui.window.appendChild(node);
                            if (!node.textarea) {
                                var textarea = document.createElement('textarea');
                                editor.appendChild(textarea);
                                node.textarea = textarea;
                                lib.setScroll(textarea);
                            }
                            node.textarea.value = node.code;
                        }
                        else {
                            if (!window.CodeMirror) {
                                lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
                                lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
                            }
                            else {
                                lib.codeMirrorReady(node, editor);
                            }
                        };
                    },
                },
                reset_character_three: {
                    name: '重置统率将池',
                    intro: '将统率三军模式下的将池重置为默认将池',
                    clear: true,
                    onclick: function () {
                        if (confirm('该操作不可撤销！是否清除统率三军模式的自定义将池，并将其重置为默认将池？')) {
                            game.saveConfig('character_three', null, 'versus');
                            alert('将池已重置');
                        }
                    },
                },
                edit_character_four: {
                    name: '编辑4v4将池',
                    clear: true,
                    onclick: function () {
                        if (get.mode() != 'versus') {
                            alert('请进入对决模式，然后再编辑将池');
                            return;
                        }
                        var container = ui.create.div('.popup-container.editor');
                        var node = container;
                        var map = get.config('character_four') || lib.choiceFour;
                        var str = 'character=[\n    ';
                        for (var i = 0; i < map.length; i++) {
                            str += '"' + map[i] + '",';
                            if (i + 1 < map.length && (i + 1) % 5 == 0) str += '\n    ';
                        }
                        str += '\n];';
                        node.code = str;
                        ui.window.classList.add('shortcutpaused');
                        ui.window.classList.add('systempaused');
                        var saveInput = function () {
                            var code;
                            if (container.editor) {
                                code = container.editor.getValue();
                            }
                            else if (container.textarea) {
                                code = container.textarea.value;
                            }
                            try {
                                var character = null;
                                eval(code);
                                if (!Array.isArray(character)) {
                                    throw ('err');
                                }
                            }
                            catch (e) {
                                var tip = lib.getErrorTip(e) || '';
                                alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
                                window.focus();
                                if (container.editor) {
                                    container.editor.focus();
                                }
                                else if (container.textarea) {
                                    container.textarea.focus();
                                }
                                return;
                            }
                            game.saveConfig('character_four', character, 'versus');
                            ui.window.classList.remove('shortcutpaused');
                            ui.window.classList.remove('systempaused');
                            container.delete();
                            container.code = code;
                            delete window.saveNonameInput;
                        };
                        window.saveNonameInput = saveInput;
                        var editor = ui.create.editor(container, saveInput);
                        if (node.aced) {
                            ui.window.appendChild(node);
                            node.editor.setValue(node.code, 1);
                        }
                        else if (lib.device == 'ios') {
                            ui.window.appendChild(node);
                            if (!node.textarea) {
                                var textarea = document.createElement('textarea');
                                editor.appendChild(textarea);
                                node.textarea = textarea;
                                lib.setScroll(textarea);
                            }
                            node.textarea.value = node.code;
                        }
                        else {
                            if (!window.CodeMirror) {
                                lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
                                lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
                            }
                            else {
                                lib.codeMirrorReady(node, editor);
                            }
                        };
                    },
                },
                reset_character_four: {
                    name: '重置4v4将池',
                    intro: '将4v4模式下的将池重置为默认将池',
                    clear: true,
                    onclick: function () {
                        if (confirm('该操作不可撤销！是否清除4v4模式的自定义将池，并将其重置为默认将池？')) {
                            game.saveConfig('character_four', null, 'versus');
                            alert('将池已重置');
                        }
                    },
                },
            }
        },
        connect: {
            name: '联机',
            config: {
                connect_nickname: {
                    name: '联机昵称',
                    input: true,
                    frequent: true,
                },
                connect_avatar: {
                    name: '联机头像',
                    init: 'caocao',
                    item: {},
                    frequent: true,
                    onclick: function (item) {
                        game.saveConfig('connect_avatar', item);
                        game.saveConfig('connect_avatar', item, 'connect');
                    }
                },
                hall_ip: {
                    name: '联机大厅',
                    input: true,
                    frequent: true,
                },
                hall_button: {
                    name: '联机大厅按钮',
                    init: true,
                    frequent: true,
                    onclick: function (bool) {
                        game.saveConfig('hall_button', bool, 'connect');
                        if (ui.hall_button) {
                            if (bool) {
                                ui.hall_button.style.display = '';
                            }
                            else {
                                ui.hall_button.style.display = 'none';
                            }
                        }
                    }
                },
                wss_mode: {
                    name: '使用WSS协议',
                    init: false,
                    frequent: true,
                    intro: '在用户填写的IP地址没有直接指定使用WS/WSS协议的情况下，默认使用WSS协议，而非WS协议来连接到联机服务器。<br>请不要轻易勾选此项！',
                },
            }
        },
        boss: {
            name: '挑战',
            config: {
                free_choose: {
                    name: '自由选将',
                    init: true,
                    frequent: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    }
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    },
                    frequent: true,
                },
                single_control: {
                    name: '单人控制',
                    init: true,
                    frequent: true,
                    onclick: function (bool) {
                        game.saveConfig('single_control', bool, this._link.config.mode);
                        if (ui.single_swap && game.me != game.boss) {
                            if (bool) {
                                ui.single_swap.style.display = 'none';
                            }
                            else {
                                ui.single_swap.style.display = '';
                            }
                        }
                    },
                    intro: '只控制一名角色，其他角色由AI控制'
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
            }
        },
        doudizhu: {
            name: '斗地主',
            connect: {
                update: function (config, map) {
                    if (config.connect_doudizhu_mode == 'online') {
                        map.connect_change_card.hide();
                    }
                    else {
                        map.connect_change_card.show();
                    }
                    if (config.connect_doudizhu_mode != 'normal') {
                        map.connect_double_character.hide();
                    }
                    else {
                        map.connect_double_character.show();
                    }
                },
                connect_doudizhu_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '休闲',
                        kaihei: '开黑',
                        huanle: '欢乐',
                        binglin: '兵临',
                        online: '智斗',
                    },
                    restart: true,
                    frequent: true,
                },
                connect_double_character: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                connect_change_card: {
                    name: '启用手气卡',
                    init: false,
                    frequent: true,
                    restart: true,
                },
            },
            config: {
                update: function (config, map) {
                    if (config.doudizhu_mode == 'online') {
                        map.change_card.hide();
                        map.edit_character.show();
                        map.reset_character.show();
                    }
                    else {
                        map.change_card.show();
                        map.edit_character.hide();
                        map.reset_character.hide();
                    }
                    if (config.doudizhu_mode != 'normal') {
                        map.double_character.hide();
                        map.free_choose.hide();
                        map.change_identity.hide();
                        map.change_choice.hide();
                        map.continue_game.hide();
                        map.dierestart.hide();
                        map.choice_zhu.hide();
                        map.choice_fan.hide();
                        map.revive.hide();
                    }
                    else {
                        map.double_character.show();
                        map.free_choose.show();
                        map.change_identity.show();
                        map.change_choice.show();
                        map.continue_game.show();
                        map.dierestart.show();
                        map.choice_zhu.show();
                        map.choice_fan.show();
                        map.revive.show();
                    }
                    if (config.double_character && config.doudizhu_mode == 'normal') {
                        map.double_hp.show();
                    }
                    else {
                        map.double_hp.hide();
                    }
                },
                doudizhu_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '休闲',
                        kaihei: '开黑',
                        huanle: '欢乐',
                        binglin: '兵临',
                        online: '智斗',
                    },
                    restart: true,
                    frequent: true,
                },
                double_character: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                    restart: true,
                },
                double_hp: {
                    name: '双将体力上限',
                    init: 'pingjun',
                    item: {
                        hejiansan: '和减三',
                        pingjun: '平均值',
                        zuidazhi: '最大值',
                        zuixiaozhi: '最小值',
                        zonghe: '相加',
                    },
                    restart: true,
                },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    }
                },
                change_identity: {
                    name: '自由选择身份和座位',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_identity', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        var dialog;
                        if (ui.cheat2 && ui.cheat2.backup) dialog = ui.cheat2.backup;
                        else dialog = _status.event.dialog;
                        if (!_status.brawl || !_status.brawl.noAddSetting) {
                            if (!dialog.querySelector('table') && get.config('change_identity')) _status.event.getParent().addSetting(dialog);
                            else _status.event.getParent().removeSetting(dialog);
                        }
                        ui.update();
                    }
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    }
                },
                change_card: {
                    name: '开启手气卡',
                    init: 'disabled',
                    item: {
                        disabled: '禁用',
                        once: '一次',
                        twice: '两次',
                        unlimited: '无限',
                    },
                },
                continue_game: {
                    name: '显示再战',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('continue_game', bool, this._link.config.mode);
                        if (get.config('continue_game')) {
                            if (!ui.continue_game && _status.over && !_status.brawl && !game.no_continue_game) {
                                ui.continue_game = ui.create.control('再战', game.reloadCurrent);
                            }
                        }
                        else if (ui.continue_game) {
                            ui.continue_game.close();
                            delete ui.continue_game;
                        }
                    },
                    intro: '游戏结束后可选择用相同的武将再进行一局游戏'
                },
                dierestart: {
                    name: '死亡后显示重来',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('dierestart', bool, this._link.config.mode);
                        if (get.config('dierestart')) {
                            if (!ui.restart && game.me.isDead() && !_status.connectMode) {
                                ui.restart = ui.create.control('restart', game.reload);
                            }
                        }
                        else if (ui.restart) {
                            ui.restart.close();
                            delete ui.restart;
                        }
                    }
                },
                revive: {
                    name: '死亡后显示复活',
                    init: false,
                    onclick: function (bool) {
                        game.saveConfig('revive', bool, this._link.config.mode);
                        if (get.config('revive')) {
                            if (!ui.revive && game.me.isDead()) {
                                ui.revive = ui.create.control('revive', ui.click.dierevive);
                            }
                        }
                        else if (ui.revive) {
                            ui.revive.close();
                            delete ui.revive;
                        }
                    }
                },
                choice_zhu: {
                    name: '地主候选武将数',
                    init: '3',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
                choice_fan: {
                    name: '农民候选武将数',
                    init: '3',
                    restart: true,
                    item: {
                        '3': '三',
                        '4': '四',
                        '5': '五',
                        '6': '六',
                        '8': '八',
                        '10': '十',
                    },
                },
                edit_character: {
                    name: '编辑将池',
                    clear: true,
                    onclick: function () {
                        if (get.mode() != 'doudizhu') {
                            alert('请进入斗地主模式，然后再编辑将池');
                            return;
                        }
                        var container = ui.create.div('.popup-container.editor');
                        var node = container;
                        var map = get.config('character_online') || lib.characterOnline;
                        node.code = 'character=' + get.stringify(map) + '\n/*\n    这里是智斗三国模式的武将将池。\n    您可以在这里编辑对武将将池进行编辑，然后点击“保存”按钮即可保存。\n    将池中的Key势力武将，仅同时在没有被禁用的情况下，才会出现在选将框中。\n    而非Key势力的武将，只要所在的武将包没有被隐藏，即可出现在选将框中。\n    该将池为单机模式/联机模式通用将池。在这里编辑后，即使进入联机模式，也依然会生效。\n    但联机模式本身禁用的武将（如神貂蝉）不会出现在联机模式的选将框中。\n*/';
                        ui.window.classList.add('shortcutpaused');
                        ui.window.classList.add('systempaused');
                        var saveInput = function () {
                            var code;
                            if (container.editor) {
                                code = container.editor.getValue();
                            }
                            else if (container.textarea) {
                                code = container.textarea.value;
                            }
                            try {
                                var character = null;
                                eval(code);
                                if (!get.is.object(character)) {
                                    throw ('err');
                                }
                                var groups = [];
                                for (var i in character) {
                                    if (!Array.isArray(character[i])) throw ('type');
                                    if (character[i].length >= 3) groups.push(i);
                                }
                                if (groups.length < 3) throw ('enough');
                            }
                            catch (e) {
                                if (e == 'type') {
                                    alert('请严格按照格式填写，不要写入不为数组的数据');
                                }
                                else if (e == 'enough') {
                                    alert('请保证至少写入了3个势力，且每个势力至少有3个武将');
                                }
                                else if (e == 'err') {
                                    alert('代码格式有错误，请对比示例代码仔细检查');
                                }
                                else {
                                    var tip = lib.getErrorTip(e) || '';
                                    alert('代码语法有错误，请仔细检查（' + e + '）' + tip);
                                }
                                window.focus();
                                if (container.editor) {
                                    container.editor.focus();
                                }
                                else if (container.textarea) {
                                    container.textarea.focus();
                                }
                                return;
                            }
                            game.saveConfig('character_online', character, 'doudizhu');
                            ui.window.classList.remove('shortcutpaused');
                            ui.window.classList.remove('systempaused');
                            container.delete();
                            container.code = code;
                            delete window.saveNonameInput;
                        };
                        window.saveNonameInput = saveInput;
                        var editor = ui.create.editor(container, saveInput);
                        if (node.aced) {
                            ui.window.appendChild(node);
                            node.editor.setValue(node.code, 1);
                        }
                        else if (lib.device == 'ios') {
                            ui.window.appendChild(node);
                            if (!node.textarea) {
                                var textarea = document.createElement('textarea');
                                editor.appendChild(textarea);
                                node.textarea = textarea;
                                lib.setScroll(textarea);
                            }
                            node.textarea.value = node.code;
                        }
                        else {
                            if (!window.CodeMirror) {
                                lib.init.js(lib.assetURL + 'game', 'codemirror', () => lib.codeMirrorReady(node, editor));
                                lib.init.css(lib.assetURL + 'layout/default', 'codemirror');
                            }
                            else {
                                lib.codeMirrorReady(node, editor);
                            }
                        };
                    },
                },
                reset_character: {
                    name: '重置将池',
                    intro: '将智斗三国模式下的将池重置为默认将池',
                    clear: true,
                    onclick: function () {
                        if (confirm('该操作不可撤销！是否清除智斗三国模式的自定义将池，并将其重置为默认将池？')) {
                            game.saveConfig('character_online', null, 'doudizhu');
                            alert('将池已重置');
                        }
                    },
                },
            }
        },
        single: {
            name: '单挑',
            connect: {
                connect_single_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '新1v1',
                        dianjiang: '点将单挑',
                        changban: '血战长坂坡',
                    },
                    restart: true,
                    frequent: true,
                },
                connect_enable_jin: {
                    name: '启用晋势力武将',
                    init: false,
                    restart: true,
                    frequent: true,
                },
                update: function (config, map) {
                    if (config.connect_single_mode != 'normal') {
                        map.connect_enable_jin.hide();
                    }
                    else {
                        map.connect_enable_jin.show();
                    }
                },
            },
            config: {
                single_mode: {
                    name: '游戏模式',
                    init: 'normal',
                    item: {
                        normal: '新1v1',
                        dianjiang: '点将单挑',
                        changban: '血战长坂坡',
                    },
                    restart: true,
                    frequent: true,
                },
                enable_jin: {
                    name: '启用晋势力武将',
                    init: false,
                    restart: true,
                    frequent: true,
                },
                update: function (config, map) {
                    if (config.single_mode != 'normal') {
                        map.enable_jin.hide();
                    }
                    else {
                        map.enable_jin.show();
                    }
                },
            }
        },
        chess: {
            name: '战棋',
            config: {
                chess_mode: {
                    name: '游戏模式',
                    init: 'combat',
                    item: {
                        combat: '自由',
                        three: '统率',
                        leader: '君主',
                    },
                    restart: true,
                    frequent: true,
                },
                update: function (config, map) {
                    if (config.chess_mode == 'leader') {
                        map.chess_leader_save.show();
                        map.chess_leader_clear.show();
                        map.chess_leader_allcharacter.show();
                        map.chess_character.hide();
                    }
                    else {
                        map.chess_leader_save.hide();
                        map.chess_leader_clear.hide();
                        map.chess_leader_allcharacter.hide();
                        map.chess_character.show();
                    }
                    if (config.chess_mode == 'combat') {
                        // map.battle_number.show();
                        // map.chess_ordered.show();
                        map.free_choose.show();
                        map.change_choice.show();
                    }
                    else {
                        // map.battle_number.hide();
                        // map.chess_ordered.hide();
                        map.free_choose.hide();
                        map.change_choice.hide();
                    }
                    // if(config.chess_mode!='leader'){
                    // 	map.ban_weak.show();
                    // 	map.ban_strong.show();
                    // }
                    // else{
                    // 	map.ban_weak.hide();
                    // 	map.ban_strong.hide();
                    // }
                },
                chess_leader_save: {
                    name: '选择历程',
                    init: 'save1',
                    item: {
                        save1: '一',
                        save2: '二',
                        save3: '三',
                        save4: '四',
                        save5: '五',
                    },
                    restart: true,
                    frequent: true,
                },
                chess_leader_allcharacter: {
                    name: '启用全部角色',
                    init: true,
                    onclick: function (bool) {
                        if (confirm('调整该设置将清除所有进度，是否继续？')) {
                            for (var i = 1; i < 6; i++) game.save('save' + i, null, 'chess');
                            game.saveConfig('chess_leader_allcharacter', bool, 'chess')
                            if (get.mode() == 'chess') game.reload();
                            return;
                        }
                        else this.classList.toggle('on');
                    },
                },
                chess_leader_clear: {
                    name: '清除进度',
                    onclick: function () {
                        var node = this;
                        if (node._clearing) {
                            for (var i = 1; i < 6; i++) game.save('save' + i, null, 'chess');
                            game.reload();
                            return;
                        }
                        node._clearing = true;
                        node.firstChild.innerHTML = '单击以确认 (3)';
                        setTimeout(function () {
                            node.firstChild.innerHTML = '单击以确认 (2)';
                            setTimeout(function () {
                                node.firstChild.innerHTML = '单击以确认 (1)';
                                setTimeout(function () {
                                    node.firstChild.innerHTML = '清除进度';
                                    delete node._clearing;
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    },
                    clear: true,
                    frequent: true,
                },
                // chess_treasure:{
                // 	name:'战场机关',
                // 	init:'0',
                // 	frequent:true,
                // 	item:{
                // 		'0':'关闭',
                // 		'0.1':'较少出现',
                // 		'0.2':'偶尔出现',
                // 		'0.333':'时常出现',
                // 		'0.5':'频繁出现',
                // 	}
                // },
                chess_obstacle: {
                    name: '随机路障',
                    init: '0.2',
                    item: {
                        '0': '关闭',
                        '0.2': '少量',
                        '0.333': '中量',
                        '0.5': '大量',
                    },
                    frequent: true,
                },
                show_range: {
                    name: '显示卡牌范围',
                    init: true,
                },
                show_distance: {
                    name: '显示距离',
                    init: true,
                },
                chess_character: {
                    name: '战棋武将',
                    init: true,
                    frequent: true,
                },
                chess_card: {
                    name: '战棋卡牌',
                    init: true,
                    frequent: true,
                },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    },
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    },
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
                chessscroll_speed: {
                    name: '边缘滚动速度',
                    init: '20',
                    intro: '鼠标移至屏幕边缘时自动滚屏',
                    item: {
                        '0': '不滚动',
                        '10': '10格/秒',
                        '20': '20格/秒',
                        '30': '30格/秒',
                    }
                },
            }
        },
        tafang: {
            name: '塔防',
            config: {
                tafang_turn: {
                    name: '游戏胜利',
                    init: '10',
                    frequent: true,
                    item: {
                        '10': '十回合',
                        '20': '二十回合',
                        '30': '三十回合',
                        '1000': '无限',
                    }
                },
                // tafang_size:{
                // 	name:'战场大小',
                // 	init:'9',
                // 	frequent:true,
                // 	item:{
                // 		'6':'小',
                // 		'9':'中',
                // 		'12':'大',
                // 	}
                // },
                tafang_difficulty: {
                    name: '战斗难度',
                    init: '2',
                    frequent: true,
                    item: {
                        '1': '简单',
                        '2': '普通',
                        '3': '困难',
                    }
                },
                show_range: {
                    name: '显示卡牌范围',
                    init: true,
                },
                show_distance: {
                    name: '显示距离',
                    init: true,
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
                chessscroll_speed: {
                    name: '边缘滚动速度',
                    intro: '鼠标移至屏幕边缘时自动滚屏',
                    init: '20',
                    item: {
                        '0': '不滚动',
                        '10': '10格/秒',
                        '20': '20格/秒',
                        '30': '30格/秒',
                    }
                },
            }
        },
        brawl: {
            name: '乱斗',
            config: {
                huanhuazhizhan: {
                    name: '幻化之战',
                    init: true,
                    frequent: true
                },
                qunxionggeju: {
                    name: '群雄割据',
                    init: true,
                    frequent: true
                },
                duzhansanguo: {
                    name: '毒战三国',
                    init: true,
                    frequent: true
                },
                daozhiyueying: {
                    name: '导师月英',
                    init: true,
                    frequent: true
                },
                weiwoduzun: {
                    name: '唯我独尊',
                    init: true,
                    frequent: true
                },
                tongxingzhizheng: {
                    name: '同姓之争',
                    init: true,
                    frequent: true
                },
                jiazuzhizheng: {
                    name: '家族之争',
                    init: true,
                    frequent: true
                },
                tongqueduopao: {
                    name: '铜雀夺袍',
                    init: true,
                    frequent: true
                },
                tongjiangmoshi: {
                    name: '同将模式',
                    init: true,
                    frequent: true
                },
                baiyidujiang: {
                    name: '白衣渡江',
                    init: true,
                    frequent: true
                },
                qianlidanji: {
                    name: '千里单骑',
                    init: true,
                    frequent: true
                },
                liangjunduilei: {
                    name: '两军对垒',
                    init: true,
                    frequent: true
                },
                scene: {
                    name: '创建场景',
                    init: true,
                    frequent: true
                }
            }
        },
        stone: {
            name: '炉石',
            config: {
                // update:function(config,map){
                // 	if(config.stone_mode=='deck'){
                // 		// map.deck_length.show();
                // 		// map.deck_repeat.show();
                // 		map.random_length.hide();
                // 		map.skill_bar.show();
                // 	}
                // 	else{
                // 		// map.deck_length.hide();
                // 		// map.deck_repeat.hide();
                // 		map.random_length.show();
                // 		map.skill_bar.hide();
                // 	}
                // },
                // stone_mode:{
                // 	name:'游戏模式',
                // 	init:'deck',
                // 	item:{
                // 		deck:'构筑',
                // 		random:'随机'
                // 	},
                // 	restart:true,
                // 	frequent:true,
                // },
                // deck_length:{
                // 	name:'卡组长度',
                // 	init:'30',
                // 	item:{
                // 		'30':'30张',
                // 		'50':'50张',
                // 		'80':'80张',
                // 	},
                // 	frequent:true,
                // },
                // deck_repeat:{
                // 	name:'重复卡牌',
                // 	init:'2',
                // 	item:{
                // 		'2':'2张',
                // 		'3':'3张',
                // 		'5':'5张',
                // 		'80':'无限',
                // 	},
                // 	frequent:true,
                // },
                // random_length:{
                // 	name:'随从牌数量',
                // 	init:'1/80',
                // 	item:{
                // 		'1/120':'少',
                // 		'1/80':'中',
                // 		'1/50':'多',
                // 	},
                // 	frequent:true,
                // },
                battle_number: {
                    name: '出场人数',
                    init: '1',
                    frequent: true,
                    item: {
                        '1': '一人',
                        '2': '两人',
                        '3': '三人',
                        '4': '四人',
                        '6': '六人',
                        '8': '八人',
                        '10': '十人',
                    },
                    onclick: function (num) {
                        game.saveConfig('battle_number', num, this._link.config.mode);
                        if (_status.connectMode) return;
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (_status.event.getParent().changeDialog) {
                            _status.event.getParent().changeDialog();
                        }
                    },
                },
                mana_mode: {
                    name: '行动值变化',
                    init: 'inc',
                    item: {
                        inf: '涨落',
                        inc: '递增'
                    },
                    frequent: true
                },
                skill_bar: {
                    name: '怒气值',
                    init: true,
                    frequent: true,
                    restart: true,
                },
                double_character: {
                    name: '双将模式',
                    init: false,
                    frequent: true,
                    restart: function () {
                        return _status.event.getParent().name != 'chooseCharacter' || _status.event.name != 'chooseButton';
                    }
                },
                free_choose: {
                    name: '自由选将',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('free_choose', bool, this._link.config.mode);
                        if (_status.connectMode) return;
                        if (get.mode() != this._link.config.mode || !_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat2 && get.config('free_choose')) ui.create.cheat2();
                        else if (ui.cheat2 && !get.config('free_choose')) {
                            ui.cheat2.close();
                            delete ui.cheat2;
                        }
                    },
                },
                change_choice: {
                    name: '开启换将卡',
                    init: true,
                    onclick: function (bool) {
                        game.saveConfig('change_choice', bool, this._link.config.mode);
                        if (_status.connectMode) return;
                        if (!_status.event.getParent().showConfig && !_status.event.showConfig) return;
                        if (!ui.cheat && get.config('change_choice')) ui.create.cheat();
                        else if (ui.cheat && !get.config('change_choice')) {
                            ui.cheat.close();
                            delete ui.cheat;
                        }
                    },
                },
                // ban_weak:{
                // 	name:'屏蔽弱将',
                // 	init:true,
                // 	restart:true,
                // },
                // ban_strong:{
                // 	name:'屏蔽强将',
                // 	init:false,
                // 	restart:true,
                // },
            }
        },
    };

    const namePrefixs = [
        ['界', {
            color: '#fdd559',
            nature: 'soilmm',
        }],
        ['谋', {
            color: '#def7ca',
            nature: 'woodmm',
        }],
        ['武', {
            color: '#fd8359',
            nature: 'soilmm',
        }],
        ['乐', {
            color: '#f7f4fc',
            nature: 'keymm',
        }],
        ['神', {
            color: '#faecd1',
            nature: 'orangemm',
        }],
        ['族', {
            color: '#ee9ac7',
            nature: 'firemm',
        }],
        ['晋', {
            color: '#f3c5ff',
            nature: 'blackmm',
        }],
        ['侠', {
            color: '#eeeeee',
            nature: 'qunmm',
        }],
        ['起', {
            color: '#c3f9ff',
            nature: 'thundermm',
        }],
        ['承', {
            color: '#c3f9ff',
            nature: 'thundermm',
        }],
        ['用间', {
            color: '#c3f9ff',
            nature: 'thundermm',
        }],
        ['战役篇', {
            color: '#c3f9ff',
            nature: 'thundermm',
            showName: '战',
        }],
        ['武将传', {
            color: '#c3f9ff',
            nature: 'thundermm',
            showName: '传',
        }],
        ['将', {
            nature: 'firemm',
        }],
        ['新杀', {
            color: '#fefedc',
            nature: 'metalmm',
            showName: '新',
        }],
        ['旧', {
            color: '#a4a4a4',
            nature: 'black',
        }],
        ['旧界', {
            color: '#a4a4a4',
            nature: 'black',
        }],
        ['节钺', {
            color: '#a4a4a4',
            nature: 'black',
        }],
        ['毅重', {
            color: '#a4a4a4',
            nature: 'black',
        }],
        ['★SP', {
            showName: '★',
        }],
        ['K系列', {
            showName: 'Ｋ',
        }],
        ['经典', {
            showName: '典',
        }],
        ['君', {
            color: '#fefedc',
            nature: 'shenmm',
        }],
        ['骰子', {
            getSpan: () => {
                return `<span style="font-family:NonameSuits">🎲</span>`;
            }
        }],
        ['SP', {
            getSpan: (prefix, name) => {
                return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">SP</span>`;
            },
        }],
        ['OL', {
            getSpan: (prefix, name) => {
                return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">OL</span>`;
            },
        }],
        ['RE', {
            getSpan: (prefix, name) => {
                return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">RE</span>`;
            },
        }],
        ['手杀', {
            getSpan: (prefix, name) => {
                const simple = (lib.config.buttoncharacter_prefix == 'simple');
                if (lib.characterPack.shiji && name in lib.characterPack.shiji) {
                    for (let i in lib.characterSort.shiji) {
                        if (lib.characterSort.shiji[i].includes(name)) {
                            prefix = get.translation(i).slice(-1);
                            break;
                        }
                    }
                    if (simple) return `<span>${prefix}</span>`;
                    return `<span style="color:#def7ca" data-nature="watermm">${prefix}</span>`;
                }
                if (simple) return '<span>手杀</span>';
                return `<span style="font-family:NonameSuits">📱</span>`;
            },
        }],
        ['TW', {
            getSpan: (prefix, name) => {
                return `<span style="writing-mode:horizontal-tb;-webkit-writing-mode:horizontal-tb;font-family:MotoyaLMaru;transform:scaleY(0.85)">TW</span>`;
            },
        }],
        ['TW神', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('TW')}${get.prefixSpan('神')}`
            },
        }],
        ['TW将', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('TW')}${get.prefixSpan('将')}`
            },
        }],
        ['OL神', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('OL')}${get.prefixSpan('神')}`
            },
        }],
        ['旧神', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('旧')}${get.prefixSpan('神')}`
            },
        }],
        ['旧晋', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('旧')}${get.prefixSpan('晋')}`
            },
        }],
        ['新杀SP', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('新杀')}${get.prefixSpan('SP')}`
            },
        }],
        ['界SP', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('界')}${get.prefixSpan('SP')}`
            },
        }],
        ['S特神', {
            getSpan: (prefix, name) => {
                return `${get.prefixSpan('★')}${get.prefixSpan('神')}`
            },
        }],
    ];

    const natures = [
        ['fire', 20],
        ['thunder', 30],
        ['kami', 60],
        ['ice', 40],
        ['stab', 10],
        ['poison', 50]
    ];

    const natureAudio = {
        damage: {
            'fire': 'default',//默认，即语音放置在audio/effect下，以damage_fire.mp3 damage_fire2.mp3命名。
            'thunder': 'default',
            'ice': 'default',
            'stab': 'normal',//正常，即与普通伤害音效相同。
            /*
            'example':{
                1:'../extension/XXX/damage_example.mp3',//1点伤害。
                2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
            }
            */
        },
        hujia_damage: {
            'fire': 'default',//默认，即语音放置在audio/effect下，以hujia_damage_fire.mp3 hujia_damage_fire2.mp3命名。
            'thunder': 'default',
            'ice': 'normal',//正常，即与普通伤害音效相同。
            /*
            'example':{
                1:'../extension/XXX/damage_example.mp3',//1点伤害。
                2:'../extension/XXX/damage_example2.mp3',//2点及以上伤害
            }
            */
        },
        sha: {
            'fire': 'default',//默认，即语音放置在audio/card/male与audio/card/female下，命名为sha_fire.mp3
            'thunder': 'default',
            'ice': 'default',
            'stab': 'default',
            'poison': 'normal',//正常，即播放“杀”的音效。
            'kami': 'normal',
            /*
            'example':{
                'male':'../extension/XXXX/sha_example_male.mp3',
                'female':'../extension/XXXX/sha_example_female.mp3'
            }
            */
        }
    };

    const natureBgs = [
        ['stab', 'image/card/cisha.png']
    ];

    const pinyins = {
        _metadata: {
            shengmu: ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "l", "n", "g", "k", "h", "j", "q", "x", "r", "z", "c", "s", "y", "w"],
            special_shengmu: ["j", "q", "x", "y"],
            feijiemu: {
                i: ["ing", "iu", "ie", "in"],
                u: ["ui", "un"],
                ü: ["üe", "ün"],
            },
            zhengtirendu: ["zhi", "chi", "shi", "ri", "zi", "ci", "si"],
            yunjiao: {
                "一麻": ["a", "ia", "ua"],
                "二波": ["o", "e", "uo"],
                "三皆": ["ie", "üe"],
                "四开": ["ai", "uai"],
                "五微": ["ei", "ui"],
                "六豪": ["ao", "iao"],
                "七尤": ["ou", "iu"],
                "八寒": ["an", "ian", "uan", "üan"],
                "九文": ["en", "in", "un", "ün"],
                "十唐": ["ang", "iang", "uang"],
                "十一庚": ["eng", "ing", "ong", "ung"],
                "十二齐": ["i", "er", "ü"],
                "十三支": ["-i"],
                "十四姑": ["u"],
            },
        }
    };

    const translate = {
        flower: "鲜花",
        egg: "鸡蛋",
        wine: "酒杯",
        shoe: "拖鞋",
        yuxisx: "玉玺",
        jiasuo: "枷锁",
        junk: "平凡",
        common: "普通",
        rare: "精品",
        epic: "史诗",
        legend: "传说",
        default: "默认",
        special: "特殊",
        zhenfa: "阵法",
        aozhan: "鏖战",
        mode_derivation_card_config: "衍生",
        mode_banned_card_config: "禁卡",
        mode_favourite_character_config: "收藏",
        mode_banned_character_config: "禁将",
        heart: "♥︎",
        diamond: "♦︎",
        spade: "♠︎",
        club: "♣︎",
        none: "◈",
        ghujia: "护甲",
        ghujia_bg: "甲",
        heart2: "红桃",
        diamond2: "方片",
        spade2: "黑桃",
        club2: "梅花",
        none2: "无色",
        red: "红色",
        black: "黑色",
        ok: "确定",
        ok2: "确定",
        cancel: "取消",
        cancel2: "取消",
        restart: "重新开始",
        setting: "设置",
        start: "开始",
        random: "随机",
        _out: "无效",
        agree: "同意",
        refuse: "拒绝",
        fire: "火",
        thunder: "雷",
        poison: "毒",
        kami: "神",
        ice: "冰",
        stab: "刺",
        wei: "魏",
        shu: "蜀",
        wu: "吴",
        qun: "群",
        shen: "神",
        western: "西",
        key: "键",
        jin: "晋",
        double: "双",
        wei2: "魏国",
        shu2: "蜀国",
        wu2: "吴国",
        qun2: "群雄",
        shen2: "神明",
        western2: "西方",
        key2: "KEY",
        jin2: "晋朝",
        double2: "双势力",
        male: "男",
        female: "女",
        mad: "混乱",
        mad_bg: "疯",
        draw_card: "摸牌",
        discard_card: "弃牌",
        take_damage: "受伤害",
        reset_character: "复原武将牌",
        recover_hp: "回复体力",
        lose_hp: "流失体力",
        get_damage: "受伤害",
        weiColor: "#b0d0e2",
        shuColor: "#ffddb9",
        wuColor: "#b2d9a9",
        qunColor: "#f6f6f6",
        shenColor: "#ffe14c",
        westernColor: "#ffe14c",
        jinColor: "#ffe14c",
        keyColor: "#c9b1fd",
        basic: "基本",
        equip: "装备",
        trick: "锦囊",
        delay: "延时锦囊",
        character: "角色",
        revive: "复活",
        equip1: "武器",
        equip2: "防具",
        equip3: "防御马",
        "equip3_4": "坐骑",
        equip4: "攻击马",
        equip5: "宝物",
        equip6: "特殊装备",
        zero: "零",
        one: "一",
        two: "二",
        three: "三",
        four: "四",
        five: "五",
        six: "六",
        seven: "七",
        eight: "八",
        nine: "九",
        ten: "十",
        _recasting: "重铸",
        _lianhuan: "连环",
        _lianhuan2: "连环",
        _kamisha: "神杀",
        _icesha: "冰杀",
        qianxing: "潜行",
        mianyi: "免疫",
        fengyin: "封印",
        baiban: "白板",
        _disableJudge: "判定区",

        xiaowu_emotion: "小无表情",
        guojia_emotion: "郭嘉表情",
        zhenji_emotion: "甄姬表情",
        shibing_emotion: "士兵表情",
        xiaosha_emotion: "小杀表情",
        xiaotao_emotion: "小桃表情",
        xiaojiu_emotion: "小酒表情",
        xiaokuo_emotion: "小扩表情",

        pause: "暂停",
        config: "选项",
        auto: "托管",

        unknown: "未知",
        unknown0: "一号位",
        unknown1: "二号位",
        unknown2: "三号位",
        unknown3: "四号位",
        unknown4: "五号位",
        unknown5: "六号位",
        unknown6: "七号位",
        unknown7: "八号位",

        feichu_equip1: "已废除",
        feichu_equip1_info: "武器栏已废除",
        feichu_equip2: "已废除",
        feichu_equip2_info: "防具栏已废除",
        feichu_equip3: "已废除",
        feichu_equip3_info: "防御坐骑栏已废除",
        feichu_equip4: "已废除",
        feichu_equip4_info: "攻击坐骑栏已废除",
        feichu_equip5: "已废除",
        feichu_equip5_info: "宝物栏已废除",
        feichu_equip1_bg: "废",
        feichu_equip2_bg: "废",
        feichu_equip3_bg: "废",
        feichu_equip4_bg: "废",
        feichu_equip5_bg: "废",
        disable_judge: "已废除",
        disable_judge_info: "判定区已废除",
        disable_judge_bg: "废",
        pss: "手势",
        pss_paper: "布",
        pss_scissor: "剪刀",
        pss_stone: "石头",
        pss_paper_info: "石头剪刀布时的一种手势。克制石头，但被剪刀克制。",
        pss_scissor_info: "石头剪刀布时的一种手势。克制布，但被石头克制。",
        pss_stone_info: "石头剪刀布时的一种手势。克制剪刀，但被布克制。",
        renku: "仁库",
        group_wei: "魏势力",
        group_shu: "蜀势力",
        group_wu: "吴势力",
        group_qun: "群势力",
        group_key: "键势力",
        group_jin: "晋势力",
        group_wei_bg: "魏",
        group_shu_bg: "蜀",
        group_wu_bg: "吴",
        group_qun_bg: "群",
        group_key_bg: "键",
        group_jin_bg: "晋",
        zhengsu: "整肃",
        zhengsu_leijin: "擂进",
        zhengsu_bianzhen: "变阵",
        zhengsu_mingzhi: "鸣止",
        zhengsu_leijin_info: "回合内所有于出牌阶段使用的牌点数递增且不少于三张。",
        zhengsu_bianzhen_info: "回合内所有于出牌阶段使用的牌花色相同且不少于两张。",
        zhengsu_mingzhi_info: "回合内所有于弃牌阶段弃置的牌花色均不相同且不少于两张。",
        db_atk: "策略",
        db_atk1: "全军出击",
        db_atk2: "分兵围城",
        db_def: "策略",
        db_def1: "奇袭粮道",
        db_def2: "开城诱敌",
        cooperation_damage: "同仇",
        cooperation_damage_info: "双方累计造成至少4点伤害",
        cooperation_draw: "并进",
        cooperation_draw_info: "双方累计摸至少8张牌",
        cooperation_discard: "疏财",
        cooperation_discard_info: "双方累计弃置至少4种花色的牌",
        cooperation_use: "戮力",
        cooperation_use_info: "双方累计使用至少4种花色的牌",
        charge: "蓄力值",
        expandedSlots: "扩展装备栏",
    };

    Object.assign(lib, _lib);
    Object.assign(lib.configMenu, configMenu);
    Object.assign(lib.extensionMenu, extensionMenu);
    Object.assign(lib.mode, mode);
    Object.assign(lib.natureAudio, natureAudio);
    Object.assign(lib.pinyins, pinyins);
    Object.assign(lib.translate, translate);

    lineColors.forEach(lineColor => lib.lineColor.set(...lineColor));
    namePrefixs.forEach(namePrefix => lib.namePrefix.set(...namePrefix));
    natures.forEach(nature => lib.nature.set(...nature));
    natureBgs.forEach(natureBg => lib.natureBg.set(...natureBg));
});
