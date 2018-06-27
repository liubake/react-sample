let merge = require('webpack-merge')
let webpackBaseConfig = require('./webpack.base.config');
let {devServerOptions} = require('../config');
const modeEnvironment='production';

let webpackConfig = merge(webpackBaseConfig, {
    mode: modeEnvironment,
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        })
    ],
    devServer: devServerOptions
});

module.exports=webpackConfig;