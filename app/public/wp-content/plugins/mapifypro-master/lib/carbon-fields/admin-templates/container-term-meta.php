<?php
foreach ($this->fields as $field) {
	$field->load();
	
	if ( $field->type == 'Separator' ) {
		?>
		<tr class="mpfy-carbon-separator">
			<th colspan="2">
				<?php 
				echo $field->get_label();
				
				if ( !empty( $help_text ) ) {
					echo '<div class="mpfy-help-text"><em>' . $help_text . '</em></div>';
				}
				?>
			</th>
		</tr>
		<?php
	} else {
		?>
		<tr class="form-field">
			<th scope="row">
				<?php
				echo $field->get_label(); 
				if ( $field->is_required() ) {
					echo ' *';
				} ?>
			</th>
			<td>
				<div class="mpfy-carbon-field mpfy-carbon-<?php echo implode(' mpfy-carbon-', $field->get_html_class()); ?>" data-type="<?php echo $field->type ?>" data-name="<?php echo $field->get_name() ?>">
					<?php echo $field->render(); ?>
					<em class="mpfy-help-text"><?php echo $field->get_help_text(); ?></em>
				</div>
			</td>
		</tr>
		<?php
	}
}

wp_nonce_field('carbon_panel_' . $this->id . '_nonce', $this->get_nonce_name(), /*referer?*/ false, /*echo?*/ true);
?>