import React, { useState, useEffect } from 'react'
import { doorStatus } from '@/constants/dictionary'
import { getDevices } from '@/api/device/device'
import { getAllAreas } from '@/api/assetMgmt/area'
import TablePage from '@/components/TablePage/index.jsx'
import { formatAreasTreeData } from '@/tool/util'
import { ButtonGroup, ComponentTitle, ColorCircle } from '@/components'

function Element() {
  const [propsCriteria] = useState()
  const [areaList, setAreaList] = useState([])

  const columns = [
    { title: '设备编号', dataIndex: 'deviceCode' },
    { title: '设备名称', dataIndex: 'deviceName' },
    { title: '区域', dataIndex: 'fullArea' },
    {
      title: '状态',
      dataIndex: 'onlineStatus',
      render: text => (
        <div className='color-cycle-flex'>
          <ColorCircle color={text ? '#ED6567' : '#3CB04E'} />
          {doorStatus[text - 1].label}
        </div>
      ),
    },
  ]

  useEffect(() => {
    ;(async () => {
      const result = await getAllAreas()
      setAreaList(formatAreasTreeData(result.data, 3))
    })()
  }, [])

  const searchConfig = [
    {
      key: 'deviceName',
      label: '设备名称',
    },
    {
      key: 'deviceCode',
      label: '设备编号',
    },
    {
      key: 'areaId',
      label: '区域',
      type: 'treeselect',
      treeData: areaList,
    },
    {
      key: 'onlineStatus',
      label: '门禁状态',
      type: 'select',
      options: doorStatus,
    },
  ]

  return (
    <div>
      <div>
        <ComponentTitle title='闸机管理' />
        <TablePage searchConfig={searchConfig} columns={columns} getList={getDevices} propsCriteria={propsCriteria}>
          <ButtonGroup>
            <div>
              <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>设备列表</span>
            </div>
          </ButtonGroup>
        </TablePage>
      </div>
    </div>
  )
}
export default React.memo(Element)
