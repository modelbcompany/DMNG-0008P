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
	

	 

	
 
 
		
	
</style>