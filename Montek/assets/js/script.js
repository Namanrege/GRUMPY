(function($) {
    "use-strict";

    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.loader-wrap').length) {
            $('.loader-wrap').delay(300).fadeOut(300);
        }
    }

    if ($('.preloader-close').length) {
        $('.preloader-close').on('click', function() {
            $('.loader-wrap').delay(300).fadeOut(300);
        });
    }

    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');

            var HeaderHight = $('.main-header').height();
            if (windowpos >= HeaderHight) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }
        }
    }

    headerStyle();

    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        $('.xs-sidebar-group .close-button').on('click', function(e) {
            $('.xs-sidebar-group.info-group').removeClass('isActive');
        });

        $('.about-widget').on('click', function(e) {
            $('.about-sidebar').addClass('active');
        });

        $('.about-sidebar .close-button').on('click', function(e) {
            $('.about-sidebar').removeClass('active');
        });

        $('.about-sidebar .gradient-layer').on('click', function(e) {
            $('.about-sidebar').removeClass('active');
        });
    }

    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {
        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Hide / Show Submenu
        $('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var target = $(this).parent('li').children('ul');

            if ($(target).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(target).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //3rd Level Nav
        $('.mobile-menu .navigation > li.dropdown > ul > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var targetInner = $(this).parent('li').children('ul');

            if ($(targetInner).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(targetInner).slideUp(500);
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');
        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
            $('.mobile-menu .navigation > li').removeClass('open');
            $('.mobile-menu .navigation li ul').slideUp(0);
        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $('body').removeClass('mobile-menu-visible');
                $('.mobile-menu .navigation > li').removeClass('open');
                $('.mobile-menu .navigation li ul').slideUp(0);
            }
        });
    }

    const serviceImgItem = document.querySelectorAll(".news-block_two-inner");

    function followImageCursor(event, serviceImgItem) {
        const contentBox = serviceImgItem.getBoundingClientRect();
        const dx = event.clientX - contentBox.x;
        const dy = event.clientY - contentBox.y;
        serviceImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
    }
    serviceImgItem.forEach((item, i) => {
        item.addEventListener("mousemove", (event) => {
            setInterval(followImageCursor(event, item), 1000);
        });
    });

    // Add Current Class Auto
    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function() {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        selector.children("li").each(function() {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    if ($('.main-header .main-menu .navigation').length) {
        dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
    }

    window.onload = function() {
        var splineElement = document.querySelectorAll('spline-viewer');

        for (let pas = 0; pas < splineElement.length; pas++) {
            var shadowRoot = splineElement[pas].shadowRoot;
            if (shadowRoot) {
               const logo = shadowRoot.querySelector('#logo');
               if(logo){
                logo.remove();
               }
            }
        }
    }

    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function() {
            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }
        }, {
            accY: 0
        });
    }

    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 100);
        });
    }

    if ($('.paroller').length) {
        $('.paroller').paroller({
            factor: 0.2,
            factorLg: 0.4,
            type: 'foreground',
            direction: 'horizontal'
        });
    }

    // Three Items Slider
    var slider = new Swiper('.three-item_carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        navigation: {
            nextEl: '.three-item_carousel-next',
            prevEl: '.three-item_carousel-prev',
            clickable: true,
        },
        pagination: {
            el: ".three-item_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': { slidesPerView: 3 },
            '1200': { slidesPerView: 3 },
            '992': { slidesPerView: 3 },
            '768': { slidesPerView: 2 },
            '600': { slidesPerView: 1 },
            '576': { slidesPerView: 1 },
            '0': { slidesPerView: 1 },
        },
    });

    // Odometer
    if ($(".odometer").length) {
        $('.odometer').appear();
        $('.odometer').appear(function() {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
            window.odometerOptions = {
                format: 'd',
            };
        });
    }

    // Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");
    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });
        const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
        gsap.set(splitTextLine, { perspective: 400 });
        itemSplitted.split({ type: "lines" })
        tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.1
        });
    });

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    }

    // ======================================================================================
    // YouTube Player API script - FINAL
    // ======================================================================================
    let players = [];

    function createPlayer(elementId, index, videoId, orientation) {
        if (orientation === 'vertical') {
            $('#' + elementId).closest('.youtube-video-container').addClass('is-vertical');
        }
        players[index] = new YT.Player(elementId, {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'mute': 1,
                'controls': 0,
                'loop': 1,
                'playlist': videoId,
                'modestbranding': 1,
                'showinfo': 0,
                'rel': 0
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        // THIS IS THE CRUCIAL FIX: It prevents the video iframe from blocking mouse events.
        event.target.getIframe().style.pointerEvents = 'none';
    }

    window.onYouTubeIframeAPIReady = function() {
        $('.youtube-player').each(function(index) {
            let playerDiv = $(this);
            let elementId = 'player' + index;
            playerDiv.attr('id', elementId);

            playerDiv.appear(function() {
                if (playerDiv.children('iframe').length === 0) {
                    createPlayer(elementId, index, playerDiv.data('video-id'), playerDiv.data('orientation'));
                }
            }, { accX: 0, accY: 0 });
        });
    };

    // Custom hover controls to play/unmute and pause/mute
    $(document).ready(function() {
        $('.gallery-one, .work-one').on('mouseenter', '.gallery-block_one-inner', function() {
            let playerDiv = $(this).find('.youtube-player');
            if (playerDiv.length && playerDiv.attr('id')) {
                let playerId = playerDiv.attr('id');
                let playerIndex = parseInt(playerId.replace('player', ''));
                if (players[playerIndex] && typeof players[playerIndex].playVideo === 'function') {
                    players[playerIndex].unMute();
                    players[playerIndex].playVideo();
                }
            }
        }).on('mouseleave', '.gallery-block_one-inner', function() {
            let playerDiv = $(this).find('.youtube-player');
            if (playerDiv.length && playerDiv.attr('id')) {
                let playerId = playerDiv.attr('id');
                let playerIndex = parseInt(playerId.replace('player', ''));
                if (players[playerIndex] && typeof players[playerIndex].pauseVideo === 'function') {
                    players[playerIndex].pauseVideo();
                    players[playerIndex].mute();
                }
            }
        });
    });
    // END of YouTube Player API script
    // ======================================================================================

    // When document is scrolling, do
    $(window).on('scroll', function() {
        headerStyle();
    });

    // When document is loading, do
    $(window).on('load', function() {
        handlePreloader();
    });

})(window.jQuery);