import React, {useState, useEffect} from "react";
import "./index.scss";
import OfficialServiceCard from "../officialServiceCard";
import BannerImg from "../bannerImg";
import {Button, Modal} from "dpl-react";
import BlankCard from "../blankCard";
import OfficialSearchModal from "../officialSearchModal";
import Preview from "../preview";
import useDragBox from "@/hooks/useDragBox";
import classnames from "classnames";
import {buttonSiteMap} from "@/const/config";

const ElTitle = () => {
    return (
        <span className="select-official-service-box">
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

const defaultEditModal = {
    isShow: false,
    selectList: [],
};

function OfficialServiceCategory(props, ref) {
    const {
        formData,
        onValueChange,
        loading,
        bannerChangeType,
        officialServiceChangeType,
        officialServiceDeleteType,
        officialServiceListChange,
        officialTypeCode,
        previewTypeObj,
        serviceTypeMap,
        serviceTypeList,
        buttonList,
        buttonSite = buttonSiteMap.top,
        showDescription,
        showName,
        showBrand,
    } = props;
    const {
        onDragstart,
        onDragover,
        onDragenter,
        onDragLeave,
        onDrop,
        onDragEnd,
    } = useDragBox({
        targetClassName: "official-service-item",
        moveToClassName: "drag-move-to-item",
        fromClassName: "drag-from-item",
        onChange: officialServiceListChange,
    });
    const [editModal, setEditModal] = useState(defaultEditModal);
    const [previewModal, setPreviewModal] = useState(defaultPreviewModal);
    const bodyClass = classnames({
        "official-service-category-box": true,
        "official-service-category-box-bottom": buttonSite == buttonSiteMap.bottom,
    });

    const buttonClass = classnames({
        "button-box": true,
        "button-box-bottom": buttonSite == buttonSiteMap.bottom,
    });
    const buttonClick = (item) => {
        item.onClick && item.onClick();
    };

    // 新增服务
    const addCard = () => {
        if (loading) {
            return;
        }
        let list = [];
        formData.officialServiceList.forEach((item) => {
            list.push(item.id);
        });
        setEditModal({
            isShow: true,
            selectList: list,
        });
    };

    // 新增卡片列表
    const addCardList = (data) => {
        onValueChange && onValueChange(officialServiceChangeType, data);
    };

    /**
     * 关闭批量设置弹窗
     */
    const closeModal = () => {
        setEditModal(defaultEditModal);
    };

    // 预览
    const preview = () => {
        const data = {
            //   type: previewTypeMap.basic.type,
            type: previewTypeObj.type,
            data: {
                // ...previewTypeMap.basic,
                ...previewTypeObj,
                bannerList: formData.bannerImageList,
                officialServiceList: formData.officialServiceList,
            },
        };
        setPreviewModal({
            isShow: true,
            data,
        });
    };

    // 关闭预览弹窗
    const closePreviewModal = () => {
        setPreviewModal(defaultPreviewModal);
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
                                    onValueChange &&
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
                <div className="title">分类管理</div>
                {formData.officialServiceList &&
                formData.officialServiceList.length > 0 &&
                formData.officialServiceList.map((item, index) => {
                    return (
                        <div
                            className="official-service-item"
                            key={index}
                            draggable={true}
                            onDragStart={(e) => {
                                onDragstart(e, item, index);
                            }}
                            onDragEnter={function (e) {
                                onDragenter(e, item, index);
                            }}
                            onDragOver={(e) => {
                                onDragover(e, item, index);
                            }}
                            onDragLeave={(e, item, index) => {
                                onDragLeave(e, item, index);
                            }}
                            onDrop={(e, item, index) => {
                                onDrop(e, item, index);
                            }}
                            onDragEnd={() => {
                                onDragEnd();
                            }}
                        >
                            <OfficialServiceCard
                                isShowDelete={true}
                                isShowConsult={true}
                                value={item}
                                index={index}
                                typeIcon={officialTypeCode}
                                imageUrl={item.imageUrl}
                                serviceTypeMap={serviceTypeMap}
                                showDescription={showDescription}
                                showName={showName}
                                showBrand={showBrand}
                                onDelete={(value, index) => {
                                    onValueChange &&
                                    onValueChange(officialServiceDeleteType, {
                                        value,
                                        index,
                                    });
                                }}
                            />
                        </div>
                    );
                })}
                <div className="official-service-item" draggable={false}>
                    <BlankCard onClick={addCard} width={270} height={248}/>
                </div>
            </div>

            <Modal
                title={ElTitle()}
                visible={editModal.isShow}
                width={"1220px"}
                className="category-add-modal"
                footer={null}
                destroyOnClose
                onCancel={() => {
                    closeModal();
                }}
            >
                <OfficialSearchModal
                    type={officialTypeCode}
                    serviceTypeList={serviceTypeList}
                    serviceTypeMap={serviceTypeMap}
                    onCancel={closeModal}
                    onChange={addCardList}
                    editModalConfig={editModal}
                    sceneType="tool"
                />
            </Modal>
            <Modal
                title="预览"
                visible={previewModal.isShow}
                width={"1250px"}
                className="category-preview-modal"
                destroyOnClose
                footer={null}
                onCancel={() => {
                    closePreviewModal();
                }}
            >
                {/* <Preview data={previewModal.data} type={previewTypeMap.basic.type} /> */}
                <Preview data={previewModal.data} type={previewTypeObj.type} headerType={props.headerType}/>
            </Modal>
        </div>
    );
}

export default React.forwardRef(OfficialServiceCategory);
