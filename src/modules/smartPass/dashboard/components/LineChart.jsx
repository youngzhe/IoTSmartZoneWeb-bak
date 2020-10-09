import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

const getOption = dataArr => {
  const xAxisArr = []
  const yAxisArr = []
  dataArr.forEach(item => {
    xAxisArr.push(item.keyName)
    yAxisArr.push(item.valueCount)
  })
  return {
    tooltip: {
      trigger: 'axis',
      padding: [2, 10],
      textStyle: {
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisArr,
      axisLabel: {
        textStyle: {
          color: '#aaa',
          fontSize: 10,
        },
      },
    },
    color: ['rgba(36, 117, 254, 1)'],
    yAxis: {
      type: 'value',
      name: '人/次',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.5)',
      },
      axisLabel: {
        textStyle: {
          color: '#aaa',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
        },
      },
    },
    series: [
      {
        data: yAxisArr,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(36, 117, 254, 0.2)',
              },
              {
                offset: 1,
                color: 'rgba(36, 117, 254, 0)',
              },
            ],
            false,
          ),
        },
        lineStyle: {
          color: '#2475FE',
        },
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
