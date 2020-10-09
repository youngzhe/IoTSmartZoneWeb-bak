import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { residentStatus } from '@/constants/dictionary'
import { getDevices } from '@/api/device/device'
import { getVisitorsById, getVisitorDetailById, exportDetail } from 'api/smartPass/vehiclePass/visitor'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle, TitleLine, ColorCircle } from '@/components'
import { formatDeviceList } from '@/tool/util'

import style from './detail.module.less'

function Element(props) {
  const {
    match: { params },
  } = props
  const [propsCriteria] = useState({ id: params.id })
  const [deviceList, setDeviceList] = useState([]) // 查询条件里闸机列表
  const [detail, setDetail] = useState({}) // 常驻人员详情

  useEffect(() => {
    ;(async () => {
      const [res1, res3] = await Promise.all([getDevices({ pageSize: 99999 }), getVisitorDetailById({ id: params.id })])
      setDeviceList(formatDeviceList(res1.data.records))
      setDetail(res3.data)
    })()
  }, [params])

  const searchConfig = [
    {
      key: 'status',
      label: '状态',
      type: 'select',
      options: residentStatus,
    },
    {
      key: 'number',
      label: '闸机号',
      type: 'select',
      options: deviceList,
    },
    {
      key: 'openTime',
      label: '日期',
      type: 'range',
    },
  ]

  const columns = [
    {
      title: '状态',
      dataIndex: 'status',
      render: text => (
        <div className='color-cycle-flex'>
          <ColorCircle color={text ? '#3CB04E' : '#ED6567'} />
          {residentStatus[text].label}
        </div>
      ),
    },
    { title: '来访原因', dataIndex: 'purpose' },
    { title: '访问公司', dataIndex: 'toFirmName' },
    {
      title: '访问时间',
      dataIndex: 'startVisitTime',
      render: record => moment(record).format('YYYY-MM-DD HH:mm:ss'),
    },
    { title: '通行区域', dataIndex: 'areaName' },
    { title: '闸机号', dataIndex: 'deviceName' },
    { title: '方向', dataIndex: 'openType' },
    {
      title: '通行时间',
      dataIndex: 'openTime',
      render: record => moment(record).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  return (
    <div>
      <ComponentTitle title='访客车辆详情' />
      <div className={style.basicInfo}>
        <span>{detail.visitorCarNo}</span>
        <span>司机：{detail.visitorName}</span>
        <span>身份证号：{detail.visitorIdCarNum}</span>
        <span>手机：{detail.visitorPhoneNum}</span>
        <span>来访单位：{detail.fromFirmName}</span>
      </div>
      <TitleLine />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getVisitorsById}
        propsCriteria={propsCriteria}
        exportFile={{
          exportMethod: exportDetail,
          fileName: '访客车辆详情通行记录.xlsx',
          idObj: { visitorId: params.id },
        }}
      >
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>通行记录</span>
          </div>
        </ButtonGroup>
      </TablePage>
    </div>
  )
}
export default React.memo(Element)
