/**
 * 类型判断增强方法
 * @param {any} target - 需要判断类型的值
 * @returns {string} 返回类型字符串
 */
export function typeOf(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

/**
 * 深拷贝方法（支持常见数据结构）
 * @param {any} source - 需要拷贝的数据
 * @returns {any} 拷贝后的数据
 */
export function deepClone(source) {
  if (source === null || typeof source !== 'object') return source;
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);

  const clone = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      clone[key] = deepClone(source[key]);
    }
  }
  return clone;
}

/**
 * 防抖函数
 * @param {Function} func - 目标函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(func, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param {Function} func - 目标函数
 * @param {number} threshold - 时间阈值(ms)
 * @returns {Function} 节流处理后的函数
 */
export function throttle(func, threshold = 300) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= threshold) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

/**
 * URL参数解析
 * @param {string} url - 需要解析的URL
 * @returns {object} 参数对象
 */
export function parseUrlParams(url = window.location.href) {
  return Object.fromEntries(new URL(url).searchParams.entries());
}

/**
 * 本地存储增强方法（支持自动序列化）
 * @param {string} key - 存储键名
 * @param {any} value - 存储值
 */
export const storage = {
  get(key) {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

/**
 * 金额格式化（千分位）
 * @param {number} num - 金额数值
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的金额
 */
export function formatMoney(num, decimals = 2) {
  return Number(num)
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
