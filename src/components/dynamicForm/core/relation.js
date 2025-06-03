import { globalState } from './index';

/**
 * @description 处理联动逻辑，目前只有联动显隐
 */
export const transformHiddenExpression = (hidden) => {
  if (!globalState.actions) return false;
  if (hidden === true) {
    return true;
  }
  if (typeof hidden === 'object') {
    const {
      target,
      func,
      path,
      value,
    } = hidden;
    const targetValue = globalState.actions.getFieldValue(target);
    if (func) {
      if (!targetValue) return true;
      if (Object.prototype.toString.call(targetValue) !== '[object Array]') return false;
      // 目前只有include，随便写吧
      return !targetValue?.includes(value);
    }
    return (targetValue?.[path] || 0) === value;
  }
  return false;
};
