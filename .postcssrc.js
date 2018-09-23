//postcss.config.js 
// module.exports = {
//     plugins: [
//         require('autoprefixer')({
//             browsers: [
//                 // 加这个后可以出现额外的兼容性前缀
//                 "> 0.01%"
//             ]
//         })
//     ]
// }


module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "ie >= 9",
        "ff >= 30",
        "chrome >= 34",
        "safari >= 7",
        "opera >= 23"
      ]
    }
  }
}

//a:先sudo -s获取最高权限. b:“vim .babelrc”新建一个.babelrc 文件. c: 按i  d:“esc”键退出。输入“:wq” 

