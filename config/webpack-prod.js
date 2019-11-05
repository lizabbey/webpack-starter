const merge = require('webpack-merge');
const common = require('./webpack-common-p.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
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
			
		]
	}
});