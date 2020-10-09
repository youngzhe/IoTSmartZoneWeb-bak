import React, { useEffect } from 'react'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { constantRoute } from '@/router'
import { getMenu } from '@/tool/util'
import App from './app'
import StoreContext from '../store'

const resizeWindow = () => {
  const html = document.documentElement
  const deviceWidth = html.clientWidth || window.screen.width || 1920
  html.style.fontSize = `${(deviceWidth / 1920) * 16}px`
}

function Index(props) {
  const { store } = props
  let authMenus = []
  if (Object.keys(store).length > 0) {
    authMenus = getMenu(store.roleDTOList[0].id, constantRoute)
  }

  useEffect(() => {
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  }, [])

  return (
    <StoreContext.Provider value={{ user: store, authMenus }}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </StoreContext.Provider>
  )
}

export default Index
