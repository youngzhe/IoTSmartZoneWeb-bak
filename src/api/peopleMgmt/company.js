import httpClient, { httpCommonClient } from '@/tool/axios'

// 公司列表
export const getFirms = data => httpClient.get('/pedestrian/firms', { params: data })

// 添加公司
export const addFirm = data => httpClient.post('/pedestrian/firms', data)

// 修改公司信息
export const editFirm = data => httpClient.put('/pedestrian/firms', data)

// 获取公司信息
export const getDetailFirm = firmId => httpClient.get(`/pedestrian/firms/${firmId}`)

// 删除公司信息
export const deleteFirm = firmId => httpClient.delete(`/pedestrian/firms/${firmId}`)

// 修改公司冻结状态
export const freezeFirm = firmId => httpClient.put(`/pedestrian/firms/freeze/${firmId}`)

// 批量添加公司
export const addBatchFirms = data => httpClient.post('/pedestrian/firms/batch', data)

// 批量删除公司
export const deleteBatchFirms = firmIds => httpClient.delete(`/pedestrian/firms/batch/${firmIds}`)

// 导出入驻公司信息
export const exportList = data =>
  httpCommonClient.get('/pedestrian/firms/download', {
    responseType: 'blob',
    params: data,
  })

export default {
  getFirms,
  addFirm,
  editFirm,
  getDetailFirm,
  deleteFirm,
  freezeFirm,
  addBatchFirms,
  deleteBatchFirms,
}
