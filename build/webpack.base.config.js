let path = require('path');
let {config} = require('../config');
let htmlWebpackPlugin = require('html-webpack-plugin');

let webpackconfig={
    entry: path.join(config.absoluteSource, config.entry),
    output: {
        filename: config.entry,
        path: config.absolutePacked
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'es2015', 'react'],
                        plugins: []
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: path.join(config.absolutePacked, config.openPage),
            template: path.join(config.absoluteSource, config.openPage),    
            hash: true,
            inject: true,
            chunksSortMode: "dependency",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true
            }
        })
    ]
};

module.exports=webpackconfig;