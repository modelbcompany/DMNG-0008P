<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'd/Zdt+JwtRG1BU1eNo4Plvz/uI+aW/W/vP73hXSqaXmF3ApB0R0AuOFEE4V9GiX0NXu7M/ycGG4BgQLVWmkxuQ==');
define('SECURE_AUTH_KEY',  '0nx8+z6oxPjpcjWVBrbxnX/Iq0Lv1U5eARYHKCagBVisNt+DHbQucPl1/FONr78wpk3vq8wowOgQaPuS0IaG8w==');
define('LOGGED_IN_KEY',    'lfTtMdZivdapKwvPb3Y7d3TPJGdQe53zTdCiv06ySuXBWnnWIlujfRVLBlUXOutMw5RMuSbNowChnOt97tU5ow==');
define('NONCE_KEY',        'QGScR/I4NMw6W9t4mWLAg6fohwKYiuZ4ua9sg/TgyGIIJWZa6EFhIXha3k363TDKy3Ps06KF5dEbrkrWEf6U5A==');
define('AUTH_SALT',        'Q0rG2bXFu/B7bKH921jCldDoQaX53xwi8oG5Y/9avERA63KajglEGmcG7SZgr6WevJSwWo4hlXtkFcW/2wuk0Q==');
define('SECURE_AUTH_SALT', '2ZzIOGHoBrjqCo7sjf/YEY9F/mSHuciUWyYc0rBC5lsSly/Rhh5hMa13DhRAOWYhmYKK+MAxcGhX20KO8LzbFA==');
define('LOGGED_IN_SALT',   'VgNdS10hIHkLdPcecRijYUZE/Lvdtb//zvwVXiUjs8XXKS9mYG5wPVrn/iPUg1puGutspYfYvs6pY4Ol6DnxGw==');
define('NONCE_SALT',       'MlqT+tXMThl4z7OYl425rGJ4EQqg5XWcCW1WyjACh4F7OlQbDXwRO0jHfI47orgF2SO1DJ7pk65Cfq0xNJxQOw==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
