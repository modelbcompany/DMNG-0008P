<?php

use \Mpfy\Carbon\Carbon_Field;

// Register the map tag taxonomy
add_action( 'mpfy_post_types_registered', 'mpfy_mt_register_taxonomy' );
function mpfy_mt_register_taxonomy() {
	$tag_post_types = mpfy_get_supported_post_types();
	$tag_post_types[] = 'map';
	register_taxonomy( 'location-tag', $tag_post_types, array(
		'hierarchical'            => false,
		'labels'                  => array(
			'name'                         => _x( 'Map Filter Tags', 'taxonomy general name' ),
			'singular_name'                => _x( 'Location Tag', 'taxonomy singular name' ),
			'search_items'                 => __( 'Search Location Tags' ),
			'popular_items'                => __( 'Popular Location Tags' ),
			'all_items'                    => __( 'All Location Tags' ),
			'parent_item'                  => null,
			'parent_item_colon'            => null,
			'edit_item'                    => __( 'Edit Location Tag' ),
			'update_item'                  => __( 'Update Location Tag' ),
			'add_new_item'                 => __( 'Add New Location Tag' ),
			'new_item_name'                => __( 'New Location Tag Name' ),
			'separate_items_with_commas'   => __( 'Separate Location Tags with commas' ),
			'add_or_remove_items'          => __( 'Add or remove Location Tags' ),
			'choose_from_most_used'        => __( 'Choose from the most used Location Tags' ),
			'not_found'                    => __( 'No Location Tags found.' ),
			'menu_name'                    => __( 'Location Tags' )
		),
		'show_ui'                 => true,
		'show_admin_column'       => true,
		'update_count_callback'   => '_update_post_term_count',
		'query_var'               => true,
		'rewrite'                 => array( 'slug' => 'Location Tag' )
	) );
}

// Provide an ajax service which reports map tags
add_action('wp_ajax_mpfy_get_map_tags', 'mpfy_ajax_mpfy_get_map_tags');
function mpfy_ajax_mpfy_get_map_tags() {
	$pids = array_filter( array_map( 'intval', explode( ',', $_GET['mids'] ) ) );

	$response = array();
	foreach ($pids as $pid) {
		$r = array(
			'map'=>array(
				'name'=>get_the_title( $pid ),
			),
			'tags'=>wp_get_object_terms( $pid, 'location-tag' ),
		);
		$response[$pid] = $r;
	}

	echo json_encode( $response );
	exit;
}

// Load custom carbon field
add_action( 'mpfy_carbon_register_fields', 'mpfy_mt_attach_carbon_custom_classes', 11 );
function mpfy_mt_attach_carbon_custom_classes() {
	include_once( 'carbon.php' );
}

// Add relevant admin fields
add_filter( 'mpfy_map_location_custom_fields', 'mpfy_mt_map_location_custom_fields' );
function mpfy_mt_map_location_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_location_map', array(
		'map_location_tags'=>Carbon_Field::factory( 'map_tags', 'map_location_tags', __( 'Map Tags', 'mpfy' ) ),
	) );

	return $custom_fields;
}

add_filter( 'mpfy_map_custom_fields_search_filter', 'mpfy_mt_map_custom_fields' );
function mpfy_mt_map_custom_fields( $custom_fields ) {

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_enable_search', array(
		'map_enable_filters'=>Carbon_Field::factory( 'select', 'map_enable_filters', __( 'Enable Filter Dropdown', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' )),
		'map_enable_filters_list'=>Carbon_Field::factory( 'select', 'map_enable_filters_list', __( 'Enable Filter List', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' )),
	) );

	$custom_fields = mpfy_array_push_key( $custom_fields, 'map_search_center', array(
		'map_filters_center'=>Carbon_Field::factory( 'select', 'map_filters_center', __( 'Center Map on Filters', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' )),
	) );

	return $custom_fields;
}

add_filter( 'mpfy_map_tags', 'mpfy_mt_filter_map_tags', 10, 2 );
function mpfy_mt_filter_map_tags( $tags, $map_id ) {
	return wp_get_object_terms( $map_id, 'location-tag', array('hide_empty'=>0) );
}

add_filter( 'mpfy_map_filters_enabled', 'mpfy_mt_filter_map_filters_enabled', 10, 2 );
function mpfy_mt_filter_map_filters_enabled( $enabled, $map_id ) {
	return mpfy_meta_to_bool( $map_id, '_map_enable_filters', false );
}

add_filter( 'mpfy_map_filters_list_enabled', 'mpfy_mt_filter_map_filters_list_enabled', 10, 2 );
function mpfy_mt_filter_map_filters_list_enabled( $enabled, $map_id ) {
	return mpfy_meta_to_bool( $map_id, '_map_enable_filters_list', false );
}