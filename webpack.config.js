var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        'API_URL': JSON.stringify(process.env.NODE_ENV === 'production'
            ? 'https://java-backend-server-1-0.onrender.com'
            : 'http://localhost:4001'
        )
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