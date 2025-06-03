import React, {useEffect, useState, useRef} from 'react'
import './index.scss'
import '../photoSwipePlugin/photoswipe.css'
import '../photoSwipePlugin/default-skin/default-skin.css'

import PhoteSwipe from '../photoSwipePlugin/photoswipe'
import PhotoSwipeUI_Default from '../photoSwipePlugin/photoswipe-ui-default'

const loadImg = async (imgList) => {
  let promiseArr = imgList.map(item => {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = item.imageUrl
      img.onload = () => {
        resolve({
          src: item.imageUrl,
          h: img.height,
          w: img.width
        })
      }
      img.onerror=()=>{
        resolve()
      }
    })
  })
  const data = await Promise.all(promiseArr)
  return data.filter((item)=>{
    if(item) return true
    return false
  })
}
export default function PhotoSwipeGallery(props) {
  const {imgList} = props
  const [list, setList] = useState([])
  const ulRef = useRef(null)
  const openSwipe = (item, index) => {
    let options = {
      index,
      closeOnScroll:false,
      pinchToClose:false,
      closeOnVerticalDrag:false,
    /*  getThumbBoundsFn() {
        const rect = ulRef.current.childNodes[index].getBoundingClientRect()
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      }*/
    }
    const pswpElement = document.querySelectorAll('.pswp')[0]
    let gallery = new PhoteSwipe(pswpElement, PhotoSwipeUI_Default, list, options);
    gallery.init();
  }
  useEffect(() => {
    if (Array.isArray(imgList)) {
      loadImg(imgList).then(data => {
        setList(data)
      })
    }
  }, [imgList])
  return (
    <div className='g-photo-swipe'>
      <ul className='img-list' ref={ulRef}>
        {list.map((item, index) => {
          return <li
            key={item.src}
            style={{backgroundImage: `url("${item.src}")`}}
            onClick={() => {
              openSwipe(item, index)
            }}
          ></li>
        })}
      </ul>
    </div>
  )
}
