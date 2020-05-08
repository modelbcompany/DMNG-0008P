;jQuery(function($) {

window.mpfy_carbon_field.Image_Pin = function(element, field_obj) {
	element.find('.button:not(.mpfy-carbon-file-remove)').click(function() {
		window.carbon_active_field = element;
		tb_show('','media-upload.php?post_id=0&type=image&carbon_type=image&TB_iframe=true');
	});

	element.find('.mpfy-carbon-file-remove').click(function() {
		element.find('img').addClass('blank').attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
		element.find('.mpfy-carbon-image-field').val('');
		$(this).hide();
		return false;
	});
}

window.mpfy_carbon_field.Image_Pin = function(element, field_obj) {
	if (typeof(crb_media_types) == 'undefined') {
		var crb_media_types = {};
	}

	// Runs when the image button is clicked.
	$(element).find('.c2_open_media').click(function (e) {
		e.preventDefault();

		var row = $(this).closest('.mpfy-carbon-field'),
			input_field = row.find('input.mpfy-carbon-file-field'),
			button_label = $(this).attr('data-window-button-label'),
			window_label = $(this).attr('data-window-label'),
			value_type = $(this).attr('data-value-type'),
			file_type = $(this).attr('data-type'); // audio, video, image

		if (typeof(crb_media_types[element.data('type')] == 'undefined')) {
			crb_media_types[element.data('type')] = wp.media.frames.crb_media_field = wp.media({
				title: window_label ? window_label : crbl10n.title,
				library: { type: file_type }, // autio, video, image
				button: { text: button_label },
				multiple: false
			});

			var crb_media_field = crb_media_types[element.data('type')];

			// Runs when an image is selected.
			crb_media_field.on('select', function () {
				// Grabs the attachment selection and creates a JSON representation of the model.
				var media_attachment = crb_media_field.state().get('selection').first().toJSON();
				//Object:
				// alt, author, caption, dateFormatted, description, editLink, filename, height, icon, id, link, menuOrder, mime, name, status, subtype, title, type, uploadedTo, url, width

				// Sends the attachment URL to our custom image input field.
				var media_value = media_attachment[value_type];

				input_field.val(media_value).trigger('change');

				switch (file_type) {
					case 'image':
						// image field type
						row.find('.mpfy-carbon-view_image').attr( 'src', media_value );
						row.find('.mpfy-carbon-view_file').attr( 'href', media_value );
						row.find('.mpfy-carbon-description, img').show();
						break;
					case 'audio':
					case 'video':
					default:
						if (parseInt(media_value)==media_value) {
							// attachment field type
							if (media_attachment.type=='image') {
								row.find('.mpfy-carbon-view_image').attr( 'src', media_attachment.url );
								row.find('.mpfy-carbon-description, img').show();
							}else{
								// all other file types
								row.find('.mpfy-carbon-description, img').hide();
							};
						}else{
							// file field type
						};
						row.find('span.attachment_url').html( media_attachment.url );
						row.find('.mpfy-carbon-view_file').attr('href', media_attachment.url);
						row.find('.mpfy-carbon-description').show();
				}
			});
		}

		var crb_media_field = crb_media_types[element.data('type')];

		// Opens the media library frame
		crb_media_field.open();
	});

	$(element).find('.mpfy-carbon-file-remove').click(function (e) {
		var fieldContainer = $(this).closest('.mpfy-carbon-field');

		fieldContainer.find('.mpfy-carbon-description').hide();
		fieldContainer.find('input.mpfy-carbon-file-field').attr('value', '');
		fieldContainer.find('span.attachment_url').html('');
		fieldContainer.find('img').hide();
	});
}

window.mpfy_carbon_field.Relationship_Mpfy = window.mpfy_carbon_field.Relationship;

mpfy_carbon_field.Image_List = function(element, field_obj) {
	mpfy_carbon_field.Complex.call(this, element, field_obj);

	if (typeof(crb_media_types) == 'undefined') {
		var crb_media_types = {};
	}

	element.find('> .mpfy-carbon-subcontainer > tbody > tr.mpfy-carbon-actions a[data-action=add_multiple]:first').click(function(e) {
		e.preventDefault();

		field_obj.new_row_type = $(this).data('group');

		crb_media_field = wp.media.frames.crb_media_field = wp.media({
			title: 'Add images to Gallery',
			library: { type: 'image' }, // autio, video, image
			button: { text: 'Add Images' },
			multiple: true
		});

		// Runs when an image is selected.
		crb_media_field.on('select', function () {
			// Grabs the attachment selection and creates a JSON representation of the model.
			var media_attachment = crb_media_field.state().get('selection').toJSON();
			//Object:
			// alt, author, caption, dateFormatted, description, editLink, filename, height, icon, id, link, menuOrder, mime, name, status, subtype, title, type, uploadedTo, url, width

			for (var i = 0; i < media_attachment.length; i++) {
				var ma = media_attachment[i];

				field_obj.group_selector.find('a:first').trigger('click');
				var row = element.find('.mpfy-carbon-group-row input.mpfy-carbon-file-field:last').closest('.mpfy-carbon-group-row');

				row.find('input.mpfy-carbon-file-field').val( ma.url );
				row.find('.mpfy-carbon-view_image').attr( 'src', ma.url );
				row.find('.mpfy-carbon-view_file').attr( 'href', ma.url );
				row.find('.mpfy-carbon-description, img').show();
				if (!row.find('.mpfy-carbon-file-remove').length) {
					row.find('.mpfy-carbon-preview').append('<span class="mpfy-carbon-file-remove"></span>');
				}
			}
		});

		// Opens the media library frame
		crb_media_field.open();
	});
}

});