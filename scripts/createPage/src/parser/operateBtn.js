function operateBtnParse(src) {
    const source = src.replace(/\s/g, '')
    if (!source) {
        throw new Error('有区块内容为空，请检查')
    }
    const sourceArr = source.split(';').filter(item => item)
    let result = []
    sourceArr.forEach(item => {
        result.push({
            type: 'normal',
            text: item
        })
    })
    return {
        type: 'operateBtn',
        components: result
    }
}

module.exports = operateBtnParse