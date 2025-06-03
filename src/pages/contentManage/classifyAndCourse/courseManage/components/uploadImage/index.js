import React, { useState } from "react";
import "./index.scss";
import { Icon, message } from "dpl-react";
import uploadFile from "@/utils/uploadFile";
import Api from "@/request/api";
import openSwipe from "@/utils/photoSwipe/index";
/**
 * 格式化图片列表
 */
const initImageList = (list) => {
  return list.map((item) => {
    return {
      imageUrl: item.fileUrl,
      name: item.name,
    };
  });
};
/**
 * 格式化图片文件列表
 */
const initFileList = (list) => {
  return list.map((item) => {
    return {
      fileUrl: item.imageUrl,
      name: item.name,
    };
  });
};
function UploadImage(props, ref) {
  const {
    value,
    onChange,
    background,
    nameLength = 100,
    fileSize = 1,
    maxLength = 3,
    size = {
      width: "100px",
      height: "100px"
    },
    iconStyle = {}
  } = props;
  const [imgList, setImgList] = useState(() => {
    if (Array.isArray(value)) {
      return initFileList(value);
    } else {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const accept = "image/png,image/jpg,image/jpeg";
  const onImgChange = file => {
    const picture = file[0];
    const acceptList = accept ? accept.split(",") : [];
    if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
      message.error("图片格式不正确");
      return false;
    }
    if (picture.name.length > nameLength) {
      message.error("图片名字长度超过" + nameLength + "个字");
      return false;
    }
    if (picture.size > fileSize * 1024 * 1024) {
      message.error("图片大小超过" + fileSize + "M");
      return false;
    }
    setLoading(true);
    return true;
  };
  const openUploadFile = async () => {
    if (loading) return;
    const data = await uploadFile(Api.uploadFile, onImgChange, accept).finally(
      () => {
        setLoading(false);
      }
    );
    let result = imgList.concat(data.data);
    setImgList(result);
    if (onChange) {
      onChange(initImageList(result));
    }
  };
  const deleteHandler = index => {
    let result = imgList.slice();
    result.splice(index, 1);
    setImgList(result);
    if (onChange) {
      onChange(initImageList(result));
    }
  };
  const openSwipeHandler = index => {
    openSwipe(imgList, index);
  };
  return (
    <div className="upload-image" ref={ref}>
      {imgList.map((item, index) => {
        return (
          <div className="item" key={index} style={{ ...size }}>
            <img src={item.fileUrl} className="img" />
            <div className="icon-wrap">
              <Icon
                type="search"
                onClick={() => {
                  openSwipeHandler(index);
                }}
                className="icon"
                style={{...iconStyle}}
              />
              <Icon
                type="delete"
                onClick={() => {
                  deleteHandler(index);
                }}
                className="icon"
                style={{...iconStyle}}
              />
            </div>
          </div>
        );
      })}

      {imgList.length < maxLength && (
        <div
          className="upload-btn"
          onClick={openUploadFile}
          style={{ ...size }}
        >
          {loading ? (
            <Icon type="loading" className="loading" />
          ) : (
            (background && background()) || <Icon type="plus" />
          )}
        </div>
      )}
    </div>
  );
}

/** 必须使用给antd-form 提供ref，否则在值得还原上会有Bug，坑！！！*/
export default React.forwardRef(UploadImage);
