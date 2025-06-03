import ModalSelect from '@/components/common/modalSelect';
import { acceptanceChannelCode } from '@/const/config';
import { Button, InputNumber, Modal, Select, Table } from 'dpl-react';
import React, { useMemo } from 'react'
import './index.scss';



export default function CallGroupAllocation(props) {
    const { onChange, value = [], companyList = [], groupType = acceptanceChannelCode.call, orgList = [] } = props;
    // console.log('groupType', groupType);
    
    const groupIdList = useMemo(() => {
        return value?.map(val => (val.id))
    }, [value])

    const modalSelectChange = (ids, data) => {
        onChange?.(data?.map(item => {
            const oldItem = value?.find(val => val.id === item.id) || {
                id: item.id,
                name: item.name,
                groupSelfPriority: '0',
                groupReusePriority: '0',
                safetyAgentCount: 0,
                safetyConsultCount: 10,
            };
            return oldItem;
        }));
    };

    const renderPrioritySelect = (value, onChange, className) => {
        return <Select
            value={value}
            onChange={onChange}
            className={className}
        >
            {
                new Array(11).fill(1).map((item, index) => {
                    return <Select.Option
                        key={index}
                        value={`${index}`}
                    >
                        {index}
                    </Select.Option>
                })
            }
        </Select>
    }

    const columns = useMemo(() => {
        const array = [{
            title: '组ID',
            dataIndex: "id",
            width: 100,
            align: "center",
        },
        {
            title: "组名称",
            dataIndex: "name",
            width: 250,
        },
        {
            title: "操作",
            width: 120,
            render: (text, record, index) => {
                return <Button.Text onClick={() => {
                    value.splice(index, 1);
                    onChange?.([...value])
                }}>删除</Button.Text>
            },
        },
        {
            title: '组优先级(自有)',
            dataIndex: "groupSelfPriority",
            width: 200,
            render: (text, record) => {
                return renderPrioritySelect(text, (val) => {
                    record.groupSelfPriority = val;
                    onChange?.([...value])
                }, record?.groupSelfPriority ? "success" : "");
            }
        },
        {
            title: '组优先级(复用)',
            dataIndex: "groupReusePriority",
            width: 200,
            render: (text, record, index) => {
                return renderPrioritySelect(text, (val) => {
                    record.groupReusePriority = val;
                    onChange?.([...value])
                }, record?.groupReusePriority ? "success" : "");
            }
        },
        {
            title: "接通率阈值",
            width: 660,
            align: "center",
            render: (text, record, index) => {
                return <span className='row-line'>
                    当接通率低于
                    <InputNumber
                        className={record.plusAgentCallCompletingRateThreshold || record.minusAgentCallCompletingRateThreshold ? "success" : ""}
                        value={record?.plusAgentCallCompletingRateThreshold}
                        min={1}
                        max={99}
                        precision={0}
                        onChange={(val) => {
                            record.plusAgentCallCompletingRateThreshold = val;
                            onChange?.([...value])
                        }}
                    />% 开始加人，
                    高于
                    <InputNumber
                        className={record.plusAgentCallCompletingRateThreshold || record.minusAgentCallCompletingRateThreshold ? "success" : ""}
                        value={record?.minusAgentCallCompletingRateThreshold}
                        min={1}
                        max={99}
                        precision={0}
                        onChange={(val) => {
                            record.minusAgentCallCompletingRateThreshold = val;
                            onChange?.([...value])
                        }}
                    />% 开始减人。
                </span>
            },
        },
        {
            title: '单次加减人数',
            dataIndex: "oncePlusOrMinusAgentCount",
            width: 150,
            render: (text, record, index) => {
                return <InputNumber
                    className={record.oncePlusOrMinusAgentCount ? "success" : ""}
                    value={text}
                    min={1}
                    max={99}
                    precision={0}
                    onChange={(val) => {
                        record.oncePlusOrMinusAgentCount = val;
                        onChange?.([...value])
                    }}
                />
            }
        },
        {
            title: '保底咨询次数',
            dataIndex: "safetyConsultCount",
            width: 500,
            render: (text, record, index) => {
                return (
                    <span>
                        当组受理量低于
                        <InputNumber
                            value={text}
                            className={record.safetyConsultCount ? "success" : ""}
                            min={1}
                            max={99}
                            precision={0}
                            onChange={(val) => {
                                record.safetyConsultCount = val;
                                onChange?.([...value])
                            }}
                        />次时，将所有在线电话坐席都添加到组下
                    </span>
                )
            }
        },
        {
            title: '保底人数',
            dataIndex: "safetyAgentCount",
            width: 500,
            render: (text, record, index) => {
                return (
                    <span>
                        当组内坐席少于等于
                        <InputNumber
                            value={text || 0}
                            className={((record.safetyAgentCount || (record.safetyAgentCount === 0 && groupType === acceptanceChannelCode.call))) ? "success" : ""}
                            min={0}
                            max={99}
                            precision={0}
                            onChange={(val) => {
                                record.safetyAgentCount = val || 0;
                                onChange?.([...value])
                            }}
                        />人时，不再减人
                    </span>
                )
            }
        },
        ];
        if (groupType === acceptanceChannelCode.online) {
            // 过滤掉dataIndex groupReusePriority  groupSelfPriority
            return array.filter(item => item.dataIndex !== 'groupReusePriority' && item.dataIndex !== 'groupSelfPriority')
        }
        return array;
    },[groupType, onChange]) 


    const deleteAllAction = () => {
        Modal.confirm({
            title: `请确认是否清空${groupType === acceptanceChannelCode.online ? '在线' : '电话'}组列表?`,
            onOk() {
                onChange?.([]);
            }
        })
    }

    return (
        <div className='call-group-allocation'>
            <div className='head-tools'>
                <div className='inline-desc'>以下{groupType === acceptanceChannelCode.online ? '在线' : '电话'}组可以使用当前资源池中的坐席：</div>
                <ModalSelect
                    className="call-group-select"
                    value={groupIdList}
                    groupType={groupType}
                    showCompanyDepartFilter
                    companyList={companyList}
                    orgList={orgList}
                    showType="button"
                    onChange={modalSelectChange}
                    isNeedStringToNumber={true}
                />
                <Button className='clear-btn' onClick={deleteAllAction}>清空</Button>
            </div>
            <div className='content-list'>
                <Table
                    columns={columns}
                    dataSource={value}
                    pagination={false}
                    scroll={{ x: 2000, y: 500 }}
                    rowKey="id"
                >
                </Table>
            </div>
        </div>
    )
}
