<?php

use \Mpfy\Carbon\Carbon_Container;
use \Mpfy\Carbon\Carbon_Field;

$map_choices = array( 0=>'None' ) + Mpfy_Map::get_all_maps();

$map_location_custom_fields = array(
	'position_start'=>'',

	'map_location_map'=>Carbon_Field::factory( 'select', 'map_location_map', __( 'Map', 'mpfy' ) )
		->add_options( $map_choices )
		->help_text( 'Need more than one map? <a href="http://www.mapifypro.com/" target="_blank">Upgrade to MapifyPro!</a>' ),

	'position_before_popup'=>'',
	'map_location_tooltip_enabled'=>Carbon_Field::factory( 'select', 'map_location_tooltip_enabled', __( 'Enable Popup', 'mpfy' ) ) // mislabeled - this refers to the popup, not tooltip
		->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) ),
	'position_after_popup'=>'',

	'map_location_tooltip_show'=>Carbon_Field::factory( 'select', 'map_location_tooltip_show', __( 'Enable Tooltip', 'mpfy' ) )
		->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) ),
	'map_location_tooltip_close'=>Carbon_Field::factory( 'select', 'map_location_tooltip_close', __( 'Close Tooltip', 'mpfy' ) )
		->add_options( array( 'auto' => 'Automatically', 'manual' => 'Manually' ) )
		->help_text( '<strong>Automatically:</strong> This will cause the tooltip to automatically hide when the user hovers off the location.<br /><strong>Manually:</strong> Good if you want to add links to the tooltip.' ),
	'map_location_tooltip'=>Carbon_Field::factory( 'textarea', 'map_location_tooltip', __( 'Tooltip', 'mpfy' ) )
		->help_text( 'This is the brief text that appears in the tooltip when a user hovers over this location. You may use basic html text formatting, such as &lt;br&gt;, &lt;i&gt;, etc.' ),
	'position_after_tooltip'=>'',

	'position_before_gallery'=>'',
	'map_location_separator_2'=>Carbon_Field::factory( 'separator', 'map_location_separator_2', __( 'Gallery Settings', 'mpfy' ) ),
	'map_location_video_embed'=>Carbon_Field::factory( 'textarea', 'map_location_video_embed', __( 'Video Embed Code', 'mpfy' ) )
		->help_text( 'Use Vimeo or YouTube iframe video embed codes to include a video in your location’s pop-up gallery. If left blank, the gallery will revert to an image gallery only.' ),
	'position_after_video'=>'',
	'map_location_gallery_images'=>Carbon_Field::factory( 'image_list', 'map_location_gallery_images', __( 'Gallery Images', 'mpfy' ) )
		->setup_labels( array(
			'singular_name'=>'Image',
			'plural_name'=>'Images',
		) )
		->add_fields( array(
			Carbon_Field::factory( 'image', 'image', __( 'Image', 'mpfy' ) ),
		) ),
	'position_after_gallery'=>'',

	'position_before_map'=>'',
	'map_location_google_location'=>Carbon_Field::factory( 'leaflet_map', 'map_location_google_location', __( 'Location <em>(Enter address and hit enter/return to locate)</em>', 'mpfy' ) ),
	'position_after_map'=>'',

	'position_end'=>'',
);

$map_location_custom_fields = apply_filters( 'mpfy_map_location_custom_fields', $map_location_custom_fields );
$map_location_custom_fields = array_filter( $map_location_custom_fields ); // clear positions

Carbon_Container::factory( 'custom_fields', MAPIFY_PLUGIN_NAME . ' Options' )
	->show_on_post_type( mpfy_get_supported_post_types() )
	->add_fields( array_values( $map_location_custom_fields ) );

$raw = get_posts( 'post_type=map-location&posts_per_page=-1&orderby=title&order=asc' );
$locations = array( '0'=>'<Manual center and zoom>' );
foreach ( $raw as $r ) {
	$ml = new Mpfy_Map_Location( $r->ID );
	$coords = $ml->get_coordinates();

	if ( $coords ) {
		$locations[$ml->get_id()] = $ml->get_title();
	} else {
		// Dynamically update coordinates meta field
		$lat = mpfy_carbon_get_post_meta( $r->ID, 'map_location_google_location_lat' );
		$lng = mpfy_carbon_get_post_meta( $r->ID, 'map_location_google_location_lng' );

		$coords = array( $lat, $lng );
		$coords = array_filter( $coords );

		if ( ! empty( $coords ) ) {
			$coords = implode( ',', $coords );
			update_post_meta( $r->ID, '_map_location_google_location', $coords );

			$locations[$r->ID] = $r->post_title;
		}
	}
}

