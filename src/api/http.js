import Axios from 'axios';
import Qs from 'qs';
import store from '@/store';

const http = Axios.create({
  // api的base_url
  baseURL: '/api',
  timeout: 5000,
  headers: {
    //后端json
    //  'Content-Type': 'application/json;charset=UTF-8'
    //后端表单
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  //后端表单application/x-www-form-urlencoded的参数转对象
  transformRequest: [
    function (data) {
      data = Qs.stringify(data);
      return data;
    }
  ]
});

// 设置请求头
http.interceptors.request.use(
  (config) => {
    const token = store.getters.token;
    // console.info('token', token);
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {}
);

// 拦截响应response，并做一些错误处理
http.interceptors.response.use(
  (response) => {
    const resData = response.data;

    return resData;
  },
  (err) => {
    // http状态码不为200时-错误处理
    if (err) {
      console.info(err);
    }
  }
);

export default http;
