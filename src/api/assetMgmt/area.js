import httpClient from '@/tool/axios'

// 区域列表
export const getArea = data => httpClient.get('/asset/areas/', { params: data })

// 新建区域
export const addArea = data => httpClient.post('/asset/areas', data)

// 上级区域下拉框
export const parentArea = data => httpClient.get('/asset/areas/parentArea', { params: data })

// 删除区域
export const deleteArea = id => httpClient.delete(`/asset/areas/${id}`)

// 区域详情
export const areaDetail = id => httpClient.get(`/asset/areas/${id}`)

// 分层级获取所有区域
export const getAllAreas = data => httpClient.get('/asset/areas/allArea', { params: data })

// 修改区域
export const editArea = data => httpClient.put('/asset/areas', data)

// 根据区域ID查询下级区域
export const getChildArea = data => httpClient.get('/asset/areas/childArea', { params: data })

// 按照名字查询区域
export const searchByName = data => httpClient.get('/asset/areas/byName', { params: data })

// 数据看板类型2-区域的下拉框
export const getDashboardAreas = () => httpClient.get('/asset/areas/dataArea')

export default {
  getArea,
}
