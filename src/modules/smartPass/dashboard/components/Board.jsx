import React from 'react'
import img1 from '@/assets/image/总通行车辆.png'
import img2 from '@/assets/image/总车位数.png'
import img3 from '@/assets/image/空闲车位.png'
import style from '../dashboard.module.less'

function Element(props) {
  const { dataObject } = props

  return (
    <div className={style.board}>
      <div>
        <img src={img1} alt='' />
        <p>总通行车辆</p>
        <p>{dataObject.value1?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img2} alt='' />
        <p>总车位数</p>
        <p>{dataObject.value2?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img3} alt='' />
        <p>空闲车位</p>
        <p className={style.green}>{dataObject.value3?.toLocaleString() || 0}</p>
      </div>
    </div>
  )
}
export default React.memo(Element)
