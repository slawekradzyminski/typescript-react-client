const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Load environment variables from .env file
dotenv.config();

const apiUrl = process.env.API_URL || 'https://java-backend-server-1-0.onrender.com';

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'API_URL': JSON.stringify(apiUrl)
    }
});

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        definePlugin
    ],
    devServer: {
        historyApiFallback: true
    }
}