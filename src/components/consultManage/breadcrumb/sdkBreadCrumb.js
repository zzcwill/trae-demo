import creator from './creator'

export default creator({
    indexMap: [
        {
            url: '/consultManage/sdkManage/channelManage',
            name: '渠道管理',
        },
        {
            url: '/consultManage/sdkManage/productManage',
            name: '产品管理',
        },
        {
            url: '/consultManage/sdkManage/moduleManage',
            name: '模块管理',
        },
        {
            url: '/consultManage/sdkManage/buttonManage',
            name: '按钮管理',
        },
    ],
    key: '__sdk_breadcrumb'
})