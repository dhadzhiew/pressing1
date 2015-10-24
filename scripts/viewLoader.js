define('viewLoader', ['mustache'], function(mustache){
    return function(container, templateUrl, data, callback){
        var loading = localStorage.lang == "en" ? "Loading..." : "Зареждане...",
            animationDuration = 200;
        container.slideUp(animationDuration, function(){
            container.html('<p style="color: #fff; text-align: center;">' + loading  + '</p>');
            container.fadeIn(animationDuration)
        });
        $.get(templateUrl, function(template){
            container.fadeOut(animationDuration, function(){
                var homeViewHtml = mustache.render(template, data);
                container.html(homeViewHtml);
                if(data.pageTitle){
                    $('title').text(data.pageTitle);
                }
                container.slideDown(animationDuration);
                if(callback instanceof Function){
                    callback();
                }
            })
        });

    }
});