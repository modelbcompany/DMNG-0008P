<?php
/*
Plugin Name: Smart Slider 3 Pro
Plugin URI: https://smartslider3.com/
Description: The perfect all-in-one responsive slider solution for WordPress.
Version: 3.4.1
Author: Nextend
Author URI: http://nextendweb.com
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */

if (!defined('SMARTSLIDER3_LIBRARY_PATH')) {
    define('SMARTSLIDER3_LIBRARY_PATH', dirname(__FILE__) . DIRECTORY_SEPARATOR . 'Nextend');
}

if (!version_compare(PHP_VERSION, '7.0', '>=')) {

    require_once SMARTSLIDER3_LIBRARY_PATH . '/WordPress/Fail.php';
    add_action('admin_notices', 'smartslider3_fail_php_version');

} else if (!version_compare(get_bloginfo('version'), '4.9', '>=')) {

    require_once SMARTSLIDER3_LIBRARY_PATH . '/WordPress/Fail.php';
    add_action('admin_notices', 'smartslider3_fail_wp_version');

} else if (!function_exists('smart_slider_3_pro_plugins_loaded')) {
    define('NEXTEND_SMARTSLIDER_3_PRO_BASENAME', plugin_basename(__FILE__));
    define('NEXTEND_SMARTSLIDER_3_PRO_SLUG', 'nextend-smart-slider3-pro');

    require_once dirname(__FILE__) . '/plugin.php';
}