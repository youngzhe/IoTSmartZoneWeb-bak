import React, { useState, useEffect } from 'react'
import { getStaffAuth, importStaff } from '@/api/assetMgmt/assetMgmt'
import { authType } from '@/constants/dictionary'
import { Divider, message, Button } from 'antd'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ColorCircle } from '@/components'
import { getFirms } from '@/api/peopleMgmt/company'
import { formatCompanyList } from '@/tool/util'
import BatchAddModal from './BatchAddModal'
import PersonAuthModal from './PersonAuthModal'

function Element() {
  const [propsCriteria, setPropsCriteria] = useState()
  const [visible, setVisible] = useState(false)
  const [importVisible, setImportVisible] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [companyList, setCompanyList] = useState([]) // 查询条件里公司列表

  useEffect(() => {
    ;(async () => {
      const result = await getFirms({ pageSize: 99999 })
      setCompanyList(formatCompanyList(result.data.records))
    })()
  }, [])

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
      key: 'staffIdCarNum',
      label: '身份证',
    },
    {
      key: 'staffPhoneNum',
      label: '手机',
    },
  ]

  const closeBatchModal = () => {
    setImportVisible(false)
  }
  const handleOk = res => {
    setVisible(false)
    message.success(JSON.stringify(res))
  }
  const handleImport = async values => {
    const res = await importStaff({ batchStaffAuthLists: values })
    message.success(res.data)
    setPropsCriteria({ pageIndex: 1 })
    closeBatchModal()
  }
  const toDetail = record => {
    setVisible(true)
    setCurrentData({
      type: 'detail',
      id: record.staffId,
    })
  }
  const toEdit = record => {
    setVisible(true)
    setCurrentData({
      type: 'edit',
      id: record.staffId,
    })
  }
  const columns = [
    { title: '姓名', dataIndex: 'staffName' },
    { title: '公司名称', dataIndex: 'firmName' },
    { title: '身份证', dataIndex: 'staffIdCarNum' },
    { title: '联系电话', dataIndex: 'staffPhoneNum' },
    {
      title: '授权状态',
      dataIndex: 'authStatus',
      render: text => (
        <div>
          <ColorCircle color={text === 1 ? '#3CB04E' : '#ED6567'} /> {authType[text - 1].label}
        </div>
      ),
    },
    {
      title: '操作',
      width: '240px',
      render: record => (
        <span>
          <a onClick={() => toDetail(record)}>详情</a>
          <Divider type='vertical' />
          <a onClick={() => toEdit(record)}>编辑</a>
        </span>
      ),
    },
  ]

  return (
    <div>
      <TablePage searchConfig={searchConfig} columns={columns} getList={getStaffAuth} propsCriteria={propsCriteria}>
        <ButtonGroup>
          <div>
            <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>常驻人员列表</span>
          </div>
          <div>
            <Button
              type='primary'
              onClick={() => {
                setImportVisible(true)
              }}
            >
              批量导入
            </Button>
          </div>
        </ButtonGroup>
      </TablePage>

      {visible && (
        <PersonAuthModal
          onCancel={() => {
            setVisible(false)
          }}
          currentData={currentData}
          onOk={handleOk}
        />
      )}
      {importVisible && <BatchAddModal onCancel={closeBatchModal} onOk={handleImport} />}
    </div>
  )
}
export default React.memo(Element)
