import React, { useState, useEffect } from "react";
import { Table, Icon, Modal, Select, Popover } from 'dpl-react'
import { makeUUID } from '@/utils/index'
import './index.scss'

function RuleTable(props) {
  const {
    categoryInfo,
    clickEditCategore,
    clickDelCategore,
    cancelLinkRule,
    selectLinkRule,
    remotConfig,
    allRuleList,
  } = props
  const [categoryName, setCategoryName] = useState('')
  const [categoryTotalScore, setCategoryTotalScore] = useState(0)
  const [list, setList] = useState([])
  const [ruleWin, setRuleWin] = useState(false)
  // 这个字段一定可保障唯一性
  const [ruleConfigId, setRuleConfigId] = useState('')

  const columns = [
    {
      title: '规则ID',
      dataIndex: 'scaRuleId',
      align: 'left',
      width: 100,
    },
    {
      title: '规则名称',
      dataIndex: 'scaRuleName',
      autoEllipsis: true,
      align: "left",
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: '打分设置',
      dataIndex: 'grade',
      align: 'center',
      render: (text, record) => {
        const char = (record.scaRuleType === "1") ? '' : '-'
        const showTxt = `${char}${text}分`;
        return (
          <Popover
            placement="topLeft"
            content={showTxt}
          >
            <span>{showTxt}</span>
          </Popover>
        )
      }
    },
    {
      title: '规则说明',
      dataIndex: 'scaRuleDesc',
      align: 'left',
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            overlayClassName="rule-desc-popover"
            placement="topLeft"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'left',
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: "操作",
      dataIndex: "name",
      autoEllipsis: true,
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            <span
              onClick={() => {
                cancelLink(record);
              }}
            >
              取消关联
            </span>
          </div>
        );
      },
    },
  ];

  const clickAddRule = () => {
    setRuleWin(true)
    setRuleConfigId('')
  }

  const addRule = () => {
    setRuleWin(false)
    // 没有选择规则时，直接关闭窗口
    if (!ruleConfigId) return
    const selectRuleInfo = allRuleList.find(v => v.scaRuleConfigId === ruleConfigId)
    const newDate = {
      ...selectRuleInfo,
      frontRuleId: makeUUID(),  // 生成一个前端的规则id
    }
    selectLinkRule(newDate, categoryInfo)
  }

  const cancelLink = (value) => {
    console.log('value', value);
    const selectRuleInfo = list.find(v => v.frontRuleId === value.frontRuleId);
    cancelLinkRule(selectRuleInfo, categoryInfo)
  }

  const clickEditCategoreOpt = () => {
    clickEditCategore(categoryInfo)
  }

  const clickDelCategoreOpt = () => {
    const modal = Modal.confirm({
      content: <div>删除分类的同时，将<span style={{ color: "red" }}>同步删除分类下所有关联的规则</span></div>,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        modal.destroy()
        clickDelCategore(categoryInfo)
      }
    });
  }

  useEffect(() => {
    setCategoryName(categoryInfo.categoryName)
    setCategoryTotalScore(categoryInfo.categoryTotalScore)
    setList(categoryInfo.analysisPlanCategoryRuleList)
  }, [categoryInfo.categoryName, categoryInfo.categoryTotalScore, categoryInfo.analysisPlanCategoryRuleList])

  useEffect(() => {
    setRuleConfigId('')
  }, [])

  const inputRuleName = (value) => {
    setRuleConfigId(value)
  }

  return (
    <div className="rule-table-wrap">
      <div>
        <div className="append pre-append">
          <div className="left">
            {categoryName} ({categoryTotalScore}分)
          </div>
          <div className="right">
            <span className="edit-opt opt" onClick={clickEditCategoreOpt}>
              <Icon type="edit" />
            </span>
            <span className="del-opt opt" onClick={clickDelCategoreOpt}>
              <Icon type="dustbin-o" />
            </span>
          </div>
        </div>
        <div>
          <Table
            rowKey="frontRuleId"
            dataSource={list}
            bordered
            columns={columns}
            pagination={false}
          />
        </div>
        {
          (list?.length < remotConfig?.maxCategoryRuleNum) ? (
            <div
              className="append after-append"
              onClick={clickAddRule}
            >
              <Icon type="circle-plus-o" />
              <span style={{ marginLeft: 8, color: "#999999" }}>关联分析规则</span>
            </div>
          ) : null
        }
      </div>
      {
        ruleWin ? (
          <Modal
            title="关联分析规则"
            className="link-rule-win"
            visible={ruleWin}
            onOk={addRule}
            onCancel={() => { setRuleWin(false) }}
          >
            <div>
              <span className="label">分析规则</span>
              <Select
                showSearch
                value={ruleConfigId}
                style={{ width: 200 }}
                placeholder="请输入分析规则名称关键字查询"
                optionFilterProp="children"
                onChange={inputRuleName}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
              {
                allRuleList.length && allRuleList.map(item => {
                  return (
                    <Select.Option key={item.scaRuleConfigId} value={item.scaRuleConfigId}>{item.scaRuleName}</Select.Option>
                  )
                })
              }
            </Select>
            </div>
          </Modal>
        ) : null
      }
    </div>
  );
}

export default RuleTable;