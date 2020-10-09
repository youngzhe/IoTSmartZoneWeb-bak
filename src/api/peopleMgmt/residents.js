import httpClient, { httpCommonClient } from '@/tool/axios'

// 区域下拉框
export const childArea = data => httpClient.get('/areas/childArea', { params: data })

// 人员列表
export const getStaffs = data => httpClient.get('/pedestrian/staffs', { params: data })

// 创建人员信息
export const addStaff = data => httpClient.post('/pedestrian/staffs', data)

// 编辑人员信息
export const editStaff = data => httpClient.put('/pedestrian/staffs', data)

// 人员信息详情
export const getDetailStaff = id => httpClient.get(`/pedestrian/staffs/${id}`)

// 删除人员信息
export const deleteStaff = id => httpClient.delete(`/pedestrian/staffs/${id}`)

// 获取所有公司名
export const getFirmList = data => httpClient.get('/pedestrian/staffs/firm_list', { params: data })

// 冻结人员信息
export const freezeStaff = id => httpClient.put(`/pedestrian/staffs/freeze/${id}`)

// 批量添加人员照片
export const addStaffsPhoto = data => httpClient.post('/pedestrian/staffs/import_photo', data)

// 批量添加人员信息
export const addBatchStaffsInfo = data => httpClient.post('/pedestrian/staffs/import_staff', data)

// 导出常驻人员信息
export const exportList = data =>
  httpCommonClient.get('/pedestrian/staffs/download', {
    responseType: 'blob',
    params: data,
  })

export default {
  childArea,
  getStaffs,
  addStaff,
  editStaff,
  getDetailStaff,
  deleteStaff,
  getFirmList,
  freezeStaff,
  addStaffsPhoto,
  addBatchStaffsInfo,
}
