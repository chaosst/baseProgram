import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'


// 创建axios实例
var qs = require('qs'); // ES5
const service = axios.create({
  // transformRequest:[function(data) {
  //     console.log(service)
  //     return qs.stringify(data);
  // }],
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000,                  // 请求超时时间
});
// respone拦截器
service.interceptors.response.use(
  config => {
      let permission = config.method + config.url.replace(config.baseURL,',');
      if(!has(permission)){
          //验证不通过
          return Promise.reject({
              message: `no permission`
          });
      }
      return config;
  },
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    //const res = response;
    if (res.code !== '200' && res.code !== 200) {
      if(res.code == '404'){
          window.location.href="/status/404";
      }else if(res.code == '401'){
          window.location.href="/status/401";
      }else if(res.code == '500'){
          window.location.href="/status/500";
      }else if(res.code == '504'){
          window.location.href="/status/504";
      }
    } else {
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
)

export default service;
