import React, { useState, useEffect } from 'react'
import { ComponentTitle } from '@/components'
import { getDetailFirm } from '@/api/peopleMgmt/company'
import InfoList from '@/components/InfoList/index.jsx'

function Detail(props) {
  const [companyDetail, setCompanyDetail] = useState({})
  const {
    match: { params },
  } = props

  useEffect(() => {
    ;(async () => {
      const result = await getDetailFirm(params.id)
      setCompanyDetail(result.data)
    })()
  }, [params.id])

  const infoConfig = [
    {
      key: 'firmName',
      label: '公司',
    },
    {
      key: 'phoneNum',
      label: '联系电话',
    },
    {
      key: 'contactPerson',
      label: '联系人',
    },
    {
      key: 'firmAreaStrs',
      label: '办公区域',
    },

    {
      key: 'enterDate',
      label: '入驻时间',
    },
    {
      key: 'startEffectiveDate' - 'endEffectiveDate',
      label: '有效时间',
    },
    {
      key: 'staffCount',
      label: '员工数量',
    },
    {
      key: 'parkingCount',
      label: '车位数量',
    },
  ]

  return (
    <div>
      <div>
        <ComponentTitle title='入驻公司信息详情' />
        <InfoList title='公司详情' infoConfig={infoConfig} dataObject={companyDetail} />
      </div>
    </div>
  )
}

export default React.memo(Detail)
