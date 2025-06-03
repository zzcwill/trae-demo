import React, { useState, useEffect } from "react";
import "./index.scss";
import { Icon, message } from "dpl-react";
import uploadFile from "@/utils/uploadFile";
import Api from "@/request/api-olhelpmanage";
import openSwipe from "@/utils/photoSwipe/index";

function UploadImage(props, ref) {
  const { value, onChange } = props;
  const [imgList, setImgList] = useState(() => {
    if (Array.isArray(value)) {
      return [...value];
    } else {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const accept = "image/png,image/jpg,image/jpeg";
  const nameLength = 100;
  const fileSize = 1;
  const maxLength = 1;
  const onImgChange = (file) => {
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
    const data = await uploadFile(Api.saveImage, onImgChange, accept).finally(
      () => {
        setLoading(false);
      }
    );
    let result = imgList.concat(data.data);
    setImgList(result);
    if (onChange) {
      onChange(result);
    }
  };
  const deleteHandler = (index) => {
    let result = imgList.slice();
    result.splice(index, 1);
    setImgList(result);
    if (onChange) {
      onChange(result);
    }
  };
  const openSwipeHandler = (index) => {
    const result = imgList.map((item) => {
      return {
        imageUrl: item.domain + item.imageUrl,
        name: item.name,
      };
    });
    openSwipe(result, index);
  };
  useEffect(() => {
    if (Array.isArray(value)) {
      setImgList([...value]);
    } else {
      setImgList([]);
    }
  }, [value]);
  return (
    <div className="upload-image" ref={ref}>
      {imgList.map((item, index) => {
        return (
          <div className="item" key={index}>
            <img src={item.domain + item.imageUrl} className="img" />
            <div className="icon-wrap">
              <Icon
                type="search"
                onClick={() => {
                  openSwipeHandler(index);
                }}
                className="icon"
              />
              <Icon
                type="delete"
                onClick={() => {
                  deleteHandler(index);
                }}
                className="icon"
              />
            </div>
          </div>
        );
      })}

      {imgList.length < maxLength && (
        <div className="upload-btn" onClick={openUploadFile}>
          {loading ? (
            <Icon type="loading" className="loading" />
          ) : (
            <Icon type="plus" />
          )}
        </div>
      )}
    </div>
  );
}

/** 必须使用给antd-form 提供ref，否则在值得还原上会有Bug，坑！！！*/
export default React.forwardRef(UploadImage);
