/**
 *@Description 开发环境Webpack配置项
 */
const conf = require('./webpack.main.js');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const jquery = require("jquery");

const options = {
    output: {
        path: path.join(__dirname, '../../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {}
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/log4js.json'),
        //     filename: './log4js.json',
        //     inject: false
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/scripts/[name].bundle.js'
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, '/src/views/common/pages/layout.html'),
            filename: './views/common/pages/layout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, '/src/views/common/pages/mainlayout.html'),
            filename: './views/common/pages/mainlayout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/error/pages/404.html'),
            filename: './views/error/pages/404.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/error/pages/500.html'),
            filename: './views/error/pages/500.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, '/src/views/index/pages/index.js'),
            filename: './views/index/pages/index.html',
            inject: false,
            chunks: ['vendor', 'common', 'index-index']
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/video/pages/index.js'),
        //     filename: './views/video/pages/video.html',
        //     inject: false,
        //     chunks: ['vendor', 'common', 'video-index']
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, '../src/views/taskMore/pages/taskMore.js'),
        //     filename: './views/taskMore/pages/taskMore.html',
        //     inject: false,
        //     chunks: ['vendor', 'common', 'taskMore']
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/bookDesk/pages/index.js'),
        //     filename: './views/bookDesk/pages/bookDesk.html',
        //     inject: false,
        //     chunks: ['vendor', 'common', 'bookDesk-index']
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/bookcommon/pages/layout.html'),
        //     filename: './views/bookcommon/pages/layout.html',
        //     inject: false,
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/book/pages/index.js'),
        //     filename: './views/book/pages/book.html',
        //     inject: false,
        //     chunks: ['vendor', 'common', 'book-index']
        // }),

        // //学生简历
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/student/pages/index.js'),
        //     filename: './views/student/pages/student.html',
        //     inject: false,
        //     chunks: ['vendor', 'common', 'student-index']
        // }),
        // new HtmlWebpackPlugin({
        //     template: path.join(conf.rootPath, './src/views/studentsResume/pages/layout.html'),
        //     filename: './views/studentsResume/pages/layout.html',
        //     inject: false,
        // }),

        // new CopyWebpackPlugin([{
        //     context: path.join(conf.rootPath, './src/book'),
        //     from: '**/*',
        //     to: 'book'
        // }]),
        //@TODO:搞清楚作用
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ExtractTextPlugin("assets/styles/[name].css"),
        new webpack.LoaderOptionsPlugin({ //压缩css部分
            minimize: true
        }),
    ]
};
const _options = Object.assign(options, conf.dev);
for (let i in conf.TemplatePage) {
    _options.plugins.push(
        new HtmlWebpackPlugin({
            template: conf.TemplatePage[i],
            filename: './widgets/' + i + '/' + i + '.html',
            inject: false
        })
    )
};
module.exports = _options;