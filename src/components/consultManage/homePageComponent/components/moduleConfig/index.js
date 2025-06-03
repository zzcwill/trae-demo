import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { siteList, valueChangeTypeMap } from "../../config";
import { Select, Input, Icon } from "dpl-react";
import AddImage from "@/components/consultManage/addImage";
import LinkConfig from "../linkConfig";
const Option = Select.Option;
const addImageWidth = 740;
const addImageHeight = 232;
// 新增图片展示内容
const optionEl = () => {
  return (
    <span className="add-image-option">
      <p>建议图片尺寸：</p>
      <p>宽:{addImageWidth}</p>
      <p>高:{addImageHeight}</p>
    </span>
  );
};

function ModuleConfig(props) {
  const { loading, value, onChange, index, landingPageList = [] } = props;
  const valueRef = useRef(null);

  // 未选中的图片列表
  const [uncheckedImgObj, setUncheckedImgObj] = useState(() => {
    if (
      value[valueChangeTypeMap.unCheckedImgUrl.code] &&
      value[valueChangeTypeMap.unCheckedImgUrl.code].trim()
    ) {
      return {
        imageUrl: value[valueChangeTypeMap.unCheckedImgUrl.code],
      };
    } else {
      return {};
    }
  });

  // 选中的图片列表
  const [checkedImgObj, setCheckedImgObj] = useState(() => {
    if (
      value[valueChangeTypeMap.checkedImgUrl.code] &&
      value[valueChangeTypeMap.checkedImgUrl.code].trim()
    ) {
      return {
        imageUrl: value[valueChangeTypeMap.checkedImgUrl.code],
      };
    } else {
      return {};
    }
  });

  const onValueChange = (type, data) => {
    const sendData = Object.assign({}, valueRef.current, {
      [type]: data,
    });
    onChange && onChange(sendData);
  };

  useEffect(() => {
    if (
      value[valueChangeTypeMap.unCheckedImgUrl.code] != uncheckedImgObj.imageUrl
    ) {
      setUncheckedImgObj({
        imageUrl: value[valueChangeTypeMap.unCheckedImgUrl.code],
      });
    }
    if (
      value[valueChangeTypeMap.checkedImgUrl.code] != checkedImgObj.imageUrl
    ) {
      setCheckedImgObj({
        imageUrl: value[valueChangeTypeMap.checkedImgUrl.code],
      });
    }
  }, [
    value[valueChangeTypeMap.unCheckedImgUrl.code],
    value[valueChangeTypeMap.checkedImgUrl.code],
  ]);


  useEffect(() => {
    valueRef.current = value
  }, [value])

  return (
    <div className="module-config-box">
      <div className="config-item-line">
        <div className="config-item-label is-required">
          <span>展示位置:</span>
        </div>
        <div className="config-item-value">
          <Select
            placeholder="请选择展示位置"
            style={{ width: 180 }}
            disabled={loading}
            value={value[valueChangeTypeMap.site.code]}
            onChange={(e) => {
              onValueChange(valueChangeTypeMap.site.code, e);
            }}
          >
            {siteList.length > 0 &&
              siteList.map((item) => {
                return (
                  <Option key={`module-site-${item.id}`} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className="config-item-line">
        <div className="config-item-label is-required">
          <span>展示顺序:</span>
        </div>
        <div className="config-item-value">
          <Input
            placeholder="请输入排序"
            type="number"
            style={{ width: 180 }}
            disabled={loading}
            maxLength={2}
            value={value[valueChangeTypeMap.orderNum.code]}
            onChange={(e) => {
              const targetValue = e.target.value
                ? Number(e.target.value)
                : null;
              onValueChange(valueChangeTypeMap.orderNum.code, targetValue);
            }}
          />
        </div>
      </div>

      <div className="config-item">
        <div className="config-item-label is-required">
          <span>未选中状态的图片:</span>
        </div>
        <div className="config-item-value">
          <AddImage
            value={uncheckedImgObj}
            index={index}
            isShowOption={true}
            className="add-image-content"
            disabled={loading}
            width={addImageWidth}
            height={addImageHeight}
            onChange={(e) => {
              onValueChange(
                valueChangeTypeMap.unCheckedImgUrl.code,
                e.imageUrl
              );
            }}
            // optionEl={optionEl}
          />
        </div>
      </div>
      <div className="config-item">
        <div className="config-item-label is-required">
          <span>选中状态的图片:</span>
        </div>
        <div className="config-item-value">
          <AddImage
            value={checkedImgObj}
            index={index}
            isShowOption={true}
            className="add-image-content"
            disabled={loading}
            width={addImageWidth}
            height={addImageHeight}
            onChange={(e) => {
              onValueChange(valueChangeTypeMap.checkedImgUrl.code, e.imageUrl);
            }}
            // optionEl={optionEl}
          />
        </div>
      </div>
      <div className="config-item-line">
        <div className="config-item-label is-required">
          <span>跳转页面类型:</span>
        </div>
        <div className="config-item-value">
          <LinkConfig
            value={value}
            onChange={onValueChange}
            disabled={loading}
            landingPageList={landingPageList}
          />
        </div>
      </div>
    </div>
  );
}

export default ModuleConfig;
