/*
 * @Author: ouhaiping
 * @Date: 2021-08-21 17:09:42
 * @LastEditors: ouhaiping
 * @LastEditTime: 2021-08-21 20:30:59
 * @Description: axios 二次封装
 */

import axios from 'axios';
import config from '@/config/index.js';
import { ElMessage } from 'element-plus';
import router from '@/router/index.js';

const TOKEN_INVALID = 'Token 认证失败,请重新登录';
const NETWORK_ERROR = '网络请求异常,请重试';


console.log("config",config);

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8 * 1000,
});

// 请求拦截
service.interceptors.request.use((req) => {
  const headers = req.headers;
  if (!headers.Authorization) headers.Authorization = 'Bear manage';
  return req;
});

// 响应拦截
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code == 200) {
    return data;
  } else if (code === 4001) {
    ElMessage.error(TOKEN_INVALID);
    setTimeout(() => {
      router.push('/login');
    }, 15000);
    return Promise.reject(TOKEN_INVALID);
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

/**
 * @description 请求函数封装
 * @param {*} options 请求配置
 */

function request(options) {
  options.method = options.method || 'get';
  if (options.method.toLowerCase === 'get') {
    options.params = options.data;
  }

  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi;
  } else {
      console.log('config',config);
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }

  return service(options);
}


['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {  // 使用this.$request.get() 的方式
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})


export default request;
