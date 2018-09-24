import axios from 'axios'
import qs from 'qs'

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error)
})
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

//或者 可以用Vue.prototype.axiosRequest = function () {}
//保存到全局中 使用更加方便 看个人喜好

const axiosRequest = function (obj) {
  var data = jointRequestData(obj.data)
  return axios({
    method: obj.method,
    url: obj.url,
    data: qs.stringify(data, {allowDots: true}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 20000,
  })
}

const axiosRequestAll = function (arr) {
  var aRequest = []
  for (var i of arr) {
    var data = jointRequestData(i.data)
    aRequest.push(axios({
      method: i.method,
      url: i.url,
      data: qs.stringify(data, {allowDots: true}),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }))
  }
  return axios.all(aRequest).then(axios.spread(function () {
    var aReturn = []
    for (var i of arguments) {
      aReturn.push(i)
    }
    return aReturn
  }))
}

const jointRequestData = function (data) {
  for (let i in data) {
    if (typeof data[i] === 'object') {
      data[i] = JSON.stringify(data[i])
    }
  }
  return data
}


//使用方式

// var obj1 = {
//   method: 'post',
//   url: _this.GLOBAL.BASE_URL + 'api/1',
//   data: {
//     id: '11'
//   }
// }
// util.axiosRequest(obj).then((res) => {
//   console.log(res)
// })
// var obj2 = {
//   method: 'post',
//   url: _this.GLOBAL.BASE_URL + 'api/2',
//   data: {
//     id: '22'
//   }
// }
// util.axiosRequestAll([obj1, obj2]).then((res) => {
//   console.log('请求1', res[0])
// console.log('请求2', res[1])
//})



//https://segmentfault.com/a/1190000008063435
//https://github.com/bailicangdu/react-pxq/blob/master/src/api/api.js