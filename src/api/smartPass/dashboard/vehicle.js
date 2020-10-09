import httpClient from '@/tool/axios'

// 获取总车辆通行数据
export const getTotalVehicles = data => httpClient.get('/pedestrian/databoards/vehicle/total', { params: data })

// 获取总停车区域通行数据
export const getTotalAreas = data => httpClient.get('/pedestrian/databoards/vehicle/total/area', { params: data })

// 获取总停车区域车位数据
export const getTotalVehiclePark = data => httpClient.get('/pedestrian/databoards/vehicle/total/park', { params: data })

// 获取常驻车辆通行数据
export const getStaffVehicles = data => httpClient.get('/pedestrian/databoards/vehicle/staff', { params: data })

// 获取访客车辆通行数据
export const getVisitorVehicles = data => httpClient.get('/pedestrian/databoards/vehicle/visitor', { params: data })

// 获取各公司访客通行数据
export const getVisitorVehiclesOfFirm = data =>
  httpClient.get('/pedestrian/databoards/vehicle/visitor/firm', { params: data })

// 获取各公司常驻车辆通行数据
export const getStaffVehiclesOfFirm = data =>
  httpClient.get('/pedestrian/databoards/vehicle/staff/firm', { params: data })

// 获取常驻车辆通行趋势数据
export const getStaffVehiclesTrend = data =>
  httpClient.get('/pedestrian/databoards/vehicle/staff/trend', { params: data })

// 获取访客车辆通行趋势数据
export const getVisitorVehiclesTrend = data =>
  httpClient.get('/pedestrian/databoards/vehicle/visitor/trend', { params: data })
