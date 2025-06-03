import React, {useEffect, useRef} from "react";

export default function useDragBox(config) {
    const {
        targetClassName,
        moveToClassName,
        fromClassName,
        onChange
    } = config
    const start = useRef(-1)
    const end = useRef(-1)
    const startEl = useRef(null)
    const endEl = useRef(null)
    const currentDragenter = useRef(null)
    const getTargetEl = (current, className) => {
        let parent = current
        while (parent) {
            if (parent.classList.contains(className)) {
                return parent
            } else {
                parent = parent.parentNode
            }
        }
        return null
    }
    const onDragstart = (e, data, index) => {
        // setStart(index)
        const el = getTargetEl(e.target, targetClassName)
        el.classList.add(fromClassName)
        startEl.current = el
        start.current = index
    }
    const onDragover = (e, data, index) => {
        e.preventDefault();
    }
    const onDragenter = (e, data, index) => {
        const el = getTargetEl(e.target, targetClassName)
        currentDragenter.current = e.target
        if (el !== startEl.current) {
            if (!endEl.current) { //首次进入
                el.classList.add(moveToClassName)
                endEl.current = el
                end.current = index
                return
            }
            if (el !== endEl.current) {//进入新的元素
                endEl.current.classList.remove(moveToClassName)
                el.classList.add(moveToClassName)
                endEl.current = el
                end.current = index
            }
        }
    }
    const onDragLeave = (e, data, index) => {
        if (e.target.classList.contains(targetClassName)
            && e.target.classList.contains(moveToClassName)
            && e.target === currentDragenter.current
        ) {
            e.target.classList.remove(moveToClassName)
            endEl.current = null
            end.current = -1
        }
    }

    function reset() {
        startEl.current && startEl.current.classList.remove(fromClassName)
        endEl.current && endEl.current.classList.remove(moveToClassName)
        startEl.current = null
        endEl.current = null
        start.current = -1
        end.current = -1
    }

    const onDrop = (e, data, index) => {
        if (startEl.current && endEl.current && start.current !== -1 && end.current !== -1) {
            onChange && onChange(start.current, end.current)
        }
        reset()
    }
    const onDragEnd = () => {
        reset()
    }
    return {
        onDragstart,
        onDragover,
        onDragenter,
        onDragLeave,
        onDrop,
        onDragEnd
    }

}