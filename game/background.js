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
    if(temp.image_background&&temp.image_background!='default'){
        bg.style.backgroundImage="url('image/background/"+temp.image_background+".jpg')";
        bg.style.backgroundSize="cover";

        switch (temp.image_background_filter){
            case 'blur':bg.style.webkitFilter='blur(8px)';bg.style.webkitTransform='scale(1.05)';break;
            case 'gray':bg.style.webkitFilter='grayscale(1)';break;
            case 'sepia':bg.style.webkitFilter='sepia(0.5)';break;
            case 'invert':bg.style.webkitFilter='invert(1)';break;
            case 'saturate':bg.style.webkitFilter='saturate(5)';break;
            case 'contrast':bg.style.webkitFilter='contrast(1.4)';break;
            case 'hue':bg.style.webkitFilter='hue-rotate(180deg)';break;
            case 'brightness':bg.style.webkitFilter='brightness(5)';break;
            default:bg.style.webkitFilter='';
        }
    }
    window.resetGameTimeout=setTimeout(function(){
        if(confirm('游戏似乎未正常载入，是否重置游戏？')){
            localStorage.clear();
            window.location.reload();
        }
    },5000);
}())
