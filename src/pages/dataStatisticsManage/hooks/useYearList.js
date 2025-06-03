import React, {useState, useEffect, useRef} from "react";
import moment from 'moment'
import { get } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import {useStoreState, useStoreActions} from "easy-peasy";


export default function useYearList(params = {}) {
    const { needYearList = true } = params

    const storeYearList = useStoreState(
        (state) => state.dataStatisticsManage.yearList
    )
    
    const setStoreYearList = useStoreActions(
        (actions) => actions.dataStatisticsManage.setYearList
    );
    if(needYearList && (!storeYearList || storeYearList.length == 0)) {
        get({
            url: Api.getDmConsultGetYearTag,
        }).then(data => {
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                const array = data.data
                setStoreYearList(array)
            }
        })
    }

    function getYearStartEnd(currentYear) {
        const year = currentYear ? moment().year(currentYear) : moment() //currentYear

        if(year.isSame(moment(),'year')) {//当年
            const momentYear = currentYear ? moment().year(currentYear) : moment() 
            return {
                startDate: momentYear.month(0).date(1).format('YYYY-MM-DD'),
                endDate: currentYear ? moment().year(currentYear).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            }

        }else {
            return {
                startDate: year.month(0).date(1).format('YYYY-MM-DD'),
                endDate: year.endOf('year').format('YYYY-MM-DD'),
    
            }
        }
    }

    return {
        yearList: storeYearList,
        getYearStartEnd
    }
}