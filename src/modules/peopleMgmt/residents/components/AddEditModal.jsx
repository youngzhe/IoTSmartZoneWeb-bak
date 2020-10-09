import { Form, Input, Modal, Select, Upload, DatePicker } from 'antd'
import React, { useState, useEffect, useCallback } from 'react'
import { ReactComponent as BasicInfo } from '@/assets/svg/basicInfo.svg'
import { ReactComponent as VehicleInfo } from '@/assets/svg/vehicleInfo.svg'
import { getFirmList } from '@/api/peopleMgmt/residents'

const { RangePicker } = DatePicker

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
}

const onGenderChange = () => {}

const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

const onPreview = async file => {
  let src = file.url
  if (!src) {
    src = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file.originFileObj)
      reader.addEventListener('load', () => resolve(reader.result))
    })
  }
  const image = new Image()
  image.src = src
}

function AddEditModal(props) {
  const { onOk, onCancel, currentData } = props
  const [form] = Form.useForm()
  const [companyList, setComanyList] = useState([])
  const [fileList, setFileList] = useState([])

  const fetchData = useCallback(async () => {
    const result = await getFirmList()
    setComanyList(result.data)
  }, [])

  useEffect(() => {
    fetchData()
    if (currentData.staffId) {
      setFileList({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: currentData.facePhotoUrl,
      })
    }
  }, [currentData.facePhotoUrl, currentData.staffId, fetchData])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onFinish = async () => {
    const res = await form.validateFields()
    if (currentData.staffId) {
      res.id = currentData.staffId
    }
    onOk(res)
  }

  return (
    <Modal centered title={currentData.staffId ? '编辑人员' : '添加人员'} visible onCancel={onCancel} onOk={onFinish}>
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
          name='staffName'
          label='姓名'
          rules={[
            { required: true, type: 'string' },
            { max: 50, message: '长度最多50 个字符' },
          ]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='staffPhoneNum'
          label='联系电话'
          rules={[{ required: true }, { pattern: /^1\d{10}$/, message: '联系电话输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='staffIdCarNum'
          label='身份证号'
          rules={[{ required: true }, { pattern: /^\d{17}(\d|X)$/, message: '身份证号输入不正确' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item name='firmId' label='公司' rules={[{ required: true }]}>
          <Select placeholder='请选择' onChange={onGenderChange} allowClear>
            {companyList.map(item => (
              <Select.Option key={item.firmId} value={item.firmId}>
                {item.firmName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='facePhotoUrl' label='人脸信息' valuePropName='fileList' getValueFromEvent={normFile}>
          <Upload
            action='/upload.do'
            listType='picture-card'
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ 上传'}
          </Upload>
        </Form.Item>
        <Form.Item
          name='rangeDate'
          label='有效时间'
          rules={[
            {
              type: 'array',
              message: '请选择时间!',
            },
          ]}
        >
          <RangePicker format='YYYY-MM-DD' />
        </Form.Item>
        <h3>
          <VehicleInfo /> 车辆信息
        </h3>
        <Form.Item name='carNo' label='车牌号' rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item
          name='carRangeDate'
          label='有效时间'
          rules={[
            {
              type: 'array',
              message: '请选择时间!',
            },
          ]}
        >
          <RangePicker format='YYYY-MM-DD' />
        </Form.Item>
        <Form.Item
          name='carType'
          label='车辆型号'
          rules={[{ type: 'string' }, { max: 50, message: '长度最多50 个字符' }]}
        >
          <Input placeholder='请输入' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(AddEditModal)
