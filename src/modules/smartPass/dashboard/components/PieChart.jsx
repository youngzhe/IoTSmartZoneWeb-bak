import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

const getOption = dataArr => {
  let totalCount = 0
  dataArr.forEach(item => {
    totalCount += item.valueCount
  })
  const formatArr = dataArr.map(item => ({
    value: item.valueCount,
    name: `${item.keyName}              | ${((item.valueCount / totalCount) * 100).toFixed(2)}%       ${
      item.valueCount
    } /车次`,
  }))

  return {
    title: {
      text: '区域通行数据',
      left: 20,
      textStyle: { color: '#fff', fontSize: 16, fontWeight: 400 },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      icon: 'circle',
      left: '40%',
      top: '20%',
      textStyle: {
        color: '#aaa',
        fontSize: 14,
        fontWeight: 400,
      },
    },
    color: ['#096BFF', '#5D9DFF', '#AECAFF', '#DBECF8'],
    series: [
      {
        name: '区域通行数据',
        type: 'pie',
        center: ['20%', '40%'],
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'inside',
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: formatArr,
      },
    ],
  }
}

function Element(props) {
  const { data } = props
  const option = getOption(data)
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
      theme='theme_name'
      style={{ height: '16.875rem' }}
    />
  )
}

export default React.memo(Element)
