<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_location_custom_fields', 'mpfy_mlpi_map_location_custom_fields' );
function mpfy_mlpi_map_location_custom_fields( $custom_fields ) {
	$custom_fields = mpfy_array_push_key($custom_fields, 'position_after_tooltip', array(
		'position_before_pin'=>'',
		'map_location_pin'=>Carbon_Field::factory( 'image_pin', 'map_location_pin', __( 'Pin Image', 'mpfy' ) )
			->attach_to_map('map_location_google_location')
			->help_text('You may select a custom pin image to be used for this location only. Leave blank to use the dafault pin.'),
		'position_after_pin'=>'',
	));

	return $custom_fields;
}

add_filter( 'mpfy_map_location_pin_image', 'mpfy_mlpi_map_location_apply_pin_image', 10, 3 );
function mpfy_mlpi_map_location_apply_pin_image( $image, $pin_id, $map_id ) {
	$pin_image = get_post_meta( $pin_id, '_map_location_pin', true );
	if ( $pin_image ) {
		$image = $pin_image;
	}
	return $image;
}
