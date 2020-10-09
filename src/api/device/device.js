import httpClient from '@/tool/axios'

// 获取闸机设备
export const getDevices = data => httpClient.get('/equip/devices', { params: data })

// 带过去id在areaId
export const getArea = data => httpClient.get('/asset/areas/childArea', { params: data })

export default {
  getDevices,
}
