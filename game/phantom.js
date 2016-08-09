var load=function(id){
    var page = require('webpage').create();
    page.settings.userAgent = 'SpecialAgent';
    page.open('http://localhost/index.html?server='+id, function(status) {
        if(status !== 'success') {
            console.log('Unable to access network');
        }
        setInterval(function(){
            page.evaluate(function(){
                if(!lib.node||!lib.node.clients||!lib.node.clients.length){
                    game.reload();
                }
            });
        },3600000);
    });
}

load(1);
// load(2);
// load(3);

setTimeout(function(){
    phantom.exit();
},72000000);
