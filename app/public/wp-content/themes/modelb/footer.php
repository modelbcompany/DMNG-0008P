<?php

/**
 * The template for displaying the footer. 
 *
 * Comtains closing divs for header.php.
 *
 * For more info: https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */
?>


<div id="footer">
  <div class="row">

    <div class="inner-content grid-x grid-margin-x grid-padding-x">

      <div class="main small-12 large-12 medium-12 cell" role="main">


        <?php the_field('footer_options', 'option'); ?>

      </div>
    </div>
  </div>

</div> <!-- end .off-canvas-content -->

</div> <!-- end .off-canvas-wrapper -->

<?php wp_footer(); ?>

</body>

</html> <!-- end page -->