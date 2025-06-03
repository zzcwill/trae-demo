/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2021-12-03 16:35:21
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-06-07 11:13:42
 * @FilePath: /askone-manage-pc/scripts/createPage/templateOld/listPage/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React from 'react'
import './index.scss'
import {uForm} from 'dora'
import {Table} from 'dpl-react'
import {post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm
export default function __functionName(props) {
    const columns = [
        {
            title: "account",
            dataIndex: "account",
            ellipsis: true,
            align: "center",
        },
        {
            title: "name",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
        }
    ]
    const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const data = await post({
            url: Api.expertInstitutionList,
            data: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values
            }
        })
        return {
            dataSource: data.data.list,
            pageSize: data.data.pageSize,
            total: data.data.total,
            current: data.data.pageIndex
        }
    }
    const {form, table} = useFormTableQuery(service, {pagination: {pageSize: 10}})
    return <div className='__className'>
        <SchemaForm {...form} inline className='form-wrap'>
            <Field type='string'
                   title='test1'
                   name='test1'
                   x-component='Input'
                   x-component-props={{placeholder: '请输入'}}/>
            <FormButtonGroup>
                <Submit style={{marginRight: 10}}/>
                <Reset/>
            </FormButtonGroup>
        </SchemaForm>
        <Table className='table-wrap' {...table} columns={columns}/>
    </div>
}