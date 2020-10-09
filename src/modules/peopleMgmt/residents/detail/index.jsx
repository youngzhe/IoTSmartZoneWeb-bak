import React, { useState, useEffect } from 'react'
import { ComponentTitle } from '@/components'
import InfoList from '@/components/InfoList/index.jsx'
import photo from '@/assets/image/avatar.jpg'
import { getDetailStaff } from '@/api/peopleMgmt/residents'

const infoConfig = [
  {
    key: 'staffName',
    label: '姓名  ',
  },
  {
    key: 'staffPhoneNum',
    label: '联系电话',
  },
  {
    key: 'staffIdCarNum',
    label: '身份证号',
  },
  {
    key: 'firmName',
    label: '公司',
  },
  {
    key: 'effectiveTime',
    label: '有效时间',
  },
]

const condition = [
  {
    key: 'carNo',
    label: '车牌号',
  },
  {
    key: 'carEffectiveDate',
    label: '有效时间',
  },
  {
    key: 'carType',
    label: '车辆型号',
  },
]

function Detail(props) {
  const [residentsDetail, setResidentsCompanyDetail] = useState({})
  const {
    match: { params },
  } = props

  useEffect(() => {
    ;(async () => {
      const result = await getDetailStaff(params.id)
      setResidentsCompanyDetail(result.data)
    })()
  }, [params])
  return (
    <div>
      <ComponentTitle title='常驻人员信息详情' />
      <InfoList
        title='基本信息'
        infoConfig={infoConfig}
        photoImg={residentsDetail.facePhotoUrl || photo}
        dataObject={residentsDetail}
      />
      <InfoList title='车辆信息' infoConfig={condition} dataObject={residentsDetail} />
    </div>
  )
}
export default React.memo(Detail)
