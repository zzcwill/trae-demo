import { Form, Input } from 'dpl-react';
import { useState, useMemo, useEffect, useRef } from 'react'

function VirtualList({
    children,
    ...rest
}) {
    const props = rest?.props?.['x-component-props'] || rest;
    const { list = '', itemHeight, renderItem, virtualOff = false } = props;
    if (virtualOff) return list.map((item, index) => (
            renderItem?.(item, index)
    ))
    const [start, setStart] = useState(0);
    const [count, setCount] = useState(0);
    const scrollRef = useRef(null);
    const contentRef = useRef(null);
    const totalHeight = useMemo(() => itemHeight * list.length, [list.length]);
    useEffect(() => {
        setCount(Math.ceil(scrollRef.current.clientHeight / itemHeight));
    }, []);
    const scrollHandle = () => {
        const { scrollTop } = scrollRef.current;
        const newStart = Math.floor(scrollTop / itemHeight);
        setStart(newStart);
        contentRef.current.style.transform = `translate3d(0, ${newStart * itemHeight}px, 0)`;
    };
    const subList = list.slice(start, start + 2 * count);
    return (
        <div className="virtual-list" onScroll={scrollHandle} ref={scrollRef}>
            <div style={{ height: totalHeight + "px" }}>
                <div className="content" ref={contentRef}>
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="item"
                            style={{ height: subList.includes(item) ? itemHeight + "px" : 0, visibility: subList.includes(item) ? 'visible': 'hidden' }}
                        >
                            {renderItem?.(item, index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VirtualList