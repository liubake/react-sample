let webpack = require('webpack')
let webpackMerge = require('webpack-merge')
let {devServerOptions} = require('../config');
let webpackBaseConfig = require('./webpack.base.config');
const modeEnvironment='development';

let webpackConfig = webpackMerge(webpackBaseConfig, {
    mode: modeEnvironment,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        })
    ],
    devServer: devServerOptions
});

module.exports=webpackConfig;