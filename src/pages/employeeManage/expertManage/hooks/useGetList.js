import React, {useState, useEffect} from 'react'
import qs from 'qs'
import {get} from '@/request/request'

/**
 *  url 请求url,
 *  listFormat:格式化列表
 *  fistToRender:首次加载就渲染
 * */
export default function (url, listFormat, fistToRender = true) {
  const [params, setParams] = useState(() => {
    return Object.assign({
      pageSize: 10,
      pageIndex: 1
    }, qs.parse(window.location.href.split('?')[1]))
  })
  const [first, setFirst] = useState(true) // 是否初次加载
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const getList = async () => {
    setLoading(true)
    const data = await get({url: url, params: params})
    setLoading(false)
    if (data.success) {
      setTotal(data.data.total)
      const formatList = listFormat && listFormat(data.data.list)
      setList(formatList ? formatList : data.data.list)
    }
  }
  const changeParams = (params, force = false) => {
    let hash = window.location.href.split('#')[1]
    hash = hash.split('?')[0]
    const oldLocation = '#' + window.location.href.split('#')[1]
    const newLocation = `#${hash}?${qs.stringify(params)}`
    window.location.hash = newLocation
    if (force && oldLocation === newLocation) { // url没改变，但是需要强制刷新
      getList()
    }
  }
  useEffect(() => {
    if (!fistToRender && !first) {
      getList()
    } else if (fistToRender) {
      getList()
    }
    setFirst(false)
  }, [params])
  useEffect(() => {
    const hashChange = () => {
      if(!fistToRender&&first) return
      setParams(Object.assign({
        pageSize: 10,
        pageIndex: 1
      }, qs.parse(window.location.href.split('?')[1])))
    }
    window.addEventListener('hashchange', hashChange)
    return () => {
      window.removeEventListener('hashchange', hashChange)
    }
  }, [first])

  return {
    params,
    getList,
    loading,
    total,
    changeParams,
    list
  }
}
