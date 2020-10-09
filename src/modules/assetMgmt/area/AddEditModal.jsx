/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { formItemLayout, areaType } from '@/constants/dictionary'
import { parentArea } from '@/api/assetMgmt/area'

function Element(props) {
  const { onOk, onCancel, currentData } = props
  const [form] = Form.useForm()
  const [myAreaType, setMyAreaType] = useState('')
  const [myParentArea, setMyParentArea] = useState([])
  const fetchData = useCallback(async () => {
    if (currentData.areaType) {
      const result = await parentArea({ areaType: currentData.areaType })
      const parentAreaArr = []
      result.data.forEach(item => {
        parentAreaArr.push({ key: item.id, label: item.areaName })
      })
      setMyParentArea(parentAreaArr)
    }
  }, [currentData.areaType])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onFinish = async () => {
    const res = await form.validateFields()
    if (currentData.id) {
      res.id = currentData.id
    }
    onOk(res)
  }
  const handleChange = async value => {
    form.setFieldsValue({
      parentId: undefined,
    })
    const parentData = await parentArea({ areaType: value })
    const parentAreaArr = []
    parentData.data.forEach(item => {
      parentAreaArr.push({ key: item.id, label: item.areaName })
    })
    setMyAreaType(value)
    setMyParentArea(parentAreaArr)
  }

  return (
    <Modal visible title={currentData.id ? '编辑区域详情' : '新建区域'} onOk={onFinish} onCancel={onCancel}>
      <Form {...formItemLayout} onFinish={onFinish} form={form} initialValues={currentData} autoComplete='off'>
        <Form.Item label='类型' name='areaType'>
          <Select placeholder='请选择' onChange={handleChange}>
            {areaType.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='上级区域' name='parentId'>
          <Select placeholder='请选择' disabled={myAreaType === 1}>
            {myParentArea.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='区域名称' name='areaName' rules={[{ min: 2, max: 12, message: '区域名称2-12位' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        {(myAreaType === 2 || typeof currentData.parkingCount === 'number') && (
          <Form.Item
            label='车位数量'
            name='parkingCount'
            rules={[
              {
                pattern: /^[1-9]\d{0,9}$/,
                message: '请输入正确的数字,长度不超过十位',
              },
            ]}
          >
            <Input placeholder='请输入' />
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default React.memo(Element)
