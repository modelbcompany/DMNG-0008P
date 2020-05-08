<?php
/*
Plugin Name: Carbon Fields
Description: Provides additional custom fields for posts, categories, users, widgets and more
Version: 0.4.2
Requires at least: 3.9
Tested up to: 3.9.1
*/

define('MPFY_CARBON_PLUGIN_ROOT', dirname(__FILE__));

if (!defined('MPFY_CARBON_PLUGIN_URL')) {
	define('MPFY_CARBON_PLUGIN_URL', get_template_directory_uri() . '/lib/carbon-fields');
}

do_action('mpfy_carbon_before_include');

include_once 'Carbon_Exception.php';

include_once 'Carbon_DataStore.php';

include_once 'Carbon_Container.php';
include_once 'Carbon_Container_CustomFields.php';
include_once 'Carbon_Container_ThemeOptions.php';
include_once 'Carbon_Container_TermMeta.php';
include_once 'Carbon_Container_UserMeta.php';

include_once 'Carbon_Field.php';
include_once 'Carbon_Field_Complex.php';

include_once 'Carbon_Widget.php';

include_once 'carbon-functions.php';

do_action('mpfy_carbon_after_include');

# Add Actions
add_action('wp_loaded', 'mpfy_carbon_trigger_fields_register');
add_action('mpfy_carbon_after_register_fields', 'mpfy_carbon_init_containers');

