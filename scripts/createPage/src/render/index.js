const path = require('path')
const fs = require('fs-extra')
const queryForm = require('./queryForm')
const tableRender = require('./table')
const operateBtnRender = require('./operateBtn')
const addFormRender = require('./addForm')
const renderMap = {
    queryForm: {render: queryForm, scss: fs.readFileSync(path.resolve(__dirname, './css/queryForm.scss'),'utf8')},
    table: {render: tableRender, scss: fs.readFileSync(path.resolve(__dirname, './css/table.scss'),'utf8')},
    operateBtn: {render: operateBtnRender, scss: fs.readFileSync(path.resolve(__dirname, './css/operateBtn.scss'),'utf8')},
    addForm: {render: addFormRender, scss: fs.readFileSync(path.resolve(__dirname, './css/addForm.scss'),'utf8')}
}


function render(tokens) {
    let renders = []
    let result = ''
    let scss = ''
    tokens.forEach(item => {
        if (renderMap[item.type]) {
            renders.push(renderMap[item.type].render(item))
            scss += renderMap[item.type].scss + '\n'
        } else {
            throw new Error('\n该类型区块没有对应渲染器:' + item.type)
        }
    })
    const renderResult = renders.reduce((result, item) => {
        const state = result.state.concat(item.state)
        const methods = result.methods.concat(item.methods)
        const render = result.render.concat(item.render)
        const _const = result.const.concat(item.const)
        const _import = result.import.concat(item.import)
        return {
            state, methods, render, import: _import, const: _const
        }
    }, {
        state: [],
        methods: [],
        render: [],
        const: [],
        import: []
    })
    result += renderImport(renderResult.import) + '\n'
    result += renderConst(renderResult.const) + '\n'
    result += renderFunction(renderResult)
    return {
        js: result,
        scss: scss
    }
}

function renderImport(importArr) {
    let result = ''
    const map = {}
    importArr.forEach(item => {
        if (!map[item.from]) {
            map[item.from] = {
                master: '',
                member: []
            }
        }
        const obj = map[item.from]
        obj.master = item.master
        if (item.member && item.member.length > 0) {
            obj.member = Array.from(new Set(obj.member.concat(item.member)))
        }
    })
    Object.keys(map).forEach(key => {
        if (!map[key].master && map[key].member.length === 0) return
        let item = `import `
        if (map[key].master) {
            item = item + map[key].master
            if (map[key].member.length > 0) {
                item += ' ,'
            }
        }
        if (map[key].member.length > 0) {
            item = item + `{${map[key].member.join(',')}} `
        }
        item = `${item} from '${key}'\n`
        result += item
    })
    return result
}

function renderConst(constArr) {
    let result = ''
    result = constArr.join('\n')
    return result
}

function renderFunction(renderResult) {
    let result = `export default function __functionName(props) {
    ${renderResult.state.join('\n')}\n
    ${renderResult.methods.join('\n')}\n
    
    return (
        <div className='__className'>
  ${renderResult.render.join('\n')}    
       </div>
    )
}`
    return result
}

module.exports = render