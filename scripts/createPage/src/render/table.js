function tableRender(tokens) {
    const result = {
        state: [],
        import: [],
        const: [],
        render: [],
        methods: []
    }
    result.import.push({from: 'dpl-react', member: ['Table']})
    const canSelect = columnsRender(tokens.table, result)
    renderTable(result,canSelect)
    return result
}

function columnsRender(table, result) {
    let columns = []
    let canSelect = false
    table.forEach(item => {
        if (item.type === 'rowSelect') {
            canSelect = true
        } else if (item.type === 'operate') {
            const operate = []
            item.key.split(',').forEach(key => {
                if (key === '$delete') {
                    result.methods.push(` const deleteHandler = (id) => {
        Modal.confirm({
            title: '提示',
            content: '是否确定删除该记录',
            onOk: async () => {
                const data = await post({url: Api.routePolicyDelete, data: {id}})
                if (data.success) {
                    dispatchAndNoChangeParams()
                    message.success('删除成功')
                } else {
                    message.error(data.message)
                }
            }
        })
    }`)
                    result.import.push({from: 'dpl-react', member: ['Modal', 'message']})
                    result.import.push({
                        from: '@/request/request',
                        member: ['get', 'post'],
                    })
                    result.import.push({
                        from: '@/request/api-olhelpmanage',
                        master: 'Api'
                    })
                    operate.push(`<span onClick={() => {
                        deleteHandler(record.id)
                    }}>删除</span>`)
                } else {
                    operate.push(`<span >${key}</span>`)
                }
            })
            columns.push({
                title: "操作",
                dataIndex: "operate",
                ellipsis: true,
                align: "center",
                render: `function (text, record) {
                    return <div className='operator'>
    ${operate.join('\n')}
                    </div>
                }`
            })
        } else if (item.type === 'normal') {
            columns.push({
                title: item.label,
                dataIndex: item.key,
                ellipsis: true,
                align: "center",
            })
        }
    })

    let columnsStr = `[
      ${columns.map(item => JSON.stringify(item)).join(',\n')}
    ]`
    columnsStr = columnsStr.replace(/"render":"(function.*)"/, 'render:$1')
    columnsStr=columnsStr.replace(/\\n/g,'\n')
    result.state.push(`const columns = ${columnsStr}`)
    return canSelect
}

function renderTable(result, canSelect) {
  let tableStr=`<Table className='table-wrap-by-render'
               {...table}
               columns={columns}
               rowKey={'id'}
              `
    if(canSelect){
        result.state.push(`const [selectedRowKeys, setSelectedRowKeys] = useState([])`)
        tableStr+=` rowSelection={{
                   selectedRowKeys: selectedRowKeys,
                   onChange(selectedRowKeys) {
                       setSelectedRowKeys(selectedRowKeys)
                   }
               }}/>`
    }else{
        tableStr+=`/>`
    }
    result.render.push(tableStr)
}


module.exports = tableRender
