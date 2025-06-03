// @afe/request文档  http://npm.dc.servyou-it.com/-/web/detail/@afe/request
// 配置同axios https://www.npmjs.com/package/axios#global-axios-defaults
import { Modal } from 'dpl-react';

import { afeRequest } from '@afe/request';
// const HOST = 'http://walle.dc.servyou-it.com';
// axios.create建议不要使用，否则@afe/request默认拦截器不生效

const instance = afeRequest();

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // config.url = HOST + config.baseURL + config.url;
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  // const data = response.data || {};
  // const { head, body } = data;
  // if (head.status !== 'Y') {
  //   console.error(head.msg);
  //   throw head;
  // }
  // return body;
  if (response) {
    commonResponseInterceptor(response.data);
    return response.data;
  }
  return response;
}, (error) => {
  // 对响应错误做点什么
  if (error.response) {
    commonErrorHandler(error.response);
  }
  return Promise.reject(error);
});

const alertError = (title = '服务异常', content = '服务异常，请联系管理员') => {
  Modal.alert({
    title,
    content,
  });
};

function commonErrorHandler(error) {
  if (error) {
    switch (error.status) {
      case 404:
        return error;
      case 403:
        return error;
      case 500:
        //  history.push('/500')
        alertError();
        return error;
      case 501:
        //  history.push('/500')
        alertError();
        return error;
      case 502:
        //  history.push('/500')
        alertError();
        return error;
      case 503:
        //  history.push('/500')
        alertError();
        return error;
      default:
        return error;
    }
  }
}

function commonResponseInterceptor(data) {
  switch (data.messageCode) {
    case 'api.auth.unlogon': // 未登录
      // history.push('/login')
      window.bossComponents && window.bossComponents.redirectLogin();
      break;
    case 'api.permission.deny': // 无权限
      alertError();
      // history.push('/401')
      break;
    case 'api.database_error': // 数据库异常
      alertError();
      //  history.push('/500')
      break;
    case 'api.unpredictable_exception': // 未知异常
      alertError();
      //  history.push('/500')
      break;
    default:
      break;
  }
}

export default instance;
