'use strict';

import 'isomorphic-fetch';
const $ = jQuery;
const $document = $( document );
const $window = $( window );
const utils = require( './utils.js' );

var scrollTimer = null;

$.mpfy = function( action, callOptions ) {
	var target = window.Mapify.instances;

	if ( ! $.isFunction( this ) ) {
		var instance = $( this ).data( 'mapify' );
		target = instance;
		if ( ! instance) {
			return this; // no map instance found for the selector
		}
	}
	if ( ! target ) {
		return this; // no target is available
	}

	var method = 'action' + action.charAt( 0 ).toUpperCase() + action.slice( 1 );
	if ( typeof $.mpfy[method] != 'undefined' ) {
		$.mpfy[ method ]( target, callOptions );
	} else {
		console.log( 'Mapify: Unknown action called: ' + action );
	}
	return this;
}
$.fn.mpfy = $.mpfy;

$.mpfy.actionRecenter = function( target ) {
	if ( typeof target.mapService == 'undefined' ) {
		for ( var id in target ) {
			var t = target[ id ];
			t.mapService.setCenter( t.settings.map.center );
			t.mapService.redraw();
		}
	} else {
		target.mapService.setCenter( target.settings.map.center );
		target.mapService.redraw();
	}
	$window.trigger( 'mapify.redraw' );
}

$.mpfy.actionSetStrings = function( target, strings ) {
	if ( typeof target.mapService == 'undefined'  ) {
		for ( var id in target ) {
			target[ id ].settings.strings = $.extend( target[ id ].settings.strings, strings );
		}
	} else {
		target.settings.strings = $.extend( target.settings.strings, strings );
	}
}

