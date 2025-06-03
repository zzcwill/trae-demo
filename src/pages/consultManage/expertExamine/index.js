import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import {
  Button,
  Pagination,
  message,
  Modal,
  Form,
  Input,
  Select,
  TreeSelect,
} from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import ExpertExamineCard from "./component/expertExamineCard";
import { serviceTypeList } from "@/const/config";

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const FormItem = Form.Item;

function ExpertExamine(props, refs) {
  const { form } = props;
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const [regionList, setRegionList] = useState([]);
  const [consultScopeList, setConsultScopeList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [unPassReason, setUnPassReason] = useState([]);
  const [params, setParams] = useState({
    pageSize: 9,
    pageIndex: 1,
  });
  const [list, setList] = useState([]);
  const [page, setPage] = useState({
    current: 1,
    total: 0,
    pageSize: 9,
  });
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const getTreeDate = async () => {
    let map = {
      0: setConsultScopeList,
      1: setIndustryList,
      2: setRegionList,
    };
    const data = await get(Api.classifyExpertTaxList);
    data.data.forEach((item) => {
      map[item.type] && map[item.type](item.list || []);
    });
  };
  const filterConfig = [
    {
      type: "input", // string 组件类型 必填
      key: "name", // string 字段名称 必填
      label: "专家&机构名称", // string label名称 非必填 默认为空
      labelWidth: "120px", // number label的width值 非必填 默认为100
      other: {
        placeholder: "请输入专家&机构名称",
        allowClear: true,
      }, // input中的其他可取字段内容
    },
    {
      type: "treeSelect", // string 组件类型 必填
      key: "locationList", // string 字段名称 必填
      label: "地区", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      orgTree: regionList,
      treeNodeFilter: {
        key: "name",
        value: "code",
        title: "name",
        children: "children",
      },
      other: {
        placeholder: "请选择地区",
        mode: "multiple",
        maxTagCount: "1",
        maxTagTextLength: "5",
        allowClear: true,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
      }, // input中的其他可取字段内容
    },
    {
      type: "treeSelect", // string 组件类型 必填
      key: "consultScopeList", // string 字段名称 必填
      label: "咨询范围", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      orgTree: consultScopeList, // 选项
      treeNodeFilter: {
        key: "name",
        value: "id",
        title: "name",
        children: "children",
      },
      other: {
        placeholder: "请选择咨询范围",
        mode: "multiple",
        maxTagCount: "1",
        maxTagTextLength: "5",
        allowClear: true,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
      }, // input中的其他可取字段内容
    },
    {
      type: "treeSelect", // string 组件类型 必填
      key: "industryList", // string 字段名称 必填
      label: "行业", // string label名称 非必填 默认为空
      labelWidth: "120px", // number label的width值 非必填 默认为100
      orgTree: industryList, // 选项
      treeNodeFilter: {
        key: "name",
        value: "id",
        title: "name",
        children: "children",
      },
      other: {
        placeholder: "请选择行业",
        mode: "multiple",
        maxTagCount: "1",
        maxTagTextLength: "5",
        allowClear: true,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_PARENT,
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "status", // string 字段名称 必填
      label: "审核状态", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      options: [
        { id: "0", name: "未审核" },
        { id: "1", name: "已审核" },
        { id: "2", name: "审核未通过" },
      ], // 选项
      other: {
        placeholder: "请选择审核状态",
        /*   mode: "multiple",*/
        maxTagCount: "1",
        maxTagTextLength: "5",
        allowClear: true,
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "serviceWay", // string 字段名称 必填
      label: "服务方式", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      options: serviceTypeList, // 选项
      other: {
        placeholder: "请选择服务方式",
        allowClear: true,
      }, // input中的其他可取字段内容
    },
  ];
  const formFilterRef = useRef(null);
  const getOptions = async () => {
    const data = await get(Api.getEnumOptions, {
      params: { groupNames: "audit_unpass_reason" },
    });
    if (data.success) {
      data.data.forEach((item) => {
        if (item.groupName === "audit_unpass_reason") {
          setUnPassReason(item.options);
        }
      });
    }
  };
  const fetchList = async (params) => {
    const data = await post(Api.expertInstitutionList, {
      data: params,
    });
    if (data.success) {
      setList(data.data.list);
      setPage({
        total: data.data.total,
        current: data.data.pageIndex,
        pageSize: data.data.pageSize,
      });
    }
  };
  const searchHandler = () => {
    let data = formFilterRef.current.getData();
    let classifyIdList = [];
    if (data.consultScopeList) {
      // data.consultScopeList = data.consultScopeList.join(',')
      classifyIdList = classifyIdList.concat(data.consultScopeList);
    }
    if (data.industryList) {
      //   data.industryList = data.industryList.join(',')
      classifyIdList = classifyIdList.concat(data.industryList);
    }
    data.pageIndex = 1;
    data.pageSize = 9;
    let params = {
      name: data.name,
      classifyIdList: classifyIdList,
      locationList: data.locationList,
      serviceWay: data.serviceWay,
      pageIndex: 1,
      pageSize: 9,
      status: data.status,
    };
    setParams(params);
  };
  const clearHandler = () => {
    formFilterRef.current.clearData();
    setParams({ pageSize: 9, pageIndex: 1 });
  };
  const examine = (obj) => {
    Modal.confirm({
      title: "正在变更专家&机构服务审核状态",
      content: "未通过的专家服务将对用户隐藏，你还要继续吗？",
      onOk: async () => {
        const data = await post(Api.expertInstitutionAudit, { data: obj });
        if (data.success) {
          message.success("操作成功");
          fetchList(params);
          setShowModal(false);
        } else {
          message.error(data.message);
        }
      },
    });
  };
  const examineClickHandler = (key, item) => {
    if (key == "1") {
      examine({ id: item.id, status: "1" });
    } else {
      setCurrentItem(item);
      setShowModal(true);
    }
    console.log(key, item);
  };
  const examineModalOkHandler = () => {
    validateFieldsAndScroll((err, data) => {
      if (!err) {
        examine({ id: currentItem.id, status: "2", ...data });
      }
    });
  };
  useEffect(() => {
    getTreeDate();
    getOptions();
  }, []);
  useEffect(() => {
    fetchList(params);
  }, [params]);
  return (
    <div className="expert-examine-box">
      <div className="form-filter-wrap">
        <FormFilter config={filterConfig} ref={formFilterRef} />
        <div className="btn-group">
          <Button type="primary" onClick={searchHandler}>
            查询
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={clearHandler}>
            清空条件
          </Button>
        </div>
      </div>
      <div className="table-content">
        <div className="btn-group">
          <div className="total">
            共找到符合条件的专家&机构<span>{page.total}</span>条
          </div>
        </div>
        <div className="expert-content">
          {list.map((item) => {
            return (
              <ExpertExamineCard
                data={item}
                key={item.id}
                onMenuClick={(key) => {
                  examineClickHandler(key, item);
                }}
              />
            );
          })}
        </div>
        <div className="page-wrap">
          <Pagination
            className="pagination-overwrite"
            {...page}
            showQuickJumper
            onChange={(pageIndex, pageSize) => {
              setParams(Object.assign({}, params, { pageSize, pageIndex }));
            }}
          />
        </div>
      </div>
      <Modal
        visible={showModal}
        title="审核未通过"
        onCancel={() => {
          setShowModal(false);
        }}
        className="examine-modal"
        onOk={examineModalOkHandler}
      >
        {showModal && (
          <Form>
            <FormItem label="未通过原因" {...formItemLayout}>
              {getFieldDecorator("auditUnpassReason", {
                rules: [
                  {
                    required: true,
                    message: "请选择未通过原因",
                  },
                ],
              })(
                <Select placeholder="请选择未通过原因">
                  {unPassReason.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
            <FormItem label="未通过补充说明" {...formItemLayout}>
              {getFieldDecorator(
                "auditUnpassDesc",
                {}
              )(
                <Input.TextArea
                  placeholder="请输入未通过补充说明（不超过200个字）"
                  maxlenght={200}
                  rows={6}
                />
              )}
            </FormItem>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default Form.create()(React.forwardRef(ExpertExamine));
