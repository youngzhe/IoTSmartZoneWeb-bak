import React, { useContext } from 'react'
import { Layout, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import StoreContext from '@/store'
import Cookies from 'js-cookie'
// import { logout } from "@/api/login";
import style from './layout.module.less'

const { Header } = Layout

const handleLogout = async () => {
  // await logout();
  Cookies.remove('jwt')
  localStorage.removeItem('userInfo')
  window.location.href = '/login'
}

function Element(props) {
  const { history } = props
  const store = useContext(StoreContext)
  const { user = {}, authMenus } = store
  let breadArr = []
  const splitArr = history.location.pathname.split('/').slice(1) // 原数组切出来第一位是''所以需要slice
  const { length } = splitArr // 从pathName中得到的字符串切割后的数组的长度
  let filterRoutes = authMenus // 路由检索数组
  let filterObject = {} // 根据path查询出来的路由对象
  let path = ''
  try {
    // 循环切割数组
    for (let i = 0; i < length; i += 1) {
      // 只要是字符串的首位是数字就返回,兼容地址栏传参数问题;
      if (Number.isFinite(Number(splitArr[i][0]))) {
        break
      }
      path += `/${splitArr[i]}` // 如第一次path的值为“/ad”第二次为/ad/info
      if (i !== 0) {
        filterRoutes = filterObject.children
      }
      // 拿pathName里面拼接的path取router里面的数组过滤，如果找不到的话后续的引用会报错
      // eslint-disable-next-line no-loop-func
      filterObject = filterRoutes.find(item => {
        return item.path === path || item.path === `${path}/:id` || item.path === `${path}/:ids`
        // return item.path === path || item.path.indexOf(`${path}/:id}`
      }) // 找不到会出异常

      breadArr.push({
        path: filterObject.path,
        name: filterObject.name,
        // icon: filterObject.icon,
        component: !!filterObject.component,
      })
    }
  } catch {
    breadArr = [{ name: '路由未找到', path: '/' }]
  }
  return (
    <Header>
      <div className={style.header}>
        <div className={style.bread}>
          <Breadcrumb>
            {breadArr.map((route, index) => {
              // 首尾路由不允许点击访问
              if (index === 0) {
                return route.component ? (
                  <Breadcrumb.Item key={route.path}>
                    <Link to={route.path}>
                      {route.icon && <route.icon style={{ marginRight: 6 }} />}
                      {route.name}
                    </Link>
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item key={route.path}>
                    {route.icon && <route.icon style={{ marginRight: 6 }} />}
                    {route.name}
                  </Breadcrumb.Item>
                )
              }
              if (index === breadArr.length - 1) {
                return (
                  <Breadcrumb.Item key={route.path}>
                    {route.icon && <route.icon style={{ marginRight: 6 }} />}
                    {route.name}
                  </Breadcrumb.Item>
                )
              }
              return (
                <Breadcrumb.Item key={route.path}>
                  {route.component ? (
                    <Link to={route.path}>
                      {route.icon && <route.icon style={{ marginRight: 6 }} />}
                      {route.name}
                    </Link>
                  ) : (
                    <>
                      {route.icon && <route.icon style={{ marginRight: 6 }} />}
                      {route.name}
                    </>
                  )}
                </Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
        </div>
        <div className={style.user}>
          欢迎您,
          {user.name}
          <a className={style.logout} onClick={handleLogout}>
            退出
          </a>
        </div>
      </div>
    </Header>
  )
}
const isEqual = (prevProps, nextProps) => {
  if (prevProps.history.location.pathname !== nextProps.history.location.pathname) {
    return false
  }
  return true
}

export default React.memo(Element, isEqual)
