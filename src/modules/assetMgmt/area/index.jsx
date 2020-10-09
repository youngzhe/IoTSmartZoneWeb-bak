import React, { useState, useCallback, useEffect } from 'react'
import { addArea, getArea, deleteArea, areaDetail, editArea, getAllAreas } from '@/api/assetMgmt/area'
import { Divider, Modal, message, Button } from 'antd'
import TablePage from '@/components/TablePage/index.jsx'
import { ButtonGroup, ComponentTitle } from '@/components'
import { areaType } from '@/constants/dictionary'
import AddEditModal from './AddEditModal'
import SearchArea from '../Component/SearchTree'
import style from './area.module.less'

const searchConfig = [
  {
    key: 'areaName',
    label: '区域名称',
  },
  // {
  //   key: 'areaType',
  //   label: '类型',
  //   type: 'select',
  //   options: areaType,
  // },
]

function Element() {
  const [propsCriteria, setPropsCriteria] = useState({ areaId: 0 })
  const [visible, setVisible] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [areaData, setAreaData] = useState([])

  const fetchData = useCallback(async () => {
    const res = await getAllAreas()
    const { data } = res
    const treeData = []
    data.forEach(item => {
      const obj = {
        title: item.areaName,
        key: item.id,
      }
      if (item.childAreas && item.childAreas.length > 0) {
        obj.children = []
        item.childAreas.forEach(child => {
          const childObj = {
            title: child.areaName,
            key: child.id,
          }
          obj.children.push(childObj)
        })
      }
      treeData.push(obj)
    })
    setAreaData(treeData)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const closeModal = () => {
    setVisible(false)
  }

  const handleOk = async res => {
    if (currentData.id) {
      await editArea(res)
      setVisible(false)
      message.success('编辑区域成功！')
      setPropsCriteria({})
      fetchData()
    } else {
      let newRes = res
      if (!res.parentId) {
        newRes = { ...res, parentId: 0 }
      }
      await addArea(newRes)
      setVisible(false)
      message.success('新建区域成功！')
      setPropsCriteria({})
      fetchData()
    }
  }

  const handleDelete = record => {
    Modal.confirm({
      content: '删除后数据不可恢复,是否确定删除该区域？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteArea(record.id)
        message.success('删除成功！')
        setPropsCriteria({ pageIndex: 1 })
        fetchData()
      },
    })
  }

  const chooseArea = val => {
    if (val.length > 0) {
      setPropsCriteria({ areaId: val[0] })
    }
  }

  const handleAddEdit = async record => {
    if (record?.id) {
      const { data } = await areaDetail(record.id)
      setCurrentData({
        areaName: data.areaName,
        parkingCount: data.parkingCount,
        id: data.id,
        areaType: data.areaType,
        parentId: data.parentId,
      })
    } else {
      setCurrentData({})
    }
    setVisible(true)
  }

  const columns = [
    { title: '区域名称', dataIndex: 'areaName' },
    { title: '类型', dataIndex: 'areaType', render: text => areaType[text - 1].label },
    { title: '上级区域', dataIndex: 'parentAreaName', render: text => text || '无' },
    {
      title: '操作',
      width: '240px',
      render: record => (
        <span>
          <a onClick={() => handleDelete(record)}>删除</a>
          <Divider type='vertical' />
          <a onClick={() => handleAddEdit(record)}>编辑</a>
        </span>
      ),
    },
  ]

  return (
    <div>
      <div>
        <ComponentTitle title='区域管理' />
        <div className={style.mainContainer}>
          <div className={style.left}>
            <SearchArea dataList={areaData} chooseArea={chooseArea} hint='请输入区域名称' />
          </div>
          <div className={style.right}>
            <TablePage searchConfig={searchConfig} columns={columns} getList={getArea} propsCriteria={propsCriteria}>
              <ButtonGroup>
                <div>
                  <span style={{ fontSize: 16, paddingLeft: 16, fontWeight: 600, color: '#14579d' }}>区域列表</span>
                </div>
                <div>
                  <Button type='primary' onClick={handleAddEdit}>
                    新建区域
                  </Button>
                </div>
              </ButtonGroup>
            </TablePage>
          </div>
        </div>

        {visible && <AddEditModal onCancel={closeModal} currentData={currentData} onOk={handleOk} />}
      </div>
    </div>
  )
}
export default React.memo(Element)
