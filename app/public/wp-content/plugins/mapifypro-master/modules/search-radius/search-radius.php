<?php

use \Mpfy\Carbon\Carbon_Field;

add_filter('mpfy_map_custom_fields_search_radius', 'mpfy_sr_map_custom_fields');
function mpfy_sr_map_custom_fields($custom_fields) {
	$custom_fields = mpfy_array_push_key($custom_fields, 'map_search_region_bias', array(
		'map_enable_search_radius'=>Carbon_Field::factory( 'select', 'map_enable_search_radius', __( 'Enable Front-End Search Radius', 'mpfy' ) )
			->add_options(array( 'no' => 'No', 'yes' => 'Yes' )),
		'map_search_radius_options'=>Carbon_Field::factory( 'complex', 'map_search_radius_options', __( 'Front-End Search Radius Options', 'mpfy' ) )
			->setup_labels(array(
				'singular_name'=>'Option',
				'plural_name'=>'Options',
			))
			->add_fields(array(
				Carbon_Field::factory( 'text', 'value', __( 'Distance', 'mpfy' ) )
					->help_text('Enter a number only - no unit.'),
			))
			->help_text('Leave blank for default values: 5, 10, 25, 50, 100, 500.'),
	));
	return $custom_fields;
}

add_action('mpfy_template_after_search_field', 'mpfy_sr_template_after_search_field');
function mpfy_sr_template_after_search_field($map_id) {
	$map = new Mpfy_Map($map_id);
	$enabled = mpfy_meta_to_bool($map->get_id(), '_map_enable_search_radius', false);
	if (!$enabled) {
		return;
	}

	$search_within_label = mpfy_meta_label( $map_id, '_map_label_search_within', __( 'Within', 'mpfy' ) );

	$unit = $map->get_search_radius_unit();
	$distances = $map->get_search_radius_options();
	?>
	<div class="mpfy-search-radius">
		<div class="mpfy-search-radius-label"><?php echo esc_html( $search_within_label ); ?> <span>|</span> </div>
		<div class="mpfy-selecter-wrap">
			<select name="mpfy_search_radius">
				<?php foreach ($distances as $d) : ?>
					<option value="<?php echo $d; ?>"><?php echo $d . ' ' . __($unit, 'mpfy'); ?></option>
				<?php endforeach; ?>
			</select>
		</div>
	</div>
	<?php
}
