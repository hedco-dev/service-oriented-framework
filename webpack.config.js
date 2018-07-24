const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './client/app.js',
    output: {
        path: path.resolve(__dirname, 'www/assets/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_moudles)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_moudles)/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.sass$/,
                exclude: /(node_moudles)/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },
        ]
    },
    optimization: {
        // minimizer: [
        //     new UglifyJsPlugin({
        //         test: /\.js($|\?)/i,
        //         cache: true
        //     })
        // ],
    }
};
