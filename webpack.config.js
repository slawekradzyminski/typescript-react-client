const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? 'https://java-backend-server-1-0.onrender.com'
  : 'http://localhost:4001';
const publicPath = isProduction ? '/typescript-react-client/' : '/';

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'API_URL': JSON.stringify(apiUrl),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
});

module.exports = {
    mode: isProduction ? 'production' : 'development',
    output: {
        publicPath: publicPath,
    },
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