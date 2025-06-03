import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import BannerImg from "../bannerImg";
import Preview from "../preview";
import { Button, Modal, Icon } from "dpl-react";
import classnames from "classnames";
import { buttonSiteMap } from "@/const/config";
import SearchWays from "./components/searchWays";
const defaultPreviewModal = {
  isShow: false,
  data: {},
};

function ExpertCategoryComponent(props, ref) {
  const {
    formData, // 表单数据
    previewTypeObj, // 预览类型
    classifyTypeEnum, // 分类类型枚举
    buttonList, // button 列表
    loading, // loading状态
    onValueChange, // 数据改变接口
    bannerChangeType, // banner图改变类型
    classifyChangeType, // 分类改变类型
    classifyDeleteType, // 分类删除
    classifyList, // 分类列表
    buttonSite = buttonSiteMap.bottom, // button展示位置
    defaultClassifyInfoConfig,
  } = props;

  const [previewModal, setPreviewModal] = useState(defaultPreviewModal);

  const bodyClass = classnames({
    "expert-category-component": true,
    "expert-category-component-bottom": buttonSite == buttonSiteMap.bottom,
  });

  const buttonClass = classnames({
    "button-box": true,
    "button-box-bottom": buttonSite == buttonSiteMap.bottom,
  });
  const buttonClick = (item) => {
    item.onClick && item.onClick();
  };
  // 预览
  const preview = () => {
    let bannerImageList = [];
    let classifyInfoList = [];
    let result = {
      type: previewTypeObj.type,
      data: {
        ...previewTypeObj,
      },
    };
    for (let i = 0, len = formData.bannerImageList.length; i < len; i++) {
      const item = formData.bannerImageList[i];
      if (item.imageUrl) {
        bannerImageList.push({
          imageName: item.imageName,
          imageUrl: item.imageUrl,
          orderNum: i + 1,
        });
      }
    }

    if (formData.classifyInfoList && formData.classifyInfoList.length > 0) {
      for (
        let j = 0, classifyInfoListList = formData.classifyInfoList.length;
        j < classifyInfoListList;
        j++
      ) {
        const classifyInfoItem = formData.classifyInfoList[j];
        if (!classifyInfoItem.type) {
          break;
        }
        let obj = {
          type: classifyInfoItem.type,
          location: classifyInfoItem.location,
          name: classifyInfoItem.name,
          classifyList: [],
        };

        for (
          let i = 0, classifyListLength = classifyList.length;
          i < classifyListLength;
          i++
        ) {
          const classifyItem = classifyList[i];
          if (classifyInfoItem.type == classifyItem.type) {
            let expertClassifyList = [];
            classifyItem.list &&
              classifyItem.list.forEach((item) => {
                const index = classifyInfoItem.idList.indexOf(item.id);
                if (index > -1) {
                  expertClassifyList[index] = item;
                }
              });
            obj.classifyList = expertClassifyList;
          }
        }
        classifyInfoList.push(obj);
      }
    }
    result.data.bannerList = bannerImageList;
    result.data.classifyList = classifyInfoList;
    console.log(result);
    setPreviewModal({
      isShow: true,
      data: result,
    });
  };
  // 关闭预览弹窗
  const closePreviewModal = () => {
    setPreviewModal(defaultPreviewModal);
  };

  // 新增分类配置
  const addCategoryModal = () => {
    const index = formData.classifyInfoList.length;
    onValueChange &&
      onValueChange(classifyChangeType, {
        index,
        value: Object.assign({}, defaultClassifyInfoConfig),
      });
  };

  // 删除分类配置
  const classifyCloseFunc = (index) => {
    onValueChange &&
      onValueChange(classifyDeleteType, {
        index,
        value: {},
      });
  };

  return (
    <div className={bodyClass}>
      <div className={buttonClass}>
        <Button
          type="primary"
          className="button-item"
          disabled={loading}
          onClick={() => {
            preview();
          }}
        >
          预览
        </Button>
        {buttonList &&
          buttonList.length > 0 &&
          buttonList.map((item, index) => {
            return (
              <>
                <div className="line-box"></div>
                <Button
                  className="button-item"
                  key={item.name}
                  type={item.type}
                  disabled={loading}
                  onClick={() => {
                    buttonClick(item);
                  }}
                >
                  {item.name}
                </Button>
              </>
            );
          })}
      </div>
      <div className="banner-box">
        <div className="title">Banner图管理</div>
        {formData.bannerImageList &&
          formData.bannerImageList.length > 0 &&
          formData.bannerImageList.map((item, index) => {
            return (
              <div key={index} className="banner-item">
                <div className="banner-item-label">
                  <span className={`${index === 0 ? "required" : ""}`}>
                    No.{index + 1}
                  </span>
                </div>
                <BannerImg
                  value={item}
                  index={index}
                  isShowOption={false}
                  className="banner-image-content"
                  disabled={loading}
                  onChange={(value) => {
                    onValueChange(bannerChangeType, {
                      index,
                      value,
                    });
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className="classify-box">
        {formData.classifyInfoList &&
          formData.classifyInfoList.length > 0 &&
          formData.classifyInfoList.map((item, index) => {
            return (
              <div className="classify-item" key={`classify-item-${index}`}>
                {formData.classifyInfoList.length !== 1 && (
                  <div
                    className="classify-item-close"
                    onClick={() => {
                      classifyCloseFunc(index);
                    }}
                  >
                    <Icon type="pure-close" />
                    <span>删除该配置</span>
                  </div>
                )}
                <SearchWays
                  value={item}
                  classifyTypeEnum={classifyTypeEnum}
                  classifyList={classifyList}
                  loading={loading}
                  onChange={(value) => {
                    onValueChange(classifyChangeType, {
                      index,
                      value,
                    });
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className="classify-add-box">
        <div className="classify-add-button" onClick={addCategoryModal}>
          <Icon type="plus" />
          <div className="line"></div>
          <span>添加筛选栏</span>
        </div>
      </div>
      <Modal
        title="预览"
        visible={previewModal.isShow}
        width={"1260px"}
        className="category-preview-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closePreviewModal();
        }}
      >
        <Preview data={previewModal.data} type={previewTypeObj.type} headerType={props.headerType}/>
      </Modal>
    </div>
  );
}

export default React.forwardRef(ExpertCategoryComponent);
