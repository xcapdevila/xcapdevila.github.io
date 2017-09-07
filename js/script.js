// Control scroll offset
var scrollOffset = -30;

(function ($) {
    "use strict";

    $(window).bind("load", function () {
            $('#status').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(1000).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('body').delay(1000).css({'overflow-x': 'hidden'}).css({'overflow-y': 'auto'});
            checkContactForm();
            $('body').scrollspy({target: '.nav-menu'});

            $('body').data()['bs.scrollspy'].options.offset = Math.abs(scrollOffset) + 10; // Set the new offset
            $('body').data()['bs.scrollspy'].process(); // Force scrollspy to recalculate the offsets to your targets
            $('body').scrollspy('refresh'); // Refresh the scrollspy.
        }
    );

    $(window).ready(function () {

        var wow = new WOW(
            {
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: '-200px', // distance to the element when triggering the animation (default is 0)
                mobile: true, // trigger animations on mobile devices (default is true)
                live: true        // act on asynchronously loaded content (default is true)
            }
        );

        new WOW().init();

        $('.skill').circliful({
            fgcolor: "#E64A3B",
            fontsize: "20",
            bgcolor: "#D8CDBB",
            dimension: "150"
        });

        $('.has-shadow').append('<div class="shadow"></div>');

        function getImgSize(el, imgSrc) {
            var newImg = new Image();
            newImg.onload = function () {
                var height = newImg.height;
                var width = newImg.width;
                el.css('height', height);
            };
            newImg.src = imgSrc;
        }

        if ($('.bg-image[data-bg-image]').length > 0) {
            $('.bg-image[data-bg-image]').each(function () {
                var el = $(this);
                var sz = getImgSize(el, el.attr("data-bg-image"));
                el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-bg-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');
            });
        }

        if ($('.bg-color[data-bg-color]').length > 0) {
            $('.bg-color[data-bg-color]').each(function () {
                var el = $(this);
                el.css('background-color', el.attr("data-bg-color"));
            });
        }

        if ($('.portfolio-item').length > 0) {
            var $container = $('#portfolio-grid');
            $container.isotope({filter: '*'});
            $('.group-selectors a').click(function (e) {
                e.preventDefault();
                var selector = $(this).attr('data-filter');
                $container.isotope({filter: selector, columnWidth: 4});
                $('.group-selectors a.active').removeClass('active');
                $(this).toggleClass('active');
                return false;
            });
            $('.group-selectors a').each(function () {
                $(this).append('<span></span>');
            });
        }

        $('[data-placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('data-placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('data-placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('data-placeholder'));
            }
        }).blur();

        $('[data-placeholder]').parents('form').submit(function () {
            $(this).find('[data-placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('data-placeholder')) {
                    input.val('');
                }
            });
        });

    });

    $('.goto-top').click(function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 2000);
    });

    if ($('a[data-rel="prettyphoto"]').length > 0) {
        $('a[data-rel="prettyphoto"]').prettyPhoto();
    }
    if ($('a[data-rel="prettyPhoto"]').length > 0) {
        $('a[data-rel="prettyPhoto"]').prettyPhoto();
    }

    function checkContactForm() {
        if ($(".contact-form").length > 0) {
            var formStatus = $(".contact-form").validate();

            // Bind to the submit event of our form
            $(".contact-form").submit(function (event) {

                //  triggers contact form validation
                if (formStatus.errorList.length === 0) {

                    // Prevent default posting of form
                    event.preventDefault();

                    // setup some local variables
                    var $form = $(this);

                    // Let's select and cache all the fields
                    var $inputs = $form.find("input, select, button, textarea");

                    // Serialize the data in the form
                    var serializedData = $form.serialize();

                    // Let's disable the inputs for the duration of the Ajax request.
                    // Note: we disable elements AFTER the form data has been serialized.
                    // Disabled form elements will not be serialized.
                    $form.fadeOut();
                    $('#loading').css('visibility', 'visible');
                    $inputs.prop("disabled", true);

                    // Fire off the request
                    $.ajax({
                        crossDomain: true,
                        url: "https://docs.google.com/forms/d/e/1FAIpQLSeU5yDMpud9_URuqc3MAqCrFYg1ehf9dwHqW1zl9jFJCuCENQ/formResponse",
                        type: "POST",
                        data: serializedData
                    }).always(function () {
                        //Workaround to avoid Google CORS exception
                        $('.message-box').html('<p><label>Message successfully sent!</label><br/>Thanks for your message. Feel free to join me on <a href="https://www.linkedin.com/in/xcapdevila/" target="_blank">Linkedin</a>.<br/></p>');
                        // Reenable the inputs
                        $inputs.prop("disabled", false);
                        $(".contact-form input,.contact-form textarea,.contact-form select").not('.submit').val('');
                        $('#loading').css('visibility', 'hidden');
                        $form.fadeIn();
                    });
                }
            });
        }
    }

    //hashtag navigation address setup (deeplink)
    $('.nav-menu a').address($(this).attr('href'));
    $('.top-drop-menu').change(function () {
        var loc = ($(this).find('option:selected').val());
        $('.nav-menu a').address(loc);

    });

    $.address.change(function (event) {
        var pageID = event.value.split('/')[1];
        if (pageID != '' && pageID.indexOf('.') === -1) {
            var el = $(".nav-menu [href=#" + pageID + "]");
            $('.nav-menu .active').removeClass('active');
            el.parent().addClass('active');
            $('select.nav option').each(function () {
                var val = $(this).val();
                if (val === "#" + pageID) {
                    $('select.nav option:selected').removeAttr('selected');
                    $(this).attr('selected', 'selected');
                }
            });
            scrollToSection("#" + pageID);
        } else {
            if (pageID.indexOf('.') > -1) {
                window.location = pageID;
            }
        }
    });

    $('select.nav').change(function () {
        var loc = ($(this).find('option:selected').val());
        scrollToSection(loc);
    });

    function scrollToSection(destSection) {

        $('html, body').stop().animate({
            scrollTop: $(destSection).offset().top + scrollOffset
        }, 2000, 'easeInOutExpo');
    }

    $('.nav-menu a').bind('click', function (event) {
        event.preventDefault();
        var clickedMenu = $(this);
        $('.nav-menu .active').toggleClass('active');
        clickedMenu.parent().toggleClass('active');
        scrollToSection(clickedMenu.attr('href'));
    });

})(jQuery);

// Sticky Nav
$(window).scroll(function (e) {
    var nav_anchor = $(".top-menu-holder");
    var gotop = $(document);
    if ($(this).scrollTop() >= 500) {
        $('.goto-top').css({'opacity': 1});
    } else if ($(this).scrollTop() < 500) {
        $('.goto-top').css({'opacity': 0});
    }
    if ($(this).scrollTop() >= $('header').height()) {
        nav_anchor.addClass('split');
    }
    else if ($(this).scrollTop() < $('header').height()) {
        nav_anchor.removeClass('split');
    }
});

/**
 Provides requestAnimationFrame in a cross browser way.
 @author paulirish / http://paulirish.com/ */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback / callback, / DOMElement Element */ element) {
            };
    })();
}