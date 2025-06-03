import React from 'react'
import './index.scss'
import { Tabs } from 'dpl-react'
import ConfigManage from './components/config-manage'
import YearPreview from './components/year-preview'
export default function FinancialTaxConfigManage() {
    return <div className='app-bg-box financial-tax-config-manage'>
        <Tabs>
            <Tabs.TabPane tab="主题设置" key={1}>
                <ConfigManage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="年度预览" key={2}>
                <YearPreview />
            </Tabs.TabPane>
        </Tabs>
    </div>
}