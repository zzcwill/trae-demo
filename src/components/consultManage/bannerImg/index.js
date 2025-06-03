import React, { useState, useEffect } from "react";
import "./index.scss";
import UploadImg from "@/components/common/uploadImage";
import { postFileCommon } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Icon, Modal, Button, Input, message, Select } from "dpl-react";
import { modalTypeEnum, valueChangeTypeEnum } from "./config";
import Edit from "./components/edit";
import { jumpTypeList } from "@/const/config";
import classnames from "classnames";
const defaultBannerObj = {
  imageName: undefined,
  imageUrl: undefined,
  jumpUrlName: undefined,
  jumpUrl: undefined,
};

const defaultImgObj = {
  imageUrl: undefined,
  imageName: undefined,
};
// 新增图片展示内容
const contentEl = () => {
  return (
    <span className="banner-content">
      <Icon type="plus" />
      <div className="content-line"></div>
      <span>添加图片</span>
    </span>
  );
};

function BannerImg(props, ref) {
  const {
    value,
    onChange,
    index,
    className,
    isShowOption,
    disabled,
    landingPageList = [],
  } = props;
  const [imgList, setImgList] = useState([]);
  const [jumpTypeValue, setJumpTypeValue] = useState(jumpTypeList[0].id);

  const bannerImgBoxClassNames = () => {
    let classObj = {
      "banner-image-box": true,
    };
    if (className) {
      classObj[className] = true;
    }
    return classnames(classObj);
  };

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
    onValueChange(valueChangeTypeEnum.image, result);
  };

  // 上传图片
  const onUpload = (file) => {
    return postFileCommon({
      url: Api.saveImage,
      data: file,
    });
  };

  const onValueChange = (type, data) => {
    let result = {};
    switch (type) {
      case valueChangeTypeEnum.jumpType:
        result = Object.assign({}, value, {
          [valueChangeTypeEnum.jumpType]: data,
        });
        break;
      case valueChangeTypeEnum.jumpUrl:
        result = Object.assign({}, value, {
          [valueChangeTypeEnum.jumpUrl]: data,
        });
        break;
      case valueChangeTypeEnum.jumpBusinessId:
        result = Object.assign({}, value, {
          [valueChangeTypeEnum.jumpBusinessId]: data,
        });
        break;
      case valueChangeTypeEnum.image:
        let obj = {};
        obj.imageUrl = data.imageUrl;
        obj.imageName = data.imageName;
        if (!obj.imageUrl) {
          result = Object.assign({}, obj);
        } else {
          result = Object.assign({}, value, obj);
        }
        break;
      default:
        break;
    }
    onChange && onChange(result);
  };

  // 格式化
  const formatResult = (imgObj) => {
    return Object.assign({}, imgObj, {
      imageUrl: imgObj.domain + imgObj.imageUrl,
    });
  };

  /**
   * 跳转类型修改
   */
  const jumpTypeOnChange = (value) => {
    onValueChange(valueChangeTypeEnum.jumpType, value);
  };

  /**
   * 落地页修改
   */
  const jumpBusinessIdOnChange = (value) => {
    onValueChange(valueChangeTypeEnum.jumpBusinessId, value);
  };

  /**
   * 链接地址修改
   */
  const jumpUrlOnChange = (e) => {
    const value = e.target.value;
    onValueChange(valueChangeTypeEnum.jumpUrl, value);
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
    <div className={bannerImgBoxClassNames()} ref={ref}>
      <div className="image">
        <UploadImg
          value={imgList}
          disabled={disabled}
          onChange={imgChange}
          width={800}
          height={230}
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
      {isShowOption && (
        <div className="option">
          <div className="option-item">
            <div className="label">
              <span>跳转页面类型</span>
            </div>
            <div className="content">
              <Select
                placeholder="请选择跳转页面类型"
                value={value.jumpType}
                onChange={jumpTypeOnChange}
                style={{ width: "100%" }}
              >
                {jumpTypeList.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          {value.jumpType === jumpTypeList[1].id && (
            <div className="option-item">
              <div className="label">
                <span>落地页名称</span>
              </div>
              <div className="content">
                <Select
                  placeholder="请选择落地页名称"
                  value={value.jumpBusinessId}
                  onChange={jumpBusinessIdOnChange}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: "100%" }}
                >
                  {Array.isArray(landingPageList) &&
                    landingPageList.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
            </div>
          )}
          {value.jumpType === jumpTypeList[2].id && (
            <div className="option-item">
              <div className="label">
                <span>链接地址</span>
              </div>
              <div className="content">
                <Input
                  value={value.jumpUrl}
                  placeholder="请输入链接地址"
                  onChange={jumpUrlOnChange}
                  allowClear
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.forwardRef(BannerImg);
