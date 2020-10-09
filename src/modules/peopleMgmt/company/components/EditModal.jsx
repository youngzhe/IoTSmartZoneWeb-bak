import { Form, Input, Modal, Select, DatePicker } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'
import { getChildArea } from '@/api/assetMgmt/area'

const { RangePicker } = DatePicker
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
}

const onFloorChange = () => {}

function AddEditModal(props) {
  const { onOk, onCancel, currentData } = props
  const [form] = Form.useForm()
  const [companyArea, setCompanyArea] = useState([])
  const [companyBuilding, setCompanyBuilding] = useState([])
  const [companyFloor, setCompanyFloor] = useState([])

  const onFinish = async () => {
    const res = await form.validateFields()
    if (currentData.id) {
      res.id = currentData.id
    }
    onOk(res)
  }

  const fetchData = useCallback(async () => {
    const result = await getChildArea({ areaId: 0 })
    setCompanyArea(result.data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onAreaChange = async val => {
    const result = await getChildArea({ areaId: val })
    setCompanyBuilding(result.data)
  }

  const onBuildingChange = async val => {
    const result = await getChildArea({ areaId: val })
    setCompanyFloor(result.data)
  }

  return (
    <Modal centered title={currentData.id ? '编辑公司' : '添加公司'} visible onCancel={onCancel} onOk={onFinish}>
      <Form
        {...layout}
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        initialValues={currentData}
        autocomplete='off'
        style={{ maxHeight: 500, overflowY: 'auto' }}
      >
        <Form.Item
          name='firmName'
          label='公司名称'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='phoneNum'
          label='联系电话'
          rules={[{ required: true }, { pattern: /^1\d{10}$/, message: '联系电话输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='contactPerson'
          label='联系人'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='公司办公区域' style={{ height: 32 }}>
          <Form.Item name={['firmAreas', 'projectId']} style={{ float: 'left', width: 100, marginRight: 7 }}>
            <Select placeholder='选择项目' onChange={onAreaChange} allowClear>
              {companyArea.map(item => (
                <Select.Option key={item.id} value={item.id} title={item.areaName}>
                  {item.areaName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['firmAreas', 'areaId']} style={{ float: 'left', width: 100, marginRight: 7 }}>
            <Select placeholder='选择区域' onChange={onBuildingChange} allowClear>
              {companyBuilding.map(item => (
                <Select.Option key={item.id} value={item.id} title={item.areaName}>
                  {item.areaName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={['firmAreas', 'buildingId']} style={{ float: 'left', width: 100 }}>
            <Select placeholder='选择楼栋' onChange={onFloorChange} allowClear>
              {companyFloor.map(item => (
                <Select.Option key={item.id} value={item.id} title={item.areaName}>
                  {item.areaName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item name='enterDate' label='入驻时间'>
          <DatePicker format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item
          name='rangeDate'
          label='有效时间'
          rules={[{ required: true, type: 'array', message: '请选择时间!' }]}
        >
          <RangePicker format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item
          name='staffCount'
          label='员工数量'
          rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='parkingCount'
          label='车位数量'
          rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(AddEditModal)
