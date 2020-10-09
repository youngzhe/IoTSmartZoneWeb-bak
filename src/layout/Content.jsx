import React, { useContext } from 'react'
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import StoreContext from '@/store'
import page404 from '@/components/page404/index.jsx'
import style from './layout.module.less'

const { Content } = Layout
function Element() {
  const store = useContext(StoreContext)
  const { authMenus } = store
  const contentViews = []
  authMenus.forEach(route => {
    if (route.component) {
      contentViews.push({
        path: route.path,
        component: route.component,
        exact: route.exact,
      })
    }
    if (route.children) {
      route.children.forEach(child => {
        contentViews.push({
          path: child.path,
          component: child.component,
          exact: route.exact,
        })
        if (child.children) {
          child.children.forEach(grandson => {
            contentViews.push({
              path: grandson.path,
              component: grandson.component,
              exact: grandson.exact,
            })

            if (grandson.children) {
              grandson.children.forEach(grandchild =>
                contentViews.push({
                  path: grandchild.path,
                  component: grandchild.component,
                  exact: grandchild.exact,
                }),
              )
            }
          })
        }
      })
    }
    return contentViews
  })

  return (
    <Content>
      <div className={style.content}>
        <Switch>
          {contentViews.map(view => {
            return <Route key={view.path} path={view.path} component={view.component} exact={view.exact} />
          })}
          <Route path='/*' component={page404} />
        </Switch>
      </div>
    </Content>
  )
}

export default Element
