const formRender = require('./form')

function addFormRender(token) {
    token.formItemLayout = true
    const formRenderResult = formRender(token)
    let renderStr = formRenderResult.render[0]
    formRenderResult.const.push(`const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 15},
}`)
    formRenderResult.const.push('const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions} = uForm')
    formRenderResult.const.push('const actions = createFormActions()')
    formRenderResult.import.push({
        from: 'react',
        master: 'React',
        member: ['useState', 'useEffect']
    })
    formRenderResult.import.push({
        from: 'dora',
        member: ['uForm']
    })
    formRenderResult.import.push({
        from: 'dpl-react',
        member: ['Button', 'message']
    })
    formRenderResult.import.push({
        from: '@/request/request',
        member: ['get', 'post'],
    })
    formRenderResult.import.push({
        from: '@/request/api-olhelpmanage',
        master: 'Api'
    })
    formRenderResult.import.push({
        from: 'qs',
        master: 'qs'
    })
    formRenderResult.import.push({from:'@/history',master:'history'})
    formRenderResult.state.push(`const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.id
    })`)
    formRenderResult.state.push(`const [detail, setDetail] = useState({})`)
    formRenderResult.methods.push(`const getDetail = async (id) => {
        const data = await get({url: Api.routePolicyDetail, params: {id}})
        if (data.success) {
            setDetail(data.data)
        }
    }`)
    formRenderResult.methods.push(`const confirmHandler = () => {
        actions.submit().then(async value => {
            let data = null
            let params = {
                channelList: value.values.channelList,
                remark: value.values.remark,
                name: value.values.name
            }
            if (id) {
                data = await post({url: Api.routePolicyUpdate, data: {...params, id}})
            } else {
                data = await post({url: Api.routePolicySave, data: {...params}})
            }
            if (!data) return
            if (data.success) {
                message.success(id ? '修改成功' : '新增成功')
                history.push('/routerManage/routerStrategy')
            } else {
                message.error(data.message)
            }
        })
    }`)
    formRenderResult.methods.push(`const cancelHandler = () => {
        history.push('/routerManage/routerStrategy')
    }`)
    formRenderResult.methods.push(` useEffect(() => {
        if (id) {
            getDetail(id)
        }
    }, [id])`)
    renderStr=`<div className='add-form-by-render'>
    <SchemaForm actions={actions} initialValues={detail}>
      ${renderStr}
    </SchemaForm>
    <div className='btn-group'>
                <Button type='primary' onClick={confirmHandler}>保存</Button>
                <Button onClick={cancelHandler} style={{marginLeft: 10}}>取消</Button>
            </div>
</div>`
    formRenderResult.render=[renderStr]
    return formRenderResult
}

module.exports = addFormRender