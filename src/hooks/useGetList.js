import React, {useState, useEffect} from "react";
import qs from "qs";
import {get} from "@/request/request";
import {message} from "dpl-react";

export default function (url, listFormat, paramsFormat, beforeQuery) {
    const [params, setParams] = useState(() => {
        return Object.assign(
            {
                pageSize: 10,
                pageIndex: 1
            },
            qs.parse(window.location.href.split("?")[1])
        );
    });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const getList = async () => {
        const queryParam = beforeQuery && (await beforeQuery(params));
        if (queryParam) {
            setParams(queryParam);
            return;
        }
        setLoading(true);
        const paramsData = paramsFormat ? paramsFormat(params) : params;
        const data = await get({url: url, params: paramsData});
        setLoading(false);
        if (data.success) {
            setTotal(data.data.total);
            const formatList = listFormat && listFormat(data.data.list);
            setList(formatList ? formatList : data.data.list);
        } else {
            message.error(data.message);
        }
    };
    const changeParams = (params, force = false) => {
        let hash = window.location.href.split("#")[1];
        hash = hash.split("?")[0];
        const oldLocation = "#" + window.location.href.split("#")[1];
        const newLocation = `#${hash}?${qs.stringify(params)}`;
        window.location.hash = newLocation;
        if (force && oldLocation === newLocation) {
            // url没改变，但是需要强制刷新
            getList();
        }
    };
    useEffect(() => {
        getList();
    }, [params]);
    useEffect(() => {
        const hashChange = () => {
            setParams(
                Object.assign(
                    {
                        pageSize: 10,
                        pageIndex: 1
                    },
                    qs.parse(window.location.href.split("?")[1])
                )
            );
        };
        window.addEventListener("hashchange", hashChange);
        return () => {
            window.removeEventListener("hashchange", hashChange);
        };
    }, []);

    return {
        params,
        getList,
        loading,
        total,
        changeParams,
        list
    };
}

