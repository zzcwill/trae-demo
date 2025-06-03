const tableParser = require('./table.js')
const queryFormParser = require('./form.js')
const operateBtnParser=require('./operateBtn')
const blockHandlerMap = [
    {
        reg: /:::\s?table\s?([^]+?):::/,
        handler: tableParser,
        type: 'table'
    },
    {
        reg: /:::\s?queryForm\s?([^]+?):::/,
        handler: queryFormParser,
        type: 'queryForm'
    },
    {
        reg: /:::\s?operateBtn\s?([^]+?):::/,
        handler: operateBtnParser,
        type: 'operateBtn'
    },
    {  reg: /:::\s?addForm\s?([^]+?):::/,
        handler: queryFormParser,
        type:'addForm'
    }
]

function parser(src) {
    const tokens = []
    const blockReg = /:::[^:::]*:::/g //提取区块
    const blockArr = src.match(blockReg) || []
    while (blockArr.length > 0) {
        for (let i = 0; i < blockHandlerMap.length; i++) {
            let handler = blockHandlerMap[i]
            let block = blockArr[0]
            if (handler.reg.test(block)) {
                const src = block.match(handler.reg) //提取字符串
                let token = handler.handler(src[1])
                token.type = handler.type
                tokens.push(token)
                blockArr.splice(0, 1)
                break
            }
            if (i === blockHandlerMap.length - 1) {
                throw new Error('该区块没有对应的处理器，请检查' + '\n' + block)
            }
        }
    }
    return tokens
}

module.exports = parser