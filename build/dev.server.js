let ora = require('ora')
let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let webpackDevConfig = require('./webpack.dev.config');

const spinner = ora({ spinner:'dots', text:'Prepare for dev...'}).start()
webpackDevServer.addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);
let port = process.env.PORT || webpackDevConfig.devServer.port
let server = new webpackDevServer(webpack(webpackDevConfig), webpackDevConfig.devServer);
server.listen(port, '0.0.0.0', () => { 
    spinner.succeed('Dev server started.')
});