window.Mapify = {
	Map: require( './map.js' ),
	instances: [],
	classes: {
		popUpOpen : 'mpfy-p-popup-active',
		scrollShow : 'mpfy-p-scroll-show-scroll',
		openBodyClass : 'mpfy-popup-open'
	},
	ajaxUrl: window.wp_ajax_url,
	fixPopupHeightOnInit: function() {
		var imageLoader = $('.mpfy-p-slider-top img:first').attr('src');


		$('<img/>').attr('src', imageLoader).on('load', function() {

			$(this).remove(); // prevent memory leaks as @benweet suggested

			var directionHeight = $('.mpfy-p-local-info').outerHeight();
			var sliderHeight = $('.mpf-p-popup-holder .mpfy-p-slider').outerHeight();

			var scrollBarHeight = sliderHeight - directionHeight;

			$('.mpfy-p-content .mpfy-p-scroll').css('height', scrollBarHeight + 'px');

		});

		if ($('.jspVerticalBar').length) {
			$('.mpfy-p-holder .mpfy-p-content').addClass('mpf-p-show-overlay')
		};
	},
	fixPopupHeightOnChange: function() {
		var directionHeight = $('.mpfy-p-local-info').outerHeight() + 10;
		var sliderHeight = $('.mpfy-p-slider').outerHeight() - directionHeight;
		$('.mpfy-p-content .mpfy-p-scroll').css('height', sliderHeight + 'px');
	},
	initPopupSlider: function() {

		if ($('.mpfy-p-slider').length == 0 || $('.mpfy-p-slider-top ul.mpfy-p-slides > li').length < 2) {
			return;
		}

		var imageLoader = new Image();
		imageLoader.onLoad = function() {
			Mapify.fixPopupHeightOnInit();
		};
		imageLoader.onload = imageLoader.onLoad;
		imageLoader.src = $('ul.mpfy-p-slides img:first').attr('src'); 75

		var $sliderTop = $('.mpfy-p-slider-top ul.mpfy-p-slides');

		setTimeout(function() {
			$sliderTop.slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				adaptiveHeight: true,
				draggable: false,
				fade: true,
				responsive: [
					{
					breakpoint: 1024,
						settings: {
							arrows: true,
						}
					}
				]
			});

			Mapify.fixPopupHeightOnChange();
		}, 150);


		var $sliderBottom = $('.mpfy-p-slider-bottom ul.mpfy-p-slides');
		var $slideTopWrapper = $('.mpfy-p-slider .mpfy-p-slider-top')

		if ($sliderBottom.length) {

			$slideTopWrapper.addClass('add-padding' )
		} else {
			$slideTopWrapper.removeClass('add-padding')
		}

		$sliderBottom.owlCarousel({
			center : true,
			items : 7,
			loop : true,
			margin : 0,
			autoWidth : true,
			dots : false
		});

		$('ul.mpfy-p-slides').on('afterChange', function(event, slick, direction){
			Mapify.fixPopupHeightOnChange();
		});

		$sliderBottom.on('changed.owl.carousel', function(event){
			var _pos = parseInt($sliderBottom.find('.owl-item').eq(event.item.index).find('a').data('position'), 10);

			$sliderTop.slick('slickGoTo', _pos);
		});

		$sliderBottom.find('li a').click(function(event){
			event.preventDefault();

			var _pos = parseInt($(this).data('position'), 10);

			$sliderBottom.trigger('to.owl.carousel', _pos);
		});
	},
	closeTooltips: function() {
		$('.mpfy-tooltip').trigger({
			'type': 'tooltip_close'
		});
	},
	closeTooltipsAlt: function() {
		$('.mpfy-tooltip-image-orientation-left.mpfy-tooltip-with-thumbnail .mpfy-tooltip-image').each(function(){
			var introImage = $(this).find('img').attr('src')
			$(this).css('background-image', 'url('+introImage+')')
		});
	},
	updatePopupScroll: function() {
		if ($('.mpfy-p-slider').length == 0) {
			return;
		}

		if ( $('.mpfy-p-widget-direction-with-location').length) {
			$('.mpfy-p-scroll').addClass('mpfy-p-scroll-smaller')
		};
	},
	updateSidebarForMobile: function() {
		if ($('#mpfy-p-sidebar-top').length == 0) {
			return false;
		}

		if ($(window).width() <= 985) {
			if ($('#mpfy-p-sidebar-top > *').length > 0) {
				$('#mpfy-p-sidebar-top > *').remove().appendTo($('#mpfy-p-sidebar-bottom'));
			}
		} else if ($('#mpfy-p-sidebar-bottom > *').length > 0) {
			$('#mpfy-p-sidebar-bottom > *').remove().appendTo($('#mpfy-p-sidebar-top'));
		}
	},
	onDocReady: function() {
		$document.on( 'click', 'a[data-mapify-action]', function( e ) {
			e.preventDefault();

			var mapId = $( this ).attr( 'data-mapify-map-id' );
			var action = $( this ).attr( 'data-mapify-action' );
			var value = $( this ).attr( 'data-mapify-value' );
			$document.trigger( 'mapify.action.' + action, {
				mapId: mapId,
				value: value
			} );
		} );

		$document.on( 'mapify.action.setMapTag', function( e, args ) {
			Mapify.closePopup();

			var $container = args.mapId ? $('.mpfy-map-id-' + args.mapId) : $('body');
			$container.find( 'select[name="mpfy_tag"] option[value="' + encodeURIComponent( args.value ) + '"]' ).each(function() {
				$( this )
					.closest( '.mpfy-container' )
					.data( 'mapify' )
					.filterByTag( args.value );
			} );
		} );

		$document.on( 'mapify.action.openPopup', function( e, args ) {
			var $a = $( 'a.mpfy-pin-id-' +  args.value + ':first' );
			if ( $a.length === 0 ) {
				return;
			}

			if ( $a.hasClass( 'mpfy-external-link' ) ) {
				var target = $a.attr( 'target' );
				if ( target == '_self' ) {
					window.location = $a.attr( 'href' );
				} else {
					window.open( $a.attr( 'href' ) );
				}
			} else {
				if ( $a.attr( 'href' ) && $a.attr( 'href' ) !== '#' ) {
					Mapify.openPopup( $a.attr( 'href' ) );
				}
			}
		} );

		$document.on( 'click', '.mpfy-p-popup-background', function( e ) {
			Mapify.closePopup();
		} );
	},

	onWinLoad: function() {

	},

	showLoading: function() {
		var loading = $('.mpfy-p-loading');
		loading.show();
	},

	hideLoading: function() {
		var loading = $('.mpfy-p-loading');
		loading.hide();
	},

	openPopup: function(url, callback) {
		Mapify.closeTooltips();
		var closePromise = Mapify.closePopup();
		var response = '';
		var popup = $('.mpfy-p-popup');

		var requestPromise = Promise.resolve($.get({url: url, headers: { 'X-Requested-With': 'XMLHttpRequest' }})).then( r => response = r );

		Mapify.showLoading();
		return Promise.all([closePromise, requestPromise])
			.then( () => {
				if ( $(response).find('.mpfy-p-slider-top img').length > 0 ) {
					var imageLoader = $(response).find('.mpfy-p-slider-top img:first').attr('src');
					$('<img/>').attr('src', imageLoader).on('load', function(){
						$(this).remove(); // prevent memory leaks as @benweet suggested

						Mapify.hideLoading();
						$('html, body').addClass(Mapify.classes.openBodyClass);

						var popup = $(response);
						popup.appendTo('body');

						popup.find('.mpfy-p-close').on('click touchstart', function(e){
							e.preventDefault();
							Mapify.closePopup();
						});

						$('body').trigger($.Event('mpfy_popup_opened', {
							mpfy: {
								'popup': popup
							}
						}));

						// slider
						popup.on('click touchstart', '.mpfy-p-slider-bottom a', function(e){
							e.preventDefault();

							var _pos = parseInt($(this).data('position'));
							if (!isNaN(_pos)) {
								$('.mpfy-p-slider-top ul.mpfy-p-slides').triggerHandler('slideTo', _pos);
							}
						});

						// show the popup

						popup.addClass(Mapify.classes.popUpOpen);




						setTimeout(function() {
							// scrollbar
							if ($('.mpfy-p-slider').length > 0) {
								popup.find('.mpfy-p-scroll').jScrollPane({
									autoReinitialise: true
								});
								popup.find('.mpfy-p-scroll').bind('jsp-scroll-y', function(event, scrollPositionY, isAtTop, isAtBottom){
									if ( isAtBottom ) {
										$('.mpfy-p-popup-active').addClass('mpfy-p-scroll-remove-overlay')
									}else{
										$('.mpfy-p-popup-active').removeClass('mpfy-p-scroll-remove-overlay')
									}
									$('.mpfy-p-scroll').addClass(Mapify.classes.scrollShow);
									clearTimeout(scrollTimer);
									scrollTimer = setTimeout(function(){
										$('.mpfy-p-scroll').removeClass(Mapify.classes.scrollShow);
									}, 2000);
								});
							}

							Mapify.initPopupSlider();
							Mapify.updatePopupScroll();
							Mapify.updateSidebarForMobile();

						}, 100);


						if ( $('.mpfy-p-popup-active').length ) {
							if ($(window).width() > 767) {
								setTimeout(function() {
									$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-background')
								}, 200);

								setTimeout(function() {
									$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show')

								}, 700);
							} else {
								setTimeout(function() {
									$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-background')
									$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-mobile')

								}, 500);
							}


						};

						if (typeof stButtons != 'undefined') {
							stButtons.locateElements();
						}

						if (callback != 'undefined' && callback) {
							callback();
						}


					})
				} else {
					Mapify.hideLoading();
					$('html, body').addClass(Mapify.classes.openBodyClass);

					var popup = $(response);
					popup.appendTo('body');

					popup.find('.mpfy-p-close').on('click touchstart', function(e){
						e.preventDefault();
						Mapify.closePopup();
					});

					$('body').trigger($.Event('mpfy_popup_opened', {
						mpfy: {
							'popup': popup
						}
					}));

					// slider
					popup.on('click touchstart', '.mpfy-p-slider-bottom a', function(e){
						e.preventDefault();

						var _pos = parseInt($(this).data('position'));
						if (!isNaN(_pos)) {
							$('.mpfy-p-slider-top ul.mpfy-p-slides').triggerHandler('slideTo', _pos);
						}
					});

					// show the popup

					popup.addClass(Mapify.classes.popUpOpen);

					setTimeout(function() {
						// scrollbar
						if ($('.mpfy-p-slider').length > 0) {
							popup.find('.mpfy-p-scroll').jScrollPane({
								autoReinitialise: true
							});
							popup.find('.mpfy-p-scroll').bind('jsp-scroll-y', function(event, scrollPositionY, isAtTop, isAtBottom){
								if ( isAtBottom ) {
									$('.mpfy-p-popup-active').addClass('mpfy-p-scroll-remove-overlay')
								}else{
									$('.mpfy-p-popup-active').removeClass('mpfy-p-scroll-remove-overlay')
								}
								$('.mpfy-p-scroll').addClass(Mapify.classes.scrollShow);
								clearTimeout(scrollTimer);
								scrollTimer = setTimeout(function(){
									$('.mpfy-p-scroll').removeClass(Mapify.classes.scrollShow);
								}, 2000);
							});
						}

						Mapify.initPopupSlider();
						Mapify.updatePopupScroll();
						Mapify.updateSidebarForMobile();

					}, 100);


					if ( $('.mpfy-p-popup-active').length ) {
						if ($(window).width() > 767) {
							setTimeout(function() {
								$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-background')
							}, 200);

							setTimeout(function() {
								$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show')

							}, 700);
						} else {
							/*$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-background')*/
							setTimeout(function() {
								$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-background')
								$('.mpfy-p-popup-active').addClass('mpfy-p-popup-show-mobile')

							}, 500);
						}
					};

					if (typeof stButtons != 'undefined') {
						stButtons.locateElements();
					}

					if (callback != 'undefined' && callback) {
						callback();
					}
				}
			} );
	},

	closePopup: function() {
		if ($('.mpfy-p-popup').length == 0) {
			return Promise.resolve();
		}

		$('html, body').removeClass(Mapify.classes.openBodyClass);
		$('body').removeClass('mpf-location-info')
		$('.mpf-p-popup-holder').addClass('mpf-p-popup-remove');
		$('.mpf-p-popup-holder').removeClass('mpfy-p-popup-show');
		$('.mpfy-p-popup-active').removeClass('mpfy-p-popup-show-mobile')

		setTimeout(function() {
			$('.mpf-p-popup-holder').removeClass('mpf-p-popup-remove');
		}, 300);

		setTimeout(function() {
			$('.mpfy-p-popup-active').removeClass('mpfy-p-popup-show-background')
		}, 500);

		setTimeout(function() {
			$('.mpf-p-popup-holder').remove();
		}, 650);

		return Promise.delay( 650 );
	},

	showLocationInformation: function() {
		$('.mpfy-p-widget-title').on('click', function() {
			$('body').toggleClass('mpf-location-info')
			var $locationInfoHeight = $('.mpfy-p-widget-location .mpfy-location-details').outerHeight();
			var resetPadding = 0;

			if ( $('body').hasClass('mpf-location-info')) {
				$('.mpf-location-info .mpfy-p-popup .mpfy-title').css('padding-top', $locationInfoHeight + 'px');
			} else {
				$('.mpfy-p-popup .mpfy-title').css('padding-top', resetPadding + 'px');
			}
		});
	},

	Promise,
	preloadImage: utils.preloadImage,
};

$document.ready( Mapify.onDocReady );
$window.load( Mapify.onWinLoad );
$window.load( Mapify.closeTooltipsAlt );

$window.on( 'resize orientationchange mpfy_popup_load', function() {
	Mapify.initPopupSlider();
	Mapify.updatePopupScroll();
	Mapify.updateSidebarForMobile();

});

$window.on( 'mpfy_popup_opened', function() {
	Mapify.showLocationInformation();
	Mapify.fixPopupHeightOnInit();
});
