const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        open: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
        // new StyleLintPlugin({
        //     configFile: './config/stylelint.config.js',
        //     files: './src/scss/**/*.scss',
        //     syntax: 'scss'
        // }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    
                    { 
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('precss')(),
                                require('autoprefixer')({
                                    browsers: ['last 2 versions']
                                })
                            ],
                            sourceMap: true,
                            config: {
                                path: './config/postcss'
                            }
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