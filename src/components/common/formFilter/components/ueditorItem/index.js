import React from "react";
import UEditor from "@/components/common/ueditor";

export default function UEditorItem(props) {
    const { other, onChange, value,className } = props;

    return <div className={other.className}>
        <UEditor {...other} onChange={onChange} value={value}></UEditor>
    </div>;
}
