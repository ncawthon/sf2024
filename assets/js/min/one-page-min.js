$(document).ready(function(){var e=220,a=500;$(window).scroll(function(){$(this).scrollTop()>e?$(".back-to-top").fadeIn(a):$(".back-to-top").fadeOut(a)}),$(".back-to-top").click(function(e){return e.preventDefault(),$("html, body").animate({scrollTop:0},a),!1}),$("a.scroll").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=$(this.hash);if(e=e.length?e:$("[name="+this.hash.slice(1)+"]"),e.length)return $("html,body").animate({scrollTop:e.offset().top},750),!1}});var o=$("#navbarSettings");$(window).scroll(function(){var e=$(".navbar-trn"),a=$(".navbar");o.hasClass("navbar-fixed-top")?$(window).scrollTop()>0?(e.css({"background-color":"rgba(0, 0, 0, 0.8)"}),a.css({"box-shadow":"0 2px 5px rgba(0, 0, 0, 0.2)"}),a.removeClass("navbar-height")):(a.css({"box-shadow":"none"}),e.css({"background-color":"transparent"}),a.addClass("navbar-height")):(e.css({"background-color":"transparent"}),a.css({"box-shadow":"none"}),a.addClass("navbar-height"))}),$(".nav").find(".dropdown").on("click",function(){$(".navbar-collapse").removeClass("in")});var s=$(".navbar-toggle");s.hasClass("navbar-open")?"navbar-open".on("click",function(){$(this).removeClass("navbar-open")}):s.on("click",function(){s.toggleClass("navbar-open")}),$(".navbar-nav").find(".dropdown").on("click",function(){s.removeClass("navbar-open")}),$("#loadNews").on("click",function(){$("#newsFeed").find(".box-feed").last().load("assets/ajax-load/news.html")}),$(document).ajaxComplete(function(e,a,o){$(".box-load").animate({opacity:"1"}),$(".box-load").removeClass("box-load"),$("#loadNews").text("That's all for now"),$(".md-trigger").modalEffects()}),$(".nav-a, .nav-b, .nav-mobile").onePageNav({currentClass:"active",changeHash:!1,scrollSpeed:1e3,scrollThreshold:.5,filter:"",easing:"easeInOutCubic"});var n=$(".nav-b li").first().hasClass("active"),t=$(".nav-a li").last().hasClass("active");n&&t.removeClass("active"),$("html").niceScroll({cursorcolor:"#999",cursorwidth:"8px",cursorborder:"none",cursorborderradius:"0px",scrollspeed:60,mousescrollstep:45,hwacceleration:!0,background:"#ddd",preservenativescrolling:!0,bouncescroll:!0,spacebarenabled:!0,disableoutline:!0,smoothscroll:!0,sensitiverail:!0,hidecursordelay:500,cursordragspeed:.3,zindex:999999}),$(".md-trigger").modalEffects({overlaySelector:".md-overlay",closeSelector:".md-close",classAddAfterOpen:"md-show",modalAttr:"data-modal",perspectiveClass:"md-perspective",perspectiveSetClass:"md-setperspective",afterOpen:function(e,a){},afterClose:function(e,a){}}),jQuery(".tp-banner").show().revolution({dottedOverlay:"none",delay:16e3,startwidth:1170,startheight:700,hideThumbs:200,thumbWidth:100,thumbHeight:50,thumbAmount:5,navigationType:"none",navigationArrows:"none",navigationStyle:"none",touchenabled:"off",onHoverStop:"off",swipe_velocity:.7,swipe_min_touches:1,swipe_max_touches:1,drag_block_vertical:!1,parallax:"mouse",parallaxBgFreeze:"on",parallaxLevels:[7,4,3,2,5,4,3,2,1,0],shadow:0,fullWidth:"on",fullScreen:"off",spinner:"spinner4",autoHeight:"off",forceFullWidth:"on",hideTimerBar:"on"}),$("#pricesSlider").owlCarousel({autoPlay:!1,items:4,itemsDesktop:[1199,3],itemsDesktopSmall:[979,3]}),$("#twitterSlider").owlCarousel({autoPlay:!0,items:1,itemsDesktop:[1199,3],itemsDesktopSmall:[979,3]}),new WOW({boxClass:"wow",animateClass:"animated",offset:0,mobile:!1}).init(),$("#map").initMap({markers:{marker1:{position:[37.4395881,-122.15977,17]}},options:{zoom:17,scrollwheel:!1},type:"roadmap",center:[37.4395881,-122.15977]})});