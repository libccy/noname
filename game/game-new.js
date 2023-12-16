import('../noname.js').then(({lib,game,ui,get,ai,_status})=>{
    try{
        lib.init.init();
    }catch(e){
        alert(e.stack);
    }
});