import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取常驻人员数据
export const getResidents = data => httpClient.get('/pedestrian/personnels/access/staff', { params: data })

// 根据常驻人员id获取常驻人员本人详细信息
export const getStaffDetailById = data => httpClient.get(`/pedestrian/personnels/access/staff/detail/${data.id}`)

// 根据常驻人员id获取常驻人员通行数据
export const getStaffsById = data => httpClient.get(`/pedestrian/personnels/access/staff/${data.id}`, { params: data })

// 条件获取通行常驻人员列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/personnels/access/staff/download', {
    responseType: 'blob',
    params: data,
  })

// 根据常驻人员id获取通行详情导出
export const exportDetail = data =>
  httpCommonClient.get(`/pedestrian/personnels/access/staff/${data.staffId}/download`, {
    responseType: 'blob',
    params: data,
  })
