<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_location_custom_fields', 'mpfy_pldd_map_location_custom_fields' );
function mpfy_pldd_map_location_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_location_popup_location_information', array(
		'map_location_popup_directions'=>Carbon_Field::factory( 'select', 'map_location_popup_directions', __( 'Include Directions', 'mpfy' ) )
			->add_options( array( 'yes' => 'Yes', 'no' => 'No' ) )
			->help_text( 'Shows or hides the directions button in the location popup.' ),
	));

	return $custom_fields;
}

add_action( 'mpfy_popup_location_information', 'mpfy_pldd_display_button', 9, 2 );
function mpfy_pldd_display_button( $location_id, $map_id ) {
	$map = new Mpfy_Map( $map_id );
	$map_location = new Mpfy_Map_Location( $location_id );

	$map_mode = $map->get_mode();

	$popup_directions = mpfy_meta_to_bool( $location_id, '_map_location_popup_directions', true );
	$popup_location_information = mpfy_meta_to_bool( get_the_ID(), '_map_location_popup_location_information', true );

	if ( ! $popup_directions || $map_mode !== 'map' ) {
		return;
	}

	// directions
	$directions_url = $map_location->get_directions_url();
	$button_label = mpfy_meta_label( $map_id, '_map_label_directions_button', 'Get Directions' );
	?>
	<aside class="mpfy-p-widget mpfy-p-widget-direction <?php echo ( $popup_location_information ) ? 'mpfy-p-widget-direction-with-location' : 'mpfy-p-widget-direction-without-location'; ?>">
		<a href="<?php echo $directions_url; ?>" target="_blank" class="mpfy-p-bg-gray mpfy-p-color-accent-background"><?php echo $button_label; ?></a>
	</aside>
	<?php
}
