import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import classnames from "classnames";
import uploadFile from "@/utils/uploadFile";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Icon, message, Switch } from "dpl-react";
const accept = ".jpeg,.png,.jpg";
function formatImageUrl(data) {
    let url = data.domain + data.imageUrl;
    return url;
}
// 去除white标识
function replaceWhite(url) {
    let result = "";
    if (url && typeof url === "string") {
        result = url.replace(/(\-white)/, "");
    }
    return result;
}
// 添加white标识
function addWhite(url) {
    let result = url || "";
    if (url && typeof url === "string") {
        result = result.replace(/(\.(jpeg|png|jpg))$/, "-white$1");
    }
    return result;
}

function IconSelect(props) {
    const {
        value,
        onChange,
        className,
        style,
        iconList = [],
        disabled = false,
        fileSize = 1,
    } = props;
    const [iconSelectList, setIconSelectList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [colorType, setColorType] = useState(false);
    const colorTypeRef = useRef(false);
    const currentItem = useRef(null);
    const bodyClass = classnames({
        "icon-select-box": true,
        [className]: className,
    });

    /**
     * iconItem 的样式
     */
    const iconItemClass = (item) => {
        return classnames({
            "icon-item": true,
            "icon-item-current": item.label === replaceWhite(value),
        });
    };

    // 删除样式
    const deleteClassNames = () => {
        return classnames({
            "icon-delete": true,
        });
    };

    // 预览icon
    const previewIconClassNames = (flag) => {
        return classnames({
            "preview-img-box": true,
            "preview-no-img": !flag,
            "preview-img": flag,
        });
    };

    /**
     * 选择icon
     */
    const selectIcon = (item) => {
        let result = item.label;
        currentItem.current = item;
        if (!item.isAdd && colorTypeRef.current) {
            result = addWhite(item.label);
            if (result === value) {
                result = "";
                currentItem.current = null;
            }
        }
        if (result === value) {
            result = "";
            currentItem.current = null;
        }
        onChange && onChange(result);
    };

    /**
     * 删除上传的icon，需要清空数据同时清空列表
     */
    const deleteAddIcon = (iconItem) => {
        let newList = [].concat(iconSelectList);
        newList.pop();
        setIconSelectList(newList);
        // 如果当前数据是上传的图片，则需要设置数据为空
        if (iconItem.label === value) {
            onChange && onChange("");
        }
    };

    /**
     * 图片格式校验
     * @param {File} file
     */
    const onImgChange = (file) => {
        const picture = file[0];
        const acceptList = ["image/png", "image/jpg", "image/jpeg"];
        if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
            message.error("图片格式不正确");
            return false;
        }
        if (picture.size > fileSize * 1024 * 1024) {
            message.error("图片大小超过" + fileSize + "M");
            return false;
        }
        setLoading(true);
        return true;
    };

    /**
     * 上传图片
     */
    const uploadIcon = async () => {
        if (disabled) {
            return;
        }
        if (loading) return;
        try {
            const res = await uploadFile(
                Api.postSaveImage,
                onImgChange,
                accept
            ).finally(() => {
                setLoading(false);
            });
            if (res.success) {
                const data = res.data;
                const imageUrl = formatImageUrl(data);

                onChange && onChange(imageUrl);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const colorTypeOnChange = (val) => {
        colorTypeRef.current = val;
        currentItem.current && selectIcon(currentItem.current);
        setColorType(val);
    };

    useEffect(() => {
        if (Array.isArray(iconList)) {
            let newList = [].concat(iconSelectList);
            if (Array.isArray(newList) && !newList.length) {
                newList = [].concat(iconList);
            }
            if (value) {
                const noWhiteValue = replaceWhite(value);
                
                let hasExist = false;
                for (let i = 0, len = newList.length; i < len; i++) {
                    const item = newList[i];
                    if (item.label === noWhiteValue) {
                        hasExist = true;
                        currentItem.current = item
                        break;
                    }
                }
                if (!hasExist) {
                    newList.push({
                        value: newList.length,
                        label: value,
                        isAdd: true,
                    });
                }
                if(noWhiteValue !== value){
                  colorTypeRef.current = true
                  setColorType(true)
                }
            }           
            setIconSelectList(newList);
        }
    }, [iconList, value]);
    return (
        <div className={bodyClass} style={style}>
            <div className="icon-color-type-box">
                <Switch
                    checkedChildren="浅色"
                    unCheckedChildren="深色"
                    checked={colorType}
                    onChange={colorTypeOnChange}
                />
                <span className='icon-color-text'>该配置只对默认的icon图标有效</span>
            </div>
            <div className="content">
                <div className="select-box">
                    <div className="default-icon-box">
                        {iconSelectList.length > 0 &&
                            iconSelectList.map((iconItem) => {
                                return (
                                    <div
                                        className={iconItemClass(iconItem)}
                                        onClick={() => {
                                            selectIcon(iconItem);
                                        }}
                                    >
                                        <img src={iconItem.label} />
                                        {iconItem.isAdd && (
                                            <div className="right-up-box">
                                                <Icon
                                                    type="circle-error-o"
                                                    className={deleteClassNames()}
                                                    onClick={() => {
                                                        deleteAddIcon(iconItem);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                    <div className="add-icon-box">
                        <div
                            className="add-icon-button"
                            onClick={() => {
                                uploadIcon();
                            }}
                        >
                            上传图片
                        </div>
                    </div>
                </div>
                <div className="show-box">
                    <div className="show-box-tip">当前选中图片</div>
                    <div className={previewIconClassNames(value)}>
                        {value && <img src={replaceWhite(value)} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IconSelect;
