import React, { useState, useEffect } from 'react'
import './index.scss'
import { Form, DatePicker, Select, Button, Space, message } from 'dpl2-proxy'
import AppTable from '@/components/common/betterTable'
import OlhelpManageApi from '@/requestApi/yypt-olhelp-manage/api';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import useParamsList from '@/hooks/useParamsList';
import useGetList from "@/components/common/hooks/useGetList";
import { dictTypeEnum } from '@/const/config';

const { RangePicker } = DatePicker;
const popoverProps = {
  placement: 'topLeft',
  overlayClassName: 'data-management-table-popover', // 限制最大宽度，默认\n换行显示
};

export default function __functionName(props) {
	const [form] = Form.useForm()
	const [topicTypeList] = useParamsList([dictTypeEnum.memberType], CallCenterManageApi.getCommonOptions);

  // 封装的获取列表自定义hooks
  const { params, changeParams, loading, total, list, getList, } = useGetList({
    queryFunc: OlhelpManageApi.getExpertPoolQuery,
    defaultParam: {},
    isUseQueryString: false,
    isSearchRightNow: true,
  });
  
	const detailClick = (record) => {}
	const ignoreClick = (record) => {}
	const columns = [
		{
			title: 'account',
			dataIndex: 'account',
			width: 200,
			ellipsis: true,
			align: 'center'
		},
		{
			title: 'name',
			dataIndex: 'name',
			width: 100,
			align: 'center'
		},
		{
      title: '创建人',
      dataIndex: 'creatorName',
      align: 'left',
      headerAlign: 'left',
      popover: popoverProps,
    },
		{
      title: '企业名称',
      dataIndex: 'customerName',
      align: 'left',
      headerAlign: 'left',
      popover: popoverProps,
      render(text, record, index) {
        return <p className="limit-two">{text || '- -'}</p>;
      },
    },
		{
			title: '操作',
			dataIndex: 'operate',
			minWidth: 100,
			ellipsis: true,
			align: 'center',
			render: (text, record, index) => {
				return (
					<div className="option-button-list">
						<span
							onClick={() => {
								detailClick(record)
							}}
							className="option-button"
						>
							详情
						</span>
						<span
							onClick={() => {
								ignoreClick(record)
							}}
							className="option-button"
						>
							忽略
						</span>
					</div>
				)
			}
		}
	]

  const handlerSearchClick = (values) => { 
    changeParams({
      ...values,
      pageIndex: 1,
      pageSize: params.pageSize,
    });
  }

  const resetClick = () => {
    form.resetFields();
    changeParams({
      pageIndex: 1,
      pageSize: params.pageSize,
    });
  }

  return (
    <div className="app-bg-box __className">
      <div className="app-search-box">
        <Form
          form={form}
          onFinish={handlerSearchClick}
          layout="inline"
          initialValues={{
          }}
        >
          <Form.Item label="交付时间" name="serviceDates">
            <RangePicker allowClear={false} popupClassName="schedule-manager-header__date-picker" />
          </Form.Item>
          <Form.Item label="主题类型" name="topicType">
            <Select
              virtual
              mode="multiple"
              allowClear
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              style={{ width: 200 }}
            >
              {topicTypeList?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Space style={{ marginBottom: 10 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button onClick={resetClick}>
              重置
            </Button>
          </Space>
        </Form>
      </div>
			<div className="app-table-box">
				<div className="table-btn">
					<Button
							type="primary"
							onClick={() => {
							}}
					>
						新增
					</Button>
				</div>
				<AppTable
					pagination={{
						current: params.pageIndex,
						pageSize: params.pageSize,
						total: total,
						onPageChange: (pageIndex, pageSize) => {
							changeParams({
								...params,
								pageIndex,
								pageSize
							})
						}
					}}
					columns={columns}
					dataSource={list}
					rowKey="id"
				/>
			</div>
    </div>
  );
}
