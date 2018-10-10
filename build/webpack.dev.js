//开发模式与生产模式的不同是，在开发时会频繁运行代码，所以很多东西在开发模式是不推荐配置的如css文件提取，代码压缩等。
//所以针对一些写入公共配置文件，但是开发模式不需要的功能，我们需要做类似修改：process.env.NODE_ENV === 'production' ? true : false，如 css 预处理中是否需要配置提取 loader MiniCssExtractPlugin.loader。
//此外还有一些是只配置在生产模式下的，如 MiniCssExtractPlugin 和 js 代码拆分优化。
//开发模式我们需要一个开发服务，帮我们完成实时更新、接口代理等功能。我们使用 webpack-dev-server。

/*
"scripts": {
    "dev": "webpack-dev-server --config ./build/webpack.dev.js"
}
使用 --config 指定配置文件，由于命令直接调用 webpack-dev-server 运行，所以我们直接写配置就好，可以不像生产模式一样去编写调用逻辑。
*/
process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const webpackBaseConfig = require('./webpack.base')
//const CopyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(webpackBaseConfig)

module.exports = merge(webpackBaseConfig, {
    // 开发模式配置
    mode: 'development',
    //热更新：在使用热更新时，我们的 chunk 名中不能使用 [hash] 做标识，文件名变化无法热更新，所以需要将原来配置在公共配置中的 output 中的文件名配置分别写入生产和开发模式配置中，开发模式去掉 [hash]
    output:{
        //path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js', 
        chunkFilename: 'js/[id].js'
    },
    devServer:{
        //配置此静态文件服务器，可以用来预览打包后项目 
        contentBase:false, // path.join(__dirname, "../dist"), //开发服务运行时的文件根目录
        //服务器的IP地址，可以使用IP也可以使用localhost
        //host:'location',
        // 显示 webpack 构建进度
        progress: true,
        // 开启浏览器
        open: true, 
        // 开启热更新必须有webpack.HotModuleReplacementPlugin
        hot: true,
        // 在页面上全屏输出报错信息
        overlay: true,
        //lazy: true, //当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为惰性模式。
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8080,
        //接口代理配置 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
        proxy: {
            "/twapi": {
                target:"http://hd.tanwan.com",
                secure: false,
                changeOrigin: true,
                cookieDomainRewrite: "localhost:8080",
                cookiePathRewrite: "",
                crossDomain: true,
                pathRewrite: {
                    '^/twapi':'/api/twapp/'
                }
            }
        },
        //所有的路径都执行index.html不跳转
        historyApiFallback : true,
        watchOptions: {
            ignored: /node_modules/, //忽略不用监听变更的目录
            aggregateTimeout: 300, //防止重复保存频繁重新编译,500毫米内重复保存不打包
            poll: true //每秒询问的文件变更的次数
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin(), //优化 webpack 输出信息
        //在生产模式下，我们将 html 文件写入到 dist 下，但是在开发模式下，并没有实际的写入过程，且 devServer 启动后的服务内容与 contentBase 有关，两者需要一致，
        //所以我们将 htmlWebpackPlugin 的配置也分为 生产和开发模式，开发模式下使用：
        new htmlWebpackPlugin({
            filename: './index.html', // 文件写入路径，前面的路径与 devServer 中 contentBase 对应
            template: path.resolve(__dirname, '../src/template/index.html'),
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        　　chunkFilename: "[id].css"
        })
    ]
})