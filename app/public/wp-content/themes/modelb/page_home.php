<?php
/*
Template Name: Home
*/

get_header(); ?>
	
	<div id="content" class="homepage">
	
		<div class="row">
			
		<div class="inner-content grid-x grid-margin-x grid-padding-x">
	
		    <main class="main small-12 large-12 medium-12 cell" role="main">
				
				<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
 
 
					
			 
					
			
	    <?php the_content(); ?>
			 
     
			    <?php endwhile; endif; ?>							
			    					
			</main> <!-- end #main -->
			</div>
		    
		</div> <!-- end #inner-content -->

	</div> <!-- end #content -->

<?php get_footer(); ?>