import React from "react";
import { Select } from "dpl-react";
import { productType } from "@/const/index";
import "./index.scss";
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productType: "all", // 产品类型
            productTypeList: [], // 当前提供选择的产品维度列表
            productSelectList: [], // 选择的产品大类
        };
        this.typeChange = this.typeChange.bind(this);
        this.productSelectChange = this.productSelectChange.bind(this);
    }

    /**
     * 产品类型修改回调
     * @param {String} value
     */
    typeChange(value) {
        this.props.onChange({
            brandTypeId: value,
            brand: [],
        });
    }

    /**
     * 产品维度选择修改
     */
    productSelectChange(value) {
        this.props.onChange({
            brandTypeId: this.state.productType,
            brand: [].concat(value),
        });
    }

    /**
     * state更新生命周期
     * @param {Object} props
     * @memberof Product
     */
    static getDerivedStateFromProps(props, prevState) {
        const { options, value } = props;
        let result = [];
        if (value.brandTypeId === "all") {
            options.forEach((item) => {
                if (Array.isArray(item.children) && item.children.length > 0) {
                    result = result.concat(item.children);
                }
            });
        } else {
            for (let i = 0, len = options.length; i < len; i++) {
                const item = options[i];
                if (item.id === value.brandTypeId) {
                    result = item.children;
                }
            }
        }
        return {
            productType: value.brandTypeId, // 产品类型
            productSelectList: value.brand, // 当前提供选择的产品维度列表
            productTypeList: result,
        };
    }

    render() {
        const { firstPlaceholder = "请选择", options } = this.props;
        return (
            <div className="multiple-select">
                <Select
                    placeholder={firstPlaceholder}
                    value={this.state.productType}
                    onChange={this.typeChange}
                    id="productType"
                    getPopupContainer={() =>
                        document.getElementById("productType")
                    }
                    style={{ width: "90px" }}
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
                    value={this.state.productSelectList}
                    maxTagCount={0}
                    maxTagTextLength={100}
                    onChange={this.productSelectChange}
                    placeholder="请选择产品维度"
                    getPopupContainer={() =>
                        document.getElementById("multiple")
                    }
                    style={{ width: `calc( 100% - 90px )` }}
                >
                    {this.state.productTypeList.length > 0 &&
                        this.state.productTypeList.map((item) => {
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
}

export default Product;
