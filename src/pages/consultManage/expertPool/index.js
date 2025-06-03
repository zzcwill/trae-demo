import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import LandingCard from "../landingPageConfig/components/landingCard";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import AddBox from "../landingPageConfig/components/addBox";
import {
  expertPoolStatusMap,
  editTypeEnum,
  olhelpEnumOptionType,
} from "@/const/config";
import { Radio, message, Pagination, Modal } from "dpl-react";
import LandingTable from "../landingPageConfig/components/landingTable";
import UpdateStatus from "../landingPageConfig/components/updateStatus";
import classnames from "classnames";
import EntranceEditModal from "./component/entranceEditModal";
import qs from "qs";
import { uForm } from "dora";
import moment from "moment";
import "moment/locale/zh-cn";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
  createFormActions,
} = uForm;
const actions = createFormActions();
const RadioButton = Radio.Button;
const defaultPageIndex = 1;
const defaultPageSize = 10;
// 默认分页信息
const defaultPageInfo = {
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize,
  total: 0,
};
// 状态列表
const statusList = [
  {
    id: "all",
    name: "全部",
  },
  {
    id: expertPoolStatusMap.ineffective,
    name: "未生效",
  },
  {
    id: expertPoolStatusMap.effective,
    name: "已生效",
  },
  {
    id: expertPoolStatusMap.invalid,
    name: "已失效",
  },
];
const defaultFormData = {
  status: statusList[0].id,
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize,
};
/**
 * 添加全部的select的option
 */
const allArea = {
  id: "0000",
  name: "全国",
};
const addAllOption = (options) => {
  return [].concat(allArea, options);
};

const relationBizType = "01"; //新架构，目前写死

const defaultEditModal = {
  isShow: false,
  relationBizType: relationBizType,
  name: "新增",
  type: "add",
  data: {},
};

