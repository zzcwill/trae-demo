const marked = require('marked')

function tableParser(src) {
    let tableToken = marked.lexer(src).filter(item => item.type === 'table')
    if (!tableToken || tableToken.length === 0) {
        throw new Error('表格区块格式不正确，请检查：\n' + src)
    }
    tableToken = tableToken[0]
    let {header, cells} = tableToken
    cells = Array.isArray(cells) ? cells[0] : []
    let result = []
    header.forEach((item, index) => {
        item = item.replace(/\s/g, '')
        let obj = {}
        if (item === '$rowSelect') {
            obj.type = 'rowSelect'
        } else if (item === '$operate') {
            obj.type = 'operate'
        } else {
            obj.type = 'normal'
        }
        obj.label = item
        if (!cells[index]) {
            throw new Error(`表头：<${item}>对应的cell为空，请检查`)
        }
        obj.key = cells[index]
        result.push(obj)
    })
    return {
        type: 'table',
        table: result
    }
}

module.exports = tableParser