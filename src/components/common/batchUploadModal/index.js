import React, {useState, useEffect} from 'react'
import {Modal, Alert, Button, message} from 'dpl-react';
import './index.scss'
import uploadFile from '@/utils/uploadFile'
import api from '@/request/api'
import {get} from '@/request/request'
import loading_gif from './Spinner-2.6s-200px.gif'
import downloadFile from '@/utils/downloadFile'
import {baseUrl} from "@/const/index";

const NULL = 'NULL'
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
const LOADING = 'LOADING'
const FAIL = 'FAIL'
let taskTimer = null
export default function BatchUploadModal(props) {
    const {visible, onCancel, onComplete, onGoMain} = props
    const [resultType, setResultType] = useState(NULL)
    const [successNum, setSuccessNum] = useState(0)
    const [errorNum, setErrorNum] = useState(0)
    const [taskId, setTaskId] = useState(null)
    const [isFileErr, setIsFileErr] = useState(false) // 是否文件异常
    useEffect(() => {
        setResultType(NULL)
    }, [visible])

    const SuccessDes = () => {
        return (
            <>
                <div>导入成功:{successNum}条</div>
                <div>(请前往
                    <span style={{color: '#3589d9', cursor: 'pointer'}}
                          onClick={() => {
                              onGoMain && onGoMain()
                          }}>"问答管理"</span>中查看成功发布的内容)
                </div>
            </>
        )
    }
    const WarningDes = () => {
        return (
            <>
                <div>
                    <p>导入成功：{successNum}条</p>
                    <p style={{color: '#ff794b'}}> 导入失败：{errorNum} 条(失败原因：格式不符，出现错误)</p>
                    <p>
                        （导入成功的内容已经正常发布，请前往
                        <span style={{color: '#3589d9', cursor: 'pointer'}}
                              onClick={() => {
                                  onGoMain && onGoMain()
                              }}
                        >"问答管理"</span>中查看修改，导入失败的内容已添加到“失败内容表格”中，请对表格内容进行修改，然后重新导入）
                    </p>
                    <a style={{color: '#3589d9'}} target='_blank'
                       href={`${baseUrl}common/file/download?type=2&bizId=${taskId}`}
                       download={`${baseUrl}common/file/download?type=2&bizId=${taskId}`} rel="noreferrer"> 下载失败内容（Excel表格）</a>
                    {isFileErr && <div style={{color: '#ff794b'}}>提醒：该文件存在风险，可能会对系统造成影响，请联系管理员处理；</div>}
                </div>

            </>
        )
    }
    const FailDex = () => {
        return (
            <div style={{color: '#ff794b'}}>
                导入失败：（失败原因：文件无法解析 导入失败）
            </div>
        )
    }
    const uploadExcel = async () => {
        let check = (files) => {
            const excelReg = /\.xlsx$/
            const name = files[0].name
            if (excelReg.test(name)) {
                if (files[0].size <= 20 * 1024 * 1024) {
                    setResultType(LOADING)
                    return true
                } else {
                    message.error('文件大小不能超过20M')
                    return false
                }
            } else {
                message.error('仅能导入.xlsx后缀的文件')
                return false
            }
        }
        const data = await uploadFile(api.importQuestion, check, '.xlsx')
        if (data.success) {
            setTaskId(data.data.importTaskId)
            watchTask(data.data.importTaskId)
        } else {
            setResultType(FAIL)
        }
    }
    const watchTask = (importTaskId) => {
        if (taskTimer) {
            clearInterval(taskTimer)
        }
        setResultType(LOADING)

        const checkTask = async () => {
            const data = await get({
                url: api.importResult,
                params: {
                    importTaskId
                }
            })
            if (data.success) {
                const status = parseInt(data.data.status)
                setSuccessNum(data.data.successNum)
                setErrorNum(data.data.failNum)
                if (status == 2) {
                    onComplete && onComplete()
                    clearInterval(taskTimer)
                    if (parseInt(data.data.failNum) === 0) {
                        setResultType(SUCCESS)
                    } else {
                        setResultType(ERROR)
                    }
                } else if (status == 3) {
                    onComplete && onComplete()
                    clearInterval(taskTimer)
                    setResultType(FAIL)
                }else if(status==4){
                    onComplete && onComplete()
                    clearInterval(taskTimer)
                    setResultType(ERROR)
                    setIsFileErr(true)
                }else if(status==0){
                    onComplete && onComplete()
                    clearInterval(taskTimer)
                    setResultType(FAIL)
                }
            } else {
                clearInterval(taskTimer)
                setResultType(FAIL)
            }
        }
        taskTimer = setInterval(checkTask, 2000)
    }
    const downloadTemplate = () => {
        downloadFile('common/file/download?type=1', true)
    }

    return (
        <Modal title='批量导入'
               visible={visible}
               onCancel={onCancel}
               footer={null}
               className={'batch-upload-modal'}
        >
            <div className='batch-upload-content'>
                {/* <Alert message="批量导入用户名统一为『系统管理员』，状态统一设置为已审核，请谨慎操作" type="warm" style={{marginBottom: '20px'}}
                       showIcon/> */}
                <Alert message="含有图片、附件以及P4操作的问答内容无法通过批量导入功能新增；" type="warm" style={{marginBottom: '20px'}}
                       showIcon/>
                <div className='button-box'>
                    <Button type='primary' style={{marginRight: 8}} onClick={uploadExcel}
                            disabled={resultType === LOADING}>批量导入</Button>
                    <Button icon={'download'} onClick={downloadTemplate}>下载批量导入模板</Button>
                </div>

                <div className='result-content'>
                    {resultType === SUCCESS &&
                    <Alert
                        message="操作结果:"
                        description={SuccessDes()}
                        type="success"
                        showIcon
                    />
                    }

                    {resultType === ERROR &&
                    <Alert
                        message="操作结果:"
                        description={WarningDes()}
                        type="warning"
                        showIcon
                    />
                    }

                    {resultType === FAIL &&
                    <Alert
                        message="操作结果:"
                        description={FailDex()}
                        type="error"
                        showIcon
                    />
                    }

                    {resultType === LOADING &&
                    <div className='task-loading'>
                        <div className='icon-box'>
                            <img src={loading_gif} alt=''/>
                        </div>
                        <div className='des'>
                            <div>导入中，请稍后...</div>
                            <p>请勿离开当前页面</p>
                        </div>
                    </div>

                    }
                </div>
            </div>
        </Modal>
    )
}
