const merge = require('webpack-merge');
const common = require('./webpack-common-p.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
		}),
		new BrowserSyncPlugin({
			proxy: 'https://starter-test-site.local', //CHANGE TO THE CURRENT .local SITE
			https: true, //Change if needed
			files: [
				'wp-content/themes/**/*.css',
				{
					match: ['**/*.php'],
				}
			]
		})
	],

	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						}
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer'),
							],
						}
					},
					{
						loader: 'sass-loader',
					}
				]
			},
			
			
		]
	}
});