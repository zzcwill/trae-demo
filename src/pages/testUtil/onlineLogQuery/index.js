import React from 'react'
import './index.scss'
import {Tabs} from 'dpl-react'
import AccessLog from "./accessLog";
import RightsDeductLog from './components/rightsDeductLog';
const TabPane = Tabs.TabPane


export default function OnlineLogQuery(props) {
    return (
        <div className='online-log-query' >
            <Tabs defaultActiveKey={'access-log'}>
                <TabPane key='access-log' tab='接入日志'>
                    <AccessLog/>
                </TabPane>
                <TabPane key='rights-deduct-log' tab='权益扣减日志'>
                    <RightsDeductLog/>
                </TabPane>
            </Tabs>
        </div>
    )
}