<?php

use \Mpfy\Carbon\Carbon_Container;
use \Mpfy\Carbon\Carbon_Field;

add_action( 'mpfy_post_tooltip_settings_container', 'mpfy_mll_register_design_container' );
function mpfy_mll_register_design_container() {
	$fields = array(
		'position_start'=>'',

		'map_background_color'=>Carbon_Field::factory( 'color', 'map_background_color', __( 'Map Background', 'mpfy' ) )
			->set_default_value('')
			->help_text( '(image mode only)' ),

		'map_tooltip_background_color'=>Carbon_Field::factory( 'color', 'map_tooltip_background_color', __( 'Tooltip Background', 'mpfy' ) )
			->set_default_value('#FFFFFF'),

		'map_tooltip_background_transparency'=>Carbon_Field::factory( 'text', 'map_tooltip_background_transparency', __( 'Tooltip Transparency', 'mpfy' ) )
			->set_default_value('100')
			->help_text('Use a value in the 0-100 percent range; do not include a percent sign.'),

		'map_tooltip_text_color'=>Carbon_Field::factory( 'color', 'map_tooltip_text_color', __( 'Tooltip Text Color', 'mpfy' ) )
			->set_default_value('#525252'),

		'map_popup_background_color'=>Carbon_Field::factory( 'color', 'map_popup_background_color', __( 'Popup Background', 'mpfy' ) )
			->set_default_value('#FFFFFF'),

		'map_popup_header_background_color'=>Carbon_Field::factory( 'color', 'map_popup_header_background_color', __( 'Popup Header', 'mpfy' ) )
			->set_default_value('#F7F7F7'),

		'map_popup_date_background_color'=>Carbon_Field::factory( 'color', 'map_popup_date_background_color', __( 'Popup Date Background', 'mpfy' ) )
			->set_default_value('#566069'),

		'map_popup_accent_color'=>Carbon_Field::factory( 'color', 'map_popup_accent_color', __( 'Popup Accent', 'mpfy' ) )
			->set_default_value('#2ED2E1'),

		'position_end'=>'',
	);
	$fields = apply_filters( 'mpfy_map_custom_fields_design', $fields );
	$fields = array_filter( $fields );

	Carbon_Container::factory( 'custom_fields', 'Color / Design Settings' )
		->show_on_post_type( 'map' )
		->add_fields( array_values( $fields ) );
}

add_action('admin_enqueue_scripts', 'mpfy_pc_admin_behaviors');
function mpfy_pc_admin_behaviors($hook) {
    if ($hook !== 'post.php') {
        return;
    }

    wp_enqueue_script('mpfy-popup-colors-admin', plugins_url('modules/popup-colors/admin.js', MAPIFY_PLUGIN_FILE), array('jquery'), '1.0.0', true);
}

add_filter('mpfy_map_background_color', 'mpfy_pc_map_background_color', 10, 2);
function mpfy_pc_map_background_color($value, $map_id) {
    $background = get_post_meta($map_id, '_map_background_color', true);
	if (!$background) {
		$background = $value;
	}

	return $background;
}

add_filter('mpfy_map_tooltip_background_color', 'mpfy_pc_map_tooltip_background_color', 10, 2);
function mpfy_pc_map_tooltip_background_color($value, $map_id) {
	$tooltip_background = get_post_meta($map_id, '_map_tooltip_background_color', true);
	if (!$tooltip_background) {
		$tooltip_background = '#FFFFFF';
	}

	$tooltip_transparency = get_post_meta($map_id, '_map_tooltip_background_transparency', true);
	if ($tooltip_transparency === '') {
		$tooltip_transparency = 1;
	} else {
		$tooltip_transparency = min(100, max(0, intval($tooltip_transparency))) / 100;
	}

	$tooltip_background_rgba = mpfy_hex2rgb($tooltip_background); // array(r,g,b)
	$tooltip_background_rgba[] = $tooltip_transparency; // add alpha

	return $tooltip_background_rgba;
}

add_filter('mpfy_map_tooltip_text_color', 'mpfy_pc_map_tooltip_text_color', 10, 2);
function mpfy_pc_map_tooltip_text_color($value, $map_id) {
	$tooltip_text_color = get_post_meta($map_id, '_map_tooltip_text_color', true);
	if ( ! $tooltip_text_color ) {
		$tooltip_text_color = '#525252';
	}
	return $tooltip_text_color;
}

add_action('mpfy_popup_before_section', 'mpfy_pc_apply_colors', 10, 2);
function mpfy_pc_apply_colors($map_location_id, $map_id) {
	$colors = array(
		'_map_popup_background_color'=>'#FFFFFF',
		'_map_popup_header_background_color'=>'#F7F7F7',
		'_map_popup_date_background_color'=>'#566069',
		'_map_popup_accent_color'=>'#2ED2E1',
	);
	foreach ($colors as $key => $default) {
		$v = get_post_meta($map_id, $key, true);
		if ($v) {
			$colors[$key] = $v;
		}
	}

	$styles = '
	<style type="text/css">
		.mpfy-p-color-popup-background { background-color: ' . $colors['_map_popup_background_color'] . ' !important; }
		.mpfy-p-color-header-background { background-color: ' . $colors['_map_popup_header_background_color'] . ' !important; }
		.mpfy-p-color-header-date-background { background-color: ' . $colors['_map_popup_date_background_color'] . ' !important; }
		.mpfy-p-color-accent-background { background-color: ' . $colors['_map_popup_accent_color'] . ' !important; }
		.mpfy-p-color-accent-color { color: ' . $colors['_map_popup_accent_color'] . ' !important; }
	</style>
	';

	echo $styles;
}
