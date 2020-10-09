/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { Modal, Form, Button, message, Progress } from 'antd'
import XLSX from 'xlsx'
import { formItemLayout } from '@/constants/dictionary'
import BatchAddSrc from '@/assets/excel/人员批量添加.xlsx'
import { ReactComponent as ExcelLogo } from '@/assets/svg/excelLogo.svg'
import { getSheetValue } from '@/tool/util'

function Element(props) {
  const { onOk, onCancel, currentData } = props
  const uploadTmplButton = useRef()
  const [now] = useState(Date.now())
  const [tmpl, setTmpl] = useState(null)
  const [percent, setPercent] = useState()
  const [tmplName, setTmplName] = useState('')
  const [form] = Form.useForm()
  const onFinish = () => {
    if (!isEmpty(tmpl)) {
      onOk(tmpl)
    } else {
      uploadTmplButton.current.value = ''
      message.warn('请上传一个xlsx标准文件')
    }
  }
  const handleTemplChange = e => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.currentTarget.files[0]
    if (
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    ) {
      const reader = new FileReader()
      reader.addEventListener('load', e1 => {
        setPercent(Math.floor(e1.loaded / e1.total) * 100)
        const data = new Uint8Array(e1.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[Object.keys(workbook.Sheets)[0]]
        const tmplJson = XLSX.utils.sheet_to_json(sheet)
        const tmpl0 = tmplJson.map(r => {
          return {
            staffName: getSheetValue(r['人员姓名*']),
            staffPhoneNum: getSheetValue(r['联系电话*']),
            staffIdCarNum: String(getSheetValue(r['身份证号*'])),
            firmName: getSheetValue(r['公司*']),
            facePhotoUrl: getSheetValue(r['人脸信息(根据批量上传图片进行匹配，上传图片以身份证号命名)']),
            startEffectiveDate: getSheetValue(r['有效开始时间(格式为YYYY/MM/DD)']),
            endEffectiveDate: getSheetValue(r['有效结束时间(格式为YYYY/MM/DD)']),
            carNo: [getSheetValue(r['车牌号01']), getSheetValue(r['车辆型号02'])],
            carStartEffectiveDate: [getSheetValue(r['车牌号01有效开始时间']), getSheetValue(r['车牌号02有效开始时间'])],
            carEndEffectiveDate: [getSheetValue(r['车牌号01有效结束时间']), getSheetValue(r['车牌号02有效结束时间'])],
            carType: [getSheetValue(r['车辆型号01']), getSheetValue(r['车辆型号02'])],
          }
        })
        tmpl0.shift()
        setTmpl(tmpl0)
        setTmplName(file.name)
      })
      reader.readAsArrayBuffer(file)
    } else {
      message.warn('您选择的不是一个xlsx标准文件')
    }
  }

  const handleTemplReset = () => {
    if (tmpl) {
      uploadTmplButton.current.value = ''
      setTmpl(null)
    }
  }

  return (
    <Modal visible title='批量添加人员' onOk={onFinish} onCancel={onCancel}>
      <Form {...formItemLayout} onFinish={onFinish} form={form} initialValues={currentData}>
        <Form.Item label='下载模板文件' name='name'>
          <a href={BatchAddSrc}>
            <ExcelLogo />
            人员列表模板.xlsx
          </a>
        </Form.Item>
        <Form.Item
          label='上传xlsx文件'
          name='direction'
          rules={[
            {
              required: true,
              message: '请上传xlsx文件',
            },
          ]}
        >
          <Button>
            <label htmlFor={`${now}tmpl`}>{tmpl ? '重新上传' : '上传xlsx文件'}</label>
          </Button>
          <input
            ref={uploadTmplButton}
            type='file'
            className='hidden'
            hidden
            id={`${now}tmpl`}
            onChange={handleTemplChange}
            onClick={handleTemplReset}
            accept='.xlsx, .xls,.csv'
          />
          {tmpl ? (
            <div>
              <Progress percent={percent} />
              <span>{tmplName}</span>
            </div>
          ) : null}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default React.memo(Element)
