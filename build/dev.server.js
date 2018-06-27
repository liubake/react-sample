let webpack = require('webpack');
let webpackDevServer = require('webpack-dev-server');
let webpackDevConfig = require('./webpack.dev.config');
let {devServerOptions} = require('../config');

webpackDevServer.addDevServerEntrypoints(webpackDevConfig, devServerOptions);
let port = process.env.PORT || devServerOptions.port
let server = new webpackDevServer(webpack(webpackDevConfig), devServerOptions);
server.listen(port, '0.0.0.0', () => { console.log('Starting server'); });