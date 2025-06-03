import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import Clipboard from "clipboard";
import { message } from "dpl-react";
import { galaxyConfig } from "@/utils";

export default function OptionBox(props) {
  const { record, editBannerConfig, deleteBannerConfigButton } = props;
  const shareLinkRef = useRef(null);
  const copyLinkButton = () => {
    shareLinkRef.current.click();
  };
  useEffect(() => {
    const link = new Clipboard(shareLinkRef.current);
    link.on("success", () => {
      message.success("复制链接成功");
    });
    link.on("error", (e) => {
      message.fail("复制链接失败");
    });
  }, []);
  return (
    <div className="banner-table-option-box">
      <button
        data-clipboard-text={`${galaxyConfig.bannerGroupUrl}?configId={bannerGroupId}`.replace(
          /{bannerGroupId}/,
          record.id
        )}
        hidden
        ref={shareLinkRef}
      ></button>
      <span
        className="option-button"
        onClick={() => {
          copyLinkButton();
        }}
      >
        复制链接
      </span>
      <span
        onClick={() => {
          editBannerConfig("edit", record.id);
        }}
        className="option-button"
      >
        修改
      </span>
      <span
        onClick={() => {
          deleteBannerConfigButton(record.id);
        }}
        className="option-button"
      >
        删除
      </span>
    </div>
  );
}
