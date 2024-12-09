const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',  
    stats: 'verbose',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',  
            },
            {
                test: /\.(sass|scss)$/, 
                use: [
                    MiniCssExtractPlugin.loader,  
                    'css-loader',  
                    'sass-loader', 
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html', 
            filename: './index.html',  
        }),
        new CleanWebpackPlugin({
            dry: false,  
            verbose: true,  
            cleanStaleWebpackAssets: true,  
            protectWebpackAssets: false,  
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',  
        }),
        new WorkboxPlugin.GenerateSW(),  
        new webpack.HotModuleReplacementPlugin(),  
    ],
    devServer: {
        port: 5050,  
        allowedHosts: 'all',  
        contentBase: path.join(__dirname, 'dist'),
        hot: true, 
        open: true,  
        watchContentBase: true,  
    },
};
