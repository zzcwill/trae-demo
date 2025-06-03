import React, { useEffect, useState } from "react";
import "./index.scss";
import CommonManagePageTemplate from "@/components/commonManagePageTemplate";
import Api from "@/request/api-olhelpmanage.js";
import schema from "./schema";
import useClassifyList from "@/hooks/useClassifyList";
import { setElements ,
  registerEvent,
  setFormValues,
} from "@/components/dynamicForm/core";
import useDictList from "@/hooks/useDictList";
import { classifyTypeEnum, dictTypeEnum, serviceConfigCardTypeEnum } from "@/const/config";
import { get, postWithReturn } from "@/request/request";
import { Modal, message } from "dpl-react";
import moment from "moment";

const statusMap = {
  // 待上架
  TODO: "0",
  // 上架
  ON: "1",
  // 下架
  OFF: "2",
};

export default function RefuelingPackageList(props) {
  const [state] = useState({
    form: {},
  });
  const [areaRegionList] = useClassifyList([classifyTypeEnum.areaRegion]);
  const [consultServiceList, setConsultServiceList] = useState([])
  const [
    productPackageTypeList,
    onshelfRegionList,
    onshelfStatusList,
  ] = useDictList(
    [
      dictTypeEnum.productPackage,
      dictTypeEnum.onshelfRegion,
      dictTypeEnum.onshelfStatus,
    ],
    Api.getEnumOptions
  );

  /**
   * 查询咨询产品配置列表
   */
  const getConsultProductTypeList = async () => {
    const res = await get({
      url: Api.getServiceConfigQueryServiceConfigList,
      // params: {
      //   cardTypes: `${serviceConfigCardTypeEnum.expert},${serviceConfigCardTypeEnum.offcial}`
      // },
    });
    if (res.success && Array.isArray(res.data)) {
        setConsultServiceList(
        res.data.map((item) => {
          return {
            value: item.consultService,
            label: item.consultServiceName,
          };
        })
      );
    } else {
      message.error(res.message);
    }
  };
  const handleAction = (record, action, refreshList) => {
    const title = action.type === "ON" ? "上架" : "下架";
    Modal.confirm({
      title: `确认${title}【${record.productId}】${record.packageName}吗？`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        postWithReturn({
          options: {
            url: Api.postProductPackageOnShelf,
            data: {
              id: record.id,
              onShelfStatus: action.type === "ON" ? "1" : "2",
            },
          },
          successText: `${title}成功`,
          onSuccess: () => {
            refreshList();
          },
        });
      },
    });
  };
  const columns = [
    {
      title: "产品包ID",
      dataIndex: "productId",
      ellipsis: true,
      align: "center",
    },
    {
      title: "产品包名称",
      dataIndex: "packageName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "action",
      align: "center",
      render(_, record, index) {
        let extra = [];
        if (statusMap.TODO === record.onShelfStatus) {
          extra = [
            {
              type: "edit",
              desc: "修改",
            },
            {
              type: "ON",
              desc: "上架",
              handler: handleAction,
            },
          ];
        }
        if (statusMap.ON === record.onShelfStatus) {
          extra = [
            {
              type: "OFF",
              desc: "下架",
              handler: handleAction,
            },
          ];
        }
        return extra;
      },
    },
    {
      title: "咨询产品类型",
      dataIndex: "consultServiceName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "类型",
      dataIndex: "typeName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "次数",
      dataIndex: "amount",
      ellipsis: true,
      align: "center",
    },
    {
      title: "状态",
      dataIndex: "onShelfStatusName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "上架位置",
      dataIndex: "shelfRegionList",
      ellipsis: true,
      align: "center",
      listType: true,
      objKey: "shelfRegionName",
    },
    {
      title: "适用地区",
      dataIndex: "areaRegionList",
      ellipsis: true,
      align: "center",
      listType: true,
      objKey: "areaName",
      width: 200,
      className: "remark-rows",
    },
    {
      title: "备注",
      dataIndex: "note",
      ellipsis: true,
      align: "center",
      width: 250,
      className: "remark-rows",
    },
    {
      title: "最后修改人",
      dataIndex: "modifier",
      minWidth: 143,
      ellipsis: true,
      align: "center",
      render(val, record) {
        return (
          <>
            <div>{record.modifier || ""}</div>
            <div>
              {record.modifyDate
                ? moment(record.modifyDate).format("YYYY-MM-DD HH:mm")
                : ""}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    registerEvent("amount", "onChange", () => {
      let amount = state.form.getFieldValue("amount") || "";
      let index = 0;
      while (amount[index++] === "0");
      setFormValues({
        amount: amount.substring(index - 1),
      });
    });
    getConsultProductTypeList()
  }, []);

  const onMountedHandler = (type, form) => {
    state.form = form;
    setElements({
      consultService: {
        props: {
          dataSource: consultServiceList,
        },
      },
      type: {
        props: {
          dataSource: productPackageTypeList,
        },
      },
      shelfRegionList: {
        props: {
          dataSource: onshelfRegionList,
        },
      },
      areaCodeList: {
        props: {
          dataSource: areaRegionList,
        },
      },
      productId: {
        props: {
          placeholder: "请输入产品包ID",
          min: 1,
          maxLength: 16,
          // 编辑时不可修改产品包id
          disabled: type === "edit",
        },
      },
    });
  };

  // const onOpenHandler = (type, form)  => {
  //     setElements({
  //         productId: {
  //             props: {
  //                 placeholder: '请输入产品包ID',
  //                 min: 1,
  //                 maxLength: 10,
  //                 // 编辑时不可修改产品包id
  //                 disabled: type === 'edit'
  //             },
  //         }
  //     })
  // }

  return (
    <div className="app-bg-box refueling-package-list">
      <CommonManagePageTemplate
        modalConfig={{
          schema,
          onMounted: onMountedHandler,
          // onOpen: onOpenHandler
        }}
        searchConfig={[
          {
            type: "Input",
            title: "产品包名称",
            name: "name",
            props: {
              placeholder: "请输入",
              allowClear: true,
            },
          },
          {
            type: "Select",
            title: "咨询产品类型",
            name: "consultService",
            props: {
              placeholder: "请选择",
              dataSource: consultServiceList,
              allowClear: true,
              showSearch: true,
              optionFilterProp: "children",
            },
          },
          {
            type: "Select",
            title: "状态",
            name: "shelfStatus",
            props: {
              placeholder: "请选择",
              allowClear: true,
              dataSource: onshelfStatusList,
            },
          },
        ]}
        transformDetailData={(data) => {
          return {
            ...data,
            shelfRegionList: data.shelfRegionList
              ?.map((item) => item.shelfCode)
              ?.filter((code) => !!code),
            areaCodeList: data.areaRegionList
              ?.map((item) => item.areaCode)
              ?.filter((code) => !!code),
            type: `${data.type || ''}`,
          };
        }}
        columns={columns}
        apiConfig={{
          fetchListUrl: Api.getProductPackageList,
          postSaveUrl: Api.postProductPackageSave,
          updateSaveUrl: Api.postProductPackageUpdate,
          fetchDetailUrl: Api.getProductPackageDetail,
        }}
      />
    </div>
  );
}
