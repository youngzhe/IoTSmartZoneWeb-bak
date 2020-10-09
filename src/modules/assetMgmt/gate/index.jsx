import React from 'react'
import { Tabs } from 'antd'
import Staff from './Staff'
import Company from './Company'
import style from './gate.module.less'

const { TabPane } = Tabs

function Element() {
  return (
    <div className={style.tabPage}>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='人员授权' key='1'>
          <Staff />
        </TabPane>
        <TabPane tab='公司授权' key='2'>
          <Company />
        </TabPane>
        {/* <TabPane tab='组织授权' key='3'>
          组织授权
        </TabPane> */}
      </Tabs>
    </div>
  )
}

export default React.memo(Element)
