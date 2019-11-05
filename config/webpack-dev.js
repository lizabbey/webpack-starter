const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		open: true
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src'
						}
					}
				]
			},
		],
	},
});