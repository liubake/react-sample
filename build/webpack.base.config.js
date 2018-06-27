let path = require('path');
let {config} = require('../config');

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
};

module.exports=webpackconfig;