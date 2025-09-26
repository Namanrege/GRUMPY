(function ($) {
  "use strict";

  //Update Header Style and Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var windowpos = $(window).scrollTop();
      var siteHeader = $(".main-header");
      var scrollLink = $(".scroll-to-top");
      if (windowpos >= 1) {
        siteHeader.addClass("fixed-header");
        scrollLink.fadeIn(300);
      } else {
        siteHeader.removeClass("fixed-header");
        scrollLink.fadeOut(300);
      }
    }
  }
  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header li.dropdown").append(
      '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
    );
    //Dropdown Button
    $(".main-header li.dropdown .dropdown-btn").on("click", function () {
      $(this).prev("ul").slideToggle(500);
    });
    //Disable dropdown parent link
    $(
      ".main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a"
    ).on("click", function (e) {
      e.preventDefault();
    });
  }

  //Mobile Nav Hide Show
  if ($(".mobile-menu").length) {
    var mobileMenuContent = $(".main-header .nav-outer .main-menu").html();
    $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
    $(".sticky-header .main-menu").append(mobileMenuContent);
    //Dropdown Button
    $(".mobile-menu li.dropdown .dropdown-btn").on("click", function () {
      $(this).toggleClass("open");
      $(this).prev("ul").slideToggle(500);
    });
    //Menu Toggle Btn
    $(".mobile-nav-toggler").on("click", function () {
      $("body").addClass("mobile-menu-visible");
    });
    //Menu Toggle Btn
    $(".mobile-menu .menu-backdrop,.mobile-menu .close-btn").on(
      "click",
      function () {
        $("body").removeClass("mobile-menu-visible");
      }
    );
  }

  //Shearch Box
  if ($(".search-box-outer").length) {
    $(".search-box-outer").on("click", function () {
      $("body").addClass("search-active");
    });
    $(".close-search").on("click", function () {
      $("body").removeClass("search-active");
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1500
      );
    });
  }

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }


  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  $(window).on("load", function () {
    // add your functions
  });

  // YouTube Player API script for portfolio videos (handles both widescreen and vertical)
  // ======================================================================================

  let players = []; // Array to hold all our player objects

  // This function creates an <iframe> and YouTube player after the API code downloads.
  // Note: This function name MUST be onYouTubeIframeAPIReady, as it's what the YouTube script looks for.
  window.onYouTubeIframeAPIReady = function() {
      $('.youtube-player').each(function(index) {
          let videoId = $(this).data('video-id');
          // Skip initialization if the video ID is missing or is still a placeholder
          if (!videoId || videoId.startsWith("YOUR_")) {
              return; 
          }
          let orientation = $(this).data('orientation'); // Check for orientation
          let elementId = 'player' + index;
          $(this).attr('id', elementId);

          // If orientation is vertical, add a class to the container
          if (orientation === 'vertical') {
              $(this).closest('.youtube-video-container').addClass('is-vertical');
          }

          players[index] = new YT.Player(elementId, {
              height: '100%',
              width: '100%',
              videoId: videoId,
              playerVars: {
                  'autoplay': 1,
                  'mute': 1,
                  'controls': 0,
                  'loop': 1,
                  'playlist': videoId, // Required for loop to work
                  'modestbranding': 1,
                  'showinfo': 0,
                  'rel': 0
              },
              events: {
                  'onReady': onPlayerReady
              }
          });
      });
  }

  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
      event.target.playVideo();
  }

  // Custom hover controls
  $(document).ready(function() {
      // Use event delegation for hover
      $('.work-one').on('mouseenter', '.gallery-block_one-inner', function() {
          let index = $(this).closest('.gallery-block_one').index('.gallery-block_one');
          if (players[index] && typeof players[index].pauseVideo === 'function') {
              players[index].pauseVideo();
          }
      }).on('mouseleave', '.gallery-block_one-inner', function() {
          let index = $(this).closest('.gallery-block_one').index('.gallery-block_one');
          if (players[index] && typeof players[index].playVideo === 'function') {
              players[index].playVideo();
          }
      });
  });

})(jQuery);