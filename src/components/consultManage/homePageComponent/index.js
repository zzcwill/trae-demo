import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, message, Modal, Icon } from "dpl-react";
import BannerImg from "@/components/consultManage/bannerImg";
import Preview from "../preview";
import { previewTypeMap, buttonSiteMap } from "@/const/config";
import classnames from "classnames";
import ModuleConfig from "./components/moduleConfig";
import OfficialService
  from "@/pages/consultManage/landingPageConfig/children/landingPageEdit/components/officialService";
const defaultEditModal = {
  isShow: false,
  data: {},
};

const defaultRight = [
  { rightsName: "专家财税咨询", rightsType: "3" },
  { rightsName: "基础财税咨询", rightsType: "2" },
  { rightsName: "办税咨询", rightsType: "1" },
];
function HomePageConfig(props, ref) {
  const {
    loading,
    formData,
    buttonList,
    valueChangeTypeEnum,
    buttonSite = buttonSiteMap.top,
    onValueChange,
    landingPageList,
    defaultModuleConfig,
    landingType,
  } = props;

  const [editModal, setEditModal] = useState(defaultEditModal);

  const bodyClass = classnames({
    "home-page-component-box": true,
    "home-page-component-box-bottom": buttonSite == buttonSiteMap.bottom,
  });

  const buttonClass = classnames({
    "button-box": true,
    "button-box-bottom": buttonSite == buttonSiteMap.bottom,
  });

  const editBannerClass = classnames({
    "edit-banner": true,
    "edit-banner-no-line": buttonSite == buttonSiteMap.bottom,
  });

  // 添加配置模块
  const addModuleConfig = () => {
    const index = formData.homeModuleInfoList.length;
    onValueChange &&
      onValueChange(valueChangeTypeEnum.homePageModule, {
        index,
        value: Object.assign({}, defaultModuleConfig),
      });
  };

  // 删除模块
  const moduleConfigCloseFunc = (index) => {
    onValueChange &&
      onValueChange(valueChangeTypeEnum.homePageModuleDelete, {
        index,
        value: {},
      });
  };

  // 预览
  const preview = () => {
    let data = {
      type: previewTypeMap.home.type,
      data: {
        rights: defaultRight,
        handleTax: formData.handleTaxConsult,
        qiye: "模拟企业数据",
        jigou: "模拟机构数据",
        userName: "模拟用户名称",
        left: [],
        right: [],
      },
    };
    let list = [];
    formData.bannerImageList.forEach((item) => {
      if (item.imageUrl) {
        list.push(item);
      }
    });
    formData.homeModuleInfoList.forEach((item) => {
      if (item.location || item.location == "0") {
        if (item.location == "0") {
          data.data.left.push(item);
        } else {
          data.data.right.push(item);
        }
      }
    });
    data.data.banner = list;
    setEditModal({
      isShow: true,
      data,
    });
  };

  const buttonClick = (item) => {
    item.onClick && item.onClick();
  };

  /**
   * 关闭批量设置弹窗
   */
  const closeModal = () => {
    setEditModal(defaultEditModal);
  };

  return (
    <div className={bodyClass} ref={ref}>
      <div className={buttonClass}>
        <Button
          type="primary"
          disabled={loading}
          className="button-item"
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
      <div className="edit-line"></div>
      <div className={editBannerClass}>
        <div className="edit-item-title">Banner图配置:</div>
        {formData.bannerImageList &&
          formData.bannerImageList.length > 0 &&
          formData.bannerImageList.map((item, index) => {
            return (
              <div key={index} className="banner-item">
                <div className="banner-item-label">
                  {index === 0 && <span className="required">*</span>}
                  <span>No.{index + 1}</span>
                </div>
                <BannerImg
                  value={item}
                  index={index}
                  isShowOption={true}
                  landingPageList={landingPageList}
                  className="banner-image-content"
                  disabled={loading}
                  onChange={(value) => {
                    onValueChange &&
                      onValueChange(valueChangeTypeEnum.banner, {
                        index,
                        value,
                      });
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className="edit-module-box">
        <div className="edit-item-title">其他模块配置:</div>
        {formData.homeModuleInfoList &&
          formData.homeModuleInfoList.length > 0 &&
          formData.homeModuleInfoList.map((item, index) => {
            return (
              <div key={`edit-module-${index}`} className="edit-module-item">
                {formData.homeModuleInfoList.length !== 1 && (
                  <div
                    className="module-item-close"
                    onClick={() => {
                      moduleConfigCloseFunc(index);
                    }}
                  >
                    <Icon type="pure-close" />
                    <span>删除该配置</span>
                  </div>
                )}
                <ModuleConfig
                  loading={loading}
                  value={item}
                  index={index}
                  landingPageList={landingPageList}
                  landingType={landingType}
                  onChange={(value) => {
                    onValueChange &&
                      onValueChange(valueChangeTypeEnum.homePageModule, {
                        index,
                        value,
                      });
                  }}
                />
              </div>
            );
          })}
      </div>
      <div className="module-add-box">
        <div className="module-add-button" onClick={addModuleConfig}>
          <Icon type="plus" />
          <div className="line"></div>
          <span>添加配置模块</span>
        </div>
      </div>
      <Modal
        title="预览"
        visible={editModal.isShow}
        width={"1250px"}
        className="homepage-preview-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closeModal();
        }}
      >
        <Preview data={editModal.data} type={previewTypeMap.home.type}  headerType={props.headerType}/>
      </Modal>
    </div>
  );
}

export default React.forwardRef(HomePageConfig);
