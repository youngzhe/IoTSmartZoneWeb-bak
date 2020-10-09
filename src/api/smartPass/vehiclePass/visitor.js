import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取访客车辆数据
export const getVisitors = data => httpClient.get('/pedestrian/vehicles/access/visitor', { params: data })

// 根据访客车辆id获取访客车辆本人详细信息
export const getVisitorDetailById = data => httpClient.get(`/pedestrian/vehicles/access/visitor/detail/${data.id}`)

// 根据访客车辆id获取访客车辆通行数据
export const getVisitorsById = data =>
  httpClient.get(`/pedestrian/vehicles/access/visitor/${data.id}`, { params: data })

// 条件获取访客人员车辆通行列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/vehicles/access/visitor/download', {
    responseType: 'blob',
    params: data,
  })

// 根据访客id获取访客人员车辆通行详情导出
export const exportDetail = data =>
  httpCommonClient.get(`/pedestrian/vehicles/access/visitor/${data.visitorId}/download`, {
    responseType: 'blob',
    params: data,
  })
