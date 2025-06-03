import React from 'react'
import './index.scss'
import ExpertCard from "@/components/consultManage/expertCard";
import {Dropdown, Icon, Menu} from "dpl-react";

export default function ExpertExamineCard(props) {
    const {data, onMenuClick} = props
    const statusMap = {
        '0': {
            text: '未审核',
            color: '#FF8040'
        },
        '1': {
            text: '已审核',
            color: '#59CF15'
        },
        '2': {
            text: '审核不通过',
            color: '#FF4E45'
        },
    }
    const getColor = () => {
        let status = typeof data.status !== "undefined" ? data.status : '0'
        return statusMap[status] && statusMap[status].color
    }
    const getText = () => {
        let status = typeof data.status !== "undefined" ? data.status : '0'
        return statusMap[status] && statusMap[status].text
    }

    const menu = (
        <Menu onClick={(a) => {
            onMenuClick && onMenuClick(a.key)
        }}>
            <Menu.Item key='1'>通过</Menu.Item>
            <Menu.Item key='2'>不通过</Menu.Item>
        </Menu>
    );
    return <div className='expert-examine-card'>
        <ExpertCard data={data}/>
        <div className='btn-group'>
            <div className='status'>
                <span className='color' style={{backgroundColor: getColor()}}></span>
                <span className='text'>{getText()}</span>
            </div>
            <div className='examine-btn'>
                <Dropdown overlay={menu}>
                    <div className='btn'>修改审核状态<Icon type="caret-down"/></div>
                </Dropdown>
            </div>

        </div>
    </div>
}