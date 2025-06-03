import { postFile, postMultipartFile } from "../request/request";
const returnTrue = () => {
  return true;
};
export default function(url, before = returnTrue, accept) {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    if (accept) {
      input.accept = accept;
    }
    input.onchange = e => {
      if (!before(e.target.files)) {
        document.body.removeChild(input);
        reject();
        return;
      }
      postFile({ url, data: { file: e.target.files[0] } })
        .then(data => {
          data._file = e.target.files[0];
          resolve(data);
        })
        .catch(e => {
          reject(e);
        })
        .finally(() => {
          document.body.removeChild(input);
        });
    };
    document.body.append(input);
    input.click();
  });
}

export function uploadMultipartFile(url, before = returnTrue, accept) {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.visibility = false;
    if (accept) {
      input.accept = accept;
    }
    input.onchange = e => {
      if (!before(e.target.files)) {
        reject();
        return;
      }
      postMultipartFile({ url, data: { files: e.target.files } })
        .then(data => {
          data._file = e.target.files[0];
          resolve(data);
        })
        .catch(e => {
          reject(e);
        })
        .finally(() => {
          document.body.removeChild(input);
        });
    };
    document.body.append(input);
    input.click();
  });
}

/**
 * 客户服务中心上传文件方法
 * @param {*} url 接口请求地址
 * @param {*} before  调用接口前的校验
 * @param {*} accept  接收参数类型
 * @param {*} type  文件类型
 */
export function callcentermanageUploadFile(
  url,
  before = returnTrue,
  accept,
  type
) {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    if (accept) {
      input.accept = accept;
    }
    input.onchange = e => {
      console.log(e);
      if (!before(e.target.files)) {
        document.body.removeChild(input);
        reject();
        return;
      }
      postFile({ url, data: { file: e.target.files[0], type } })
        .then(data => {
          data._file = e.target.files[0];
          resolve(data);
        })
        .catch(e => {
          reject(e);
        })
        .finally(() => {
          document.body.removeChild(input);
        });
    };
    document.body.append(input);
    input.click();
  });
}
