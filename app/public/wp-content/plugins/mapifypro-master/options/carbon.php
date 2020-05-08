<?php

namespace Mpfy\Carbon;

add_action('admin_enqueue_scripts', 'Mpfy\Carbon\mpfy_carbon_extend_js', 11);
function mpfy_carbon_extend_js() {
	wp_enqueue_script('mpfy_carbon_extend', plugins_url('assets/vendor/carbon-extend.js', MAPIFY_PLUGIN_FILE));
}

class Carbon_Field_Leaflet_Map extends Carbon_Field_Map_With_Address {
	function admin_init() {
		// override method so google maps are not loaded
	}
}

class Carbon_Field_Map_Mpfy extends Carbon_Field_Map_With_Address {
	function admin_init() {
		// override method so google maps are not loaded
	}

	function save() {
		$this->store->save($this);

		$original_name = $this->get_name();
		$original_value = $this->get_value();
		$original_address = '';
		if ( is_array( $original_value ) && isset( $original_value['address'] ) ) {
			$original_address = $original_value['address'];
		}
		if ( is_array( $original_value ) && isset( $original_value['coordinates'] ) ) {
			$original_value = $original_value['coordinates'];
		}

		$value = explode(',', $original_value);
		if ( count($value) >= 2 ) {
			$lat = floatval($value[0]);
			$lng = floatval($value[1]);
			$zoom = intval($value[2]);
		} else {
			$lat = $lng = '';
			$zoom = 5;
		}

		$this->set_name($original_name . '-lat');
		$this->set_value($lat);
		$this->store->save($this);

		$this->set_name($original_name . '-lng');
		$this->set_value($lng);
		$this->store->save($this);

		$this->set_name($original_name . '-zoom');
		$this->set_value($zoom);
		$this->store->save($this);

		$this->set_name($original_name . '-address');
		$this->set_value($original_address);
		$this->store->save($this);

		$this->set_name($original_name);
		$this->set_value($original_value);

		return true;
	}

	function load() {
		$original_name = $this->get_name();

		$lat = $lng = '';

		$this->set_name($original_name . '-lat');
		$this->store->load($this);
		$lat = $this->get_value();

		$this->set_name($original_name . '-lng');
		$this->store->load($this);
		$lng = $this->get_value();

		$this->set_name($original_name . '-zoom');
		$this->store->load($this);
		$zoom = $this->get_value();
		$zoom = ($zoom === false) ? 5 : $zoom;
		$this->zoom = $zoom;

		$this->set_name($original_name . '-address');
		$this->store->load($this);
		$this->address = $this->get_value();

		$this->set_name($original_name);
		$this->set_value($lat . ',' . $lng . ',' . $zoom);
	}


	function set_value_from_input($input = null) {
		if ( is_null($input) ) {
			$input = $_POST;
		}

		if ( !isset($input[$this->name]) ) {
			$this->set_value(null);
		} else {
			$value = stripslashes_deep($input[$this->name]);

			if ( is_array($value) && isset($value['lat']) && isset($value['lng']) ) {
				$value = $value['lat'] . ',' . $value['lng'];
			}

			$this->set_value( $value );
		}
	}
}

class Carbon_Field_Select_Location extends Carbon_Field_Select {
	static $attached_scripts = false;

	function admin_init() {
		if ( !self::$attached_scripts ) {
			self::$attached_scripts = true;

			add_action('admin_footer', array($this, 'admin_enqueue_scripts'));
		}
		parent::admin_init();
	}

