/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Button, message } from 'antd'
import { formatAreasTreeData } from '@/tool/util'
import { getAuthDetail, editAuthDetail } from '@/api/assetMgmt/assetMgmt'
import photo from '@/assets/image/avatar.jpg'
import SearchTree from '../../Component/SearchTree'
import style from '../gate.module.less'

function Element(props) {
  const { onCancel, currentData } = props
  const [areaData, setAreaData] = useState([])
  const [authData, setAuthData] = useState()
  const [staffInfo, setStaffInfo] = useState()
  const [buildingKeys, setBuildingKeys] = useState()
  const [disabledKeys, setDisabledKeys] = useState()

  const fetchDetail = useCallback(async () => {
    if (currentData.id) {
      const res = await getAuthDetail(currentData.id)
      setStaffInfo({ ...res.data.staff, firmName: res.data.firmName })
      const { auth, areas } = res.data
      const authArr = []
      const disabledArr = []
      auth.forEach(item => {
        authArr.push(item.id)
        if (item.isFirm === 1) {
          disabledArr.push(item.id)
        }
      })
      setDisabledKeys(disabledArr)
      setAuthData(authArr)
      // 设置区域树的数据
      setAreaData(formatAreasTreeData(areas, 3))
    }
  }, [currentData.id])

  const getBuildingKeys = val => {
    setBuildingKeys(val)
  }

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  const toSave = async () => {
    const buildingKeysData = buildingKeys || authData
    await editAuthDetail({ areaIds: buildingKeysData, staffId: currentData.id })
    message.success('编辑成功')
    onCancel()
  }

  return (
    <Modal
      visible
      title={currentData.type === 'edit' ? '编辑授权详情' : '个人授权详情'}
      onCancel={onCancel}
      footer={null}
      className={style.authModal}
      width={500}
    >
      <div className={style.basicInfo}>
        <img src={staffInfo?.facePhotoUrl || photo} alt='' />
        <ul className={style.infoList}>
          <li>姓名：{staffInfo?.staffName}</li>
          <li>联系方式：{staffInfo?.staffPhoneNum}</li>
          <li>公司：{staffInfo?.firmName}</li>
        </ul>
      </div>
      <div className={style.gateArea}>
        <h4>已授权的门禁</h4>
        <div className={style.gateSearch}>
          <SearchTree
            dataList={areaData}
            isMultiple
            isCheckable
            authData={authData}
            getBuildingKeys={getBuildingKeys}
            isDisable={currentData.type === 'detail'}
            disabledKeys={disabledKeys}
          />
        </div>
      </div>
      {currentData.type === 'edit' && (
        <Button type='primary' onClick={toSave}>
          保存
        </Button>
      )}
    </Modal>
  )
}

export default React.memo(Element)
