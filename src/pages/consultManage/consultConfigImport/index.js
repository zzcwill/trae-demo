/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-10-23 18:05:08
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-10-23 18:51:17
 * @FilePath: /askone-manage-pc/src/pages/consultManage/consultConfigImport/index.js
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useState, useRef } from 'react'
import { Space, Button, message, Modal } from "dpl2-proxy"
import OlhelpManageApi from '@/requestApi/yypt-olhelp-manage/api'
import OlhelpManageConfig from '@/requestApi/yypt-olhelp-manage/config'
import downloadFile from '@/utils/downloadFile'
import uploadFile from '@/utils/uploadFile'

import './index.scss'

const IMPORT_HELP_TIPS = 'importHelpTips' // 导入沉侵式帮助
const IMPORT_EXCEPTION_TIPS = 'importExceptionTips' // 导入异常提示语
const importList = [{
    type: IMPORT_HELP_TIPS,
    title: '沉侵式帮助'
}, {
    type: IMPORT_EXCEPTION_TIPS,
    title: '异常提示语'
}]
export default function ConsultConfigImport(props) {
    const [importing, setImporting] = useState(false)
    const modalRef = useRef(null);

    const templateDownload = async (type) => {
        const func = type === IMPORT_HELP_TIPS ? OlhelpManageApi.getSelfserviceGetImportHelpTipsTemplateUrl : OlhelpManageApi.getSelfserviceGetImportExceptionTipsTemplateUrl;
        const res = await func();
        if(res.success && res.data) {
            downloadFile(res.data, false)
        } else {
            message.error(res.message);
        }
    }   

    const importClick = async (type) => {
        let check = (files) => {
            const excelReg = /\.xlsx?$/
            const name = files[0].name
            if (!excelReg.test(name)) {
                message.error('仅能导入.xlsx、.xls后缀的文件')
                return false
            }
            setImporting(true);
            return true;
        }
        const baseURL = OlhelpManageConfig.postSelfserviceImportHelpTips.baseURL;
        const apiUrl = type === IMPORT_HELP_TIPS ? OlhelpManageConfig.postSelfserviceImportHelpTips.url : OlhelpManageConfig.postSelfserviceImportExceptionTips.url;
        const res = await uploadFile(`${baseURL}/${apiUrl}`, check)
        setImporting(false);
        if (!res.success) {
            message.error(res.message);
        } else {
            const failMessageList = res?.data?.failMessageList || []
            if(failMessageList.length > 0) {
                modalRef.current = Modal.feedback({
                    title: <strong>导入失败原因</strong>,
                    className: "import-error-modal",
                    content: <div className='error-content' dangerouslySetInnerHTML={{ __html: failMessageList.join('<br/>') }}></div>,
                    // onOk: () => { modalRef.current.destroy() },
                    // onCancel: () => { modalRef.current.destroy() },
                    // okText: "知道了",
                    // cancelText: "取消",
                });
            } else {
                message.success('导入成功');
            }
        }
    }
	return (
		<div className="consult-config-import">
            {importList.map(item => <div className="import-item" style={{ marginBottom: 40 }}>
				<h2 className="title">导入{item.title}</h2>
                <div className="import-content">
                <Button disabled={importing} style={{ marginRight: 10 }} type='primary' onClick={() => importClick(item.type)}>导入</Button>
                <span className="link-btn" onClick={() => templateDownload(item.type)}>{item.title}模板下载</span>
                </div>
			</div>)}
		</div>
	)
}
