<?php
/*
 * Custom Post Type Taxonomy Templatate
 *
 * This is the custom post type taxonomy template. If you edit the custom taxonomy name,
 * you've got to change the name of this template to reflect that name change.
 *
 * For Example, if your custom taxonomy is called "register_taxonomy('shoes')",
 * then your template name should be taxonomy-shoes.php
 *
 * For more info: http://codex.wordpress.org/Post_Type_Templates#Displaying_Custom_Taxonomies
*/
?>

<?php get_header(); ?>

	<main id="main" class="wrap" role="main" itemscope itemprop="mainContentOfPage" itemtype="http://schema.org/Blog">

		<?php // Edit the loop in /templates/archive-loop. Or roll your own. ?>
		<?php get_template_part( 'templates/archive', 'loop'); ?>

	</main>

	<?php get_sidebar(); ?>

<?php get_footer(); ?>
