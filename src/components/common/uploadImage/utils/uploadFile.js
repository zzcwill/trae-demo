import { postFileCommon } from "@/request/request";
const returnTrue = () => {
  return true;
};
let inputElement = null;
export default function (config) {
  const {
    url,
    onChange = returnTrue,
    accept,
    before,
    after,
    isManual,
    uploadFunc,
    multiple,
  } = config;
  return new Promise((resolve, reject) => {
    if (inputElement) {
      inputElement.files = null;
      // document.body.removeChild(inputElement);
    }
    let input = (inputElement = document.createElement("input"));
    input.type = "file";
    input.style.display = "none";
    if (multiple) {
      input.multiple = true;
    }
    if (accept) {
      input.accept = accept;
    }
    input.onchange = (e) => {
      if (!onChange(e.target.files)) {
        document.body.removeChild(input);
        inputElement = null;
        reject();
        return;
      }
      const data = (before && before(e.target.files)) || {
        file: e.target.files,
      };
      // 如果不手动上传，且url存在的情况下调用服务提供的上传方法
      if (!isManual && url) {
        postFileCommon({ url, data: data })
          .then((data) => {
            data._file = e.target.files;
            after && after(data);
            resolve(data);
          })
          .catch((e) => {
            reject(e);
          })
          .finally(() => {
            document.body.removeChild(input);
            inputElement = null;
          });
      } else if (uploadFunc) {
        uploadFunc(data)
          .then((data) => {
            data._file = e.target.files;
            after && after(data);
            resolve(data);
          })
          .catch((e) => {
            reject(e);
          })
          .finally(() => {
            document.body.removeChild(input);
            inputElement = null;
          });
      } else {
        reject("上传方法不能为空！");
      }
    };
    document.body.appendChild(input);
    input.click();
  });
}
