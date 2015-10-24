define('gallery', function(){

    function Gallery(){
        this._$gallery = $('#gallery');
        this._$galleryImgs = this._$gallery.children('img');
        this._$slide = this._$gallery.children('.slide');
        this._$slideImg = this._$slide.children('img');
        this._$title = this._$slide.children('h1');
        this._currentIndex = 0;
        this._$slide.hide();
        setListeners.call(this);
    }

    Gallery.prototype.nextSlide = function nextSlide(){
        this._currentIndex = this._currentIndex + 1 < this._$galleryImgs.length ? this._currentIndex + 1 : 0;
        loadSlide.call(this);
    };

    Gallery.prototype.prevSlide = function prevSlide(){
        this._currentIndex = this._currentIndex > 0 ? this._currentIndex - 1 : this._$galleryImgs.length - 1;
        loadSlide.call(this);
    };

    function loadSlide(){
        var imgSrc = this._$galleryImgs[this._currentIndex].src;
        this._$title.text(this._$galleryImgs[this._currentIndex].alt);
        this._$slideImg.stop().fadeOut(100, function(){
            $(this).attr('src', imgSrc);
        });
        this._$slideImg.fadeIn(200);
    }

    function showSlide($clickedImg){
        var _this = this;
        var slideStartTop;
        var slideStartLeft;

        this._$galleryImgs.filter(function(index, img){
            if(img.src == $clickedImg[0].src){
                _this._currentIndex = index;
                return;
            }
        });
        this._$title.hide();
        loadSlide.call(this);
        this._$slide.fadeIn(200);
        this._$slide.fadeIn(100, function(){
            _this._$title.fadeIn(300);
        });
    }

    function setListeners(){
        var _this = this;
        this._$gallery.children('img').on('click', function(e){
            showSlide.call(_this, $(this));
            e.stopPropagation();
        });
        $(window).on('keydown', function(e){
            if(e.keyCode == 27){
                _this._$gallery.children('.slide').fadeOut(200);
            }
        });
        this._$slide.children('#nextSlideButton').on('click', function(e){
            e.stopPropagation();
            _this.nextSlide();
        });
        this._$slide.children('#prevSlideButton').on('click', function(e){
            e.stopPropagation();
            _this.prevSlide();
        });
        this._$slide.children('#closeSlide').on('click', function(){
            _this._$slide.fadeOut(200);
        });
        this._$slide.on('click', function(e){
            if(e.target.className == 'slide'){
                _this._$slide.fadeOut(200);
            }
        });
        $(window).on('keyup', function(event){
            var leftKey = 37,
                rightKey = 39;
            if(event.keyCode == leftKey){
                _this.prevSlide();
            }else if(event.keyCode == rightKey){
                _this.nextSlide();
            }
        });
    }

    return Gallery;
});