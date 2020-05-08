<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter( 'mpfy_map_custom_fields_basic', 'mpfy_ttd_map_custom_fields' );
function mpfy_ttd_map_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_enable_zoom_manual', array(
		'map_basic_labels_separator'=>Carbon_Field::factory( 'separator', 'map_basic_labels_separator', __( 'Popup Text / Labels', 'mpfy' ) ),

		'map_label_directions_button'=>Carbon_Field::factory( 'text', 'map_label_directions_button', __( 'Directions Button', 'mpfy' ) )
			->set_default_value( 'Get Directions' )
			->help_text( '<span data-mpfy-label-group="basic"></span>' . __( 'You may change the default text found in the location pop-ups here', 'mpfy' ) ),
	));

	return $custom_fields;
}

add_filter( 'mpfy_map_location_custom_fields', 'mpfy_ttd_map_location_custom_fields' );
function mpfy_ttd_map_location_custom_fields( $custom_fields ) {

	$custom_fields['map_location_tooltip']->help_text('This is the brief text that appears in the tooltip when a user hovers over this location. You may use basic html text formatting, such as &lt;br&gt;, &lt;i&gt;, etc.<br />You can use the [directions] shortcode to display a directions link for Google Maps mode.');

	return $custom_fields;
}

add_filter( 'mpfy_map_location_tooltip_text', 'mpfy_ttd_map_location_tooltip_text', 10, 3 );
function mpfy_ttd_map_location_tooltip_text( $text, $map_location_id, $map_id ) {
	$map_location = new Mpfy_Map_location( $map_location_id );
	$directions_url = $map_location->get_directions_url();
	$button_label = mpfy_meta_label( $map_id, '_map_label_directions_button', 'Get Directions' );
	$text = str_replace('[directions]', '<div class="mpfy-tooptip-actions"><a href="' . $directions_url . '" target="_blank">' . $button_label . '<span><strong></strong></span></a></div>', $text);
	return $text;
}
