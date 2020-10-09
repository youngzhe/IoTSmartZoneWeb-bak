import React, { useState, useEffect } from 'react'
import { visitorStatus } from '@/constants/dictionary'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle } from '@/components'
import { Button, message, Modal, Divider } from 'antd'
import moment from 'moment'
import {
  getFirms,
  addFirm,
  editFirm,
  deleteFirm,
  freezeFirm,
  addBatchFirms,
  deleteBatchFirms,
  exportList,
} from '@/api/peopleMgmt/company'
import { getFirmList } from '@/api/peopleMgmt/residents'
import InfoModal from './components/Modal'
import EditModal from './components/EditModal'

const { confirm } = Modal

function Company(props) {
  const { history } = props
  const [propsCriteria, setPropsCriteria] = useState()
  const [visibleAddAll, setVisible] = useState(false)
  const [visibleEdit, setEditVisible] = useState(false)
  const [currentData, setCurrentData] = useState({}) // 新建数据和编辑数据的初始值
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [companyList, setCompanyList] = useState([]) // 公司列表
  const searchConfig = [
    {
      label: '公司名称',
      key: 'firmName',
      type: 'select',
      options: companyList,
    },

    {
      label: '联系电话',
      key: 'phoneNum',
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedKeys => {
      setSelectedRowKeys(selectedKeys)
    },
  }

  useEffect(() => {
    ;(async () => {
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
    const res = await addBatchFirms(values)
    message.success(res.data)
    setPropsCriteria({ pageIndex: 1 })
    setVisible(false)
  }

  // 提交添加、编辑
  const addEditOk = async res => {
    const { contactPerson, firmAreas, firmName, parkingCount, phoneNum, staffCount, rangeDate, enterDate } = res
    // 提交前的格式转换
    const data = {
      endEffectiveDate: rangeDate[1],
      startEffectiveDate: rangeDate[0],
      enterDate,
      contactPerson,
      firmAreas: [firmAreas],
      firmName,
      parkingCount,
      phoneNum,
      staffCount,
    }
    if (currentData.id) {
      // 编辑设备
      await editFirm(data)
      message.success('编辑成功')
    } else {
      // 添加设备
      await addFirm(data)
      message.success('添加成功')
    }
    setEditVisible(false)
    setPropsCriteria({ pageIndex: 1 })
  }

  // 添加公司
  const add = () => {
    setEditVisible(true)
    setCurrentData({})
  }
  // 批量删除
  const deleteAll = async () => {
    if (selectedRowKeys <= 0) {
      message.warn('请至少选择一条记录')
      return
    }
    Modal.confirm({
      title: '批量删除',
      content: '访客人员记录将永久删除',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteBatchFirms(selectedRowKeys.join())
        message.success('批量删除成功！')
        setSelectedRowKeys([])
        setPropsCriteria({ pageIndex: 1 })
      },
    })
  }
  // 删除
  const toDelete = result => {
    const { id, firmName } = result
    confirm({
      title: `确定删除公司 ${firmName}？`,
      icon: '',
      content: '删除后不可恢复',
      async onOk() {
        const res = await deleteFirm(id)
        message.info(res.data)
        await getFirms({})
      },
    })
  }

  // 冻结
  const toFreeze = result => {
    const { id, firmName } = result
    confirm({
      title: `确定冻结公司 ${firmName}？`,
      icon: '',
      centered: true,
      async onOk() {
        await freezeFirm(id)
        message.success('冻结成功！')
        setPropsCriteria({ pageIndex: 1 })
      },
    })
  }

  // 详情
  const toDetail = record => {
    history.push(`/peopleMgmt/company/detail/${record.id}`)
  }

  // 编辑
  const toEdit = result => {
    const { firmAreas, startEffectiveDate, endEffectiveDate } = result
    // 格式转换
    const data = {
      rangeDate: [startEffectiveDate, endEffectiveDate],
      firmAreas: firmAreas[0],
    }
    setCurrentData(Object.assign(data, result))
    setEditVisible(true)
  }

  const closeEditModal = () => {
    setEditVisible(false)
  }

  const columns = [
    { title: '公司名称', dataIndex: 'firmName' },
    {
      title: '办公区域',
      dataIndex: 'firmAreaStrs',
      render: record => (
        <div
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={record[0]}
        >
          {record[0]}
        </div>
      ),
    },
    { title: '联系电话', dataIndex: 'phoneNum' },
    { title: '联系人', dataIndex: 'contactPerson' },
    {
      title: '创建时间',
      dataIndex: 'enterDate',
      render: record => (record ? moment(record).format('YYYY-MM-DD') : ''),
    },
    {
      title: '入驻状态',
      dataIndex: 'enterStatus',
      render: text => visitorStatus[text].label,
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
      <ComponentTitle title='入驻公司' />
      <TablePage
        searchConfig={searchConfig}
        columns={columns}
        getList={getFirms}
        rowSelection={rowSelection}
        propsCriteria={propsCriteria}
        exportFile={{ exportMethod: exportList, fileName: '入驻公司列表.xlsx' }}
      >
        <ButtonGroup>
          <div />
          <div>
            <Button type='primary' onClick={add}>
              添加公司
            </Button>
            <Button type='primary' onClick={addAll}>
              批量添加
            </Button>
            <Button type='primary' onClick={deleteAll}>
              批量删除
            </Button>
          </div>
        </ButtonGroup>
      </TablePage>
      {visibleAddAll && <InfoModal onCancel={closeModal} onOk={addAllOk} />}
      {visibleEdit && <EditModal onCancel={closeEditModal} onOk={addEditOk} currentData={currentData} />}
    </div>
  )
}

export default React.memo(Company)
