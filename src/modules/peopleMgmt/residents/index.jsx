/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import { faceStatus } from '@/constants/dictionary'
import {
  getStaffs,
  addStaff,
  editStaff,
  addBatchStaffsInfo,
  deleteStaff,
  freezeStaff,
  getFirmList,
  exportList,
} from '@/api/peopleMgmt/residents'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle } from '@/components'
import { Button, message, Modal, Divider } from 'antd'
import { getAllAreas } from '@/api/assetMgmt/area'
import { formatAreasTreeData } from '@/tool/util'
import moment from 'moment'
import InfoModal from './components/Modal'
import AddEditModal from './components/AddEditModal'
const { confirm } = Modal

// 删除
const toDelete = result => {
  const { staffId, staffName } = result
  confirm({
    title: `确定删除人员 ${staffName}？`,
    content: '删除后不可恢复',
    async onOk() {
      await deleteStaff(staffId)
      message.success('删除成功！')
    },
  })
}

// 冻结
const toFreeze = result => {
  const { staffId, staffName } = result
  confirm({
    title: `确定冻结人员 ${staffName}？`,
    centered: true,
    async onOk() {
      await freezeStaff(staffId)
      message.success('冻结成功！')
    },
  })
}

function Residents(props) {
  const { history } = props
  const [propsCriteria, setPropsCriteria] = useState()
  const [visibleAddAll, setVisible] = useState(false)
  const [visibleEdit, setEditVisible] = useState(false)
  const [currentData, setCurrentData] = useState({}) // 新建数据和编辑数据的初始值
  const [areaList, setAreaList] = useState([]) // 查询条件里区域列表
  const [companyList, setCompanyList] = useState([]) // 公司列表
  const searchConfig = [
    {
      key: 'firmName',
      label: '公司名称',
      type: 'select',
      options: companyList,
    },
    {
      key: 'areaName',
      label: '公司区域',
      type: 'treeSelect',
      treeData: areaList,
    },
    {
      key: 'faceUrl', // 传给后端使用计划发布状态字段
      label: '人脸数据',
      type: 'select',
      options: faceStatus, // 计划状态类型数组
    },
    {
      key: 'staffName',
      label: '姓名',
    },
    {
      key: 'staffIdCarNum',
      label: '身份证',
    },
    {
      key: 'staffPhoneNum',
      label: '手机',
    },
  ]

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

  // 批量添加
  const addAll = () => {
    setVisible(true)
  }

  const closeModal = () => {
    setVisible(false)
  }

  const addAllOk = async values => {
    const res = await addBatchStaffsInfo(values)
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
    history.push(`/peopleMgmt/residents/detail/${result.staffId}`)
  }

  // 编辑
  const toEdit = result => {
    // const { startEffectiveDate, endEffectiveDate, carStartEffectiveDate, carEndEffectiveDate } = result
    // // 格式转换
    // const data = {
    //   rangeDate: [startEffectiveDate, endEffectiveDate],
    //   carRangeDate: [carStartEffectiveDate, carEndEffectiveDate],
    // }
    setCurrentData(result)
    setEditVisible(true)
  }

  const closeEditModal = () => {
    setEditVisible(false)
  }

  const EditOk = async res => {
    const {
      carRangeDate,
      rangeDate,
      enterDate,
      facePhotoUrl,
      staffIdCarNum,
      staffName,
      staffPhoneNum,
      firmName,
      carNo,
      carType,
      firmId,
    } = res
    // 提交前的格式转换
    const data = {
      carStartEffectiveDate: carRangeDate && moment(carRangeDate[0]).format('YYYY-MM-DD'),
      carEndEffectiveDate: carRangeDate && moment(carRangeDate[1]).format('YYYY-MM-DD'),
      startEffectiveDate: rangeDate && moment(rangeDate[0]).format('YYYY-MM-DD'),
      endEffectiveDate: rangeDate && moment(rangeDate[1]).format('YYYY-MM-DD'),
      facePhotoFile: facePhotoUrl && facePhotoUrl[0],
      enterDate,
      staffIdCarNum,
      staffName,
      staffPhoneNum,
      firmName,
      carNo,
      carType,
      firmId,
    }

    if (currentData.staffId) {
      // 编辑
      await editStaff(data)
      message.success('编辑成功')
    } else {
      // 添加
      await addStaff(data)
      message.success('添加成功')
    }
    setEditVisible(false)
    setPropsCriteria({ pageIndex: 1 })
  }

  const columns = [
    { title: '姓名', dataIndex: 'staffName' },
    { title: '公司名称', dataIndex: 'firmName' },
    {
      title: '公司区域',
      dataIndex: 'areaName',
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
    { title: '身份证号', dataIndex: 'staffIdCarNum' },
    { title: '联系电话', dataIndex: 'staffPhoneNum' },
    {
      title: '人脸数据',
      dataIndex: 'faceUrl',
    },
    {
      title: '操作',
      width: '200px',
      render: record => (
        <span>
          <a onClick={() => toDelete(record)}>删除</a>
          <Divider type='vertical' />
          <a onClick={() => toFreeze(record)}>冻结</a>
          <Divider type='vertical' />
          <a onClick={() => toDetail(record)}>详情</a>
          <Divider type='vertical' />
          <a onClick={() => toEdit(record)}>编辑</a>
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
        getList={getStaffs}
        propsCriteria={propsCriteria}
        exportFile={{ exportMethod: exportList, fileName: '常驻人员列表.xlsx' }}
      >
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>常驻人员列表</span>
          </div>
          <div>
            <Button type='primary' onClick={addAll}>
              批量添加
            </Button>
            <Button type='primary' onClick={add}>
              添加人员
            </Button>
          </div>
        </ButtonGroup>
      </TablePage>
      {visibleAddAll && <InfoModal onCancel={closeModal} onOk={addAllOk} />}
      {visibleEdit && <AddEditModal onCancel={closeEditModal} onOk={EditOk} currentData={currentData} />}
    </div>
  )
}
export default React.memo(Residents)
