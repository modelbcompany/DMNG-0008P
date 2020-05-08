<?php
/*
Plugin Name: MapifyPro
Plugin URI: http://www.mapifypro.com
Description: Hello there! We let you add beautiful, feature-rich maps to your site.
Version: 3.2.6
Author: Josh Sears
Author URI: http://www.mapifypro.com
License: GPL2
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

require_once( plugin_dir_path( __FILE__ ) . 'mpfy-api-manager-product-id.php' );

// Load the API Manager PHP Library
// Load WC_AM_Client class if it exists.
if ( ! class_exists( 'WC_AM_Client_25' ) ) {
	// Uncomment next line if this is a plugin
	require_once( plugin_dir_path( __FILE__ ) . 'wc-am-client.php' );

	// Uncomment next line if this is a theme
	// require_once( get_stylesheet_directory() . '/wc-am-client.php' );
}

// Instantiate WC_AM_Client class object if the WC_AM_Client class is loaded.
if ( class_exists( 'WC_AM_Client_25' ) ) {
	global $wcam_lib;
	/**
	 * This file is only an example that includes a plugin header, and this code used to instantiate the client object. The variable $wcam_lib
	 * can be used to access the public properties from the WC_AM_Client class, but $wcam_lib must have a unique name. To find data saved by
	 * the WC_AM_Client in the options table, search for wc_am_client_{product_id}, so in this example it would be wc_am_client_13.
	 *
	 * All data here is sent to the WooCommerce API Manager API, except for the $software_title, which is used as a title, and menu label, for
	 * the API Key activation form the client will see.
	 *
	 * ****
	 * NOTE
	 * ****
	 * If $product_id is empty, the customer can manually enter the product_id into a form field on the activation screen.
	 *
	 * @param string $file             Must be __FILE__ from the root plugin file, or theme functions, file locations.
	 * @param int    $product_id       Must match the Product ID number (integer) in the product.
	 * @param string $software_version This product's current software version.
	 * @param string $plugin_or_theme  'plugin' or 'theme'
	 * @param string $api_url          The URL to the site that is running the API Manager. Example: https://www.toddlahman.com/
	 * @param string $software_title   The name, or title, of the product. The title is not sent to the API Manager APIs, but is used for menu titles.
	 *
	 * Example:
	 *
	 * $wcam_lib = new WC_AM_Client_25( $file, $product_id, $software_version, $plugin_or_theme, $api_url, $software_title );
	 */

	// Example of empty string product_id.
	$wcam_lib = new WC_AM_Client_25( __FILE__, MAPIFY_AM_PRODUCT_ID, '3.2.6', 'plugin', 'https://mapifypro.com', 'MapifyPro' );

	// Preferred positive integer product_id.
	//$wcam_lib = new WC_AM_Client_25( __FILE__, 132967, '1.0', 'plugin', 'http://wc/', 'Simple Comments - Simple' );
}

/**
 * Required plugin utility functions
 */
require_once(ABSPATH . '/wp-admin/includes/plugin.php');

function mpfy_mp_load() {
	global $wcam_lib;

	if (defined('MAPIFY_PLUGIN_NAME')) {
		add_action('admin_notices', 'mpfy_mp_plugin_conflict');
		return; // prevent plugin from loading
	}


	define('MAPIFY_PLUGIN_FILE', __FILE__);
	$activation_status = get_option( $wcam_lib->wc_am_activated_key );
	if ( $activation_status !== 'Activated' ) {
		return;
	}

	include_once('load.php');
}
add_action('plugins_loaded', 'mpfy_mp_load', 1400);

function mpfy_mp_plugin_conflict() {
	$plugin_data = get_file_data(__FILE__, array('Plugin Name'=>'Plugin Name', 'Version'=>'Version'));

	if (MAPIFY_PLUGIN_NAME) {
		$message = sprintf(__('The %s plugin will be inactive until you deactivate the %s plugin.'), $plugin_data['Plugin Name'], MAPIFY_PLUGIN_NAME);
	} else {
		$message = sprintf(__('The %s plugin will be inactive as there is a conflicting plugin.'), $plugin_data['Plugin Name']);
	}
	?>
	<div class="error">
		<p><?php echo $message; ?></p>
	</div>
	<?php
}
