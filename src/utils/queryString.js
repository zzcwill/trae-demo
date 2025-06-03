import qs from 'qs';

function assginObject(target, resource) {
  const obj = {};
  for (let item in target) {
    if (target.hasOwnProperty(item)) {
      obj[item] =typeof target[item] !== 'undefine' ? target[item] : resource[item];
    }
  }
  return obj;
}

/**
 * 获取queryString
 */
function getQueryString() {
  return qs.parse(window.location.href.split('?')[1]);
}

/**
 * 设置queryString
 */
function setQueryString(router, data) {
  const sendParam = qs.stringify(data);
  window.location.hash = '#/'+router+'?'+ sendParam;
}

function getItemFromQuery (label) {
    const queryParam = getQueryString();
    return queryParam[label] || '';
}

export const qsFun = {
  getQueryString,
  setQueryString,
  getItemFromQuery
};
