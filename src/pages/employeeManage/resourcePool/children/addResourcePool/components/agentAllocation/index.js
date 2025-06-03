import { Button, Checkbox, Select, Modal, Table } from 'dpl-react'
import sessionStorageHelper from '@/utils/sessionStorage'
import EmployeeSearch from '../../../../../agentManage/components/employeeSearch'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import { TreeSelect, Radio } from 'dpl2-proxy'
import './index.scss'

const Option = Select.Option
function getAcceptedCapacityValue(value) {
	// 全部是高返回高，全部是低返回低，否则返回空
	if (value?.length > 0 && value.every((val) => val.acceptedCapacity === 'high')) {
		return 'high'
	}
	if (value?.length > 0 && value.every((val) => val.acceptedCapacity === 'low')) {
		return 'low'
	}
	return ''
}

/**
 * 格式化树节点，利用treeNode自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree) {
    return tree.map((item) => {
      return (
        <TreeSelect.TreeNode
          key={item.id}
          value={item.id}
          title={item.name}
        //   没有子节点且没有坐席id的禁用
          disabled={(!item.children || item.children?.length === 0) && !item.userId}
        >
          {formatTree(item.children || [])}
        </TreeSelect.TreeNode>
      );
    });
}

export default function AgentAllocation(props) {
	const { groupType, onChange, value = [], companyList } = props
	const [tempSelect, setTempSelect] = useState([])
    const [selectAgentIds, setSelectAgentIds] = useState([]) // 选择的坐席id
	const [department, setDepartment] = useState()
	const [agentTreeList, setAgentTreeList] = useState([])
    const agentTreeDictRef = useRef({}) // 机构下的坐席树缓存department: agentTreeList,防止重复请求
    const agentDictRef = useRef({}) // trueId: agent, 当前部门下所有的坐席，遍历agentTreeList得到

	const renderAcceptedCapacitySelect = (value, onChange, record) => {
		return (
			<Select value={value} onChange={onChange} className={record.acceptedCapacity ? 'success' : ''}>
				<Option value="high" key="high">
					高
				</Option>
				<Option value="low" key="low">
					低
				</Option>
			</Select>
		)
	}

	const columns = [
		{
			title: '坐席',
			dataIndex: 'name',
			width: 120,
			align: 'center',
			render(text, record, index) {
				return `${text}(${record.userId})`
			}
		},
		{
			title: '操作',
			width: 60,
			render: (text, record, index) => {
				return (
					<Button.Text
						onClick={() => {
							value.splice(index, 1)
							onChange?.([...value])
						}}
					>
						删除
					</Button.Text>
				)
			}
		},
		{
			title: '受理能力',
			dataIndex: 'acceptedCapacity',
			width: 100,
			render: (text, record) => {
				return renderAcceptedCapacitySelect(
					text,
					(val) => {
						record.acceptedCapacity = val
						onChange?.([...value])
					},
					record
				)
			}
		},
		{
			title: (
				<div>
					<Checkbox
						checked={value?.every((val) => val.reuseFlag === 'Y')}
						onClick={(e) => {
							value.forEach((val) => {
								val.reuseFlag = e.target.checked ? 'Y' : 'N'
							})
							onChange?.([...value])
						}}
					></Checkbox>
					复用
				</div>
			),
			dataIndex: 'reuseFlag',
			width: 100,
			render: (text, record, index) => {
				return (
					<>
						<Checkbox
							className={record.reuseFlag ? 'success' : ''}
							checked={text === 'Y'}
							onClick={() => {
								record.reuseFlag = text === 'Y' ? 'N' : 'Y'
								onChange?.([...value])
							}}
						></Checkbox>
						复用
					</>
				)
			}
		}
	]

	const deleteAllAction = () => {
		Modal.confirm({
			title: '请确认是否清空坐席列表?',
			onOk() {
				onChange?.([])
			}
		})
	}

	// 将暂存的临时选择人员添加到选择列表中
	const addTemp2List = () => {
        if (!selectAgentIds || selectAgentIds?.length === 0) {
            return
        }
        // 选中的不一定都是坐席, 从agentDictRef.current中找到对应的坐席具体信息
        const tempSelectAgent = selectAgentIds?.map((trueId) => {
            const agent = agentDictRef.current[trueId];
            return agent ? {
                trueId,
                userName: agent.name,
                userId: agent.userId
            } : undefined
        }).filter(Boolean);
        const valuesDict = value.reduce((dict, val) => {
            dict[val.trueId] = val
            return dict
        }, {});
        // 已经存在的不再添加
        onChange?.([
            ...(value || []),
            ...tempSelectAgent
                .map((temp) => {
                    if (valuesDict[temp.trueId]) {
                        return undefined
                    }
                    return {
                        trueId: temp.trueId,
                        name: temp.userName,
                        userId: temp.userId
                    }
                })
                .filter(Boolean)
        ])
        setSelectAgentIds([])
	}
	const requestAgentList = async () => {
        // 遍历得到当前部门下所有的坐席
        const getAgentDict = (tree) => {
            tree.forEach((item) => {
                if (item.userId) { // 有userId的是坐席, 否则就是部门
                    agentDictRef.current[item.id] = item
                }
                
                if (item.children) {
                    getAgentDict(item.children)
                }
            })
        }

		if (!department || !groupType) {
			return
		}
        let currentAgentTree = agentTreeDictRef.current[`${department}_${groupType}`]
        if (!currentAgentTree) {
            const res = await CallCenterManageApi.getCommonGetDepartmentAgentList({
                companyCode: department,
                agentConsultType: groupType
            })
            if (res.success) {
                agentTreeDictRef.current[`${department}_${groupType}`] = res.data
                currentAgentTree = res.data
            }
        }
        agentDictRef.current = {}
        getAgentDict(currentAgentTree) // 这个是为了从最后的选中value中找到对应的坐席信息
        setAgentTreeList(currentAgentTree)
	}
	useEffect(() => {
		requestAgentList()
	}, [department, groupType])
	useEffect(() => {
        if (companyList?.length > 0 && !department) {
            // 假如user.companyCode在companyList里面就设置
            const user = sessionStorageHelper.getItem('__userInfo') // 用户信息
            if (companyList.some(item => item.id === user.departCode)) {
                setDepartment(user.departCode);
            }
        }
	}, [companyList])
	return (
		<div className="agent-allocation">
			<div className="head-tools">
				<div className="inline-desc">可分配坐席：</div>
                <Select className="success" style={{ width: '20%' }} placeholder="请选择受理机构" value={department} onChange={(value) => {
                    setSelectAgentIds([])
                    setDepartment(value)
                }}>
                    {companyList.map((item) => {
                        return (
                            <Select.Option value={item.id} key={item.id}>
                                {item.name}
                            </Select.Option>
                        )
                    })}
                </Select>
                <TreeSelect
									className="agent-select"
                    placeholder="请选择坐席"
                    style={{ width: '50%' }}
                    maxTagCount={5}
                    disabled={!department || !groupType}
                    showSearch
                    treeNodeFilterProp="title"
                    value={selectAgentIds}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    allowClear
                    treeCheckable
                    showCheckedStrategy={TreeSelect.SHOW_CHILD}
                    onChange={(value) => {
                        setSelectAgentIds(value)
                    }}
                    treeNodeAutoScroll
                >
                    {formatTree(agentTreeList)}
                </TreeSelect>
				<Button className="add-btn" type="primary" onClick={addTemp2List}>
					添加
				</Button>
				<Button className="clear-btn" onClick={deleteAllAction}>
					清空
				</Button>
			</div>
			{/* <EmployeeSearch
				allowClear
				showSearch
				className="employee-select"
				other={{
					allowClear: true,
					showSearch: true,
					mode: 'multiple',
					maxTagCount: '8',
					placeholder: '请输入坐席名称、工号、账号查询坐席'
				}}
				onChange={(ids, data) => {
					console.log(data, 'data')
					setTempSelect(data)
				}}
				value={tempSelect?.length ? tempSelect?.map((temp) => temp.id) : undefined}
			/> */}
			<div className="batch-set">
				批量设置坐席受理能力：
				<Radio.Group
					value={getAcceptedCapacityValue(value)}
					onChange={(e) => {
						value.forEach((val) => {
							val.acceptedCapacity = e.target.value
						})
						onChange?.([...value])
					}}
				>
					<Radio value="high">高</Radio>
					<Radio value="low">低</Radio>
				</Radio.Group>
			</div>
			<div className="content-list">
				<Table columns={columns} dataSource={value} pagination={false} scroll={{ y: 500 }} rowKey="trueId"></Table>
			</div>
		</div>
	)
}
