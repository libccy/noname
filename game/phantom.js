var page1 = require('webpage').create();
page1.settings.userAgent = 'SpecialAgent';
page1.open('http://localhost/index.html?server=true', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    else{
        page.evaluate(function(){
            game.pageId=1;
        });
    }
});

var page2 = require('webpage').create();
page2.settings.userAgent = 'SpecialAgent';
page2.open('http://localhost/index.html?server=true', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    else{
        page.evaluate(function(){
            game.pageId=2;
        });
    }
});

var page3 = require('webpage').create();
page3.settings.userAgent = 'SpecialAgent';
page3.open('http://localhost/index.html?server=true', function(status) {
    if(status !== 'success') {
        console.log('Unable to access network');
    }
    else{
        page.evaluate(function(){
            game.pageId=3;
        });
    }
});
