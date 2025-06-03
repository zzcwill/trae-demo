const pageConfig = require('../../../src/pageConfig')
const path = require('path')
const cwd = process.cwd()
const targetPath = path.resolve(__dirname, '../../../src/pages')
const fs = require('fs-extra')
const compiler = require('./compiler')
const typeMap = {
    listPage: '../template/listPage',
    empty: '../template/empty',
    addPage: '../template/addPage',
    oldFormListPage: '../template/oldFormListPage',
    formListPage: '../template/formListPage',
}

function check(routeConfig) {
    let path = routeConfig.map(item => item.path)
    path = Array.from(new Set(path))
    if (path.length !== routeConfig.length) {
        console.log('存在重复url，请检查')
    }
}

function pageConfigToDir() {
    let result = []
    let routeConfig = []
    const walk = (arr, parent) => {
        arr.forEach(item => {
            const obj = {
                filePath: '',
                key: item.key,
                path: item.path,
                name: item.name,
                componentPath: '',
                type: item.type,
                md: item.md
            }
            if (parent) {
                if (!parent.path) { // 父级只是结构节点
                    obj.filePath = parent.filePath + '/' + item.key
                    obj.componentPath = item.path ? `${parent.filePath.substring(1)}/${item.key}/index.js` : ''
                } else { // 父级也是页面
                    obj.filePath = parent.filePath + '/children/' + item.key
                    obj.componentPath = item.path ? `${parent.filePath.substring(1)}/children/${item.key}/index.js` : ''
                }
            } else {
                obj.filePath = './' + item.key
                obj.componentPath = item.path ? `/${item.key}/index.js` : ``
            }
            result.push(obj)
            if (item.path) {
                routeConfig.push({
                    path: item.path,
                    componentPath: obj.componentPath,
                    name: item.name,
                    type: item.type,
                })
            }
            Array.isArray(item.children) && walk(item.children, obj)
        })
    }
    walk(Object.keys(pageConfig).map((key) => pageConfig[key]))
    return {filePath: result, routeConfig}
}

function titleUpperCase(text) { // 首字母大写
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function hyphenate(str) { //驼峰转中划线
    const hyphenateRE = /\B([A-Z])/g;
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}

function creatFile(dir, route) {
    const jsFile = path.resolve(dir, './index.js')
    const cssFile = path.resolve(dir, './index.scss')
    const schemaFile = path.resolve(dir, './schema.js')
    const {type = 'empty', key} = route
    if (route.md) {
        createFileByMd(dir, route)
        return
    }
    const templatePath = typeMap[type] ? typeMap[type] : typeMap['empty']
    if (!fs.pathExistsSync(jsFile)) {
        let jsTemplate = fs.readFileSync(path.resolve(__dirname, templatePath + '/index.js'), 'utf8')
        jsTemplate = jsTemplate.replace(/__functionName/g, titleUpperCase(key)).replace(/__className/g, hyphenate(key))
        fs.outputFileSync(jsFile, jsTemplate)
    }
    if (!fs.pathExistsSync(cssFile)) {
        let cssTemplate = fs.readFileSync(path.resolve(__dirname, templatePath + '/index.scss'), 'utf8')
        cssTemplate = cssTemplate.replace(/__className/g, hyphenate(key))
        fs.outputFileSync(cssFile, cssTemplate)
    }

    if (!fs.pathExistsSync(schemaFile) && type === 'oldFormListPage') { // 假如是带表单的
        let schemaTemplate = fs.readFileSync(path.resolve(__dirname, templatePath + '/schema.js'), 'utf8')
        fs.outputFileSync(schemaFile, schemaTemplate)
    }
}

function createFileByMd(dir, route) {
    const jsFile = path.resolve(dir, './index.js')
    const cssFile = path.resolve(dir, './index.scss')
    const compileResult = compiler(route.md)
    const {key} = route
    if (!fs.pathExistsSync(jsFile)) {
        let jsTemplate = compileResult.js
        jsTemplate=`import './index.scss'\n`+jsTemplate
        jsTemplate = jsTemplate.replace(/__functionName/g, titleUpperCase(key)).replace(/__className/g, hyphenate(key))
        fs.outputFileSync(jsFile, jsTemplate)
    }
    if (!fs.pathExistsSync(cssFile)) {
        let cssTemplate = compileResult.scss
        const wrapperStyle=`height:100%;overflow:auto;padding:20px;`
        cssTemplate = `.${hyphenate(key)}{\n${wrapperStyle}\n${cssTemplate}}`
        fs.outputFileSync(cssFile, cssTemplate)
    }
}

function createRouteConfig(routerConfig) {
    fs.outputFileSync(path.resolve(__dirname, '../../../src/router/routerConfig.js'), ` export default  ${JSON.stringify(routerConfig)}`)
}

function createPage() {
    const {filePath, routeConfig} = pageConfigToDir()
    check(routeConfig)
    createRouteConfig(routeConfig)
    filePath.forEach((item) => {
        const currentPath = path.resolve(targetPath, item.filePath)
        fs.ensureDirSync(currentPath)
        if (item.path) { // 当前是页面
            creatFile(currentPath, item)
        }
    })
}

createPage()
