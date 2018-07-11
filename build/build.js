let ora = require('ora')
let path = require('path')
//let chalk = require('chalk')
let rimraf = require('rimraf')
let webpack = require('webpack')
let {config} = require('../config');
let webpackConfig = require('./webpack.prod.config')

process.env.NODE_ENV = webpackConfig.mode
const spinner = ora({
    spinner:'dots',
    text:'Build for production...'
}).start()

rimraf(path.join(config.absolutePacked), err=>{
    if(err) {
        spinner.fail(err)
        throw err
    }
    webpack(webpackConfig,(err1,stats)=>{
        if(err1) {
            spinner.fail(err1)
            throw err1
        }
        process.stdout.write(stats.toString({
            colors:       true,
            modules:      false,
            children:     false,
            chunks:       false,
            chunkModules:  false
        })+'\n\n')
        spinner.succeed('Build complete.\n')
    })
})