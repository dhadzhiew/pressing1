require.config({
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
        sammy: 'https://cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.6/sammy.min',
        mustache: 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min',
        controller: 'controller',
        contactForm: 'contactForm',
        viewLoader: 'viewLoader',
        gallery: 'gallery'
    }
});

require(['controller', 'mustache', 'sammy', 'jquery'], function(controller, mustache, sammy){
    var lastView,
        $wrapper = $('#wrapper'),
        $menuContainer = $('#mainMenu'),
        $footerContainer = $('footer');
    var userLang = navigator.language || navigator.userLanguage;
    if(!localStorage.lang){
        if(userLang.indexOf('bg') == -1){
            localStorage.lang = 'en';
        }else{
            localStorage.lang = 'bg';
        }
    }
    controller.loadMainMenuView($menuContainer);
    controller.loadFooterView($footerContainer);
    var routing = sammy(function(){
        this.get('#/', function(){
            lastView = controller.loadHomeView;
            lastView($wrapper);
        });

        this.get('#/gallery', function(){
            lastView = controller.loadGalleryView;
            lastView($wrapper);
        });

        this.get('#/partners', function(){
            lastView = controller.loadPartnersView;
            lastView($wrapper);
        });

        this.get('#/contacts', function(){
            lastView = controller.loadContactsView;
            lastView($wrapper);
        });

        this.notFound = function(a){
            alert('Page not found');
            window.location.hash = '#/';
        }
    }).run('#/');

    $('#langs div').on('click', function(){
        changeLang($(this).attr('id'));
    });


    function changeLang(lang){
        if(localStorage.lang != lang){
            localStorage.lang = lang;
            lastView($wrapper);
            controller.loadMainMenuView($menuContainer);
            controller.loadFooterView($footerContainer);
        }
    }
});