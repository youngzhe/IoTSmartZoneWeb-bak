import React, { useState, useEffect } from 'react'
import { visitorStatus } from '@/constants/dictionary'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle } from '@/components'
import { Button, message, Modal, Divider } from 'antd'
import { getAllAreas } from '@/api/assetMgmt/area'
import { formatAreasTreeData } from '@/tool/util'
// import moment from 'moment'
import {
  getVisitors,
  addVisitor,
  editVisitor,
  deleteVisitors,
  addBatchVisitor,
  getFirmList,
  exportList,
} from '@/api/peopleMgmt/visitors'
import InfoModal from './components/Modal'
import EditModal from './components/EditModal'
const { confirm } = Modal

function Visitors(props) {
  const { history } = props
  const [propsCriteria, setPropsCriteria] = useState()
  const [visibleAddAll, setVisible] = useState(false)
  const [visibleEdit, setEditVisible] = useState(false)
  const [currentData, setCurrentData] = useState({}) // 新建数据和编辑数据的初始值
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [areaList, setAreaList] = useState([]) // 查询条件里区域列表
  const [companyList, setCompanyList] = useState([]) // 查询条件里区域列表
  const rowSelection = {
    selectedRowKeys,
    onChange: selectedKeys => {
      setSelectedRowKeys(selectedKeys)
    },
  }

  useEffect(() => {
    ;(async () => {
      const res = await getAllAreas()
      setAreaList(formatAreasTreeData(res.data, 3))
      const result = await getFirmList()
      const companyListdata = []
      result.data.forEach(item => companyListdata.push({ key: item.firmId, label: item.firmName }))
      setCompanyList(companyListdata)
    })()
  }, [])

  // 删除
  const toDelete = result => {
    const { id, visitorName } = result
    confirm({
      title: `删除后数据不可恢复，
      确定删除 ${visitorName} 访客人员记录吗？？`,
      async onOk() {
        await deleteVisitors(id)
        message.success('删除成功！')
      },
    })
    setPropsCriteria({ pageIndex: 1 })
  }

  // 批量删除
  const deleteAll = async () => {
    if (selectedRowKeys.length <= 0) {
      message.warn('请至少选择一条记录')
      return
    }
    Modal.confirm({
      title: '批量删除',
      content: '访客人员记录将永久删除',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteVisitors(selectedRowKeys.join(''))
        message.success('批量删除成功！')
        setSelectedRowKeys([])
        setPropsCriteria({ pageIndex: 1 })
      },
    })
  }

  // 批量添加
  const addAll = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const addAllOk = async val => {
    const res = await addBatchVisitor(val)
    message.success(res.data)
    setPropsCriteria({ pageIndex: 1 })
    setVisible(false)
  }

  // 添加人员
  const add = () => {
    setEditVisible(true)
    setCurrentData({})
  }

  // 详情
  const toDetail = result => {
    history.push(`/peopleMgmt/visitors/detail/${result.id}`)
  }

  // 编辑
  const toEdit = res => {
    // 修改格式
    const {
      // startVisitTime,
      // endVisitTime,
      projectId,
      areaId,
      buildingId,
    } = res
    const data = {
      firmAreas: { projectId, areaId, buildingId },
      // rangeDate: [startVisitTime, endVisitTime],
    }
    setCurrentData(Object.assign(res, data))
    setEditVisible(true)
  }

  const closeEditModal = () => {
    setEditVisible(false)
  }

  // 新增、编辑的提交
  const addEditOk = async res => {
    // 修改格式
    const { firmAreas, rangeDate } = res
    const data = {
      ...firmAreas,
      startVisitTime: rangeDate && rangeDate[0],
      endVisitTime: rangeDate && rangeDate[1],
    }
    if (!currentData.id) {
      // 编辑
      await addVisitor(Object.assign(res, data))
      message.success('编辑成功')
    } else {
      // 添加
      await editVisitor(Object.assign(res, data))
      message.success('添加成功')
    }
    setEditVisible(false)
  }

  const searchConfig = [
    {
      key: 'visitStatus', // 传给后端使用计划发布状态字段
      label: '状态',
      type: 'select',
      options: visitorStatus, // 计划状态类型数组
    },
    {
      key: 'areaId',
      label: '访问区域',
      type: 'treeSelect',
      treeData: areaList,
    },
    {
      key: 'toFirmName',
      label: '访问公司',
      type: 'select',
      options: companyList,
    },
    {
      key: 'receptionPsnName',
      label: '接待人',
    },
    {
      key: 'visitorName',
      label: '姓名',
    },
    {
      key: 'visitorIdCarNum',
      label: '身份证',
    },
    {
      key: 'visitorPhoneNum',
      label: '手机',
    },
  ]
  const columns = [
    { title: '姓名', dataIndex: 'visitorName', fixed: 'left', width: '150px' },
    {
      title: '状态',
      dataIndex: 'visitStatus',
      width: '150px',
      fixed: 'left',
      render: text => visitorStatus[text - 1].label,
    },
    {
      title: '访问区域',
      dataIndex: 'areaName',
      width: '150px',
      render: record => (
        <div
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={record}
        >
          {record}
        </div>
      ),
    },
    { title: '访问公司', dataIndex: 'toFirmName', width: '150px' },
    { title: '身份证号', dataIndex: 'visitorIdCarNum', width: '150px' },
    { title: '联系电话', dataIndex: 'visitorPhoneNum', width: '150px' },
    { title: '接待人', dataIndex: 'receptionPsnName', width: '150px' },
    {
      title: '来访时间',
      dataIndex: 'startVisitTime',
      render: (record, info) => (record ? `${record}-${info.endVisitTime.slice(info.endVisitTime.indexOf(' '))}` : ''),
      fixed: 'right',
      width: '200px',
    },
    {
      title: '操作',
      width: '200px',
      fixed: 'right',
      render: record => (
        <span>
          <a onClick={() => toDelete(record)} disabled={record.visitStatus !== 1}>
            删除
          </a>
          <Divider type='vertical' />
          <a onClick={() => toDetail(record)}>详情</a>
          <Divider type='vertical' />
          <a onClick={() => toEdit(record)} disabled={record.visitStatus !== 1}>
            编辑
          </a>
        </span>
      ),
    },
  ]

  return (
    <div>
      <ComponentTitle title='访问人员' />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getVisitors}
        propsCriteria={propsCriteria}
        rowSelection={rowSelection}
        scroll={{ x: 1500, y: 300 }}
        exportFile={{ exportMethod: exportList, fileName: '访客人员列表.xlsx' }}
      >
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>访客人员列表</span>
          </div>
          <div>
            <Button type='primary' onClick={addAll}>
              批量添加
            </Button>
            <Button type='primary' onClick={add}>
              添加人员
            </Button>
            <Button type='primary' onClick={deleteAll}>
              批量删除
            </Button>
          </div>
        </ButtonGroup>
      </TablePage>
      {visibleAddAll && <InfoModal onCancel={closeModal} onOk={addAllOk} currentData={currentData} />}
      {visibleEdit && <EditModal onCancel={closeEditModal} onOk={addEditOk} currentData={currentData} />}
    </div>
  )
}
export default React.memo(Visitors)
