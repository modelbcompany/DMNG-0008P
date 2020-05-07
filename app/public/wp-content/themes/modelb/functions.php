<?php
/** 
 * For more info: https://developer.wordpress.org/themes/basics/theme-functions/
 *
 */			
	
// Theme support options
require_once(get_template_directory().'/functions/theme-support.php'); 

// WP Head and other cleanup functions
require_once(get_template_directory().'/functions/cleanup.php'); 

// Register scripts and stylesheets
require_once(get_template_directory().'/functions/enqueue-scripts.php'); 

// Register custom menus and menu walkers
require_once(get_template_directory().'/functions/menu.php'); 

// Register sidebars/widget areas
require_once(get_template_directory().'/functions/sidebar.php'); 

// Makes WordPress comments suck less
require_once(get_template_directory().'/functions/comments.php'); 

// Replace 'older/newer' post links with numbered navigation
require_once(get_template_directory().'/functions/page-navi.php'); 

// Adds support for multiple languages
require_once(get_template_directory().'/functions/translation/translation.php'); 


// Customize Options for ACF
require_once(get_template_directory().'/functions/custom-fields.php'); 


function my_acf_admin_head() {
?>
<style type="text/css">

	.modelb-style-row{ max-width:1250px;  background:#153d59; color:#fff}
	.modelb-col-style{max-width:250px; background:#f7f7f7; color:#000;}
	.acf-fields>.acf-field {padding: 30px;}
</style>
<?php
}
add_action('acf/input/admin_head', 'my_acf_admin_head');

function custom_excerpt_length( $length ) {
    return 20;
}


add_filter( 'gform_confirmation_anchor', '__return_true' );
 
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
 