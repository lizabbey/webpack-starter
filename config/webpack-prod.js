const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
		}),
		new ImageminPlugin({
			cacheFolder: '../cache',
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
								require('autoprefixer'),
								require('postcss-object-fit-images'),
								require('pixrem')({
									atrules: true,
								}),
								require('cssnano')()
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
							}
						}
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
			}, {
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