import React, { useState, useEffect } from "react";
import qs from "qs";

import {
  isObject,
  isArray,
  isFunction,
  isEmptyArray,
  isUndef,
  isBoolean,
  isString,
} from "./utils";
// 默认配置参数
const defaultConfig = {
  queryFunc: null, // 查询方法
  listFormat: null, // 数据格式化方法
  listName: "list", // 要处理的list名称
  isUseQueryString: false, // 是否需要在hash中暂存数据,queryString模式
  isSearchRightNow: false, // 是否在页面初始化后立即搜索
  errorCallback: null, // 接口调用success为false时的返回
  defaultParam: {}, // 默认的参数值
};

/**
 * 枚举设置信息的类型
 */
const configCheckMap = {
  beforeQuery: {
    required: false, // 是否必填
    checkFunc: isFunction, //校验参数
    message: "is not a function", // 错误类型提示
  }, // 查询前的数据处理，入参为param，如果需要修改需要return返回修改后的param，否则使用原先的param
  queryFunc: {
    required: true, // 是否必填
    checkFunc: isFunction, //校验参数
    message: "is not a function", // 错误类型提示
  }, // 查询方法
  listFormat: {
    required: false, // 是否必填
    checkFunc: isFunction, //校验参数
    message: "is not a function", // 错误类型提示
  }, // 数据格式化方法
  isUseQueryString: {
    required: false, // 是否必填
    checkFunc: isBoolean, //校验参数
    message: "is not a boolean", // 错误类型提示
  }, // 是否需要在hash中暂存数据,queryString模式
  isSearchRightNow: {
    required: false, // 是否必填
    checkFunc: isBoolean, //校验参数
    message: "is not a boolean", // 错误类型提示
  }, // 是否在页面初始化后立即搜索
  errorCallback: {
    required: false, // 是否必填
    checkFunc: isFunction, //校验参数
    message: "is not a function", // 错误类型提示
  }, // 接口调用success为false时的返回
  defaultParam: {
    required: false, // 是否必填
    checkFunc: isObject, //校验参数
    message: "is not a object", // 错误类型提示
  }, // 默认的参数值
  listName: {
    required: false, // 是否必填
    checkFunc: isString, //校验参数
    message: "is not a string", // 错误类型提示
  }, // 默认的参数值
}; // 配置信息中的必填参数列表

/**
 * 初始化查询条件
 * @param {Object} params
 * @param {boolean} isUseQueryString
 */
function initParam(params, isUseQueryString) {
  let obj = null;
  // 判断是否使用queryString的形式，如果是queryString则和url中的数据做组合
  // TODO 简化
  if (isUseQueryString) {
    obj = Object.assign(
      {
        pageIndex: 1,
        pageSize: 10,
      },
      qs.parse(window.location.hash.split("?")[1]),
      params
    );
  } else {
    obj = Object.assign(
      {
        pageIndex: 1,
        pageSize: 10,
      },
      params
    );
  }
  return obj;
}

/**
 * 检查参数是否必填
 * @param {Object} config
 */
function checkConfig(config) {
  const configKeys = Object.keys(config);
  let configIsRequire = [];
  // 获取枚举map的key值，遍历筛选出必填参数
  Object.keys(configCheckMap).forEach((item) => {
    if (configCheckMap[item].required) {
      configIsRequire.push(item);
    }
  });
  // 判断必填参数是否已填
  configIsRequire.forEach((item) => {
    if (configKeys.indexOf(item) < 0) {
      throw new Error(item + " in useGetList is required !");
    }
  });
  // 校验一天参数的类型是否正常
  configKeys.forEach((key) => {
    if (config[key] !== undefined && configCheckMap[key]) {
      const isOk = configCheckMap[key].checkFunc(config[key]);
      if (!isOk) {
        throw new Error(key + configCheckMap[key].message);
      }
    }
  });
}

export default function UseGetList(setting) {
  // 检查配置
  checkConfig(setting);
  // 将传入的参数和默认参数配置组合
  const config = Object.assign({}, defaultConfig, setting);
  const [params, setParams] = useState(() => {
    return initParam(config.defaultParam, config.isUseQueryString);
  }); // 查询参数
  const [list, setList] = useState([]); // 查询列表
  const [loading, setLoading] = useState(false); // 加载loading
  const [total, setTotal] = useState(0); // total 总条数
  const [isSearch, setIsSearch] = useState(() => {
    return config.isSearchRightNow || false;
  }); // 是否初始化后搜索

  /**
   * 查询列表
   */
  const getList = async () => {
    // 设置loading
    setLoading(true);
    // 查询前的数据处理
    const queryData = config.beforeQuery && (await config.beforeQuery(params));
    // checkConfig已经校验过，理论上queryFunc一定存在
    const res =
      config.queryFunc && (await config.queryFunc(queryData || params));
    if (res.success) {
      const data = res.data;
      setTotal(data.total);
      // 格式化列表
      const formatList =
        config.listFormat && config.listFormat(data[config.listName]);
      setList(formatList ? formatList : data[config.listName]);
    } else {
      config.errorCallback && config.errorCallback(res);
    }
    setLoading(false);
  };

  /**
   * 修改查询条件
   * @param {*} params
   */
  const changeParams = (params) => {
    // 将查询设置为true
    setIsSearch(true);
    // 根据类型进行判断
    if (config.isUseQueryString) {
      let hash = window.location.hash.split("#")[1];
      hash = hash.split("?")[0];
      window.location.hash = `#${hash}?${qs.stringify(params)}`;
    } else {
      setParams(params);
    }
  };
  // react中useEffect判断参数是否修改是根据引用是否变化来判断的，同一个引用对象，即使里面的key和value发送了变化也依然不会发生变化
  useEffect(() => {
    if (isSearch) {
      getList();
    }
  }, [params]);

  useEffect(() => {
    // 如果是queryString形式的时候，则注册hashChange事件
    if (config.isUseQueryString) {
      const hashChange = () => {
        setParams(
          Object.assign(
            {
              pageSize: 10,
              pageIndex: 1,
            },
            qs.parse(window.location.href.split("?")[1])
          )
        );
      };
      window.addEventListener("hashchange", hashChange);
      return () => {
        window.removeEventListener("hashchange", hashChange);
      };
    }
  }, []);

  return {
    params,
    getList,
    loading,
    total,
    changeParams,
    list,
  };
}
