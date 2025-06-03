import React, {useEffect, useState} from "react";
import {Radio, Input, Button, message, Select} from 'dpl-react'
import {UploadImage} from 'dora'
import {postFile, get} from "@/request/request";
import Api from "@/request/api-olhelpmanage";

export default function Advert(props) {
    const {value, onChange, disabled} = props
    const [bannerList, setBannerList] = useState([])
    const uploadHandler = async (files) => {
        const data = await postFile(Api.saveImage, {data: {file: files[0]}})
        return [{
            imageUrl: data.data.domain + data.data.imageUrl,
            name: data.data.name
        }]
    }
    const getBannerList = async () => {
        const data = await get({url: Api.getSearchBannerList, params: {pageSize: 0}})
        if (data.success) {
            setBannerList(data.data.list)
        }
    }
    useEffect(() => {
        getBannerList()
    }, [])
    return <div className='advert'>
        <Radio.Group value={value.adType}
                     onChange={(e) => {
                         onChange(Object.assign({}, value, {adType: e.target.value,}))
                     }}
                     disabled={disabled}
        >
            <Radio value={'0'}>上传广告图</Radio>
            <Radio value={'1'}>选择广告图</Radio>
        </Radio.Group>
        {value.adType == '0' &&
        <div>
            <div className='advert-upload-image-wrap'>
                <UploadImage
                    disabled={disabled}
                    multiple={false}
                    maxLength={1}
                    acceptTypes={['png', 'jpg', 'jpeg', 'bmp']}
                    mapKey={'imageUrl'}
                    onUpload={uploadHandler}
                    maxSize={1024 * 1024}
                    value={value.adUrl ? [{imageUrl: value.adUrl}] : []}
                    onSizeCheckError={(err) => {
                        message.error('仅支持小于1MB的图片')
                    }}
                    onChange={(data) => {
                        if (data.length === 0) {
                            onChange(Object.assign({}, value, {adUrl: ''}))
                        } else {
                            onChange(Object.assign({}, value, {adUrl: data[0].imageUrl}))
                        }
                    }}
                />
                <p className='tips'>建议尺寸：346*140px，jpg/png/gif/bmp格式</p>
            </div>
            <div className='jump'>
                <span>跳转链接：</span>
                <Input className='input success'
                       value={value.adJumpUrl}
                       maxLength={1000}
                       onChange={(e) => {
                           onChange(Object.assign({}, value, {adJumpUrl: e.target.value}))
                       }}/>
            </div>
        </div>
        }
        {value.adType == '1' &&
        <div className='advert-url-wrap'>
            <Select
                value={value.sliderImageId}
                onChange={(e) => {
                    onChange(Object.assign({}, value, {sliderImageId: e}))
                }}>
                {bannerList.map(item => {
                    return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                })}
            </Select>
        </div>
        }
    </div>
}