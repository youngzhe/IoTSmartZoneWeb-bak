import React, { useEffect, useState } from 'react'
import { ComponentTitle } from '@/components'
import { getDetailVisitor } from '@/api/peopleMgmt/visitors'
import InfoList from '@/components/InfoList/index.jsx'

const infoConfig = [
  {
    key: 'visitorName',
    label: '姓名  ',
  },
  {
    key: 'visitorPhoneNum',
    label: '联系电话',
  },
  {
    key: 'visitorIdCarNum',
    label: '身份证号',
  },
  {
    key: 'fromFirmName',
    label: '公司',
  },
]
const visitConfig = [
  {
    key: 'toFirmName',
    label: '访问公司',
  },
  {
    key: 'areaName',
    label: '访问区域',
  },
  {
    key: 'purpose',
    label: '访问目的',
  },
  {
    key: 'visitTime',
    label: '访问时间',
  },
]
const condition = [
  {
    key: 'visitorCarNo',
    label: '车牌号',
  },
  {
    key: 'visitorCarType',
    label: '车辆型号',
  },
]
const receiverCondition1 = [
  {
    key: 'receptionPsnName',
    label: '姓名  ',
  },
  {
    key: 'receptionPsnPhoneNum',
    label: '联系电话',
  },
  {
    key: 'receptionPsnIdCardNo',
    label: '身份证号',
  },
  {
    key: 'toFirmName',
    label: '公司',
  },
]
const receiverCondition2 = [
  {
    key: 'status',
    label: '状态',
  },
]
function Detail(props) {
  const [visitorsDetail, setVisitorsDetail] = useState({})
  const {
    match: { params },
  } = props

  useEffect(() => {
    ;(async () => {
      const result = await getDetailVisitor(params.id)
      setVisitorsDetail(result.data)
    })()
  }, [params.id])

  return (
    <div>
      <div>
        <ComponentTitle title='访客人员信息详情' />
        <InfoList title='基本信息' infoConfig={infoConfig} dataObject={visitorsDetail} />
        <InfoList title='访问信息' infoConfig={visitConfig} dataObject={visitorsDetail} />
        <InfoList title='车辆信息' infoConfig={condition} dataObject={visitorsDetail} />
        <InfoList title='接待人信息' infoConfig={receiverCondition1} dataObject={visitorsDetail} />
        <InfoList title='处理状态' infoConfig={receiverCondition2} dataObject={visitorsDetail} />
      </div>
    </div>
  )
}
export default React.memo(Detail)
