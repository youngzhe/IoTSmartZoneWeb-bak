/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import { isEmpty } from 'lodash'
import { Modal, Form, Button, message, Progress } from 'antd'
import XLSX from 'xlsx'
import { formItemLayout } from '@/constants/dictionary'
import BatchAddSrc from '@/assets/excel/访客批量添加.xlsx'
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
            visitorName: getSheetValue(r['姓名*']),
            visitorPhoneNum: getSheetValue(r['联系电话*']),
            visitorIdCarNum: String(getSheetValue(r['身份证*'])),
            fromFirmName: getSheetValue(r['公司*']),
            toFirmName: getSheetValue(r['访问公司*']),
            projectName: getSheetValue(r['访问区域*']),
            areaName: getSheetValue(r.__EMPTY),
            floorName: getSheetValue(r.__EMPTY_1),
            purpose: getSheetValue(
              r[
                `访问目的*
            (点击后在下拉框中选择)`
              ],
            ),
            startVisitTime: getSheetValue(
              r[
                `访问时间*
            (格式为YYYY/MM/DD-HH/MM)`
              ],
            ),
            endVisitTime: getSheetValue(r.__EMPTY_2),
            visitorCarNo: getSheetValue(r['访客车辆信息']),
            visitorCarType: getSheetValue(r.__EMPTY_3),
            receptionPsnName: getSheetValue(r['接待人信息*']),
            receptionPsnPhoneNum: getSheetValue(r.__EMPTY_4),
            receptionPsnIdCardNo: getSheetValue(r.__EMPTY_5),
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
    <Modal visible title='批量添加访客' onOk={onFinish} onCancel={onCancel}>
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
