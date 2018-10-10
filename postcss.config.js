module.exports = {
    plugins:[
        require("autoprefixer"), // 自动添加css前缀
        require('postcss-pxtorem')({
            rootValue: 100,
            unitPrecision: 5,
            propList: ['*'],  //propList是一个存储哪些将被转换的属性列表
            // selectorBlackList: [/^p/],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 6  //所有小于6px的样式都不被转换
          }),
          require('postcss-adaptive')({
            remUnit: 45 //不会对postcss-pxtorem有任何影响，此代码仅供测试，无任何意义。
          })    
    ]
}

// postcss-loader autoprefixer
