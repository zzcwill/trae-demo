const path = require('path')
const fs = require('fs-extra');
const {dirname} = require('path');
const pageConfig = {
    contentManage: {
        name: "内容管理",
        key: "contentManage",
        children: [
            {
                name: "内容首页",
                key: "main",
                path: "/contentManage/main",
            },
            {
                name: "内容管理—信息收集",
                key: "informationCollection",
                children: [
                    {
                        name: "问答纠错",
                        key: "qaCorrect",
                        path: "/contentManage/informationCollection/qaCorrect",
                    },
                    {
                        name: "问题新增",
                        key: "questionAdd",
                        path: "/contentManage/informationCollection/questionAdd",
                    },
                ],
            },
            {
                name: "内容管理—问答管理",
                key: "qaManage",
                children: [
                    {
                        name: "财税问答库",
                        key: "taxLib",
                        path: "/contentManage/qaManage/taxLib", // 已经下线了
                        children: [
                            {
                                name: "问答详情",
                                key: "qaDetail",
                                path: "/contentManage/qaManage/taxLib/qaDetail",
                            },
                            {
                                name: "新增问答",
                                key: "qaAdd",
                                path: "/contentManage/qaManage/taxLib/qaAdd",
                            },
                        ],
                    },
                ],
            },
            {
                name: "内容管理-问答审核",
                key: "qaExamine",
                children: [
                    {
                        name: "财税问答库",
                        key: "taxLib",
                        path: "/contentManage/qaExamine/taxLib",
                    },
                ],
            },
            {
                name: "内容管理-课程、目录",
                key: "classifyAndCourse",
                children: [
                    {
                        name: "目录管理",
                        key: "classifyManage",
                        path: "/contentManage/classifyAndCourse/classifyManage",
                    },
                    {
                        name: "课程管理",
                        key: "courseManage",
                        path: "/contentManage/classifyAndCourse/courseManage",
                    },
                ],
            },
            {
                name: "猜您想问管理",
                key: "relatedQuestionManage",
                path: "/contentManage/relatedQuestionManage",
            },
        ],
    },
    employeeManage: {
        name: "人员管理",
        key: "employeeManage",
        children: [
            {
                name: "资源池管理",
                key: "resourcePool",
                path: "/employeeManage/resourcePool",
                children: [
                    {
                        name: "addResourcePool",
                        key: "addResourcePool",
                        path: "/employeeManage/resourcePool/modify",
                    },
                ],
            },
            {
                name: "坐席管理",
                key: "agentManage",
                path: "/employeeManage/agentManage",
                children: [
                    {
                        name: "修改坐席",
                        key: "agentEdit",
                        path: "/employeeManage/agentManage/edit",
                    },
                ],
            },
            {
                name: "组管理",
                key: "groupManage",
                children: [
                    {
                        name: "电话组管理",
                        key: "callManage",
                        path: "/employeeManage/groupManage/callManage",
                        children: [
                            {
                                name: "电话组编辑",
                                key: "callManageEdit",
                                path: "/employeeManage/groupManage/callManage/edit",
                            },
                        ],
                    },
                    {
                        name: "在线组管理",
                        key: "onlineManage",
                        path: "/employeeManage/groupManage/onlineManage",
                        children: [
                            {
                                name: "在线组编辑",
                                key: "onlineManageEdit",
                                path: "/employeeManage/groupManage/onlineManage/edit",
                            },
                        ],
                    },
                ],
            },
            {
                name: "分机管理",
                key: "extensionManage",
                path: "/employeeManage/extensionManage",
            },
            {
                name: "专家管理",
                key: "expertManage",
                path: "/employeeManage/expertManage",
                children: [
                    {
                        name: "专家详情",
                        key: "expertDetail",
                        path: "/employeeManage/expertManage/detail",
                    },
                ],
            },
            {
                name: '工作时间管理',
                key: 'workTimeManage',
                path: '/employeeManage/workTimeManage',
                type: 'listPage'
            },
            {
                name: '特殊日管理',
                key: 'specialDayManage',
                path: '/employeeManage/specialDayManage',
                type: 'listPage'
            },
        ],
    },
    telephonyManage: {
        name: "电话管理",
        key: "telephonyManage",
        children: [
            {
                name: "邮件模板配置",
                key: "emailTemplateManage",
                path: "/telephonyManage/emailTemplateManage",
            },
            {
                name: "咨询事项",
                key: "consultMatterManage",
                children: [
                    {
                        name: "咨询事项配置",
                        key: "consultMatterSetting",
                        path:
                            "/telephonyManage/consultMatterManage/consultMatterSetting",
                    },
                    {
                        name: "个人咨询事项配置",
                        key: "personalConsultMatterSetting",
                        path:
                            "/telephonyManage/consultMatterManage/personalConsultMatterSetting",
                    },
                ],
            },
            {
                name: "内部资料",
                key: "internalDataManage",
                path: "/telephonyManage/internalDataManage",
            },
            {
                name: "黑名单维护",
                key: "blacklistManage",
                path: "/telephonyManage/blacklistManage",
            },
        ],
    },
    channelManage: {
        name: "渠道管理",
        key: "channelManage",
        children: [
            {
                name: "渠道入口管理",
                key: "channelEnterManage",
                path: "/channelManage/channelEnterManage",
            },
        ],
    },
    servicesManage: {
        name: "服务管理",
        key: "servicesManage",
        children: [
            {
                name: "告警设置",
                key: "warnningConfig",
                path: "/servicesManage/warnningConfig",
                children: [
                    {
                        name: '告警设置配置',
                        key: 'warnningConfigModify',
                        path: "/servicesManage/warnningConfig/modify",
                    },
                ]
            },
            {
                name: "在线设置",
                key: "onlineServicesSetting",
                children: [
                    {
                        name: "全局系统设置",
                        key: "globalSettingManage",
                        path: "/servicesManage/onlineServicesSetting/globalSettingManage",
                    },
                    {
                        name: "来电全局系统设置",
                        key: "callGlobalSettingManage",
                        type: 'addPage',
                        path: "/servicesManage/onlineServicesSetting/callGlobalSettingManage",
                    },
                    {
                        name: "智能助理参数配置",
                        key: "robotAssistantManage",
                        path:
                            "/servicesManage/onlineServicesSetting/robotAssistantManage",
                    },
                    {
                        name: "机转人参数设置",
                        key: "robotToEmployeeManage",
                        path:
                            "/servicesManage/onlineServicesSetting/robotToEmployeeManage",
                    },
                    {
                        name: "黑名单",
                        key: "blacklistManage",
                        path:
                            "/servicesManage/onlineServicesSetting/blacklistManage",
                        type: 'listPage'
                    },
                    {
                        name: "特殊地区管理",
                        key: "specialArea",
                        path: "/servicesManage/onlineServicesSetting/specialArea",
                        md: fs.readFileSync(path.resolve(__dirname, './pageConfigMd/specialArea.md'), 'utf-8')
                    },
                    {
                        name: "访客路由VIP优先级设置",
                        key: "routerVipSetting",
                        path: "/servicesManage/onlineServicesSetting/routerVIPSetting",
                        md: fs.readFileSync(path.resolve(__dirname, './pageConfigMd/routerVipSetting.md'), 'utf-8')
                    },
                    {
                        name: "会员等级设置",
                        key: "vipLevelManage",
                        path: "/servicesManage/onlineServicesSetting/vipLevelManage",
                    },
                    {
                        name: "业务类型管理",
                        key: "businessTypeManage",
                        path: "/servicesManage/onlineServicesSetting/businessTypeManage",
                    },
                    {
                        name: "坐席辅助配置",
                        key: "agentAuxiliaryConfig",
                        path: "/servicesManage/onlineServicesSetting/agentAuxiliaryConfig",
                        type: 'empty',
                    },
                    {
                        name: "咨询任务规则",
                        key: "createTodoRule",
                        path: "/servicesManage/onlineServicesSetting/createTodoRule",
                        type: 'formListPage',
                        children: [{
                            name: '新增咨询任务规则',
                            key: 'addTodoRule',
                            path: '/servicesManage/onlineServicesSetting/createTodoRule/addTodoRule',
                            type: 'addFormPage'
                        }]
                    },
                    {
                        name: "回电补录",
                        key: "createCallBackTodo",
                        path: "/servicesManage/onlineServicesSetting/createCallBackTodo",
                        type: 'empty',
                    },
                ],
            },
            {
                name: "宣传图管理",
                key: "bannerManage",
                path: "/servicesManage/bannerManage",
            },
            {
                name: "运营动作管理",
                key: "operationManage",
                path: "/servicesManage/operationManage",
            },
        ],
    },
    dataManage: {
        name: "数据管理",
        key: "dataManage",
        children: [
            {
                name: "实时监控",
                key: "realTimeMonitoring",
                children: [
                    {
                        name: "电话组资源监控",
                        key: "callGroupMonitor",
                        path: "/dataManage/realTimeMonitoring/callGroupMonitor",
                    },
                    {
                        name: "在线组资源监控",
                        key: "onlineGroupMonitor",
                        path: "/dataManage/realTimeMonitoring/onlineGroupMonitor",
                    },
                    {
                        name: "电话坐席监控",
                        key: "callAgentMonitor",
                        path: "/dataManage/realTimeMonitoring/callAgentMonitor",
                    },
                    {
                        name: "机器人满意度实时监控",
                        key: "robotSatisfactionMonitor",
                        path: "/dataManage/realTimeMonitoring/robotSatisfactionMonitor",
                    },
                    {
                        name: "错误提示答案未识别数据检测",
                        key: "robotNoAnswerMonitor",
                        type: 'listPage',
                        path: "/dataManage/realTimeMonitoring/robotNoAnswerMonitor",
                    },
                    {
                        name: "当天未匹配异常看板",
                        key: "unmatchabNomalList",
                        type: 'listPage',
                        path: "/dataManage/realTimeMonitoring/unmatchabNomalList",
                    },
                    {
                        name: "咨询记录列表",
                        key: "consultRecordList",
                        type: 'formListPage',
                        path: "/dataManage/realTimeMonitoring/consultRecordList",
                    },
                ],
            },
            {
                name: "数据查询",
                key: "dataQueryManage",
                children: [
                    {
                        name: "机器人记录查询",
                        key: "robotLogQueryManage",
                        path: "/dataManage/dataQueryManage/robotLogQueryManage",
                    },
                    {
                        name: "排队放弃日志查询",
                        key: "cancelWaitQueryManage",
                        path: "/dataManage/dataQueryManage/cancelWaitQueryManage",
                    },
                ],
            },
        ],
    },
    consultManage: {
        name: '咨询前台管理',
        key: 'consultManage',
        children: [
            {
                name: '专家池管理',
                key: 'expertPool',
                path: "/consultManage/expertPool",
            },
            {
                name: '专家分类管理',
                key: 'expertCategory',
                path: "/consultManage/expertCategory",
            },
            {
                name: '专家&机构管理',
                key: 'expertManage',
                path: "/consultManage/expertManage",
                children: [
                    {
                        name: '专家&机构管理详情页',
                        key: 'expertDetail',
                        path: "/consultManage/expertManage/expertDetail",
                    },
                    {
                        name: '专家&机构管理新增页',
                        key: 'expertAdd',
                        path: "/consultManage/expertManage/expertAdd",
                    },
                ]
            },
            {
                name: '专家审核',
                key: 'expertExamine',
                path: "/consultManage/expertExamine",
            },
            {
                name: '官方服务管理',
                key: 'officialServiceManage',
                path: "/consultManage/officialServiceManage",
            },
            // {
            //     name: '首页配置',
            //     key: 'homePageConfig',
            //     path: "/consultManage/homePageConfig",
            // },
            // {
            //     name: '分类页配置',
            //     key: 'categoryPageConfig',
            //     path: "/consultManage/categoryPageConfig",
            // },
            {
                name: '渠道页配置',
                key: 'landingPageConfig',
                path: "/consultManage/landingPageConfig",
                children: [
                    {
                        name: '渠道页配置详情页',
                        key: 'landingPageDetail',
                        path: "/consultManage/landingPageConfig/detail",
                    },
                    {
                        name: '渠道页配置编辑页',
                        key: 'landingPageEdit',
                        path: "/consultManage/landingPageConfig/edit",
                    },
                ]
            },
            {
                name: '优先级管理',
                key: 'firstManage',
                path: '/consultManage/firstManage',
                type: 'listPage'
            },
            {
                name: 'Web端管理',
                key: 'webManage',
                children: [
                    {
                        name: '专项咨询管理',
                        key: 'specialConsultManage',
                        path: "/consultManage/webManage/specialConsultManage",
                        children: [
                            {
                                name: '优先级管理',
                                key: 'edit',
                                path: '/consultManage/webManage/specialConsultManage/edit',
                            },
                        ]
                    },
                ]
            },
            {
                name: 'sdk管理',
                key: 'sdkManage',
                children: [
                    {
                        name: '渠道列表',
                        key: 'channelManage',
                        path: '/consultManage/sdkManage/channelManage',
                        type: 'listPage',
                    },
                    {
                        name: '产品列表',
                        key: 'productManage',
                        path: '/consultManage/sdkManage/productManage',
                        type: 'listPage',
                    },
                    {
                        name: '模块列表',
                        key: 'moduleManage',
                        path: '/consultManage/sdkManage/moduleManage'
                    },
                    {
                        name: '按钮列表',
                        key: 'buttonManage',
                        path: '/consultManage/sdkManage/buttonManage'
                    },
                    {
                        name: '按钮编辑',
                        key: 'buttonEdit',
                        path: '/consultManage/sdkManage/buttonEdit'
                    },
                    {
                        name: 'sdk测试页',
                        key: 'sdkTest',
                        path: '/consultManage/sdkManage/sdkTest'
                    },
                ]
            },
            {
                name: '网站渠道链接管理',
                key: 'channelCollectionManage',
                path: "/consultManage/channelCollectionManage",
                children:[
                    {
                        name: '渠道链接编辑页',
                        key: 'channelCollectionEdit',
                        path: "/consultManage/channelCollectionManage/edit",
                    },
                ]
            },
            {
                name: '线上预约管理',
                key: 'onlineReservationManage',
                path: "/consultManage/onlineReservationManage",
                children:[
                    {
                        name: '线上预约编辑页',
                        key: 'onlineReservationEdit',
                        path: "/consultManage/onlineReservationManage/edit",
                    },
                    {
                        name: '线上预约详情页',
                        key: 'detail',
                        path: "/consultManage/onlineReservationManage/detail",
                    },
                ]
            },
            {
                name: '线下预约管理',
                key: 'offlineReservationManage',
                path: "/consultManage/offlineReservationManage",
                children:[
                    {
                        name: '线下预约管理编辑页',
                        key: 'offlineReservationEdit',
                        path: "/consultManage/offlineReservationManage/edit",
                    },
                    {
                        name: '线上预约详情页',
                        key: 'detail',
                        path: "/consultManage/offlineReservationManage/detail",
                    },
                ]
            },
            {
                name: "营销位管理",
                key: "memberBannerManage",
                path: "/consultManage/memberBannerManage",
            },
            {
                name: "财税智能助理主题设置",
                key: "financialTaxConfigManage",
                type: 'listPage',
                path: "/consultManage/financialTaxConfigManage",
            },
            {
                name: '对接配置',
                key: 'consultConfigImport',
                path: "/consultManage/consultConfigImport",
                type: 'empty',
            },
        ]
    },
    routerManage: {
        name: '路由管理',
        key: 'routerManage',
        children: [
            {
                name: '路由策略',
                key: 'routerStrategy',
                path: '/routerManage/routerStrategy',
                type: 'listPage',
                children: [{
                    name: '新增策略',
                    key: 'addStrategy',
                    path: '/routerManage/routerStrategy/addStrategy',
                    type: 'addPage'
                }]
            },
            {
                name: '路由规则',
                key: 'routerRule',
                path: '/routerManage/routerRule',
                type: 'listPage',
                children: [{
                    name: '新增规则',
                    key: 'addRule',
                    path: '/routerManage/routerRule/addRule',
                    type: 'addPage'
                }, {
                    name: '路由批量复制',
                    key: 'ruleBatchCopy',
                    path: '/routerManage/routerRule/ruleBatchCopy',
                    type: 'addPage'
                }]
            },
        ]
    },
    testUtil: {
        name: '测试工具',
        key: 'testUtil',
        children: [
            {
                name: '测试链接生成',
                key: 'testLinkCreate',
                path: '/testUtil/testLinkCreate',
                md: fs.readFileSync(path.resolve(__dirname, './pageConfigMd/testLinkCreate.md'), 'utf-8')
            },
            {
                name: '在线日志查询',
                key: 'onlineLogQuery',
                path: '/testUtil/onlineLogQuery',
            },
        ]
    },
    questionManage: {
        name: '图文咨询管理端',
        key: 'questionManage',
        children: [
            {
                name: '问题列表',
                key: 'questionList',
                path: '/questionManage/questionList',
                type: 'listPage',
                children: [{
                    name: '新增回答',
                    key: 'addAnswer',
                    path: '/questionManage/questionList/addAnswer',
                    type: 'addPage'
                },{
                    name: '回答预览',
                    key: 'questionPreview',
                    path: '/questionManage/questionList/questionPreview'
                }]
            },
            {
                name: '问题审核',
                key: 'answerList',
                path: '/questionManage/answerList',
                type: 'listPage',
                children: [{
                    name: '审核详情',
                    key: 'auditDetail',
                    path: '/questionManage/answerList/auditDetail',
                    type: 'addPage'
                }]
            },
            {
                name: '数据统计',
                key: 'dataList',
                path: '/questionManage/dataList',
                type: 'listPage',
            },
        ]
    },
    dataStatisticsManage: {
        name: '数据挖掘',
        key: 'dataStatisticsManage',
        children: [
            {
                name: '财税咨询总览',
                key: 'consultDataBrowse',
                path: '/dataStatisticsManage/consultDataBrowse',
                type: 'addPage',
            },
            {
                name: '咨询用户画像',
                key: 'consultUserList',
                path: '/dataStatisticsManage/consultUserList',
                type: 'listPage',
                children: [{
                    name: '用户详情',
                    key: 'userDetail',
                    path: '/dataStatisticsManage/consultUserList/userDetail',
                    type: 'addPage'
                },{
                    name: '用户咨询明细',
                    key: 'consultList',
                    path: '/dataStatisticsManage/consultUserList/consultList',
                    type: 'listPage',
                }]
            }
        ]
    },

    interrogationManage: {
      name: '专家问诊管理端',
      key: 'interrogationManage',
      children: [
          {
              name: '问诊列表',
              key: 'interrogationList',
              path: '/interrogationManage/interrogationList',
              type: 'listPage',
          },
          {
            name: '问诊导入',
            key: 'interrogationImport',
            path: '/interrogationManage/interrogationImport',
            type: 'listPage',
        },
      ]
    },
    
    schedulingManage: {
        name: '排期管理',
        key: 'schedulingManage',
        children: [
            {
                name: '排期列表',
                key: 'schedulingList',
                path: '/schedulingManage/schedulingList',
                type: 'listPage',
            },
        ]
    },

    consultPackageManage: {
        name: '咨询加油包管理',
        key: 'consultPackageManage',
        children: [
            {
                name: '加油包列表',
                key: 'refuelingPackageList',
                path: '/consultPackageManage/refuelingPackageList',
                type: 'listPage',
            },
        ]
    },
    test:{
        key:'testManage',
        path:'/testManage',
        children: [
            {
                name: '测试md模板',
                key: 'testMdList',
                path: '/testManage/testMdList',
                md:fs.readFileSync(path.resolve(__dirname,'./pageConfigMd/test.md'),'utf-8'),
                children: [{
                    name: '新增测试md',
                    key: 'addTest',
                    path: '/testManage/testMdList/addTest',
                    md:fs.readFileSync(path.resolve(__dirname,'./pageConfigMd/addPage.md'),'utf-8'),
                }]
            },
            {
                name: '测试模板列表',
                key: 'testList',
                path: '/testManage/testList',
                type: 'listPage',
                children: [{
                    name: '新增测试',
                    key: 'addTest',
                    path: '/testManage/testList/addTest',
                    type: 'addPage'
                }]
            },
            {
                name: '测试新表单模板列表',
                key: 'testFormList',
                path: '/testManage/testFormList',
                type: 'oldFormListPage'
            },
        ]
    },
    authManage: {
        name: "授权管理",
        key: "authManage",
        children: [
            {
                name: "咨询产品类型",
                key: "consultProductionType",
                path: "/authManage/consultProductionType",
                type: 'oldFormListPage'
            },
            {
                name: "授权配置管理",
                key: "authSettingManage",
                path: "/authManage/authSettingManage",
            },
        ],
    },
    isdConfigManage: {
        name: "快问快答配置",
        key: "isdConfigManage",
        children: [
            {
                name: "受理人配置",
                key: "receiverConfig",
                path: "/isdConfigManage/receiverConfig",
                type: 'listPage'
            },
            {
              name: "主动服务配置",
              key: "proactiveServiceConfiguration",
              path: "/isdConfigManage/proactiveServiceConfiguration",
              type: 'listPage'
            },            
        ],
    },
    intelligentAnalysisManage: {
        name: "智能会话分析",
        key: "intelligentAnalysisManage",
        children: [
            {
                name: "会话分析方案",
                key: "sessioAnalysis",
                path: "/intelligentAnalysisManage/sessioAnalysis",
                type: 'listPage',
            },
            {
                name: "会话分析方案编辑",
                key: "sessioAnalysisUpdate",
                path: "/intelligentAnalysisManage/sessioAnalysis/update",
                type: 'empty',
            },
            {
                name: "会话分析任务",
                key: "sessioAnalysisTask",
                path: "/intelligentAnalysisManage/sessioAnalysisTask",
                type: 'listPage'
            },           
        ],
    },
    // 智能对练
    intelligentTraineeManage: {
      name: '智能对练',
      key: 'intelligentTraineeManage',
      children: [{
        name: "对练任务列表",
        key: "traineeTaskList",
        path: "/intelligentTraineeManage/traineeTaskList",
        type: 'formListPage'
      },{
        name: "智能对练",
        key: "traineeChat",
        path: "/intelligentTraineeManage/traineeChat",
        type: 'empty'
      }, {
        name: "对练结果列表",
        key: "traineeResultList",
        path: "/intelligentTraineeManage/traineeResultList",
        type: 'formListPage'
      }]
    }
};


module.exports = pageConfig;
