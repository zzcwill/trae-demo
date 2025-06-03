import React, { useEffect, useState } from "react";
import { message, Button, Table, Modal } from "dpl-react";
import "./index.scss";
import { get, post } from "@/request/request";
import API from "@/request/api-callcentermanage";

export default function PersonalConsultMatterSetting(props) {
  const [internalList, setInternalList] = useState([]); // 个人咨询事项列表
  const [loading, setLoading] = useState(false); // 删除咨询事项loading

  /**
   * 获取个人咨询事项列表
   */
  const getPersonalInternalList = async () => {
    const res = await get({
      url: API.getConsultMatterPersonalList,
    });
    if (res.success) {
      const data = res.data;
      setInternalList(data);
      if (!data || !data.length) {
        Modal.confirm({
          title: "没有用户咨询事项配置",
          width: 420,
          okText: "确定",
          cancelText: "",
          destroyOnClose: true,
        });
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 删除咨询事项配置
   * @param {number} id
   */
  const deletePersonalInternalContent = async (id) => {
    setLoading(true);
    const res = await post({
      url: API.deleteConsultMatterPersonalContent,
      data: {
        id,
      },
    });
    if (res.success) {
      const data = res.data;
      message.success("咨询事项删除成功！");
      getPersonalInternalList();
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };

  /**
   * 删除按钮
   */
  const deleteButtonClick = (record) => {
    Modal.confirm({
      title: "您确定要删除该条咨询事项吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        deletePersonalInternalContent(record.id);
      },
    });
  };

  /**
   * table列表
   */
  const tableConfig = [
    {
      title: "个人咨询事项库",
      dataIndex: "content",
    },
    {
      title: "操作",
      width: 100,
      align: "center",
      render: (text, record, index) => {
        return (
          <span
            className="delete-button"
            onClick={() => {
              deleteButtonClick(record);
            }}
          >
            删除
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    getPersonalInternalList();
  }, []);

  return (
    <div className="personal-internal-manage">
      <Table
        dataSource={internalList}
        columns={tableConfig}
        pagination={false}
      />
    </div>
  );
}
