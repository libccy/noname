var reload=function(){
    if(!lib.node||!lib.node.clients||!lib.node.clients.length){
        game.reload();
    }
};

var page1 = require('webpage').create();
page1.settings.userAgent = 'SpecialAgent';
page1.open('http://localhost/index.html?server=1', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    setInterval(function(){
        page1.evaluate(reload);
    },3600000);
});

var page2 = require('webpage').create();
page2.settings.userAgent = 'SpecialAgent';
page2.open('http://localhost/index.html?server=2', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    setInterval(function(){
        page2.evaluate(reload);
    },3600000);
});

var page3 = require('webpage').create();
page3.settings.userAgent = 'SpecialAgent';
page3.open('http://localhost/index.html?server=3', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    setInterval(function(){
        page3.evaluate(reload);
    },3600000);
});
