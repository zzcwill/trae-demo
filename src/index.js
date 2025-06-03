/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-04-03 11:17:10
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-11-19 12:50:00
 * @FilePath: /askone-manage-pc/src/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// import {hot} from 'react-hot-loader';
import React, {} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import {StoreProvider} from 'easy-peasy';
import {Provider} from 'react-redux';
import Cookies from 'js-cookie'
// 导入dpl css
import 'dpl-react/dist/dpl.less'
// 导入全局样式
import "./assets/styles/global.scss";
import 'dora/dist/index.css'
import history from './history';

import store from './store';

import Index from './pages/index'

// 入口处设置moment编码
import moment from "moment";

import BossMenuCreator from '@boss/menu-creator';

import { Checkbox, Radio, Dropdown, Pagination, Popover, ConfigProvider } from 'dpl-react';

import { configDependentComponents } from 'react-better-table';
import { loadGalaxyConfigByEnv } from '@/utils'

// import { ConfigProvider as ConfigProviderAntd } from 'antd';
// import zhCN from 'antd/lib/locale/zh_CN';
 
configDependentComponents({
  Checkbox,
  Radio,
  Dropdown,
  Pagination,
  Popover,
  ConfigProvider
});

moment.locale('zh-cn');

if (process.env.PHOENIX_BUILD_ENV === "dev") { // 联调埋cookie
    console.log('前端埋入cookie————————————————')
    // Cookies.set('sso-epctoken', '0838553706DD2A9ACDDE5CA804198BFE570F8E9FDC98289B6516E5797D6C2C351682A8889B7A810AA92C334F2046B563')

    // release cookie
    // Cookies.set('sso-epctoken','528BA49715CA7DC55732437C68F9252FC2441BEF9E834279ED111FCA6DCCBA0A1682A8889B7A810AA92C334F2046B563')
}


const App = () => (
    <Provider store={store}>
        {/* <ConfigProviderAntd 
            locale={zhCN}
            theme={{
                token: {
                  colorPrimary: '#ff8040',
                },
            }}
        > */}
            <StoreProvider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={Index}/>
                    </Switch>
                </Router>

            </StoreProvider>
        {/* </ConfigProviderAntd> */}
    </Provider>
)

//hot(module)(App);
loadGalaxyConfigByEnv()

function init() {
    BossMenuCreator.init({
        appId: '08620100010000',
        isShowLeft: true,
        isShowTop: true,
        contentDomId: 'root',
        bossDomId: 'yypt-common-layout',
        env: process.env.PHOENIX_BUILD_ENV === 'dev' ? 'test' : process.env.PHOENIX_BUILD_ENV,
    }).then(() => {
        ReactDOM.render(<App/>, document.getElementById('root'));
    })
}

init()
// ReactDOM.render(<App/>, document.getElementById('root'));


