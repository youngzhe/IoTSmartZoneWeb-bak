import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { residentStatus } from '@/constants/dictionary'
import { getDevices } from 'api/device/device'
import { getAllAreas } from 'api/assetMgmt/area'
import { getVisitorsById, getVisitorDetailById, exportDetail } from 'api/smartPass/peoplePass/visitor'
import TablePage from 'components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle, TitleLine, ColorCircle } from 'components'

import { formatAreasTreeData, formatDeviceList } from '@/tool/util'

import style from './detail.module.less'

function Element(props) {
  const {
    match: { params },
  } = props
  const [propsCriteria] = useState({ id: params.id })
  const [deviceList, setDeviceList] = useState([]) // 查询条件里闸机列表
  const [areaList, setAreaList] = useState([]) // 查询条件里区域列表
  const [detail, setDetail] = useState({}) // 访客人员详情

  useEffect(() => {
    ;(async () => {
      const [res1, res2, res3] = await Promise.all([
        getDevices({ pageSize: 99999 }),
        getAllAreas(),
        getVisitorDetailById({ id: params.id }),
      ])
      setDeviceList(formatDeviceList(res1.data.records))
      setAreaList(formatAreasTreeData(res2.data, 3))
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
      key: 'areaId',
      label: '通行区域',
      type: 'treeSelect',
      treeData: areaList,
    },
    {
      key: 'deviceId',
      label: '闸机号',
      type: 'select',
      options: deviceList,
    },
    {
      key: 'openTime',
      label: '通行时间',
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
    { title: '闸机号', dataIndex: 'deviceName' },
    { title: '访问公司', dataIndex: 'toFirmName' },
    { title: '接待人', dataIndex: 'receptionPsnName' },
    { title: '来访目的', dataIndex: 'purpose' },
    { title: '进入地点', dataIndex: 'areaName' },
    { title: '方向', dataIndex: 'openType' },
    {
      title: '通行时间',
      dataIndex: 'openTime',
      render: record => moment(record).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]
  return (
    <div>
      <ComponentTitle title='访客人员详情' />
      <div className={style.basicInfo}>
        <span>姓名：{detail.visitorName} </span>
        <span>身份证：{detail.visitorIdCarNum}</span>
        <span>来访公司：{detail.fromFirmName}</span>
        <span>联系方式：{detail.visitorPhoneNum}</span>
      </div>
      <TitleLine />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getVisitorsById}
        propsCriteria={propsCriteria}
        exportFile={{
          exportMethod: exportDetail,
          fileName: '访客人员详情通行记录.xlsx',
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
