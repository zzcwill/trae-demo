import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import OfficialSearchModal from "@/components/consultManage/officialSearchModal";
import OfficialServiceCard from "@/components/consultManage/officialServiceCard";
import BlankCard from "@/components/consultManage/blankCard";
import { modelType } from "@/const/config";
import { message, Modal, Button } from "dpl-react";
const ElTitle = () => {
  return (
    <span className="select-official-service-box">
      <span className="title">选择官方服务</span>
      <div className="line"></div>
      <span className="remarks">注：仅支持选择一个</span>
    </span>
  );
};
function OfficialService(props) {
  const {
    serviceTypeList,
    serviceTypeMap,
    onPublish,
    onCancel,
    onPrevStep,
    businessId,
    loading,
    lastData,
    type,
  } = props;
  const [formData, setFormData] = useState([]); // 表单数据
  const [isShow, setIsShow] = useState(false);
  const getLandingPageOfficialDetail = async (businessId) => {
    const res = await get({
      url: Api.getLandingPageOfficialDetail,
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
      message.warning("选择官方服务后才可发布！");
    }
  };

  const buttonList = [
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

  useEffect(() => {
    if (lastData) {
      setFormData(lastData);
    } else {
      if (businessId && type === modelType.officialService) {
        getLandingPageOfficialDetail(businessId);
      }
    }
  }, []);
  return (
    <div className="official-service-box">
      {formData.length > 0 &&
        formData.map((item) => {
          return (
            <div className="official-service-item">
              <OfficialServiceCard
                isShowDelete={true}
                isShowConsult={true}
                value={item}
                index={0}
                typeIcon={item.type}
                imageUrl={item.imageUrl}
                serviceTypeMap={serviceTypeMap}
                onDelete={(value, index) => {
                  deleteCard();
                }}
                showDescription={false}
                showName={true}
                showBrand={true}
              />
            </div>
          );
        })}
      {formData.length === 0 && (
        <div className="official-service-item">
          <BlankCard width={270} height={248} onClick={addCard} />
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
        className="official-service-select-modal"
        footer={null}
        destroyOnClose
        onCancel={() => {
          closeModal();
        }}
      >
        <OfficialSearchModal
          serviceTypeList={serviceTypeList}
          serviceTypeMap={serviceTypeMap}
          onCancel={closeModal}
          onChange={addCardList}
          editModalConfig={{
            isShow,
          }}
          serviceTypeDisabled={false}
          sceneType="tool"
        />
      </Modal>
    </div>
  );
}

export default React.forwardRef(OfficialService);
