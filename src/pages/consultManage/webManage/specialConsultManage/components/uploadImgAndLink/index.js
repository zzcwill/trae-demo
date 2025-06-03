import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import UploadImg from "@/components/common/uploadImage";
import { Input } from "dpl-react";
import { postFileCommon } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
const defaultImgObj = {
  imageUrl: undefined,
  imageName: undefined,
};

export default function uploadImgAndLink(props) {
  const { value, onChange, isShowOption, disabled } = props;

  const inputRef = useRef(null);
  const [imgList, setImgList] = useState([]);

  // 图片修改
  const imgChange = (list) => {
    const img = list[0];
    let result = Object.assign({}, defaultImgObj);
    if (img) {
      result = {
        imageUrl: img.imageUrl,
        imageName: img.name,
      };
    }
    onValueChange("imageUrl", result.imageUrl);
  };

  // 上传图片
  const onUpload = (file) => {
    return postFileCommon({
      url: Api.saveImage,
      data: file,
    });
  };

  const inputOnChange = (e) => {
    const value = e.target.value;
    onValueChange("jumpUrl", value && value.trim());
  };

  // 格式化
  const formatResult = (imgObj) => {
    return Object.assign({}, imgObj, {
      imageUrl: imgObj.domain + imgObj.imageUrl,
    });
  };

  const onValueChange = (type, data) => {
    const result = Object.assign({}, value, {
      [type]: data,
    });
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
    <div className="upload-img-box">
      <UploadImg
        value={imgList}
        disabled={disabled}
        onChange={imgChange}
        width={265}
        height={160}
        onUpload={onUpload}
        maxNameLength={100}
        maxSize={3}
        imgProp={"imageUrl"}
        isShowDelete={true}
        formatResult={formatResult}
      />
      {isShowOption && (
        <div className="option">
          <div className="label">
            <span>跳转链接地址：</span>
          </div>
          <div className="content">
            <Input
              placeholder="请输入内容"
              allowClear
              value={(value && value.jumpUrl) || undefined}
              ref={inputRef}
              disabled={disabled}
              onChange={inputOnChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
