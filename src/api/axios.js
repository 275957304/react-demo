import axios from 'axios'
import createHashHistory from 'history/createHashHistory'
const qs = require('qs');
const history = createHashHistory();
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

let baseURL = '';
let routerMode = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = '/api'
  routerMode = 'history'
} else if (process.env.NODE_ENV === 'production') {
  // 匹配api接口 https://github.com/liuweijw/fw-framework
  // api 接口文档 http://localhost:8082/api/swagger-ui.html
  baseURL = 'http://tanwan.com'
  routerMode = 'hash'
}

// axios defaults 配置
axios.defaults.timeout = 10000
axios.defaults.baseURL = baseURL
//标识这是一个 ajax 请求
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Cache-Control'] = 'no-cache'
//axios.defaults.withCredentials = true //配置允许跨域携带cookie



// http request 拦截器
axios.interceptors.request.use(config => {
	//NProgress.start();
  // 在这里设置请求头与携带token信息
  //config.setHeaders([])
	console.log(config  + '加载中。。。')
	return config
}, err => {
	return Promise.reject(err)
});

// http response 拦截器
axios.interceptors.response.use(response =>{
	//这里可以写关闭页面请求的加载动画
	//NProgress.done();
  // 在这里你可以判断后台返回数据携带的请求码
  // if (response.data.retcode === 200 || response.data.retcode === '200') {
  //   return response.data.data || response.data
  // }else {
  //   //请求报错. history.push('/login')
  // }
	return response
}, err => {
	if (err.response) {
		console.log(err.response);
		//history.push('/login')
	}
	return Promise.reject(err.response)
})



//es8的async await让异步变成了同步的写法



const api = {
  async get (url, data) {
    try {
      let res = await axios.get(url, {params: data})
      res = res.data
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          resolve(res)
        }
      })
    } catch (err) {
      alert('服务器出错')
      console.log(err)
    }
  },
  async post (url, data) {
    try {
      let res = await axios.post(url, qs.stringify(data))
      res = res.data
      return new Promise((resolve, reject) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      })
    } catch (err) {
      // return (e.message)
      alert('服务器出错')
      console.log(err)
    }
  },
}
export { api }

//上述代码中,首先采用try,catch 捕获请求的错误, 如果网络状态差,服务器错误等 ,然后在请求成功状态中,亦可统一处理请求代码,这个可以根据具体项目处理,上例表示code=0的时候为结果正确状态.

//使用
// import { api } from 'common/js/api'
// async getList () {
//   let {data} = await api.get('/ferring/test/list')
//   console.log(data)
//   this.list = data
// }