function operateBtnRender(token) {
    const result = {
        import: [],
        const: [],
        state: [],
        methods: [],
        render: []
    }
    result.import.push({
        from: 'dpl-react',
        member: ['Button']
    })
    const btnArr = token.components.map(item=>{
        return `<Button type='primary' className="operate-btn-item">${item.text}</Button>`
    })
    result.render.push(`<div className='operate-btn-by-render'>
            ${btnArr.join('\n')}
        </div>`)
    return result
}

module.exports = operateBtnRender