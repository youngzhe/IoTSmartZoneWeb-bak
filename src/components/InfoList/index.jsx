import React from 'react'
import TitleLine from '@/components/TitleLine/index.jsx'
import style from './style.module.less'

// 用于人员告警详情和车辆告警详情页面的信息展示

function Element(props) {
  const { title, infoConfig, photoImg, dataObject = {} } = props
  return (
    <>
      <div className={style.main}>
        <div className={style.title}>{title}</div>
        <TitleLine />
        <div className={style.mainContainer}>
          <ul className={style.list}>
            {infoConfig.map(data => (
              <li key={data.key}>
                {data.label}:&nbsp;&nbsp;
                {data.render
                  ? typeof dataObject[data.key] === 'number' && data.render(dataObject[data.key])
                  : data.key.indexOf(',') > 0
                  ? `${dataObject[data.key.split(',')[0]]} - ${dataObject[data.key.split(',')[1]]}`
                  : dataObject[data.key]}
              </li>
            ))}
          </ul>
          {photoImg && <img className={style.photo} src={photoImg} alt='照片' />}
        </div>
      </div>
    </>
  )
}

export default React.memo(Element)
