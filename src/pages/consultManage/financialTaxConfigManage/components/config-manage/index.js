import React, { useEffect, useMemo, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, Modal, message } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-olhelpmanage";
import useDictList from "@/hooks/useDictList";
import useClassifyList from "@/hooks/useClassifyList";
import { classifyTypeEnum, dictTypeEnum } from "@/const/config";
import ConfigSettingModal from "../config-setting-modal";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
	createFormActions
} = uForm;

const actions = createFormActions();
export default function ConfigManage(props) {
  const [topicTypeList] = useDictList(
    [dictTypeEnum.financialltaxTopicType],
    Api.getEnumOptions
  );
  const [locationList] = useClassifyList([classifyTypeEnum.allArea]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [addModalVisible, setAddModalVisible] = useState(false);
	const [addModal, setAddModal] = useState({});

  const monthList = useMemo(() => {
    const array = [];
    for (let index = 1; index <= 12; index++) {
      array.push({
        label: `${index}月`,
        value: index,
      });
    }
    return array;
  }, []);

	const reloadList = () => {
		actions.submit();
	}

  const onEdit = (record) => {
		setAddModalVisible(true);
		setAddModal({
			id: record.id,
			type: 'edit',
		});
	};

  const onCopy = (record) => {
		setAddModalVisible(true);
		setAddModal({
			id: record.id,
			type: 'add',
		});
	};

  const onDelete = (ids) => {
		if(!ids || ids.length === 0) {
			message.error('请选择要删除的数据');
			return;
		}
		Modal.confirm({
			title: `是否确认删除？`,
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				post(Api.postFinancialTaxConfigDelete, {
					data: {	
						idList: ids,
					},
				}).then((res) => {
					if (res.success) {
						message.success("删除成功");
						reloadList();
					} else {
						message.error(res.message);
					}
				});
			},
		});
	};

  const columns = [
    {
      title: "主题名称",
      dataIndex: "businessTopicName",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "主题代码",
      dataIndex: "businessTopicCode",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "主题类型",
      dataIndex: "topicTypeName",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "生效月份",
      dataIndex: "effectMonthList",
      ellipsis: true,
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return <span>{text.join("、")}</span>;
      },
    },
    {
      title: "适用地区",
      dataIndex: "locationList",
      ellipsis: true,
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return <span>{text.map((item) => item.locationName).join("、")}</span>;
      },
    },
    {
      title: "展示顺序",
      dataIndex: "topicOrder",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "问候语-业务范围",
      dataIndex: "scopeName",
      ellipsis: true,
      align: "center",
			className: 'remark-rows',
			width: 250,
			render: (text) => {
				return <div>{text}</div>
			}
    },
    {
      title: "问题录入框默认文案",
      dataIndex: "inputTip",
      ellipsis: true,
			className: 'remark-rows',
      align: "center",
			width: 150,
			render: (text) => {
				return <div>{text}</div>
			}
    },
    {
      title: "问答机器人模型用户问和标准问的相似程度",
      dataIndex: "qaRobotQuestionModelSimilarityThreshold",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "ChatGPT机器人模型开关",
      dataIndex: "chatgptSwitchFlag",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    // {
    //   title: "ChatGPT机器人模型用户问和业务主题的相似程度",
    //   dataIndex: "chatgptModelSimilarityThreshold",
    //   ellipsis: true,
    //   align: "center",
    //   width: 150,
    // },
    // {
    //   title: "ChatGPT机器人模型参考资料相似程度",
    //   dataIndex: "chatgptModelRetrieveThreshold",
    //   ellipsis: true,
    //   align: "center",
    //   width: 150,
    // },
    // {
    //   title: "ChatGPT机器人模型参考资料最大数量",
    //   dataIndex: "chatgptModelRetrieveTopkThreshold",
    //   ellipsis: true,
    //   align: "center",
    //   width: 150,
    // },
    {
      title: "搜索算法用户问和知识的相似程度",
      dataIndex: "qaSearchModelSimilarityThreshold",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "工具类模型用户问和标准问的相似程度",
      dataIndex: "toolModelSimilarityThreshold",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "配置时间",
      dataIndex: "modifyDate",
      ellipsis: true,
			className: 'remark-rows',
      align: "center",
			width: 105,
			render: (text) => {
				return <div>{text}</div>
			}
    },
    {
      title: "配置人",
      dataIndex: "modifierName",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "operate",
      ellipsis: true,
      align: "center",
			width: 150,
      fixed: 'right',
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            <span
              onClick={() => {
                onEdit(record);
              }}
              className="option-button"
            >
              修改
            </span>
            <span className="line">|</span>
            <span
              onClick={() => {
                onDelete([record.id]);
              }}
              className="option-button"
            >
              删除
            </span>
            <span className="line">|</span>
            <span
              onClick={() => {
                onCopy(record);
              }}
              className="option-button"
            >
              复制
            </span>
          </div>
        );
      },
    },
  ];
  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await get({
      url: Api.getFinancialTaxConfigListByPage,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...values,
        effectMonthList: values.effectMonthList
          ? values.effectMonthList.join(",")
          : undefined,
        topicTypeList: values.topicTypeList
          ? values.topicTypeList.join(",")
          : undefined,
				locationCodeList: values.locationCodeList
          ? values.locationCodeList.join(",")
          : undefined,
      },
    });
    return {
      dataSource: data.data?.list,
      pageSize: data.data?.pageSize,
      total: data.data?.total,
      current: data.data?.pageIndex,
    };
  };
  const { form, table } = useFormTableQuery(service, {
    pagination: { pageSize: 10 },
  });
  useEffect(() => {}, []);
  return (
    <div className="app-bg-box config-manage">
      <SchemaForm 
				{...form} 
				inline 
				className="app-search-box"
				actions={actions}
			>
        <Field
          type="string"
          title="主题名称"
          name="businessTopicName"
          x-component="Input"
          x-component-props={{ placeholder: "请输入" }}
        />
        <Field
          type="string"
          title="主题代码"
          name="businessTopicCode"
          x-component="Input"
          x-component-props={{ placeholder: "请输入" }}
        />
        <Field
          type="array"
          title="主题类型"
          name="topicTypeList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择主题类型",
            dataSource: topicTypeList,
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="array"
          title="生效月份"
          name="effectMonthList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择生效月份",
            dataSource: monthList,
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="array"
          title="适用地区"
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
          type="number"
          title="展示顺序"
          name="topicOrder"
          x-component="InputNumber"
          x-component-props={{
            placeholder: "请输入",
            min: 0,
            precision: 0,
            inputWidth: 100,
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <div>
        <Button
          type="primary"
					style={{marginRight: 10}}
          onClick={() => {
            setAddModalVisible(true);
						setAddModal({
							type: 'add',
						});
          }}
        >
          添加
        </Button>
				<Button
          type="primary"
          onClick={() => {
						onDelete(selectedRowKeys)
					}}
        >
          批量删除
        </Button>
      </div>
      <AppTable
        className="app-table-box"
        {...table}
        columns={columns}
        rowKey="id"
        scroll={{ x: 1300 }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
      {addModalVisible && <ConfigSettingModal 
        visible={addModalVisible}
				info={addModal}
        topicTypeList={topicTypeList}
        locationList={locationList}
        onCancel={() => {
          setAddModalVisible(false);
        }}
        onSaveSuccess={() => {
          setAddModalVisible(false);
          // 重新加载列表
          reloadList();
        }}
      />}
    </div>
  );
}
