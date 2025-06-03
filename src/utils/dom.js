/**
 * DOM 操作工具集
 * 包含常用 DOM 操作方法，兼容移动端和现代浏览器
 */

// 选择器快捷方法
export const $selector = {
  /**
   * 获取单个元素
   * @param {string} selector - CSS 选择器
   * @param {HTMLElement} [parent=document] - 父级元素
   * @returns {HTMLElement|null}
   */
  one(selector, parent = document) {
    return parent.querySelector(selector);
  },

  /**
   * 获取元素集合
   * @param {string} selector - CSS 选择器
   * @param {HTMLElement} [parent=document] - 父级元素
   * @returns {NodeListOf<HTMLElement>}
   */
  all(selector, parent = document) {
    return parent.querySelectorAll(selector);
  }
};

/**
 * 元素样式操作
 * @param {HTMLElement} el - 目标元素
 * @param {string|Object} prop - 样式属性或样式对象
 * @param {string} [value] - 样式值
 */
export function $css(el, prop, value) {
  if (typeof prop === 'object') {
    Object.entries(prop).forEach(([key, val]) => {
      el.style[key] = val;
    });
  } else {
    el.style[prop] = value;
  }
}

/**
 * 检测元素是否在视窗内
 * @param {HTMLElement} el - 目标元素
 * @param {number} [offset=0] - 视窗边距偏移量
 * @returns {boolean}
 */
export function isInViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * 事件监听快捷方法
 * @param {HTMLElement} el - 目标元素
 * @param {string} event - 事件类型
 * @param {Function} handler - 事件处理函数
 * @param {Object} [options] - 事件选项
 */
export function $on(el, event, handler, options = {}) {
  el.addEventListener(event, handler, {
    passive: true,
    ...options
  });
}

/**
 * 获取元素最终样式
 * @param {HTMLElement} el - 目标元素
 * @param {string} [prop] - 指定样式属性
 * @returns {string|CSSStyleDeclaration}
 */
export function getStyle(el, prop) {
  const style = window.getComputedStyle(el);
  return prop ? style.getPropertyValue(prop) : style;
}

/**
 * 元素尺寸获取器
 * @param {HTMLElement} el - 目标元素
 * @returns {Object} 包含 width/height/top/left 的尺寸对象
 */
export function getRect(el) {
  const rect = el.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  };
}
