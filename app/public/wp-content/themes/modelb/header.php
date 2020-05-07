<?php
/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section
 *
 */
?>

<!doctype html>

  <html class="no-js"  <?php language_attributes(); ?>>

	<head>
		<meta charset="utf-8">
		
		<!-- Force IE to use the latest rendering engine available -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- Mobile Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta class="foundation-mq">
		
		<!-- If Site Icon isn't set in customizer -->
		<?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) { ?>
			<!-- Icons & Favicons -->
			<link rel="icon" href="<?php the_field('favicon', 'option');?>">
			<link href="<?php the_field('favicon', 'option');?>" rel="apple-touch-icon" />	
	    <?php } ?>

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		
		<?php wp_head(); ?>
		<link rel="stylesheet" href="https://use.typekit.net/qiq7rtp.css">
		<?php get_template_part( 'style'); ?>
 
		
	  </head>
			
	<body <?php body_class(); ?>>

 		<div id="header">		
				
		
				 
		<div class="row">
			
		<div class="inner-content grid-x grid-margin-x grid-padding-x">
	
		    <div class="main small-12 large-12 medium-12 cell" role="main">
					
		
		 <?php the_field('header_layout', 'option');?>
	 	
			</div>	</div>	</div>		</div> 
					