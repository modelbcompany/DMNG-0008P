<!doctype html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php html_schema(); ?> <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

	<head>
        <?php // See everything you need to know about the <head> here: https://github.com/joshbuchea/HEAD ?>
		<meta charset='<?php bloginfo( 'charset' ); ?>'>
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<?php // favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="icon" href="<?php echo get_theme_file_uri(); ?>/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_theme_file_uri(); ?>/favicon.ico">
		<![endif]-->

        <!-- Apple Touch Icon -->
        <link rel="apple-touch-icon" href="<?php echo get_theme_file_uri(); ?>/library/images/apple-touch-icon.png">

        <!-- Safari Pinned Tab Icon -->
        <link rel="mask-icon" href="<?php echo get_theme_file_uri(); ?>/library/images/icon.svg" color="#0088cc">

        <?php // updated pingback. Thanks @HardeepAsrani https://github.com/HardeepAsrani ?>
        <?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
            <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
        <?php endif; ?>

		<?php // put font scripts like Typekit here ?>
		<?php // end fonts ?>

		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>

		<?php // drop Google Analytics Here ?>
		<?php // end analytics ?>

	</head>

	<body <?php body_class(); ?>>

        <div id="container" class="grid grid-aside">

			<header class="header" id="header" role="banner" itemscope itemtype="http://schema.org/WPHeader">

                <div id="inner-header" class="wrap">

                    <?php // updated with proper markup and wrapping div for organization ?>
                    <div id="bloginfo" itemscope itemtype="http://schema.org/Organization">

                        <div id="logo" itemprop="logo">
                            <a href="<?php echo home_url(); ?>" rel="nofollow" itemprop="url" title="<?php bloginfo('name'); ?>">
                                <img src="<?php echo get_theme_file_uri(); ?>/library/images/logo_sm.svg" itemprop="logo" />
                            </a>
                        </div>

        				<?php // You can use text or a logo (or both) in your header. Uncomment the below to use text. ?>
        				<h1 id="site-title" class="h1" itemprop="name">
                            <a href="<?php echo home_url(); ?>" rel="nofollow" itemprop="url" title="<?php bloginfo('name'); ?>">
                                <?php bloginfo('name'); ?>
                            </a>
                        </h1>

                    </div>

    				<nav class="header-nav" role="navigation" itemscope itemtype="http://schema.org/SiteNavigationElement">

    				<?php // see all default args here: https://developer.wordpress.org/reference/functions/wp_nav_menu/ ?>

    					<?php wp_nav_menu( array(

    					         'container' => false,                           // remove nav container
    					         'container_class' => 'menu',                 // class of container (should you choose to use it)
    					         'menu' => __( 'The Main Menu', 'grate' ),  // nav name
    					         'menu_class' => 'nav top-nav main-menu',     // adding custom nav class
    					         'theme_location' => 'main-nav',                 // where it's located in the theme

    					    )
                        ); ?>

    				</nav>

                </div>

			</header>
