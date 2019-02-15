const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const Webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

var jsConfig = {
    mode: process.env.NODE_ENV ? 'production' : 'development',
    target: 'web',
    watch: process.env.NODE_ENV === 'development' ? true : false,
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.js']
    },
    entry: {
        vendor: ['jquery','bootstrap','chart.js'],
        bundle: path.join(__dirname, './assets/scripts/index.js')
    },
    output: {
        path: path.join(__dirname, './.build/js'),
        filename: '[name].js'
    },   
    cache: true,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        compact: false
                    }
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true,
            },
            sourceMap: true,
        }),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './assets/fonts'),
                to: path.join(__dirname, './.build/fonts')
            },
            {
                from: path.join(__dirname, './assets/images'),
                to: path.join(__dirname, './.build/images')
            }
        ])
    ]
}

var scssConfig = {
    mode: process.env.NODE_ENV ? 'production' : 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    resolve: {
        extensions: ['.scss', '.css']
    },
    entry: {
        index: path.join(__dirname, './assets/styles/index.scss')
    },
    output: {
        path: path.join(__dirname, './.build/css')
    },
    cache: true,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 versions'],
                                    cascade: false
                                })
                            ],
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
}
module.exports = [jsConfig, scssConfig]
