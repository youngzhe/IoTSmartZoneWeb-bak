import httpClient, { httpCommonClient } from '@/tool/axios'

// 访客列表 和 按条件查询访客信息
export const getVisitors = data => httpClient.get('/pedestrian/visitors', { params: data })

// 创建访客
export const addVisitor = data => httpClient.post('/pedestrian/visitors', data)

// 编辑访客信息
export const editVisitor = data => httpClient.put('/pedestrian/visitors', data)

// 访客信息详情
export const getDetailVisitor = id => httpClient.get(`/pedestrian/visitors/${id}`)

// 批量删除访客信息
export const deleteVisitors = ids => httpClient.delete(`/pedestrian/visitors/${ids}`)

// 获取公司的所有接待人员
export const getReceptions = data => httpClient.get('/pedestrian/visitors/reception', { params: data })

// 获取所有公司名
export const getFirmList = data => httpClient.get('/pedestrian/visitors/firm_list', { params: data })

// 批量添加访客人员信息
export const addBatchVisitor = data => httpClient.post('/pedestrian/visitors/import_visitor', data)

// 导出访客人员信息  /visitors/download
export const exportList = data =>
  httpCommonClient.get('/pedestrian/visitors/download', {
    responseType: 'blob',
    params: data,
  })

export default {
  getVisitors,
  addVisitor,
  editVisitor,
  getDetailVisitor,
  deleteVisitors,
  getReceptions,
  getFirmList,
  addBatchVisitor,
}
