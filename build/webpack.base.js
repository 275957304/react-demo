const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // 1. __dirname 为node全局对象，是当前文件所在目录
    // 2. context为 查找entry和部分插件的前置路径，绝对路径，用于从配置中解析入口起点(entry point)和 loader
    context: path.resolve(__dirname, '../'),
    entry:{
        app: './src/index.js'
    },
    output:{
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [ 
            {test: /\.js$/,exclude: /node_modules/,use: {loader: 'babel-loader'}},
            {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,loader: 'url-loader',options: {outputPath: 'images',limit: 5 * 1024}},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {
                test:/\.(css|less)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}},
                    //{loader: 'style-loader'},
                    {loader: 'css-loader',options: {}},                  
                    {loader: 'postcss-loader',options: {
                        // plugins: [
                        //     require("autoprefixer") /*在这里添加*/
                        // ]
                    }},
                    {loader: 'less-loader',options: {}}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@src': path.resolve(__dirname, './src')
        }
    }
}

//https://webpack.docschina.org/configuration/