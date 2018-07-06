let path = require('path');
let glob = require('glob');

/**
 * 搜索指定目录指定扩展名的入口映射对象
 * @param {*} basePath 
 * @param {*} searchDir 
 * @param {*} fielExtension 
 */
let getEntriesMap = (basePath, searchDir, fielExtension)=>{
    let entriesMap = {}, map={}, entries={};
    glob.sync(path.join(basePath, '**', searchDir, '*'+fielExtension)).forEach(function (entry) {
        let relativePath = path.relative(basePath, entry);
        let entryKey = relativePath.replace(fielExtension, '');
        let mapKey = relativePath.replace(path.join(searchDir, path.basename(relativePath)), path.basename(relativePath, fielExtension));
        map[mapKey] = entryKey;
        entries[entryKey] = entry;
    })
    entriesMap['map'] = map;
    entriesMap['entries'] = entries;
    return entriesMap;
};

/**
 * 打包相关配置项
 */
let config = Object.assign({
    'root':'./',
    'source':'./source',
    'packed':'./packed'
});
config = Object.assign({
    'absoluteRoot': path.resolve(config.root),
    'absoluteSource':path.resolve(config.source),
    'absolutePacked':path.resolve(config.packed)
}, config);
config = Object.assign({
    'resolveRoot':config.absoluteSource,
    'resolveCommon':path.join(config.absoluteSource, 'common'),
    'resolveCommonjs':path.join(config.absoluteSource, 'common', 'js'),
    'entriesMap':getEntriesMap(config.absoluteSource, 'js', '.js'),
    'splitChunk':{
        'vendor':{
            'name': path.join('common', 'js', 'vendor'),
            'testPath':'node_modules|util-.*'
        },
        'common':{
            'name': path.join('common', 'js', 'common'),
            'testPath': [config.source.replace(config.root,''), 'common','js','components'].join('\\\\')
        }
    }
}, config);

/**
 * 开发服务器配置
 */
let devServerOptions = {
    after: (app) => {},
    // allowedHosts: [],
    before: (app) => {},
    // bonjour: true,
    clientLogLevel: 'info', // none error warning info
    // color: true,
    // compress: true,
    contentBase: config.source,
    disableHostCheck: true,
    // filename: '', // 在惰性模式中，此选项可减少编译。 默认在惰性模式，每个请求结果都会产生全新的编译。使用 filename，可以只在某个文件被请求时编译。
    // headers: {},
    // host: '0.0.0.0',
    // hot: true,
    hotOnly: true, // Enables Hot Module Replacement (see devServer.hot) without page refresh as fallback in case of build failures.
    // https: false,
    inline : false, // false to iframe
    // lazy: false,  // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”。
    noInfo: true, // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    open: true, // When open is enabled, the dev server will open the browser.
    openPage: config.openPage, // Specify a page to navigate to when opening the browser.
    // overlay: true,            //  {warnings: true,errors: true}
    // pfx: '',
    // pfxPassphrase: '',
    port: '56789',
    // proxy: {},
    // progress: true,    // cli
    // public: "myapp.test:80", 
    publicPath: '/',
    // quiet: true,
    // socket: 'socket',
    stats: {
        colors: true
    },
    useLocalIp: true,
    // watchContentBase: true, // Tell the server to watch the files served by the devServer.contentBase option. File changes will trigger a full page reload.
    // watchOptions: {}
}

module.exports={getEntriesMap, config, devServerOptions}