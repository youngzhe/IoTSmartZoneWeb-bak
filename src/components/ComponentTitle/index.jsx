import React from 'react'
import style from './style.module.less'

// 用法 <ComponentTitle title="测试" />

function Element(props) {
  const { title } = props
  return (
    <>
      <div className={style.title}>{title}</div>
      <div className={style.bottom} />
    </>
  )
}

export default Element
