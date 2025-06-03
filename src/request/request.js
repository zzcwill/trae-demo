import axios from "axios";

import { isPlainObject, isFunction, isFileList } from "../utils/index";
import { baseUrl } from "../const/index";
import history from "../history";
import { deepMerge } from "../utils/deepMerge";
import { message, Modal } from "dpl-react";

// function formatParams(params) {
//   if(params && params.pageSize) {
//     const newkey = Object.keys(params);
//     const newObj = {};
//     for (let i = 0; i < newkey.length; i++) {
//       if(params[newkey[i]] === 'all') {
//         newObj[newkey[i]] = undefined;
//       }else {
//         newObj[newkey[i]] = params[newkey[i]];
//       }
//     }
//     return newObj;
//   }
//   return params
// }
/**
 * @desc request工厂方法
 *  before 接收config，返回值将被合并进config中
 *  after 接收response对象，返回值将被resolve
 *  errorHandler 接收error.response对象，返回值将被reject
 * */
function requestCreator({ before, after, errorHandler }) {
  let defaultOptions = {
    headers: {
      "x-requested-with": "XMLHttpRequest",
    },
  };
  let options = {};
  const axiosInstance = axios.create({});

  axiosInstance.interceptors.request.use((config) => {
    // config.params = formatParams(config.params)
    if (isFunction(before)) {
      options = before(config);
      options = isPlainObject(options)
        ? deepMerge([config, defaultOptions, options])
        : deepMerge([config, defaultOptions]);
    }
    return options;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data.head && response.data.body) {
        const {code, msg, status, ...other} = response.data.head;
        response.data = {
          messageCode: code,
          message: msg,
          success: status === "Y",
          ...other,
          data: response.data.body,
        };
      }
      commonResponseInterceptor(response.data);
      if (response) {
        if (isFunction(after)) {
          return after(response);
        }
        return response.data;
      }
    },
    (error) => {
      commonErrorHandler(error.response);
      if (isFunction(errorHandler)) {
        const errResult = errorHandler(error.response);
        return errResult ? Promise.reject(errResult) : Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}

const alertError = (title = "服务异常", content = "服务异常，请联系管理员") => {
  Modal.alert({
    title: title,
    content: content,
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
    case "api.auth.unlogon": //未登录
      // history.push('/login')
      window.bossComponents && window.bossComponents.redirectLogin();
      break;
    case "api.permission.deny": //无权限
      alertError();
      // history.push('/401')
      break;
    case "api.database_error": //数据库异常
      alertError();
      //  history.push('/500')
      break;
    case "api.unpredictable_exception": //未知异常
      alertError();
      //  history.push('/500')
      break;
    default:
      break;
  }
}

export const post = requestCreator({
  before(options) {
    return {
      method: "post",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    };
  },
  after(response) {
    return response.data;
  },
  errorHandler(error) {
    return error;
  },
});

export const get = requestCreator({
  before(options) {
    return { method: "get" };
  },
});

export const postFile = requestCreator({
  before(options) {
    let originData = options.data;
    let resultData = new FormData();
    Object.keys(originData).forEach((key) => {
      resultData.append(key, originData[key]);
    });
    const resultOptions = {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: resultData,
    };
    return deepMerge(options, resultOptions);
  },
});

export const postMultipartFile = requestCreator({
  // 批量上传图片
  before(options) {
    let originData = options.data;
    let resultData = new FormData();
    originData.files.forEach((item) => {
      resultData.append("files", item);
    });
    const resultOptions = {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: resultData,
    };
    return deepMerge(options, resultOptions);
  },
});

export const postFileCommon = requestCreator({
  before(options) {
    let originData = options.data;
    let resultData = new FormData();
    Object.keys(originData).forEach((key) => {
      if (Array.isArray(originData[key]) || isFileList(originData[key])) {
        const item = originData[key];
        for (let i = 0, len = item.length; i < len; i++) {
          resultData.append(key, item[i]);
        }
      } else {
        resultData.append(key, originData[key]);
      }
    });
    const resultOptions = {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: resultData,
    };
    return deepMerge(options, resultOptions);
  },
});

export const postWithReturn = async ({
  options,
  onSuccess,
  successText,
  onError
}) => {
  const res = options.postFunc ? await options.postFunc(options.data) : post(options);
  if (res.success) {
    if (successText) {
      message.success(successText);
    }
    onSuccess?.(res.data);
  } else {
    message.error(res.message);
    onError?.(res);
  }
}
