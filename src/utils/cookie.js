import Cookies from 'js-cookie';

/**
 * Cookie 操作工具集
 * 基于 js-cookie 封装，扩展常用功能
 */

const DEFAULT_OPTIONS = {
  path: '/',
  expires: 7, // 默认7天过期
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax'
};

export const cookie = {
  /**
   * 设置 cookie
   * @param {string} key - 键名
   * @param {any} value - 值（支持对象自动序列化）
   * @param {Object} [options] - 配置项
   */
  set(key, value, options = {}) {
    const finalValue = typeof value === 'object' ? JSON.stringify(value) : value;
    Cookies.set(key, finalValue, { ...DEFAULT_OPTIONS, ...options });
  },

  /**
   * 获取 cookie
   * @param {string} key - 键名
   * @returns {any} 解析后的值
   */
  get(key) {
    const value = Cookies.get(key);
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  /**
   * 移除 cookie
   * @param {string} key - 键名
   * @param {Object} [options] - 配置项
   */
  remove(key, options = {}) {
    Cookies.remove(key, { ...DEFAULT_OPTIONS, ...options });
  },

  /**
   * 检查 cookie 是否存在
   * @param {string} key - 键名
   * @returns {boolean}
   */
  has(key) {
    return Cookies.get(key) !== undefined;
  }
};

// 快捷方法导出
export const getCookie = cookie.get;
export const setCookie = cookie.set;
export const removeCookie = cookie.remove;
