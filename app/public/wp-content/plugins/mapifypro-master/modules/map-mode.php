<?php

use \Mpfy\Carbon\Carbon_Container;
use \Mpfy\Carbon\Carbon_Field;

add_action( 'mpfy_post_tooltip_settings_container', 'mpfy_mll_register_map_mode_container' );
function mpfy_mll_register_map_mode_container() {
	$fields = array(
		'position_start'=>'',

		'map_type'=>Carbon_Field::factory( 'select', 'map_google_mode', __( 'Style', 'mpfy' ) )
			->add_options( array( 'road' => 'MapifyPro Default', 'terrain' => 'Terrain', 'grayscale' => 'Grayscale', 'blue_earth' => 'Blue Earth', 'watercolor' => 'Watercolor', 'ink' => 'Ink', 'pastel' => 'Pastel' ) ),

		'position_end'=>'',
	);
	$fields = apply_filters( 'mpfy_map_custom_fields_map_mode', $fields );
	$fields = array_filter( $fields );

	Carbon_Container::factory( 'custom_fields', 'Map Mode Settings' )
		->show_on_post_type( 'map' )
		->add_fields( array_values( $fields ) );
}

add_filter( 'mpfy_map_type', 'mpfy_mtype_filter_map_type', 10, 2 );
function mpfy_mtype_filter_map_type( $enabled, $map_id ) {
	$value = get_post_meta( $map_id, '_map_google_mode', true );
	$value = strtolower( $value );
	$supported_types = array( 'road', 'terrain', 'grayscale', 'blue_earth', 'watercolor', 'ink', 'pastel' );
	$value = in_array( $value, $supported_types ) ? $value : 'road';
	return $value;
}