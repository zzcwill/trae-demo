const formRender = require('./form')

function queryFormRender(token) {
    const formRenderResult = formRender(token)
    let formRenderStr = formRenderResult.render[0]
    formRenderStr = `<SchemaForm {...form} inline className="query-form-by-render">\n` + formRenderStr
    formRenderStr += `    <FormButtonGroup>
      <Submit style={{marginRight:10}}>查询</Submit>
      <Reset>清空条件</Reset>
    </FormButtonGroup>
</SchemaForm>    
`
    formRenderResult.methods.push(`const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const data = await get({
            url: Api.routePolicyList,
            params: {
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
    }`)
    formRenderResult.methods.push(`const {form, table} = useFormTableQuery(service, {
        pagination: {
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true
        }
    }, [queryParamsMiddleware])`)
    formRenderResult.const.push(`const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm`)
    formRenderResult.state.push(` const [dispatchAndNoChangeParams, queryParamsMiddleware] = useFormQueryNoChangeParams()`)
    formRenderResult.import.push({
        from: 'dora',
        member: ['uForm'],
    })
    formRenderResult.import.push({
        from: 'react',
        member: ['useState'],
        master: 'React'
    })
    formRenderResult.import.push({
        from: '@/request/request',
        member: ['get', 'post'],
    })
    formRenderResult.import.push({
        from: '@/request/api-olhelpmanage',
        master:'Api'
    })
    formRenderResult.import.push({
        from: '@/hooks/useFormQueryNoChangeParams',
        master: 'useFormQueryNoChangeParams'
    })
    formRenderResult.render=[formRenderStr]
    return formRenderResult
}

module.exports = queryFormRender