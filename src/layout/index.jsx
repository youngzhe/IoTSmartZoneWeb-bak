import React from 'react'
import { Layout } from 'antd'
// import { Icon } from "antd/compatible";
import style from './layout.module.less'

import Header from './Header'
import Menu from './Menu'
import Content from './Content'

const { Footer, Sider } = Layout
// const { SubMenu } = Menu;

function Index(props) {
  const { history } = props
  return (
    <div className={style.main}>
      <Layout>
        <Sider width='21.75rem'>
          <div className={style.projectName}>
            <div />
            <div>园区运营管理平台</div>
          </div>
          <div>
            <Menu history={{ ...history }} />
          </div>
        </Sider>
        <Layout>
          <Header history={{ ...history }} />
          <Content />
          <Footer>Copyright©2020 京东方科技集团股份有限公司 版权所有</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
export default Index
