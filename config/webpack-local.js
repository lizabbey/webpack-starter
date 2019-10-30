const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
		}),
		new ImageminPlugin({
			cacheFolder: 'cache',
			pngquant: {
				quality: '95-100'
			},
			mozjpeg: {
				progressive: true,
				quality: 65
			},
			optipng: {
				enabled: true,
			},
			pngquant: {
				quality: '65-90',
				speed: 4
			},
			gifsicle: {
				interlaced: false,
			},
			svgo: null,
			externalImages: {
				context: '../src/image',
				destination: '../dist/image',
				fileName: '[path][name].[ext]'
			}
		}),
		new BrowserSyncPlugin({
			proxy: 'https://starter.local/', //CHANGE TO THE CURRENT .local SITE
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
						options: {
							sourceMap: true,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer')({
									browsers: ['last 2 versions']
								}),
							],
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.svg$/i,
				exclude: /image\/icons/,
				use: [
					{
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
								{ collapseGroups: false },
								{ cleanupIDs: false },
								{ removeViewBox: false },
								{ removeDimensions: true }
							]
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'src',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return 'image/[name].[ext]';
								}
								return '[path][name].[ext]';
							}
						},
					}
				]
			},
		]
	}
});