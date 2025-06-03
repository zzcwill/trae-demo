import React, {useEffect, useState} from 'react'
import Breadcrumb from './index'
import history from "@/history";
import sessionStorageHelper from "@/utils/sessionStorage";

export default function creator(config) {
    const {indexMap, key} = config
    let historyArr = sessionStorageHelper.getItem(key) || []
    const genHistoryArr = (url) => {
        const result = []
        let flag = false
        for (let i = 0; i < historyArr.length; i++) {
            const item = {...historyArr[i]}
            const matchStr = item.url.split('?')[0]
            if (url.indexOf(matchStr) >= 0) { // 点到中间，后面的都剔除
                result.push(item)
                flag = true
                break
            } else {
                result.push(item)
            }
        }
        if (!flag) { //新加入的
            const index = indexMap.findIndex((item) => {
                return url.indexOf(item.url) >= 0
            })
            result.push({url: url, name: indexMap[index].name})
        }
        historyArr = result
        sessionStorageHelper.setItem(key, result)
        return [...result]
    }
    const push = (url) => {
        genHistoryArr(url)
        history.push(url)
    }
    const replace = (url) => {
        genHistoryArr(url)
        history.replace(url)
    }

    function Wrapper(props) {
        const [list, setList] = useState([...historyArr])
        useEffect(() => {
            let url = history.location.pathname

            if (history.location.search) {
                url += history.location.search
            }
            setList(genHistoryArr(url))
        }, [])
        return <Breadcrumb {...props} list={list} onClick={(item) => {
            push(item.url)
        }}/>
    }

    return {
        Breadcrumb: Wrapper,
        push,
        replace
    }
}