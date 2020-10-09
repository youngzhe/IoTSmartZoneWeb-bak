import React, { useEffect, useState } from 'react'
import { Radio, Select } from 'antd'
import {
  getTotalVehicles,
  getTotalAreas,
  getTotalAlarmType,
  getStaffVehicles,
  getStaffVehiclesOfFirm,
  getVisitorVehicles,
  getVisitorVehiclesOfFirm,
  getStaffVehiclesTrend,
  getVisitorVehiclesTrend,
} from '@/api/smartPass/dashboard/personnal'
import quit from '@/assets/svg/退出全屏.svg'
import { getDashboardAreas } from 'api/assetMgmt/area'
import {
  PersonnelPieChart,
  BarChart,
  StaffVehiclesBarChart,
  PersonnelBoard,
  LineChart,
  PersonnelChartBoard,
  RadioGroup,
  VisitorLineChart,
  AlarmTypePieChart,
} from './components'
import style from './dashboard.module.less'

const { Option } = Select
function Dashboard(props) {
  const { history } = props
  const [totalVehicleData, setTotalVehicleData] = useState({}) // 总车辆通行数据
  const [totalAreas, setTotalAreas] = useState([]) // 获取总停车区域通行数据
  const [totalAlarmTypes, setTotalAlarmTypes] = useState([]) // 获取总停车区域车位数据
  const [staffVehicles, setStaffVehicles] = useState({}) // 获取常驻车辆通行数据
  const [dashBoardAreas, setDashBoardAreas] = useState([]) // 数据看板页区域下拉列表数据
  const [visitorVehicles, setVisitorVehicles] = useState({}) // 获取访客车辆通行数据
  const [staffVehiclesOfFirm, setStaffVehiclesOfFirm] = useState([]) // 获取各公司常驻车辆通行数据
  const [visitorVehiclesOfFirm, setVisitorVehiclesOfFirm] = useState([]) // 获取各公司访客通行数据
  const [staffVehiclesTrend, setStaffVehiclesTrend] = useState([]) // 获取常驻车辆通行趋势数据
  const [visitorVehiclesTrend, setVisitorVehiclesTrend] = useState([]) // 获取访客车辆通行趋势数据
  const [content1SearchType, setContent1SearchType] = useState(1)
  const [content2SearchType, setContent2SearchType] = useState(1)
  const [content3SearchType, setContent3SearchType] = useState(1)
  const [area1, setArea1] = useState('')
  const [area2, setArea2] = useState('')

  useEffect(() => {
    ;(async () => {
      const [res1, res2, res3] = await Promise.all([
        getTotalVehicles({ searchType: content1SearchType }),
        getTotalAreas({ searchType: content1SearchType }),
        getTotalAlarmType({ searchType: content1SearchType }),
      ])
      setTotalVehicleData(res1.data)
      setTotalAreas(res2.data)
      setTotalAlarmTypes(res3.data)
    })()
  }, [content1SearchType])

  useEffect(() => {
    ;(async () => {
      const [res4, res6] = await Promise.all([
        getStaffVehicles({ searchType: content2SearchType }),
        getStaffVehiclesTrend({ searchType: content2SearchType }),
      ])
      setStaffVehicles(res4.data)
      setStaffVehiclesTrend(res6.data)
    })()
  }, [content2SearchType])

  useEffect(() => {
    ;(async () => {
      const [res7, res9] = await Promise.all([
        getVisitorVehicles({ searchType: content3SearchType }),
        getVisitorVehiclesTrend({ searchType: content3SearchType }),
      ])
      setVisitorVehicles(res7.data)
      setVisitorVehiclesTrend(res9.data)
    })()
  }, [content3SearchType])

  useEffect(() => {
    ;(async () => {
      const res10 = await getDashboardAreas()
      const areasArr = res10.data.map(item => ({
        key: item.id,
        label: item.areaName,
      }))
      setDashBoardAreas(areasArr)
      setArea1(areasArr[0].key)
      setArea2(areasArr[0].key)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!area1) {
        return
      }
      const res5 = await getStaffVehiclesOfFirm({ searchType: content2SearchType, areaId: area1 })
      setStaffVehiclesOfFirm(res5.data)
    })()
  }, [content2SearchType, area1])

  useEffect(() => {
    ;(async () => {
      if (!area2) {
        return
      }
      const res8 = await getVisitorVehiclesOfFirm({ searchType: content3SearchType, areaId: area2 })
      setVisitorVehiclesOfFirm(res8.data)
    })()
  }, [content3SearchType, area2])

  const gotoSmallScreen = () => {
    history.push('/smartPass/dashboard/staffSmall')
  }

  return (
    <div className={style.dashboard}>
      <div className={style.dashboardHeader} />
      <div className={style.nav}>
        <div className={style.left}>智慧通行 / 数据看板</div>
        <div className={style.right} onClick={gotoSmallScreen}>
          <img src={quit} alt='' />
          <span>退出全屏</span>
        </div>
      </div>
      <Radio.Group defaultValue='1' className={style.btns} buttonStyle='solid'>
        <Radio.Button value='1'>人员数据</Radio.Button>
        <Radio.Button value='2' onClick={() => history.push('/smartPass/dashboard/vehicleFullScreen')}>
          车辆数据
        </Radio.Button>
      </Radio.Group>
      <div className={style.content1}>
        <RadioGroup handleClick={setContent1SearchType} />
        <div className={style.chart1}>
          <div className={style.chartTitle}>总人员通行数据</div>
          <PersonnelBoard
            dataObject={{
              value1: totalVehicleData.totalAcsCount,
              value2: totalVehicleData.totalAlarmCount,
              value3: totalVehicleData.totalDealAlarmCount,
            }}
          />
          <div className={style.line} />
          <div className={style.title}>
            常驻车辆通行数
            <div className={style.triangle} />
            {totalVehicleData.staffCarAcsCount}
          </div>
          <div className={style.title}>
            访客车辆通行数
            <div className={style.triangle} />
            {totalVehicleData.visitorCarAcsCount}
          </div>
        </div>
        <div className={style.chart2}>
          <PersonnelPieChart data={[...totalAreas]} />
        </div>
        <div className={style.chart3}>
          <AlarmTypePieChart data={totalAlarmTypes} />
        </div>
      </div>
      <div className={style.content2}>
        <RadioGroup handleClick={setContent2SearchType} />
        <div className={style.chart1}>
          <div className={style.chartTitle}>常驻人员通行数据</div>
          <div className={style.chartContent}>
            <PersonnelChartBoard
              dataObject={{
                value1: staffVehicles.staffAcsCount,
                value2: staffVehicles.staffAlarmCount,
                value3: staffVehicles.staffDealAlarmCount,
              }}
            />
          </div>
        </div>
        <div className={style.chart2}>
          <div className={style.middleChartTitle}>各公司人员通行数</div>
          <div className={style.areaSelect}>
            <Select onChange={key => setArea1(key)} value={area1}>
              {dashBoardAreas.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className={style.middleChartContent}>
            <StaffVehiclesBarChart className={style.barChart} data={staffVehiclesOfFirm} />
          </div>
        </div>
        <div className={style.chart3}>
          <div className={style.rightChartTitle}>常驻人员通行趋势图</div>
          <div className={style.rightChartContent}>
            <LineChart data={staffVehiclesTrend} />
          </div>
        </div>
      </div>
      <div className={style.content3}>
        <RadioGroup handleClick={setContent3SearchType} />
        <div className={style.chart1}>
          <div className={style.chartTitle}>访客通行数据</div>
          <div className={style.chartContent}>
            <PersonnelChartBoard
              dataObject={{
                value1: visitorVehicles.visitorAcsCount,
                value2: visitorVehicles.visitorAlarmCount,
                value3: visitorVehicles.visitorDealAlarmCount,
              }}
            />
          </div>
        </div>
        <div className={style.chart2}>
          <div className={style.areaSelect}>
            <Select onChange={key => setArea2(key)} value={area2}>
              {dashBoardAreas.map(item => (
                <Option key={item.key} value={item.key}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className={style.middleChartTitle}>各公司访客通行数</div>
          <div className={style.middleChartContent}>
            <BarChart className={style.barChart} data={visitorVehiclesOfFirm} />
          </div>
        </div>
        <div className={style.chart3}>
          <div className={style.rightChartTitle}>访客人员通行曲线图</div>
          <div className={style.rightChartContent}>
            <VisitorLineChart data={visitorVehiclesTrend} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(Dashboard)
