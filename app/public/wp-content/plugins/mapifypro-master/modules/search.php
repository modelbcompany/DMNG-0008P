<?php

use \Mpfy\Carbon\Carbon_Container;
use \Mpfy\Carbon\Carbon_Field;

add_action( 'mpfy_post_basic_settings_container', 'mpfy_s_register_search_filter_container' );
function mpfy_s_register_search_filter_container() {
	$fields = array(
		'position_start'=>'',

		'map_enable_search'=>Carbon_Field::factory( 'select', 'map_enable_search', __( 'Enable Search', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' ))
			->help_text( '(map mode only)' ),

		'map_search_center'=>Carbon_Field::factory( 'select', 'map_search_center', __( 'Center Map on Search Results', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' )),

		'map_search_filter_labels_separator'=>Carbon_Field::factory( 'separator', 'map_search_filter_labels_separator', __( 'Text / Labels', 'mpfy' ) ),

		'map_label_filter_dropdown'=>Carbon_Field::factory( 'text', 'map_label_filter_dropdown', __( 'Filter Dropdown', 'mpfy' ) )
			->set_default_value( 'Default View' )
			->help_text( '<span data-mpfy-label-group="search_filter"></span>' . __( 'You may change the default text found in the filter and search filters here', 'mpfy' ) ),

		'map_label_filter_list'=>Carbon_Field::factory( 'text', 'map_label_filter_list', __( 'Filter List', 'mpfy' ) )
			->set_default_value( 'Default View' )
			->help_text( '<span data-mpfy-label-group="search_filter"></span>' ),

		'map_label_search'=>Carbon_Field::factory( 'text', 'map_label_search', __( 'Search', 'mpfy' ) )
			->set_default_value( 'Search city or zip code' )
			->help_text( '<span data-mpfy-label-group="search_filter"></span>' ),

		'map_label_search_within'=>Carbon_Field::factory( 'text', 'map_label_search_within', __( 'Search Within', 'mpfy' ) )
			->set_default_value( 'Within' )
			->help_text( '<span data-mpfy-label-group="search_filter"></span>' ),


		'position_end'=>'',
	);
	$fields = apply_filters( 'mpfy_map_custom_fields_search_filter', $fields );
	$fields = array_filter( $fields );

	Carbon_Container::factory( 'custom_fields', 'Search & Filter Settings' )
		->show_on_post_type( 'map' )
		->add_fields( array_values( $fields ) );
}

add_action( 'mpfy_post_basic_settings_container', 'mpfy_s_register_search_radius_container' );
function mpfy_s_register_search_radius_container() {
	$fields = array(
		'position_start'=>'',

		'map_search_radius'=>Carbon_Field::factory( 'text', 'map_search_radius', __( 'Search Radius', 'mpfy' ) )
			->set_default_value(5),

		'map_search_radius_unit'=>Carbon_Field::factory( 'select', 'map_search_radius_unit', __( 'Search Radius Unit', 'mpfy' ) )
			->add_options(array( 'mi' => 'Miles', 'km' => 'Kilometers' )),

		'map_search_region_bias'=>Carbon_Field::factory( 'text', 'map_search_region_bias', __( 'Search Region Bias', 'mpfy' ) )
			->set_default_value('')
			->help_text('Optional. Used to help search choose between similarly named locations in different regions. Use an <a href="https://en.wikipedia.org/wiki/ISO_3166-1" target="_blank">ISO 3166-1</a> country code e.g. "UK" instead of "United Kingdom"'),

		'position_end'=>'',
	);
	$fields = apply_filters( 'mpfy_map_custom_fields_search_radius', $fields );
	$fields = array_filter( $fields );

	Carbon_Container::factory( 'custom_fields', 'Search Radius Settings' )
		->show_on_post_type( 'map' )
		->add_fields( array_values( $fields ) );
}

add_filter( 'mpfy_map_location_custom_fields', 'mpfy_s_map_location_custom_fields', 9 );
function mpfy_s_map_location_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'position_after_map', array(
		'position_before_address'=>'',
		'map_location_separator_4'=>Carbon_Field::factory( 'separator', 'map_location_separator_4', __( 'Address Details', 'mpfy' ) ),
		'map_location_address'=>Carbon_Field::factory( 'text', 'map_location_address', __( 'Address Line 1', 'mpfy' ) ),
		'map_location_address_2'=>Carbon_Field::factory( 'text', 'map_location_address_2', __( 'Address Line 2', 'mpfy' ) ),
		'map_location_city'=>Carbon_Field::factory( 'text', 'map_location_city', __( 'City', 'mpfy' ) ),
		'map_location_state'=>Carbon_Field::factory( 'text', 'map_location_state', __( 'State', 'mpfy' ) ),
		'map_location_zip'=>Carbon_Field::factory( 'text', 'map_location_zip', __( 'Zip', 'mpfy' ) ),
		'map_location_country'=>Carbon_Field::factory( 'text', 'map_location_country', __( 'Country', 'mpfy' ) ),
		'position_after_address'=>'',
	) );

	return $custom_fields;
}

add_filter( 'mpfy_map_search_enabled', 'mpfy_s_filter_map_search_enabled', 10, 2 );
function mpfy_s_filter_map_search_enabled( $enabled, $map_id ) {
	return mpfy_meta_to_bool( $map_id, '_map_enable_search', false );
}

add_filter( 'mpfy_map_search_center', 'mpfy_s_filter_map_search_center', 10, 2 );
function mpfy_s_filter_map_search_center( $enabled, $map_id ) {
	return mpfy_meta_to_bool( $map_id, '_map_search_center', false );
}

add_filter( 'mpfy_map_search_radius_unit', 'mpfy_s_filter_map_search_radius_unit', 10, 2 );
function mpfy_s_filter_map_search_radius_unit( $search_radius_unit, $map_id ) {
	$value = get_post_meta( $map_id, '_map_search_radius_unit', true );
	$value = ($value == 'km') ? 'km' : 'mi';
	return $value;
}

add_filter( 'mpfy_map_search_radius', 'mpfy_s_filter_map_search_radius', 10, 2 );
function mpfy_s_filter_map_search_radius( $search_radius, $map_id ) {
	return max( 1, intval( get_post_meta( $map_id, '_map_search_radius', true ) ) );
}

add_filter( 'mpfy_map_search_region_bias', 'mpfy_s_filter_map_search_region_bias', 10, 2 );
function mpfy_s_filter_map_search_region_bias( $region_bias, $map_id ) {
	return get_post_meta( $map_id, '_map_search_region_bias', true );
}