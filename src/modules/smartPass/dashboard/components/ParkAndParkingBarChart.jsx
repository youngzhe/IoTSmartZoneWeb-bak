import React from 'react'
import echarts from 'echarts/lib/echarts'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

// const dataAxis = ['A公司', 'B公司', 'C公司', 'D公司', 'E公司', 'F公司']
// const data = [500, 182, 191, 234, 580, 330]
// const dataShadow = []

const getOption = dataArr => {
  const totalArr = []
  const parkedArr = []
  const dataAxis = []

  dataArr.forEach(item => {
    totalArr.push(item.valueOne)
    parkedArr.push(item.valueTwo)
    dataAxis.push(item.keyName)
  })
  return {
    title: {
      text: '停车区域车位数据',
      left: 20,
      textStyle: { color: '#fff', fontSize: 16, fontWeight: 400 },
    },
    legend: {
      top: 10,
      right: 10,
      textStyle: {
        color: '#2895F2',
        fontSize: 14,
      },
      itemGap: 34,
      itemWidth: 30,
      itemHeight: 10,
    },
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
          color: '#001529',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
        },
      },
      name: '车/辆',
      nameTextStyle: {
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
    color: ['#6EA6FE', '#2475FE'],
    series: [
      {
        name: '总车位数',
        type: 'bar',
        barWidth: 30,
        data: totalArr,
        label: {
          show: true,
          position: 'top',
        },
      },
      {
        name: '已停车数',
        type: 'bar',
        barWidth: 30,
        barGap: '-100%',
        backgroundStyle: {
          color: '#F9FAFD',
        },
        data: parkedArr,
        label: {
          show: true,
          position: 'inside',
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
      style={{
        height: '12.875rem',
      }}
    />
  )
}
export default React.memo(Element)
