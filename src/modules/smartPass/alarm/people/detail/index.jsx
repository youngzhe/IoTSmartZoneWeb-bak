import React, { useEffect, useState } from 'react'
import { ComponentTitle, TitleLine, InfoList } from '@/components'
import { getAlarmmsgDetailById } from '@/api/smartPass/alarm/people'
import { alarmType, processingStatus } from '@/constants/dictionary'
import photo from '@/assets/image/avatar.jpg'
import style from './detail.module.less'

// const infoConfig = [
//   {
//     key: 'idCard',
//     label: '身份证号',
//   },
//   {
//     key: 'phoneNum',
//     label: '电话',
//   },
//   {
//     key: 'company',
//     label: '公司',
//   },
//   {
//     key: 'deviceNum',
//     label: '闸机号',
//   },
//   {
//     key: 'location',
//     label: '位置',
//   },
//   {
//     key: 'direction',
//     label: '方向',
//   },
// ]

const visitorInfoConfig = [
  {
    key: 'visitorIdCarNum',
    label: '身份证号',
  },
  {
    key: 'visitorPhoneNum',
    label: '电话',
  },
  {
    key: 'fromFirmName',
    label: '公司',
  },
  {
    key: 'toFirmName',
    label: '访问公司',
  },
  {
    key: 'purpose',
    label: '访问目的',
  },
  {
    key: 'areaName',
    label: '通行区域',
  },
  {
    key: 'deviceName',
    label: '闸机号',
  },
  {
    key: 'openType',
    label: '方向',
  },
]

const condition = [
  {
    key: 'status',
    label: '状态',
    render: text => processingStatus[text].label,
  },
  {
    key: 'staffName',
    label: '负责人',
  },
  {
    key: 'staffCode',
    label: '工号',
  },
  {
    key: 'staffPhoneNum',
    label: '电话',
  },
]

function Element(props) {
  const {
    match: { params },
  } = props
  const [detail, setDetail] = useState({})

  useEffect(() => {
    ;(async () => {
      const result = await getAlarmmsgDetailById({ id: params.id })
      setDetail(result.data)
    })()
  }, [params])

  return (
    <div>
      <div>
        <ComponentTitle title='人员告警详情' />
        <div className={style.basicInfo}>
          <span>{detail.visitorName} </span>
          {/* <span>常驻人员</span> */}
          <span>告警原因：{detail.alarmType && alarmType[detail.alarmType - 1].label}</span>
          <span>告警时间：{detail.alarmTime}</span>
        </div>
        <TitleLine />
        <InfoList title='基本信息' infoConfig={visitorInfoConfig} photoImg={photo} dataObject={detail} />
        <InfoList
          title='处理情况'
          infoConfig={condition}
          dataObject={{ ...detail.alarmDealVO, status: detail.status }}
        />
      </div>
    </div>
  )
}
export default React.memo(Element)