	function admin_enqueue_scripts() {
		$raw = get_posts('post_type=map-location&posts_per_page=-1&orderby=title&order=asc');
		$locations = array();
		foreach ($raw as $r) {
			$ml = new \Mpfy_Map_Location($r->ID);
			$coords = $ml->get_coordinates();
			if ($coords) {
				$locations[$r->ID] = $coords;
			}
		}
		?>
		<script type="text/javascript">
		(function($){
			var location_data = <?php echo json_encode($locations); ?>;
			$(document).ready(function(){
				var $select = $('select[name="<?php echo $this->name; ?>"]');
				$select.change(function() {
					var $map = $('.mpfy-carbon-map[data-name="_map_google_center"]');
					var efo = $map.data('exposed_field_object');
					var value = location_data[$(this).val()];
					var manual = ( value === undefined );
					$map.find('p:first').toggle(manual);
					if ( ! manual ) {
						efo.update_marker_position([value[0], value[1]]);
					}
				});
				setTimeout(function(){
					$select.trigger('change');
				}, 1);
			});
		})(jQuery);
		</script>
		<?php
	}
}

class Carbon_Field_Map_Mode extends Carbon_Field_Select {
	static $attached_scripts = false;

	function admin_init() {
		if ( !self::$attached_scripts ) {
			self::$attached_scripts = true;

			add_action('admin_footer', array($this, 'admin_enqueue_scripts'));
		}
		parent::admin_init();
	}

	function admin_enqueue_scripts() {
		$post_id = isset($_GET['post']) ? intval($_GET['post']) : 0;
		?>
		<script type="text/javascript">
		(function($){
			var styles = <?php echo json_encode(apply_filters('mpfy_google_map_styles', (object) array())); ?>;
			for (var k in styles) {
				styles[k] = eval(styles[k]);
			}

			function mpfy_update_map_display() {
				// mode
				var mode = $('select[name="<?php echo $this->name; ?>"]').val();
				mode = (mode) ? mode : 'map';

				var settings = {
					'efo': $('.mpfy-carbon-map[data-name="_map_google_center"]').data('exposed_field_object'),
					'div': $('.mpfy-carbon-map[data-name="_map_google_center"] .mpfy-carbon-map-canvas:first'),
					'mode': mode,
					'bg_color': '',
					'style': 'default'
				};

				$('body').trigger($.Event('mpfy_admin_map_updated', {
					mpfy: {
						'settings': settings
					}
				}));

				// background
				settings.div.css('background-color', settings.bg_color);

				if ( settings.mode == 'map' ) {
					// terrain mode
					var mapMode = $('select[name="_map_google_mode"]').val();
					mapMode = mapMode ? mapMode : 'road';
					settings.efo.setMapType( mapMode );
				}
			}

			$(document).ready(function(){
				$('body').on('mpfy_trigger_map_reload', function(e) {
					mpfy_update_map_display();
				});
				$('select[name="<?php echo $this->name; ?>"], select[name="_map_google_mode"], input[name="_map_background_color"]').change(function() {
					$('body').trigger($.Event('mpfy_trigger_map_reload'));
				});
				setTimeout(function() {
					$('select[name="<?php echo $this->name; ?>"]').trigger('change');
				},1);
			});
		})(jQuery);
		</script>
		<?php
	}
}

class Carbon_Field_Image_Pin extends Carbon_Field_Image {
	function admin_init() {
		add_action('admin_footer', array($this, 'admin_enqueue_scripts'));
		parent::admin_init();
	}

	function attach_to_map($map_field_name) {
		$this->map_field_name = $map_field_name;
		return $this;
	}

	function admin_enqueue_scripts() {
		?>
		<script type="text/javascript">
		(function($){
			$(document).ready(function(){
				$('input[name="<?php echo $this->name; ?>"]').change(function() {
					var efo = $('.mpfy-carbon-map[data-name="_<?php echo $this->map_field_name; ?>"], .mpfy-carbon-map-with-address[data-name="_<?php echo $this->map_field_name; ?>"]').data('exposed_field_object');
					if (!efo) {
						return true;
					}
					for (var i = 0; i < efo.map.crb.markers.length; i++) {
						var m = efo.map.crb.markers[i];
						(function(url){
							var img = new Image();
							img.onLoad = function() {
								var size = [this.width, this.height];
								var anchor = [Math.floor( size[0] / 2 ), size[1]];
								m.setIcon( L.icon( {
									iconUrl: url,
									iconSize: size,
									iconAnchor: anchor
								} ) );
							};
							img.onload = img.onLoad;
							img.src = url;
						})($(this).val());
					}
				});
				setTimeout(function() {
					$('input[name="<?php echo $this->name; ?>"]').change();
				},1);
			});
		})(jQuery);
		</script>
		<?php
	}
}

