import React, { useState, useEffect } from "react";
import "./index.scss";
import { Icon, message } from "dpl-react";
import openSwipe from "@/utils/photoSwipe/index";
import { isFunction } from "@/utils";
import uploadFile from "./utils/uploadFile";
import { postFileCommon } from "@/request/request";
import Api from '@/request/api-olhelpmanage'

import classnames from "classnames";

const deleteTypeEnum = {
  mask: "mask", // 蒙层
  rightUp: "rightUp", // 右上角
};
// 默认图片类型
const defaultImageType = ["image/png", "image/jpg", "image/jpeg"];
const defaultKey = "imageUrl";

// 上传图片
const defaultUpload = (file) => {
  return postFileCommon({
    url: Api.saveImage,
    data: file,
  });
};
// 默认的配置参数
const defaultConfig = {
  //   value:[], // 图片数据
  //   onChange:()=>{}, // 数据改变
  imgProp: defaultKey, // 默认的图片展示key值
  disabled: false, // 禁止
  width: 100, // 宽度，默认宽度
  height: 100, // 高度，默认高度
  isShowDelete: false, // 是否展示关闭按钮
  multiple: false, // 是否多选
  maxLength: 1, // 图片的最大数量
  maxNameLength: null, // 图片名称的最大长度
  maxSize: 1, // 最大图片大小
  acceptTypes: defaultImageType, // 接受类型, 存在默认类型
  deleteType: deleteTypeEnum.mask, // 删除类型
  content: null, // 内容
  onUpload: defaultUpload, // () => {} 上传方法 默认onhelp上传
  beforeUpload: null, // () => {} 上传之前
  formatResult: null, // ()=> {} 格式化结果
  onDelete: null, // () => {} 删除
  onTypeCheckError: null, //() => {} 类型错误回调
  onSizeCheckError: null, // () => {} 大小错误回调
};

function UploadImage(props, ref) {
  const { value, onChange, className, ...propsConfig } = props;
  // 配置信息
  const config = Object.assign({}, defaultConfig, propsConfig);
  const Content = config.content; // 图片框中展示的内容
  const [imgList, setImgList] = useState(() => {
    if (Array.isArray(value)) {
      return [...value];
    } else {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const onImgChange = (file) => {
    const picture = file[0];
    const acceptList = config.acceptTypes;
    if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
      if (isFunction(config.onTypeCheckError)) {
        config.onTypeCheckError();
      } else {
        message.error("图片格式不正确");
      }
      return false;
    }
    if (config.maxNameLength && picture.name.length > config.maxNameLength) {
      message.error("图片名字长度超过" + config.maxNameLength + "个字");
      return false;
    }
    if (picture.size > config.maxSize * 1024 * 1024) {
      if (isFunction(config.onSizeCheckError)) {
        config.onSizeCheckError();
      } else {
        message.error("图片大小超过" + config.maxSize + "M");
      }
      return false;
    }
    setLoading(true);
    return true;
  };

  const openUploadFile = async () => {
    if (config.disabled) {
      return;
    }
    if (loading) return;
    try {
      const res = await uploadFile({
        before: config.beforeUpload,
        uploadFunc: config.onUpload,
        onChange: onImgChange,
        accept: config.acceptTypes.join(","),
        isManual: true,
      }).finally(() => {
        setLoading(false);
      });
      if (res.success) {
        let result = config.formatResult
          ? imgList.concat(config.formatResult(res.data))
          : imgList.concat(res.data);
        setImgList(result);
        if (onChange) {
          onChange(result);
        }
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 删除图片
  const deleteHandler = (index) => {
    if (config.disabled) {
      return;
    }
    let result = imgList.slice();
    result.splice(index, 1);
    setImgList(result);
    if (isFunction(config.onDelete)) {
      config.onDelete(result, index);
    }
    if (isFunction(onChange)) {
      onChange(result);
    }
  };

  // 查看展示
  const openSwipeHandler = (index) => {
    openSwipe(imgList, index);
  };

  // value改变了修改store
  useEffect(() => {
    if (Array.isArray(value)) {
      setImgList(value);
    }
  }, [value]);

  const uploadImageClassNames = () => {
    let classObj = {
      "upload-image": true,
    };
    if (className) {
      classObj[className] = true;
    }
    return classnames(classObj);
  };
  const deleteClassNames = () => {
    return classnames({
      icon: true,
      disabled: config.disabled,
    });
  };
  const uploadBtnClassNames = () => {
    return classnames({
      "upload-btn": true,
      disabled: config.disabled,
    });
  };

  return (
    <div className={uploadImageClassNames()} ref={ref}>
      {imgList.map((item, index) => {
        return (
          <div
            key={index}
            className="upload-image-item"
            style={{ width: config.width, height: config.height }}
          >
            <div className="item">
              <img src={item[config.imgProp]} className="img" />
              <div className="icon-wrap">
                <Icon
                  type="search"
                  onClick={() => {
                    openSwipeHandler(index);
                  }}
                  className="icon"
                />
                {config.isShowDelete &&
                  config.deleteType === deleteTypeEnum.mask && (
                    <Icon
                      type="delete"
                      onClick={() => {
                        deleteHandler(index);
                      }}
                      className={deleteClassNames()}
                    />
                  )}
              </div>
            </div>
            {config.isShowDelete &&
              config.deleteType === deleteTypeEnum.rightUp && (
                <div className="right-up-box">
                  <Icon
                    type="circle-error-o"
                    className={deleteClassNames()}
                    onClick={() => {
                      deleteHandler(index);
                    }}
                  />
                </div>
              )}
          </div>
        );
      })}

      {imgList.length < config.maxLength && (
        <div
          className={uploadBtnClassNames()}
          onClick={openUploadFile}
          style={{ width: config.width, height: config.height }}
        >
          {loading ? (
            <Icon type="loading" className="loading" />
          ) : (
            (Content && <Content />) || <Icon type="plus" />
          )}
        </div>
      )}
    </div>
  );
}

/** 必须使用给antd-form 提供ref，否则在值得还原上会有Bug，坑！！！*/
export default React.forwardRef(UploadImage);
