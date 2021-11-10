const webpack = require('webpack');
const paths = require('./paths');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
process.traceDeprecation = true;

const config = {
	context: paths.root,
	entry: {
		//Add entry points here as you need them
		theme: paths.src + '/js/theme.js',
		// admin: paths.src + '/js/admin.js',
		// critical_fp: './src/scss/critical-fp.scss', //CSS ONLY OUTPUT
	},
	output: {
		path: paths.build,
		publicPath: paths.build,
		filename: 'js/[name].js',
		assetModuleFilename: 'image/[name][ext]'
	},
	plugins: [
		new webpack.ProvidePlugin({
			SVGInjector: 'svg-injector-2'
		}),
		new WebpackBuildNotifierPlugin({
			suppressCompileStart: true
		}),
		new SVGSpritemapPlugin(paths.src + '/image/icons/**/*.svg', {
			output: {
				//CHANGE THIS IF YOUR ICONS FOLDER IS DIFFERENT
				filename: 'image/spritemap.svg',
				svgo: true,
			},
		})
	],
	// externals: {
	// 	jquery: 'jQuery'
	// },
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
        		exclude: /node_modules/
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /image/,	
				generator: {
					filename: 'fonts/[name][ext]'
				},
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				type: 'asset/resource',
				dependency: { not: ['url'] },
			},
			{
				test: /\.svg$/,
				exclude: [/image\/icons/],
				use: [{
						loader: 'file-loader',
						options: {
							context: 'src',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return 'image/[name].[ext]';
								}
								return '[path][name].[ext]';
							},
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									name: 'removeViewBox',
									active: false
								},
								'removeDimensions'
							]
						}
					}
				]
			},
		]
	}
};

module.exports = config;