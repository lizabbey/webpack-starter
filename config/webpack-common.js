const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		theme: './src/theme.js',
		frontpage: './src/front-page.js'
		//Add entry points here as you need them
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new webpack.ProvidePlugin({
			SVGInjector: 'svg-injector-2'
		}),
		new WebpackBuildNotifierPlugin({
			suppressCompileStart: true
		}),
		new SVGSpritemapPlugin('./src/image/icons/**/*.svg', { //CHANGE THIS IF YOUR ICONS FOLDER IS DIFFERENT
			output: {
				filename: 'image/spritemap.svg',
				svg4everybody: true,
				svgo: true,
			},
		})
	],
	externals: {
		jquery: 'jQuery'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}]
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /image/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return '[name].[ext]';
								}
								return '[path][name].[ext]';
							}
						}
					}
				]
			}
		]
	}
};
