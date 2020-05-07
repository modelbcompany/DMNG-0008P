<?php
/*
	Plugin Name: Visual Composer Background Sliders
	Description: Add simple background slider for any block.
	Plugin URI: http://plugins.sbthemes.com/background-slider-vc-addon/
	Version: 1.6
	Author: SB Themes
	Author URI: http://codecanyon.net/user/sbthemes/portfolio?ref=sbthemes
*/

class SB_Background_Slider_VC_Addon {
	public $plugin_version 			= '1.6';
	public $plugin_name 			= 'Visual Composer Background Slider';
	
	public $required_vc_version 	= '3.9.9';
	
	public $plugin_dir_url;
	public $plugin_dir_path;
	
	function __construct() {
		
		$this->plugin_dir_url 	= plugin_dir_url(__FILE__);
		$this->plugin_dir_path 	= plugin_dir_path(__FILE__);
		
		add_filter('widget_text', 'do_shortcode');							//Enable shortcodes in widget
		
		add_action('init', array($this, 'sb_check_vc_version'));			//Check Visual Composer Version
		add_action('init', array($this, 'sb_admin_panel'));					//Admin Settings Panel
		add_filter('sbvcbgslider_create_slider_placeholder', array($this, 'sb_create_slider_placeholder'), 10, 3);
		
		add_shortcode('SBVCBGSLIDER', array($this, 'sbvcbgslider_slider_shortcode'));
		add_shortcode('sbvcbgslider', array($this, 'sbvcbgslider_slider_shortcode'));
		
	}
	
	//Check Visual Composer Version
	function sb_check_vc_version() {
		if (defined('WPB_VC_VERSION')) {
			if (version_compare($this->required_vc_version, WPB_VC_VERSION, '>')) {
				add_action('admin_notices', array($this, 'sb_vc_version_notice'));
			}
		} else {
			add_action('admin_notices', array($this, 'sb_activation_notice'));
		}
	}
	
	//Notice notice for old version visual composer
	function sb_vc_version_notice() {
		echo '<div class="updated error"><p>The <strong>'.$this->plugin_name.'</strong> add-on requires <strong>Visual Composer</strong> version 4.0.0 or greater.</p></div>';	
	}
	
	//Notice if visual composer not installed and activated
	function sb_activation_notice() {
		echo '<div class="updated error"><p>The <strong>'.$this->plugin_name.'</strong> add-on requires the <strong>Visual Composer</strong> Plugin installed and activated.</p></div>';
	}
	
	//Admin Settings Panel
	function sb_admin_panel() {
		require_once('admin/admin-panel.php');
	}
	
	//Return toggle values yes | no
	function sbvcbgslider_toggle_button() {
		return array(
			__( 'Yes', 'js_composer' ) => 'yes',
			__( 'No', 'js_composer' ) => 'no',
		);
	}
	
	//Return toggle values yes | no
	function sbvcbgslider_bg_types() {
		return array(
			__( 'Cover', 'js_composer' ) => 'cover',
			__( 'Contain', 'js_composer' ) => 'contain',
		);
	}
	
