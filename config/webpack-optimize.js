const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack-common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const purgecss = require('@fullhuman/postcss-purgecss');
// const purgecssWordpress = require('purgecss-with-wordpress');

const config = merge(common, {
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin({
			protectWebpackAssets: false,
            cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
		new MediaQueryPlugin({
			include: [
				'theme'
			],
			queries: {
				'(min-width:576px)': 'sm',
				'(min-width:768px)': 'md',
				'(min-width:992px)': 'lg',
				'(min-width:1200px)': 'xl',
			},
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				// Lossless optimization with custom option
				plugins: [
					['mozjpeg', {
						progressive: true,
						quality: 65,
					}],
					['pngquant', {
						quality: [.65, .9]
					}],
				],
				fileName: '[path][name].[ext]'
			},
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
					},
					MediaQueryPlugin.loader,
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									// purgecss({
									// 	content: ['./**/*.php', paths.src + '/js/**/*.js'],
									// 	safelist: {
									// 		standard: [...purgecssWordpress.safelist, 'text-main'],
									// 		greedy: [/site-logo/],
									// 	},
									// 	variables: true,
									// }),
									'autoprefixer',
									'postcss-object-fit-images',
									'postcss-combine-media-query',
									'pixrem',
									'cssnano',
									
								]
							},
						}
					},
					{
						loader: 'sass-loader',
					}, 
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								require.resolve('bootstrap/scss/_functions.scss'),
								paths.src + '/scss/base/_customize.scss',
								require.resolve('bootstrap/scss/_variables.scss'),
								require.resolve('bootstrap/scss/_mixins.scss'),
							]
						},
					}
				]
			}
		]
	}
});

module.exports = config;