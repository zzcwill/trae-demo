import React, { useEffect, useRef } from "react";
import "./index.scss";
import { servicesCountMap, servicesColorMap } from "@/const/index";

// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
const echarts = require('echarts/lib/echarts');
const warning = require("./images/icon-warning.png");

const defaultSeriesConfig = {
    type: "bar",
    name: "",
    label: {
        normal: {
            position: "top",
            color: "#000000",
            show: true,
        },
    },
    itemStyle: {
        normal: {
            color: "",
        },
    },
};

export default function Category(props) {
    const {
        title = "标题",
        label = [],
        data = [],
        isWarning = false,
        isExtra = false,
    } = props;
    const echartsRef = useRef(null);
    const option = {
        grid: {
            left: "30px",
            top: "20px",
            bottom: "20px",
            right: "10px",
        },
        legend: {
            show: false,
        },
        tooltip: {
            confine: true,
            // formatter:(param)=>{
            //     return param.seriesName+'：'+param.value[param.dimensionNames[param.seriesIndex+1]]
            // }
        },
        dataset: {
            dimensions: ["product"].concat(label), // 默认第一个参数配置名为
            source: data,
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            type: "value",
            // name:'数量',
            minInterval: 1,
        },
        series: label.map((item) => {
            return Object.assign({}, defaultSeriesConfig, {
                name: servicesCountMap[item],
                itemStyle: {
                    normal: {
                        color: servicesColorMap[item],
                    },
                },
            });
        }),
    };

    useEffect(() => {
        if (!isExtra) {
            const chart = echarts.init(echartsRef.current);
            chart.setOption(option);
        }
    }, []);
    return (
        <span className={`echarts-box ${!isExtra ? "" : "visibility"}`}>
            <div className="warning">
                {isWarning && <img src={warning} className="waring-img" />}
            </div>
            <div
                ref={echartsRef}
                style={{ width: "200px", height: "150px" }}
            ></div>
            <div className="title">{title}</div>
        </span>
    );
}
