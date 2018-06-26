var fs=require('fs');
var path=require('path');
var exec = require('child_process').exec;
global.window=global;
require(__dirname+'/update.js');

var updates=window.noname_update;
var assetlist='window.noname_asset_list=[\n\t\''+updates.version+'\'';
var skinlist='window.noname_skin_list={\n';
var get = function(dir,callback){
	fs.readdir(dir,function(err,list){
		var shift=function(){
			if(list.length){
				var filename=list.shift();
				var delay=false;
				if(!/\.|~|_/.test(filename[0])){
					var url=dir+'/'+filename;
					var stat=fs.statSync(url);
					if(stat.isFile()){
						if(['.jpg','.png','.mp3','.ttf'].indexOf(path.extname(url))!=-1){
							assetlist+=',\n\t\''+path.relative(path.dirname(__dirname),url)+'\'';
						}
					}
					else if(stat.isDirectory()){
						if(dir==path.dirname(__dirname)+'/image/skin'){
							fs.readdir(url,function(err,list){
								var num=0;
								for(var i=0;i<list.length;i++){
									var url2=url+'/'+list[i];
									var stat=fs.statSync(url2);
									if(stat.isFile()&&path.extname(url2)=='.jpg'){
										num++;
									}
								}
								skinlist+='\t'+filename+':'+num+',\n';
								shift();
							});
							delay=true;
						}
						else{
							get(url,shift);
							delay=true;
						}
					}
				}
				if(!delay){
					shift();
				}
			}
			else{
				callback();
			}
		}
		shift();
	});
};

get(path.dirname(__dirname),function(){
	fs.writeFile('game/asset.js',assetlist+'\n];\n'+skinlist.slice(0,skinlist.length-2)+'\n};','utf-8',function(){
		console.log('udpated asset.js');
	});
	exec('git diff --name-only', (error, stdout, stderr) => {
		var updatelist='window.noname_update={\n\tversion:\''+updates.version+'\',';
		updatelist+='\n\tupdate:\''+(updates.update||'')+'\',';
		var apply=function(name,list){
			updatelist+='\n\t'+name+':[\n';
			for(var i=0;i<list.length;i++){
				updatelist+='\t\t\''+list[i]+'\'';
				if(i<list.length-1){
					updatelist+=',';
				}
				updatelist+='\n';
			}
			updatelist+='\t]';
		};
		if(updates.changeLog){
			apply('changeLog',updates.changeLog);
			updatelist+=',';
		}
		if(updates.players){
			apply('players',updates.players);
			updatelist+=',';
		}
		if(updates.cards){
			apply('cards',updates.cards);
			updatelist+=',';
		}
		var changes = stdout.split('\n');
		for(var i=0;i<changes.length;i++){
			var extname=path.extname(changes[i]);
			if(!changes[i]||(extname!='.js'&&extname!='.css')||changes[i]=='game/update.js'){
				changes.splice(i--,1);
			}
		}
		apply('files',changes);
		fs.writeFile('game/update.js',updatelist+'\n};','utf-8',function(){
			console.log('updated update.js');
		});
	});
});
