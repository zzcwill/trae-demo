import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import { Form, DatePicker, Input, Button, Space, message } from 'dpl2-proxy'
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import useParamsList from '@/hooks/useParamsList';
import ConsultRecordList from '@/components/consultRecordList';
import { dictTypeEnum } from '@/const/config';

const { RangePicker } = DatePicker;

export default function ConsultRecordManage(props) {
	const [form] = Form.useForm()
	const consultRef = useRef(null);
	const [topicTypeList] = useParamsList([dictTypeEnum.memberType], CallCenterManageApi.getCommonOptions);


  const handlerSearchClick = (values) => {
		consultRef.current.changeParams({
		  ...consultRef.current.getParams(),
		  ...values,
			companyId: values.companyId,
			customerId: values.customerId,
		  pageIndex: 1,
		});
  }

  const resetClick = () => {
    form.resetFields();
		consultRef.current.changeParams({
			...consultRef.current.getParams().pageSize,
      pageIndex: 1,
    });
  }

  return (
    <div className="app-bg-box consult-record-list">
      <div className="app-search-box">
        <Form
          form={form}
          onFinish={handlerSearchClick}
          layout="inline"
          initialValues={{
          }}
        >
					<Form.Item label="companyId" name="companyId">
						<Input placeholder="请输入" allowClear/>
          </Form.Item>
					<Form.Item label="customerId" name="customerId">
						<Input placeholder="请输入" allowClear/>
          </Form.Item>
          {/* <Form.Item label="交付时间" name="serviceDates">
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
          </Form.Item> */}
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
								consultRef.current.refreshList();
							}}
					>
						刷新列表
					</Button>
				</div>
				<ConsultRecordList ref={consultRef} pageInfo={{ pageIndex: 1, pageSize: 20}} paramsExtra={{ sceneCode: 'shui5' }} tableProps={{ className: 'test-custom'}}/>
			</div>
    </div>
  );
}
