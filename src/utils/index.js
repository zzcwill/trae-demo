import qs from "qs";
import { allCode } from "@/const/config";
import { loadRemoteConfig } from '@afe/hylia-plugin-galaxy-config/dist';
import { set, get as getValue } from "lodash";

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function isFunction(fn) {
  return typeof fn === "function";
}

export function isFileList(arr) {
  return (
    arr &&
    typeof arr === "object" &&
    Object.prototype.toString.call(arr) === "[object FileList]"
  );
}

export function noop() {}

let toString = Object.prototype.toString;

export function isObject(obj) {
  return (
    obj && typeof obj === "object" && toString.call(obj) === "[object Object]"
  );
}

export function isEmptyArray(arr) {
  return arr === null || arr === undefined || arr.length === 0;
}

export function isArray(arr) {
  return (
    arr &&
    typeof arr === "object" &&
    Object.prototype.toString.call(arr) === "[object Array]"
  );
}

export function isDef(obj) {
  return obj !== undefined;
}

export function isUndef(obj) {
  return obj === undefined;
}

export function arr_splice(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
}

export function clearImage(html) {
  let clearImage = /<img[^>]*>/g;
  return html.replace(clearImage, "");
}

/**
 * 格式化数字数据,三个加一个逗号
 */
export function formatNum(num) {
  let numString = (num || 0).toString();
  let result = "";
  while (numString.length > 3) {
    result = "," + numString.slice(-3) + result;
    numString = numString.slice(0, numString.length - 3);
  }
  if (numString) {
    result = numString + result;
  }
  return result;
}

export function toChineseNum(num) {
  num = num.toString();
  //202
  const changeNum = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
  ];
  const unit = ["", "十", "百", "千", "万"];
  let result = "";
  for (let i = 0; i < num.length; i++) {
    let current = num.charAt(i);
    if (i === num.length - 1 && current === "0") {
      // 最后一位是零
      continue;
    }
    if (num.length === 2 && i === 0 && current === "1") {
      //只有两位的十位
      result = unit[current];
      continue;
    }
    if (current === "0") {
      result = result + changeNum[current];
      continue;
    }
    result = result + changeNum[current] + unit[num.length - i - 1];
  }
  return result;
}

/**
 * 检查是否为数字
 */
export function checkIsNumber(value) {
  if (value && value.trim()) {
    const reg = /^\d*$/;
    if (reg.test(value)) {
      return value;
    }
    return undefined;
  }
  return undefined;
}

export function checkPhone(value) {
  if (value && value.trim()) {
    const reg = /^1[0-9]{10}$/;
    // const reg = /^1[3456789]\d{9}$/;
    if (reg.test(value)) {
      return true;
    }
    return false;
  }
  return false;
}

/**
 * 添加全部的select的option
 */
export function addAllOption(options) {
  return [].concat(
    {
      id: "all",
      name: "全部",
    },
    options
  );
}

export function getQueryString() {
  return qs.parse(window.location.href.split("?")[1]);
}

export function makeUUID() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = "-";
  s[13] = "-";
  s[18] = "-";
  s[23] = "-";

  return s.join("");
}

export function getMonthEndDay() {
  let now = new Date();
  let nowMonth = now.getMonth(); //当前月
  let nowYear = now.getFullYear(); //当前年
  let monthEndDate = new Date(nowYear, nowMonth + 1, 0);
  return {
    now,
    monthEndDate,
  };
}

export function formatImage(str = "") {
  const imgReg = /<img[^>]*>/g;
  const styleReg = /style="([^"]*)"/;
  const result = str.replace(imgReg, (matchStr) => {
    const match = matchStr.match(styleReg);
    if (match) {
      // 有style标签
      let styleArr = match[1].split(";");
      styleArr = styleArr.map((item) => {
        if (item.indexOf("max-width") >= 0) {
          return "max-width:100%";
        }
        return item;
      });
      let styleStr = styleArr.join(";");
      if (styleStr.indexOf("max-width") < 0) {
        styleStr = styleStr + "max-width=100%;";
      }
      return matchStr.replace(styleReg, `style="${styleStr}"`);
    }
    //无style标签
    return matchStr.replace(/>$/, `style="max-width:100%">`);
  });
  return result;
}

