'use strict';
(function(){
    var temp;
    try{
        temp=JSON.parse(localStorage.getItem('noname_0.9_config'));
        if(!temp){
            throw('err');
        }
    }
    catch(err){
        return;
    }
    var bg=document.querySelector('.background');
    if(bg){
        bg.style.backgroundSize="cover";
    }
    if(temp.image_background&&temp.image_background!='default'&&temp.image_background!='custom'){
        bg.style.backgroundImage="url('image/background/"+temp.image_background+".jpg')";

        switch (temp.image_background_filter){
            case 'blur':
                bg.style.filter='blur(8px)';
                bg.style.webkitFilter='blur(8px)';
                bg.style.transform='scale(1.05)';
                break;
            case 'gray':
                bg.style.filter='grayscale(1)';
                bg.style.webkitFilter='grayscale(1)';
                break;
            case 'sepia':
                bg.style.filter='sepia(0.5)';
                bg.style.webkitFilter='sepia(0.5)';
                break;
            case 'invert':
                bg.style.filter='invert(1)';
                bg.style.webkitFilter='invert(1)';
                break;
            case 'saturate':
                bg.style.filter='saturate(5)';
                bg.style.webkitFilter='saturate(5)';
                break;
            case 'contrast':
                bg.style.filter='contrast(1.4)';
                bg.style.webkitFilter='contrast(1.4)';
                break;
            case 'hue':
                bg.style.filter='hue-rotate(180deg)';
                bg.style.webkitFilter='hue-rotate(180deg)';
                break;
            case 'brightness':
                bg.style.filter='brightness(5)';
                bg.style.webkitFilter='brightness(5)';
                break;
            default:
                bg.style.webkitFilter='';
        }
    }
    window.resetGameTimeout=setTimeout(function(){
        if(window.inSplash) return;
        if(confirm('游戏似乎未正常载入，是否重置游戏？')){
            localStorage.clear();
            if(indexedDB) indexedDB.deleteDatabase('noname_0.9_data');
            window.location.reload();
        }
    },5000);
}())
