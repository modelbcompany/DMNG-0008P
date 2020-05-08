<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_custom_fields_tooltip_marker', 'mpfy_mlt_map_custom_fields' );
function mpfy_mlt_map_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_animate_tooltips', array(
		'map_tooltip_image_orientation'=>Carbon_Field::factory( 'select', 'map_tooltip_image_orientation', __( 'Tooltip Image Orientation', 'mpfy' ) )
			->add_options( array( 'top' => 'Top', 'left' => 'Left' ) )
			->help_text( 'Specify placement of the thumbnail image on the left or top of the text in the tooltip (must upload a "featured image" in sidebar).' ),
	));

	return $custom_fields;
}

add_filter( 'mpfy_map_tooltip_image_orientation', 'mpfy_mlt_filter_map_tooltip_image_orientation', 10, 2 );
function mpfy_mlt_filter_map_tooltip_image_orientation( $orientation, $map_id ) {
	$value = get_post_meta( $map_id, '_map_tooltip_image_orientation', true );
	$value = $value ? $value : $orientation;
	return $value;
}

add_filter( 'mpfy_map_location_thumbnail', 'mpfy_mlt_filter_map_location_thumbnail', 10, 2 );
function mpfy_mlt_filter_map_location_thumbnail( $thumbnail, $map_location_id ) {
	return get_the_post_thumbnail( $map_location_id );
}
