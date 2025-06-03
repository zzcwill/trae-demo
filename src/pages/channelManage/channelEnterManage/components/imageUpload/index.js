import React, { useState, useEffect } from "react";
import "./index.scss";
import { Input, Button, message } from "dpl-react";
import uploadFile from "@/utils/uploadFile";
import Api from "@/request/api-olhelpmanage.js";
const accept = ".jpeg,.png,.jpg";
const fileSize = 1;
const defaultImage = {
  imageUrl: "",
  name: "",
};
export default function ImageUpload(props) {
  const { className, value = {}, onChange, disabled } = props;
  const [loading, setLoading] = useState(false);
  /**
   * 图片格式校验
   * @param {File} file
   */
  const onImgChange = (file) => {
    const picture = file[0];
    const acceptList = ["image/png", "image/jpg", "image/jpeg"];
    if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
      message.error("图片格式不正确");
      return false;
    }
    if (picture.size > fileSize * 1024 * 1024) {
      message.error("图片大小超过" + fileSize + "M");
      return false;
    }
    setLoading(true);
    return true;
  };
  //上传图片
  const uploadImage = async () => {
    const res = await uploadFile(
      Api.postSaveImage,
      onImgChange,
      accept
    ).finally(() => {
      setLoading(false);
    });
    if (res.success) {
      const data = res.data;
      onChange(data);
    } else {
      message.error(res.message);
    }
  };

  const deleteImage = () => {
    onChange(defaultImage);
  };
  return (
    <div className="image-upload-box">
      <Input value={value.name} placeholder="请选择图片" readonly='readonly'/>
      <Button
        type="primary"
        disabled={disabled || !!value.imageUrl}
        loading={loading}
        className="image-upload-button"
        onClick={() => {
          uploadImage();
        }}
      >
        选择
      </Button>
      <Button
        type="primary"
        disabled={disabled || !!!value.imageUrl}
        className="image-upload-button"
        onClick={() => {
          deleteImage();
        }}
      >
        删除
      </Button>
    </div>
  );
}
