import React from 'react'
import { Form, Button } from 'antd'
import style from './searchBar.module.less'

// 用法
/* <SearchBar>
<Form.Item label="所在城市" name="city">
  <Select placeholder="请选择">
    <Select.Option>1</Select.Option>
    <Select.Option>2</Select.Option>
  </Select>
</Form.Item>
<Form.Item label="设备MAC" name="MAC">
  <Input placeholder="请输入" />
</Form.Item>
</SearchBar> */

function Element(props) {
  const { children, onFinish } = props
  const [form] = Form.useForm()
  const onReset = () => {
    form.resetFields()
    onFinish()
  }
  const handleFinish = values => {
    onFinish(values)
  }
  return (
    <div>
      <Form onFinish={handleFinish} className={style.searchBar} form={form}>
        <div className={style.searchForm}>{children}</div>
        <div className={style.searchButton}>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              查询
            </Button>
            <Button htmlType='button' onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}
export default Element
