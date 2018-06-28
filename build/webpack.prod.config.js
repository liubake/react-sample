let webpack = require('webpack')
let webpackMerge = require('webpack-merge')
let {devServerOptions} = require('../config');
let uglifyJsPlugin=require('uglifyjs-webpack-plugin');
let webpackBaseConfig = require('./webpack.base.config');
const modeEnvironment='production';

let webpackConfig = webpackMerge(webpackBaseConfig, {
    mode: modeEnvironment,
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        })
    ],
    devServer: devServerOptions
});

module.exports=webpackConfig;