class Carbon_Field_Tileset extends Carbon_Field_Text {
	function render() {
		$post_id = isset($_GET['post']) ? intval($_GET['post']) : 0;
		if (!$post_id) {
			return false;
		}
		?>
		<em class="map_tileset_status">Checking status ...</em>
		<img src="<?php echo plugins_url('assets/images/tileset-loader.gif', MAPIFY_PLUGIN_FILE); ?>" alt="" style="position: relative; top: 1px;" />
		<script type="text/javascript">
		(function($, $window, $document){
			function _check_tileset_status() {
				$.get(<?php echo json_encode(admin_url('admin-ajax.php')); ?>, {
					'action': 'mpfy_ajax_tileset_status'
					, 'id': <?php echo json_encode($post_id); ?>
				}, function(response) {
					$('.map_tileset_status').html(response.message);
					if (response.status != 'processing') {
						$('.map_tileset_status').next().hide();
						clearInterval(_tileset_interval);
						$('body').trigger({
							type: "mpfy_image_mode_status_changed",
							_response: response
						});
					} else {
						$('.map_tileset_status').next().show();
					}
				}, 'json');
			}

			$document.ready(function(){
				_check_tileset_status();
				_tileset_interval = setInterval(_check_tileset_status, 5*1000);
			});
		})(jQuery, jQuery(window), jQuery(document));
		</script>
		<?php
	}
}

class Carbon_Field_Relationship_Mpfy extends Carbon_Field_Relationship {
	function set_value_from_input($input = null) {
		if ( is_null($input) ) {
			$input = $_POST;
		}

		if ( !isset($input[$this->name]) ) {
			$this->set_value(null);
		} else {
			$val = implode(',', stripslashes_deep($input[$this->name]));
			$this->set_value($val);
		}
	}

	function render() {
		global $sitepress;
		$this->value = explode(',', $this->value);

		$this->value = maybe_unserialize($this->value);
		if (!is_array($this->value)) {
			$this->value = array($this->value);
		}

		// Exclude the current post from the list
		$screen = get_current_screen();
		$exclude_id = '';
		if ( is_object($screen) && $screen->base == 'post' && isset($_GET['post']) ) {
			$exclude_id = intval($_GET['post']);
		}

		$this->post_type = (array) $this->post_type;

		if ($sitepress) {
			$current_lang = $sitepress->get_current_language(); //save current language
			$sitepress->switch_lang($sitepress->get_default_language());
		}
		$query = new \WP_Query(array(
			'post_type' => $this->post_type,
			'posts_per_page' => 10,
			'orderby' => 'title',
			'order' => 'ASC',
			'exclude' => $exclude_id
		));
		$posts = $query->posts;
		if ($sitepress) {
			$sitepress->switch_lang($current_lang); //restore previous language
		}

		$post_types = get_post_types('','objects');
		?>
		<div class="mpfy-carbon-relationship" data-post-type="<?php echo implode(',', $this->post_type) ?>" data-max-values="<?php echo $this->get_max() ?>" data-exclude="<?php echo $exclude_id ?>" data-paged="1" data-name="<?php echo $this->get_name() ?>[]">
			<div class="relationship-left">
				<table class="widefat">
					<thead>
						<tr>
							<th>
								<input type="text" placeholder="<?php esc_attr_e('Search', 'crb') ?>" />
							</th>
						</tr>
					</thead>
				</table>

				<ul class="relationship-list">
					<?php foreach ($posts as $post):
					$type_title = $post->post_type;
					$type_title = isset($post_types[$type_title]->labels->singular_name) ? $post_types[$type_title]->labels->singular_name: $type_title;
					?>
						<li <?php if(in_array($post->ID, $this->value)) echo 'class="inactive"' ?>>
							<a href="#" data-post_id="<?php echo $post->ID ?>">
								<em><?php echo $type_title ?></em>
								<span><!-- plus --></span>
								<?php echo get_the_title($post->ID); ?>
							</a>
						</li>
					<?php endforeach ?>
					<li class="load-more"><span class="spinner"></span></li>
				</ul>
			</div>

			<div class="relationship-right">
				<label><?php _e('Associated:', 'crb'); ?></label>

				<ul class="relationship-list">
					<?php
					foreach ($this->value as $post_id):
						$post = get_post($post_id);
						if ( !$post || !$post_id ) {
							continue;
						}
						$type_title = $post->post_type;
						$type_title = isset($post_types[$type_title]->labels->singular_name) ? $post_types[$type_title]->labels->singular_name: $type_title;
					?>
						<li>
							<a href="#" data-post_id="<?php echo $post->ID ?>"><em><?php echo $type_title ?></em><?php echo get_the_title($post->ID); ?> <span><!-- minus --></span></a>
							<input type="hidden" name="<?php echo $this->get_name() ?>[]" value="<?php echo $post->ID ?>" />
						</li>
					<?php endforeach ?>
				</ul>
			</div>

			<div class="cl">&nbsp;</div>
		</div>
		<?php
	}
}

