import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import history from '@/history'
import { get, post } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import qs from 'qs'
import up_icon from './img/上升.svg'
import down_icon from './img/下降.svg'
import moment from 'moment'
import { Icon, Popover, Breadcrumb, Tabs } from 'dpl-react'
import HoverTip from "@/components/common/hoverTip"

import man_img from './img/男性头像.png'
import woman_img from './img/女性头像.png'
import default_img from './img/默认头像.png'
import no_empty from './img/当前暂无数据.png'
import arrowImg from './img/arrow.png'
import companyImg from './img/company.png'
import arr_chunk from 'lodash/chunk'
import useYearList from '../../../hooks/useYearList'

import { backgroundColor } from 'echarts/lib/theme/dark'
import classNames from 'classnames'

const emptyImg = 'https://s.17win.com/snack/134/%E7%A0%94%E5%8F%91%E4%B8%AD.png';
const TabPane = Tabs.TabPane;
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/bar');
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip');

const analysDataConfig = {
    cszx: {
        name: '财税'
    },
    bszx: {
        name: '办税'
    }
}

export default function UserDetail(props) {
    const [mobile, setMobile] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.mobile
    })
    const [activeTabKey, setActiveTabKey] = useState('cszx');
    const [currentYear, setCurrentYear] = useState(null)
    // const [yearList, setYearList] = useState([]) //年度列表

    const [userDetail, setUserDetail] = useState(null)
    const [tagList, setTagList] = useState([])
    const [subTagList, setSubTagList] = useState([])
    const currentTagRef = useRef({});
    const [currentTag, setCurrentTag] = useState({})
    const [consultList, setConsultList] = useState([])
    const [userInfoTag, setUserInfoTag] = useState([])
    const [showMore, setShowMore] = useState(false) //显示【查看更多】
    const [isMore, setIsMore] = useState(false) //是否展开
    const { yearList, getYearStartEnd } = useYearList()

    const genUserInfoTag = () => {
        const filterPosition = userDetail.position?.filter(item => item.name && item.name.length > 0)//有可能数组有值但是name为空
        const arr = [
            {
                key: 'user',
                label: '用户岗责',
                value: filterPosition?.map(item => item.name),
                show: filterPosition?.length > 0
            },
            {
                key: 'channel',
                label: '来源渠道',
                value: userDetail.channel?.map(item => item.name),
                show: userDetail.channel?.length > 0
            },
            {
                key: 'company',
                label: '企业身份',
                showIcon: true,
                value: [`${userDetail.companyList.length}家`, ...userDetail.taxpayerType.map(item => item.name)],
                show: userDetail.companyList.length > 0,
                showPover: userDetail.companyList.length > 0,
                popover: userDetail.companyList?.map(({ companyName, areaName, positionList }) => {
                    positionList = positionList || [];
                    return <span className='pop-line-box'>
                        <span className='font-num-20' style={{ marginRight: 16 }}>{companyName || ''}</span>
                        <span className='font-num-15' style={{ marginRight: 16 }}>{areaName || ''}</span>
                        <span className='font-num-20'>{positionList.join('、') || ''}</span>
                    </span>
                })
            },
            {
                key: 'industry',
                label: '行业类型',
                value: userDetail.business.map(item => item.name),
                show: userDetail.business.length > 0
            },
            {
                key: 'org',
                label: '机构身份',
                value: [`${userDetail.agencyList.length}家`],
                show: userDetail.agencyList.length > 0,
                showPover: userDetail.agencyList.length > 0,
                popover: userDetail.agencyList?.map(({ name, positionList }) => {
                    positionList = positionList || [];
                    return <span className='pop-line-box'>
                        <span className='font-num-20' style={{ marginRight: 16 }}>{name || ''}</span>
                        <span className='font-num-20'>{positionList.join('、') || ''}</span>
                    </span>
                })
            },
            {
                key: 'area',
                label: '所处地区',
                value: userDetail.location.map(item => item.name),
                show: userDetail.location.length > 0
            },
        ]
        let isShowMore = false
        arr.forEach((item, index) => {
            if (item.value && item.value.length > 0) {
                let temp = 0
                const maxLength = userInfoTagRef.current.offsetWidth / 2 - 88 //tag最大宽度，88为label宽度
                item.value.forEach((a) => {
                    temp = temp + a.length * 14 + 18 + 8 //14为字号、20为边距+边框、8为marginRight,即一个tag所占宽度
                })
                temp = temp - 8 // 剔除最后一个元素的marginRight
                if (index % 2 !== 0) { //单数，即在左边的时候，需要再加上两区块间距
                    temp += 12
                }
                if (temp > maxLength) {
                    isShowMore = true
                }
            }
        })
        if (!isShowMore) {
            setShowMore(false)
            setUserInfoTag(arr_chunk(arr, 2))
        } else {
            setUserInfoTag(arr)
            setShowMore(true)
        }
    }

    const getYearList = async () => {
        const data = await get({
            url: Api.getDmConsultGetYearTag,
        })
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const array = data.data
            setCurrentYear(array[0].year) //默认选中当年
            // setYearList(array)
        }
    }

    const calcRate = (detail) => {
        // 满意率
        detail.satisfiedCountRate = getPercent(detail.satisfiedCount, detail.satisfiedCount + detail.notSatisfiedCount)
        //解决率
        detail.solutionCountRate = getPercent(detail.solutionCount, detail.solutionCount + detail.unsolutionCount)
    }

    const getUserDetail = async () => {
        const res = await get({
            url: Api.getDmPersonalDetail, params: {
                mobile,
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
            }
        })
        if (res.success) {
            calcRate(res.data);
            calcRate(res.data.personaTaxConsultStatistics)
            // 格式化的
            console.log('res.data', res.data);
            setUserDetail(res.data)

        }
    }

    function getPercent(num, total) {
        if (!num && !total) return '--'
        return parseInt((num / total * 1000)) / 10 //这边返回的是百分比，保留一位小数
    }

    function formatPercent(num, ave) {
        if (num == '--' || ave == '--') return '--'
        if (!num && !ave) return 0 + '%'//两者都是0
        return Math.abs(parseInt((num - ave) * 10)) / 10 + '%' //这边返回的是百分比
    }

    // num=0时显示-- ，默认返回0
    function formatNum(num, ave, numZeroAcross = false) {
        if(numZeroAcross) {
            if (num === null || num === 0) return '--'
        }
        if ((num === null || ave === null)) return 0
        return Math.abs(parseInt((num - ave) * 10)) / 10
    }

    // s -> X小时X分钟、X分钟 不足一分钟按一分钟算
    function formatSeconds(value, needSeconds = false) {
        let result = parseInt(value)
        let s = Math.floor((result % 60));
        if(needSeconds == false && value%60 > 0) {
            value = value + 60;
            s = 0
        }
        let m = Math.floor(value / 60 % 60)
        let h = Math.floor(value / 3600)
        let res = '';
        if(h > 0) res += `${h}小时`;
        if(m > 0) res += `${m}分钟`;
        // res += `${s}s`;
        return {
            h,
            m,
            s,
            res: res || '0分钟'
        };
    }

    //showAcross当num=0 无需计算不显示箭头
    const getCss = (a, b, showAcross = false) => {
        if(showAcross) {
            if (!a) return 'empty'
        }
        if (a == '--' || b == '--') return 'empty'
        if ((a - b) === 0) return 'big'
        // if(!a || !b) return 0 //都是0
        if ((a - b) > 0) return 'big'
        if ((a - b) < 0) return 'small'

    }

    const cssDict = {
        'empty': '',
        0: 'big',
        1: 'small'
    }
    const getLevel = () => {
        // const consultCount = userDetail.totalConsultCount; //总咨询次数
        // const aveConsultCount = userDetail.totalConsultCountAverage;//平均咨询次数均值
        // const consultTime = userDetail.averageConsultTime//平均咨询时长
        // const aveConsultTime = userDetail.averageConsultTimeAverage //咨询时长均值
        // let consultText = ''
        // let timeText = ''
        // if (consultCount > aveConsultCount) {
        //     consultText = '高频'
        // } else if (consultCount == aveConsultCount) {
        //     consultText = '中频'
        // } else {
        //     consultText = '低频'
        // }

        // if (consultTime > aveConsultTime) {
        //     timeText = '重度'
        // } else if (consultTime == aveConsultTime) {
        //     timeText = '中度'
        // } else {
        //     timeText = '轻度'
        // }

        return ((userDetail.frequencyLabel + userDetail.heavyLabel) || '未知') + '用户'
    }
    const getHeadImg = () => {
        if (userDetail.imageUrl) return userDetail.imageUrl
        if (userDetail.male === '男') return man_img
        if (userDetail.male === '女') return woman_img
        return default_img
    }
    const hideMobile = (mobile) => { //手机号脱敏
        if (!mobile) return ''
        return mobile.substring(0, 3) + '****' + mobile.substring(7, mobile.length)
    }

    const getConsultList = async () => {
        const res = await get({
            url: Api.getDmPersonaConsultList, params: {
                pageSize: 20,
                pageIndex: 1,
                mobile,
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
                onlyQueryFlag: 'Y'
            }
        })
        if (res.success) {
            setConsultList(res.data.list)
        }
    }
    const getTagList = async () => {
        const res = await get({
            url: Api.getDmPersonalTagStatistics, params: {
                mobile,
                tagType: 'QUESTION',
                startDate: getYearStartEnd(currentYear).startDate ,
                endDate: getYearStartEnd(currentYear).endDate,
                // startDate: '2022-01-01',
                // endDate: '2022-01-01',
            }
        })
        let array = [{
            "name": "无",
            "count": 0,
            chartData: []
        }]
        if (res.success && res.data.length > 0) {
            array = res.data
        }
        setTagList(array)
        chooseItem({}, array)
    }

    // 不选用全国的所有的
    const chooseItem = (item, allList) => {
        let nextItem = {}
        if (item.name == currentTagRef.current.name) {//取消选中

        } else {
            nextItem = item
        }
        let subList = []
        if ((!nextItem || !nextItem.name) && Array.isArray(allList)) {//没选中用所有的里面子项
            allList.forEach(item => {
                subList = subList.concat(item.chartData)
            })
        } else {
            subList = item.chartData
        }
        let sortList = subList.sort((a, b) => b.count - a.count).slice(0, 6)
        sortList = sortList.sort((a, b) => a.count - b.count)
        setSubTagList(sortList)
        setCurrentTag(nextItem)
        currentTagRef.current = nextItem
    }
    const gotoConsultList = async () => {
        let url =
            window.location.href.split("#")[0] +
            `#/dataStatisticsManage/consultUserList/consultList?mobile=${userDetail.mobile}&name=${userDetail.name || userDetail.mobile}&year=${currentYear}`;
        window.open(url);
    }

    const tagRef = useRef(null)
    const subRagRef = useRef(null)
    const userInfoTagRef = useRef(null)
    const initTagGraph = () => { //饼图
        if (!tagRef.current) return
        const colorArr = ['#00bbf2', '#ff9500', '#6767da', '#ff4e45', '#59cf15', '#cddc39', '#ff2d55', '#1ac7c7']
        const options = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'plain',
                orient: 'vertical',
                right: 0,
                top: 'middle',
                data: tagList.map(item => item.name),
                selectedMode: false,
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#999999'
                }
            },
            series: [{
                name: '问题类型总览',
                type: 'pie',
                radius: '70%',
                center: ['40%', '50%'],
                labelLine: {
                    show: false
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}'
                },
                data: tagList.map((item, index) => {
                    return {
                        name: item.name,
                        value: item.count,
                        chartData: item.chartData,
                        itemStyle: {
                            color: colorArr[index % 9]
                        }
                    }
                })
            }]
        }
        const char = echarts.init(tagRef.current);
        char.setOption(options)
        char.on('click', (data) => {
            console.log('data', currentTag);
            chooseItem(data.data, tagList)
            // tagList.forEach(item => {

            //     if (item.name === data.data.name) {
            //         setSubTagList(item.chartData)
            //         setCurrentTag(item)
            //     }
            // })
        })
    }
    const initSubTagGraph = () => {
        if (!subRagRef.current) return
        const options = {
            grid: {
                containLabel: true,
                left: 0
            },
            xAxis: {
                type: 'value',
                axisLine: false,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: subTagList.map(item => item.name),
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    align: 'right',
                    color: '#999999'
                }
            },
            series: [
                {
                    type: 'bar',
                    name: currentTag.name,
                    itemStyle: {
                        color: 'rgba(68,128,247,0.85)'
                    },
                    barWidth: 24,
                    label: {
                        show: true,
                        color: '#ffffff',
                        formatter: "{c}",
                        align: 'left',
                        position: 'insideLeft',
                        offset: [4, 0]
                    },
                    data: subTagList.map(item => {
                        return {
                            name: item.name,
                            value: item.count
                        }
                    })
                }
            ]
        }
        const char = echarts.init(subRagRef.current)
        char.setOption(options)
    }

    useEffect(() => {
        if (userDetail && tagList.length > 0) {
            initTagGraph()
        }
    }, [tagList, userDetail])
    useEffect(() => {
        if (userDetail && subTagList.length > 0) {
            initSubTagGraph()
        }
    }, [subTagList, userDetail])
    useEffect(() => {
        if (userDetail) {
            genUserInfoTag()
        }
    }, [userDetail])
    useEffect(() => {
        if(currentYear) {
            setIsMore(false)
            getUserDetail()
            getTagList()
            getConsultList()
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
    const config = analysDataConfig[activeTabKey] || {};
    const renderConsultAnalysTabData = (wrapperData = {}) => {
        return <div className='data'>
            <div className='frequency data-item'>
                <HoverTip tipText={`显示当前用户本年度的${config.name}咨询量，显示与所有用户平均咨询量的偏差。`} className="marginBottom12">
                    <div className='label '>{config.name}咨询频次</div>
                </HoverTip>
                {activeTabKey === 'bszx' ? (
                    <div className='box'>
                        <div className='item'>
                            <p className='label'>办税咨询量</p>
                            <p className='number'>{wrapperData.totalConsultCount || '--'}</p>
                            <div
                                className={`average ${getCss(wrapperData.totalConsultCount, wrapperData.totalConsultCountAverage, true)}`}>
                                <span>较均值</span>
                                <img className='icon up' src={up_icon} />
                                <img className='icon down' src={down_icon} />
                                <span
                                    className='average-number'>{formatNum(wrapperData.totalConsultCount, wrapperData.totalConsultCountAverage, true)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='box'>
                        <div className='item'>
                            <p className='label'>基础财税咨询量</p>
                            <p className='number'>{wrapperData.basicConsultCount || '--'}</p>
                            <div
                                className={`average ${getCss(wrapperData.basicConsultCount, wrapperData.basicConsultCountAverage, true)}`}>
                                <span>较均值</span>
                                <img className='icon up' src={up_icon} />
                                <img className='icon down' src={down_icon} />
                                <span
                                    className='average-number'>{formatNum(wrapperData.basicConsultCount, wrapperData.basicConsultCountAverage, true)}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <p className='label'>专家财税咨询量</p>
                            <p className='number'>{wrapperData.expertConsultCount || '--'}</p>

                            <div
                                className={`average ${getCss(wrapperData.expertConsultCount, wrapperData.expertConsultCountAverage, true)}`}>
                                <span>较均值</span>
                                <img className='icon up' src={up_icon} />
                                <img className='icon down' src={down_icon} />
                                <span
                                    className='average-number'>{formatNum(wrapperData.expertConsultCount, wrapperData.expertConsultCountAverage, true)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className='quality data-item'>
                <HoverTip tipText="显示当前用户本年度的满意率情况和解决率情况，显示与所有用户整体满意率、解决率情况的偏差。" className="marginBottom12">
                    <div className='label'>{config.name}服务质量</div>
                </HoverTip>

                <div className='box'>
                    <div className='item'>
                        <p className='label'>满意率</p>
                        <p className='number'>{wrapperData.satisfiedCountRate == '--' ? wrapperData.satisfiedCountRate : wrapperData.satisfiedCountRate + '%'}</p>
                        <div
                            className={`average ${getCss(wrapperData.satisfiedCountRate, wrapperData.satisfiedAverage)}`}>
                            <span>较均值</span>
                            <img className='icon up' src={up_icon} />
                            <img className='icon down' src={down_icon} />
                            <span className='average-number'>{formatPercent(wrapperData.satisfiedCountRate, wrapperData.satisfiedAverage)}</span>
                        </div>
                    </div>
                    <div className='item'>
                        <p className='label'>解决率</p>
                        <p className='number'>{wrapperData.solutionCountRate == '--' ? wrapperData.solutionCountRate : wrapperData.solutionCountRate + '%'}</p>
                        <div
                            className={`average ${getCss(wrapperData.solutionCountRate, wrapperData.solutionAverage)}`}>
                            <span>较均值</span>
                            <img className='icon up' src={up_icon} />
                            <img className='icon down' src={down_icon} />
                            <span
                                className='average-number'>{formatPercent(wrapperData.solutionCountRate, wrapperData.solutionAverage)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='time data-item'>
                <HoverTip tipText="显示当前用户本年度的总咨询时长、平均时长、最长时长情况，显示与所有用户整体时长情况的偏差。不足一分钟按一分钟算。" className="marginBottom12">
                    <div className='label'>{config.name}服务时长</div>
                </HoverTip>
                <div className='box'>
                    <div className='item'>
                        <p className='label'>咨询时长</p>
                        <p className='number limit-one'>
                            {formatSeconds(wrapperData.totalConsultTime).h > 0 && <span>{formatSeconds(wrapperData.totalConsultTime).h}<span className='small-label'>小时</span></span>}
                            {(formatSeconds(wrapperData.totalConsultTime).h == 0 || formatSeconds(wrapperData.totalConsultTime).m > 0) && <span>{formatSeconds(wrapperData.totalConsultTime).m || '0'}<span className='small-label'>分钟</span></span> }
                        </p>
                        <div
                            className={`average ${getCss(wrapperData.totalConsultTime, wrapperData.totalConsultTimeAverage)}`}>
                            <span>较均值</span>
                            <img className='icon up' src={up_icon} />
                            <img className='icon down' src={down_icon} />
                            <span
                                className='average-number'>{formatSeconds(formatNum(wrapperData.totalConsultTime, wrapperData.totalConsultTimeAverage)).res}</span>
                        </div>
                    </div>

                    <div className='item'>
                        <p className='label'>平均时长</p>
                        <p className='number'>
                            {formatSeconds(wrapperData.averageConsultTime).h > 0 && <span>{formatSeconds(wrapperData.averageConsultTime).h}<span className='small-label'>小时</span></span>}
                            {(formatSeconds(wrapperData.averageConsultTime).h == 0 || formatSeconds(wrapperData.averageConsultTime).m > 0) && <span>{formatSeconds(wrapperData.averageConsultTime).m || '0'}<span className='small-label'>分钟</span></span> }
                        </p>
                        <div
                            className={`average ${getCss(wrapperData.averageConsultTime, wrapperData.averageConsultTimeAverage)}`}>
                            <span>较均值</span>
                            <img className='icon up' src={up_icon} />
                            <img className='icon down' src={down_icon} />
                            <span
                                className='average-number'>{formatSeconds(formatNum(wrapperData.averageConsultTime, wrapperData.averageConsultTimeAverage)).res}</span>
                        </div>
                    </div>

                    <div className='item'>
                        <p className='label'>最长咨询时长</p>
                        <p className='number'>
                            {formatSeconds(wrapperData.maxConsultTime).h > 0 && <span>{formatSeconds(wrapperData.maxConsultTime).h}<span className='small-label'>小时</span></span>}
                            {(formatSeconds(wrapperData.maxConsultTime).h == 0 || formatSeconds(wrapperData.maxConsultTime).m > 0) && <span>{formatSeconds(wrapperData.maxConsultTime).m || '0'}<span className='small-label'>分钟</span></span> }
                        </p>
                        <div
                            className={`average ${getCss(wrapperData.maxConsultTime, wrapperData.maxConsultTimeAverage)}`}>
                            <span>较均值</span>
                            <img className='icon up' src={up_icon} />
                            <img className='icon down' src={down_icon} />
                            <span
                                className='average-number'>{formatSeconds(formatNum(wrapperData.maxConsultTime, wrapperData.maxConsultTimeAverage)).res}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

    return userDetail ? <div className='user-detail'>
        <Breadcrumb style={{ marginBottom: '20px' }}>
            <Breadcrumb.Item onClick={() => history.push('/dataStatisticsManage/consultUserList')}>咨询用户画像</Breadcrumb.Item>
            <Breadcrumb.Item >{userDetail.name || userDetail.mobile || '默认名称'}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="top-tab">
            {yearList && yearList.length > 0 &&
                <Tabs onChange={(value) => setCurrentYear(value)}>
                    {yearList.map(item => <TabPane tab={`${item.year}年度`} key={item.year}></TabPane>)}
                </Tabs>
            }
        </div>
        <div className='user-info'>
            <div className='base-info'>
                <img onClick={gotoConsultList} className='head-img' src={getHeadImg()} />
                <div className='name-box'>
                    <div className='name'>
                        <p>{userDetail.name || userDetail.mobile}</p>
                        <span>{getLevel()}</span>
                    </div>
                    <div className='phone-qq-sex'>
                        {userDetail.mobile &&
                            <div className='item'>电话：{userDetail.mobile}</div>
                        }
                        {userDetail.qq &&
                            <div className='item'>QQ：{userDetail.qq}</div>
                        }
                        {userDetail.male && <div className='item'>性别：{userDetail.male}</div>}
                    </div>
                </div>
            </div>
            <div className='tag-list'>
                <div className='tag-list-content' ref={userInfoTagRef}>
                    {!showMore && <div className='box'>
                        {userInfoTag.map((arr, arrIndex) => {
                            return <div className='box-item' key={arrIndex}>
                                {arr.map((item, itemIndex) => {
                                    return <div className='tag-item' key={itemIndex + item.label}>
                                        <div className='label'>
                                            <div className='line'></div>
                                            <div className='text'>{item.label}</div>
                                        </div>
                                        {item.value && item.value.length > 0 &&
                                            <div className='list'>{Array.isArray(item.value) && item.value.map((value, valueIndex) => {
                                                if (item.showPover && valueIndex === 0) {
                                                    return <Popover
                                                        overlayClassName={classNames("list-pop-class", item.key)} 
                                                        key={valueIndex + value}
                                                        content={<div className='__tag_item_popover-wrapper'>
                                                            {item.showIcon && <img className="item_popover-img" src={companyImg}/>}
                                                            <div className='__tag_item_popover'>
                                                                {item.popover.map((popover, popoverIndex) => {
                                                                    return popover
                                                                })}
                                                            </div></div>}
                                                    >
                                                        <div className='tag point' key={valueIndex + value}>{value}</div>
                                                    </Popover>
                                                }
                                                return <div className='tag' key={valueIndex + value}>{value}</div>
                                            })}</div>
                                        }
                                    </div>
                                })}
                            </div>
                        })}
                    </div>}
                    {showMore && <div className='single-box'>
                        {userInfoTag.map((item, itemIndex) => {
                            if (itemIndex > 2 && !isMore) return null
                            return <div className='tag-item' key={itemIndex + item.label}>
                                <div className='label'>
                                    <div className='line'></div>
                                    <div className='text'>{item.label}</div>
                                </div>
                                <div className='list'>{Array.isArray(item.value) && item.value.map((value, valueIndex) => {
                                    if (item.showPover && valueIndex === 0) {
                                        return <Popover
                                            overlayClassName={classNames("list-pop-class", item.key)} 
                                            key={valueIndex + value}
                                            content={<div className='__tag_item_popover-wrapper'>
                                                {item.showIcon && <img className="item_popover-img" src={companyImg}/>}
                                                <div className='__tag_item_popover'>
                                                    {item.popover.map((popover, popoverIndex) => {
                                                        return popover
                                                    })}
                                                </div></div>}
                                        >
                                            <div className='tag point' key={valueIndex + value}>{value}</div>
                                        </Popover>
                                    }
                                    return <div className='tag' key={valueIndex + value}>{value}</div>
                                })}</div>
                            </div>
                        })}
                    </div>}
                </div>
            </div>
            {showMore && <div className='show-more' onClick={() => {
                setIsMore(!isMore)
            }}>{isMore ? '收起' : '查看更多'}<Icon type={`${isMore ? 'single-up-arrow' : 'single-down-arrow'}`} /></div>
            }
        </div>
        <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} className="data-analys-tabs">
            <TabPane key="cszx" tab="财税咨询">
                {renderConsultAnalysTabData(userDetail)}
                <div className='question'>
                    <div className='tag'>
                        <HoverTip tipText="显示当前用户本年度的识别出问题类型的财税咨询量。不包含未识别出问题类型的财税咨询记录。">
                            <div className={'title'}>业务范围</div>
                        </HoverTip>
                        <div className='content' ref={tagRef}></div>
                    </div>

                    <div className='sub-tag'>
                        <div className={'title'}>问题类型<img className='jiantou' src={arrowImg} />{currentTag.name || '财税'}</div>
                        {subTagList.length > 0 &&
                            <div className='content' ref={subRagRef}></div>
                        }
                        {subTagList.length == 0 &&
                            <div className='empty-data'>
                                <img className="img" src={no_empty} />
                                <div className="sub-text">当前暂无数据</div>
                            </div>
                        }
                    </div>

                    <div className='question-list'>
                        <div className={'title'}>问题列表</div>
                        {consultList.length > 0 &&
                            <div className='content'>
                                {consultList.map((item, index) => {
                                    let showText = ''
                                    if (item.scene) {
                                        showText += `在${item.scene}时，`
                                    }
                                    showText += `问了一个`
                                    if(item.business && item.questionType)  {
                                        showText += `${item.business + '的'}${item.questionType}`
                                    }else if(item.business || item.questionType) {
                                        showText += (item.business || '' ) + (item.questionType || '') + '的'
                                    }

                                    showText += `问题：${item.userQuestion}`
                                    return <div className={`question-item ${index === 0 ? 'active' : ''}`} key={item.consultDate + item.userQuestion + index}>
                                        <div className='dot'>
                                            <div className='dot-icon'></div>
                                        </div>
                                        <div className='question-content' onClick={gotoConsultList}>
                                            <div className='time'>{item.consultDate}</div>
                                            <div className='user-question'>{showText}</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        }
                        {consultList.length == 0 &&
                            <div className='empty-data'>
                                <img className="img" src={no_empty} />
                                <div className="sub-text">当前暂无数据</div>
                            </div>
                        }
                    </div>

                </div>
            </TabPane>
            <TabPane key="bszx" tab="办税咨询">
                {renderConsultAnalysTabData(userDetail?.personaTaxConsultStatistics)}
                <div className='question empty'>
                    <img src={emptyImg} />
                    功能开发中，敬请期待～～
                </div>
            </TabPane>
        </Tabs>
    </div> : null
}