import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Button, Table, message, Modal, Input } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import AddEvent from "./component/addEvent";
import { makeUUID } from "@/utils/index";
import { createDndContext, DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { olhelpEnumOptionType, workGroupType } from "@/const/config";

const type = "DragableBodyRow";

function DragableBodyRow(props) {
    const {
        className,
        style,
        moveRow,
        index,
        currentMatter,
        onDragStart,
        startDragItemRef,
        ...restProps
    } = props;
    const ref = React.useRef(null);
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            let isOver = false;
            if (
                startDragItemRef.current &&
                (startDragItemRef.current.matterId ||
                    startDragItemRef.current.matterId === 0)
            ) {
                //解决跨表格拖拽
                isOver =
                    monitor.isOver() &&
                    (currentMatter.id || currentMatter.id === 0) &&
                    startDragItemRef.current.id === currentMatter.id &&
                    (currentMatter.matterId || currentMatter.matterId === 0) &&
                    startDragItemRef.current.matterId !==
                        currentMatter.matterId;
            } else {
                isOver =
                    monitor.isOver() &&
                    !currentMatter.matterId &&
                    currentMatter.matterId !== 0;
            }
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: isOver,
                dropClassName:
                    dragIndex < index
                        ? " drop-over-downward"
                        : " drop-over-upward",
            };
        },
        drop: (item) => {
            moveRow(startDragItemRef.current, currentMatter);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", ...style }}
            {...restProps}
            onDragStart={onDragStart}
        />
    );
}