	function sb_create_slider_placeholder($output, $atts, $content) {
		
		extract(shortcode_atts( array(
			'sbvcbgslider_enable'					=>	'yes',
			'sbvcbgslider_slider_attachments' 		=>	'',
			'sbvcbgslider_random_order'	 			=>	'no',
			'sbvcbgslider_animation_speed'	 		=>	750,
			'sbvcbgslider_slide_duration'	 		=>	3000,
			'sbvcbgslider_height'	 				=>	'',
			'sbvcbgslider_content_vertical_center'	=>	'no',
			'sbvcbgslider_overlay'					=>	'no',
			'sbvcbgslider_overlay_color'			=>	'',
			'sbvcbgslider_padding_top'				=>	'',
			'sbvcbgslider_padding_bottom'			=>	'',
			'sbvcbgslider_padding_left'				=>	'',
			'sbvcbgslider_padding_right'			=>	'',
			'sbvcbgslider_centered_x'		 		=>	'yes',
			'sbvcbgslider_centered_y'		 		=>	'yes',
			'sbvcbgslider_bg_type'			 		=>	'cover'
		), $atts ));
		
		$return = '';
		
		if($sbvcbgslider_enable == 'yes') {
			
			wp_enqueue_style('sbvcbgslider-style', $this->plugin_dir_url.'/assets/css/style.css');
			wp_enqueue_script('jquery');
			wp_enqueue_script('sbvcbgslider-backstretch', $this->plugin_dir_url.'/assets/js/jquery.backstretch.min.js', array(), $this->plugin_version, true);
			wp_enqueue_script('sbvcbgslider-flexverticalcenter', $this->plugin_dir_url.'/assets/js/jquery.flexverticalcenter.js', array(), $this->plugin_version, true);
			wp_enqueue_script('sbvcbgslider-script', $this->plugin_dir_url.'/assets/js/script.js', array(), $this->plugin_version, true);
			
			
			if(!empty($sbvcbgslider_slider_attachments)) {
				$sbvcbgslider_slider_attachments = trim(trim($sbvcbgslider_slider_attachments), ',');
				$sbvcbgslider_slider_attachments = @explode(',', $sbvcbgslider_slider_attachments);
				$slider_images = array();
				if(is_array($sbvcbgslider_slider_attachments) && count($sbvcbgslider_slider_attachments) > 0) {
					foreach($sbvcbgslider_slider_attachments as $sbvcbgslider_slider_attachment) {
						$slider_images[] = wp_get_attachment_url($sbvcbgslider_slider_attachment);
					}
					$styles = '';
					if(trim($sbvcbgslider_height) != '')
						$styles .= 'height:'.$sbvcbgslider_height.'px;';
					if(trim($sbvcbgslider_padding_top) != '')
						$styles .= 'padding-top:'.$sbvcbgslider_padding_top.'px;';
					if(trim($sbvcbgslider_padding_bottom) != '')
						$styles .= 'padding-bottom:'.$sbvcbgslider_padding_bottom.'px;';
					if(trim($sbvcbgslider_padding_left) != '')
						$styles .= 'padding-left:'.$sbvcbgslider_padding_left.'px;';
					if(trim($sbvcbgslider_padding_right) != '')
						$styles .= 'padding-right:'.$sbvcbgslider_padding_right.'px;';
					
					if($sbvcbgslider_random_order == 'yes')
						shuffle($slider_images);
					
					$return .= '<div class="sb-bg-slider-params sb-slider-data-source-row sb-slider-bg-type-'.$sbvcbgslider_bg_type.'" data-source="row" data-slider_attachments="'.implode('|', $slider_images).'" data-animation_speed="'.$sbvcbgslider_animation_speed.'" data-slide_duration="'.$sbvcbgslider_slide_duration.'" data-content_vertical_center="'.$sbvcbgslider_content_vertical_center.'" data-centered_x="'.$sbvcbgslider_centered_x.'" data-centered_y="'.$sbvcbgslider_centered_y.'"  data-styles="'.$styles.'">';
					if($sbvcbgslider_overlay == 'yes') {
						$return .= '<div class="sb-bg-slider-overlay" style="background:'.$sbvcbgslider_overlay_color.'"></div>';
					}
					$return .= '</div>';
				}
			}
		}
		
		return $return;
	}
	
