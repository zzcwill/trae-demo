import React, { useState, useEffect } from "react";
import "./index.scss";
import UploadImg from "@/components/common/uploadImage";
import { postFileCommon } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Icon, Modal, Button, Form, message } from "dpl-react";
import classnames from "classnames";
const defaultImgObj = {
  imageUrl: undefined,
  imageName: undefined,
};

// 格式化
const formatResult = (imgObj) => {
  return Object.assign({}, imgObj, {
    imageUrl: imgObj.domain + imgObj.imageUrl,
  });
};

// 新增图片展示内容
const defaultContentEl = () => {
  return (
    <span className="add-box-content">
      <Icon type="plus" />
      <div className="content-line"></div>
      <span>添加图片</span>
    </span>
  );
};

// 上传图片
const onUpload = (file) => {
  return postFileCommon({
    url: Api.saveImage,
    data: file,
  });
};

function AddImage(props, ref) {
  const {
    value,
    onChange,
    index,
    className,
    disabled,
    width,
    height,
    isShowOption,
    contentEl = defaultContentEl,
    optionEl,
  } = props;
  const [imgList, setImgList] = useState([]);
  const addImageBoxClassNames = () => {
    let classObj = {
      "add-image-box": true,
    };
    if (className) {
      classObj[className] = true;
    }
    return classnames(classObj);
  };

  // 图片修改
  const imgChange = (list) => {
    const img = list[0];
    let result = {};
    if (img) {
      result.imageUrl = img.imageUrl;
      result.imageName = img.name;
    }
    if (index || index == 0) {
      result.index = index;
    }
    onChange && onChange(result);
  };

  useEffect(() => {
    if (value && value.imageUrl) {
      setImgList(
        [].concat({
          imageUrl: value.imageUrl,
        })
      );
    } else {
      setImgList([]);
    }
  }, [value]);
  return (
    <div className={addImageBoxClassNames()} ref={ref}>
      <div className="image">
        <UploadImg
          value={imgList}
          disabled={disabled}
          onChange={imgChange}
          width={width}
          height={height}
          onUpload={onUpload}
          deleteType="rightUp"
          maxNameLength={100}
          maxSize={3}
          imgProp={"imageUrl"}
          isShowDelete={true}
          content={contentEl}
          formatResult={formatResult}
        />
      </div>
      {isShowOption && optionEl && (
        <div className="option">{optionEl(value)}</div>
      )}
    </div>
  );
}

export default React.forwardRef(AddImage);
