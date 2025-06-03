/**
 * 创建url
 * 只从最后的?开始判断，保留原本的?后面的内容
 */
 import qs from "qs";
 export function createUrl(sourceUrl, data = {}) {
     let result = "";
     if (sourceUrl && typeof sourceUrl === "string") {
         const lastIndexOfFlag = sourceUrl.lastIndexOf("?");
         let url = sourceUrl;
         let queryString = "";
         if (lastIndexOfFlag > -1) {
             url = sourceUrl.slice(0, lastIndexOfFlag);
             queryString =
                 lastIndexOfFlag > -1
                     ? sourceUrl.slice(lastIndexOfFlag + 1)
                     : "";
         }
 
         let params = qs.parse(queryString);
         result = `${url}?${qs.stringify(
             Object.assign(params, {
                 ...data,
             })
         )}`;
     }
     return result;
 }
 
