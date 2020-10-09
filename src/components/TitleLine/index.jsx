import React from 'react'
import style from './style.module.less'

function Element() {
  return <div className={style.line} />
}
export default React.memo(Element)
