require.config({

	baseUrl: 'src/js', //!!! relative to html

	text: {
		useXhr: function (url, protocol, hostname, port) {
			// allow cross-domain requests
			// remote server allows CORS
			return true;
		}
	},

	shim: {
		'tweenmax': {
			exports: 'TweenMax'
		},

		'hammer': {
			exports: 'Hammer'
		},

		'fire': {
			deps: ["polyfill"]
		},

		'feature': {
			exports: 'feature'
		},

		'classie': {
			exports: 'classie'
		}
	},

	paths: {
		"domready": "lib/require/domReady",
		'feature': 'lib/feature.min',
		"hammer": "lib/hammer.min",
		"polyfill": "lib/polyfill",
		"propagating": "lib/propagating",
		"classie": "lib/classie",
		'tweenmax': 'lib/TweenMax.min',
		"fire": "app/fire",
		"pira": "app/pira"

	}
});
