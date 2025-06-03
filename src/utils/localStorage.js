import {isPlainObject} from "./index";

function typeCheck(value) {
  const isObj = isPlainObject(value)
  const isArr = Array.isArray(value)
  const isNull = value === null
  return isObj || isArr || isNull
}

export default {
  setItem(key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else if (typeCheck(value)) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error('localStorage保存的值不允许存在循环引用')
      }
    } else {
      console.error('localStorage只允许保存 string plainObject,array,null')
    }
  },
  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return localStorage.getItem(key)
    }
  }
}
