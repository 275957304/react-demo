const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css 压缩
//const BundleAnalyzer = require('webpack-bundle-analyzer'); // bundle 分析
const webpackBaseConfig = require('./webpack.base');

//这是 webpack4 的新 api ，有三个预设值：development，production，none，
/*
    webpack4在此配置下默认启用了:
    FlagDependencyUsagePlugin：应该是删除无用代码的，其他插件依赖
    FlagIncludedChunksPlugin：应该是删除无用代码的，其他插件依赖
    ModuleConcatenationPlugin：作用域提升 webpack3的scope hosting
    NoEmitOnErrorsPlugin：遇到错误代码不跳出
    OccurrenceOrderPlugin
    SideEffectsFlagPlugin
    UglifyJsPlugin：js代码压缩
    process.env.NODE_ENV 的值设为 production
*/
module.exports = merge(webpackBaseConfig, {
    // 生产模式配置
    mode: 'production',
    output: {
        //publicPath: 'http://ads.tanwan.com/dist/',
        filename: 'js/[name].[chunkhash:7].js', //development下HotModuleReplacement下文件名无法使用hash, 所以将filename与chunkFilename配置从base中拆分到dev与prod中
        chunkFilename: 'js/[name].[chunkhash:7].js'
    },
    plugins:[
        new htmlWebpackPlugin({
            //favicon:'./src/images/favicon.ico', //favicon路径
            filename: './index.html', //渲染输出html文件名,路径相对于 output.path 的值
            template: path.resolve(__dirname, '../src/template/index.html'),
            title: '积分商城',
            inject:true,//允许插件修改哪些内容，包括head与body
            hash:true,  //为静态资源生成hash值
            showErrors:false, //是否显示错误
            cache:false, //是否缓存
            minify:{  //压缩HTML文件
                removeComments:true,  //移除HTML中的注释
                //collapseWhitespace:true //删除空白符与换行符
            }
        }),
        //css单独打包
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[contenthash:12].css'
        }),
        //实现 chunkhash 的稳定化。https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/#hash
        new webpack.HashedModuleIdsPlugin(),
        new webpack.BannerPlugin("Copyright by zyl")
    ],
    //优化部分包括代码拆分,且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
    optimization:{
        splitChunks:{
            cacheGroups: {
                // 注意: priority 属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "async",
                    minSize: 1,                   
                    //minChunks: 2, // 至少为两个 chunks 的公用代码
                    priority: 0 //优先级
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                    // enforce: true
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    }
});