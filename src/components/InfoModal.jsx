/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, message, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { resolutions, formItemLayout } from '@/constants/dictionary'

const FormItem = Form.Item

function InfoModal(props) {
  const { visible, handleNewInfoCancel, handleNewInfoOk } = props
  const [customVisible, setCustomVisible] = useState(false)
  const [form] = Form.useForm()

  const handleChangeResolution = value => {
    if (value === 'CUSTOM') {
      setCustomVisible(true)
    } else {
      setCustomVisible(false)
    }
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    const { resolution, width, height, name } = values
    const dw = customVisible ? width : resolution.split('x')[0]
    const dh = customVisible ? height : resolution.split('x')[1]
    if (!Number.isNaN(dw) && !Number.isNaN(dh)) {
      const params = { dw: Number(dw), dh: Number(dh), name }
      handleNewInfoOk(params)
    } else {
      message.warn('您输入的是非数字字符')
    }
  }

  return (
    <Modal
      title='新建'
      visible={visible}
      onOk={handleSave}
      onCancel={handleNewInfoCancel}
      destroyOnClose
      className='custom-form'
      maskClosable={false}
    >
      <Form {...formItemLayout} form={form}>
        <FormItem
          label='名称编辑'
          name='name'
          rules={[{ required: true }, { max: 20, message: '请输入不得多于20字的内容名称' }]}
        >
          <Input type='text' placeholder='请输入名称' />
        </FormItem>
        <FormItem label='分辨率' name='resolution' rules={[{ required: true }]}>
          <Select allowClear={false} onChange={handleChangeResolution} placeholder='请选择分辨率'>
            {resolutions.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        {customVisible ? (
          <>
            <FormItem
              label='宽度'
              name='width'
              rules={[
                {
                  required: true,
                  message: '请输入分辨率宽度',
                },
                {
                  max: 4,
                  message: '长度不能大于4个字符',
                },
                {
                  pattern: /^[1-9]\d*$/,
                  message: '请输入正确的数字',
                },
              ]}
            >
              <Input type='text' placeholder='px' />
            </FormItem>
            <FormItem
              label='高度'
              name='height'
              rules={[
                {
                  required: true,
                  message: '请输入分辨率高度',
                },
                {
                  max: 4,
                  message: '长度不能大于4个字符',
                },
                {
                  pattern: /^[1-9]\d*$/,
                  message: '请输入正确的数字',
                },
              ]}
            >
              <Input type='text' placeholder='px' />
            </FormItem>
          </>
        ) : null}
      </Form>
    </Modal>
  )
}

export default InfoModal
