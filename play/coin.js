'use strict';
play.coin={
	init:function(){
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			_status.coin=0;
		}
	},
	arenaReady:function(){
        if(_status.video) return;
		if(lib.config.mode!='chess'||get.config('chess_mode')!='leader'){
			var str;
			if(lib.config.coin_display_playpackconfig=='text'){
				str='<span>'+lib.config.coin+'</span><span>金</span>'
			}
			else{
				str='<span style="position:absolute">㉤</span><span style="margin-left:18px;font-family:xinwei;line-height:10px">'+lib.config.coin+'</span>';
			}
			if(lib.config.coin_canvas_playpackconfig){
				ui.window.classList.add('canvas_top');
			}
			ui.coin=ui.create.system(str,null,true);
			lib.setPopped(ui.coin,function(){
				var uiintro=ui.create.dialog('hidden');
				uiintro.classList.add('coin_menu')
				uiintro.add('商店');
				uiintro.listen(function(e){
					e.stopPropagation();
				});
				uiintro.add('<div class="coin_buy">烟花<div class="menubutton">100金</span></div></div>');
				var buyfirework=uiintro.content.lastChild.lastChild.lastChild;
				if(lib.config.coin<100&&!_status.fireworkbought){
					buyfirework.classList.add('disabled');
				}
				if(_status.fireworkbought){
					if(_status.fireworkRunning){
						buyfirework.innerHTML='停止';
					}
					else{
						buyfirework.innerHTML='开始';
					}
				}
				buyfirework.listen(function(){
					if(this.innerHTML=='100金'){
						if(lib.config.coin>=100){
							_status.fireworkbought=true;
							game.changeCoin(-100);
							game.haveFun.firework();
						}
						else{
							return;
						}
					}
					else if(this.innerHTML=='停止'){
						game.haveFun.fireworkStop();
					}
					else if(this.innerHTML=='开始'){
						game.haveFun.firework();
					}
					ui.click.window();
				});

				uiintro.add('<div class="coin_buy">下雪<div class="menubutton">100金</span></div></div>');
				var buysnow=uiintro.content.lastChild.lastChild.lastChild;
				if(lib.config.coin<100&&!_status.snowbought){
					buysnow.classList.add('disabled');
				}
				if(_status.snowbought){
					if(_status.snowRunning){
						buysnow.innerHTML='停止';
					}
					else{
						buysnow.innerHTML='开始';
					}
				}
				buysnow.listen(function(){
					if(this.innerHTML=='100金'){
						if(lib.config.coin>=100){
							_status.snowbought=true;
							game.changeCoin(-100);
							game.haveFun.snow();
						}
						else{
							return;
						}
					}
					else if(this.innerHTML=='停止'){
						game.haveFun.snowStop();
					}
					else if(this.innerHTML=='开始'){
						game.haveFun.snow();
					}
					ui.click.window();
				});

				uiintro.classList.add('noleave');
				return uiintro;
			},220,400);
		}
    },
	game:{
		changeCoin:function(num){
			if(typeof num=='number'&&ui.coin){
				game.saveConfig('coin',lib.config.coin+num);
				var str;
				if(lib.config.coin_display_playpackconfig=='text'){
					str='<span>'+lib.config.coin+'</span><span>金</span>'
				}
				else{
					str='<span style="position:absolute">㉤</span><span style="margin-left:18px;font-family:xinwei;line-height:10px">'+lib.config.coin+'</span>';
				}
				ui.coin.innerHTML=str;
			}
		},
		haveFun:{
			snow:function(){
				_status.snowRunning=true;
				if(game.haveFun.snowStart){
					game.haveFun.snowStart();
				}
				else{
					/*
					* 自由下雪 snowFall
					* author：xuanfeng
					* time: 2014-01-11
					*/
					// 控制下雪
					var canvas;
					function snowFall(snow) {
						// 可配置属性
						snow = snow || {};
						this.maxFlake = snow.maxFlake || 200;	//最多片数
						this.flakeSize = snow.flakeSize || 10;	//雪花形状
						this.fallSpeed = snow.fallSpeed || 2;	//坠落速度
						this.status = 0;	//0-初始化、1-开始下雪、2-停止下雪、3-暂停下雪、4-继续下雪
					}

					// 兼容写法
					requestAnimationFrame = window.requestAnimationFrame ||
											window.mozRequestAnimationFrame ||
											window.webkitRequestAnimationFrame ||
											window.msRequestAnimationFrame ||
											window.oRequestAnimationFrame ||
											function(callback) { setTimeout(callback, 1000 / 60); };
					cancelAnimationFrame = window.cancelAnimationFrame ||
											window.mozCancelAnimationFrame ||
											window.webkitCancelAnimationFrame ||
											window.msCancelAnimationFrame ||
											window.oCancelAnimationFrame;

					// 开始下雪
					snowFall.prototype.start = function(){
						if(this.status == 1 || this.status == 4){
							// 已经在下雪则不作处理
							return false;
						}
						this.status = 1;

						// 创建画布
						snowCanvas.apply(this);
						// 创建雪花形状
						createFlakes.apply(this);
						// 画雪
						drawSnow.apply(this)
					}

					// 停止下雪
					snowFall.prototype.stop = function(){
						if(this.status == 2 || this.status == 0 || !this.canvas){
							return false;
						}
						// 停止动画循环
						this.pause();
						this.status = 2;
						// 删除画布
						this.canvas.parentNode.removeChild(this.canvas);
						this.canvas = null;
					}

					// 暂停下雪
					snowFall.prototype.pause = function(){
						if(this.status == 3){
							return false;
						}
						this.status = 3;
						cancelAnimationFrame(this.loop)
					};
					// 继续下雪
					snowFall.prototype.resume = function(){
						if(this.status == 3 && this.canvas){
							this.status = 4;
							// 动画的计时控制
							this.loop = requestAnimationFrame(function() {
								drawSnow.apply(that)
							});
						}
					};

					// 创建画布
					function snowCanvas() {
						// 添加Dom结点
						var snowcanvas = document.createElement("canvas");
						snowcanvas.classList.add('fun');
						snowcanvas.id = "snowfall";
						ui.window.appendChild(snowcanvas);
						canvas=snowcanvas;
						this.canvas = snowcanvas;
						this.ctx = snowcanvas.getContext("2d");
						// 窗口大小改变的处理
						lib.onresize.push(function() {
							snowcanvas.width = ui.window.offsetWidth;
							snowcanvas.height = ui.window.offsetHeight
						});
						snowcanvas.width = ui.window.offsetWidth;
						snowcanvas.height = ui.window.offsetHeight;
					}

					// 雪运动对象
					function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
						this.x = Math.floor(Math.random() * canvasWidth); 	//x坐标
						this.y = Math.floor(Math.random() * canvasHeight);	//y坐标
						this.size = Math.random() * flakeSize + 2;			//形状
						this.maxSize = flakeSize;							 //最大形状
						this.speed = Math.random() * 1 + fallSpeed;		      //坠落速度
						this.fallSpeed = fallSpeed;						  //坠落速度
						this.velY = this.speed;							  //Y方向速度
						this.velX = 0;									    //X方向速度
						this.stepSize = Math.random() / 30;				    //步长
						this.step = 0 									    //步数
					}

					flakeMove.prototype.update = function() {
						var x = this.x,
						    y = this.y;

						// 左右摆动(余弦)
						this.velX *= 0.98;
						if (this.velY <= this.speed) {
							this.velY = this.speed
						}
						this.velX += Math.cos(this.step += .05) * this.stepSize;

						this.y += this.velY;
						this.x += this.velX;
						// 飞出边界的处理
						if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
							this.reset(canvas.width, canvas.height)
						}
					};

					// 飞出边界-放置最顶端继续坠落
					flakeMove.prototype.reset = function(width, height) {
						this.x = Math.floor(Math.random() * width);
						this.y = 0;
						this.size = Math.random() * this.maxSize + 2;
						this.speed = Math.random() * 1 + this.fallSpeed;
						this.velY = this.speed;
						this.velX = 0;
					};

					// 渲染雪花-随机形状
					flakeMove.prototype.render = function(ctx) {
						var snowFlake = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
						snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)");
						snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)");
						snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)");
						ctx.save();
						ctx.fillStyle = snowFlake;
						ctx.beginPath();
						ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
						ctx.fill();
						ctx.restore();
					};

					// 创建雪花-定义形状
					function createFlakes() {
						var maxFlake = this.maxFlake,
							flakes = this.flakes = [],
							canvas = this.canvas;
						for (var i = 0; i < maxFlake; i++) {
							flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
						}
					}

					// 画雪
					function drawSnow() {
						var maxFlake = this.maxFlake,
							flakes = this.flakes;
						var ctx = this.ctx, canvas = this.canvas, that = this;
						// 清空雪花
						ctx.clearRect(0, 0, canvas.width, canvas.height);
						for (var e = 0; e < maxFlake; e++) {
							flakes[e].update();
							flakes[e].render(ctx);
						}
						// 一帧一帧的画
						this.loop = requestAnimationFrame(function() {
							drawSnow.apply(that);
						});
					}

					// 调用及控制方法
					var snow = new snowFall({maxFlake:200});
					game.haveFun.snowStart=function(){
						snow.start();
					}
					game.haveFun.snowStop=function(){
						_status.snowRunning=false;
						snow.stop();
					}
					snow.start();
				}
			},
			fireworkStop:function(){
				_status.fireworkRunning=false;
			},
			firework:function(){
				if(_status.fireworkRunning) return;
				_status.fireworkRunning=true;
				if(game.haveFun.fireworkLoop){
					game.haveFun.fireworkLoop();
				}
				else{
					// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
					// not supported in all browsers though and sometimes needs a prefix, so we need a shim
					var requestAnimFrame = ( function() {
						return window.requestAnimationFrame ||
									window.webkitRequestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									function( callback ) {
										window.setTimeout( callback, 1000 / 60 );
									};
					})();

					// now we will setup our basic variables for the demo
					var canvas = document.createElement( 'canvas' ),
							ctx = canvas.getContext( '2d' ),
							// full screen dimensions
							cw = ui.window.offsetWidth,
							ch = ui.window.offsetHeight,
							// firework collection
							fireworks = [],
							// particle collection
							particles = [],
							// starting hue
							hue = 120,
							// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
							limiterTotal = 5,
							limiterTick = 0,
							// this will time the auto launches of fireworks, one launch per 80 loop ticks
							timerTotal = 80,
							timerTick = 0,
							mousedown = false,
							// mouse x coordinate,
							mx,
							// mouse y coordinate
							my;

					// set canvas dimensions
					canvas.width = cw;
					canvas.height = ch;
					ui.window.appendChild(canvas);
					canvas.classList.add('fun');
					lib.onresize.push(function(){
						cw=ui.window.offsetWidth;
						ch=ui.window.offsetHeight;
						canvas.width = cw;
						canvas.height = ch;
					});

					// now we are going to setup our function placeholders for the entire demo

					// get a random number within a range
					function random( min, max ) {
						return Math.random() * ( max - min ) + min;
					}

					// calculate the distance between two points
					function calculateDistance( p1x, p1y, p2x, p2y ) {
						var xDistance = p1x - p2x,
								yDistance = p1y - p2y;
						return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
					}

					// create firework
					function Firework( sx, sy, tx, ty ) {
						// actual coordinates
						this.x = sx;
						this.y = sy;
						// starting coordinates
						this.sx = sx;
						this.sy = sy;
						// target coordinates
						this.tx = tx;
						this.ty = ty;
						// distance from starting point to target
						this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
						this.distanceTraveled = 0;
						// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
						this.coordinates = [];
						this.coordinateCount = 3;
						// populate initial coordinate collection with the current coordinates
						while( this.coordinateCount-- ) {
							this.coordinates.push( [ this.x, this.y ] );
						}
						this.angle = Math.atan2( ty - sy, tx - sx );
						this.speed = 2;
						this.acceleration = 1.05;
						this.brightness = random( 50, 70 );
						// circle target indicator radius
						this.targetRadius = 1;
					}

					// update firework
					Firework.prototype.update = function( index ) {
						// remove last item in coordinates array
						this.coordinates.pop();
						// add current coordinates to the start of the array
						this.coordinates.unshift( [ this.x, this.y ] );

						// cycle the circle target indicator radius
						if( this.targetRadius < 8 ) {
							this.targetRadius += 0.3;
						} else {
							this.targetRadius = 1;
						}

						// speed up the firework
						this.speed *= this.acceleration;

						// get the current velocities based on angle and speed
						var vx = Math.cos( this.angle ) * this.speed,
								vy = Math.sin( this.angle ) * this.speed;
						// how far will the firework have traveled with velocities applied?
						this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );

						// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
						if( this.distanceTraveled >= this.distanceToTarget ) {
							createParticles( this.tx, this.ty );
							// remove the firework, use the index passed into the update function to determine which to remove
							fireworks.splice( index, 1 );
						} else {
							// target not reached, keep traveling
							this.x += vx;
							this.y += vy;
						}
					}

					// draw firework
					Firework.prototype.draw = function() {
						ctx.beginPath();
						// move to the last tracked coordinate in the set, then draw a line to the current x and y
						ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
						ctx.lineTo( this.x, this.y );
						ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
						ctx.stroke();

						ctx.beginPath();
						// draw the target for this firework with a pulsing circle
						ctx.arc( this.tx, this.ty, this.targetRadius, 0, Math.PI * 2 );
						ctx.stroke();
					}

					// create particle
					function Particle( x, y ) {
						this.x = x;
						this.y = y;
						// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
						this.coordinates = [];
						this.coordinateCount = 5;
						while( this.coordinateCount-- ) {
							this.coordinates.push( [ this.x, this.y ] );
						}
						// set a random angle in all possible directions, in radians
						this.angle = random( 0, Math.PI * 2 );
						this.speed = random( 1, 10 );
						// friction will slow the particle down
						this.friction = 0.95;
						// gravity will be applied and pull the particle down
						this.gravity = 1;
						// set the hue to a random number +-20 of the overall hue variable
						this.hue = random( hue - 20, hue + 20 );
						this.brightness = random( 50, 80 );
						this.alpha = 1;
						// set how fast the particle fades out
						this.decay = random( 0.015, 0.03 );
					}

					// update particle
					Particle.prototype.update = function( index ) {
						// remove last item in coordinates array
						this.coordinates.pop();
						// add current coordinates to the start of the array
						this.coordinates.unshift( [ this.x, this.y ] );
						// slow down the particle
						this.speed *= this.friction;
						// apply velocity
						this.x += Math.cos( this.angle ) * this.speed;
						this.y += Math.sin( this.angle ) * this.speed + this.gravity;
						// fade out the particle
						this.alpha -= this.decay;

						// remove the particle once the alpha is low enough, based on the passed in index
						if( this.alpha <= this.decay ) {
							particles.splice( index, 1 );
						}
					}

					// draw particle
					Particle.prototype.draw = function() {
						ctx. beginPath();
						// move to the last tracked coordinates in the set, then draw a line to the current x and y
						ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
						ctx.lineTo( this.x, this.y );
						ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
						ctx.stroke();
					}

					// create particle group/explosion
					function createParticles( x, y ) {
						// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
						var particleCount = 30;
						while( particleCount-- ) {
							particles.push( new Particle( x, y ) );
						}
					}

					// main demo loop
					function loop() {
						if(lib.config.coin_free_playpackconfig&&!_status.imchoosing){
							canvas.style.display='none';
						}
						else{
							canvas.style.display='';
						}
						// this function will run endlessly with requestAnimationFrame
						if(!_status.fireworkRunning){
							canvas.width=cw;
							canvas.height=ch;
							return;
						}
						else{
							requestAnimFrame( loop );
						}

						// increase the hue to get different colored fireworks over time
						hue += 0.5;

						// normally, clearRect() would be used to clear the canvas
						// we want to create a trailing effect though
						// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
						ctx.globalCompositeOperation = 'destination-out';
						// decrease the alpha property to create more prominent trails
						ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
						ctx.fillRect( 0, 0, cw, ch );
						// change the composite operation back to our main mode
						// lighter creates bright highlight points as the fireworks and particles overlap each other
						ctx.globalCompositeOperation = 'lighter';

						// loop over each firework, draw it, update it
						var i = fireworks.length;
						while( i-- ) {
							fireworks[ i ].draw();
							fireworks[ i ].update( i );
						}

						// loop over each particle, draw it, update it
						var i = particles.length;
						while( i-- ) {
							particles[ i ].draw();
							particles[ i ].update( i );
						}

						// launch fireworks automatically to random coordinates, when the mouse isn't down
						if( timerTick >= timerTotal ) {
							if( !mousedown ) {
								// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
								fireworks.push( new Firework( cw / 2, ch, random( 0, cw ), random( 0, ch / 2 ) ) );
								timerTick = 0;
							}
						} else {
							timerTick++;
						}

						// limit the rate at which fireworks get launched when mouse is down
						if( limiterTick >= limiterTotal ) {
							if( mousedown ) {
								// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
								fireworks.push( new Firework( cw / 2, ch, mx, my ) );
								limiterTick = 0;
							}
						} else {
							limiterTick++;
						}
					}


					if(lib.config.touchscreen){
						ui.window.addEventListener( 'touchmove', function( e ) {
							mx = e.touches[0].clientX - canvas.offsetLeft;
							my = e.touches[0].clientY - canvas.offsetTop;
						});
						ui.window.addEventListener( 'touchstart', function( e ) {
							e.preventDefault();
							mousedown = true;
						});
						ui.window.addEventListener( 'touchend', function( e ) {
							e.preventDefault();
							mousedown = false;
						});
					}
					else{
						// mouse event bindings
						// update the mouse coordinates on mousemove
						ui.window.addEventListener( 'mousemove', function( e ) {
							mx = e.pageX - canvas.offsetLeft;
							my = e.pageY - canvas.offsetTop;
						});

						// toggle mousedown state and prevent canvas from being selected
						ui.window.addEventListener( 'mousedown', function( e ) {
							e.preventDefault();
							mousedown = true;
						});

						ui.window.addEventListener( 'mouseup', function( e ) {
							e.preventDefault();
							mousedown = false;
						});
					}

					// once the window loads, we are ready for some fireworks!
					game.haveFun.fireworkLoop=loop;
					loop();
				}
			}
		}
	},
	help:{
		'富甲天下':'<ul><li>每完成一次对局，可获得一定数量的金币'+
		'<li>战斗胜利可额外获得20金币，每杀死一个敌人可获得10金币（托管无效）'+
		'<li>使用的武将越强，获得的金币数越少'+
		'<li>执行以下操作时，将扣除金币：<ul><li>作弊：20金币<li>换将卡：10金币<li>'+
		'自由选将：50金币<li>手气卡：10金币<li>换人：20金币</ul>'+
		'<li>金币可用于购买烟花等游戏特效'
	}
}
