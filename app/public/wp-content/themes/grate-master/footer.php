			<footer id="footer" class="footer" role="contentinfo" itemscope itemtype="http://schema.org/WPFooter">

                <div id="inner-footer" class="wrap">

    				<?php /* Uncomment this and the 'Footer Links' menu registration in template.php to use. 
    				Or delete it if you're not using it.

    				<nav role="navigation">
    					wp_nav_menu(array(
    					'container' => 'div',                           // enter '' to remove nav container (just make sure .footer-links in _base.scss isn't wrapping)
    					'container_class' => 'footer-links',         // class of container (should you choose to use it)
    					'menu' => __( 'Footer Links', 'grate' ),   // nav name
    					'menu_class' => 'nav footer-nav',            // adding custom nav class
    					'theme_location' => 'footer-links',             // where it's located in the theme
    					'before' => '',                                 // before the menu
    					'after' => '',                                  // after the menu
    					'link_before' => '',                            // before each link
    					'link_after' => '',                             // after each link
    					'depth' => 0,                                   // limit the depth of the nav
    					'fallback_cb' => 'grate_footer_links_fallback'  // fallback function
    					)); 
    				</nav> 

    				*/ ?>

    				<small class="copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>.</small>

                </div>

			</footer>

		</div><?php // end #container ?>

		<?php // all js scripts are enqueued in functions.php ?>
		<?php wp_footer(); ?>

	</body>

</html> <!-- This is the end. My only friend. -->
