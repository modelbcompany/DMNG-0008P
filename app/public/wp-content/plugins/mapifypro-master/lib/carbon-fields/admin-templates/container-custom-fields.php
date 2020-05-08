<table class="mpfy-carbon-container <?php echo $container_tag_class_name ?>" data-type="<?php echo $container_type ?>" data-options='<?php echo json_encode($container_options) ?>'>
	<?php
	foreach ($this->fields as $field) {
		$field->load();
		$help_text = $field->get_help_text();
		
		if ( $field->type == 'Separator' ) {
			?>
			<tr class="mpfy-carbon-separator">
				<th>
					<?php 
					echo $field->get_label();
					
					if ( !empty( $help_text ) ) {
						echo '<div class="mpfy-help-text"><em>' . $help_text . '</em></div> ';
					}
					?>
				</th>
			</tr>
			<?php
		} else {
			?>
			<tr>
				<td>
					<label for="<?php echo $field->get_id() ?>">
						<?php 
							echo $field->get_label(); 
							if ( $field->is_required() ) {
								echo ' <span class="mpfy-carbon-required">*</span>';
							}
						?>
					</label>
					<div class="mpfy-carbon-field mpfy-carbon-<?php echo implode(' mpfy-carbon-', $field->get_html_class()); ?>" data-type="<?php echo $field->type ?>" data-name="<?php echo $field->get_name() ?>">
						<?php echo $field->render(); ?>
					</div>
					<?php if( !empty( $help_text ) ) :  ?><em class="mpfy-help-text"><?php echo $help_text; ?></em><?php endif; ?>
				</td>
			</tr>
			<?php
		}
	}
	?>
</table>
<?php wp_nonce_field($this->get_nonce_name(), $this->get_nonce_name(), /*referer?*/ false, /*echo?*/ true); ?>
