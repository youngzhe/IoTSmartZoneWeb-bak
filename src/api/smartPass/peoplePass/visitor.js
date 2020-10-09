import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取访客人员数据
export const getVisitors = data => httpClient.get('/pedestrian/personnels/access/visitor', { params: data })

// 根据访客人员id获取访客人员本人详细信息
export const getVisitorDetailById = data => httpClient.get(`/pedestrian/personnels/access/visitor/detail/${data.id}`)

// 条件获取通行访客人员列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/personnels/access/visitor/download', {
    responseType: 'blob',
    params: data,
  })

// 根据访客id获取访客人员通行详情导出
export const exportDetail = data =>
  httpCommonClient.get(`/pedestrian/personnels/access/visitor/${data.visitorId}/download`, {
    responseType: 'blob',
    params: data,
  })

// 根据访客人员id获取访客人员通行数据
export const getVisitorsById = data =>
  httpClient.get(`/pedestrian/personnels/access/visitor/${data.id}`, { params: data })
