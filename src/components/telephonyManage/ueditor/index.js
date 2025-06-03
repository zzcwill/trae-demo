import ReactUeditor from "ifanrx-react-ueditor";
import React, { useRef, useState } from "react";
import { message } from "dpl-react";
import { postFile } from "@/request/request";
import api from "@/request/api-callcentermanage";
import appConfig from "../../../../app.config";
import "./index.scss";

export default function UEditor(props) {
  const {
    onChange,
    content = "",
    height = "116",
    fileSize = 2,
    accept = "image/png,image/jpg,image/jpeg",
  } = props;
  const config = {
    toolbars: [
      [
        "fontfamily", // 字体样式
        "fontsize", // 字体大小
        "paragraph", // 段落格式
        "italic", //斜体
        "underline", //下划线
        "bold", // 字体加粗
        "subscript", // 下标文本，与“superscript”命令互斥
        "superscript", // 上标文本，与“subscript”命令互斥
        "insertorderedlist", // 有序列表，与“insertunorderedlist”命令互斥
        "insertunorderedlist", // 无序列表，与“insertorderedlist”命令互斥
        "indent", // 缩进
        "justifyleft", //居左对齐
        "justifyright", //居右对齐
        "justifycenter", //居中对齐
        "justifyjustify", //两端对齐
        "rowspacing", // 设置段间距
        "formatmatch", // 格式刷
        "undo", //撤销
        "redo", //重做
        "insertcode", // 插入代码
        "lineheight", // 行距
        "link", // 超链接
        "unlink", // 取消超链接
        "imagefloat", // 图片对齐方式
        "preview", // 预览
      ],
    ],
    initialFrameWidth: "100%",
    initialFrameHeight: height,
    retainOnlyLabelPasted: false, // 粘贴只保留标签
    pasteplain: false, //粘贴只保留纯文本
    autoHeightEnabled: false, //是否自动长高
  };
  const ueditor = useRef(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const acceptList = accept ? accept.split(",") : [];
    if (acceptList.length > 0 && acceptList.indexOf(file.type) < 0) {
      message.error("图片格式不正确");
      return false;
    }
    if (file.size > fileSize * 1024 * 1024) {
      message.error("图片大小超过" + fileSize + "M");
      return false;
    }
    if (ueditor.current.ueditor) {
      let editorInstance = ueditor.current.ueditor;
      postFile({
        url: api.UploadFile,
        data: {
          file,
          type: "picture",
        },
      }).then((data) => {
        if (data.success) {
          editorInstance.focus();
          editorInstance.execCommand(
            "inserthtml",
            `<p><img src="${data.data.filePath}" style="max-width: 100%"  alt="" ></p>`
          );
        } else {
          message.error(data.message);
        }
      });
    }
    return null;
  };

  return (
    <ReactUeditor
      config={config}
      ueditorPath={`${appConfig.publicPath}/ueditor`}
      debug
      plugins={["uploadImage"]}
      value={content}
      onChange={onChange}
      uploadImage={uploadImage}
      ref={ueditor}
    />
  );
}
