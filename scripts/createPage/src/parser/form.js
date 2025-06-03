const {componentMap, hasOptionsComponent} = require('../const')

function formParser(src) {
    if (!src) {
        throw new Error('有区块内容为空，请检查')
    }
    let source = src.replace(/\s/g, '')
    let sourceArr = source.split(';').filter(item => item)
    const checkResult = check(sourceArr)
    const token = genToken(checkResult)
    return token
}


function check(arr) {//检测并提取字符串
    let result = []
    let checkRef = /([^-]*)-([^-]*)-(.*)/
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (!checkRef.test(item)) {
            throw new Error('\n该条配置有误：' + '\n' + item)
        }
        const [, label, key, componentStr] = item.match(checkRef)
        const componentRef = /([^\(\)\[\]]*)/
        const optionsRef = /\(.*\)/
        const propsRef = /(\[.*\])/
        const [component] = componentStr.match(componentRef)
        let options = componentStr.match(optionsRef)
        let props = componentStr.match(propsRef)
        options = options ? options[0] : null
        props = props ? props[0] : null
        if (!componentMap[component]) {
            throw new Error('\n该组件不支持，请检查：' + component)
        }
        optionsCheck(options)
        optionsCheck(props)
        result.push({
            label,
            key,
            component,
            options,
            props
        })
    }
    return result
}

function optionsCheck(str) {
    if (!str) return
    const arr = str.split(',')
    arr.forEach(item => {
        const reg = /[^-]*-[^-]*/
        if (!reg.test(item)) {
            throw new Error('\n选项配置有误，请检查：' + str)
        }
    })
}

function genToken(checkResult = []) {
    const result = {
        components: []
    }
    checkResult.forEach(item => {
        const options = []
        let props = {}
        let optionsFromApi = false
        item.options = item.options ? item.options.replace(/[\(\)]/g, '') : ''
        item.props = item.props ? item.props.replace(/[\[\]]/g, '') : ''
        const optionsArr = item.options ? item.options.split(',') : []
        const propsArr = item.props ? item.props.split(',') : []
        optionsArr.forEach(optionsItem => {
            let [label, value] = optionsItem.split('-')
            options.push({label, value})
        })
        propsArr.forEach(propsItem => {
            let [key, value] = propsItem.split('-')
            props[key] = value
        })
        if (!item.options && hasOptionsComponent.indexOf(item.component) >= 0) {//需要数据的组件没有配置options
            optionsFromApi = true
        }
        if (componentMap[item.component].defaultProps) {
            props = Object.assign(componentMap[item.component].defaultProps,props )
        }
        result.components.push({
            type: item.component,
            label: item.label,
            key: item.key,
            options,
            props:{...props},
            optionsFromApi
        })
    })
    return result
}

module.exports = formParser