$map_custom_fields = array(
	'basic' => array(
		'position_start'=>'',

		'map_pin'=>Carbon_Field::factory( 'image_pin', 'map_pin', __( 'Default Pin Image', 'mpfy' ) )
			->attach_to_map( 'map_google_center' )
			->help_text( 'This image will serve as a default pinpoint for your map. PNG file with transparent background is suggested (supports jpg, gif, png).' ),

		'map_pins_hide_initially' => Carbon_Field::factory( 'select', 'map_pins_hide_initially', __( 'Hide Locations by default', 'mpfy' ) )
			->add_options( array(
				'no' => 'No',
				'yes' => 'Yes',
			) ),

		'map_enable_zoom'=>Carbon_Field::factory( 'select', 'map_enable_zoom', __( 'Enable Mouse Zoom', 'mpfy' ) )
			->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) ),

		'map_enable_zoom_manual'=>Carbon_Field::factory( 'select', 'map_enable_zoom_manual', __( 'Enable Manual Zoom', 'mpfy' ) )
			->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) ),

		'position_end'=>'',
	),

	'tooltip_marker' => array(
		'position_start'=>'',

		'map_animate_tooltips'=>Carbon_Field::factory( 'select', 'map_animate_tooltips', __( 'Animated Tooltips?', 'mpfy' ) )
			->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) )
			->help_text( 'Add a subtle animation to the tooltip that appears when hovering on a location.' ),

		'map_animate_pinpoints'=>Carbon_Field::factory( 'select', 'map_animate_pinpoints', __( 'Animated Pinpoints?', 'mpfy' ) )
			->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) )
			->help_text( 'Add a subtle animation to the pinpoints as they populate the map.' ),

		'position_end'=>'',
	),

	'zoom_and_location' => array(
		'position_start'=>'',

		'map_main_location'=>Carbon_Field::factory( 'select_location', 'map_main_location', __( 'Main Location', 'mpfy' ) )
			->add_options( $locations ),

		'map_google_center'=>Carbon_Field::factory( 'map_mpfy', 'map_google_center', __( 'Initial Zoom and Style Preview', 'mpfy' ) )
			->help_text( 'Use this map to preview the style, and to set your default zoom level. You may also drag and drop center location as needed.' ),

		'position_end'=>'',
	),
);

$map_modes = Mpfy_Map::get_map_modes();
$post_id = ( isset( $_GET['post'] ) ? $_GET['post'] : '' );
$map_mode_settings = array(
	'map_id' => $post_id,
	'shortcode' => '[custom-mapping map_id="' . $post_id . '" height="300"]',
);
$map_custom_fields['basic'] = mpfy_array_push_key( $map_custom_fields['basic'], 'position_start', array(
	'map_mode'=>Carbon_Field::factory( 'map_mode', 'map_mode', __( 'Mode', 'mpfy' ) )
		->add_options( $map_modes )
		->help_text( '<span class="mpfy-map-settings-container" data-settings="' . esc_attr( json_encode( $map_mode_settings ) ) . '"></span>' ),
) );

foreach ( $map_custom_fields as $group => $fields ) {
	$map_custom_fields[ $group ] = apply_filters( 'mpfy_map_custom_fields_' . $group, $map_custom_fields[ $group ] );
	$map_custom_fields[ $group ] = array_filter( $map_custom_fields[ $group ] ); // clear positions
}

do_action( 'mpfy_pre_containers' );

Carbon_Container::factory( 'custom_fields', 'Basic Settings' )
	->show_on_post_type( 'map' )
	->add_fields( array_values( $map_custom_fields['basic'] ) );

do_action( 'mpfy_post_basic_settings_container' );

Carbon_Container::factory( 'custom_fields', 'Tooltip & Marker / Pinpoint Settings' )
	->show_on_post_type( 'map' )
	->add_fields( array_values( $map_custom_fields['tooltip_marker'] ) );

do_action( 'mpfy_post_tooltip_settings_container' );

Carbon_Container::factory( 'custom_fields', 'Default Zoom Level and Location Settings' )
	->show_on_post_type( 'map' )
	->add_fields( array_values( $map_custom_fields['zoom_and_location'] ) );

Carbon_Container::factory( 'term_meta', 'Category Options' )
	->show_on_taxonomy( 'location-tag' )
	->add_fields( array(
		Carbon_Field::factory( 'attachment', 'mpfy_location_tag_image', __( 'Image', 'mpfy' ) )
	) );

$plugin_settings = array();
$plugin_settings = apply_filters( 'mpfy_plugin_settings', $plugin_settings );

if ( ! empty( $plugin_settings ) ) {
	Carbon_Container::factory( 'theme_options', MAPIFY_PLUGIN_NAME . ' Settings' )
		->set_page_parent( 'mapify.php' )
		->add_fields( $plugin_settings );
}
