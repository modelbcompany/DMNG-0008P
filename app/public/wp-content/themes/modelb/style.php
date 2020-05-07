<style>


	.row {max-width:<?php the_field('row_width', 'option');?>; margin:auto}
	#content .vc_row {padding-bottom:<?php the_field('row_gap', 'option');?>;padding-top:<?php the_field('row_gap', 'option');?>;}	
	#content.homepage {margin-top:<?php the_field('content_start', 'option');?>; padding-right:<?php the_field('content_padding', 'option');?>; padding-left:<?php the_field('content_padding', 'option');?>;}	
	#content {margin-top:<?php the_field('content_start_subpage', 'option');?>; padding-right:<?php the_field('content_padding', 'option');?>; padding-left:<?php the_field('content_padding', 'option');?>;}	
	
			@media only screen and (max-width:<?php the_field('mobile_breakpoint', 'option');?> ) {		
				.sfm-navicon-button { visibility: visible !important; display: block !important}
				#nav-menu 			{ visibility: hidden; display: none}
					#content .vc_row {padding-bottom:<?php the_field('mobile_row_gap', 'option');?>; padding-top:<?php the_field('mobile_row_gap', 'option');?>;}	
			}
	

	
/* TYPOGRAPHY*/	

	<?php $typography = get_field('typography', 'option'); if( $typography ): ?>
	h1,h2,h3,h4			{ font-family:'<?php echo $typography['header']; ?>'} 	
	p, li				{ font-family:'<?php echo $typography['body']; ?>'} 
	button, .button		{ font-family:'<?php echo $typography['button']; ?>'} 
<?php endif; ?>
	
<?php $h1_styles = get_field('h1_styles', 'option'); if( $h1_styles ): ?>
	h1  	{ font-size: <?php echo $h1_styles['h1_size']; ?>; line-height: <?php echo $h1_styles['h1_line_height']; ?>; color:<?php echo $h1_styles['h1_color']; ?>; font-weight:<?php echo $h1_styles['h1_font_weight']; ?>; text-transform:<?php echo $h1_styles['h1_text_transform']; ?>} 	
<?php endif; ?>
	
<?php $h2_styles = get_field('h2_styles', 'option'); if( $h2_styles ): ?>
	 h2  	{ font-size: <?php echo $h2_styles['h2_size']; ?>; line-height: <?php echo $h2_styles['h2_line_height']; ?>; color:<?php echo $h2_styles['h2_color']; ?>; font-weight:<?php echo $h2_styles['h2_font_weight'];?>;  text-transform:<?php echo $h2_styles['h2_text_transform']; ?>} 	
<?php endif; ?>
	
<?php $h3_styles = get_field('h3_styles', 'option'); if( $h3_styles ): ?>
	h3  	{ font-size: <?php echo $h3_styles['h3_size']; ?>; line-height: <?php echo $h3_styles['h3_line_height']; ?>; color:<?php echo $h3_styles['h3_color']; ?>; font-weight:<?php echo $h3_styles['h3_font_weight']; ?>; text-transform:<?php echo $h3_styles['h3_text_transform']; ?>} 	
<?php endif; ?>
	
<?php $h4_styles = get_field('h4_styles', 'option'); if( $h4_styles ): ?>
	h4  	{ font-size: <?php echo $h1_styles['h4_size']; ?>; line-height: <?php echo $h4_styles['h4_line_height']; ?>; color:<?php echo $h4_styles['h4_color']; ?>; font-weight:<?php echo $h4_styles['h4_font_weight']; ?>; text-transform:<?php echo $h4_styles['h4_text_transform']; ?>} 	
<?php endif; ?>
	
<?php $p_styles = get_field('p_styles', 'option'); if( $p_styles ): ?>
	p, li		{ font-size: <?php echo $p_styles['p_size']; ?>; line-height: <?php echo $p_styles['p_line_height']; ?>; color:<?php echo $p_styles['p_color']; ?>; font-weight:<?php echo $p_styles['p_font_weight']; ?>; text-transform:<?php echo $p_styles['p_text_transform']; ?>} 	
