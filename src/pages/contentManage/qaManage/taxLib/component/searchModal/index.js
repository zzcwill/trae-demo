import React from 'react'
import {Modal, Alert, Pagination} from 'dpl-react'
import './index.scss'
import {clearImage} from '@/utils/index'
import history from '@/history'
export default function SearchModal(props) {
    const {
        findData = {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            list: [],
        },
        onPageChang = () => {
        },
        onCancel = () => {
        },
        show = false
    } = props
    return (
        <Modal
            className='search-modal'
            title={'查询结果'}
            visible={show}
            onCancel={onCancel}
            footer={<Pagination total={findData.total}
                                pageSize={parseInt(findData.pageSize)}
                                current={parseInt(findData.pageIndex)}
                                showQuickJumper
                                onChange={onPageChang}
            />}

        >
            <div>
                <Alert
                    message="查询结果："
                    description={`共查询到结果：${findData.total}条`}
                    type="warning"
                    showIcon
                />
                <div className='list'>
                    {findData.list.map(item => {
                        return <div className='item' key={item.id}>
                            <div className='resume' dangerouslySetInnerHTML={{__html: item.resume}}
                                 onClick={()=>{
                                     let url = window.location.href.split('#')[0] + '#/contentDetail?id='+item.id
                                     window.open(url)

                                 }}></div>
                            <div className='description' dangerouslySetInnerHTML={{__html: item.description}}></div>
                            {item.replyInfo && <div className='reply' dangerouslySetInnerHTML={{__html: clearImage(item.replyInfo.reply)}}></div>}
                        </div>
                    })}
                </div>
            </div>
        </Modal>
    )
}