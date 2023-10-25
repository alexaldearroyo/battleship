const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', 
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    devServer: {
        contentBase: './',
        watchContentBase: true
    }
};