class Carbon_Field_Image_List extends Carbon_Field_Complex {
	function _render() {
		$container_tag_class_name = mpfy_carbon_clean_class_tag( get_class($this) );
		include 'field_image_list.php';
	}
}

function mpfy_custom_admin_scripts() {
	?>
	<script type="text/javascript">
	(function($, $window, $document){
		$(document).ready(function(){
			$('#tagsdiv-location-tag .inside:first').append('<p>You may assign filters to this map, which will allow your users to filter location results via a dropdown. When you create specific locations within this map, you can then assign these filters to the location.</p>');

			// Map Mode field
			var $settingsContainer = $('.mpfy-map-settings-container:first');
			if ( $settingsContainer.length > 0 ) {
				var settings = JSON.parse( $settingsContainer.attr( 'data-settings' ) );
				var $settingsFieldContainer = $settingsContainer.closest( 'td' );
				$settingsFieldContainer.find( '.mpfy-help-text:first').hide();

				var mapIdLabel = <?php echo json_encode( __( 'Map ID', 'mpfy' ) ); ?>;
				var shortcodeLabel = <?php echo json_encode( __( 'Shortcode', 'mpfy' ) ); ?>;
				var shortcodeClarificationLabel = <?php echo json_encode( __( '(use to place your map)', 'mpfy' ) ); ?>;
				var $contents = $( '\
					<div class="mpfy-flex">\
						<div class="mpfy-flex-column" style="width: 45%;">\
							<div class="mpfy-flex-column-contents"></div>\
						</div>\
						<div class="mpfy-flex-column" style="min-width: 80px; width: 10%;">\
							<div class="mpfy-flex-column-contents">\
								<label>' + mapIdLabel + '</label>\
								<div class="mpfy-carbon-field">' + settings.map_id + '</div>\
							</div>\
						</div>\
						<div class="mpfy-flex-column" style="width: 41%;">\
							<div class="mpfy-flex-column-contents">\
								<label>' + shortcodeLabel + ' <em class="mpfy-help-text">' + shortcodeClarificationLabel + '</em></label>\
								<div class="mpfy-carbon-field">' + settings.shortcode + '</div>\
							</div>\
						</div>\
					</div>\
				' );
				$contents.find( '.mpfy-flex-column-contents:first' ).append( $settingsFieldContainer.find( '> *' ).remove() );
				$settingsFieldContainer.append( $contents );
			}

			// Label fields
			var groups = {};
			$( 'span[data-mpfy-label-group]' ).each( function() {
				var $this = $( this );
				var group = $this.attr( 'data-mpfy-label-group' );
				if ( typeof groups[ group ] === 'undefined' ) {
					groups[ group ] = [];
				}
				groups[ group ].push( $this.closest( 'td' ) );
			} );

			for (var group in groups) {
				var fieldContainers = groups[ group ];
				if ( fieldContainers.length < 2 ) {
					continue;
				}
				var $firstFieldContainer = fieldContainers[0];
				var columns = fieldContainers.length;
				var columnWidth = Math.floor( (100 - ( columns - 1 ) * 2 ) / columns );
				var $helpText = $firstFieldContainer.find( '.mpfy-help-text:first' );

				var $contents = $( '<div class="mpfy-flex"></div>' );
				for (var j = 0; j < fieldContainers.length; j++) {
					var $fieldContainer = fieldContainers[ j ];
					var $field = $fieldContainer.find( '> *').remove();
					var $newfieldContainer = $( '<div class="mpfy-flex-column" style="width: ' + columnWidth + '%;"><div class="mpfy-flex-column-contents"></div></div>' );
					$contents.append( $newfieldContainer.append( $field ) );

					if ( j > 0 ) {
						$fieldContainer.remove();
					}
				}
				$firstFieldContainer.append( $contents );
				if ( $helpText.length > 0 ) {
					$firstFieldContainer.append( $helpText.remove() );
				}
			}
		});

		var styles = <?php echo json_encode(apply_filters('mpfy_google_map_styles', (object) array())); ?>;
		for (var k in styles) {
			styles[k] = eval(styles[k]);
		}

		var current_map_id = -1;
		function mpfy_update_map_layout() {
			var f = '_map_location_google_location';
			var efo = $('.mpfy-carbon-map-with-address[data-name="' + f +'"]').data('exposed_field_object');
			if (!efo) {
				return false; // map object has not been initialized
			}

			new_map_id = $('select[name="_map_location_map"], input[name="_map_location_map[]"]:first').val();
			if (new_map_id == current_map_id) {
				return false; // map has not been changed
			}

			current_map_id = new_map_id;
			if (!current_map_id) {
				return false; // no map selected
			}

			$('.mpfy-carbon-field[data-name="' + f +'"]').after('<div id="map-loading"><em>Loading your map settings ...</em></div>');

			var promise = $.get("<?php echo admin_url('admin-ajax.php'); ?>", {
				'action': 'mpfy_get_map_settings',
				'pid': current_map_id
			}, 'json');
			promise.done(function(response) {
				response = $.parseJSON(response);

				var settings = {
					'efo': efo,
					'div': $('.mpfy-carbon-map[data-name="_map_location_google_location"] .mpfy-carbon-map-canvas:first'),
					'mode': response.mode,
					'bg_color': response.background,
					'map_options': [],

					'style': response.style,
					'terrain_mode': response.terrain_mode,
					'response': response
				};

				$('body').trigger($.Event('mpfy_admin_map_location_map_updated', {
					mpfy: {
						'settings': settings
					}
				}));

				settings.div.css('background-color', settings.bg_color);

				if ( settings.mode == 'map' ) {
					settings.efo.setMapType( settings.terrain_mode );
				}
			});
			promise.always(function() {
				$('#map-loading').remove();
			});
			promise.error(function() {
				alert('There was a problem loading the selected map\'s settings.');
			});
		}

		if ($('.mpfy-carbon-map-with-address[data-name="_map_location_google_location"]').length > 0) {
			setInterval(mpfy_update_map_layout, 2000);
		}

	})(jQuery, jQuery(window), jQuery(document));
	</script>
	<?php
}
add_action('admin_footer', 'Mpfy\Carbon\mpfy_custom_admin_scripts');
