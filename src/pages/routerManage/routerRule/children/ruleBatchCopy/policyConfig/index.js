import { Radio, Select } from 'dpl-react';
import React from 'react'
import './index.scss'

export default function PolicyConfig(props) {
    const { value = {}, onChange, policyList = [] } = props;

    const changeValue = (key, val) => {
        const tempValue = {
            [key]: val
        }
        if (key === 'policy') {
            tempValue.mode = '2';
        }
        if (key === 'mode' && val === '1') {
            tempValue.policy = undefined;
        }
        onChange?.({
            ...(value || {}),
            ...tempValue
        });
    }
    return (
        <div className='policy-config'>
            <div>
                <span onClick={() => changeValue('mode', '1')} className="mode-radio"><Radio checked={value.mode === '1'}></Radio>复制到规则原策略下</span></div>
            <div>
                <span onClick={() => changeValue('mode', '2')} className="mode-radio"><Radio checked={value.mode === '2'}></Radio>复制到该策略下</span>
                <span style={{ marginLeft: 48 }}>
                    路由策略：
                    <Select optionFilterProp='children' showSearch onChange={(val) => changeValue('policy', val)} placeholder='请选择' value={value.policy} style={{ width: 250, maxWidth: 400, display: 'inline-block' }}>
                        {policyList.map(policy => {
                            return <Select.Option value={policy.id} key={policy.id}>
                                {policy.name}
                            </Select.Option>
                        })}
                    </Select>
                </span>
            </div>
        </div>
    )
}
