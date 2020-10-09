import React from 'react'
import { Radio } from 'antd'
import style from '../dashboard.module.less'

function Element(props) {
  const { handleClick } = props
  return (
    <Radio.Group
      defaultValue={1}
      size='small'
      buttonStyle='solid'
      className={style.buttonGroup}
      onChange={e => handleClick(e.target.value)}
    >
      <Radio.Button value={1}>日</Radio.Button>
      <Radio.Button value={2}>周</Radio.Button>
      <Radio.Button value={3}>月</Radio.Button>
      <Radio.Button value={4}>年</Radio.Button>
    </Radio.Group>
  )
}
export default React.memo(Element)
