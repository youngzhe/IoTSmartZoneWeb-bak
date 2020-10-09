/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { InfoList } from '@/components'
import { Modal } from 'antd'
import photo from '@/assets/image/avatar.jpg'

// const basicConfig = [
//   {
//     config: [
//       {
//         key: 'passArea',
//         label: '通行区域',
//       },
//       {
//         key: 'deviceNum',
//         label: '闸机号',
//       },
//       {
//         key: 'direction',
//         label: '通行方向',
//       },
//       {
//         key: 'status',
//         label: '状态',
//       },
//       {
//         key: 'openTime',
//         label: '通行时间',
//       },
//     ],
//   },
//   {
//     config: [
//       {
//         key: 'name',
//         label: '姓名',
//       },
//       {
//         key: 'phoneNum',
//         label: '联系电话',
//       },
//       {
//         key: 'idCardNum',
//         label: '身份证号',
//       },
//       {
//         key: 'company',
//         label: '公司',
//       },
//     ],
//   },
// ]

const passInfo = {
  passArea: 111,
  deviceNum: 110,
  direction: '进门',
  status: '正常',
  openTime: '2020-09-25',
  name: '韩梅梅',
  phoneNum: 13756568888,
  idCardNum: '356455197409090090',
  company: '京东方',
  photo,
}

function Element(props) {
  const { onCancel, basicConfig, titles, currentData } = props
  return (
    <Modal visible title='记录详情' onCancel={onCancel} footer={null} width={1000}>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        {basicConfig.map((item, index) => {
          return (
            <InfoList
              title={titles[index]}
              infoConfig={item.config}
              photoImg={passInfo.photo && index === 0 ? passInfo.photo : null}
              dataObject={currentData}
              key={item.id}
            />
          )
        })}
      </div>
    </Modal>
  )
}

export default React.memo(Element)
