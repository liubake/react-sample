let webpack = require('webpack')
let webpackMerge = require('webpack-merge')
let vconsolePlugin = require('vconsole-webpack-plugin')
let {devServerOptions} = require('../config');
let webpackBaseConfig = require('./webpack.base.config');
const modeEnvironment='development';

/**
 * 开发环境打包配置
 */
let webpackConfig = webpackMerge(webpackBaseConfig, {
    mode: modeEnvironment,
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        }),
        new webpack.HotModuleReplacementPlugin(),
        new vconsolePlugin({ enable: true })
    ],
    devServer: devServerOptions
});

module.exports=webpackConfig;