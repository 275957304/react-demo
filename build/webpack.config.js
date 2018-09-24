const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//优化 webpack 输出信息
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

console.log(process.env.NODE_ENV);

//const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //new UglifyJSPlugin() 用于压缩 JS 代码，减少资源体积大小

// px2rem-loader   webpack-px2rem-loader 这个移动端. https://github.com/Jinjiang/px2rem-loader

module.exports = {

  //mode: 'development',  //production
  //development模式特性:a.浏览器调试工具 b.注释、开发阶段的详细错误日志和提示 c.快速和优化的增量构建机制
  //production模式特性: a.开启所有的优化代码 b.更小的bundle大小 c.去除掉只在开发阶段运行的代码 d.Scope hoisting和Tree-shaking

  entry: [
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ], 

  output: {                                             
    path: path.resolve(__dirname, '../dist'),
    // publicPath:website.publicPath,
    // chunkFilename: "js/[name].chunk.js",
    filename: 'js/[name].js'
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
    // 开启热更新
    hot: true,
    // 在页面上全屏输出报错信息
    overlay: true,
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:8000,
    //接口代理配置
    proxy: {
      "/test/*": {
        target:"http://localhost:8088",
        secure: false,
      }
    },
    //所有的路径都执行index.html
    historyApiFallback : true,
    watchOptions: {
      ignored: /node_modules/, //忽略不用监听变更的目录
      aggregateTimeout: 300, //防止重复保存频繁重新编译,500毫米内重复保存不打包
      poll: true //每秒询问的文件变更的次数
    }
  },

  optimization:{
    splitChunks:{
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0 //优先级
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
          // enforce: true
        }//,
        // styles:{
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   minChunks: 2,
        //   enforce: true
        // }
      }
    }
  },

  module: {                                            
    rules: [ 
      {                                     
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          outputPath: 'images', // 图片输出的路径
          limit: 5 * 1024
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },

      {
            // test 表示测试什么文件类型
            test:/\.(css|less)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // (segmentfault 这儿的多行注释渲染有点问题 😰，改成单行注释形式)
                  // 复写 css 文件中资源路径
                  // webpack3.x 配置在 extract-text-webpack-plugin 插件中
                  // 因为 css 文件中的外链是相对与 css 的，
                  // 我们抽离的 css 文件在可能会单独放在 css 文件夹内
                  // 引用其他如 img/a.png 会寻址错误
                  // 这种情况下所以单独需要配置 publicPath，复写其中资源的路径
                  //
                  publicPath: '../' 
                }
              },
              {loader: 'css-loader',options: {}},
              {loader: 'less-loader',options: {}}
            ]
        }
      
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['dist', 'build']),   
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(), //优化 webpack 输出信息
    new htmlWebpackPlugin({
      //favicon:'./src/img/favicon.ico', //favicon路径
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

    new MiniCssExtractPlugin({
         filename: 'css/[name].css'
     })

  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.resolve(__dirname, './src')
    }
  }
};


/*
注意事项
在开发环境 prop-types 插件来验证数据


热更新：在使用热更新时，我们的 chunk 名中不能使用 [hash] 做标识，文件名变化无法热更新，所以需要将原来配置在公共配置中的 output 中的文件名配置分别写入生产和开发模式配置中，开发模式去掉 [hash]
filename: 'static/[name].js', 
chunkFilename: 'static/[id].js'

HtmlWebpackPlugin：在生产模式下，我们将 html 文件写入到 dist 下，但是在开发模式下，并没有实际的写入过程，且 devServer 启动后的服务内容与 contentBase 有关，两者需要一致，所以我们将 HtmlWebpackPlugin 的配置也分为 生产和开发模式，开发模式下使用：new HtmlWebpackPlugin({
  filename: 'index.html', // 文件写入路径，前面的路径与 devServer 中 contentBase 对应
  template: path.resolve(__dirname, '../src/index.html'),// 模板文件路径
  inject: true
})


*/