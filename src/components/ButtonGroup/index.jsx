import React from 'react'

import style from './style.module.less'

export default function Element(props) {
  const { children } = props
  return <div className={style.buttonGroup}>{children}</div>
}
