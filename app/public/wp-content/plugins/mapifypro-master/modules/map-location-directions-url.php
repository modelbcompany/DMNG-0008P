<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_location_custom_fields', 'mpfy_mldu_map_location_custom_fields' );
function mpfy_mldu_map_location_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_unshift_key( $custom_fields, 'position_after_address', array(
		'map_location_directions_url'=>Carbon_Field::factory( 'text', 'map_location_directions_url', __( 'Directions URL', 'mpfy' ) )
			->help_text('Allows you to specify a directions url to use for all directions links. Leave blank to use the geocoordinates instead (default). <a href="https://mapifypro.zendesk.com/hc/en-us/articles/229649228-How-do-I-Force-Directions-to-a-Specific-Address" target="_blank">More Info Here</a>'),
	) );

	return $custom_fields;
}