export default function ExpertPool(props) {
  const [formData, setFormData] = useState(() => {
    const data = qs.parse(window.location.href.split("?")[1]);
    let result = {
      ...defaultFormData,
      name: data.name, // 默认落地页名称
      status: data.status || statusList[0].id, // 状态
      systemCodes: data.systemCodes ? data.systemCodes.split(",") : undefined, // 落地页id
      modifyTime:
        (data.beginConfigTime &&
          data.endConfigTime && [data.beginConfigTime, data.endConfigTime]) ||
        undefined,
      pageIndex: (data.pageIndex && Number(data.pageIndex)) || defaultPageIndex,
      pageSize: (data.pageSize && Number(data.pageSize)) || defaultPageSize,
    };
    // 日期不知道是只有一个还是有多个
    return result;
  }); //表单数据
  const [isFirst, setIsFirst] = useState(true); //第一次进入
  const [systemsList, setSystemsList] = useState([]); //  落地页下拉列表
  const [configStatus, setConfigStatus] = useState(formData.status);
  const configStatusRef = useRef(formData.status); // 配置状态
  const isResetForm = useRef(false); // 是否重置了选择数据
  const [editModal, setEditModal] = useState(defaultEditModal);
  const [userLabelList, setUserLabelList] = useState([]); // 用户分层列表
  /**
   * classnames
   */
  const statusClass = (status) => {
    return classnames({
      "entrance-status": true,
      "entrance-status-effective": status == expertPoolStatusMap.effective,
      "entrance-status-invalid": status == expertPoolStatusMap.invalid,
    });
  };

  /**
   * 获取地区列表接口
   */

  const getAreaList = async () => {
    const res = await get({
      url: Api.getWdList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data.location) {
        console.log("data.location", data.location);
      }
    } else {
      message.error(res.message);
    }
  };

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const params = {
      name: (values.name && values.name.trim()) || undefined, // 默认落地页名称
      systemCodes: values.systemCodes?.length > 0 ? values.systemCodes.join(",") : undefined, // 落地页id
      status:
        configStatusRef.current == "all" ? undefined : configStatusRef.current, // 状态
      modelType: values.modelType, // 落地页类型
      beginConfigTime: values.createDate && values.createDate[0], // 最后修改时间起
      endConfigTime: values.createDate && values.createDate[1], // 最后修改时间止
      pageIndex: pagination.current || defaultPageIndex,
      pageSize: pagination.pageSize || defaultPageSize,
      relationBizType: values.userLabel ? '02' : (values.systemCodes?.length > 0 ? relationBizType : undefined) ,
      relationBizIdList: values.userLabel ? values.userLabel : undefined,
    };
    if (values.userLabel && values.systemCodes?.length > 0) {
      params.relationBizType = relationBizType //两个都选传01让它查不到值
    }
    setHash(params);
    const res = await get({
      url: Api.getExpertPoolList,
      params,
    });
    if (res.success) {
      const data = res.data;
    } else {
      message.error(res.message);
    }

    return {
      dataSource: (res.data && res.data.list) || [],
      pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
      total: (res.data && res.data.total) || pagination.total,
      current: (res.data && res.data.pageIndex) || pagination.current,
    };
  };
  const submitClickFunc = () => {
    isResetForm.current = false;
  };
  //  formily 清空中间件
  const middleware =
    () =>
    ({ context }) => ({
      onFormResetQuery(payload, next) {
        // 手动将表单数据清除，为了处理初始化的情况下，无法清除默认值的问题
        actions.setFormState((state) => (state.values = {}));
        isResetForm.current = true;
        context.setPagination({
          ...context.pagination,
          current: 1,
        });
        context.setSorter({});
        context.setFilters({});
        return next({});
      },
      onPageQuery(payload, next) {
        // 手动将表单数据清除
        context.setPagination({
          ...context.pagination,
        });
        context.setSorter({});
        context.setFilters({});
        return next(isResetForm.current ? {} : payload);
      },
    });

  const { form, table, trigger } = useFormTableQuery(
    service,
    {
      pagination: { current: formData.pageIndex, pageSize: formData.pageSize },
    },
    [middleware()]
  );

  /**
   * 修改状态
   */
  const updateStatus = async (data) => {
    const res = await post({
      url: Api.postExpertPoolUpdateStatus,
      data,
    });
    if (res.success) {
      message.success("状态修改成功！");
      // const result = formatData(formData);
      trigger();
      // getConsultEntranceList(result);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取配置详情
   */
  const getEntranceConfigDetail = async (id, callback) => {
    const res = await get({
      url: Api.getExpertPoolDetail,
      params: {
        id,
      },
    });
    if (res.success) {
      const data = res.data;
      callback && callback(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取用户分层列表
   */
  const getUserLabelList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: olhelpEnumOptionType.ExpertPoolUserLabel, // 服务类型
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (
          item.groupName === olhelpEnumOptionType.ExpertPoolUserLabel &&
          item.options
        ) {
          const list = item.options;
          setUserLabelList(list);
        }
      });
    } else {
      message.error(res.message);
    }
  };
  /**
   * 获取落地页配置列表
   */
  const getSystemsList = async () => {
    try {
      const res = await get({
        url: Api.getEnumOptions,
        params: {
          groupNames: olhelpEnumOptionType.ConsultSystemCode,
        },
      });
      if (res.success) {
        res.data.forEach((item) => {
          if (
            item.groupName === olhelpEnumOptionType.ConsultSystemCode &&
            Array.isArray(item.options)
          ) {
            const array = item.options.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
            setSystemsList(array);
          }
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 状态改变
  const statusChange = (e) => {
    const value = e.target.value;
    configStatusRef.current = value;
    setConfigStatus(value);
    trigger();
  };

  const formatData = (data) => {
    return {
      ...data,
      status: data.status == "all" ? undefined : data.status,
    };
  };

  // 额外
  const entranceExtra = (
    <Radio.Group value={configStatus} onChange={statusChange}>
      {statusList.map((item) => {
        return (
          <RadioButton key={item.id} value={item.id}>
            {item.name}
          </RadioButton>
        );
      })}
    </Radio.Group>
  );

  const columns = [
    {
      title: "专家池名称",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "适用渠道",
      dataIndex: "channels",
      width: 100,
      center: true,
      render: (text, data) => {
        let list = [];
        if (text && Array.isArray(text)) {
          list = text.map((item) => item.label);
        }
        return <span title={list.join("；")}>{list.join("；")}</span>;
      },
    },
    {
      title: "适用产品",
      dataIndex: "systems",
      width: 100,
      center: true,
      render: (text, data) => {
        let list = [];
        if (text && Array.isArray(text)) {
          list = text.map((item) => item.label);
        }
        return <span title={list.join("；")}>{list.join("；")}</span>;
      },
    },
    {
      title: "用户分层",
      dataIndex: "relationBizVOList",
      width: 100,
      center: true,
      render: (text) => {
        let showText = '';
        if (Array.isArray(text) && text.length > 0) {
          showText = text[0].relationBizName
        }
        return <span title={showText}>{showText}</span>;
      }
    },
    {
      title: "配置人",
      dataIndex: "creatorName",
      width: 100,
    },
    {
      title: "配置时间",
      dataIndex: "createDate",
      width: 150,
    },
    {
      title: "最后修改时间",
      dataIndex: "modifyDate",
      width: 150,
    },
    {
      title: "配置状态",
      dataIndex: "status",
      width: 120,
      center: true,
      render: (text, data) => {
        return (
          <span className={statusClass(data.status)} title={data.statusName}>
            {data.statusName}
          </span>
        );
      },
    },
  ];

  // 改变状态
  const changeStatus = (value, data) => {
    updateStatus({
      id: data.id,
      status: value,
    });
  };

  // 添加渠道
  const addEntrance = () => {
    setEditModal({
      isShow: true,
      relationBizType: relationBizType,
      type: editTypeEnum.add,
      name: "新增",
      data: {},
    });
  };

  const editConfig = (list) => {
    getEntranceConfigDetail(list[0].id, (result) => {
      setEditModal({
        isShow: true,
        relationBizType: relationBizType,
        type: editTypeEnum.edit,
        name: "编辑",
        data: result,
      });
    });
  };
  const optionComponent = (data) => {
    return (
      <div className="entrance-option-box">
        <UpdateStatus
          list={statusList.slice(2)}
          onClick={(item) => {
            changeStatus(item.key, data[0]);
          }}
        />
        <div
          className="entrance-option-edit"
          onClick={() => {
            editConfig(data);
          }}
        >
          修改配置
        </div>
      </div>
    );
  };

  /**
   * 分页
   * @param {*} pageIndex
   * @param {*} pageSize
   */
  const changePage = (pageIndex, pageSize) => {
    const pagination = { ...table.pagination, current: pageIndex, pageSize };
    table.onChange(pagination, null, null);
  };

  const closeModal = (isRefresh) => {
    setEditModal(defaultEditModal);
    if (isRefresh) {
      // const data = formatData(formData);
      // getConsultEntranceList(data);
      trigger();
    }
  };

  const setHash = (data) => {
    let hash = window.location.hash.split("#")[1];
    hash = hash.split("?")[0];
    let params = qs.parse(window.location.href.split("?")[1]);
    window.location.hash = `#${hash}?${qs.stringify(
      Object.assign(params, data)
    )}`;
    if (isFirst) {
      setIsFirst(false);
    }
  };

  useEffect(() => {
    if (!isFirst) {
      const data = formatData(formData);
      setHash(data);
    }
  }, []);

  useEffect(() => {
    // getAreaList();
    getUserLabelList();
    getSystemsList();
  }, []);
  return (
    <div className="expert-pool-box">
      <LandingCard title="专家池配置列表" extra={entranceExtra}>
        <div className="search-box">
          <SchemaForm
            actions={actions}
            {...form}
            initialValues={formData}
            inline
            className="form-wrap"
          >
            <Field
              type="string"
              title="专家池名称"
              name="name"
              x-component="Input"
              x-component-props={{
                allowClear: true,
                placeholder: "请输入专家池名称",
                style: {
                  width: 250,
                },
              }}
            />
            <Field
              type="array"
              title="适用产品"
              name="systemCodes"
              x-component="Select"
              x-component-props={{
                allowClear: true,
                mode: "multiple",
                placeholder: "请选择适用产品",
                dataSource: systemsList,
                showSearch: true,
                optionFilterProp: "children",
                style: {
                  width: 250,
                },
              }}
            />
            <Field
              type="string"
              title="用户分层"
              name="userLabel"
              x-component="Select"
              x-component-props={{
                allowClear: true,
                optionFormat: {
                  label: 'name',
                  value: 'id',
              },
                placeholder: "请选择用户分层",
                dataSource: userLabelList,
                showSearch: true,
                optionFilterProp: "children",
                style: {
                  width: 250,
                },
              }}
            />
            <Field
              type="string"
              title="配置时间"
              name="createDate"
              x-component="RangePicker"
              x-component-props={{
                style: {
                  width: 260,
                },
              }}
            />
            <FormButtonGroup>
              <Submit style={{ marginRight: 10 }} onClick={submitClickFunc}>
                查询
              </Submit>
              <Reset>清空条件</Reset>
            </FormButtonGroup>
          </SchemaForm>
        </div>
        <AddBox context="添加专家池" onClick={addEntrance} />
        <div className="entrance-list-box">
          {table.dataSource.length > 0 &&
            table.dataSource.map((item) => {
              return (
                <LandingTable
                  key={item.id}
                  columns={columns}
                  dataSource={[item]}
                  optionComponent={optionComponent}
                />
              );
            })}
        </div>
        <div className="pagination-box">
          <Pagination
            showTotalInfo={false}
            current={Number(table.pagination.current)}
            pageSize={Number(table.pagination.pageSize)}
            total={Number(table.pagination.total)}
            showQuickJumper={true}
            showSizeChanger={true}
            onShowSizeChange={changePage}
            onChange={changePage}
          />
        </div>
      </LandingCard>
      {editModal.isShow && (
        <Modal
          title={editModal.name}
          visible={editModal.isShow}
          width="860px"
          className="expert-pool-edit-modal"
          destroyOnClose
          footer={null}
          onCancel={() => {
            closeModal();
          }}
        >
          <EntranceEditModal
            config={editModal}
            onCancel={closeModal}
            formData={editModal.data}
            userLabelList={userLabelList}
          />
        </Modal>
      )}
    </div>
  );
}
