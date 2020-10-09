import httpClient from '@/tool/axios'

// 人员授权列表
export const getStaffAuth = data => httpClient.get('/asset/areas/staffAuth', { params: data })

// 员工授权信息详情
export const getAuthDetail = id => httpClient.get(`/asset/areas/staffAuth/${id}`)

// 编辑授权详情
export const editAuthDetail = data => httpClient.put('/asset/areas/staffAuth', data)

// 人员授权批量导入
export const importStaff = data => httpClient.post('/asset/areas/batchStaffAuth', data)

// 根据公司ID查询其区域
export const getFirmAuth = id => httpClient.get(`/asset/areas/firmAuth/${id}`)

// 公司授权编辑
export const editFirmAuth = data => httpClient.put('/asset/areas/firmAuth', data)
