import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取常驻车辆数据
export const getResidents = data => httpClient.get('/pedestrian/vehicles/access/staff', { params: data })

// 根据常驻车辆id获取常驻车辆本人详细信息
export const getStaffDetailById = data => httpClient.get(`/pedestrian/vehicles/access/staff/detail/${data.id}`)

// 根据常驻车辆id获取常驻车辆通行数据
export const getStaffsById = data => httpClient.get(`/pedestrian/vehicles/access/staff/${data.id}`, { params: data })

// 条件获取常驻人员车辆通行列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/vehicles/access/staff/download', {
    responseType: 'blob',
    params: data,
  })

// 根据常驻人员id获取车辆通行详情导出
export const exportDetail = data =>
  httpCommonClient.get(`/pedestrian/vehicles/access/staff/${data.staffId}/download`, {
    responseType: 'blob',
    params: data,
  })
