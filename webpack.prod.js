const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
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
                use: 'babel-loader'
            },
            {
                test:/\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,  
                    'css-loader',                
                    'sass-loader'                 
                ]
            },
            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({  
            filename: 'styles.css',  
        }),
        new WorkboxPlugin.GenerateSW(),  
    ],
    stats: {
        errorDetails: true  
    }
};
