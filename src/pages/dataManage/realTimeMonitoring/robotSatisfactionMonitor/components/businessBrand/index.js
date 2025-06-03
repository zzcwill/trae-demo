import React, { useState, useEffect, useRef } from "react";
import { Select } from "dpl-react";
import "./index.scss";

function BusinessBrand(props) {
    const { value, onChange, options = [], style } = props;
    const [brandList, setBrandList] = useState([]);

    /**
     * 业务类型改变
     */
    const businessOnChange = (data) => {
        onChange({
            brandType: data,
            brandValues: [],
        });
    };

    /**
     * 产品维度改变
     */
    const brandOnChange = (data) => {
        onChange({
            brandType: value.brandType,
            brandValues: [].concat(data),
        });
    };

    useEffect(() => {
        console.log(value);
        if (
            value &&
            (value.brandType || value.brandType === 0) &&
            Array.isArray(options)
        ) {
            let result = [];
            if (value.brandType === "all") {
                options.forEach((item) => {
                    if (
                        Array.isArray(item.children) &&
                        item.children.length > 0
                    ) {
                        result = result.concat(item.children);
                    }
                });
            } else {
                for (let i = 0, len = options.length; i < len; i++) {
                    const item = options[i];
                    if (item.id === value.brandType) {
                        result = item.children;
                    }
                }
            }
            setBrandList(result);
        }
    }, [value, options]);

    return (
        <div className="multiple-select" style={style}>
            <Select
                placeholder="请选择业务类型"
                value={value?.brandType}
                onChange={businessOnChange}
                id="productType"
                getPopupContainer={() => document.getElementById("productType")}
                style={{ width: "130px" }}
            >
                <Select.Option key="all" value="all">
                    全部
                </Select.Option>
                {options.length > 0 &&
                    options.map((type) => {
                        return (
                            <Select.Option key={type.value} value={type.value}>
                                {type.label}
                            </Select.Option>
                        );
                    })}
            </Select>
            <Select
                mode="multiple"
                id="multiple"
                allowClear
                optionFilterProp="children"
                value={value?.brandValues}
                maxTagCount={1}
                maxTagTextLength={100}
                onChange={brandOnChange}
                placeholder="请选择产品维度"
                getPopupContainer={() => document.getElementById("multiple")}
                style={{ width: `calc( 100% - 130px )` }}
            >
                {brandList.length > 0 &&
                    brandList.map((item) => {
                        return (
                            <Select.Option key={item.value} value={item.value}>
                                {item.label}
                            </Select.Option>
                        );
                    })}
            </Select>
        </div>
    );
}
export default BusinessBrand;
