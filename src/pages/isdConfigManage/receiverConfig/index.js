import React, { useEffect, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Modal, message, Button } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-callcentermanage";
import useClassifyList from "@/hooks/useClassifyList";
import EmployeeSearch from "../../employeeManage/agentManage/components/employeeSearch";
import ChangeModal from "../components/changeModal";
import { classifyTypeEnum, dictTypeEnum } from "@/const/config";

const { confirm } = Modal;

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
  createFormActions,
} = uForm;
const actions = createFormActions()
export default function ReceiverConfig(props) {
  const [productList, setProductList] = useState([]); // 产品维度
  const [locationList] = useClassifyList([classifyTypeEnum.isdConfigArea], Api.getCMClassifyList);
  const [changeFormVisible, setChangeFormVisible] = useState(false); // 修改受理人弹窗
  const [editModal, setEditModal] = useState({}); // 修改受理人弹窗

  const [batchUpdateIdList, setBatchUpdateIdList] = useState([]); // 批量修改的id列表
  const [disableBatchUpdate, setDisableBatchUpdate] = useState(true); // 批量修改按钮是否禁用
  const [batchEditFlag, setBatchEditFlag] = useState(false); // 是否是批量修改
  /**
   * 获取枚举（入口类型、构建类型）
   */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getIsdConfigSystemAndModuleQuery,
      params: {},
    });
    if (res.success) {
      const data = res.data || [];
      // const newArray = data.map((item) => ({
      //   name: item.name,
      //   code: `pr-${item.code}`,  // 为了标识是产品还是模块
      //   childrenList: item.childrenList || [],
      // }));
      setProductList(data);
    } else {
      message.error(res.message);
    }
  };

  const ignoreClick = (record) => {
    setEditModal(record);
    setChangeFormVisible(true);
  };

  // 点击删除文案
  const clickdelItem = async (record) => {
    confirm({
      content: '确认要删除该数据么？',
      async onOk() {
        try {
          const res = await post({
            url: Api.batchDelItem,
            data: {
              idList: [record.id],
            }
          })
          if (res.success) {
            message.success(res.message || '删除成功');
            actions.submit();
          } else {
            message.error(res.message || '删除失败');
          }
        } catch (error) {
          message.error(error.message);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 修改受理人弹框点击确定
  const changeClick = async (values) => {
    console.log('values', values);
    console.log('batchEditFlag', batchEditFlag);
    let idList = []
    if (batchEditFlag) {
      // 批量修改
      idList = batchUpdateIdList
      setBatchEditFlag(false)
    } else {
      // 单个修改信息
      idList = [editModal.id];
    }
    console.log('idList', idList);
    const res = await post({
      url: Api.postUpdateIsdConfigPage,
      data: {
        ...values,
        idList,
      },
    });
    if (res.success) {
      message.success("修改成功");
      setChangeFormVisible(false);
      setBatchUpdateIdList([])
      setDisableBatchUpdate(true)
      actions.submit();
    } else {
      message.error(res.message);
    }
  };
  const columns = [
    {
      title: "主体",
      dataIndex: "accessName",
      ellipsis: true,
      align: "center",
      autoEllipsis: true,
    },
    {
      title: "产品",
      dataIndex: "systemName",
      ellipsis: true,
      align: "center",
      autoEllipsis: true,
    },
    {
      title: "模块",
      dataIndex: "moduleName",
      ellipsis: true,
      align: "center",
      autoEllipsis: true,
      className: "remark-rows",
      width: 250,
    },
    {
      title: "地区",
      dataIndex: "locationNameList",
      ellipsis: true,
      autoEllipsis: true,
      align: "center",
      render: (text, record, index) => {
        return <div>{text?.join(",") || "-"}</div>;
      },
    },
    {
      title: "受理人",
      dataIndex: "acceptorName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "修改时间",
      dataIndex: "modifyDate",
      ellipsis: true,
      align: "center",
      width: 180,
    },
    {
      title: "修改人",
      dataIndex: "modifierName",
      ellipsis: true,
      align: "center",
      autoEllipsis: true,
    },
    {
      title: "操作",
      dataIndex: "name",
      ellipsis: true,
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            <span
              onClick={() => {
                ignoreClick(record);
              }}
              className="option-button"
            >
              修改受理人
            </span>
            <span
              className="option-button"
              onClick={() => clickdelItem(record)}
            >删除</span>
          </div>
        );
      },
    },
  ];
  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await post({
      url: Api.getIsdConfigPage,
      data: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        sortRuleList: [{ field: "modify_date", order: "desc"}],
        ...values,
        systemCodeList:
          values.systemCodeList?.length === 1
            ? values.systemCodeList[0]
            : undefined,
        moduleCodeList:
          values.systemCodeList?.length === 2
            ? values.systemCodeList[1]
            : undefined,
        locationCodeList: values.locationCodeList
          ? values.locationCodeList
          : undefined,
        acceptorTrueIdList: values.acceptorTrueIdList
          ? values.acceptorTrueIdList
          : undefined,
      },
    });
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex,
    };
  };
  const { form, table } = useFormTableQuery(service, {
    pagination: { pageSize: 10 },
  });

  // 表格选择多行
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setBatchUpdateIdList(selectedRowKeys)
      if (selectedRowKeys.length > 0) {
        setDisableBatchUpdate(false);
      } else {
        setDisableBatchUpdate(true);
      }
    },
    selectedRowKeys: batchUpdateIdList,
  }

  // 点击批量修改按钮
  const clickBatchUpdate = () => {
    setBatchEditFlag(true)
    setChangeFormVisible(true)
  }

  useEffect(() => {
    getEnumOptions();
  }, []);
  return (
    <div className="app-bg-box receiver-config">
      <SchemaForm
        {...form}
        inline
        className="app-search-box"
        actions={actions}
        components={{ EmployeeSearch }}
      >
        <Field
          type="array"
          title="产品&模块"
          name="systemCodeList"
          x-component="Cascader"
          x-component-props={{
            allowClear: true,
            placeholder: "请选择产品&模块",
            options: productList,
            showSearch: true,
            changeOnSelect: true,
            optionFormat: {
              value: "code",
              label: "name",
              children: "childrenList",
            },
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="array"
          title="地区"
          name="locationCodeList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择适用地区",
            dataSource: locationList,
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="string"
          title="受理人"
          name="acceptorTrueIdList"
          x-component="EmployeeSearch"
          x-component-props={{
            other: {
              allowClear: true,
              showSearch: true,
              mode: "multiple",
              maxTagCount: "2",
              maxTagTextLength: "3",
              placeholder: "请输入受理人名称、工号、账号",
            },
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <div className="btn-wrap">
        <Button
          type="primary"
          className="app-btn app-btn-primary"
          onClick={clickBatchUpdate}
          disabled={disableBatchUpdate}
        >
          批量修改
        </Button>
      </div>
      <AppTable
        className="app-table-box"
        {...table}
        columns={columns}
        rowKey="id"
        rowSelection={rowSelection}
      />
      <ChangeModal
        title="修改受理人"
        visible={changeFormVisible}
        onCancel={() => setChangeFormVisible(false)}
        onOk={changeClick}
      />
    </div>
  );
}
