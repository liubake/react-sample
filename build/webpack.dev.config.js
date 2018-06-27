let merge = require('webpack-merge')
let webpackBaseConfig = require('./webpack.base.config');
let {devServerOptions} = require('../config');
const modeEnvironment='development';

let webpackConfig = merge(webpackBaseConfig, {
    mode: modeEnvironment,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        })
    ],
    devServer: devServerOptions
});

module.exports=webpackConfig;