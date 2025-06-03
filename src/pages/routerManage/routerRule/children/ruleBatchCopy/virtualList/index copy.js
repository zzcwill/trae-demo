import { Form, Input } from 'dpl-react';
import { useState, useMemo, useEffect, useRef } from 'react'
import { SuperVirtualList } from "yh-react-virtuallist";

function VirtualList({
    children,
    ...rest
}) {
    const props = rest?.props?.['x-component-props'] || rest;
    const { list = '', itemHeight, renderItem } = props;
    const scrollRef = useRef(null);
    return (
        <div className="virtual-list" ref={scrollRef}>
            <SuperVirtualList
                scrollDom={scrollRef}
                referItemHeight={itemHeight}
                renderNumber={30}
            >
                {list.map((item, index) => (
                    <div
                        key={item}
                        className="item"
                        style={{ height: itemHeight + "px" }}
                    >
                        {renderItem?.(item, index)}
                        {/* {<Form.Item>
                            <Input name={`aaa${item}`} value={item}/>
                        </Form.Item>} */}
                    </div>
                ))}
            </SuperVirtualList>
        </div>
    );
}

export default VirtualList