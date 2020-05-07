<?php
	
//Settings for row
if(function_exists('vc_add_param')){


	$setting = array(
		'type' 			=> 'checkbox',
		'value'			=> array(__( 'Enable Background Slider', 'js_composer' ) => 'yes'),
		'heading' 		=> __( '', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_enable',
		'description' 	=> __( 'Check this box to enable background slider.', 'js_composer' ),
		'group' 		=> __('SB Background Slider', 'js_composer')
	);
	vc_add_param( 'vc_row', $setting );
		
	$setting = array(
		'type' 			=> 'attach_images',
		'class' 		=> '',
		'heading' 		=> __( 'Slider Images', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_slider_attachments',
		'description'	=> __( 'Select images for slider. No live previews are shown in the VC frontend editor due to the different structure of the editor.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'checkbox',
		'value'			=> array(__( 'Random Order', 'js_composer' ) => 'yes'),
		'heading' 		=> __( '', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_random_order',
		'description' 	=> __( 'Check this box to randomize slide orders.', 'js_composer' ),
		'group' 		=> __('SB Background Slider', 'js_composer')
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Animation Speed', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_animation_speed',
		'value'	 		=> 750,
		'description' 	=> __( 'Animation speed in milliseconds. For now only fade animation available.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Slide Duration ', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_slide_duration',
		'value'	 		=> 3000,
		'description' 	=> __( 'Duration between 2 slides in milliseconds.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Height ', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_height',
		'value'	 		=> '',
		'description' 	=> __( 'Optional. Background wrapper height in pixels.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'dropdown',
		'heading' 		=> __( 'Vertical Center for Content', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_content_vertical_center',
		'description' 	=> __( 'Set slider inner content vertically center. <strong>Note: This option may not work in some cases. So in such cases you can use padding top and padding bottom instead of height.</strong>', 'js_composer' ),
		'value' 		=> $this->sbvcbgslider_toggle_button(),
		'std' 			=> 'no',
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'checkbox',
		'value'			=> array(__( 'Enable Background Overlay', 'js_composer' ) => 'yes'),
		'heading' 		=> __( '', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_overlay',
		'description' 	=> __( 'Check this box to enable background overlay.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __('SB Background Slider', 'js_composer')
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'colorpicker',
		'value'			=> array(__( 'Overlay Color', 'js_composer' ) => 'yes'),
		'heading' 		=> __( '', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_overlay_color',
		'description' 	=> __( 'Background color for overlay. Select color with opacity.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_overlay', 'value' => 'yes'),
		'group' 		=> __('SB Background Slider', 'js_composer')
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Padding Top ', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_padding_top',
		'value' 		=> '',
		'description' 	=> __( 'Background wrapper top padding in pixels.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Padding Bottom ', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_padding_bottom',
		'value' 		=> '',
		'description' 	=> __( 'Background wrapper bottom padding in pixels.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Padding Left', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_padding_left',
		'value' 		=> '',
		'description' 	=> __( 'Background wrapper left padding in pixels.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'textfield',
		'heading' 		=> __( 'Padding Right', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_padding_right',
		'value' 		=> '',
		'description' 	=> __( 'Background wrapper right padding in pixels.', 'js_composer' ),
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'dropdown',
		'heading' 		=> __( 'Horizontal Center', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_centered_x',
		'description' 	=> __( 'Make slider image horizontally center.', 'js_composer' ),
		'value' 		=> $this->sbvcbgslider_toggle_button(),
		'std' 			=> 'yes',
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'dropdown',
		'heading' 		=> __( 'Vertical Center', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_centered_y',
		'description' 	=> __( 'Make slider image vertically center.', 'js_composer' ),
		'value' 		=> $this->sbvcbgslider_toggle_button(),
		'std' 			=> 'yes',
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
	
	$setting = array(
		'type' 			=> 'dropdown',
		'heading' 		=> __( 'Background Type', 'js_composer' ),
		'param_name' 	=> 'sbvcbgslider_bg_type',
		'description' 	=> __( 'Similar to background image size.', 'js_composer' ),
		'value' 		=> $this->sbvcbgslider_bg_types(),
		'std' 			=> 'cover',
		'dependency'	=> array('element' => 'sbvcbgslider_enable', 'value' => 'yes'),
		'group' 		=> __( 'SB Background Slider', 'js_composer' )
	);
	vc_add_param( 'vc_row', $setting );
}

//Settings for custom block
if(function_exists('vc_map')) {
	vc_map( array (
		"name" 						=> __('SB Background Slider','js_composer'),		
		"base" 						=> 'sbvcbgslider',		
		"icon" 						=> $this->plugin_dir_url.'/assets/img/vc-icon.png',
		"category" 					=> __('Background Slider','js_composer'),
		"content_element"			=> true,
		"show_settings_on_create" 	=> true,
		"as_parent" 				=> array ('all'),
		"description" 				=> __( 'Background Slider Row','js_composer' ),
		"js_view" 					=> 'VcColumnView',
		"params" 					=> array (
			array(
				'type' 			=> 'attach_images',
				'class' 		=> '',
				'heading' 		=> __( 'Slider Images', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_slider_attachments',
				'description'	=> __( 'Select images for slider. No live previews are shown in the VC frontend editor due to the different structure of the editor.', 'js_composer' )
			),
			array(
				'type' 			=> 'checkbox',
				'value'			=> array(__( 'Random Order', 'js_composer' ) => 'yes'),
				'heading' 		=> __( '', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_random_order',
				'description' 	=> __( 'Check this box to randomize slide orders.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Animation Speed', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_animation_speed',
				'value' 		=> 750,
				'description' 	=> __( 'Animation speed in milliseconds. For now only fade animation available.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Slide Duration ', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_slide_duration',
				'value' 		=> 3000,
				'description' 	=> __( 'Duration between 2 slides in milliseconds.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Height ', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_height',
				'value' 		=> '',
				'description' 	=> __( 'Optional. Background wrapper height in pixels.', 'js_composer' )
			),
			array(
				'type' 			=> 'dropdown',
				'heading' 		=> __( 'Vertical Center for Content', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_content_vertical_center',
				'description' 	=> __( 'Set slider inner content vertically center. <strong>Note: This option may not work in some cases. So in such cases you can use padding top and padding bottom instead of height.</strong>', 'js_composer' ),
				'value' 		=> $this->sbvcbgslider_toggle_button(),
				'std' 			=> 'no'
			),
			array(
				'type' 			=> 'checkbox',
				'value'			=> array(__( 'Enable Background Overlay', 'js_composer' ) => 'yes'),
				'heading' 		=> __( '', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_overlay',
				'description' 	=> __( 'Check this box to enable background overlay.', 'js_composer' )
			),
	
			array(
				'type' 			=> 'colorpicker',
				'value'			=> array(__( 'Overlay Color', 'js_composer' ) => 'yes'),
				'heading' 		=> __( '', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_overlay_color',
				'description' 	=> __( 'Background color for overlay. Select color with opacity.', 'js_composer' ),
				'dependency'	=> array('element' => 'sbvcbgslider_overlay', 'value' => 'yes')
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Padding Top ', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_padding_top',
				'value' 		=> '',
				'description' 	=> __( 'Background wrapper top padding in pixels.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Padding Bottom ', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_padding_bottom',
				'value' 		=> '',
				'description' 	=> __( 'Background wrapper bottom padding in pixels.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Padding Left', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_padding_left',
				'value' 		=> '',
				'description' 	=> __( 'Background wrapper left padding in pixels.', 'js_composer' )
			),
			array(
				'type' 			=> 'textfield',
				'heading' 		=> __( 'Padding Right', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_padding_right',
				'value' 		=> '',
				'description' 	=> __( 'Background wrapper right padding in pixels.', 'js_composer' )
			),
			array(
				'type' 			=> 'dropdown',
				'heading' 		=> __( 'Horizontal Center', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_centered_x',
				'description' 	=> __( 'Make slider image horizontally center.', 'js_composer' ),
				'value' 		=> $this->sbvcbgslider_toggle_button(),
				'std' 			=> 'yes'
			),
			array(
				'type' 			=> 'dropdown',
				'heading' 		=> __( 'Vertical Center', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_centered_y',
				'description' 	=> __( 'Make slider image vertically center.', 'js_composer' ),
				'value' 		=> $this->sbvcbgslider_toggle_button(),
				'std' 			=> 'yes'
			),
			array(
				'type' 			=> 'dropdown',
				'heading' 		=> __( 'Vertical Center', 'js_composer' ),
				'param_name' 	=> 'sbvcbgslider_bg_type',
				'description' 	=> __( 'Similar to background image size.', 'js_composer' ),
				'value' 		=> $this->sbvcbgslider_bg_types(),
				'std' 			=> 'cover'
			)
		)
	));
}

add_action('admin_init','sbvcbgslider_extends');
function sbvcbgslider_extends(){
	if (class_exists('WPBakeryShortCodesContainer')) {
		class WPBakeryShortCode_Sbvcbgslider extends WPBakeryShortCodesContainer {
		}
	}
}

















