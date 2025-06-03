
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function noop() {

}

export function isBoolean(boolean) {
  return typeof boolean === "boolean";
}

export function isString(string) {
  return typeof string === "string";
}

let toString = Object.prototype.toString;

export function isObject(obj) {
  return obj && typeof obj === "object" && toString.call(obj) === "[object Object]"
}

export function isEmptyArray(arr) {
  return arr === null || arr === undefined || arr.length === 0
}

export function isArray(arr) {
  return arr && typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]"
}

export function isDef(obj) {
  return obj !== undefined
}

export function isUndef(obj) {
  return obj === undefined
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




