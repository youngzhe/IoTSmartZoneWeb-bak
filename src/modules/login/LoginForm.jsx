/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import uuidv4 from 'uuid/v4'
import SyncOutlined from '@ant-design/icons/SyncOutlined'
import { getCodeImage } from '@/api/login'
import style from './login.module.less'
import AgreementModal from './files/AgreementModal'
import SecretModal from './files/SecretModal'

function LoginForm(props) {
  const [isSpin, setIsSpin] = useState(false)
  const [codeUrl, setCodeUrl] = useState('')
  // const [imageCode, setImageCode] = useState('')
  const [form] = Form.useForm()
  const [uuid, setuuid] = useState('')
  const [agreementVisible, setAgreementVisible] = useState(false)
  const [secretVisible, setSecretVisible] = useState(false)
  const [agreeChecked, setAgreeChecked] = useState(false)

  const refreshCode = useCallback(async () => {
    setIsSpin(true)
    form.setFields([{ name: 'captcha', value: undefined }])
    const uuidStr = uuidv4()
    const res = await getCodeImage({
      uuid: uuidStr,
    })
    setuuid(uuidStr)
    // setImageCode(res.headers.imagecode) // 从headers里面将imagecode取出来，类似"36103e49-dfcc-4460-9ad2-fb717b3c6e6c"
    const url = URL.createObjectURL(res.data) // 将返回来的blob转为url
    setCodeUrl(url) // 将url设置进state给img标签使用
    setTimeout(() => {
      setIsSpin(false) // 想实现点击之后动画转一圈再消失
    }, 400)
  }, [form])

  const checkAgree = e => {
    setAgreeChecked(e.target.checked)
  }

  // 刚进来的时候需要取一次验证码
  useEffect(() => {
    refreshCode()
  }, [refreshCode])

  const onFinish = async data => {
    const { submit } = props
    try {
      await submit({ ...data, uuid })
    } catch {
      refreshCode()
      form.setFields([{ name: 'captcha', value: undefined }])
    }
  }

  return (
    <div className={style.formContent}>
      <h3 className={style.loginTitle}>登录后台账号</h3>
      <Form onFinish={onFinish} form={form} autoComplete='off'>
        <Form.Item
          name='username'
          rules={[
            { required: true, message: '请输入用户名' },
            { max: 20, message: '用户名不能超过20位' },
          ]}
        >
          <Input placeholder='用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: '请输入密码' },
            { max: 20, message: '密码最长支持20位' },
            { min: 6, message: '密码最少6位' },
          ]}
        >
          <Input type='password' placeholder='密码' />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle name='captcha' rules={[{ required: true, message: '请输入验证码' }]}>
            <Input className={style.code} placeholder='验证码' />
          </Form.Item>
          <SyncOutlined spin={isSpin} onClick={refreshCode} />
          <img src={codeUrl} alt='' />
        </Form.Item>
        <div style={{ marginTop: 8, marginBottom: 8 }}>
          <Checkbox onChange={checkAgree}>
            <span style={{ color: '#c3c3c8' }}>我已阅读并同意:</span>
          </Checkbox>
          <a
            className={style.agreement}
            onClick={() => {
              setAgreementVisible(true)
            }}
          >
            《用户协议》
          </a>
          <span>和</span>
          <a
            className={style.agreement}
            onClick={() => {
              setSecretVisible(true)
            }}
          >
            《隐私政策》
          </a>
        </div>
        <Form.Item>
          <Button disabled={!agreeChecked} type='primary' htmlType='submit' className={style['login-form-button']}>
            登录
          </Button>
        </Form.Item>
      </Form>
      {agreementVisible && (
        <AgreementModal
          onCancel={() => {
            setAgreementVisible(false)
          }}
        />
      )}
      {secretVisible && (
        <SecretModal
          onCancel={() => {
            setSecretVisible(false)
          }}
        />
      )}
    </div>
  )
}

export default LoginForm
