import React from 'react'
import img1 from '@/assets/image/总通行人数.png'
import img2 from '@/assets/image/总告警数.png'
import img3 from '@/assets/image/已解决.png'
import style from '../dashboard.module.less'

function Element(props) {
  const { dataObject } = props
  return (
    <div className={style.chartBoard}>
      <div>
        <img src={img1} alt='' />
        <p>总通行人数</p>
        <p>{dataObject.value1?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img2} alt='' />
        <p>总告警数</p>
        <p style={{ color: 'rgba(237, 101, 103, 1)' }}>{dataObject.value2?.toLocaleString() || 0}</p>
      </div>
      <div>
        <img src={img3} alt='' />
        <p>已解决</p>
        <p className={style.green}>{dataObject.value3?.toLocaleString() || 0}</p>
      </div>
    </div>
  )
}
export default React.memo(Element)
