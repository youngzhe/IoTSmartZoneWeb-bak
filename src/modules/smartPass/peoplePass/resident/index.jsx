import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { residentStatus } from '@/constants/dictionary'
import { getResidents, exportList } from '@/api/smartPass/peoplePass/resident'
import { getDevices } from '@/api/device/device'
import { getAllAreas } from '@/api/assetMgmt/area'
import { getFirms } from '@/api/peopleMgmt/company'
import TablePage from '@/components/TablePage/index.jsx'
import { formatAreasTreeData, formatDeviceList, formatCompanyList } from '@/tool/util'
import { Divider } from 'antd'
import { ButtonGroup, ComponentTitle, ColorCircle } from '@/components'
import DetailModal from '../../Component/DetailModal'

function Element(props) {
  const { history } = props
  const [propsCriteria] = useState()
  const [deviceList, setDeviceList] = useState([]) // 查询条件里闸机列表
  const [areaList, setAreaList] = useState([]) // 查询条件里区域列表
  const [companyList, setCompanyList] = useState([]) // 查询条件里公司列表
  const [visible, setVisible] = useState(false) // 点击详情弹出的模态框是否可见
  const [currentData, setCurrentData] = useState(false) // 点击详情弹出的模态框中的数据

  useEffect(() => {
    ;(async () => {
      const [res1, res2, res3] = await Promise.all([
        getDevices({ pageSize: 99999 }),
        getAllAreas(),
        getFirms({ pageSize: 99999 }),
      ])
      setDeviceList(formatDeviceList(res1.data.records))
      setAreaList(formatAreasTreeData(res2.data, 3))
      setCompanyList(formatCompanyList(res3.data.records))
    })()
  }, [])

  const titles = ['通行信息', '基本信息']

  const basicConfig = [
    {
      config: [
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
          label: '通行方向',
        },
        {
          key: 'status',
          label: '状态',
          render: text => residentStatus[text].label,
        },
        {
          key: 'openTime',
          label: '通行时间',
        },
      ],
    },
    {
      config: [
        {
          key: 'staffName',
          label: '姓名',
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
          key: 'staffFirmName',
          label: '公司',
        },
      ],
    },
  ]

  const searchConfig = [
    {
      key: 'firmId',
      label: '公司',
      type: 'select',
      options: companyList,
    },
    {
      key: 'staffName',
      label: '姓名',
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
      key: 'status', // 传给后端使用计划发布状态字段
      label: '状态',
      type: 'select',
      options: residentStatus, // 计划状态类型数组
    },
    {
      key: 'openTime',
      label: '通行时间',
      type: 'range',
    },
  ]

  // 详情
  const toDetail = result => {
    setVisible(true)
    setCurrentData({ ...result, ...result.staffDetailVO })
  }
  // 所有记录
  const toAllRecords = result => {
    history.push(`/smartPass/peoplePass/resident/detail/${result.refId}`)
  }

  const columns = [
    { title: '公司', dataIndex: 'firmName' },
    { title: '姓名', dataIndex: 'staffName' },
    { title: '通行区域', dataIndex: 'areaName' },
    { title: '闸机号', dataIndex: 'deviceName' },
    { title: '通行方向', dataIndex: 'openType' },
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
    {
      title: '通行时间',
      dataIndex: 'openTime',
      render: record => moment(record).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: '140px',
      render: record => (
        <span>
          <a onClick={() => toDetail(record)}>详情</a>
          <Divider type='vertical' />
          <a onClick={() => toAllRecords(record)}>所有记录</a>
        </span>
      ),
    },
  ]
  return (
    <div>
      <ComponentTitle title='常驻人员' />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getResidents}
        propsCriteria={propsCriteria}
        exportFile={{ exportMethod: exportList, fileName: '常驻人员通行记录.xlsx' }}
      >
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>通行记录</span>
          </div>
        </ButtonGroup>
      </TablePage>
      {visible && (
        <DetailModal
          onCancel={() => setVisible(false)}
          basicConfig={basicConfig}
          titles={titles}
          currentData={currentData}
        />
      )}
    </div>
  )
}

export default React.memo(Element)