const isShowMap = {
    Y: "显示组",
    N: "不显示组",
};
const RNDContext = createDndContext(HTML5Backend);
export default function ConsultMatterSetting(props) {
    const [list, setList] = useState([]);
    const [tableOffsetTop, setTableOffsetTop] = useState(0);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [currentEditGroup, setCurrentEditGroup] = useState({});
    const [addGroupFlag, setAddGroupFlag] = useState(true);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [inCallGroupList, setInCallGroupList] = useState([]); // 来电业务组列表
    const [inCallGroupMap, setInCallGroupMap] = useState({}); // 来电业务组Map
    const startDragItem = useRef(null);
    const manager = useRef(RNDContext);
    const columns = [
        {
            title: "咨询事项分组",
            dataIndex: "groupName",
            ellipsis: true,
            width: "20%",
        },
        {
            title: "所属地区",
            dataIndex: "areaName",
            width: "15%",
            ellipsis: true,
        },
        {
            title: "组信息",
            dataIndex: "incallGroupsList",
            width: "10%",
            ellipsis: true,
            render(text, record, index) {
                if (typeof record.matterId === "undefined") {
                    const groupNameList = [];
                    // TODO
                    if (Array.isArray(text)) {
                        text.forEach((item) => {
                            groupNameList.push(item.skillGroupName);
                        });
                    }
                    return (
                        <span className="table-group-info">
                            {groupNameList.length > 0 && (
                                <>
                                    <span className="table-group-info-title">
                                        {isShowMap[record.isShowIncall] ||
                                            isShowMap["N"]}
                                    </span>
                                    <span title={groupNameList.join(",")}>
                                        {text.length}
                                    </span>
                                </>
                            )}
                        </span>
                    );
                }
            },
        },
        {
            title: "咨询事项名称",
            dataIndex: "matterName",
            ellipsis: true,
            width: "35%",
            render(text, record, index) {
                return (
                    <div className="matter-name">
                        {record.editFlag ? (
                            <div>
                                <Input
                                    value={record.editMatterName}
                                    maxLength={100}
                                    onChange={(e) => {
                                        record.editMatterName = e.target.value;
                                        setList([...list]);
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                className="matter-name-wrap"
                                title={record.matterName}
                            >
                                {record.matterName}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            title: "操作",
            width: "20%",
            ellipsis: true,
            render(text, record, index) {
                if (typeof record.matterId !== "undefined") {
                    return (
                        <div className="operation">
                            {!record.editFlag ? (
                                <>
                                    <div
                                        className="item"
                                        onClick={() => {
                                            const children =
                                                record.parent.children;
                                            record.parent.children =
                                                children.filter((item) => {
                                                    return item.matterId
                                                        ? true
                                                        : false;
                                                });
                                            record.editFlag = true;
                                            setList([...list]);
                                        }}
                                    >
                                        编辑
                                    </div>
                                    <div
                                        className="item"
                                        onClick={() => {
                                            deleteEvent(record);
                                        }}
                                    >
                                        删除
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="item"
                                        onClick={() => {
                                            editEvent(record);
                                        }}
                                    >
                                        保存
                                    </div>
                                    <div
                                        className="item"
                                        onClick={() => {
                                            if (!record.matterId) {
                                                // 是新增类型，取消的话直接删除
                                                const children =
                                                    record.parent.children;
                                                children.splice(
                                                    children.indexOf(record),
                                                    1
                                                );
                                                if (children.length === 0) {
                                                    record.parent.children =
                                                        undefined;
                                                }
                                            }
                                            record.editFlag = false;
                                            record.editMatterName =
                                                record.matterName;
                                            setList([...list]);
                                        }}
                                    >
                                        取消
                                    </div>
                                </>
                            )}
                        </div>
                    );
                }
                return (
                    <div className="operation">
                        <div
                            className="item"
                            onClick={() => {
                                addEvent(record);
                            }}
                        >
                            添加咨询事项
                        </div>
                        <div
                            className="item"
                            onClick={() => {
                                editEventGroup(record);
                            }}
                        >
                            编辑
                        </div>
                        <div
                            className="item"
                            onClick={() => {
                                deleteEventGroup(record);
                            }}
                        >
                            删除
                        </div>
                    </div>
                );
            },
        },
    ];

    const components = {
        body: {
            row: DragableBodyRow,
        },
    };

    /**
     * 获取业务组信息
     */
    const getGroupList = async (type) => {
        const map = {
            [workGroupType.call]: (list, map) => {
                setInCallGroupList(list);
                setInCallGroupMap(map);
            },
        };
        const res = await get({
            url: Api.getWorkGroupList,
            params: {
                type,
            },
        });
        if (res.success) {
            const data = res.data;
            let obj = {};
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    obj[item.id] = item.name;
                });
            }
            map[type] && map[type](data, obj);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取来电组信息
     */
    const getInCallGroupList = () => {
        getGroupList(workGroupType.call);
    };

    const getList = async () => {
        const data = await get({ url: Api.getConsultMatterGroupList });
        if (data.success) {
            let list = data.data || data.list;
            list.forEach((item) => {
                item.editFlag = false;
                item.key = item.id;
                item.areaName = item.areaList
                    .map((area) => area.name)
                    .join(",");
                let children = [];
                item.consultMatterList.forEach((matter) => {
                    children.push({
                        matterName: matter.content,
                        matterId: matter.id,
                        id: item.id,
                        key: item.id + "_" + matter.id,
                        editFlag: false,
                        editMatterName: matter.content,
                        parent: item,
                        orderNum: matter.orderNum,
                    });
                });
                if (children.length > 0) {
                    item.children = children;
                }
            });
            setList(list);
        }
    };

    const addEventGroup = async (data) => {
        if (addGroupFlag) {
        } else {
            data.id = currentEditGroup.id;
        }
        let url = addGroupFlag
            ? Api.saveConsultMatterGroup
            : Api.updateConsultMatterGroup;
        /* if (typeof data.groupName === 'string') {
      data.groupName = data.groupName.trim()
    }*/

        const response = await post({ url, data });
        if (response.success) {
            await getList();
            message.success(
                addGroupFlag ? "新增咨询事项分组成功" : "编辑咨询事项成功"
            );
            setShowAddEvent(false);
        } else {
            message.error(response.message);
        }
    };

    const editEventGroup = (item) => {
        let inCallGroupList = [];
        if (Array.isArray(item.incallGroupsList)) {
            item.incallGroupsList.forEach((item) => {
                if (item.skillGroupId || item.skillGroupId === 0) {
                    if (inCallGroupMap[item.skillGroupId]) {
                        inCallGroupList.push(item.skillGroupId);
                    }
                }
            });
        }
        // 编辑咨询事项分组
        setCurrentEditGroup({
            groupName: item.groupName,
            id: item.id,
            inCallGroupList,
            isShowInCall: item.isShowIncall,
            areaCodeList: item.areaList.map((item) => item.id),
        });
        setAddGroupFlag(false);
        setShowAddEvent(true);
    };

    const deleteEventGroup = (item) => {
        Modal.confirm({
            title: "确认",
            content: "确认删除该咨询事项分组吗",
            onOk: async () => {
                const response = await post({
                    url: Api.deleteConsultMatterGroup,
                    data: { id: item.id },
                });
                if (response.success) {
                    await getList();
                    message.success("删除成功");
                } else {
                    message.error(response.message);
                }
            },
        });
    };

    const addEvent = (item) => {
        // 新增咨询事项
        item.consultMatterList.push({ id: null, name: "" });
        if (!item.children) item.children = [];
        item.children.push({
            id: item.id,
            key: makeUUID(),
            matterId: null,
            matterName: "",
            editFlag: true,
            editMatterName: "",
            parent: item,
        });
        setList([...list]);
        if (expandedRowKeys.indexOf(item.id) < 0) {
            setExpandedRowKeys([item.id, ...expandedRowKeys]);
        }
    };

    const editEvent = async (item) => {
        //编辑咨询事项保存
        let data = { content: item.editMatterName.trim(), groupId: item.id };
        let url = Api.saveConsultMatterContent;
        const isEdit = item.matterId !== null;
        if (!data.content) {
            message.error("咨询事项内容不能为空");
            return;
        }
        if (isEdit) {
            // 编辑时
            data.id = item.matterId;
            url = Api.updateConsultMatterContent;
        }
        const response = await post({ url, data });
        if (response.success) {
            await getList();
            message.success(isEdit ? "编辑成功" : "新增成功");
        } else {
            message.error(response.message);
        }
    };

    const deleteEvent = (item) => {
        Modal.confirm({
            title: "确定",
            content: "确定删除该咨询事项配置吗",
            onOk: async () => {
                const response = await post({
                    url: Api.deleteConsultMatterContent,
                    data: { id: item.matterId },
                });
                if (response.success) {
                    await getList();
                    message.success("删除成功");
                } else {
                    message.error(response.message);
                }
            },
        });
    };

    const onExpand = (expanded, record) => {
        // 点击展开按钮
        let result = [];
        if (expanded) {
            if (expandedRowKeys.indexOf(record.id) < 0) {
                expandedRowKeys.push(record.id);
                setExpandedRowKeys([...expandedRowKeys]);
            }
        } else {
            result = expandedRowKeys.filter((item) => {
                return item !== record.id;
            });
            setExpandedRowKeys(result);
        }
    };

    const tableWrapRef = useRef(null);
    const getTableOffsetTop = () => {
        let top = tableWrapRef.current.getBoundingClientRect().top;
        setTableOffsetTop(document.documentElement.clientHeight - top - 74);
    };

    /**
     * 事项排序
     */
    const matterSort = async (url, data) => {
        const res = await post({
            url,
            data,
        });
        if (res.success) {
            getList();
        } else {
            message.error(res.message);
        }
    };

    const moveRow = (startItem, endItem) => {
        // 说明是组内移动
        if (startItem.matterId || startItem.matterId === 0) {
            if (
                startItem.id === endItem.id &&
                (endItem.matterId || endItem.matterId === 0) &&
                startItem.matterId !== endItem.matterId
            ) {
                const sendData = {
                    id: startItem.matterId,
                    targetOrderNum: endItem.orderNum,
                };
                matterSort(Api.postConsultMatterContentSort, sendData);
            }
        } else {
            if (!endItem.matterId && endItem.matterId !== 0) {
                const sendData = {
                    id: startItem.id,
                    targetOrderNum: endItem.orderNum,
                };
                matterSort(Api.postConsultMatterGroupSort, sendData);
            }
        }
    };
    useEffect(() => {
        getList();
        getTableOffsetTop();
        getInCallGroupList();
    }, []);
    return (
        <div className="consult-event-config">
            <Button
                type="primary"
                onClick={() => {
                    setCurrentEditGroup({});
                    setAddGroupFlag(true);
                    setShowAddEvent(true);
                }}
            >
                新增分组
            </Button>
            <div className="table-wrap" ref={tableWrapRef}>
                <DndProvider manager={manager.current.dragDropManager}>
                    <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={"key"}
                        pagination={false}
                        scroll={{ y: tableOffsetTop }}
                        expandedRowKeys={expandedRowKeys}
                        onExpand={onExpand}
                        components={components}
                        onRow={(record, index) => ({
                            currentMatter: record,
                            startDragItemRef: startDragItem,
                            index,
                            onDragStart() {
                                startDragItem.current = record;
                            },
                            moveRow: moveRow,
                        })}
                    />
                </DndProvider>
            </div>
            <AddEvent
                visible={showAddEvent}
                title={addGroupFlag ? "新增咨询事项分组" : "修改咨询事项分组"}
                onCancel={() => {
                    setShowAddEvent(false);
                }}
                inCallGroupList={inCallGroupList}
                onOk={addEventGroup}
                formData={currentEditGroup}
            />
        </div>
    );
}
