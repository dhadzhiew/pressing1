define('controller', ['viewLoader', 'contactForm', 'gallery'], function(viewLoader, contactForm, Gallery){

   function loadMainMenu(container){
       $.get('data/mainMenu.json', function(data){
           loadView(container, 'templates/mainMenuView.html', data)
       });
    }

    function loadFooterView(container){
        $.get('data/footer.json', function(data){
            loadView(container, 'templates/footerView.html', data);
        });
    }

    function loadHomeView(container){
        $.get('data/home.json', function(data){
            loadView(container, 'templates/homeView.html', data);
        });
    }

    function loadPartnersView(container){
        $.get('data/partners.json', function(data){
            loadView(container, 'templates/partnersView.html', data);
        });
    }

    function loadGalleryView(container, callback){
        $.get('data/gallery.json', function(data){
            loadView(container, 'templates/galleryView.html', data, function(){
                new Gallery(container);
            });
        });
    }

    function loadContactsView(container){
        $.get('data/contacts.json', function(data){
            loadView(container, 'templates/contactsView.html', data, contactForm.run);
        });
    }

    function loadView(container, templateUrl, data, callback){
        if(localStorage && localStorage.lang == 'en'){
            viewLoader(container, templateUrl, data.en, callback);
        }else{
            viewLoader(container, templateUrl, data.bg, callback);
        }
    }

    return {
        loadContactsView: loadContactsView,
        loadGalleryView: loadGalleryView,
        loadFooterView: loadFooterView,
        loadMainMenuView: loadMainMenu,
        loadHomeView: loadHomeView,
        loadPartnersView: loadPartnersView
    }
});