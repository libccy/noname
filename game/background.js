(function(){
    var temp;
    try{
        temp=JSON.parse(localStorage.getItem('noname_0.9_config'));
    }
    catch(err){}
    if(temp&&temp.background&&temp.background!='default'){
        document.querySelector('.background').style.backgroundImage="url('image/background/"+temp.background+".jpg')";
        if(temp.background_stretch!=false) document.querySelector('.background').style.backgroundSize="cover";
    }
    if(temp&&temp.background_filter){
        switch (temp.background_filter){
            case 'blur':document.querySelector('.background').style.webkitFilter='blur(8px)';
                document.querySelector('.background').style.webkitTransform='scale(1.05)';break;
            case 'gray':document.querySelector('.background').style.webkitFilter='grayscale(1)';break;
            case 'sepia':document.querySelector('.background').style.webkitFilter='sepia(0.5)';break;
            case 'invert':document.querySelector('.background').style.webkitFilter='invert(1)';break;
            case 'saturate':document.querySelector('.background').style.webkitFilter='saturate(5)';break;
            case 'contrast':document.querySelector('.background').style.webkitFilter='contrast(1.4)';break;
            case 'hue':document.querySelector('.background').style.webkitFilter='hue-rotate(180deg)';break;
            case 'brightness':document.querySelector('.background').style.webkitFilter='brightness(5)';break;
            default:document.querySelector('.background').style.webkitFilter='';
        }
    }
}())
