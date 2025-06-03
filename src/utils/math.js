/**
 * 精确数学计算工具集
 * 解决 JavaScript 浮点数精度问题，结果保留两位小数
 */

export const math = {
  /**
   * 加法运算
   * @param {number} a - 被加数
   * @param {number} b - 加数
   * @returns {number} 计算结果（保留两位小数）
   */
  add(a, b) {
    const factor = Math.pow(10, 2);
    const result = (Math.round(a * factor) + Math.round(b * factor)) / factor;
    return Number(result.toFixed(2));
  },

  /**
   * 减法运算
   * @param {number} a - 被减数
   * @param {number} b - 减数
   * @returns {number} 计算结果（保留两位小数）
   */
  subtract(a, b) {
    const factor = Math.pow(10, 2);
    const result = (Math.round(a * factor) - Math.round(b * factor)) / factor;
    return Number(result.toFixed(2));
  },

  /**
   * 乘法运算
   * @param {number} a - 被乘数
   * @param {number} b - 乘数
   * @returns {number} 计算结果（保留两位小数）
   */
  multiply(a, b) {
    const factor = Math.pow(10, 2);
    const result = (Math.round(a * factor) * Math.round(b * factor)) / (factor * factor);
    return Number(result.toFixed(2));
  },

  /**
   * 除法运算
   * @param {number} a - 被除数
   * @param {number} b - 除数
   * @returns {number} 计算结果（保留两位小数）
   */
  divide(a, b) {
    if (b === 0) return NaN;
    const factor = Math.pow(10, 2);
    const result = (Math.round(a * factor) / Math.round(b * factor)) * factor;
    return Number(result.toFixed(2));
  }
};
