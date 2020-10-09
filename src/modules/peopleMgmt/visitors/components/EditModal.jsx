/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Modal, Select, DatePicker } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'
import { ReactComponent as BasicInfo } from '@/assets/svg/basicInfo.svg'
import { ReactComponent as VehicleInfo } from '@/assets/svg/vehicleInfo.svg'
import { ReactComponent as HostInfo } from '@/assets/svg/hostInfo.svg'
import { getChildArea } from '@/api/assetMgmt/area'
import { visitPurpose } from '@/constants/dictionary'
import { getFirmList } from '@/api/peopleMgmt/visitors'

const { RangePicker } = DatePicker

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
}

const onGenderChange = () => {}

const onFloorChange = () => {}

function AddEditModal(props) {
  const { onOk, onCancel, currentData } = props
  const [form] = Form.useForm()
  const [companyArea, setCompanyArea] = useState([])
  const [companyBuilding, setCompanyBuilding] = useState([])
  const [companyFloor, setCompanyFloor] = useState([])
  const [companyList, setComanyList] = useState([])

  const onFinish = async () => {
    const res = await form.validateFields()
    if (currentData.id) {
      res.id = currentData.id
    }
    onOk(res)
  }

  const onAreaChange = async val => {
    const result = await getChildArea({ areaId: val })
    setCompanyBuilding(result.data)
  }

  const onBuildingChange = async val => {
    const result = await getChildArea({ areaId: val })
    setCompanyFloor(result.data)
  }

  const fetchData = useCallback(async () => {
    const result = await getChildArea({ areaId: 0 })
    setCompanyArea(result.data)
    if (currentData.id) {
      onAreaChange(currentData.projectId)
      onBuildingChange(currentData.areaId)
    }
    const result1 = await getFirmList()
    setComanyList(result1.data)
  }, [currentData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Modal centered title={currentData.id ? '编辑人员' : '添加人员'} visible onCancel={onCancel} onOk={onFinish}>
      <h3>
        <BasicInfo /> 基本信息
      </h3>
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
          name='visitorName'
          label='姓名'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='visitorPhoneNum'
          label='联系电话'
          rules={[{ required: true }, { pattern: /^1\d{10}$/, message: '联系电话输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='visitorIdCarNum'
          label='身份证号'
          rules={[{ required: true }, { pattern: /^\d{17}(\d|X)$/, message: '身份证号输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='fromFirmName'
          label='公司'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='toFirmName' label='访问公司' rules={[{ required: true }]}>
          <Select placeholder='请选择' onChange={onGenderChange} allowClear>
            {companyList.map(item => (
              <Select.Option key={item.firmId} value={item.firmId}>
                {item.firmName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label='访问区域' rules={[{ required: true, message: '请选择!' }]} style={{ height: 32 }}>
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
        <Form.Item
          name='purpose'
          label='访问目的'
          rules={[
            {
              required: true,
              message: '请选择!',
            },
          ]}
        >
          <Select style={{ width: 100, marginRight: 7 }} placeholder='访问目的' onChange={onGenderChange} allowClear>
            {visitPurpose.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='rangeDate'
          label='访问时间'
          rules={[
            {
              required: true,
              message: '请选择时间!',
            },
          ]}
        >
          <RangePicker showTime format='YYYY-MM-DD HH:mm' />
        </Form.Item>
        <h3>
          <VehicleInfo /> 访问车辆信息
        </h3>
        <Form.Item
          name='visitorCarNo'
          label='车牌号'
          rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='visitorCarType'
          label='车辆类型'
          rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <h3>
          <HostInfo /> 接待人信息
        </h3>
        <Form.Item
          name='receptionPsnName'
          label='姓名'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='receptionPsnPhoneNum'
          label='联系电话'
          rules={[{ required: true }, { pattern: /^1\d{10}$/, message: '联系电话输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='receptionPsnIdCardNo'
          label='身份证号'
          rules={[{ required: true }, { pattern: /^\d{17}(\d|X)$/, message: '身份证号输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(AddEditModal)
