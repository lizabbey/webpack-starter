const paths = require('./paths');
const { merge } = require('webpack-merge');
const common = require('./webpack-common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//CHANGE TO THE CURRENT .local SITE
const proxyUrl = 'https://amcom.dev-local/';

const config = merge(common, {
	watch: true,
	devtool: 'source-map',
	mode: 'development',
	plugins: [
		new BrowserSyncPlugin({
            proxy: proxyUrl,
			https: true,
            files: [
                'wp-content/themes/**/*.css',
                'wp-content/themes/**/*.js',
                {
                    match: ['../**/*.php'],
                },
            ],
            injectCss: true,
        }),
		new CleanWebpackPlugin(),
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
					MediaQueryPlugin.loader,
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