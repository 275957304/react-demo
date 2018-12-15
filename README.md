### webapck4-react16-router4

### node >= v8.9.0


## 目录结构说明

```
   ├── README.md
   ├── build                        // webpack 构建工具配置文件夹
   │   ├── webpack.dev.js           // 开发模式配置 
   │   └── webpack.prod.js          // 生产环境配置
   ├── dist                         // 生产编译后的文件
   │   └── index.html
   ├── package.json
   ├── src                          // 源码目录
   │   ├── api                      // 归纳一些需要 http 请求的 api
   │   │   ├── axios.js             // 封装的网络请求模块
   │   │   └── index.js             // 网络请求部分
   │   ├── components               // 展示型组件，按照容器组件分文件夹
   │   │   ├── App                  // App 容器组件子组件文件夹
   │   │   │   └── index.js
   │   ├── containers               // 容器组件
   │   │   ├── Home
   │   │   └── User.js
   │   ├── images                   // 图片资源
   │   ├── index.js                 // react 入口文件
   │   ├── reducers                 // redux 模块，包括 reducer 部分与 action 部分
   │   │   ├── index.js             // 合并后的总的 reducer
   │   │   ├── user                 // 对应某个容器组件，集中了这个容器的 数据和 action
   │   │   │   ├── actions.js
   │   │   │   └── reducer.js
   │   │   └── types.js   // 抽出来的 type 常量
   │   ├── router
   │   │   └── index.js             // 基本路由配置
   │   ├── store                    // store 配置
   │   │   ├── configureStore.js
   │   │   └── index.js
   │   ├── style                    // 样式文件
   │   │   └── index.less
   │   ├── template                 // 页面模板
   │   └── utils                    // 公用的工具
   │       └── index.js
   └── postcss.config.js            //配置postcss
```

https://github.com/275957304/holichat
