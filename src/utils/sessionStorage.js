import { isPlainObject } from "./index";

function typeCheck(value) {
  const isObj = isPlainObject(value);
  const isArr = Array.isArray(value);
  const isNull = value === null;
  return isObj || isArr || isNull;
}

export default {
  setItem(key, value) {
    if (typeof value === "string") {
      sessionStorage.setItem(key, value);
    } else if (typeCheck(value)) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error("localStorage保存的值不允许存在循环引用");
      }
    } else {
      console.error("localStorage只允许保存 string plainObject,array,null");
    }
  },
  getItem(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      return sessionStorage.getItem(key);
    }
  },
  removeItem(key){
    sessionStorage.removeItem(key)
  }
};
