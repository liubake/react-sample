let path = require('path');
let {getEntriesMap, config} = require('../config');
let htmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 基础打包配置
 */
let webpackconfig={
    entry: config.entriesMap.entries,
    output: {
        filename: '[name].js?ver=[chunkhash]',
        chunkFilename:'[name].js?ver=[chunkhash]',
        path: config.absolutePacked
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias:{
            '@':config.resolveRoot,
            '@common':config.resolveCommon,
            '@commonjs':config.resolveCommonjs
        }
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            },
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
            }
        ]
    }
};

/**
 * 多入口打包配置
 */
webpackconfig.plugins = webpackconfig.plugins || [];
let entryPagesMap = getEntriesMap(config.absoluteSource, 'page', '.html');
for(let mapKey in entryPagesMap.map){
    let entryPage = entryPagesMap.entries[entryPagesMap.map[mapKey]];
    let relativePage = path.relative(config.absoluteSource, entryPage);
    webpackconfig.plugins.push(new htmlWebpackPlugin({
        inject: true,
        template: entryPage,
        filename: path.join(config.absolutePacked, relativePage),
        chunksSortMode: "dependency",
        chunks: [config.entriesMap.map[mapKey]].concat([config.splitChunk.vendor.name, config.splitChunk.common.name]),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true
        }
    }))
}

module.exports=webpackconfig;