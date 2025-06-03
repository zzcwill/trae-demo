import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Select, Button } from "dpl-react";
import classnames from "classnames";

/**
 * 默认配置
 */
const defaultDataSourceConfig = {
    label: "label",
    value: "value",
};

function AllSelect(props) {
    const {
        value,
        onChange,
        dataSource = [],
        dataSourceConfig = defaultDataSourceConfig,
        className,
        style,
        isShowAllOption = false,
        ...otherProps
    } = props;

    const bodyClassName = classnames({
        "all-select-box": true,
        [className]: className,
    });

    const [list, setList] = useState([]);
    const [selectValue, setSelectValue] = useState(undefined);

    // 数据修改
    const valueOnChange = (data) => {
        onChange && onChange(data);
    };

    /**
     * 选择全部
     */
    const selectAll = () => {
        let result = [];
        list.forEach((item) => {
            result.push(item[defaultDataSourceConfig.value]);
        });
        valueOnChange(result);
    };

    /**
     * 删除全部
     */
    const deleteAll = () => {
        valueOnChange([]);
    };

    useEffect(() => {
        if (Array.isArray(dataSource)) {
            setList(dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        setSelectValue(value);
    }, [value]);

    return (
        <div className={bodyClassName} style={style}>
            <div>
                <Select
                    value={selectValue}
                    onChange={valueOnChange}
                    {...otherProps}
                >
                    {Array.isArray(list) &&
                        list.map((item, index) => {
                            return (
                                <Select.Option
                                    value={item[defaultDataSourceConfig.value]}
                                    key={`${
                                        item[defaultDataSourceConfig.value]
                                    }${index}`}
                                >
                                    {item[defaultDataSourceConfig.label]}
                                </Select.Option>
                            );
                        })}
                </Select>
            </div>
            {isShowAllOption && (
                <div>
                    <Button type="primary" size="small" onClick={selectAll}>
                        一键全选
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        style={{ marginLeft: 10 }}
                        onClick={deleteAll}
                    >
                        一键删除
                    </Button>
                </div>
            )}
        </div>
    );
}

export default AllSelect;
