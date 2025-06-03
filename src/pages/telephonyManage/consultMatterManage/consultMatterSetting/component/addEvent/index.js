import React, {useState, useEffect} from "react";
import {Modal, Form, Input, Select} from "dpl-react";
import {get} from "@/request/request";
import Api from "@/request/api-callcentermanage";
import GroupSelect from "../groupSelect";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

// 是否展示map
const isShowMap = {
    Y: {
        id: "Y",
        name: "显示",
    },
    N: {
        id: "N",
        name: "不显示",
    },
};

const isShowList = Object.keys(isShowMap).map((key) => isShowMap[key]);

function AddEventModal(props) {
    const {
        formData = {},
        visible = true,
        title = "新增咨询事项分组",
        onCancel,
        onOk,
        form,
        inCallGroupList = []
    } = props;
    const {getFieldDecorator, setFieldsValue} = form;
    const [areaList, setAreaList] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const okHandler = () => {
        form.validateFieldsAndScroll(async (err, value) => {
            if (!err) {
                if (onOk) {
                    setConfirmLoading(true);
                    let sendData = {
                        areaCodeList: value?.areaCodeList,
                        groupName: value?.groupName,
                    }
                    if (value?.inCallGroupInfo?.groupList.length > 0) {
                        sendData.incallGroupIdList =
                            value.inCallGroupInfo.groupList;
                        sendData.isShowIncall = value.inCallGroupInfo.isShow;
                    }
                    await onOk(sendData);
                    setConfirmLoading(false);
                } else {
                    setConfirmLoading(false);
                }
            }
        });
    };
    const getAreaList = async () => {
        const response = await get({url: Api.getAreaList});
        if (response.success) {
            setAreaList([{id: "0", name: "全部"}, ...response.data]);
        }
    };
    useEffect(() => {
        getAreaList();
    }, []);
    useEffect(() => {
        setFieldsValue({
            groupName: formData.groupName,
            areaCodeList: formData.areaCodeList,
            inCallGroupInfo:{
                groupList: formData.inCallGroupList || [],
                isShow: formData.isShowInCall || isShowMap["Y"].id,
            }
        });
    }, [formData]);
    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={okHandler}
            confirmLoading={confirmLoading}
        >
            <Form>
                <FormItem label="咨询事项分组名称" {...formItemLayout}>
                    {getFieldDecorator("groupName", {
                        rules: [
                            {
                                required: true,
                                message: "请输入咨询事项分组",
                                whitespace: true,
                            },
                        ],
                        initialValue: formData.groupName,
                    })(<Input placeholder="请输入咨询事项分组" maxLength={100}/>)}
                </FormItem>
                <FormItem label="所属地区" {...formItemLayout}>
                    {getFieldDecorator("areaCodeList", {
                        rules: [{required: true, message: "请选择所属地区"}],
                        initialValue: formData.areaCodeList,
                    })(
                        <Select
                            placeholder="请选择所属地区"
                            mode={"multiple"}
                            optionFilterProp={"children"}
                        >
                            {areaList.map((item) => {
                                return (
                                    <Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="来电组的受理界面"
                    className="group-select"
                >
                    {getFieldDecorator("inCallGroupInfo", {
                        initialValue: {
                            groupList: formData.inCallGroupList || [],
                            isShow: formData.isShowInCall || isShowMap["Y"].id,
                        },
                    })(
                        <GroupSelect
                            placeholder="请选择来电组"
                            disabled={confirmLoading}
                            allowClear={true}
                            configId={formData.id}
                            modalTitle="来电业务组"
                            groupList={inCallGroupList}
                            isShowModalClear={true}
                            isShowList={isShowList}
                            isShowMap={isShowMap}
                        ></GroupSelect>
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
}

export default Form.create()(React.forwardRef(AddEventModal));
