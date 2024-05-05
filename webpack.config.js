var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify('http://localhost:4001')
            }
        })
    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://localhost:4001'
        })
    }
}