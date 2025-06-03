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

export default function __functionName(props) {
  const [form] = Form.useForm()
	const [topicTypeList] = useDictList([dictTypeEnum.financialltaxTopicType], Api.getEnumOptions);
	const [locationList] = useClassifyList([classifyTypeEnum.allArea]);
  const [pageLoading, setPageLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [pageObj, setPageObj] = useState(defaultPageObj);
  const [values, setValues] = useState({}); // 搜索框表单数据

	const detailClick = (record) => {}
	const ignoreClick = (record) => {}
	const columns = [
		{
			title: 'account',
			dataIndex: 'account',
			ellipsis: true,
			align: 'center'
		},
		{
			title: 'name',
			dataIndex: 'name',
			ellipsis: true,
			align: 'center'
		},
		{
			title: '操作',
			dataIndex: 'operate',
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

  const requestList = async (obj = {}) => {
    setPageLoading(true);
    const res = await OlhelpManageApi.getExpertPoolQuery({
      ...values,
      pageIndex: pageObj.pageIndex,
      pageSize: pageObj.pageSize,
      ...obj,
    });
    setPageLoading(false);
    
    if (res.success) {
      if (res.data.total) {
        setPageObj({
          ...pageObj,
          total: res.data.total,
        });
        setDataList(res.data.list);
      } else {
        setDataList([]);
      }
    } else {
      message.error(res.message);
    }
  };

  const handlerSearchClick = (values) => { 
    setValues(values);
  }

  const resetClick = () => {
    form.resetFields();
    setValues({});
  }

  useEffect(() => {
    requestList();
  }, [values, pageObj.pageIndex, pageObj.pageSize]);
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
          <Form.Item label="交付地区" name="locationCodeList">
            <Select
              virtual
              mode="multiple"
              allowClear
              showSearch
              placeholder="请选择"
              optionFilterProp="children"
              style={{ width: 200 }}
            >
              {locationList?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
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
			<AppTable className="app-table-box" 
        pagination={{
          current: pageObj.pageIndex,
          pageSize: pageObj.pageSize,
          total: pageObj.total,
          onPageChange: (pageIndex, pageSize) => {
            setPageObj({
              ...pageObj,
              pageIndex,
              pageSize,
            });
          },
        }}
        columns={columns}
        dataSource={dataList} 
        rowKey="id" 
      />
    </div>
  );
}
