import React, { useState } from 'react'
import { processingStatus, alarmType } from '@/constants/dictionary'
import { getAlarmmsgs, exportList } from '@/api/smartPass/alarm/people'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle, ColorCircle } from '@/components'
import moment from 'moment'

const searchConfig = [
  {
    key: 'status',
    label: '状态',
    type: 'select',
    options: processingStatus,
  },
  // {
  //   key: 'peopleType',
  //   label: '人员类型',
  //   type: 'select',
  //   options: planStatusTypes,
  // },
  {
    key: 'openTime',
    label: '告警时间',
    type: 'range',
  },
]

function Element(props) {
  const { history } = props
  const [propsCriteria] = useState()

  // 详情
  const toDetail = result => {
    history.push(`/smartPass/alarm/peopleAlarm/detail/${result.id}`)
  }

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    // { title: '人员类型', dataIndex: 'createBy' },
    { title: '告警地点', dataIndex: 'areaName' },
    { title: '闸机号', dataIndex: 'deviceName' },
    { title: '告警原因', dataIndex: 'alarmType', render: text => text && alarmType[text - 1].label },
    { title: '方向', dataIndex: 'openType' },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => (
        <div className='color-cycle-flex'>
          <ColorCircle color={text ? '#3CB04E' : '#ED6567'} />
          {processingStatus[text].label}
        </div>
      ),
    },
    {
      title: '告警时间',
      dataIndex: 'alarmTime',
      render: record => moment(record).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: '120px',
      render: record => (
        <span>
          <a onClick={() => toDetail(record)}>详情</a>
        </span>
      ),
    },
  ]

  return (
    <div>
      <ComponentTitle title='人员告警' />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getAlarmmsgs}
        propsCriteria={propsCriteria}
        exportFile={{ exportMethod: exportList, fileName: '人员告警记录.xlsx' }}
      >
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>告警记录</span>
          </div>
        </ButtonGroup>
      </TablePage>
    </div>
  )
}
export default React.memo(Element)
