import React, { useContext } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import StoreContext from '@/store'
import style from './layout.module.less'

const { SubMenu } = Menu

// 扁平化左侧菜单显示，取出所有的path组成一个数组
// const routersReduce = (routers) => {
//   const reduceRounters = [];
//   routers.map((route) => {
//     if (route.children) {
//       route.children.map((child) => {
//         return reduceRounters.push(child.path);
//       });
//     }
//     return reduceRounters.push(route.path);
//   });
//   return reduceRounters;
// };

function Element(props) {
  const store = useContext(StoreContext)
  const { authMenus } = store
  // console.log(store); // 一直刷新有问题
  // console.log(window.location);
  // const reduceRouters = routersReduce(constantRoutes);
  // console.log(reduceRouters);
  const {
    history: {
      location: { pathname },
    },
  } = props // 从location中找到pathname，也可以从props里面
  const splitArr = pathname.split('/').slice(1) // 切成数组，扔掉第一项
  const pathArr = [] // 新建一个数据存放 如 ['/ad', '/ad/plan']
  let path = ''
  splitArr.forEach(element => {
    path += `/${element}`
    pathArr.push(path)
  })
  return (
    <div className={style.menu}>
      <Menu
        defaultSelectedKeys={['/dashboard']}
        defaultOpenKeys={[...pathArr]}
        selectedKeys={pathArr}
        mode='inline'
        theme='light'
        className={style.breadContent}
      >
        {authMenus.map(route => {
          if (!route.component && route.children) {
            // 有component时不显示其子组件
            return (
              <SubMenu icon={route.icon && <route.icon />} key={route.path} title={route.name}>
                {route.children.map(child => {
                  if (!child.component && child.children) {
                    return (
                      <SubMenu icon={child.icon && <child.icon />} key={child.path} title={child.name}>
                        {child.children.map(grandchild => (
                          <Menu.Item key={grandchild.path} icon={grandchild.icon && <grandchild.icon />}>
                            <span>{grandchild.name}</span>
                            <Link to={grandchild.path} />
                          </Menu.Item>
                        ))}
                      </SubMenu>
                    )
                  }
                  return (
                    <Menu.Item key={child.path} icon={child.icon && <child.icon />}>
                      <span>{child.name}</span>
                      <Link to={child.path} />
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            )
          }
          return (
            <Menu.Item key={route.path}>
              {route.icon && <route.icon />}
              <span>{route.name}</span>
              <Link to={route.path} />
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}

const isEqual = (prevProps, nextProps) => {
  if (prevProps.history.location.pathname !== nextProps.history.location.pathname) {
    return false
  }
  return true
}

export default React.memo(Element, isEqual)
