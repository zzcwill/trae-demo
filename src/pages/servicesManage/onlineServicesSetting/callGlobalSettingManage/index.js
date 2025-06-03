/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-07-21 13:47:55
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-07-21 14:26:49
 * @FilePath: /askone-manage-pc/src/pages/servicesManage/onlineServicesSetting/callGlobalSettingManage/index.js
 * @Description:
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, {useState, useEffect} from 'react'
import './index.scss'
import { Tabs } from 'dpl-react'
import WarnningSetting from '../globalSettingManage/components/warnningSetting'

const TabPane = Tabs.TabPane


export default function CallGlobalSettingManage(props) {
    return (
        <div className='call-global-setting-manage'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="告警设置" key="1"><WarnningSetting groupType="1"/></TabPane>
            </Tabs>
        </div>
    )
}