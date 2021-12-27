const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

let config = {
    entry: ['babel-polyfill', './src/js/script.js', './src/css/style.css'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new webpack.DefinePlugin({
            "ENV": JSON.stringify(process.env),
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            monify: false
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },
    devServer: {
        open: true
    }
}

module.exports = config;