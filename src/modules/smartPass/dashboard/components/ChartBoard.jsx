import React from 'react'
import img1 from '@/assets/image/今日通行.png'
import img2 from '@/assets/image/总预约车辆.png'
import img3 from '@/assets/image/平均停留时长.png'
import style from '../dashboard.module.less'

function Element(props) {
  const { dataObject } = props
  return (
    <div className={style.chartBoard}>
      <div>
        <img src={img1} alt='' />
        <p>总通行</p>
        <p>{dataObject.value1?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img2} alt='' />
        <p>总预约车辆</p>
        <p>{dataObject.value2?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img3} alt='' />
        <p>平均停留时长</p>
        <p className={style.green}>{dataObject.value3?.toLocaleString() || 0}</p>
      </div>
    </div>
  )
}
export default React.memo(Element)
