import React, { useEffect, useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';
import {
  Form,
  Select,
} from 'dpl2-proxy';
import SearchSetPanel from '@servyou/search-set-panel';
import UserFuzzyQueryDpl2 from "@/components/userFuzzyQueryDpl2";
import TaskSelectDpl2 from "@/components/taskSelectDpl2";
import { StoreContext } from '../../context';

import '@servyou/search-set-panel/dist/main.css';
import './index.scss';

export const SearchInfo = ({
  className
}) => {
  const storeContext = useContext(StoreContext);
  const {
    tableLoad,
    businessList,
    initSearchData,
    searchData,
    setSearchData,
    toSearchTable, 
  } = storeContext;

  const [searchForm] = Form.useForm();

  const searchSetPanelListData = [
    {
      key: 'taskIdList',
      locked: true,
      component: (
        <Form.Item
          label="任务名称："
          name="taskIdList"
        >
          <TaskSelectDpl2
            showSearch
            allowClear
            placeholder="请选择"
            style={{ width: '240px' }}
            wait={200}
            mode="multiple"
            notFoundContent="暂无数据"
            virtual
            filterOption={() => true}
          />
        </Form.Item>
      ),
    },
    {
      key: 'calendarCodeList',
      locked: true,
      hidden: false,
      component: (
        <Form.Item
          label="业务分类："
          name="calendarCodeList"
        >
          <Select
            // showSearch
            allowClear
            placeholder="请选择"
            style={{ width: '190px' }}
            onChange={(values) => {
              console.log('onChange', values);
            }}
            wait={250}
            mode="multiple"
            notFoundContent="暂无数据"
            virtual
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              businessList.map(item => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      ),
    },
    {
      key: 'creatorIdList',
      locked: true,
      component: (
        <Form.Item
          label="任务创建人："
          name="creatorIdList"
        >
          <UserFuzzyQueryDpl2
            showSearch
            allowClear
            placeholder="请选择"
            style={{ width: '240px' }}
            wait={200}
            mode="multiple"
            notFoundContent="暂无数据"
            virtual
            filterOption={() => true}
          />
        </Form.Item>
      ),
    },
    {
      key: 'traineeIdList',
      locked: true,
      component: (
        <Form.Item
          label="受训人："
          name="traineeIdList"
        >
          <UserFuzzyQueryDpl2
            showSearch
            allowClear
            placeholder="请选择"
            style={{ width: '240px' }}
            wait={200}
            mode="multiple"
            notFoundContent="暂无数据"
            virtual
            filterOption={() => true}
          />
        </Form.Item>
      ),
    },        
  ];

  useEffect(() => {
  }, []);

  return (
    <div className="search-info">
      <Form
        form={searchForm}
      >
        <SearchSetPanel
          itemList={searchSetPanelListData}
          searchBtnProps={{
            onClick: async () => {
              if (tableLoad) {
                return;
              }

              const tableSearchForm = cloneDeep(searchForm.getFieldsValue());
              const newSearchData = {
                ...searchData,
                ...tableSearchForm,
                pageIndex: 1,             
              }
              setSearchData(newSearchData);
              toSearchTable(newSearchData);
            },
          }}
          resetBtnProps={{
            onClick: async () => {
              if (tableLoad) {
                return;
              }

              searchForm.resetFields();
              const newSearchData = {
                ...initSearchData,
              }
              setSearchData(newSearchData);
              toSearchTable(newSearchData);
            },
          }}
          showSetBtn={false}
        />
      </Form>
    </div>
  );
};
