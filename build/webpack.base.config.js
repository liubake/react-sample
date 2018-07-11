let path = require('path');
let {config, configHelper} = require('../config');
let htmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 基础打包配置
 */
let webpackconfig={
    entry: config.entriesScriptMap.entryList,
    output: {
        filename: '[name].js',
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[path][name].[ext]?v=[hash]'
                }
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
let entryPagesMap = configHelper.getEntriesMap(config.absoluteSource, 'page', '.html');
for (let mapKey in entryPagesMap.entryMap) {
    let entryPage = entryPagesMap.entryList[entryPagesMap.entryMap[mapKey]];
    let relativePage = path.relative(config.absoluteSource, entryPage);
    webpackconfig.plugins.push(new htmlWebpackPlugin({
        inject: true,
        template: entryPage,
        filename: path.join(config.absolutePacked, relativePage),
        chunksSortMode: "dependency",
        chunks: [config.entriesScriptMap.entryMap[mapKey]].concat([config.splitChunk.vendor.name, config.splitChunk.common.name]),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true
        }
    }))
}

module.exports=webpackconfig;