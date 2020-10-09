import httpClient, { httpCommonClient } from '@/tool/axios'

// 获取车辆告警数据
export const getAlarmmsgs = data => httpClient.get('/pedestrian/alarmmsgs/vehicle', { params: data })

// 根据获取车辆告警详情
export const getAlarmmsgDetailById = data => httpClient.get(`/pedestrian/alarmmsgs/vehicle/${data.id}`)

// 条件获取常驻及访客车辆告警列表导出
export const exportList = data =>
  httpCommonClient.get('/pedestrian/alarmmsgs/vehicle/download', {
    responseType: 'blob',
    params: data,
  })
