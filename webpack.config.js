var path = require('path'),


	rootPath = path.join(__dirname, '../', '../'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"),

	piraCSS = new ExtractTextPlugin("css/[name].styles.css", {
		publicPath: '/css/',
		allChunks: true
	}),

	config = {

		entry: {
			pira: [
          "./src/entry.js"
        ]
		},

		output: {
			path: path.join(__dirname, 'build'),
			publicPath: '/js/',
			filename: "js/bundle.[name].js"
		},

		devtool: 'source-map',

		module: {
			/**preLoaders: [
						{
							//test: /\.js?$/,
							//loaders: ['jshint'],
							//exclude: '/node_modules/',
							//include: ['js/lib/TWGLDemo']
			      }
			    ],*/

			loaders: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract("style-loader", "css-loader")
				}
    	]
		},

		resolve: {

			modulesDirectories: ["src/js", "node_modules", "src/css"],
			extensions: ['', '.js', '.css'],
			root: [path.join(__dirname, './src')],
			alias: {
				"domready": "lib/require/domReady",
				'feature': 'lib/feature.min',
				"hammer": "lib/hammer.min",
				"polyfill": "lib/polyfill",
				"classie": "lib/classie",
				'tweenmax': 'lib/TweenMax.min',
				"fire": "app/fire",
				"pira": "app/pira"
			}
		},

		plugins: [
      piraCSS
    ],

		watch: false,
		debug: true
	}

module.exports = config;
