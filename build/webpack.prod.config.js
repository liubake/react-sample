let webpack = require('webpack')
let webpackMerge = require('webpack-merge')
let uglifyJsPlugin = require('uglifyjs-webpack-plugin');
let webpackBaseConfig = require('./webpack.base.config');
let {config} = require('../config');
const modeEnvironment = 'production';

/**
 * 生产环境打包配置
 */
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
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: {
                    chunks: 'initial',
                    enforce: true,
                    priority: -10,
                    name: config.splitChunk.vendor.name,
                    test: function (module) {
                        let resource = module.resource;
                        return resource && /\.js/.test(resource) && (new RegExp(config.splitChunk.vendor.testPath)).test(resource);
                    }
                },
                common: {
                    chunks: 'initial',
                    enforce: true,
                    priority: -10,
                    name: config.splitChunk.common.name,
                    test: function (module) {
                        let resource = module.resource;
                        return resource && /\.js/.test(resource) && (new RegExp(config.splitChunk.common.testPath)).test(resource);
                    }
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': modeEnvironment
        })
    ]
});

module.exports=webpackConfig;