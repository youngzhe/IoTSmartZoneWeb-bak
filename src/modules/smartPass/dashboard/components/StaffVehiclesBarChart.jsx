import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

const getOption = dataArr => {
  const staffArr = []
  const dataAxis = []

  dataArr.forEach(item => {
    staffArr.push(item.valueCount)
    dataAxis.push(item.keyName)
  })
  return {
    xAxis: {
      data: dataAxis,
      axisLabel: {
        textStyle: {
          color: '#aaa',
          fontSize: 10,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
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
      name: '车/次',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },

    series: [
      {
        name: '公司常驻车辆通行',
        type: 'bar',
        // stack: '车位',
        barWidth: 20,
        data: staffArr,
        label: {
          show: true,
          position: 'top',
          fontSize: 12,
          fontWeight: 400,
          color: '#fff',
        },

        // background: linear-gradient(270deg, rgba(36, 117, 254, 0) 0%, #2475FE 100%);
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(36, 117, 254, 1)',
            },
            {
              offset: 1,
              color: 'rgba(36, 117, 254, 0)',
            },
          ],
          false,
        ),
      },
    ],
  }
}

function Element(props) {
  const { data = [] } = props
  const option = getOption(data)
  return (
    <ReactEchartsCore
      echarts={echarts}
      option={option}
      notMerge
      lazyUpdate
      theme='theme_name'
      style={{
        height: '12.875rem',
      }}
    />
  )
}
export default React.memo(Element)
