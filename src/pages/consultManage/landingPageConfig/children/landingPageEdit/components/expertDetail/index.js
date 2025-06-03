import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import ExpertSearchModal from "@/components/consultManage/expertSearchModal";
import ExpertDetailCard from "../expertDetailCard";
import BlankCard from "@/components/consultManage/blankCard";
import { message, Modal, Button } from "dpl-react";
import Preview from "@/components/consultManage/preview";
import { previewTypeMap } from "@/const/config";
import { modelType } from "@/const/config";
import ExpertCategoryComponent from "@/components/consultManage/expertCategoryComponent";
const ElTitle = () => {
  return (
    <span className="select-expert-detail-box">
      <span className="title">选择官方服务</span>
      <div className="line"></div>
      <span className="remarks">注：仅支持选择一个</span>
    </span>
  );
};
const defaultPreviewModal = {
  isShow: false,
  data: {},
};
function ExpertDetail(props) {
  const {
    classifyList = [],
    professionList = [],
    areaList = [],
    onPublish,
    onCancel,
    onPrevStep,
    businessId,
    loading,
    lastData,
    type,
    moduleTypeCode, // 模块类型，因为当前组件使用了两个场景
  } = props;
  const [formData, setFormData] = useState([]); // 表单数据
  const [previewModal, setPreviewModal] = useState(defaultPreviewModal);
  const [isShow, setIsShow] = useState(false);
  const getLandingPageExportDetail = async (businessId) => {
    const res = await get({
      url: Api.getLandingPageExportDetail,
      params: {
        businessId,
      },
    });
    if (res.success) {
      const data = res.data;
      setFormData([data]);
    } else {
      message.error(res.message);
    }
  };

  // 删除
  const deleteCard = () => {
    if (loading) {
      return;
    }
    setFormData([]);
  };

  // 新增服务
  const addCard = () => {
    if (loading) {
      return;
    }
    setIsShow(true);
  };

  // 新增卡片列表
  const addCardList = (data) => {
    setFormData(data);
  };
  /**
   * 关闭批量设置弹窗
   */
  const closeModal = () => {
    setIsShow(false);
  };

  // 发布
  const publish = () => {
    if (formData.length > 0) {
      onPublish &&
        onPublish({
          serviceIdList: [formData[0].id],
        });
    } else {
      message.warning("选择专家后才可发布！");
    }
  };

  const getExpertDetail = async (id) => {
    const res = await get({
      url: Api.expertInstitutionDetail,
      params: {
        id,
      },
    });
    if (res.success) {
      const data = {
        type: previewTypeMap.expertDetail.type,
        data: {
          type: previewTypeMap.expertDetail.type,
          ...res.data,
        },
      };
      setPreviewModal({
        isShow: true,
        data,
      });
    } else {
      message.error(res.message);
    }
  };

  // 预览
  const preview = () => {
    if (formData.length <= 0) {
      message.warning("请添加对应专家后再进行预览！");
      return;
    }
    getExpertDetail(formData[0].id);
  };

  const baseButtonList = [
    {
      name: "发布落地页",
      onClick: publish,
      type: "primary",
    },
    {
      name: "上一步",
      onClick: () => {
        onPrevStep(formData);
      },
      type: "primary",
    },
    {
      name: "取消",
      onClick: onCancel,
    },
  ];
  const previewButton = {
    name: "预览",
    onClick: preview,
    type: "primary",
  };
  // 如果moduleType 是 服务业专家服务
  const buttonList =
    moduleTypeCode === modelType.expertDetailService
      ? [].concat(baseButtonList)
      : [].concat(previewButton, baseButtonList);

  // 关闭预览弹窗
  const closePreviewModal = () => {
    setPreviewModal(defaultPreviewModal);
  };

  useEffect(() => {
    if (lastData) {
      setFormData(lastData);
    } else {
      if (businessId && type === moduleTypeCode) {
        getLandingPageExportDetail(businessId);
      }
    }
  }, []);
  return (
    <div className="expert-detail-box">
      {formData.length > 0 &&
        formData.map((item) => {
          return (
            <div className="expert-detail-item">
              <ExpertDetailCard
                value={item}
                isShowDelete={true}
                onDelete={deleteCard}
                disabled={loading}
              />
            </div>
          );
        })}
      {formData.length === 0 && (
        <div className="expert-detail-item">
          <BlankCard
            text="选择专家"
            onClick={addCard}
            width={366}
            height={176}
          />
        </div>
      )}
      <div className="button-box">
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
                    item.onClick();
                  }}
                >
                  {item.name}
                </Button>
              </>
            );
          })}
      </div>
      <Modal
        title={ElTitle()}
        visible={isShow}
        width={"1220px"}
        className="expert-select-modal"
        footer={null}
        destroyOnClose
        onCancel={() => {
          closeModal();
        }}
      >
        <ExpertSearchModal
          regionList={areaList}
          consultScopeList={classifyList}
          industryList={professionList}
          onCancel={closeModal}
          onChange={addCardList}
        />
      </Modal>
      <Modal
        title="预览"
        visible={previewModal.isShow}
        width={"1250px"}
        className="expert-detail-preview-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closePreviewModal();
        }}
      >
        <Preview
          data={previewModal.data}
          type={previewTypeMap.expertDetail.type}
          headerType={props.headerType}
        />
      </Modal>
    </div>
  );
}

export default React.forwardRef(ExpertDetail);
