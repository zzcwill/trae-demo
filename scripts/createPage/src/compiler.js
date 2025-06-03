const marked = require('marked')
const path = require('path')
const cwd = process.cwd()
const fs = require('fs-extra')
const parser = require('./parser/index')
const render = require('./render/index')
let md = fs.readFileSync(path.resolve(__dirname, '../../../src/pageConfigMD/testLinkCreate.md'), 'utf8')

function compiler(src) {

    const tokens = parser(src)
    const result = render(tokens)
    return result
}

compiler(md)

module.exports = compiler

