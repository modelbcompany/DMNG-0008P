<?php

use \Mpfy\Carbon\Carbon_Container;
use \Mpfy\Carbon\Carbon_Field;

add_filter('mpfy_map_location_custom_fields', 'mpfy_mll_map_location_custom_fields');
function mpfy_mll_map_location_custom_fields($custom_fields) {

	$custom_fields = mpfy_array_push_key($custom_fields, 'map_location_tooltip', array(
		'map_location_mll_include'=>Carbon_Field::factory( 'select', 'map_location_mll_include', __( 'Include on Selected Map(s) Location List?', 'mpfy' ) )
			->add_options(array('y'=>'Yes', 'n'=>'No')),

		'map_location_mll_description'=>Carbon_Field::factory( 'textarea', 'map_location_mll_description', __( 'Short Description', 'mpfy' ) )
			->help_text('Short description of the location that appears in the Interactive List. Note that this is independent of the tooltip and main description area that appears in the pop-up.'),
	));

	return $custom_fields;
}

add_action( 'mpfy_post_tooltip_settings_container', 'mpfy_mll_register_location_list_container' );
function mpfy_mll_register_location_list_container() {
	$fields = array(
		'position_start'=>'',

		'map_mll_include'=>Carbon_Field::factory( 'select', 'map_mll_include', __( 'Enable', 'mpfy' ) )
			->add_options(array('n'=>'No', 'y'=>'Yes'))
			->help_text('Adds locations below the map in an organized, interactive list.'),

		'map_mll_number_of_locations'=>Carbon_Field::factory( 'text', 'map_mll_number_of_locations', __( 'Number of locations in list', 'mpfy' ) )
			->set_default_value(3)
			->help_text('Specify how many locations appear in list before pagination.'),

		'map_mll_hide_in_default_view'=>Carbon_Field::factory( 'select', 'map_mll_hide_in_default_view', __( 'Hide list by default', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' ))
			->help_text( 'Only the relevant results display in the list beneath the map after a search is performed, or a filter is selected.' ),

		'map_location_list_labels_separator'=>Carbon_Field::factory( 'separator', 'map_location_list_labels_separator', __( 'Buttons', 'mpfy' ) ),

		'map_label_interactive_list_open_popup_button'=>Carbon_Field::factory( 'text', 'map_label_interactive_list_open_popup_button', __( 'Open Pop-up Button Label', 'mpfy' ) )
			->set_default_value( 'More Details' )
			->help_text( '<span data-mpfy-label-group="location_list"></span>' . __( 'You may change the default text found in the interactive list feature here', 'mpfy' ) ),

		'map_label_interactive_list_directions_button'=>Carbon_Field::factory( 'text', 'map_label_interactive_list_directions_button', __( 'Directions Button Label', 'mpfy' ) )
			->set_default_value( 'Get Directions' )
			->help_text( '<span data-mpfy-label-group="location_list"></span>' ),

		'map_label_interactive_list_open_popup_bgcolor' => Carbon_Field::factory( 'color', 'map_label_interactive_list_open_popup_bgcolor', __( 'Open Pop-up Button Background', 'mpfy' ) )
			->set_default_value('#61849c'),

		'map_label_interactive_list_open_popup_color' => Carbon_Field::factory( 'color', 'map_label_interactive_list_open_popup_color', __( 'Open Pop-up Button Text Color', 'mpfy' ) )
			->set_default_value('#ffffff'),

		'map_label_interactive_list_directions_bgcolor' => Carbon_Field::factory( 'color', 'map_label_interactive_list_directions_bgcolor', __( 'Directions Button Background', 'mpfy' ) )
			->set_default_value('#d2845b'),

		'map_label_interactive_list_directions_color' => Carbon_Field::factory( 'color', 'map_label_interactive_list_directions_color', __( 'Directions Button Text Color', 'mpfy' ) )
			->set_default_value('#ffffff'),

		'map_label_interactive_list_buttons_hover_bgcolor' => Carbon_Field::factory( 'color', 'map_label_interactive_list_buttons_hover_bgcolor', __( 'Buttons Hover Background Color', 'mpfy' ) )
			->set_default_value('#ffffff'),

		'map_label_interactive_list_buttons_hover_color' => Carbon_Field::factory( 'color', 'map_label_interactive_list_buttons_hover_color', __( 'Buttons Hover Text Color', 'mpfy' ) )
			->set_default_value('#000000'),

		'position_end'=>'',
	);
	$fields = apply_filters( 'mpfy_map_custom_fields_location_list', $fields );
	$fields = array_filter( $fields );

	Carbon_Container::factory( 'custom_fields', 'Interactive List of Locations Settings' )
		->show_on_post_type( 'map' )
		->add_fields( array_values( $fields ) );
}

add_action('mpfy_template_after_map', 'mpfy_mll_template_after_map');
function mpfy_mll_template_after_map($map_id) {
	$enabled = mpfy_meta_to_bool($map_id, '_map_mll_include', false);
	if (!$enabled) {
		return;
	}

	$map = new Mpfy_Map($map_id);
	$locations = $map->get_locations();
	$number_of_locations = get_post_meta($map_id, '_map_mll_number_of_locations', true);
	$number_of_locations = max(0, abs(intval($number_of_locations)));
	$number_of_locations = $number_of_locations == 0 ? 3 : $number_of_locations;
	$hide_in_default_view = mpfy_meta_to_bool($map_id, '_map_mll_hide_in_default_view', false);

	include('templates/list.php');
}

function mpfy_location_list_open_popup_bgcolor( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_open_popup_bgcolor', true );
	if ( empty( $meta_color ) ) {
		return '#61849c';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_open_popup_bgcolor', 'mpfy_location_list_open_popup_bgcolor', 10, 2 );

function mpfy_location_list_get_directions_bgcolor( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_directions_bgcolor', true );
	if ( empty( $meta_color ) ) {
		return '#d2845b';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_get_directions_bgcolor', 'mpfy_location_list_get_directions_bgcolor', 10, 2 );

function mpfy_location_list_open_popup_color( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_open_popup_color', true );
	if ( empty( $meta_color ) ) {
		return '#ffffff';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_open_popup_color', 'mpfy_location_list_open_popup_color', 10, 2 );

function mpfy_location_list_get_directions_color( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_directions_color', true );
	if ( empty( $meta_color ) ) {
		return '#ffffff';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_get_directions_color', 'mpfy_location_list_get_directions_color', 10, 2 );

function mpfy_location_list_button_hover_bgcolor( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_buttons_hover_bgcolor', true );
	if ( empty( $meta_color ) ) {
		return '#ffffff';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_button_hover_bgcolor', 'mpfy_location_list_button_hover_bgcolor', 10, 2 );

function mpfy_location_list_button_hover_color( $color, $map_id ) {
	$meta_color = get_post_meta( $map_id, '_map_label_interactive_list_buttons_hover_color', true );
	if ( empty( $meta_color ) ) {
		return '#ffffff';
	}

	return $meta_color;
}
add_filter( 'mpfy_location_list_button_hover_color', 'mpfy_location_list_button_hover_color', 10, 2 );
