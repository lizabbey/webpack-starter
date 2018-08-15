const merge = require('webpack-merge');
const common = require('./webpack-common.js');
//const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            //hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        //new WebpackMd5Hash(),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
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
                                }),
                                require('css-mqpacker')(),
                                require('cssnano')()
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
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'src'
                        }
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                              {collapseGroups: false},
                              {cleanupIDs: false}
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
                            name: '[path][name].[ext]',
                            context: 'src'
                        }
                    },                    
                    {
                        loader: 'image-webpack-loader',
                        options: {
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
                            svgo: {
                                //enabled: false
                                collapseGroups: false,
                                cleanupIDs: false
                            }
                        }
                    }
                ]
            },
        ]
    }
});