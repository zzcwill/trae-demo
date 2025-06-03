import React, { useState, useRef, useEffect } from "react";
import { Modal, Tabs, Form, Input, Select, Button, message } from "dpl-react";
import Api from '@/request/api-olhelpmanage'
import { get } from '@/request/request'
import "./index.scss";
import AppTable from "@/components/common/table";



const TabPane = Tabs.TabPane;



function RightsListModal(props) {
  const {
    open,
    onOk,
    onCancel,
    model = []
  } = props;
  const columns = [
    { title: '踩得人', dataIndex: 'mobile' },
    {
        title: "踩得原因",
        dataIndex: "reason",
    },
]

  return (
    <Modal
      className="vote-modal"
      visible={open}
      width={800}
      title="踩详情列表"
      onOk={onCancel}
      onCancel={onCancel}
      footer={null}
      destroyOnClose={true}
    >
      <AppTable
        dataSource={model || []}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.mobile}
        className="vote-list"
      />
    </Modal>
  );
}


export default RightsListModal;