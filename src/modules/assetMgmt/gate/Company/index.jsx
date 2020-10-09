import React, { useState, useEffect } from 'react'
import { getStaffAuth, getFirmAuth, editFirmAuth } from '@/api/assetMgmt/assetMgmt'
import { getAllAreas } from '@/api/assetMgmt/area'
import { getFirms } from '@/api/peopleMgmt/company'
import { formatAreasTreeData } from '@/tool/util'
import { message, Button } from 'antd'
import TablePage from '@/components/TablePage/index.jsx'
import SearchTree from '../../Component/SearchTree'
import style from '../gate.module.less'

const searchStaffConfig = [
  {
    key: 'staffName',
    label: '姓名',
  },
]

function Element() {
  const [propsCriteria, setPropsCriteria] = useState()
  const [allAreaData, setAllAreaData] = useState([])
  const [companyTreeData, setCompanyTreeData] = useState([])
  const [firmAuth, setFirmAuth] = useState([])
  const [buildingKeys, setBuildingKeys] = useState()
  const [companyId, setCompanyId] = useState() // 当前选择的公司id
  const [isEdit, setIsEdit] = useState(false) // 是否是可编辑状态，默认否，只展示
  const [disabledKeys, setDisabledKeys] = useState() // 不可被编辑的项（公司授权编辑不可编辑公司所在区域）

  useEffect(() => {
    ;(async () => {
      const [res1, res2] = await Promise.all([
        getAllAreas(), // 获取所有区域
        getFirms(), // 获取所有公司
      ])
      // 设置区域树结构
      const { data } = res1
      setAllAreaData(formatAreasTreeData(data, 3))

      // 设置公司树结构
      const companyData = res2.data.records
      const companyTreeArr = []
      companyData.forEach(item => {
        const obj = {
          title: item.firmName,
          key: item.id,
        }
        companyTreeArr.push(obj)
      })
      setCompanyTreeData(companyTreeArr)
    })()
  }, [])

  const getBuildingKeys = val => {
    setBuildingKeys(val)
  }
  const chooseCompany = async val => {
    setIsEdit(false)
    setCompanyId(val)
    if (val.length > 0) {
      const res = await getFirmAuth(val)
      const firmArr = []
      const companyAreas = []
      res.data.forEach(item => {
        firmArr.push(item.id)
        if (item.isFirm === 1) {
          companyAreas.push(item.id)
        }
      })
      setDisabledKeys(companyAreas)
      setFirmAuth(firmArr)
      setPropsCriteria({ firmId: val[0] })
    }
  }
  const editAuthHandler = () => {
    if (companyId) {
      setIsEdit(true)
    } else {
      message.warn('请先点击选择公司')
    }
  }
  const toSave = async () => {
    const buildingKeysData = buildingKeys || firmAuth
    await editFirmAuth({ areaIds: buildingKeysData, firmId: companyId[0] })
    message.success('授权编辑成功')
    setIsEdit(false)
  }
  const toCancel = () => {
    setIsEdit(false)
  }

  const columns = [
    { title: '姓名', dataIndex: 'staffName' },
    { title: '身份证', dataIndex: 'staffIdCarNum' },
    { title: '联系电话', dataIndex: 'staffPhoneNum' },
  ]

  return (
    <div>
      <div className={style.areaAuth}>
        <div className={style.left}>
          <div className={style.title}> a </div>
          <SearchTree dataList={companyTreeData} hint='请输入公司名称' chooseArea={chooseCompany} />
        </div>
        <div className={style.mid}>
          <div className={style.title}>授权区域</div>
          <SearchTree
            dataList={allAreaData}
            hint='请输入区域名称'
            authData={firmAuth}
            isCheckable
            isMultiple
            getBuildingKeys={getBuildingKeys}
            isDisable={!isEdit}
            disabledKeys={disabledKeys}
          />
          <div className={style.btmBtn}>
            {!isEdit && (
              <Button type='primary' className={style.editAuth} onClick={editAuthHandler}>
                编辑授权
              </Button>
            )}
            {isEdit && (
              <Button type='primary' className={style.saveAuth} onClick={toSave}>
                保存
              </Button>
            )}
            {isEdit && (
              <Button type='primary' className={style.cancelAuth} onClick={toCancel}>
                取消
              </Button>
            )}
          </div>
        </div>
        <div className={style.right}>
          <div className={style.title}>授权人员明细</div>
          <TablePage
            searchConfig={searchStaffConfig}
            columns={columns}
            getList={getStaffAuth}
            propsCriteria={propsCriteria}
          />
        </div>
      </div>
    </div>
  )
}
export default React.memo(Element)
