/*
 * Theme name: Dragonfly - One page
 * Description: Additional scripts
 * Version: 1.5
 * Last update: October 7 2014
 * Author: Jiri Cermak
 * */

$(document).ready(function () {

    /*
     * ===================================
     * Back To Top
     * ===================================
     * */

    var offset = 220,
        duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });


    /*
     * ===================================
     * Smooth scroll - from href to id
     * ===================================
     * */

    // Must add the class "scroll" to the link - <a href="#someID" class="scroll">
    $('a.scroll').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 750);
                return false;
            }
        }
    });


    //=== navigation settings ===//

    var navbar = $("#navbarSettings");


    /*=== Transparent navigation ===*/

    // add background color to transparent navbar after scrolling 90px
    $(window).scroll(function () {
        var $navbarTrn = $(".navbar-trn"),
            $nav = $(".navbar");
        if (navbar.hasClass("navbar-fixed-top")) {
            if ($(window).scrollTop() > 0) {
                $navbarTrn.css({
                    "background-color": "rgba(0, 0, 0, 0.8)"
                });
                $nav.css({
                    "box-shadow": "0 2px 5px rgba(0, 0, 0, 0.2)"
                });
                $nav.removeClass("navbar-height");
            } else {
                $nav.css({
                    "box-shadow": "none"
                });
                $navbarTrn.css({
                    "background-color": "rgba(255,255,255,0.5);"
                });
                $nav.addClass("navbar-height");
            }
        } else {
            $navbarTrn.css({
                "background-color": "rgba(255,255,255,0.5);"
            });
            $nav.css({
                "box-shadow": "none"
            });
            $nav.addClass("navbar-height");
        }
    });


    //Navigation for mobile devices - when you click a link in navigation, navigation will collapse
    $(".nav").find(".dropdown").on("click", function () {
        $(".navbar-collapse").removeClass("in");
    });

    //When you open the menu on mobile devices, the icon will be changed
    var $navToggle = $(".navbar-toggle");

    if ($navToggle.hasClass("navbar-open")) {
        ("navbar-open").on("click", function () {
            $(this).removeClass("navbar-open");
        });
    } else {
        $navToggle.on("click", function () {
            $navToggle.toggleClass("navbar-open");
        });
    }

    $(".navbar-nav").find(".dropdown").on("click", function () {
        $navToggle.removeClass("navbar-open");
    });

    /*
     * ===================================
     * Load next news
     * ===================================
     * */

    $("#loadNews").on("click", function () {
        $("#newsFeed").find(".box-feed").last().load("assets/ajax-load/news.html");
    });
    $(document).ajaxComplete(function (event, request, settings) {
        $(".box-load").animate({
            "opacity": "1"
        });
        $(".box-load").removeClass("box-load");
        $("#loadNews").text("That's all for now");
        $('.md-trigger').modalEffects();
    });



    /*
     * ===================================
     * Settings for plugins
     * ===================================
     * */


    /*
     * ===================================
     * Smooth scrolling
     * ===================================
     * */

    $("html").niceScroll({
        cursorcolor: "#999",
        cursorwidth: "8px",
        cursorborder: "none",
        cursorborderradius: "0px",
        scrollspeed: 60,
        mousescrollstep: 15 * 3,
        hwacceleration: true,
        background: "#ddd",
        preservenativescrolling: true,
        bouncescroll: true,
        spacebarenabled: true,
        disableoutline: true,
        smoothscroll: true,
        sensitiverail: true,
        hidecursordelay: 500,
        cursordragspeed: 0.3,
        zindex: 999999
    });

    /*
     * ===================================
     * Modal Effects
     * ===================================
     * */
    $('.md-trigger').modalEffects({
        overlaySelector: '.md-overlay',
        closeSelector: '.md-close',
        classAddAfterOpen: 'md-show',
        modalAttr: 'data-modal',
        perspectiveClass: 'md-perspective',
        perspectiveSetClass: 'md-setperspective',
        afterOpen: function (button, modal) {

        },
        afterClose: function (button, modal) {

        }
    });


    /*
     * ===================================
     * Revolution slider
     * ===================================
     * */
    jQuery('.tp-banner').show().revolution({
        dottedOverlay: "none",
        delay: 16000,
        startwidth: 1170,
        startheight: 700,
        hideThumbs: 200,

        thumbWidth: 100,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: "none",
        navigationArrows: "none",
        navigationStyle: "none",

        touchenabled: "off",
        onHoverStop: "off",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: "mouse",
        parallaxBgFreeze: "on",
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        shadow: 0,
        fullWidth: "on",
        fullScreen: "off",
        spinner: "spinner4",
        autoHeight: "off",
        forceFullWidth: "on",
        hideTimerBar: "on"
    });


    /*
     * ===================================
     * Owl Carousel
     * ===================================
     * */

    //Numbers slider
    $("#pricesSlider").owlCarousel({
        autoPlay: false, //Set AutoPlay to 3 seconds
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    //Lastest tweets slider
    $("#twitterSlider").owlCarousel({
        autoPlay: true, //Set AutoPlay to 3 seconds
        items: 1,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });


    /*=== Validator for form ===*/
    $(".validate").validate();


    /*=== WOW - Loading animations ===*/
    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 250,
        mobile: false
    }).init();

    /*=== Google Maps ===*/
    $('#map').initMap({
        markers: {
            marker1: {
                position: [37.4395881, -122.15977, 14]
            }
        },
        options: {
            zoom: 14,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: true
        },
        type: 'roadmap',
        center: [37.4395881, -122.15977]
    });
});