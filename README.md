## 技术栈 
    react + react-router(4.0) + redux

## 第三方组件库及插件文档
    组件库
      dpl-react(1.58.0) + (dpl2.0)[https://design.dc.servyou-it.com/platform/dpl2/usedoc/install]并存，新功能都使用dpl2.0组件
      



## 第三方SDK


## 初始化
    gitlab地址 http://gitlab.dc.servyou-it.com/front-context/askone-manage-pc.git
    将项目checkout到本地,并新建开发分支,如`v1.0`

```  
// 依赖安装
npm install   或者  yarn install

// 启动项目
npm run dev  默认代理到mock环境

本地联调或者测试环境：
1、去对应环境登录获取sso-epctoken修改index.js中的sso-epctoken
2、终端执行：sudo vi /etc/hosts ，添加一条配置127.0.0.1 local.91lyd.com
3、`npm run dev` 或者 `yarn dev`   项目中接口mock使用walle的mock功能，项目中不做相关处理

4、打开：http://local.sit.91lyd.com:3000/askone-manage-pc/#/

http://local.servyou-it.com:3000/askone-manage-pc/#/

http://local.sit.91lyd.com:3000/askone-manage-pc/#/intelligentAnalysisManage/sessioAnalysis
 
```
## 项目发布流程  

```
发布大盘地址：
http://phoenix.dc.servyou-it.com/project/myProject.html
```

### 项目目录
```
public (项目入口html)
-- index.html
    异步加载引入相关的js并挂载在window对象下;

```

```

src (项目)
-- assets(静态资源)
    -- images(项目图片依赖)
        项目内 组件依赖的图片

    -- styles(项目内 组件的样式)
        举例:
        account.less (各个一级目录的css)
        app.less     (项目入口的主 css)

-- components
    封装的公共组件
    
-- const

-- hooks

-- pages
    具体各个页面

-- common 通用的js方法
    --third-api(第三方的api)
        -- 网易云视频上传API;
        -- wangEditor富文本编辑器API
    项目通用的js方法

-- request

-- router
    项目路由

-- store
    数据状态管理


index.js (程序入口)

```


### 账号信息：

开发环境账号:
```
   13100100003  qwe123
```

test环境账号:
```

```



自动化创建新页面代码：
1、在./pageConfigMd/test.md中配置页面生成规则
2、在pageConfig.js中配置需要新建的页面,需要填写type: 目前列表推荐type，`formListPage`, 新增推荐 `addFormPage`，是dpl2.0的模板
3、npm run create-page 生成规范代码

管理端里所有的页面都是分模块的
1、内容管理，这个里面的所有东西都是一个叫亿企知道的产品的问答相关的东西，这个产品大致上和亿企咨询里的问答模块有些类似，主要是提供给远程中心坐席人员使用的。
2、人员管理，这个主要是和坐席相关的一些管理端界面，主要是管人的，包括坐席是服务在线还是服务来电的、坐席组、来电的分机号、坐席组工作时间、特殊日（实际就是节假日或者一些比较特殊的时间点工作时间的调整）
3、电话管理是来电咨询这个业务中的一些管理端，就是我之前给你发过的一个来电咨询页面上各种功能的管理端
4、渠道管理微信公众号、企业微信、客户端等一些老的在线咨询入口提供的渠道信息配置
5、服务管理是live里面一些全局配置、和live800的一些配置化的逻辑判断内容、宣传图也是live800咨询页面右上角的宣传图
6、数据管理，就是一些监控、机器人处理情况啥报表这些东西，后续应该很少了，以后应该大部分都由QQT做
7、咨询前台管理，这个就是所有和亿企咨询相关的
8、路由管理，在线咨询分配给那个坐席组的路由规则，路由策略都在这里，这里的所有逻辑都是在线咨询路由判断相关的，因为这里所有的判断都是在我们服务里的，所以就没有放在服务管理里



## 中台配置菜单方法

```
1、登录xqy_admin 123
2、点登录右上角控制台
3、打开菜单 权限管理 -> 功能权限管理，搜索 问答社区管理端

找到对应菜单 编辑或者新增 

原窗口跳转 顺序13

4、菜单管理添加对应菜单,记得绑定上面配置的权限，一般拉到最后面
5、角色管理 搜索所属应用 编辑 人员管理 employeeManage 加上刚刚添加的菜单 

```

## 中台功能权限点配置方法

1、登录xqy_admin 123
2、点登录右上角控制台
3、打开菜单 权限管理 -> 功能权限管理，搜索 问答社区管理端
在菜单下面新增 按钮权限 选一个上级节点

给员工授权：
1、在授权管理下面加具体权限
2、在授权管理下面查询这个人角色，在角色管理里给对应角色加权限点
