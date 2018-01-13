/**
 *@Description 生产环境Webpack配置项
 */
const conf = require('./webpack.main');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const options = {
    output: {
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minify: {
                collapseWhitespace: true
            },
            filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
        }),
        new CopyWebpackPlugin([{
            context: path.join(conf.rootPath, './src/book'),
            from: '**/*',
            to: 'book'
        }]),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/log4js.json'),
            filename: './log4js.json',
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: './src/views/common/pages/layout.html',
            filename: './views/common/pages/layout.html',
            inject: false,
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/views/error/pages/404.html',
            filename: './views/error/pages/404.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: './src/views/error/pages/500.html',
            filename: './views/error/pages/500.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false
        }),
        new HtmlWebpackPlugin({
            template: './src/views/index/pages/index.js',
            filename: './views/index/pages/index.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false,
            chunks: ['vendor', 'common', 'index-index']
        }),
        new HtmlWebpackPlugin({
            template: './src/views/video/pages/index.js',
            filename: './views/video/pages/video.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false,
            chunks: ['vendor', 'common', 'video-index']
        }),
        new HtmlWebpackPlugin({
            template: './src/views/student/pages/index.js',
            filename: './views/student/pages/student.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false,
            chunks: ['vendor', 'common', 'student-index']
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/taskMore/pages/taskMore.js'),
            filename: './views/taskMore/pages/taskMore.html',
            inject: false,
            chunks: ['vendor', 'common', 'taskMore']
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/bookDesk/pages/index.js'),
            filename: './views/bookDesk/pages/bookDesk.html',
            inject: false,
            chunks: ['vendor', 'common', 'bookDesk-index']
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/bookcommon/pages/layout.html'),
            filename: './views/bookcommon/pages/layout.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(conf.rootPath, './src/views/book/pages/index.js'),
            filename: './views/book/pages/book.html',
            inject: false,
            chunks: ['vendor', 'common', 'book-index']
        }),
        new HtmlWebpackPlugin({
            template: './src/views/studentsResume/pages/layout.html',
            filename: './views/studentsResume/pages/layout.html',
            inject: false,
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
        }),
        new webpack.LoaderOptionsPlugin({ //压缩css部分
            minimize: true
        }),

        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        }),
        new ExtractTextPlugin("assets/styles/[name].[hash:5].css"),
    ]
}
let _options = Object.assign(options, conf.prod);
for (let i in conf.TemplatePage) {
    _options.plugins.push(
        new HtmlWebpackPlugin({
            template: conf.TemplatePage[i],
            filename: './widgets/' + i + '/' + i + '.html',
            minify: {
                removeCommets: true,
                collapseWhitespace: true
            },
            inject: false
        })
    )
};
module.exports = _options;