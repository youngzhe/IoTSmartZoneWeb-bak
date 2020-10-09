import React, { useState } from 'react'
import style from './style.module.less'

// src 为常态下显示的图片,prewSrc为高清图,如果没有高清图默认为src缩略图
export default React.memo(props => {
  const { src, alt = '', prewSrc } = props
  const [showPic, setShowPic] = useState(false)
  return (
    <div className={style.container}>
      <a onClick={() => setShowPic(true)}>
        <img src={src} alt={alt} style={{ width: 48, height: 48, objectFit: 'contain' }} />
      </a>
      {showPic && (
        <div className={style.popContainer} onClick={() => setShowPic(false)}>
          <img src={prewSrc || src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  )
})
