const {titleUpperCase} = require('../utils')
const optionsMap = {
    Select: 'dataSource',
    Cascader: 'options',
    CheckboxGroup: 'options',
    RadioGroup: 'options',
    TreeSelect: 'treeData'
}

function formRender(token) {
    const result = {
        state: [],
        methods: [],
        render: [],
        const: [],
        import:[]
    }
    let render = ''
    token.components.forEach(item => {
        render += `    <Field
        ${token.formItemLayout?'{...formItemLayout}':''}
        name='${item.key}'
        title='${item.label}'
        x-component='${item.type}'
`
        if (item.optionsFromApi) {
            result.state.push(`const [${item.key}Options,set${titleUpperCase(item.key)}Options] = useState([])`)
            item.props[optionsMap[item.type]] = `${item.key}Options`
        } else {
            if (optionsMap[item.type]) {
                item.props[optionsMap[item.type]] = item.options
            }
        }

        render += `        x-component-props={${JSON.stringify(item.props)}}`
        render += '/>\n'
        if (item.optionsFromApi) {//去掉引号
            render = render.replace(`"${item.key}Options"`, `${item.key}Options`)
        }
    })
    result.render.push(render)
    return result
}

module.exports = formRender