<?php endif; ?>
	
<?php $a_styles = get_field('a_styles', 'option'); if( $a_styles ): ?>
	#content a		{color:<?php echo $a_styles['link_color']; ?>; text-decoration: <?php echo $a_styles['link_decoration']; ?>} 	
	#content a:hover	{color:<?php echo $a_styles['link_hover_color']; ?>; text-decoration: <?php echo $a_styles['link_hover_decoration']; ?>} 	
<?php endif; ?>	
	
/* HERO*/	
<?php $h1_styles = get_field('h1_hero_styles', 'option'); if( $h1_styles ): ?>
	#hero h1  	{ font-size: <?php echo $h1_styles['h1_size']; ?>; line-height: <?php echo $h1_styles['h1_line_height']; ?>; color:<?php echo $h1_styles['h1_color']; ?>; font-weight:<?php echo $h1_styles['h1_font_weight']; ?>} 	
<?php endif; ?>
	
<?php $h2_styles = get_field('h2_hero_styles', 'option'); if( $h2_styles ): ?>
	#hero h2  	{ font-size: <?php echo $h2_styles['h2_size']; ?>; line-height: <?php echo $h2_styles['h2_line_height']; ?>; color:<?php echo $h2_styles['h2_color']; ?>; font-weight:<?php echo $h2_styles['h2_font_weight']; ?>} 	
<?php endif; ?>
	
<?php $h3_styles = get_field('h3_hero_styles', 'option'); if( $h3_styles ): ?>
	#hero h3  	{ font-size: <?php echo $h1_styles['h3_size']; ?>; line-height: <?php echo $h3_styles['h3_line_height']; ?>; color:<?php echo $h3_styles['h3_color']; ?>; font-weight:<?php echo $h3_styles['h3_font_weight']; ?>} 	
<?php endif; ?>
	
<?php $h4_styles = get_field('h4_hero_styles', 'option'); if( $h4_styles ): ?>
	#hero h4  	{ font-size: <?php echo $h4_styles['h4_size']; ?>; line-height: <?php echo $h4_styles['h4_line_height']; ?>; color:<?php echo $h4_styles['h4_color']; ?>; font-weight:<?php echo $h4_styles['h4_font_weight']; ?>} 	
<?php endif; ?>
	
<?php $p_styles = get_field('p_hero_styles', 'option'); if( $p_styles ): ?>
	#hero p		{ font-size: <?php echo $p_styles['p_size']; ?>; line-height: <?php echo $p_styles['p_line_height']; ?>; color:<?php echo $p_styles['p_color']; ?>; font-weight:<?php echo $p_styles['p_font_weight']; ?>} 	
<?php endif; ?>
	
 /* NAVIGATION*/
		<?php $navigation = get_field('navigation', 'option'); if( $navigation ): ?>
	
	#nav-menu ul li a 								{ color:<?php echo $navigation['link_color']; ?> }
	#nav-menu ul li a:hover 						{ color:<?php echo $navigation['link_hover_color']; ?>   }
	#nav-menu ul li ul li a 						{ color: <?php echo $navigation['dropdown_link_color']; ?>   }
	#nav-menu ul li ul li a:hover 					{ background: <?php echo $navigation['dropdown_link_background_hover_color']; ?> ; color:<?php echo $navigation['dropdown_link_hover_color']; ?>  ; }
	#nav-menu ul li ul li 							{ background: <?php echo $navigation['dropdown_link_background_color']; ?> ; color:<?php echo $navigation['dropdown_link_color']; ?>  ; }
	#nav-menu ul li ul li:hover 					{ background: <?php echo $navigation['dropdown_link_background_hover_color']; ?> ; color:<?php echo $navigation['dropdown_link_hover_color']; ?>  ; }
	#nav-menu .active>a								{color:<?php echo $navigation['link_active_color']; ?>}

	

	
	
<?php endif; ?>
	

	
 

 

	
	
 
		
	
</style>