'use strict';

import { OpenStreetMapProvider } from 'leaflet-geosearch';
const $ = jQuery;
const $document = $( document );

$document.ready(function(){

window.mpfy_carbon_field.Map_Mpfy = function( element, fieldObject ) {
	element.data( 'exposed_field_object', fieldObject );
	var field = element.find( '.mpfy-carbon-map-field' ),
		mapContainer = element.find( '.mpfy-carbon-map-canvas' ),
		exists = 0,
		marker = false,
		zoom = field.data( 'zoom' ),
		coords = field.val(),
		temp,
		lat,
		lng;

	if ( coords !== '' || coords.split( ',' ).length == 2 ) {
		temp = coords.split( ',' );
		lat = parseFloat( temp[0] );
		lng = parseFloat( temp[1] );

		exists = temp[0] !== '0' && temp[1] !== '0';
	}

	if ( ! exists || isNaN( lat ) || isNaN( lng ) ) {
		lat = field.data( 'default-lat' );
		lng = field.data( 'default-lng' );
	};

	var layers = {
		'road': [
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				minZoom: 2,
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
			}),
		],
		'terrain': [
			L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
				minZoom: 2,
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
			}),
		],

		'grayscale': [
			L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				minZoom: 2,
				maxZoom: 18,
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
			}),
		],
		'blue_earth': [
			L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png', {
				minZoom: 2,
				maxZoom: 18,
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
			}),
		],
		'watercolor': [
			L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 2,
				maxZoom: 16,
				ext: 'png'
			}),
		],
		'ink': [
			L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
				subdomains: 'abcd',
				minZoom: 2,
				maxZoom: 20,
				ext: 'png'
			}),
		],
		'pastel': [
			L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				minZoom: 2,
				maxZoom: 19,
				attribution: '© <a target="_blank" href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
			}),
		],

		'image': new L.TileLayer( 'z{z}-tile_{y}_{x}.png', {
			minZoom: 0,
			maxZoom: 4,
			noWrap: true
		} ),
	};

	var attributionControl = L.control.attribution( {
		prefix: false,
		position: 'bottomleft',
	} );

	var zoomControl = L.control.zoom( {
		position: 'bottomright'
	} );

	var map = L.map( mapContainer.get( 0 ), {
		'attributionControl': false,
		'zoomControl': false,
		'doubleClickZoom': false,
		'scrollWheelZoom': true,
	} );

	map.setView( [lat, lng], zoom );
	map.crb = {'markers': []};
	fieldObject.map = map;

	var currentLayerType = 'road';
	fieldObject.setMapType = function( type, newLayers ) {
		var layerGroup = layers[ currentLayerType ];
		for (var i = 0; i < layerGroup.length; i++) {
			map.removeLayer( layerGroup[ i ] );
		}

		currentLayerType = type;
		if ( newLayers ) {
			layers[ currentLayerType ] = newLayers;
		}

		for (var i = 0; i < layers[ currentLayerType ].length; i++) {
			map.addLayer( layers[ currentLayerType ][ i ] );
		}

		map.addControl( attributionControl );

		// Refresh zoom control position to always be above attribution
		map.removeControl( zoomControl );
		map.addControl( zoomControl );
	};
	fieldObject.setMapType( currentLayerType );

	fieldObject.update_marker_position = function( point ) {
		var latLng = point.latLng || point;
		if ( marker ) {
			marker.setLatLng( latLng );
			map.panTo( latLng, {
				reset: true,
				animate: false,
				noMoveStart: true
			} );
		} else {
			marker = L.marker( latLng, {
				draggable: true
			});
			map.addLayer( marker );
			map.crb.markers.push( marker );

			marker.on( 'dragend', update_value );
		}
		update_value();
	}

	// if we had coords in input field, put a marker on that spot
	if ( exists == 1 ) {
		fieldObject.update_marker_position( [lat, lng] );
	}

	// on click move marker and set new position
	map.on( 'dblclick', function( e ) {
		fieldObject.update_marker_position( e.latlng );
		$('select[name="_map_main_location"]').val('0').trigger('change');
	} );
	map.on( 'zoomend', update_value );

	function update_value() {
		field.val( marker.getLatLng().lat + ',' + marker.getLatLng().lng + ',' + map.getZoom() );
	}

	fieldObject.enableImageMode = function( imageSourcePattern ) {
		fieldObject.setMapType( 'image', [ L.tileLayer( imageSourcePattern, {
			minZoom: 0,
			maxZoom: 4,
			noWrap: true
		} ) ] );
	};

	// Gocoding
	var search_field = element.find( '.address' );
	var geocoder = new OpenStreetMapProvider();

	// Decorate the base field with a geo coder
	element.find( '.address-search-btn' ).on( 'click', geocode_address );

	// Disable the form submission with enter key; instead, initiate address geocoding
	search_field.on('keypress', function (e) {
		var enter_keycode = 13;
		if ( e.keyCode !== enter_keycode ) {
			return true;
		}

		e.preventDefault();

		search_field.attr( 'disabled', true );
		var value = search_field.val();
		var coordinates_regex = /^[\d\.]+,\s?[\d\.]+$/;

		if (coordinates_regex.test(value)) {
			var coords = value.split(/[,\s]+/, 2);
			fieldObject.update_marker_position( L.latLng(coords) );
			search_field.attr( 'disabled', false );
		} else {
			geocode_address( search_field.val() )
				.then( (results) => {
					if (results.length > 0) {
						fieldObject.update_marker_position( results[0] );
					} else {
						alert( crbl10n.geocode_not_successful + 'No results found' );
					}
					search_field.attr( 'disabled', false );
				} );
		}
		return false;
	});

	function geocode_address( query ) {
		return geocoder.search( { query: query } )
			.then( ( results ) => {
				var filteredResults = [];
				for (var i = 0; i < results.length; i++) {
					var result = results[i]
					filteredResults.push( [result.y, result.x] );
				}
				return Promise.resolve( filteredResults );
			} );
	};

	map.addControl(attributionControl);
}

window.mpfy_carbon_field.Leaflet_Map = function( element, fieldObject ) {
	mpfy_carbon_field.Map_Mpfy( element, fieldObject );
};

});
