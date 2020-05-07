var sbvcgmap;
;(function($) {
	sbvcgmap = {
		init: function() {
			sbvcgmap.add_placeholder();
		},
		check_bool: function(string) {
			string = string.toLowerCase();
			if(string == 'yes')
				returnval = true;
			else
				returnval = false;
				
			return returnval;
		},
		add_placeholder: function() {
			$('.sb-bg-slider-params').each(function() {
				$this = $(this);
				var source = $this.data('source');
				if(source == 'row') {
					var row = $this.next('.vc_row');
					var content_vertical_center = $this.attr('data-content_vertical_center');
					var styles = $this.attr('data-styles');
					if(content_vertical_center == 'yes') {
						row.wrapInner('<div class="sbvcgmap-vertical-center"></div>');
					}
					
					row.prepend($this);
					row.attr('style', styles);
					row.css({
						'position': 'relative'
					});
				}
			});
			sbvcgmap.backstretch('.sb-bg-slider-params');
		},
		backstretch: function(element) {
			$(element).each(function() {
				var images = $.trim($(this).data('slider_attachments'));
				var duration = $(this).data('slide_duration');
				var fade = $(this).data('animation_speed');
				var centeredX = sbvcgmap.check_bool($(this).data('centered_x'));
				var centeredY = sbvcgmap.check_bool($(this).data('centered_y'));
				if(images != '') {
					var img_array = images.split('|');
					$(this).backstretch(img_array, {
						duration	: duration,
						fade		: fade,
						centeredX	: centeredX,
						centeredY	: centeredY
					});
				}
			});
			sbvcgmap.vertical_center();
		},
		vertical_center: function() {
			$('.sbvcgmap-vertical-center').flexVerticalCenter();
		}
	};
	sbvcgmap.init();
})(jQuery);