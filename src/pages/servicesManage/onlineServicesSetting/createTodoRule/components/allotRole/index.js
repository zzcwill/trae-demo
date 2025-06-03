/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-01-19 11:19:28
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-27 16:51:57
 * @FilePath: /askone-manage-pc/src/pages/servicesManage/onlineServicesSetting/createTodoRule/components/allotRole/index.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import UserFuzzyQuery from '@/components/common/userFuzzyQuery';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import { Col, message, Row, Select } from 'dpl2-proxy';
import BusinessCenterCascader from '@/components/common/businessCenterCascader'
import { useEffect, useState } from "react";
const { Option } = Select;

export default function AllotRole(props) {
  const { value, onChange, regionList } = props;
  const [roleList, setRoleList] = useState([]);

  const requestRoleList = async (businessId) => {
    if (!businessId || businessId?.length == 0) {
      return;
    }
    const res = await CallCenterManageApi.getTodoGetTodoRole({
      businessCenterCode: businessId[0],
      regionCodeList: businessId.slice(1).join(','),
    });
    if (res.success) {
      const array = res.data?.map(item => {
        return {
          label: item.synergyTypeName,
          value: item.synergyType,
        }
      })
      setRoleList(array || []);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    if (value?.businessId) {
      requestRoleList(value.businessId);
    } else {
      setRoleList([])
    }
  }, [value])
  return (
    <div className="allot-role">
      {/* 业务、分子公司、角色三个Select选择器 */}
      <Row>
        <Col span={10}>
          <BusinessCenterCascader
            value={value?.companyId}
            onChange={(val) => {
              console.log("val", val);
              onChange({
                ...value,
                businessId: val,
                roleId: undefined
              })
            }}
            regionList={regionList}
          />
        </Col>
        <Col span={5}>
          <Select
            placeholder="请选择角色"
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            value={value?.roleId}
            onChange={(val) => {
              onChange({
                ...value,
                roleId: val,
              })
            }}
          >
            {roleList?.map((option) => (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={9}>
          <Row>
            <Col span={8} style={{ lineHeight: '30px', textAlign: 'right' }}>兜底处理人：</Col>
            <Col span={16}>
              <UserFuzzyQuery
                value={value?.undercoverPerson}
                delay={300}
                placeholder="请输入后选择"
                valueFarmat={{
                  value: 'trueId',
                  label: 'userName'
                }}
                onChange={(val) => {
                  onChange({
                    ...value,
                    undercoverPerson: val
                  })
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
