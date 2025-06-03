/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-03-21 11:10:17
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-26 19:05:23
 * @FilePath: /askone-manage-pc/src/pages/servicesManage/onlineServicesSetting/globalSettingManage/index.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import React from "react";
import './index.scss'
import {Tabs} from 'dpl-react'
import ManMachine from './components/manMachineGlobal'
import ManMachineRoute
    from "@/pages/servicesManage/onlineServicesSetting/globalSettingManage/components/manMachineRoute";
import WindowPage from './components/windwoPage/index'
import FeedBack from './components/feedback'
import ChatTip from './components/chatTip'
// import WarnningSetting from './components/warnningSetting'
const TabPane = Tabs.TabPane
export default function GlobalConfig(props) {
    return <div className='global-config'>
        <Tabs defaultActiveKey="1">
            <TabPane tab="人机协作（全局）" key="1"><ManMachine/></TabPane>
            <TabPane tab="人机协作（路由）" key="2"><ManMachineRoute/></TabPane>
            <TabPane tab="窗口界面" key="3"><WindowPage/></TabPane>
            <TabPane tab="对话设置" key="4"><ChatTip/></TabPane>
            <TabPane tab="满意度设置" key="5"><FeedBack/></TabPane>
            {/* <TabPane tab="告警设置" key="6"><WarnningSetting/></TabPane> */}
        </Tabs>
    </div>
}


