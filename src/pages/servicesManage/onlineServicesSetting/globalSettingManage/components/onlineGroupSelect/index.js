import ModalSelect from '@/components/common/modalSelect';
import { acceptanceChannelCode } from '@/const/config';
import { Button, InputNumber, Modal, Select, Table } from 'dpl-react';
import React, { useMemo } from 'react'
import './index.scss';



export default function OnlineGroupSelect(props) {
    const { onChange, value = [], callGroupList = [], groupMap = {}, companyList = [], orgList = [] } = props;

    const groupIdList = useMemo(() => {
        return value?.map(val => (val.id))
    }, [value])

    const modalSelectChange = (ids, data) => {
        console.log(data, 'data 3');
        onChange?.(data?.map(item => {
            const oldItem = value?.find(val => val.id === item.id) || {
                id: item.id,
                name: item.name,
            };
            return oldItem;
        }));
    };
    console.log(value, 'value');
    // const deleteAllAction = () => {
    //     Modal.confirm({
    //         title: '请确认是否清空电话组列表?',
    //         onOk() {
    //             onChange?.([]);
    //         }
    //     })
    // }

    return (
        <div className='online-group-select'>
            <div className='head-tools'>
                <ModalSelect
                    className="call-group-select"
                    modalClassName="filter-flex-row-box"
                    value={groupIdList}
                    groupType={acceptanceChannelCode.online}
                    showCompanyDepartFilter
                    companyList={companyList}
                    orgList={orgList}
                    list={callGroupList}
                    listMap={groupMap}
                    isShowModalClear
                    showType="buttonBox"
                    boxDesc="开启范围：受理组为以下在线技能组，且有智库推荐权限的在线坐席"
                    selectBtnText="选择在线组"
                    onChange={modalSelectChange}
                    isNeedStringToNumber={true}
                    keywordDesc="组名称："
                    showConsultBusinessType
                    showProductCategory
                    modalWidth={800}
                />
                {/* <Button className='clear-btn' onClick={deleteAllAction}>清空</Button> */}
            </div>
            <div className='content-list'>

            </div>
        </div>
    )
}
