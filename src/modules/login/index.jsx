import React, { useContext } from 'react'
import { login } from '@/api/login'
import StoreContext from '@/store'
import Cookies from 'js-cookie'
import { constantRoute } from '@/router'
import { getMenu } from '@/tool/util'
import boe from '@/assets/image/boe.png'
import style from './login.module.less'
import LoginForm from './LoginForm'

function Login(props) {
  const store = useContext(StoreContext)
  if (store?.user?.name) {
    store.authMenus = getMenu(store.user.roleDTOList[0].id, constantRoute)
    let pathName
    if (store.authMenus[0]?.children[0]?.children) {
      pathName = store.authMenus[0]?.children[0]?.children[0].path
    } else if (store.authMenus[0]?.children) {
      pathName = store.authMenus[0]?.children[0].path
    } else {
      pathName = store.authMenus[0]?.path
    }
    props.history.push(pathName)
  }
  const submit = async data => {
    const result = await login(data)
    Cookies.set('jwt', result.data.tokenInfo.access_token)
    localStorage.setItem('userInfo', JSON.stringify(result.data))
    try {
      store.user = result.data
      store.authMenus = getMenu(store.user.roleDTOList[0].id, constantRoute)
      let pathName
      if (store.authMenus[0]?.children[0]?.children) {
        pathName = store.authMenus[0]?.children[0]?.children[0].path
      } else if (store.authMenus[0]?.children) {
        pathName = store.authMenus[0]?.children[0].path
      } else {
        pathName = store.authMenus[0]?.path
      }

      if (props.location.search.includes('?redirectTo')) {
        const redirectTo = props.location.search.replace('?redirectTo=', '')
        window.location.href = decodeURIComponent(redirectTo)
        return true
      }
      props.history.push(pathName)
      return ''
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return (
    <div className={style.login}>
      <img src={boe} alt='BOE' className={style.logo} />
      <div className={style.loginBox}>
        <div className={style.boxBg}>
          <h2>BOE 园区运营管理平台</h2>
        </div>
        <div className={style.loginForm}>
          <LoginForm submit={submit} />
        </div>
      </div>
    </div>
  )
}
export default Login
