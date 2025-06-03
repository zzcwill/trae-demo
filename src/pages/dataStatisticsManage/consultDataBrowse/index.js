import React, { useState, useEffect, useRef, useMemo } from 'react'
import './index.scss'
import { uForm } from "dora";
import { Tabs } from 'dpl-react'
import history from '@/history'
import up_icon from './img/上升.svg'
import up_white_icon from './img/上升-white.svg'

import { get, post } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import qs from 'qs'
import moment from 'moment'
import HoverTip from "@/components/common/hoverTip"
import useYearList from '../hooks/useYearList'
import {useStoreState, useStoreActions} from "easy-peasy";

const TabPane = Tabs.TabPane;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 15 },
};
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions } = uForm
const actions = createFormActions()

const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip');

export default function ConsultDataBrowse(props) {
    const [currentYear, setCurrentYear] = useState(null)
    const yearList = useStoreState(
        (state) => state.dataStatisticsManage.yearList
    )
    // const [yearList, setYearList] = useState([]) //年度列表
    const [tagList, setTagList] = useState([]) //顶部标签，目前只有三个
    const [locationList, setLocationList] = useState([]) //前四的地区
    const [currentTag, setCurrentTag] = useState({})    //当前选中的问题类型
    const [currentLocation, setCurrentLocation] = useState({}) //当前选中的地区
    const [lineList, setLineList] = useState([])//折线图数据
    const [pieList, setPieList] = useState([])//饼图数据
    const [totalQuestionNum, setTotalQuestionNum] = useState(0)//地区总的财税问题
    const tagEchartsRef = useRef(null) //折线图
    const locationEchartsRef = useRef(null) //饼图
    const { getYearStartEnd } = useYearList()

    const getYearList = async () => {
        const data = await get({
            url: Api.getDmConsultGetYearTag,
        })
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const array = data.data
            setCurrentYear(array[0].year) //默认选中当年
            setYearList(array)
        }
    }

    const getQuestionTag = async () => {
        const data = await get({
            url: Api.getDmConsultTagStatistics,
            params: {
                tagType: 'QUESTION',
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
            }
        })
        if (data.success && Array.isArray(data.data)) {
            setTagList(data.data)
        }
    }


    const getTagLastYearList = async (item) => {
        const data = await get({
            url: Api.getDmConsultMonthStatistics,
            params: {
                tagType: 'QUESTION',
                tagCode: item?.tagCode, //不传统计全部
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
                // startDate: moment().year(currentYear).add(-1, 'y').format('YYYY-MM-DD'),
                // endDate: moment().year(currentYear).format('YYYY-MM-DD'),
            }
        })
        if (data.success && Array.isArray(data.data)) {
            setLineList(data.data)
        }
    }

    const getLocationTag = async () => {
        const data = await get({
            url: Api.getDmConsultLocationStatistics,
            params: {
                tagType: 'QUESTION',
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
            }
        })
        if (data.success && Array.isArray(data.data)) {
            let results = data.data.slice(0, 4);
            if (!results || results.length == 0) {
                const defaultLocations = ["新疆", "河北", "广东", "深圳"]
                const defaultCodes = ["6500", "1300", "4400", "4403"]
                defaultLocations.forEach((name, index) => {
                    results.push({
                        "count": 0,
                        "name": name,
                        "monthCount": 0,
                        "location": defaultCodes[index],
                        "mock": true //标记是假数据
                    })
                })
            }
            setLocationList(results)
        }
    }

    const getLocationQuestionList = async (item) => {
        const data = await get({
            url: Api.getDmConsultLastTagStatistics,
            params: {
                tagType: 'QUESTION',
                location: item?.location, //不传统计全部
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
            }
        })
        if (data.success && Array.isArray(data.data)) {
            if (data.data.length > 0) {
                // 处理数据，把小于1%的都归到其他里去
                let sum = 0;
                let otherSum = 0;//其他
                const array = data.data;
                array.forEach(element => {
                    sum += element.count
                });
                setTotalQuestionNum(sum);
                const hundredth = sum * 0.01;
                const newArray = []
                array.forEach(element => {
                    if (element.count >= hundredth) {
                        newArray.push(element)
                    } else {//小于1%归到其他
                        otherSum += element.count
                    }
                });
                if (otherSum > 0) {
                    newArray.push({
                        "count": otherSum,
                        "name": "其他"
                    })
                }
                setPieList(newArray.sort((a, b) => b.count - a.count))
            } else {
                setTotalQuestionNum(0);
                setPieList([{
                    "count": 0,
                    "name": "无",
                    mock: true
                }])
            }
        } else {
            setTotalQuestionNum(0);
            setPieList([{
                "count": 0,
                "name": "无",
                mock: true
            }])
        }
    }

    const chooseItem = (type, item) => {
        let nextItem = {}
        if (type === 'tag') {
            if (item.name == currentTag.name) {//取消选中

            } else {
                nextItem = item
            }
            setCurrentTag(nextItem)
            getTagLastYearList(nextItem)
        } else if (type == 'location') {
            if (item.name == currentLocation.name) {//取消选中
            } else {
                nextItem = item
            }
            setCurrentLocation(nextItem)
            getLocationQuestionList(nextItem)
        }
    }
    const formatPrice = (num = 0) => {
        return num.toString().replace(/\d+/, function (n) {
            return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        });
    };

    const drawTagLine = () => {
        if (!tagEchartsRef.current) return
        const options = {
            grid: {//距上下左右的距离
                left: 0,
                top: '10%',
                right: 0,
                bottom: 0,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: '#FFFFFF',
                formatter: function (data) {
                    // console.log('data',data);
                    if (data && data.length > 0) {
                        const item = data[0]
                        return `${item.name} <br/>  <div> ${currentTag.name || '财税'}咨询 <br/></div><div style="font-size: 16px;color:#666">${item.marker + formatPrice(item.value)}</div>`
                    }
                },
                textStyle: {
                    color: '#333',
                    fontSize: 14
                },
                extraCssText: 'box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2); border-radius: 6px;',
                // axisPointer: {
                //     type: 'cross',
                //     label: {
                //     }
                // }
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: lineList.map(item => item.name),
                axisLine: { //y刻度线设置
                    onZero: false,
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#666666",
                        fontSize: 12,
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: { //y刻度线设置
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#666666",
                        fontSize: 12,
                    }
                },
                splitLine: {
                    show: true
                },
            },
            series: [
                {
                    // name: ``,
                    type: 'line',
                    lineStyle: {
                        color: '#4480F7',
                        width: 2,
                    },
                    showSymbol: false,
                    data: lineList.map(item => item.count)
                }
            ]
        }
        const char = echarts.init(tagEchartsRef.current)
        char.setOption(options)
    }

    const drawPieLine = () => {
        if (!locationEchartsRef.current) return
        const colorArr = ['#4480F7', '#1AC7C7', '#6767DA', '#FFCC00', '#FF4E45', '#00BBF2', '#9270CA']
        const options = {
            grid: {//距上下左右的距离
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} <br/> {c} ({d}%)'
            },
            legend: {
                type: 'plain',
                orient: 'vertical',
                right: 0,
                top: 0,
                data: pieList.map(item => item.name),
                selectedMode: false,
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#999999',
                    fontSize: 12,
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['45%', '50%'],
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    label: {
                        show: true,
                        // alignTo: 'edge',
                        fontSize: 14,
                        color: '#666',
                        formatter: '{time|{b}} \n {time|{c} 个}',
                        // formatter: function(params){

                        //     return '{time|{b}} {time|{c} 个}';
                        // },
                        // minMargin: 5,
                        // edgeDistance: 10,
                        lineHeight: 18,
                        rich: {
                            name: {
                                // fontSize: 16,
                            },
                            time: {
                                fontSize: 14,
                                color: '#666'
                            }
                        }
                    },
                    labelLine: {
                        length: 50,
                        length2: 30
                    },
                    data: pieList.map((item, index) => {
                        return {
                            name: item.name,
                            value: item.count,
                            itemStyle: {
                                color: colorArr[index % 7]
                            },
                            label: {//前五个显示指示器
                                show: index < 5 ? true : false
                            },
                            labelLine: {
                                show: index < 5 ? true : false,
                                // lineStyle: {
                                //     color: index < 5 ? colorArr[index % 8] : '#fff',
                                // }
                            },
                            emphasis: {
                                labelLine: {
                                    show: index < 5 ? true : false,
                                },
                            }
                        }
                    }),
                }
            ]
        };
        const char = echarts.init(locationEchartsRef.current)
        char.setOption(options)
    }
    const tabChange = (value) => {
        setCurrentYear(value)
        setCurrentTag({})//清空选中的地区跟问题类型
        setCurrentLocation({})
    }
    useEffect(() => {
        if (lineList.length > 0) {
            drawTagLine()
        }
    }, [lineList])

    useEffect(() => {
        if (pieList.length > 0) {
            drawPieLine()
        }
    }, [pieList])

    useEffect(() => {
        if (currentYear) {
            getQuestionTag()
            getLocationTag()
            getTagLastYearList({})
            getLocationQuestionList({})
        }
    }, [currentYear])

    useEffect(() => {
        if(yearList && yearList.length > 0) {
            setCurrentYear(yearList[0].year) //默认选中当年
        }
    }, [yearList])


    // useEffect(() => {
    //     getYearList()
    // }, [])
    return (
        <div className='detail-bg'>
            <div className="top-tab">
                {yearList && yearList.length > 0 &&
                    <Tabs onChange={(value) => tabChange(value)}>
                        {yearList.map(item => <TabPane tab={`${item.year}年度`} key={item.year}></TabPane>)}
                    </Tabs>
                }
            </div>
            <div className="consult-data-browse">
                <HoverTip tipText="显示今年的财税咨询数据量最多的类型的大类及对应的咨询数，最多只显示四个。未识别出问题类型的财税咨询量不统计在内。">
                    <div className="main-title">年度热点财税问题</div>
                </HoverTip>
                <div className="tag-menu-view">
                    <div className="tab-list">
                        {tagList && tagList.map(tag =>
                            <div
                                className={`tab-item ${tag.name === currentTag.name ? 'tab-item-active' : ''}`}
                                key={tag.name}
                                onClick={() => chooseItem('tag', tag)}
                            >
                                <div className="tab-title">{tag.name}</div>
                                <div className="tab-view">
                                    <div className="tag-text limit-one">{formatPrice(tag.count)}</div>
                                    <span className="tag-gray-text">
                                        <span>当月新增</span>
                                        <img className='icon-up green' src={up_icon} />
                                        <img className='icon-up white' src={up_white_icon} />
                                        <span className="green-text">{formatPrice(tag.monthCount)}</span>
                                    </span>
                                </div>
                            </div>)}
                    </div>
                    <HoverTip tipText="默认显示今年各月的财税咨询量变化情况。点击热点财税问题的分类后对应展示该分类下今年各月的财税咨询量变化情况。" className="margin-top20">
                        <div className="main-title black">{currentTag.name || '财税'}{currentYear}年咨询变化趋势</div>
                    </HoverTip>

                    <div className="echarts-tag-content" ref={tagEchartsRef}> </div>
                </div>
                <div className="location-view">
                    <div className="tab-list">
                        {locationList && locationList.map(tag =>
                            <div
                                className={`tab-item ${tag.name === currentLocation.name ? 'tab-item-active' : ''}`}
                                key={tag.name}
                                onClick={() => chooseItem('location', tag)}
                            >
                                <HoverTip
                                    className="margin-top20"
                                    color={tag.name === currentLocation.name ? 'white' : 'gray'}
                                    tipText={`${tag.name}地区财税咨询总量，包含未识别出问题类型的财税咨询记录。`}
                                >
                                    <div className="tab-title">{tag.name}</div>
                                </HoverTip>
                                <div className="tab-view">
                                    <div className="tag-text limit-one">{formatPrice(tag.count)}</div>
                                    {/* <span className="tag-gray-text">
                                        <span>当月新增</span>
                                        <img className='icon-up green' src={up_icon} />
                                        <img className='icon-up white' src={up_white_icon} />
                                        <span className="green-text">{formatPrice(tag.monthCount)}</span>
                                    </span> */}
                                </div>
                            </div>)}
                    </div>
                    <div className="location-content-out">
                        <div className="main-title black">{currentLocation.name || '全国'}地区热点问题类型</div>
                        <div className="echarts-location-content" ref={locationEchartsRef}> </div>
                        <div className="consult-question">
                            <HoverTip
                                className="margin-top20"
                                tipText={<div>该地区下识别出问题类型的财税咨询总量，不包含未识别出问题类型的财税咨询记录。<br />饼图中不展示占比1%以下的问题类型。</div>}
                            >
                                <div className="consult-question-title">财税问题</div>
                            </HoverTip>

                            <div className="consult-question-num">{formatPrice(totalQuestionNum)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}