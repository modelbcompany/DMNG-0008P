<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_custom_fields_basic', 'mpfy_uml_map_custom_fields' );
function mpfy_uml_map_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_enable_zoom_manual', array(
		'map_enable_use_my_location'=>Carbon_Field::factory( 'select', 'map_enable_use_my_location', __( 'Enable "Use My Location"', 'mpfy' ) )
		->add_options( array( 'no' => 'No', 'yes' => 'Yes' ) ),
	) );

	return $custom_fields;
}

add_filter( 'mpfy_map_enable_use_my_location', 'mpfy_uml_filter_map_enable_use_my_location', 10, 2 );
function mpfy_uml_filter_map_enable_use_my_location( $enabled, $map_id ) {
	return mpfy_meta_to_bool( $map_id, '_map_enable_use_my_location', false );
}