	function sbvcbgslider_slider_shortcode($atts, $content = NULL) {
		extract(shortcode_atts( array(
			'sbvcbgslider_slider_attachments' 		=>	'',
			'sbvcbgslider_random_order'	 			=>	'no',
			'sbvcbgslider_animation_speed'	 		=>	750,
			'sbvcbgslider_slide_duration'	 		=>	3000,
			'sbvcbgslider_height'	 				=>	'',
			'sbvcbgslider_content_vertical_center'	=>	'no',
			'sbvcbgslider_overlay'					=>	'no',
			'sbvcbgslider_overlay_color'			=>	'',
			'sbvcbgslider_content_vertical_center'	=>	'no',
			'sbvcbgslider_padding_top'				=>	'',
			'sbvcbgslider_padding_bottom'			=>	'',
			'sbvcbgslider_padding_left'				=>	'',
			'sbvcbgslider_padding_right'			=>	'',
			'sbvcbgslider_centered_x'		 		=>	'yes',
			'sbvcbgslider_centered_y'		 		=>	'yes',
			'sbvcbgslider_bg_type'			 		=>	'cover'
		), $atts ));
		
		$return = '';
		
		wp_enqueue_style('sbvcbgslider-style', $this->plugin_dir_url.'/assets/css/style.css');
		wp_enqueue_script('jquery');
		wp_enqueue_script('sbvcbgslider-backstretch', $this->plugin_dir_url.'/assets/js/jquery.backstretch.min.js', array(), $this->plugin_version, true);
		wp_enqueue_script('sbvcbgslider-flexverticalcenter', $this->plugin_dir_url.'/assets/js/jquery.flexverticalcenter.js', array(), $this->plugin_version, true);
		wp_enqueue_script('sbvcbgslider-script', $this->plugin_dir_url.'/assets/js/script.js', array(), $this->plugin_version, true);
		
		if(!empty($sbvcbgslider_slider_attachments)) {
			$sbvcbgslider_slider_attachments = trim(trim($sbvcbgslider_slider_attachments), ',');
			$sbvcbgslider_slider_attachments = @explode(',', $sbvcbgslider_slider_attachments);
			$slider_images = array();
			if(is_array($sbvcbgslider_slider_attachments) && count($sbvcbgslider_slider_attachments) > 0) {
				foreach($sbvcbgslider_slider_attachments as $sbvcbgslider_slider_attachment) {
					$slider_images[] = wp_get_attachment_url($sbvcbgslider_slider_attachment);
				}
				$styles = '';
				if(trim($sbvcbgslider_height) != '')
					$styles .= 'height:'.$sbvcbgslider_height.'px;';
				if(trim($sbvcbgslider_padding_top) != '')
					$styles .= 'padding-top:'.$sbvcbgslider_padding_top.'px;';
				if(trim($sbvcbgslider_padding_bottom) != '')
					$styles .= 'padding-bottom:'.$sbvcbgslider_padding_bottom.'px;';
				if(trim($sbvcbgslider_padding_left) != '')
					$styles .= 'padding-left:'.$sbvcbgslider_padding_left.'px;';
				if(trim($sbvcbgslider_padding_right) != '')
					$styles .= 'padding-right:'.$sbvcbgslider_padding_right.'px;';
					
				if($sbvcbgslider_random_order == 'yes')
					shuffle($slider_images);
					
				$return .= '<div class="sb-bg-slider-params sb-slider-data-source-shortcode sb-slider-bg-type-'.$sbvcbgslider_bg_type.'" data-source="shortcode" data-slider_attachments="'.implode('|', $slider_images).'" data-animation_speed="'.$sbvcbgslider_animation_speed.'" data-slide_duration="'.$sbvcbgslider_slide_duration.'" data-centered_x="'.$sbvcbgslider_centered_x.'" data-centered_y="'.$sbvcbgslider_centered_y.'" style="'.$styles.'">';
				
				if($sbvcbgslider_content_vertical_center == 'yes') { $return .= '<div class="sbvcgmap-vertical-center">'; }
				$return .= do_shortcode($content);
				if($sbvcbgslider_content_vertical_center == 'yes') { $return .= '</div>'; }
				if($sbvcbgslider_overlay == 'yes') {
					$return .= '<div class="sb-bg-slider-overlay" style="background:'.$sbvcbgslider_overlay_color.'"></div>';
				}
				$return .= '</div>';
			}
		}
		
		return $return;
	}
	
}
$sb_background_slider_vc_addon = new SB_Background_Slider_VC_Addon();


if(!function_exists('vc_theme_before_vc_row')) {
	function vc_theme_before_vc_row($atts, $content = null) {
		return apply_filters( 'sbvcbgslider_create_slider_placeholder', '', $atts, $content );
	}
}
