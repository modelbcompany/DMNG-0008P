<?php 
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 */

get_header(); ?>
	
<!-- Page Header -->
	<?php if( get_field('disable_page_header') == false): ?>
		<div id="page-header">
			<div class="inner-content grid-x">
				<div id="page-image" style="background-image:url('<?php the_field('page_image');?>')"><h1></h1></div>
			</div>
		</div> 
	<?php endif; ?> <!-- end Page Header -->

<div id="content">

		<div class="row">
			
		<div class="inner-content grid-x grid-margin-x grid-padding-x">
	
		    <main class="main small-12 large-12 medium-12 cell" role="main">
				
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 
					<?php the_content(); ?>
			 
     				<?php endwhile; endif; ?>							
			    					
			</main> <!-- end #main -->
			</div>
		    
		<!-- Prefooter -->
	
	    <?php if( get_field('hide_prefooter') == false and get_field('global_prefooter', 'option') == true): ?>

			<div class="row">

			 	<?php the_field('prefooter', 'option');?> 
          
			</div>

      	<?php endif; ?> <!-- End of Prefooter -->
			
	</div> <!-- end #inner-content -->
	

</div> <!-- end #content -->

<?php get_footer(); ?>