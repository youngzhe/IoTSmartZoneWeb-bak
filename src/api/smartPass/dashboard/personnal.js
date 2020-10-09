import httpClient from '@/tool/axios'
// 数据看板人员数据

// 获取总车辆通行数据
export const getTotalVehicles = data => httpClient.get('/pedestrian/databoards/personnel/total', { params: data })

// 获取总停车区域通行数据
export const getTotalAreas = data => httpClient.get('/pedestrian/databoards/personnel/total/area', { params: data })

// 获取总告警类别数据
export const getTotalAlarmType = data =>
  httpClient.get('/pedestrian/databoards/personnel/total/alarm', { params: data })

// 获取常驻车辆通行数据
export const getStaffVehicles = data => httpClient.get('/pedestrian/databoards/personnel/staff', { params: data })

// 获取访客车辆通行数据
export const getVisitorVehicles = data => httpClient.get('/pedestrian/databoards/personnel/visitor', { params: data })

// 获取各公司访客通行数据
export const getVisitorVehiclesOfFirm = data =>
  httpClient.get('/pedestrian/databoards/personnel/visitor/firm', { params: data })

// 获取各公司常驻车辆通行数据
export const getStaffVehiclesOfFirm = data =>
  httpClient.get('/pedestrian/databoards/personnel/staff/firm', { params: data })

// 获取常驻车辆通行趋势数据
export const getStaffVehiclesTrend = data =>
  httpClient.get('/pedestrian/databoards/personnel/staff/trend', { params: data })

// 获取访客车辆通行趋势数据
export const getVisitorVehiclesTrend = data =>
  httpClient.get('/pedestrian/databoards/personnel/visitor/trend', { params: data })
