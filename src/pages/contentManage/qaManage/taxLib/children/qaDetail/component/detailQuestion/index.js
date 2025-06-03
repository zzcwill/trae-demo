import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import CardTitle from "@/components/common/card/cardTitle";
import CardTime from "@/components/common/card/cardTime";
import CardCategory from "@/components/common/card/cardCategory";
import BtnEdit from "@/components/common/card/btnEdit";
import BtnDelete from "@/components/common/card/btnDelete";
import IconView from "@/components/common/card/iconView";
import { post } from "@/request/request";
import Api from "@/request/api";
import { message, Modal } from "dpl-react";
import history from "@/history";
import PhotoSwipeGallery from '@/utils/photoSwipe/photoSwipeGallery'
export default function DetailQuestion(props, ref) {
  const { detail } = props;
  const genCategory = category => {
    if (!category) return [];
    let result = [category.name];
    let children = category.children;
    while (children && children.length) {
      result.push(children[0].name);
      children = children[0].children;
    }
    return result;
  };
  const deleteHandler = () => {
    Modal.confirm({
      title: "正在进行删除问题的操作",
      content: "问题下的回答也将一起删除，你还要继续吗？",
      onOk: async () => {
        const data = await post({
          url: Api.batchDeleteQuestion,
          data: { idList: [detail.id] }
        });
        if (data.success) {
          message.success("删除成功");
          history.push("/contentManage/qaManage/taxLib");
        } else {
          message.error(data.message);
        }
      }
    });
  };
  const editHandler = () => {
    history.push("/contentManage/qaManage/taxLib/qaAdd?id=" + detail.id);
  };
  return (
    <div className="detail-question-box">
      <div className="detail-question">
        <div className="left">
          <CardTitle title={detail.resume} className="title" />
          <div className='label-wrap'>
            <div className='label'>目录：</div>
            <CardCategory category={genCategory(detail.classify)}/>
          </div>
          <div className="description-box">
            <div className='user-ask'>
              <div className='user-ask-label'>用户问:</div>
              <div className='user-ask-content'> {detail.description}</div>
            </div>
            {Array.isArray(detail.descImageList)&&detail.descImageList.length>0&&  <div className='ask-img'>用户问补充图片：</div>}
            <PhotoSwipeGallery imgList={detail.descImageList}/>
            <div className="btn-box">
              <IconView text={detail.visitNum || 0} icon={'look'}/>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="time">
            <CardTime
              des="发布于"
              time={detail.createTime}
              userName={detail.creatorName}
              style={{ marginBottom: 6 }}
            />
            <CardTime
              des="最近修改于"
              time={detail.lastModifyTime}
              userName={detail.lastModifierName}
            />
          </div>
        </div>
      </div>
      <div className="btn-group">
      {/*  <BtnEdit
          onClick={() => {
            editHandler();
          }}
          className="btn-group-item"
          text='修改问答'
        />
        <BtnDelete
          onClick={() => {
            deleteHandler();
          }}
          className="btn-group-item "
          text='删除问答'
        />*/}
      </div>
    </div>
  );
}