// 地区去掉全国
export function removeAll(list, typeName) {
  let result = [];
  if (Array.isArray(list)) {
    result = list.filter((item) => {
      return item[typeName] !== allCode;
    });
  }
  return result;
}

// rate要格式化的小数入0.998 needSuffix是否需要%后缀
export function formatPraiseRate(rate, needSuffix = true) {
  let format = 0;
  if (typeof rate === "number") {
    format = Math.ceil(rate * 1000) / 10;
    format =
      format !== 0 && format !== 100 ? Number(format).toFixed(1) : format;
  }
  return needSuffix ? format + "%" : format;
}

export const APP_ID = "08620100010000";

export const matchNotCN = (str) => {
  if (!str) return true;
  return /^[a-zA-Z0-9`~!@#$%^&*()_\-+=<>?:"|,.\/;'\\\·~！@#￥%……&*（）——\-+=|\[\]\{\}《》？：“”、；‘'，。、]+$/g.test(
    str
  );
};

export let galaxyConfig = {
  employeeUrl: "",
  bannerGroupUrl: "",
  consultChatUrl: ""
};

export function loadGalaxyConfig() {
  return loadRemoteConfig({
    // 配置名称，必填，一个应用可以有多个配置项（在线json文件）
    name: "askone-manage-pc-config",
    // 可选，appCode，底层默认通过process.env.PHOENIX_APP_CODE读取
    appCode: "askone-manage-pc",
    // 可选，主环境名，底层默认通过process.env.PHOENIX_BUILD_ENV读取，对应galaxy配置模块的主环境，如dev / test / release / pre / prod
    envName: process.env.PHOENIX_BUILD_ENV,
  });
}
/**
 * 加载galaxy配置
 */
export async function loadGalaxyConfigByEnv(callback) {
  // galaxy异常会阻断页面，做一个异常捕获
  try {
    // 加载配置
    galaxyConfig = await loadGalaxyConfig();

    callback?.(galaxyConfig);
  } catch (error) {
    callback?.({});
    console.log(error, "galaxy error");
  }
  // 从loadRemoteConfig方法返回值读取配置
  // console.log(config);
  // 也可以通过全局方式访问配置内容, 假设当前工程appCode为some-app-code， "/" 是appCode与配置名称的分隔符
  // 全局强依赖的配置，更适合这种方式，请参考最后的Tips章节
  // console.log(window.__GALAXY_CONFIG_GLOBAL__['some-app-code/some-config']);
}

export function setDefaultValue(obj, path, defaultValue) {
  const originValue = getValue(obj, path)
  let realValue = originValue;
  if (Object.prototype.toString.call(realValue) === '[object Array]' && !realValue?.length) {
    realValue = undefined;
  }
  if (realValue === 'Y' || realValue === 'N') {
    realValue = realValue === 'Y';
  }
  set(obj, path, realValue === undefined || realValue === '' ? defaultValue : realValue);
}

export function setYNBooleanValue(obj, path) {
  const originValue = getValue(obj, path)
  set(obj, path, originValue === true ? 'Y' : originValue === false ? 'N' : undefined);
}

export const formatDataSource = (list, isStringValue = false) => {
  return list?.map(item => ({ label: item.name, value: isStringValue ? `${item.id}` : item.id }))
}

export const  parseHashParams = (param) => {
  const hash = window.location.hash;
  const queryString = hash.substring(hash.indexOf('?') + 1);
  const queryParams = queryString.split('&').reduce((acc, current) => {
    const [key, value] = current.split('=');
    acc[key] = value;
    return acc;
  }, {});
  if (param) {
    return queryParams[param];
  }
  return queryParams;
}

// 是否是移动端
export function isMobile(ua = window.navigator.userAgent) {
  if (!ua) return false;
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(ua);
}

// 是否在企业微信中
export function isInWeCom() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('wxwork') > -1 && ua.indexOf('micromessenger') > -1;
}

export function encodeForHTML(data) {
  if (!data) return data;
  return data.replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
