import React from "react";

export default function GroupView(props) {
    const {value = []} = props
    return <div className='group-view'>{Array.isArray(value) && Array.from(new Set(value)).join(',')}</div>
}